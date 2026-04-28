import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/* ───────────────────────────────────────────────────────────
   Zoho CRM REST API (v5) lead insertion.

   Why REST, not the legacy Web-to-Lead endpoint?
   Web-to-Lead only accepts the fields that were present in the
   HTML webform at the time it was generated (via opaque LEADCF<N>
   identifiers). Any custom field added afterwards — including all
   seven utm_* fields — is silently dropped.

   REST /Leads accepts records keyed by the field's REST `api_name`,
   so new custom fields on the Leads module are automatically
   usable without regenerating a webform.

   Auth: OAuth refresh-token flow (Self Client in api-console.zoho.in).
   The refresh token is long-lived; we exchange it for a short-lived
   access token (1 hr) and cache in-memory per serverless instance.
───────────────────────────────────────────────────────────── */

const ACCOUNTS = process.env.ZOHO_ACCOUNTS_URL || 'https://accounts.zoho.in';
const API_BASE = process.env.ZOHO_API_BASE || 'https://www.zohoapis.in';
const CLIENT_ID = process.env.ZOHO_CLIENT_ID || '';
const CLIENT_SECRET = process.env.ZOHO_CLIENT_SECRET || '';
const REFRESH_TOKEN = process.env.ZOHO_REFRESH_TOKEN || '';

/* UTM fields forwarded as dedicated custom columns on the Leads module.
   API names must match Zoho exactly — note the capital C in
   `utm_Campaignid`. `utm_term` and `utm_content` are captured client-side
   but intentionally omitted here — those columns don't exist yet on the
   Leads module. Add them in Zoho admin and re-include below when ready. */
const UTM_FIELDS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_Campaignid',
  'utm_adgroupid',
  'utm_keyword',
  'utm_placement'
] as const;
type UTMField = (typeof UTM_FIELDS)[number];

/* Map user-facing City dropdown → Zoho `State1` picklist value. */
const STATE_MAP: Record<string, string> = {
  'Delhi NCR':     'Delhi',
  'Mumbai':        'Maharashtra',
  'Bengaluru':     'Karnataka',
  'Hyderabad':     'Telangana',
  'Chennai':       'Tamil Nadu',
  'Ahmedabad':     'Gujarat',
  'Kolkata':       'West Bengal',
  'Pune':          'Maharashtra',
  'Chandigarh':    'Chandigarh',
  'Jaipur':        'Rajasthan',
  'Kochi':         'Kerala',
  'Lucknow':       'Uttar Pradesh',
  'Surat':         'Gujarat',
  'Goa':           'Goa',
  'Other (India)': ''
};

/* ───────────────────────────────────────────────────────────
   Access-token cache.

   The module is evaluated once per Node instance, so repeated
   submissions in the same warm serverless container reuse the
   token. On cold start we refresh. We also refresh early (5 min
   safety margin) so no request uses a token that could expire
   mid-flight, and we force-refresh on a 401 response as a belt-
   and-suspenders measure.
───────────────────────────────────────────────────────────── */
let cachedToken: { value: string; expiresAt: number } | null = null;

/**
 * Wrap `fetch` with a narrow retry for transient TCP-level flakes.
 *
 * We only retry when the connection itself never completed (connect
 * timeout, connection reset before any bytes, DNS failure). Anything
 * Zoho actually responded to — including 5xx — is NOT retried, because
 * a lead POST is not idempotent and we don't want to risk duplicates.
 *
 * Empirically this endpoint throws `UND_ERR_CONNECT_TIMEOUT` roughly
 * once every 4-5 calls from some networks; one retry reliably fixes it.
 */
async function fetchWithConnectRetry(
  url: string,
  init: RequestInit,
  maxAttempts = 2
): Promise<Response> {
  let lastErr: unknown;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fetch(url, init);
    } catch (err: unknown) {
      lastErr = err;
      const cause = (err as { cause?: { code?: string } })?.cause;
      const retriable =
        cause?.code === 'UND_ERR_CONNECT_TIMEOUT' ||
        cause?.code === 'ECONNRESET' ||
        cause?.code === 'ECONNREFUSED' ||
        cause?.code === 'ETIMEDOUT' ||
        cause?.code === 'ENOTFOUND';
      if (!retriable || attempt === maxAttempts) throw err;
      // backoff: 300 ms before the retry
      await new Promise((r) => setTimeout(r, 300));
    }
  }
  throw lastErr;
}

async function getAccessToken(forceRefresh = false): Promise<string> {
  const now = Date.now();
  if (!forceRefresh && cachedToken && cachedToken.expiresAt > now + 5 * 60_000) {
    return cachedToken.value;
  }

  const res = await fetchWithConnectRetry(`${ACCOUNTS}/oauth/v2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      refresh_token: REFRESH_TOKEN
    })
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    throw new Error(`Zoho token refresh failed (${res.status}): ${errText.slice(0, 200)}`);
  }

  const json = (await res.json()) as {
    access_token?: string;
    expires_in?: number;
    error?: string;
    error_description?: string;
  };

  if (!json.access_token) {
    throw new Error(`Zoho token refresh returned no access_token: ${json.error ?? 'unknown'}`);
  }

  cachedToken = {
    value: json.access_token,
    expiresAt: now + (json.expires_in ?? 3600) * 1000
  };
  return json.access_token;
}

/* ───────────────────────────────────────────────────────────
   POST /api/lead
───────────────────────────────────────────────────────────── */
export async function POST(req: NextRequest) {
  try {
    if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
      console.error('[lead] Missing Zoho credentials in env');
      return NextResponse.json(
        { error: 'Server not configured.' },
        { status: 500 }
      );
    }

    const body = await req.json();

    const name = String(body.name ?? '').trim();
    const phone = String(body.phone ?? '').replace(/\D/g, '');
    const email = String(body.email ?? '').trim();
    const location = String(body.location ?? '').trim();
    const budget = String(body.budget ?? '').trim();
    const timeline = String(body.timeline ?? '').trim();

    /* Normalise UTMs — strip the literal 'NA' that Google Ads tracking
       templates sometimes resolve to, treat missing keys as ''. */
    const rawUtm = (body.utm ?? {}) as Record<string, unknown>;
    const utm: Record<UTMField, string> = {} as Record<UTMField, string>;
    UTM_FIELDS.forEach((k) => {
      const v = String(rawUtm[k] ?? '').trim();
      utm[k] = v && v.toUpperCase() !== 'NA' ? v : '';
    });

    /* Validation — match the client-side contract */
    if (!name) {
      return NextResponse.json({ error: 'Name is required.' }, { status: 400 });
    }
    if (!/^\d{10}$/.test(phone)) {
      return NextResponse.json(
        { error: 'Please enter a valid 10-digit phone number.' },
        { status: 400 }
      );
    }

    /* Build the Zoho record. Empty strings are omitted so we never
       overwrite a Zoho workflow default with a blank.

       `Lead_Status` must be set explicitly — the REST API skips
       picklist defaults that the legacy Web-to-Lead endpoint applied
       automatically. Without this, new leads land with Lead_Status=null
       and are hidden by the sales team's "My Fresh All" filter. */
    const record: Record<string, string> = {
      Last_Name: name,
      Mobile: phone,
      Lead_Source: 'Website- Magppie',
      Lead_Status: 'Not Contacted Yet'
    };
    if (email) record.Email = email;
    if (location) record.City = location;

    const state = STATE_MAP[location];
    if (state) record.State1 = state;                              // picklist

    if (budget) record.Est_Budget = budget;                        // picklist
    if (timeline) record.How_Soon_Do_You_Require_Magppie = timeline; // picklist

    UTM_FIELDS.forEach((k) => {
      if (utm[k]) record[k] = utm[k];
    });

    /* Submit with one auto-retry on 401 (stale cached token) and
       transparent connect-level retry inside fetchWithConnectRetry. */
    const submit = async (forceFresh = false): Promise<Response> => {
      const accessToken = await getAccessToken(forceFresh);
      return fetchWithConnectRetry(`${API_BASE}/crm/v5/Leads`, {
        method: 'POST',
        headers: {
          Authorization: `Zoho-oauthtoken ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: [record] })
      });
    };

    let res = await submit();
    if (res.status === 401) res = await submit(true);

    const zohoJson = await res.json().catch(() => null);

    /* Zoho response shape: { data: [ { status, code, details, message } ] }
       Even on a 400, the body still contains a structured `data[0]` we
       need to inspect — duplicate detection arrives as 400 with a
       payload pointing at the existing lead's id. */
    type ZohoDup = {
      api_name?: string;
      duplicate_record?: { id?: string };
    };
    type ZohoErrEntry = {
      code?: string;
      details?: ZohoDup;
    };
    type ZohoFirst = {
      status?: string;
      code?: string;
      message?: string;
      details?: { id?: string; errors?: ZohoErrEntry[] };
    };
    const first = (zohoJson as { data?: ZohoFirst[] } | null)?.data?.[0];

    /* Duplicate detection — from the visitor's perspective this is a
       success, not an error. Their info is already on file in Zoho.
       We deliberately do NOT update the existing record here so first-
       touch UTM attribution is preserved. The form proceeds to
       /thank-you as if it were a fresh submission.

       Two response shapes to handle:
       1. `code: 'DUPLICATE_DATA'` directly on first — single field
          (e.g. only the email matched).
       2. `code: 'MULTIPLE_OR_MULTI_ERRORS'` with `details.errors[]`
          where each entry is itself a DUPLICATE_DATA — happens when
          multiple uniqueness rules trip at once (email AND mobile).
          We accept this as duplicate as long as EVERY nested error is
          a duplicate; mixing in other error types should still 502. */
    const isDirectDup = first?.code === 'DUPLICATE_DATA';
    const nestedErrors = first?.details?.errors;
    const isWrappedDup =
      first?.code === 'MULTIPLE_OR_MULTI_ERRORS' &&
      Array.isArray(nestedErrors) &&
      nestedErrors.length > 0 &&
      nestedErrors.every((e) => e.code === 'DUPLICATE_DATA');

    if (isDirectDup || isWrappedDup) {
      const existingId =
        first?.details?.id ??
        nestedErrors?.[0]?.details?.duplicate_record?.id;
      return NextResponse.json({
        ok: true,
        duplicate: true,
        id: existingId
      });
    }

    if (!res.ok) {
      console.error('[lead] Zoho REST rejected', res.status, zohoJson);
      return NextResponse.json(
        {
          error: `We could not submit your enquiry. (Zoho ${res.status})`,
          debug: zohoJson
        },
        { status: 502 }
      );
    }

    if (first?.status !== 'success') {
      console.error('[lead] Zoho REST non-success', first);
      return NextResponse.json(
        {
          error: first?.message || 'Lead submission failed.',
          debug: first
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, id: first.details?.id });
  } catch (err) {
    console.error('[lead] server error', err);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}

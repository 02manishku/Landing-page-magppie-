import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Map city label to the State1 value Zoho expects.
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
  'Other (India)': 'Other'
};

const ZOHO_ENDPOINT = 'https://api.magppie.com/api/leads/';

// Normalise picklist values to plain ASCII so Zoho's exact-match check passes.
function normalisePicklist(s: string) {
  return s
    .replace(/₹/g, '')        // drop rupee symbol
    .replace(/[\u2013\u2014]/g, '-') // en/em dash -> hyphen
    .replace(/\s+/g, ' ')     // collapse whitespace
    .trim();
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const name = String(body.name ?? '').trim();
    const phone = String(body.phone ?? '').replace(/\D/g, '');
    const email = String(body.email ?? '').trim();
    const location = String(body.location ?? '').trim();
    const budget = String(body.budget ?? '').trim();
    const timeline = String(body.timeline ?? '').trim();
    const utm = body.utm ?? {};

    if (!name) {
      return NextResponse.json({ error: 'Name is required.' }, { status: 400 });
    }
    if (!/^\d{10}$/.test(phone)) {
      return NextResponse.json(
        { error: 'Please enter a valid 10-digit phone number.' },
        { status: 400 }
      );
    }

    const state = STATE_MAP[location] ?? '';
    const city = location;

    // Only include fields that have real values. Empty strings on picklists
    // are a common cause of Zoho 400 ("Invalid picklist value").
    const zoho_data: Record<string, string> = {
      Last_Name: name,
      Email: email,
      Mobile: `+91${phone}`,
      Lead_Source: 'Website- Magppie'
    };
    const b = normalisePicklist(budget);
    if (b) zoho_data.Est_Budget = b;
    const t = normalisePicklist(timeline);
    if (t) zoho_data.How_Soon_Do_You_Require_Magppie = t;
    if (state) zoho_data.State1 = state;
    if (city) zoho_data.City = city;
    // UTM params, only if present
    const utmMap: Record<string, string> = {
      utm_source: String(utm.source ?? ''),
      utm_medium: String(utm.medium ?? ''),
      utm_campaign: String(utm.campaign ?? ''),
      utm_Campaignid: String(utm.campaignid ?? ''),
      utm_adgroupid: String(utm.adgroupid ?? ''),
      utm_keyword: String(utm.keyword ?? ''),
      utm_placement: String(utm.placement ?? '')
    };
    for (const [k, v] of Object.entries(utmMap)) if (v) zoho_data[k] = v;

    // Try JSON first. Some Zoho proxies expect form-encoded — we'll fall back to that if JSON is rejected.
    async function sendJson() {
      return fetch(ZOHO_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(zoho_data)
      });
    }
    async function sendForm() {
      const form = new URLSearchParams();
      Object.entries(zoho_data).forEach(([k, v]) => form.append(k, String(v ?? '')));
      return fetch(ZOHO_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json, text/plain, */*'
        },
        body: form.toString()
      });
    }

    let response = await sendJson();
    let rawBody = await response.text().catch(() => '');

    // If JSON was rejected with 400/415/422, retry as form-urlencoded.
    if (!response.ok && [400, 415, 422].includes(response.status)) {
      const retry = await sendForm();
      const retryBody = await retry.text().catch(() => '');
      if (retry.ok) {
        return NextResponse.json({ ok: true, via: 'form', upstream: retryBody.slice(0, 200) });
      }
      response = retry;
      rawBody = retryBody;
    }

    if (!response.ok) {
      console.error('[lead] upstream failed', response.status, rawBody);
      return NextResponse.json(
        {
          error: `We could not submit your enquiry. (Upstream ${response.status})`,
          debug: {
            status: response.status,
            body: rawBody.slice(0, 500),
            sent: zoho_data
          }
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, via: 'json', upstream: rawBody.slice(0, 200) });
  } catch (err) {
    console.error('[lead] server error', err);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}

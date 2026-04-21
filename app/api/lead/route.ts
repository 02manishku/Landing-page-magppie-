import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/* ───────────────────────────────────────────────────────────
   Zoho Web-to-Lead endpoint (direct, no middle-man).
   Tokens generated from the 'Landing Page Magppie' webform.
───────────────────────────────────────────────────────────── */

const ZOHO_URL = 'https://crm.zoho.in/crm/WebToLeadForm';

const ZOHO_TOKENS = {
  xnQsjsdp: '3d9c51e491b3a06935a8407410ded2acdeb27bf8a2a38ba57c7aa3aae227ba5c',
  xmIwtLD:
    '444e568c481123ff0ccae86b0fe7df3add6f6ac6f63764cdf067e1eb184b82ed135c9b264e91ec414a9937bb5860a34b',
  actionType: 'TGVhZHM=',
  returnURL: 'https://landing-page-magppie.vercel.app/'
};

/* Map our user-facing City dropdown value to Zoho's State picklist (LEADCF7). */
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

    /* Build form-urlencoded body — Zoho's Web-to-Lead endpoint does not
       accept JSON. Field names must match the webform's <input name="…">
       exactly, INCLUDING spaces.                                       */
    const form = new URLSearchParams();

    // Security tokens (required)
    form.append('xnQsjsdp', ZOHO_TOKENS.xnQsjsdp);
    form.append('xmIwtLD', ZOHO_TOKENS.xmIwtLD);
    form.append('actionType', ZOHO_TOKENS.actionType);
    form.append('returnURL', ZOHO_TOKENS.returnURL);

    // Honeypot — must be present and empty to pass Zoho's spam filter
    form.append('aG9uZXlwb3Q', '');

    // Lead fields
    form.append('Last Name', name);
    if (email) form.append('Email', email);
    form.append('Mobile', phone);
    if (location) form.append('City', location);
    if (state) form.append('LEADCF7', state);          // State
    if (budget) form.append('LEADCF8', budget);        // Est. Budget picklist
    if (timeline) form.append('LEADCF9', timeline);    // How Soon Do You Require Magppie
    form.append('Lead Source', 'Website- Magppie');

    // UTM tracking — stash in Description since the webform has no custom UTM fields
    const utmLines: string[] = [];
    if (utm.source) utmLines.push(`utm_source: ${utm.source}`);
    if (utm.medium) utmLines.push(`utm_medium: ${utm.medium}`);
    if (utm.campaign) utmLines.push(`utm_campaign: ${utm.campaign}`);
    if (utm.campaignid) utmLines.push(`utm_campaignid: ${utm.campaignid}`);
    if (utm.adgroupid) utmLines.push(`utm_adgroupid: ${utm.adgroupid}`);
    if (utm.keyword) utmLines.push(`utm_keyword: ${utm.keyword}`);
    if (utm.placement) utmLines.push(`utm_placement: ${utm.placement}`);
    if (utmLines.length) form.append('Description', utmLines.join('\n'));

    const response = await fetch(ZOHO_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      },
      body: form.toString(),
      // Zoho responds with a 302 redirect to returnURL on success — we do NOT follow it.
      redirect: 'manual'
    });

    // Zoho returns 200 with HTML or 302 to returnURL on success.
    // Anything in the 2xx/3xx range we treat as success.
    if (response.status >= 200 && response.status < 400) {
      return NextResponse.json({ ok: true });
    }

    const errText = await response.text().catch(() => '');
    console.error('[lead] zoho rejected', response.status, errText.slice(0, 500));
    return NextResponse.json(
      {
        error: `We could not submit your enquiry. (Zoho ${response.status})`,
        debug: { status: response.status, body: errText.slice(0, 500) }
      },
      { status: 502 }
    );
  } catch (err) {
    console.error('[lead] server error', err);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}

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

    const zoho_data = {
      Last_Name: name,
      Est_Budget: budget,
      How_Soon_Do_You_Require_Magppie: timeline,
      Email: email,
      Mobile: phone,
      State1: state,
      City: city,
      Lead_Source: 'Website- Magppie',
      Lead_Status: 'Not Contacted Yet',
      utm_source: String(utm.source ?? ''),
      utm_medium: String(utm.medium ?? ''),
      utm_campaign: String(utm.campaign ?? ''),
      utm_Campaignid: String(utm.campaignid ?? ''),
      utm_adgroupid: String(utm.adgroupid ?? ''),
      utm_keyword: String(utm.keyword ?? ''),
      utm_placement: String(utm.placement ?? '')
    };

    const response = await fetch(ZOHO_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(zoho_data)
    });

    if (!response.ok) {
      const text = await response.text().catch(() => '');
      console.error('[lead] Zoho endpoint failed', response.status, text);
      return NextResponse.json(
        { error: 'We could not submit your enquiry. Please try again or call us directly.' },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[lead] server error', err);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}

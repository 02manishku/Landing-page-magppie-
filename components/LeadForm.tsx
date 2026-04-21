'use client';

import { useState } from 'react';

type Variant = 'hero' | 'dark' | 'light';

export default function LeadForm({
  variant = 'light',
  submitLabel = 'Book my consultation',
  compact = false
}: {
  variant?: Variant;
  submitLabel?: string;
  compact?: boolean;
}) {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;

    const form = e.currentTarget;
    const data = new FormData(form);

    // Pull UTM params from the URL (browser-only, safe inside 'use client').
    const params =
      typeof window !== 'undefined'
        ? new URLSearchParams(window.location.search)
        : new URLSearchParams();

    const payload = {
      name: String(data.get('name') ?? '').trim(),
      phone: String(data.get('phone') ?? '').replace(/\D/g, ''),
      email: String(data.get('email') ?? '').trim(),
      location: String(data.get('location') ?? ''),
      budget: String(data.get('budget') ?? ''),
      timeline: String(data.get('timeline') ?? ''),
      utm: {
        source: params.get('utm_source') ?? '',
        medium: params.get('utm_medium') ?? '',
        campaign: params.get('utm_campaign') ?? '',
        campaignid: params.get('utm_campaignid') ?? '',
        adgroupid: params.get('utm_adgroupid') ?? '',
        keyword: params.get('utm_keyword') ?? '',
        placement: params.get('utm_placement') ?? ''
      }
    };

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || 'Submission failed. Please try again.');
      }

      setSent(true);
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again.';
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  }

  const isDark = variant === 'dark';
  const inputBase = isDark
    ? 'w-full bg-transparent border-b border-bone/25 focus:border-bone outline-none py-3 text-bone placeholder-bone/40 text-sm'
    : 'w-full bg-transparent border-b hairline focus:border-ink outline-none py-3 text-ink placeholder-ink/30 text-sm';
  const labelBase = isDark ? 'kicker text-bone/60' : 'kicker text-smoke';
  const helperBase = isDark ? 'text-bone/50' : 'text-ink/60';
  const submitBase = isDark
    ? 'w-full mt-2 px-8 py-4 bg-bone text-ink kicker hover:bg-sand transition-colors'
    : 'w-full mt-2 px-8 py-4 bg-ink text-bone kicker hover:bg-smoke transition-colors';

  if (sent) {
    return (
      <div className={compact ? 'py-8 text-center' : 'py-12 text-center'}>
        <div className={`kicker mb-4 ${isDark ? 'text-bone/60' : 'text-smoke'}`}>
          Thank you
        </div>
        <h3
          className={`font-display leading-tight ${
            compact ? 'text-2xl' : 'text-3xl'
          } ${isDark ? 'text-bone' : 'text-ink'}`}
        >
          We&rsquo;ve received your details.<br />
          A Magppie advisor will be in touch within 24 hours.
        </h3>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={compact ? 'space-y-4' : 'space-y-5'}>
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Full name" name="name" required baseCls={inputBase} labelCls={labelBase} />
        <PhoneField baseCls={inputBase} labelCls={labelBase} />
      </div>

      <Field label="Email" name="email" type="email" baseCls={inputBase} labelCls={labelBase} />

      <div className="grid sm:grid-cols-2 gap-5">
        <Select
          label="City / State"
          name="location"
          options={LOCATIONS}
          baseCls={inputBase}
          labelCls={labelBase}
        />
        <Select
          label="Budget range"
          name="budget"
          options={BUDGETS}
          baseCls={inputBase}
          labelCls={labelBase}
        />
      </div>

      <Select
        label="Timeline"
        name="timeline"
        options={TIMELINES}
        baseCls={inputBase}
        labelCls={labelBase}
      />

      <label className={`flex items-start gap-3 text-[11px] leading-relaxed ${helperBase}`}>
        <input
          type="checkbox"
          required
          className={`mt-[3px] ${isDark ? 'accent-bone' : 'accent-ink'}`}
        />
        <span>
          I agree to be contacted by Magppie about my enquiry. My details are
          never shared with third parties.
        </span>
      </label>

      {error && (
        <div
          role="alert"
          className={`text-[12px] leading-relaxed px-4 py-3 border ${
            isDark
              ? 'border-bone/30 text-bone bg-bone/5'
              : 'border-red-700/30 text-red-800 bg-red-50'
          }`}
        >
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className={`${submitBase} disabled:opacity-60 disabled:cursor-not-allowed`}
      >
        {submitting ? 'Submitting…' : `${submitLabel} →`}
      </button>

      <p className={`text-[11px] leading-relaxed ${helperBase} pt-1`}>
        A private 20-minute call. No obligation. A Magppie advisor will present
        a detailed 3D design and transparent pricing within 24 hours.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = 'text',
  required,
  baseCls,
  labelCls
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  baseCls: string;
  labelCls: string;
}) {
  return (
    <label className="block">
      <span className={`${labelCls} mb-2 block`}>
        {label}
        {required && <span className="opacity-70"> *</span>}
      </span>
      <input name={name} type={type} required={required} className={baseCls} />
    </label>
  );
}

function PhoneField({
  baseCls,
  labelCls
}: {
  baseCls: string;
  labelCls: string;
}) {
  const [value, setValue] = useState('');

  return (
    <label className="block">
      <span className={`${labelCls} mb-2 block`}>
        Phone
        <span className="opacity-70"> *</span>
      </span>
      <input
        name="phone"
        type="tel"
        required
        value={value}
        onChange={(e) => setValue(e.target.value.replace(/\D/g, '').slice(0, 10))}
        inputMode="numeric"
        autoComplete="tel-national"
        pattern="[0-9]{10}"
        minLength={10}
        maxLength={10}
        placeholder="10-digit mobile number"
        title="Please enter your 10-digit phone number"
        className={baseCls}
      />
    </label>
  );
}

function Select({
  label,
  name,
  options,
  baseCls,
  labelCls
}: {
  label: string;
  name: string;
  options: string[];
  baseCls: string;
  labelCls: string;
}) {
  return (
    <label className="block">
      <span className={`${labelCls} mb-2 block`}>{label}</span>
      <select name={name} className={baseCls} defaultValue="">
        <option value="" disabled>
          Select…
        </option>
        {options.map((o) => (
          <option key={o} value={o} className="text-ink">
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

const LOCATIONS = [
  'Delhi NCR',
  'Mumbai',
  'Bengaluru',
  'Hyderabad',
  'Chennai',
  'Ahmedabad',
  'Kolkata',
  'Pune',
  'Chandigarh',
  'Jaipur',
  'Kochi',
  'Lucknow',
  'Surat',
  'Goa',
  'Other (India)'
];

const BUDGETS = [
  '₹11 – 15 Lakhs',
  '₹16 – 25 Lakhs',
  '₹25 – 30 Lakhs',
  '₹30 – 50 Lakhs',
  'Above ₹50 Lakhs'
];

const TIMELINES = [
  'Within 1 month, fast track',
  '1 – 3 months',
  '3 – 6 months',
  'Just exploring'
];

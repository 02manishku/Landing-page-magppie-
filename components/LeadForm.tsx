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

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  const isDark = variant === 'dark';
  const inputBase = isDark
    ? 'w-full bg-transparent border-b border-bone/25 focus:border-bone outline-none py-2.5 text-bone placeholder-bone/40 text-sm'
    : 'w-full bg-transparent border-b hairline focus:border-ink outline-none py-2.5 text-ink placeholder-ink/30 text-sm';
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
        <Field label="Phone" name="phone" type="tel" required baseCls={inputBase} labelCls={labelBase} />
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

      <button type="submit" className={submitBase}>
        {submitLabel} →
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
  'Other, India',
  'Florida, USA',
  'Texas, USA',
  'Other, USA',
  'Other, International'
];

const BUDGETS = [
  '₹11 – 15 Lakhs',
  '₹16 – 25 Lakhs',
  '₹25 – 30 Lakhs',
  'Above ₹30 Lakhs',
  'USD 20K – 50K',
  'USD 50K+'
];

const TIMELINES = [
  'Within 1 month, fast track',
  '1 – 3 months',
  '3 – 6 months',
  'Just exploring'
];

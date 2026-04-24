'use client';

import { useEffect, useRef } from 'react';
import LeadForm from './LeadForm';

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {});
  }, []);

  return (
    <section
      id="top"
      className="relative min-h-[100dvh] w-full overflow-hidden bg-ink"
    >
      {/* background video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/images/hero.jpg"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/brecciaa.webm" type="video/webm" />
        <source src="/videos/brecciaa.mp4" type="video/mp4" />
      </video>

      {/* darkening overlays for legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/20 to-ink/75 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-ink/30 to-ink/60 pointer-events-none" />

      {/* content grid */}
      <div className="relative z-10 min-h-[100dvh] flex items-center">
        <div className="mx-auto max-w-[1600px] w-full px-5 sm:px-6 lg:px-10 pt-24 pb-14 md:pt-28 md:pb-20 lg:pt-32 lg:pb-24 grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* LEFT on desktop / ABOVE form on mobile — copy */}
          <div className="lg:col-span-7 max-w-[640px]">
            <div className="kicker text-bone/80 mb-4 lg:mb-5 fade-up text-[10px] md:text-[11px]">
              Introducing the World&rsquo;s First Wellness Kitchen
            </div>
            <h1 className="font-display text-bone leading-[1] md:leading-[0.98] text-[40px] sm:text-[48px] md:text-[5.5vw] lg:text-[4.4vw] fade-up delay-1 drop-shadow-[0_2px_24px_rgba(0,0,0,0.35)]">
              Kitchens built in stone.<br />
              For a lifetime of
              <em className="not-italic italic font-light"> wellness.</em>
            </h1>
            <p className="mt-5 md:mt-6 lg:mt-8 text-bone/80 max-w-xl text-[15px] md:text-base lg:text-lg leading-relaxed fade-up delay-2">
              Conventional plywood kitchens silently leak cancer-causing
              formaldehyde, harbor termites and catch fire easily. Magppie
              changed that. Our kitchens are built entirely in Silverstone,
              our patented anti-bacterial, anti-termite, fire-safe medicated
              stone. Safer. Cleaner. Built to last. Guaranteed for 25 years.
            </p>

            {/* inline trust row */}
            <div className="mt-6 md:mt-8 lg:mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 md:gap-x-6 md:gap-y-3 fade-up delay-3">
              <div className="kicker text-bone/60 text-[10px] md:text-[11px]">Trusted by</div>
              {[
                'Mukesh Ambani',
                'MS Dhoni',
                'Nitin Gadkari',
                'Shilpa Shetty',
                '+ 7 more'
              ].map((n) => (
                <span
                  key={n}
                  className="text-[9px] md:text-[11px] tracking-[0.18em] md:tracking-[0.22em] uppercase font-medium text-bone/70 border border-bone/20 px-2.5 py-1 md:px-3 md:py-1.5"
                >
                  {n}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT on desktop / BELOW copy on mobile — lead-capture card */}
          <div id="lead-form" className="lg:col-span-5 fade-up delay-2 w-full scroll-mt-24 md:scroll-mt-28">
            <div className="bg-bone border hairline shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
              <div className="px-5 sm:px-7 lg:px-9 pt-7 md:pt-8 pb-3">
                <h2 className="font-display text-ink text-[26px] sm:text-3xl lg:text-[2.1rem] leading-[1.1]">
                  Book a Free<br />
                  Consultation.
                </h2>
              </div>
              <div className="px-5 sm:px-7 lg:px-9 pb-7 md:pb-8">
                <LeadForm variant="light" compact submitLabel="Book my consultation" />
              </div>
            </div>
            <p className="mt-4 md:mt-5 text-[10px] md:text-[11px] tracking-[0.18em] md:tracking-[0.2em] uppercase text-bone/55 text-center lg:text-right">
              Starting from ₹8,400 / sq. ft.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

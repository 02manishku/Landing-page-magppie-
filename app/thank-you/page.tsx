import Link from 'next/link';
import Script from 'next/script';
import type { Metadata } from 'next';

/**
 * Post-submit confirmation page.
 *
 * Reached only by `LeadForm`'s router.push('/thank-you') after the
 * /api/lead POST succeeds. Acts as the canonical conversion signal:
 *  - The Meta Pixel and Google Ads base tags in the root layout
 *    fire a fresh PageView on this URL, so marketing can see
 *    submission volume by counting hits to /thank-you.
 *  - Robots are blocked (noindex) so the page never leaks into
 *    search results.
 */
export const metadata: Metadata = {
  title: 'Thank you — Magppie',
  description:
    'We’ve received your enquiry. A Magppie advisor will be in touch within 24 hours.',
  robots: { index: false, follow: false }
};

export default function ThankYouPage() {
  return (
    <>
      {/* Google Ads conversion event — fires ONLY on this page.
          Counts a successful lead-form submission against the
          AW-16532923749/3AdNCOHp088bEOXKwcs9 conversion goal so
          Google Ads can attribute the submission to its source ad
          and feed the auto-bidding optimiser. The dataLayer/gtag
          stub guards against the base tag still loading — the
          event will queue and process once gtag.js is ready. */}
      <Script id="gtag-conversion-thank-you" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('event', 'conversion', {'send_to': 'AW-16532923749/3AdNCOHp088bEOXKwcs9'});
        `}
      </Script>

      <section className="min-h-[80vh] bg-bone flex items-center justify-center px-6 py-24 md:py-32">
      <div className="max-w-2xl w-full text-center">
        <div className="kicker text-smoke mb-6">Enquiry Received</div>

        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-ink leading-[1.05]">
          Thank&nbsp;you.
        </h1>

        <p className="mt-8 md:mt-10 text-lg md:text-xl text-ink/70 leading-relaxed">
          We&rsquo;ve received your details. A Magppie advisor will be in
          touch within 24&nbsp;hours to understand your space and
          requirements.
        </p>

        {/* Optional immediate-contact paths */}
        <div className="mt-12 md:mt-14 pt-10 md:pt-12 border-t hairline grid sm:grid-cols-2 gap-8 sm:gap-10 text-left">
          <div>
            <div className="kicker text-smoke mb-3">Need to speak now?</div>
            <a
              href="tel:+919999999012"
              className="font-display text-2xl md:text-3xl text-ink hover-underline inline-block leading-none"
            >
              +91 99999 99012
            </a>
            <div className="text-[13px] text-ink/55 mt-2 leading-relaxed">
              Mon &ndash; Sat &middot; 10:00 &ndash; 19:00 IST
            </div>
          </div>
          <div>
            <div className="kicker text-smoke mb-3">Or write to us</div>
            <a
              href="mailto:info@mymagppie.com"
              className="font-display text-2xl md:text-3xl text-ink hover-underline inline-block leading-none break-all"
            >
              info@mymagppie.com
            </a>
            <div className="text-[13px] text-ink/55 mt-2 leading-relaxed">
              We typically reply the same business day.
            </div>
          </div>
        </div>

        <Link
          href="/"
          className="inline-block mt-12 md:mt-14 px-10 py-4 border border-ink text-ink kicker hover:bg-ink hover:text-bone transition-colors"
        >
          Return to home
        </Link>
      </div>
    </section>
    </>
  );
}

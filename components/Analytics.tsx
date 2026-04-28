import Script from 'next/script';

/**
 * Marketing analytics tags — page-view tracking only.
 *
 * Two tags are loaded:
 *  1. Google Tag (gtag.js) — Google Ads property AW-16532923749.
 *     Fires the standard `config` pageview on every page load.
 *  2. Meta Pixel — pixel ID 489653841564084.
 *     Fires `PageView` on every page load. The matching <noscript>
 *     image fallback lives in app/layout.tsx so it ships in the
 *     static HTML for visitors who block JS.
 *
 * Both use next/script with strategy="afterInteractive" so the
 * scripts load AFTER the page hydrates — no paint-blocking, no
 * impact on LCP or first-input-delay.
 *
 * Conversion-event firing on form submit is intentionally NOT
 * included here (no Google Ads conversion label available yet).
 * When that label arrives, hook it into LeadForm.tsx's success
 * branch by calling gtag('event', 'conversion', { send_to: '...' }).
 */
export default function Analytics() {
  return (
    <>
      {/* Google Tag (gtag.js) — Google Ads AW-16532923749 */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-16532923749"
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-16532923749');
        `}
      </Script>

      {/* Meta Pixel — 489653841564084 */}
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '489653841564084');
          fbq('track', 'PageView');
        `}
      </Script>
    </>
  );
}

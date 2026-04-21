import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-ink text-bone">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* brand */}
          <div className="lg:col-span-5">
            <Image
              src="/logos/magppie-white.svg"
              alt="Magppie"
              width={160}
              height={40}
              className="h-8 w-auto mb-8"
            />
            <p className="font-display text-3xl lg:text-4xl leading-tight max-w-md">
              For people<br />and planet.
            </p>
            <p className="mt-8 text-sm text-bone/60 max-w-md leading-relaxed">
              The world&rsquo;s first Wellness Kitchen brand. Fully built in
              patented anti-bacterial Silverstone™, guaranteed for 25 years.
            </p>
          </div>

          {/* contact */}
          <div className="lg:col-span-3">
            <div className="kicker text-bone/50 mb-5">Contact</div>
            <ul className="space-y-3 text-sm text-bone/80">
              <li>
                <a
                  href="tel:+919999999012"
                  className="hover-underline inline-block"
                >
                  <span className="text-bone/40 mr-2">IN</span>+91 99999 99012
                </a>
              </li>
              <li>
                <a
                  href="tel:+13522136412"
                  className="hover-underline inline-block"
                >
                  <span className="text-bone/40 mr-2">US</span>+1 352-213-6412
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@mymagppie.com"
                  className="hover-underline inline-block"
                >
                  info@mymagppie.com
                </a>
              </li>
            </ul>

            <div className="kicker text-bone/50 mt-8 mb-4">Headquarters</div>
            <address className="not-italic text-sm text-bone/70 leading-relaxed">
              Magppie Silverstone Pvt. Ltd.<br />
              352, Sultanpur, MG Road<br />
              New Delhi 110030<br />
              Mon – Sat · 10:00 – 19:00 IST
            </address>
          </div>

          {/* explore + social */}
          <div className="lg:col-span-4">
            <div className="kicker text-bone/50 mb-5">Explore</div>
            <ul className="space-y-3 text-sm text-bone/80">
              <li><a href="#why-wellness" className="hover-underline">Why Wellness</a></li>
              <li><a href="#silverstone" className="hover-underline">Silverstone™</a></li>
              <li><a href="#proof" className="hover-underline">Lab-tested Proof</a></li>
              <li><a href="#guarantee" className="hover-underline">25-Year Guarantee</a></li>
              <li><a href="#process" className="hover-underline">Our Process</a></li>
              <li><a href="#book" className="hover-underline">Book a consultation</a></li>
            </ul>

            <div className="kicker text-bone/50 mt-8 mb-4">Follow</div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-bone/80">
              <a
                href="https://www.instagram.com/magppie_wellness/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover-underline"
              >
                Instagram
              </a>
              <a
                href="https://www.youtube.com/channel/UCzO3W7kLOol2p8FwAv20hBg"
                target="_blank"
                rel="noopener noreferrer"
                className="hover-underline"
              >
                YouTube
              </a>
              <a
                href="https://www.facebook.com/magppiewellnesshomes/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover-underline"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-bone/15 flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between text-[11px] tracking-[0.14em] uppercase text-bone/40">
          <div>
            © {new Date().getFullYear()} Magppie Silverstone Pvt. Ltd. All rights reserved.
          </div>
          <div className="text-bone/30">
            Silverstone™ is patented by Magppie worldwide.
          </div>
        </div>
      </div>
    </footer>
  );
}

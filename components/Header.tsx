'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const NAV = [
  { label: 'Why Wellness', href: '#why-wellness' },
  { label: 'Silverstone™', href: '#silverstone' },
  { label: 'Proof', href: '#proof' },
  { label: 'Guarantee', href: '#guarantee' },
  { label: 'Process', href: '#process' }
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const onLight = scrolled || open;

  return (
    <header
      className={`fixed top-0 md:top-9 left-0 right-0 z-50 transition-all duration-500 ${
        onLight
          ? 'bg-bone/95 backdrop-blur border-b hairline'
          : 'bg-gradient-to-b from-ink/60 to-ink/0'
      }`}
    >
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="#top" className="flex items-center" aria-label="Magppie home">
            <Image
              src={onLight ? '/logos/magppie-black.png' : '/logos/magppie-white.svg'}
              alt="Magppie"
              width={onLight ? 280 : 160}
              height={onLight ? 145 : 36}
              priority
              className={`w-auto transition-all duration-300 ${
                onLight ? 'h-14 lg:h-16' : 'h-7 lg:h-8'
              }`}
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-9">
            {NAV.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`kicker hover-underline transition-colors ${
                  onLight ? 'text-ink' : 'text-bone drop-shadow-sm'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-5">
            {/* trust pills, only visible after scroll on light bar */}
            {onLight && (
              <div className="hidden xl:flex items-center gap-4 mr-2">
                <span className="text-[10px] tracking-[0.2em] uppercase text-smoke">
                  KBIS 2026
                </span>
                <span className="w-px h-3 bg-ink/15" />
                <span className="text-[10px] tracking-[0.2em] uppercase text-smoke">
                  Red Dot × 5
                </span>
                <span className="w-px h-3 bg-ink/15" />
                <span className="text-[10px] tracking-[0.2em] uppercase text-smoke">
                  25-Yr Guarantee
                </span>
              </div>
            )}
            <Link
              href="#book"
              className={`kicker px-5 py-3 transition-colors ${
                onLight
                  ? 'bg-ink text-bone hover:bg-smoke'
                  : 'bg-bone text-ink hover:bg-sand'
              }`}
            >
              Book consultation →
            </Link>
          </div>

          <button
            aria-label="Open menu"
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 -mr-2"
          >
            <div className={`w-6 h-px mb-1.5 ${onLight ? 'bg-ink' : 'bg-bone'}`} />
            <div className={`w-6 h-px mb-1.5 ${onLight ? 'bg-ink' : 'bg-bone'}`} />
            <div className={`w-4 h-px ml-auto ${onLight ? 'bg-ink' : 'bg-bone'}`} />
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-bone border-t hairline">
          <div className="px-6 py-6 space-y-4">
            {NAV.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block kicker text-ink"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="#book"
              className="block kicker bg-ink text-bone px-5 py-3 mt-4 text-center"
              onClick={() => setOpen(false)}
            >
              Book consultation →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

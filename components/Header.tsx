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
        <div className="grid grid-cols-[1fr_auto_1fr] items-center h-16 lg:h-20 gap-4">
          <Link
            href="#top"
            className="col-start-1 justify-self-start flex items-center"
            aria-label="Magppie home"
          >
            <Image
              src={onLight ? '/logos/magppie-black.png' : '/logos/magppie-white.svg'}
              alt="Magppie"
              width={onLight ? 280 : 160}
              height={onLight ? 145 : 36}
              priority
              className={`w-auto transition-all duration-300 ${
                onLight ? 'h-10 lg:h-16' : 'h-6 lg:h-8'
              }`}
            />
          </Link>

          <nav className="col-start-2 justify-self-center hidden lg:flex items-center gap-6 xl:gap-9">
            {NAV.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`kicker hover-underline whitespace-nowrap transition-colors ${
                  onLight ? 'text-ink' : 'text-bone drop-shadow-sm'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="col-start-3 justify-self-end hidden lg:flex items-center">
            <Link
              href="#lead-form"
              className={`kicker whitespace-nowrap px-5 py-3 transition-colors ${
                onLight
                  ? 'bg-ink text-bone hover:bg-smoke'
                  : 'bg-bone text-ink hover:bg-sand'
              }`}
            >
              Book consultation →
            </Link>
          </div>

          <div className="col-start-3 justify-self-end lg:hidden flex items-center gap-3">
            <Link
              href="#lead-form"
              className={`kicker whitespace-nowrap text-[10px] tracking-[0.2em] px-3.5 py-2.5 transition-colors ${
                onLight
                  ? 'bg-ink text-bone hover:bg-smoke'
                  : 'bg-bone text-ink hover:bg-sand'
              }`}
            >
              Book
            </Link>
            <button
              type="button"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen(!open)}
              style={{ touchAction: 'manipulation' }}
              className="relative z-[51] w-11 h-11 flex flex-col items-center justify-center gap-[6px] cursor-pointer"
            >
              <span className={`block w-6 h-[2px] transition-transform origin-center ${onLight ? 'bg-ink' : 'bg-bone'} ${open ? 'translate-y-[8px] rotate-45' : ''}`} />
              <span className={`block w-6 h-[2px] transition-opacity ${onLight ? 'bg-ink' : 'bg-bone'} ${open ? 'opacity-0' : ''}`} />
              <span className={`block w-6 h-[2px] transition-transform origin-center ${onLight ? 'bg-ink' : 'bg-bone'} ${open ? '-translate-y-[8px] -rotate-45' : ''}`} />
            </button>
          </div>
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
              href="#lead-form"
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

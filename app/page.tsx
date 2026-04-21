import Image from 'next/image';
import Link from 'next/link';
import HeroVideo from '@/components/HeroVideo';
import LeadForm from '@/components/LeadForm';

export default function HomePage() {
  return (
    <>
      {/* ═════════════════════════════════════════════════════ */}
      {/* HERO, with inline lead form                         */}
      {/* ═════════════════════════════════════════════════════ */}
      <HeroVideo />

      {/* PROOF STRIP ─ thin trust ribbon ─────────────────── */}
      <section className="bg-ink text-bone border-t border-bone/10">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-6 lg:px-10 py-5 md:py-6 grid grid-cols-3 md:grid-cols-5 gap-x-4 gap-y-5 md:gap-6 items-center">
          {PROOF_ITEMS.map((p, i) => (
            <div
              key={p.head}
              className={`text-center ${
                i === 3 ? 'col-start-1 md:col-start-auto' : ''
              }`}
            >
              <div className="font-display text-base md:text-xl lg:text-2xl text-bone leading-none">
                {p.head}
              </div>
              <div className="mt-1.5 text-[9px] md:text-[10px] tracking-[0.18em] md:tracking-[0.22em] uppercase text-bone/50 leading-tight">
                {p.sub}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════ */}
      {/* PRODUCT SHOWCASE, three applications                 */}
      {/* ═════════════════════════════════════════════════════ */}
      <section className="bg-bone py-14 md:py-20 lg:py-24">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
          <div className="max-w-3xl mb-12 lg:mb-16">
            <div className="kicker text-smoke mb-4">One Wellness System</div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.05] text-ink">
              Three products.
              <em className="not-italic text-smoke"> Built entirely in stone.</em>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-2">
            {PRODUCTS.map((p) => (
              <figure key={p.title} className="group relative overflow-hidden bg-ink">
                <div className="relative aspect-[4/5]">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    quality={100}
                    sizes="(min-width: 1600px) 800px, (min-width: 1024px) 50vw, (min-width: 768px) 34vw, 100vw"
                    style={{ objectPosition: p.pos ?? 'center' }}
                    className="object-cover tile-img opacity-95 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent" />
                </div>
                <figcaption className="absolute bottom-0 left-0 right-0 p-7 lg:p-9 text-bone">
                  <div className="kicker text-bone/80 mb-3">{p.kicker}</div>
                  <div className="font-display text-3xl lg:text-4xl leading-none">
                    {p.title}
                  </div>
                  <div className="text-[15px] md:text-base lg:text-[17px] text-bone/85 mt-4 leading-relaxed max-w-sm">
                    {p.copy}
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════ */}
      {/* 1. WHY WELLNESS, the problem (softened)              */}
      {/* ═════════════════════════════════════════════════════ */}
      <section id="why-wellness" className="bg-bone py-16 md:py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="max-w-3xl">
            <div className="kicker text-smoke mb-5">Why Wellness Matters</div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-ink">
              What quietly happens inside a conventional{' '}
              <em className="not-italic text-red-800">wood</em>
              <em className="not-italic text-smoke">-based</em> kitchen.
            </h2>
            <p className="mt-8 text-lg text-ink/70 leading-relaxed">
              Most modular kitchens in India are built in compressed wood, MDF,
              plywood, particle board. These kitchens are not safe for our
              families. Let&rsquo;s know why.
            </p>
          </div>

          <div className="mt-10 md:mt-16 grid md:grid-cols-3 gap-px bg-ink/10">
            {CONCERNS.map((c, i) => (
              <div key={c.title} className="bg-bone flex flex-col">
                <div className="p-6 md:p-8 lg:p-10 flex-1 flex flex-col">
                  <div className="font-display text-5xl text-ink/10 leading-none mb-2">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h3 className="font-display text-2xl lg:text-3xl text-ink mb-4 leading-tight">
                    {c.title}
                  </h3>
                  <p className="text-sm text-ink/70 leading-relaxed flex-1">{c.body}</p>
                  <div className="mt-6 pt-5 border-t hairline flex flex-col gap-2 text-[11px] tracking-[0.12em] uppercase">
                    <div className="flex items-center gap-3">
                      <span className="w-3 h-px bg-ink/30" />
                      <span className="text-ink/50">Wood, {c.bad}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-3 h-px bg-ink" />
                      <span className="text-ink">Silverstone™, {c.good}</span>
                    </div>
                  </div>
                </div>
                <div className="relative aspect-[5/3] overflow-hidden bg-sand">
                  <Image
                    src={c.image}
                    alt={c.title}
                    fill
                    quality={92}
                    sizes="(min-width: 1400px) 460px, (min-width: 768px) 33vw, 100vw"
                    className="object-cover tile-img"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/65 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 md:bottom-5 md:left-5">
                    <span className="font-display italic text-bone text-base md:text-lg leading-none drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)]">
                      This is a Magppie Kitchen
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════ */}
      {/* 2. SILVERSTONE, the solution                        */}
      {/* ═════════════════════════════════════════════════════ */}
      <section id="silverstone" className="bg-ink text-bone py-16 md:py-24 lg:py-32 relative overflow-hidden">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="kicker text-bone/50 mb-5">The Solution</div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-bone">
              Meet <em className="not-italic italic text-bone/80">Silverstone™</em>, the world&rsquo;s only antibacterial stone.
            </h2>
            <p className="mt-8 text-bone/65 leading-relaxed max-w-xl">
              Magppie&rsquo;s patented material is a 100% food-grade technical
              stone fused with silver and copper nanoparticles. So hygienic you
              can eat directly from it. The protection is permanent, engineered
              into the stone itself, never washed or worn away.
            </p>

            <ul className="mt-10 divide-y divide-bone/10 border-t border-b border-bone/10">
              {PROPERTIES.map((p) => (
                <li key={p.title} className="py-5 flex items-start gap-5">
                  <div className="font-display text-xl text-bone/50 w-10 flex-shrink-0 pt-1">
                    {p.sym}
                  </div>
                  <div>
                    <div className="text-bone font-medium text-[15px] mb-1">
                      {p.title}
                    </div>
                    <div className="text-sm text-bone/55 leading-relaxed">
                      {p.copy}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/images/01-copy.jpg"
                alt="Silverstone™, anti-bacterial technical stone"
                fill
                quality={95}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="kicker text-bone/70">Patented worldwide</div>
                <div className="font-display text-3xl lg:text-4xl text-bone mt-1">
                  Silverstone™
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════ */}
      {/* 3. PROOF,7 lab-tested cards                        */}
      {/* ═════════════════════════════════════════════════════ */}
      <section id="proof" className="bg-bone py-16 md:py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="max-w-3xl">
            <div className="kicker text-smoke mb-5">Lab-tested, life-proven</div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-ink">
              Every claim,
              <em className="not-italic text-smoke"> physically </em>
              demonstrated.
            </h2>
            <p className="mt-8 text-ink/65 leading-relaxed">
              Scratch tests. Fire tests. 30-day water immersion. Load tests.
              Impact drops. Every promise Magppie makes is backed by evidence
              you can see and verify.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-px bg-ink/10">
            {PROOFS.map((p, i) => (
              <div
                key={p.name}
                className="bg-bone p-6 lg:p-7 group transition-colors hover:bg-sand/60"
              >
                <div className="font-display text-3xl text-ink/12 leading-none mb-4">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="font-display text-lg lg:text-xl text-ink mb-2 leading-tight">
                  {p.name}
                </div>
                <p className="text-[12px] text-ink/60 leading-relaxed">
                  {p.copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════ */}
      {/* 4. COMPARISON, Wood vs Stone                        */}
      {/* ═════════════════════════════════════════════════════ */}
      <section className="bg-sand py-16 md:py-24 lg:py-32">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <div className="max-w-2xl">
            <div className="kicker text-smoke mb-5">The Evidence</div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-ink">
              Wood kitchen vs.
              <em className="not-italic text-smoke"> Stone </em>
              kitchen.
            </h2>
          </div>

          {/* DESKTOP TABLE (md and up) */}
          <div className="mt-12 md:mt-14 hidden md:block bg-bone border hairline">
            <div className="grid grid-cols-[1.4fr_1fr_1fr] text-[11px] tracking-[0.22em] uppercase">
              <div className="p-5 lg:p-6 text-smoke border-b hairline">
                Feature
              </div>
              <div className="p-5 lg:p-6 text-ink/50 border-l border-b hairline">
                Conventional wood
              </div>
              <div className="p-5 lg:p-6 text-bone bg-ink border-b hairline">
                Magppie Silverstone™
              </div>
            </div>
            {COMPARE_ROWS.map((r, i) => (
              <div
                key={r.feature}
                className={`grid grid-cols-[1.4fr_1fr_1fr] ${
                  i !== COMPARE_ROWS.length - 1 ? 'border-b hairline' : ''
                }`}
              >
                <div className="p-5 lg:p-6 text-[13px] text-smoke font-medium">
                  {r.feature}
                </div>
                <div className="p-5 lg:p-6 text-sm text-ink/55 border-l hairline">
                  {r.bad}
                </div>
                <div className="p-5 lg:p-6 text-sm text-ink font-medium bg-bone">
                  {r.good}
                </div>
              </div>
            ))}
          </div>

          {/* MOBILE STACK (below md) — card per row */}
          <div className="mt-12 md:hidden flex flex-col gap-3">
            {COMPARE_ROWS.map((r) => (
              <div key={r.feature} className="bg-bone border hairline">
                <div className="px-5 py-3 border-b hairline kicker text-smoke text-[10px]">
                  {r.feature}
                </div>
                <div className="px-5 py-4 border-b hairline">
                  <div className="kicker text-ink/40 text-[9px] mb-1.5">Wood</div>
                  <div className="text-sm text-ink/60 leading-snug">{r.bad}</div>
                </div>
                <div className="px-5 py-4 bg-ink/[0.02]">
                  <div className="kicker text-ink text-[9px] mb-1.5">Silverstone™</div>
                  <div className="text-sm text-ink font-medium leading-snug">{r.good}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════ */}
      {/* CINEMATIC BANNER between comparison and guarantee   */}
      {/* ═════════════════════════════════════════════════════ */}
      <section className="relative h-[55vh] min-h-[420px] lg:min-h-[520px] overflow-hidden">
        <Image
          src="/images/black-kitchen.jpg"
          alt="Magppie Wellness Kitchen in Flurry Black"
          fill
          quality={92}
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-ink/10 to-ink/70" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 pb-16 lg:pb-20 w-full">
            <div className="kicker text-bone/80 mb-5">A Quiet Moment</div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-bone max-w-3xl">
              Built to outlast
              <em className="not-italic italic text-bone/75"> generations.</em>
            </h2>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════ */}
      {/* 5. GUARANTEE,25 years                              */}
      {/* ═════════════════════════════════════════════════════ */}
      <section
        id="guarantee"
        className="relative bg-ink text-bone py-16 md:py-24 lg:py-32 overflow-hidden"
      >
        {/* big ghost numeral — desktop only */}
        <div
          aria-hidden
          className="hidden md:block absolute right-0 lg:right-10 top-1/2 -translate-y-1/2 font-display text-[18rem] lg:text-[30rem] text-bone/[0.025] leading-none pointer-events-none select-none"
        >
          25
        </div>

        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
          <div className="lg:col-span-6">
            <div className="kicker text-bone/50 mb-5">Our promise</div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-bone">
              A <em className="not-italic italic text-bone/80">25-year</em> unconditional guarantee.
            </h2>
            <p className="mt-8 text-bone/65 leading-relaxed max-w-xl">
              If anything ever happens to your Magppie kitchen, termites, water
              damage, discolouration, structural failure, it is entirely our
              responsibility. We make no excuses. We need no explanations from
              your side.
            </p>

            <ul className="mt-10 space-y-4">
              {GUARANTEE_ITEMS.map((g) => (
                <li key={g} className="flex items-start gap-4 text-bone/80 text-[15px]">
                  <span className="w-5 h-5 border border-bone/40 flex items-center justify-center text-[10px] mt-0.5 flex-shrink-0">
                    ✓
                  </span>
                  <span className="leading-relaxed">{g}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-6 grid gap-px bg-bone/10">
            {GUARANTEE_CARDS.map((g) => (
              <div
                key={g.title}
                className="bg-ink border-l-2 border-bone/25 p-8 lg:p-10"
              >
                <h3 className="font-display text-2xl lg:text-3xl text-bone mb-3 leading-tight">
                  {g.title}
                </h3>
                <p className="text-sm text-bone/55 leading-relaxed">
                  {g.copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════ */}
      {/* 6. CLIENTS, distinguished homes grid                */}
      {/* ═════════════════════════════════════════════════════ */}
      <section id="clients" className="bg-bone py-16 md:py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="max-w-3xl">
            <div className="kicker text-smoke mb-5">Distinguished Homes</div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-ink">
              Chosen by India&rsquo;s most
              <em className="not-italic text-smoke"> quietly discerning </em>
              families.
            </h2>
          </div>

          <div className="mt-10 md:mt-14 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-px bg-ink/10">
            {CELEBRITIES.map((c) => (
              <figure
                key={c.name}
                className="group bg-bone flex flex-col"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-sand">
                  <Image
                    src={c.image}
                    alt={c.name}
                    fill
                    quality={90}
                    sizes="(min-width: 768px) 230px, (min-width: 640px) 25vw, 33vw"
                    className="object-cover object-top tile-img grayscale-[20%] group-hover:grayscale-0 transition-[filter] duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/20 to-transparent pointer-events-none" />
                </div>
                <figcaption className="px-3 py-3 md:px-4 md:py-4">
                  <div className="font-display text-[15px] md:text-base text-ink leading-tight">
                    {c.name}
                  </div>
                  <div className="kicker text-smoke text-[9px] mt-1.5 leading-tight">
                    {c.role}
                  </div>
                </figcaption>
              </figure>
            ))}
            {/* closing card — private client list */}
            <figure className="bg-sand flex flex-col">
              <div className="relative aspect-[4/5] flex items-center justify-center">
                <div className="text-center px-3">
                  <div className="font-display text-3xl md:text-4xl text-ink/80 leading-none">
                    28,000&#8239;+
                  </div>
                  <div className="kicker text-smoke text-[9px] mt-3">Private clients</div>
                </div>
              </div>
              <figcaption className="px-3 py-3 md:px-4 md:py-4">
                <div className="font-display text-[15px] md:text-base text-ink leading-tight">
                  &amp; many more.
                </div>
                <div className="kicker text-smoke text-[9px] mt-1.5 leading-tight">
                  Across India &amp; the world
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════ */}
      {/* 7. TESTIMONIAL, Stacy McCarthy                      */}
      {/* ═════════════════════════════════════════════════════ */}
      <section className="bg-sand py-16 md:py-24 lg:py-32">
        <div className="mx-auto max-w-[1000px] px-6 lg:px-10 text-center">
          <div className="kicker text-smoke mb-8">From a Global Peer</div>
          <blockquote className="font-display text-2xl md:text-3xl lg:text-4xl leading-[1.2] text-ink italic">
            &ldquo;Working with Magppie was a revelation. The craftsmanship,
            the materials philosophy, the depth of thinking about how a kitchen
            should actually function for health, it&rsquo;s unlike anything
            I&rsquo;ve encountered in my 20-year career as a kitchen designer.&rdquo;
          </blockquote>
          <div className="mt-12 flex items-center justify-center gap-5">
            <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden bg-bone border hairline flex-shrink-0">
              <Image
                src="/testimonials/stacy_mccarthy.webp"
                alt="Stacy McCarthy"
                fill
                quality={95}
                sizes="224px"
                className="object-cover object-top"
              />
            </div>
            <div className="text-left">
              <div className="font-display text-xl text-ink leading-tight">
                Stacy McCarthy
              </div>
              <div className="text-[11px] tracking-[0.18em] uppercase text-smoke mt-1">
                Certified Master Kitchen &amp; Bath Designer · Florida, USA
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════ */}
      {/* 8. AWARDS                                            */}
      {/* ═════════════════════════════════════════════════════ */}
      <section id="awards" className="bg-bone py-16 md:py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="max-w-3xl">
            <div className="kicker text-smoke mb-5">Global Recognition</div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-ink">
              Recognised by the world&rsquo;s most
              <em className="not-italic text-smoke"> prestigious </em>
              design bodies.
            </h2>
          </div>

          <div className="mt-14 flex flex-wrap gap-3">
            {AWARDS.map((a) => (
              <span
                key={a}
                className="inline-flex items-center text-[11px] tracking-[0.16em] uppercase font-medium text-ink/75 border hairline px-4 py-2.5 bg-bone hover:border-ink/50 transition-colors"
              >
                {a}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            {MEMBERSHIPS.map((m) => (
              <span
                key={m}
                className="inline-flex items-center text-[11px] tracking-[0.16em] uppercase font-medium text-smoke px-4 py-2.5 bg-sand/60"
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════ */}
      {/* 9. PROCESS,4 steps                                 */}
      {/* ═════════════════════════════════════════════════════ */}
      <section id="process" className="bg-sand py-16 md:py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="max-w-3xl">
            <div className="kicker text-smoke mb-5">The Process</div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-ink">
              From enquiry to
              <em className="not-italic text-smoke"> your dream kitchen</em>
              , in four steps.
            </h2>
          </div>

          <div className="mt-10 md:mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-ink/10">
            {STEPS.map((s, i) => (
              <div key={s.title} className="bg-bone p-7 md:p-10 flex flex-col">
                <div className="font-display text-4xl md:text-5xl text-ink/15 leading-none">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="font-display text-xl md:text-2xl lg:text-3xl text-ink mt-6 md:mt-8 mb-3 md:mb-4 leading-tight">
                  {s.title}
                </h3>
                <p className="text-sm text-ink/65 leading-relaxed">{s.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════ */}
      {/* 10. BOOK, final lead form                           */}
      {/* ═════════════════════════════════════════════════════ */}
      <section
        id="book"
        className="relative bg-ink text-bone py-16 md:py-24 lg:py-32 overflow-hidden"
      >
        {/* subtle backdrop */}
        <div className="absolute inset-0 opacity-40">
          <Image
            src="/images/02.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-ink/75" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10 grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-6">
            <div className="kicker text-bone/50 mb-5">Your move</div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-bone">
              Book a private
              <em className="not-italic italic text-bone/80"> Magppie </em>
              consultation.
            </h2>
            <p className="mt-8 text-bone/65 leading-relaxed max-w-xl">
              The consultation is private, free, takes 20 minutes and comes
              with no obligation. A Magppie advisor will present a custom 3D
              design for your space and transparent pricing within 24 hours.
            </p>

            <ul className="mt-10 space-y-3.5">
              {FINAL_BULLETS.map((b) => (
                <li key={b} className="flex items-start gap-4 text-bone/75 text-[15px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-bone/60 mt-2.5 flex-shrink-0" />
                  <span className="leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-12 pt-8 border-t border-bone/15 flex flex-col sm:flex-row gap-5 sm:gap-10 text-sm">
              <div>
                <div className="kicker text-bone/45 mb-2">India</div>
                <a
                  href="tel:+919999999012"
                  className="text-bone hover-underline"
                >
                  +91 99999 99012
                </a>
              </div>
              <div>
                <div className="kicker text-bone/45 mb-2">USA</div>
                <a
                  href="tel:+13522136412"
                  className="text-bone hover-underline"
                >
                  +1 352-213-6412
                </a>
              </div>
              <div>
                <div className="kicker text-bone/45 mb-2">Email</div>
                <a
                  href="mailto:info@mymagppie.com"
                  className="text-bone hover-underline"
                >
                  info@mymagppie.com
                </a>
              </div>
            </div>
          </div>

          {/* form card */}
          <div className="lg:col-span-6">
            <div className="bg-bone text-ink">
              <div className="px-8 lg:px-10 pt-9 pb-3">
                <div className="kicker text-smoke mb-3">Private Enquiry</div>
                <h3 className="font-display text-3xl lg:text-[2.1rem] text-ink leading-[1.1]">
                  Book a Free<br />
                  Consultation.
                </h3>
              </div>
              <div className="px-8 lg:px-10 pb-10">
                <LeadForm
                  variant="light"
                  submitLabel="Get my free design consultation"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ─────────────────────────────────────────────────────────── */
/* DATA                                                        */
/* ─────────────────────────────────────────────────────────── */

const PROOF_ITEMS = [
  { head: 'KBIS 2026',        sub: 'Most Unexpected Innovation' },
  { head: 'Red Dot Winner',   sub: '4 times in a row' },
  { head: 'India & USA',      sub: 'Going global' },
  { head: '25 Years',         sub: 'Unconditional guarantee' },
  { head: 'Since 2006',       sub: '2 decades of craft' }
];

const CONCERNS = [
  {
    title: 'Formaldehyde emissions',
    body: 'Compressed wood, MDF, plywood, particle board, continuously off-gases formaldehyde, classified by the World Health Organisation as a Group 1 carcinogen. This happens silently, every day, in the room where your family cooks and breathes.',
    bad: 'Released daily',
    good: 'Zero emissions',
    image: '/images/00.jpg'
  },
  {
    title: 'Moisture, mould & fungus',
    body: 'Wood is porous. It absorbs steam and moisture from every meal. Over 2–3 years, mould begins growing inside cabinets, invisible to the eye, releasing spores into the air your family breathes.',
    bad: 'Absorbs moisture',
    good: 'Zero absorption',
    image: '/images/concept-moisture.jpg'
  },
  {
    title: 'Termites & decay',
    body: 'Termites eat wood from the inside out, silently, invisibly. By the time the damage is visible, the cabinetry structure is often irreparable. Most families replace their kitchen within ten years.',
    bad: 'Termite risk',
    good: 'Termite-proof',
    image: '/images/Hailuo_Image_re-render-it-8k-quality-render_489929208284426245.jpg'
  }
];

const PRODUCTS = [
  {
    title: 'Wellness Kitchen',
    kicker: 'Wellness 01',
    image: '/images/33.jpg',
    pos: '35% center',
    copy: 'Every cabinet, door, countertop, backsplash and door accessories, all in patented Silverstone™.'
  },
  {
    title: 'Wellness Wardrobes',
    kicker: 'Wellness 02',
    image: '/images/wardrobes/concept-1.webp',
    copy: 'Zero-formaldehyde wardrobes, safer for skin and clothes.'
  },
  {
    title: 'Wellness Vanities',
    kicker: 'Wellness 03',
    image: '/images/vanities/onyx-gold-overmount.webp',
    copy: 'Mould-proof, water-proof. Built for the most humid room.'
  }
];

const PROPERTIES = [
  { sym: 'Ag',  title: 'What is Silverstone?', copy: 'Silverstone is a material made by infusing silver and copper inside. It is built into the stone itself, it cannot be washed or wear away.' },
  { sym: 'H₂O', title: '100% waterproof, zero absorption',       copy: 'Silverstone™ absorbs zero moisture. No swelling, no mould, no weakening. Verified by 30-day immersion.' },
  { sym: '°C',  title: 'Fire resistant, non-combustible',         copy: 'Silverstone does not burn or spread flame. The safest surface to live around daily cooking heat.' },
  { sym: 'Ø',   title: 'Zero formaldehyde, zero toxins',           copy: 'Silverstone releases nothing. No off-gassing, no VOCs, no carcinogens. Ever.' },
  { sym: '∞',   title: '100% sustainable, zero deforestation',    copy: 'No trees felled, no chemical laminates. A kitchen that is genuinely good for the planet.' }
];

const PROOFS = [
  { name: 'Stain safe',     copy: 'Coffee, haldi, oil, wipe clean every time. Non-porous stone absorbs nothing.' },
  { name: 'Scratch safe',   copy: 'Daily knife work, chopping, scratch-resistant Silverstone™ leaves zero marks.' },
  { name: '80 kg load',     copy: 'Each drawer holds 80 kg without bending or losing structural integrity.' },
  { name: 'Fire safe',      copy: 'Stone does not combust or spread flame. Safe around daily open-flame cooking.' },
  { name: 'Water safe',     copy: '30-day water immersion: wood swelled and collapsed. Stone: zero change.' },
  { name: 'Impact safe',    copy: 'Heavy ceramic jar dropped on surface. Stone intact. Built for real kitchen life.' },
  { name: '62% more space', copy: 'Extra-depth wall cabinets fit large Indian plates standard kitchens cannot.' }
];

const COMPARE_ROWS = [
  { feature: 'Formaldehyde emissions', bad: 'Released daily, WHO carcinogen',       good: 'Zero emissions. Pure air.' },
  { feature: 'Termite resistance',     bad: 'Eaten silently from inside out',        good: 'Stone cannot be eaten. Ever.' },
  { feature: 'Mould & fungus',         bad: 'Absorbs moisture, mould in 2–3 years', good: 'Zero absorption. Zero mould.' },
  { feature: 'Antibacterial',          bad: 'Bacteria thrives on porous wood',       good: 'Silver-nano kills bacteria permanently' },
  { feature: 'Fire safety',            bad: 'Combustible, spreads flame',           good: 'Non-combustible. Fire-resistant.' },
  { feature: 'Longevity',              bad: 'Degrades in 8 – 12 years',              good: '25-year unconditional guarantee' },
  { feature: 'Sustainability',         bad: 'Tree felling + toxic laminates',         good: 'Zero trees. 100% eco.' }
];

const GUARANTEE_ITEMS = [
  '25-year unconditional stone guarantee, all damage covered',
  '25 complimentary annual home visits, deep clean & inspection',
  'The strongest commitment in the kitchen industry, globally'
];

const GUARANTEE_CARDS = [
  {
    title: '25 years, unconditional',
    copy: 'Termites, water damage, swelling, warping, colour change, everything covered. No exceptions. No exclusions. Our stone is our promise.'
  },
  {
    title: 'Annual home visits, 25 years included',
    copy: 'Every year for 25 years, our team visits your home: they clean, they do alignment check, full inspection. Your kitchen always looks and feels brand new.'
  }
];

const CELEBRITIES = [
  { name: 'Mukesh Ambani',   role: 'Chairman, Reliance Industries',        image: '/testimonials/mukesh_ambani.webp' },
  { name: 'Anant Ambani',    role: 'Director, Reliance Industries',        image: '/testimonials/anant_ambani.webp' },
  { name: 'M. S. Dhoni',     role: 'World Cup-winning Captain',            image: '/testimonials/ms_dhoni.webp' },
  { name: 'Nitin Gadkari',   role: 'Union Minister of Road Transport',     image: '/testimonials/nitin_gadkari.webp' },
  { name: 'Kamal Nath',      role: 'Member of Parliament, India',          image: '/testimonials/kamal_nath.webp' },
  { name: 'Shilpa Shetty',   role: 'Actress',                              image: '/testimonials/shilpa_shetty.webp' },
  { name: 'Peyush Bansal',   role: 'Founder, Lenskart',                    image: '/testimonials/peyush_bansal.webp' },
  { name: 'Akhil Akkineni',  role: 'Actor',                                image: '/testimonials/akhil_akkineni.webp' },
  { name: 'Rizwan Sajan',    role: 'Founder, Danube Group',                image: '/testimonials/rizwan_sajan.webp' },
  { name: 'Ritesh Malik',    role: 'Founder, Innov8',                      image: '/testimonials/ritesh_malik.webp' },
  { name: 'Rushi Ajmera',    role: 'Ajmera Realty',                        image: '/testimonials/rushi_ajmera.webp' }
];

const AWARDS = [
  'Most Unexpected Innovation Award, KBIS 2026 · Orlando',
  'Red Dot Award 2007',
  'Red Dot Award 2008',
  'Red Dot Award 2009',
  'Red Dot Best of the Best 2010',
  'iF International Design Award 2010, Germany',
  'EDIDA India, Best Kitchen 2013',
  'Quality Excellence Award, Paris',
  'MOMA Museum, San Francisco',
  'MCHI CREDAI Preferred Partner 2016',
  'TISE 2026, Las Vegas',
  'Home Show 2026, Miami'
];

const MEMBERSHIPS = [
  'ISFA, International Surface Fabricators Association',
  'NKBA, National Kitchen & Bath Association',
  'NSI, National Stone Institute'
];

const STEPS = [
  {
    title: 'Free consultation',
    copy: 'Share a few details. Our design expert calls within 24 hours to understand your space, lifestyle and needs.'
  },
  {
    title: 'Design presentation',
    copy: 'Receive a detailed 3D design with full material options, configurations and a transparent cost sheet.'
  },
  {
    title: 'Approve & produce',
    copy: 'Approve your design and commercials. Our factory begins custom production, approximately three months to completion.'
  },
  {
    title: 'Install & enjoy',
    copy: 'Our expert team installs your Wellness Kitchen. You receive your 25-year guarantee and annual care schedule.'
  }
];

const FINAL_BULLETS = [
  '100% free consultation, zero cost, zero pressure',
  'Custom 3D design presentation for your exact space',
  'Transparent pricing with no hidden charges',
  'Starting from ₹8,400 per sq. ft.',
  '25-year unconditional guarantee from day one',
  'Trusted by Mukesh Ambani, MS Dhoni and many more',
  'KBIS 2026 Most Unexpected Innovation winner'
];

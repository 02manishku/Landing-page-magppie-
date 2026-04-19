export default function TopBar() {
  return (
    <div className="hidden md:block fixed top-0 left-0 right-0 z-[60] bg-ink text-bone/80 text-[11px] tracking-[0.18em] uppercase font-medium border-b border-bone/10">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10 h-9 flex items-center justify-between gap-6">
        <div className="hidden md:block truncate">
          <span className="text-bone/50">KBIS 2026 · Orlando</span>
          <span className="mx-3 text-bone/25">·</span>
          <span className="text-bone">
            Most Unexpected Innovation, alongside Caesarstone &amp; LG
          </span>
        </div>
        <div className="flex items-center gap-5 ml-auto">
          <a
            href="tel:+919999999012"
            className="hover:text-bone transition-colors text-bone/70"
          >
            <span className="text-bone/40 mr-2">IN</span>+91 99999 99012
          </a>
          <span className="hidden md:inline text-bone/20">·</span>
          <a
            href="tel:+13522136412"
            className="hidden md:inline hover:text-bone transition-colors text-bone/70"
          >
            <span className="text-bone/40 mr-2">US</span>+1 352-213-6412
          </a>
        </div>
      </div>
    </div>
  );
}

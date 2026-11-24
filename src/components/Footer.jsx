import { FLAVOR_ORDER, FLAVORS } from '../data/flavors';

export default function Footer({ onNavigate, onSelectFlavor }) {
  return (
    <footer className="border-t border-white/8 bg-[var(--bg-deep)] pt-[clamp(44px,5vw,62px)] pb-7 text-white transition-colors duration-550">
      <div className="mx-auto max-w-[1180px] px-[clamp(20px,4.5vw,44px)]">
        <div className="grid grid-cols-1 gap-[clamp(26px,4vw,48px)] pb-[clamp(32px,4vw,44px)] sm:grid-cols-2 lg:grid-cols-[minmax(0,1.6fr)_repeat(3,minmax(0,1fr))]">
          {/* Brand Column */}
          <div>
            <a
              href="#hero"
              onClick={(e) => onNavigate('hero', e)}
              aria-label="Back to Power Crunch top"
              className="inline-flex items-baseline gap-[5px] font-display text-[clamp(1.02rem,1.55vw,1.28rem)] font-black leading-none tracking-[0.04em] no-underline transition-opacity duration-250 hover:opacity-90"
            >
              <span className="text-white">POWER</span>
              <span className="text-[var(--accent)] transition-colors duration-450">
                CRUNCH
              </span>
            </a>

            <p className="mt-3.5 mb-5 max-w-[300px] text-[0.86rem] leading-[1.6] text-[#fff5ec]/62">
              Crème-filled protein wafer bars crafted with high-DH hydrolyzed
              whey protein and 0g sugar alcohols.
            </p>

            <div className="flex items-center gap-2.5" aria-label="Social links">
              <a
                href="#hero"
                onClick={(e) => onNavigate('hero', e)}
                aria-label="Instagram"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/16 text-white/72 no-underline transition-[color,border-color,background-color,transform] duration-250 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--accent-cta-text)]"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
                  <circle cx="12" cy="12" r="4.2" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>

              <a
                href="#hero"
                onClick={(e) => onNavigate('hero', e)}
                aria-label="YouTube"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/16 text-white/72 no-underline transition-[color,border-color,background-color,transform] duration-250 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--accent-cta-text)]"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="2.5" y="5.5" width="19" height="13" rx="3.5" />
                  <polygon
                    points="10,9.2 15.4,12 10,14.8"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
              </a>

              <a
                href="#hero"
                onClick={(e) => onNavigate('hero', e)}
                aria-label="X"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/16 text-white/72 no-underline transition-[color,border-color,background-color,transform] duration-250 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--accent-cta-text)]"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Flavours Column */}
          <div>
            <h4 className="mb-3.5 font-display text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-white">
              FLAVOURS
            </h4>
            <ul className="flex list-none flex-col gap-2.5">
              {FLAVOR_ORDER.map((id) => (
                <li key={id}>
                  <a
                    href="#flavours"
                    onClick={(e) => {
                      onSelectFlavor(id, { resetScroll: false });
                      onNavigate('flavours', e);
                    }}
                    className="text-[0.85rem] font-medium text-[#fff5ec]/64 no-underline transition-colors duration-250 hover:text-[var(--accent)]"
                  >
                    {FLAVORS[id].name}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#bestsellers"
                  onClick={(e) => onNavigate('bestsellers', e)}
                  className="text-[0.85rem] font-medium text-[#fff5ec]/64 no-underline transition-colors duration-250 hover:text-[var(--accent)]"
                >
                  Best Sellers Box
                </a>
              </li>
            </ul>
          </div>

          {/* Learn Column */}
          <div>
            <h4 className="mb-3.5 font-display text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-white">
              LEARN
            </h4>
            <ul className="flex list-none flex-col gap-2.5">
              <li>
                <a
                  href="#why"
                  onClick={(e) => onNavigate('why', e)}
                  className="text-[0.85rem] font-medium text-[#fff5ec]/64 no-underline transition-colors duration-250 hover:text-[var(--accent)]"
                >
                  Why Power Crunch
                </a>
              </li>
              <li>
                <a
                  href="#nutrition"
                  onClick={(e) => onNavigate('nutrition', e)}
                  className="text-[0.85rem] font-medium text-[#fff5ec]/64 no-underline transition-colors duration-250 hover:text-[var(--accent)]"
                >
                  Nutrition Facts
                </a>
              </li>
              <li>
                <a
                  href="#ingredients"
                  onClick={(e) => onNavigate('ingredients', e)}
                  className="text-[0.85rem] font-medium text-[#fff5ec]/64 no-underline transition-colors duration-250 hover:text-[var(--accent)]"
                >
                  Ingredients
                </a>
              </li>
              <li>
                <a
                  href="#reviews"
                  onClick={(e) => onNavigate('reviews', e)}
                  className="text-[0.85rem] font-medium text-[#fff5ec]/64 no-underline transition-colors duration-250 hover:text-[var(--accent)]"
                >
                  Reviews
                </a>
              </li>
            </ul>
          </div>

          {/* Highlights Column */}
          <div>
            <h4 className="mb-3.5 font-display text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-white">
              HIGHLIGHTS
            </h4>
            <ul className="flex list-none flex-col gap-2.5">
              <li>
                <a
                  href="#flavours"
                  onClick={(e) => onNavigate('flavours', e)}
                  className="text-[0.85rem] font-medium text-[#fff5ec]/64 no-underline transition-colors duration-250 hover:text-[var(--accent)]"
                >
                  12 Count Box · $21.99
                </a>
              </li>
              <li>
                <a
                  href="#nutrition"
                  onClick={(e) => onNavigate('nutrition', e)}
                  className="text-[0.85rem] font-medium text-[#fff5ec]/64 no-underline transition-colors duration-250 hover:text-[var(--accent)]"
                >
                  12–13g Whey Protein
                </a>
              </li>
              <li>
                <a
                  href="#ingredients"
                  onClick={(e) => onNavigate('ingredients', e)}
                  className="text-[0.85rem] font-medium text-[#fff5ec]/64 no-underline transition-colors duration-250 hover:text-[var(--accent)]"
                >
                  0g Sugar Alcohols
                </a>
              </li>
              <li>
                <a
                  href="#hero"
                  onClick={(e) => onNavigate('hero', e)}
                  className="text-[0.85rem] font-medium text-[#fff5ec]/64 no-underline transition-colors duration-250 hover:text-[var(--accent)]"
                >
                  Back to Top &uarr;
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Bar — Centered Privacy · Terms · Cookies on Desktop, Stacked on Mobile */}
        <div className="grid grid-cols-1 items-center justify-items-center gap-3 border-t border-white/8 pt-[22px] text-center text-[0.78rem] text-[#fff5ec]/50 md:grid-cols-[1fr_auto_1fr] md:justify-items-stretch md:gap-3.5 md:text-left">
          <span>&copy; 2026 POWER CRUNCH. All rights reserved.</span>

          <nav
            aria-label="Legal links"
            className="order-first inline-flex items-center justify-center gap-5 md:order-none md:gap-[22px]"
          >
            {['Privacy', 'Terms', 'Cookies'].map((label) => (
              <a
                key={label}
                href="#hero"
                onClick={(e) => onNavigate('hero', e)}
                className="nav-underline py-1 px-0.5 text-[0.8rem] font-medium text-[#fff5ec]/58 no-underline transition-[color,transform] duration-250 hover:-translate-y-px hover:text-[var(--accent)]"
              >
                {label}
              </a>
            ))}
          </nav>

          <span aria-hidden="true" className="hidden md:block" />
        </div>
      </div>
    </footer>
  );
}

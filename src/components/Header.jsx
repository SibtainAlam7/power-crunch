import { HEADER_NAV_LINKS } from '../data/flavors';

export default function Header({
  isScrolled,
  activeSection,
  mobileMenuOpen,
  onToggleMobileMenu,
  onNavigate,
  headerProgressRef,
}) {
  const scrolledOrOpen = isScrolled || mobileMenuOpen;

  return (
    <header
      id="siteHeader"
      aria-label="Primary Navigation"
      className={[
        'site-header fixed top-0 left-0 right-0 z-50 border-b transition-[background-color,border-color,backdrop-filter,padding] duration-350 ease-out',
        scrolledOrOpen
          ? 'is-scrolled bg-[var(--header-scrolled-bg)] border-white/10 backdrop-blur-lg pt-[max(12px,env(safe-area-inset-top))] pb-[12px] md:pt-[max(13px,env(safe-area-inset-top))] md:pb-[13px]'
          : 'bg-transparent border-transparent pt-[max(12px,env(safe-area-inset-top))] pb-[12px] md:pt-[max(16px,env(safe-area-inset-top))] md:pb-[16px]',
        'px-3.5 md:px-[clamp(20px,4.5vw,56px)]',
      ].join(' ')}
    >
      <div className="mx-auto flex max-w-[1480px] items-center justify-between gap-2.5 md:gap-5">
        {/* Brand Logo: POWER stays white, CRUNCH adapts to selected flavor */}
        <a
          href="#hero"
          onClick={(e) => onNavigate('hero', e)}
          aria-label="Power Crunch Home"
          className="inline-flex items-baseline gap-[5px] font-display text-[0.96rem] md:text-[clamp(1.02rem,1.55vw,1.28rem)] font-black leading-none tracking-[0.04em] no-underline transition-opacity duration-250 hover:opacity-90"
        >
          <span className="text-white">POWER</span>
          <span className="text-[var(--accent)] transition-colors duration-450">
            CRUNCH
          </span>
        </a>

        <div className="inline-flex items-center gap-2 md:gap-[clamp(16px,2.6vw,34px)]">
          {/* Desktop Navigation */}
          <nav
            className="hidden items-center gap-[clamp(18px,2.4vw,32px)] md:inline-flex"
            aria-label="Main links"
          >
            {HEADER_NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  data-nav-section={link.id}
                  onClick={(e) => onNavigate(link.id, e)}
                  className={[
                    'nav-underline pb-0.5 text-[0.88rem] font-medium tracking-[0.01em] no-underline transition-colors duration-250',
                    isActive
                      ? 'is-active text-white'
                      : 'text-white/78 hover:text-white',
                  ].join(' ')}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Primary CTA Pill */}
          <a
            href="#flavours"
            onClick={(e) => onNavigate('flavours', e)}
            className="cta-sheen inline-flex items-center justify-center whitespace-nowrap rounded-full bg-[var(--accent)] px-3 py-2 text-[0.67rem] font-extrabold uppercase tracking-[0.09em] text-[var(--accent-cta-text)] no-underline shadow-[0_6px_20px_rgba(0,0,0,0.28)] transition-[background-color,color,transform,filter] duration-350 hover:-translate-y-px hover:brightness-108 md:px-[clamp(16px,2vw,24px)] md:py-2.5 md:text-[0.76rem]"
          >
            SHOP FLAVOURS
          </a>

          {/* Mobile Hamburger Button (< 768px) */}
          <button
            type="button"
            id="mobileMenuBtn"
            onClick={onToggleMobileMenu}
            aria-label={
              mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'
            }
            aria-expanded={mobileMenuOpen}
            aria-controls="mobileMenu"
            className={[
              'inline-flex h-9 w-9 shrink-0 cursor-pointer flex-col items-center justify-center gap-[5px] rounded-full border backdrop-blur-md transition-[border-color,background-color,transform] duration-250 active:scale-95 md:hidden',
              mobileMenuOpen
                ? 'is-open border-[var(--accent)] bg-[rgba(var(--accent-rgb),0.18)]'
                : 'border-white/22 bg-[rgba(16,8,4,0.56)] hover:border-[var(--accent)]',
            ].join(' ')}
          >
            <span
              aria-hidden="true"
              className={[
                'h-[2px] w-[18px] origin-center rounded-full transition-[transform,opacity,background-color] duration-350',
                mobileMenuOpen
                  ? 'translate-y-[7px] rotate-45 bg-[var(--accent)]'
                  : 'bg-white',
              ].join(' ')}
            />
            <span
              aria-hidden="true"
              className={[
                'h-[2px] w-[18px] origin-center rounded-full transition-[transform,opacity,background-color] duration-250',
                mobileMenuOpen ? 'scale-x-0 opacity-0 bg-white' : 'bg-white',
              ].join(' ')}
            />
            <span
              aria-hidden="true"
              className={[
                'h-[2px] w-[18px] origin-center rounded-full transition-[transform,opacity,background-color] duration-350',
                mobileMenuOpen
                  ? '-translate-y-[7px] -rotate-45 bg-[var(--accent)]'
                  : 'bg-white',
              ].join(' ')}
            />
          </button>
        </div>
      </div>

      {/* Smooth Reading Progress Hairline along bottom edge of scrolled header */}
      <div
        aria-hidden="true"
        className={[
          'pointer-events-none absolute right-0 bottom-0 left-0 h-[2px] transition-opacity duration-300',
          scrolledOrOpen ? 'opacity-100' : 'opacity-0',
        ].join(' ')}
      >
        <div
          ref={headerProgressRef}
          id="headerProgressFill"
          className="h-full w-full origin-left scale-x-0 bg-[linear-gradient(90deg,var(--accent-strong),var(--accent))] will-change-transform transition-[background] duration-450"
        />
      </div>
    </header>
  );
}

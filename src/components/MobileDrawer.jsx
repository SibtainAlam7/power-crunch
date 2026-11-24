import { FLAVOR_ORDER, FLAVORS, MOBILE_NAV_LINKS } from '../data/flavors';

export default function MobileDrawer({
  isOpen,
  activeFlavor,
  onClose,
  onNavigate,
  onSelectFlavor,
}) {
  return (
    <>
      {/* Blurred Backdrop */}
      <div
        id="mobileMenuBackdrop"
        aria-hidden={!isOpen}
        onClick={onClose}
        className={[
          'fixed inset-0 z-44 bg-[rgba(8,4,3,0.58)] backdrop-blur-sm transition-opacity duration-350 md:hidden',
          isOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0',
        ].join(' ')}
      />

      {/* Slide-Down Dark Frosted Drawer */}
      <nav
        id="mobileMenu"
        aria-label="Mobile Navigation"
        aria-hidden={!isOpen}
        className={[
          'mobile-menu fixed top-0 right-0 left-0 z-46 border-b border-[rgba(var(--accent-rgb),0.28)] bg-[var(--header-scrolled-bg)] pt-[calc(max(12px,env(safe-area-inset-top))+58px)] shadow-[0_24px_56px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-[transform,opacity,background-color] duration-450 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden',
          isOpen
            ? 'is-open pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-[105%] opacity-0',
        ].join(' ')}
      >
        <div className="flex flex-col gap-5 px-5 pt-3 pb-6">
          <ul className="flex list-none flex-col">
            {MOBILE_NAV_LINKS.map((item, idx) => (
              <li
                key={item.id}
                style={{ '--m-idx': idx }}
                className="mobile-menu-item border-b border-white/8"
              >
                <a
                  href={`#${item.id}`}
                  onClick={(e) => onNavigate(item.id, e)}
                  className="flex items-center gap-3.5 px-1 py-3.5 font-display text-[1.05rem] font-extrabold tracking-[-0.01em] text-white no-underline transition-[color,transform] duration-250 hover:translate-x-1 hover:text-[var(--accent)]"
                >
                  <span className="text-[0.72rem] font-extrabold tracking-[0.12em] text-[var(--accent)]">
                    {item.num}
                  </span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-2.5">
            <span className="text-[0.66rem] font-extrabold uppercase tracking-[0.22em] text-[#fff5ec]/56">
              SWITCH FLAVOUR
            </span>
            <div className="grid grid-cols-3 gap-2">
              {FLAVOR_ORDER.map((id) => {
                const flavor = FLAVORS[id];
                const isActive = activeFlavor === id;
                return (
                  <button
                    key={id}
                    type="button"
                    data-select-flavor={id}
                    onClick={() => onSelectFlavor(id, { resetScroll: false })}
                    className={[
                      'inline-flex cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-xl border px-2 py-2.5 text-[0.72rem] font-bold transition-[background-color,border-color,color] duration-250',
                      isActive
                        ? 'is-active border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-cta-text)]'
                        : 'border-white/14 bg-white/5 text-white/84 hover:border-white/30 hover:text-white',
                    ].join(' ')}
                  >
                    <span
                      aria-hidden="true"
                      className={`h-2 w-2 shrink-0 rounded-full ${flavor.swatchClass} shadow-[0_0_0_2px_rgba(255,255,255,0.22)]`}
                    />
                    {flavor.shortName}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

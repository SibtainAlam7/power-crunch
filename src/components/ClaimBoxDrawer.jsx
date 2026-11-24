import { useEffect, useState } from 'react';
import { FLAVOR_ORDER, FLAVORS } from '../data/flavors';

const PACKS = [
  {
    id: 'single',
    title: '1 Box (12 Bars)',
    subtitle: '40g each · Try your favourite',
    unitPrice: 21.99,
    compareAt: null,
    badge: null,
    freeShip: false,
  },
  {
    id: 'double',
    title: '2 Boxes (24 Bars)',
    subtitle: 'Most popular · Free shipping',
    unitPrice: 39.58,
    compareAt: 43.98,
    badge: 'SAVE 10%',
    freeShip: true,
  },
  {
    id: 'variety',
    title: '3-Flavour Pack (36 Bars)',
    subtitle: 'All 3 flavours · Free shipping',
    unitPrice: 56.07,
    compareAt: 65.97,
    badge: 'SAVE 15%',
    freeShip: true,
  },
];

export default function ClaimBoxDrawer({
  isOpen,
  activeFlavor,
  onClose,
  onSelectFlavor,
}) {
  const [selectedPackId, setSelectedPackId] = useState('single');
  const [qty, setQty] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const flavor = FLAVORS[activeFlavor];
  const pack = PACKS.find((p) => p.id === selectedPackId) || PACKS[0];
  const total = (pack.unitPrice * qty).toFixed(2);
  const hasFreeShipping = pack.freeShip || qty >= 2;

  // Reset confirmation view whenever drawer re-opens
  useEffect(() => {
    if (isOpen) {
      setOrderPlaced(false);
    }
  }, [isOpen]);

  // Escape key & body scroll lock
  useEffect(() => {
    if (!isOpen) return undefined;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden={!isOpen}
        onClick={onClose}
        className={[
          'fixed inset-0 z-[70] bg-[rgba(10,5,4,0.62)] backdrop-blur-sm transition-opacity duration-350',
          isOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0',
        ].join(' ')}
      />

      {/* Slide-Over Shopify-Style Drawer */}
      <aside
        id="claimBoxDrawer"
        role="dialog"
        aria-modal="true"
        aria-label="Claim your Power Crunch box"
        aria-hidden={!isOpen}
        className={[
          'fixed top-0 right-0 bottom-0 z-[80] flex w-full max-w-[440px] flex-col bg-cream text-ink shadow-[-20px_0_60px_rgba(0,0,0,0.35)] transition-transform duration-450 ease-[cubic-bezier(0.16,1,0.3,1)]',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        ].join(' ')}
      >
        {/* Top Bar */}
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] bg-white px-5 py-4">
          <div>
            <p className="text-[0.64rem] font-extrabold uppercase tracking-[0.2em] text-[var(--accent-strong)]">
              EXPRESS CHECKOUT
            </p>
            <h3 className="font-display text-[1.15rem] font-black tracking-[-0.02em] text-ink">
              Claim Your Box
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close checkout drawer"
            className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-ink/12 bg-cream text-ink transition-colors duration-200 hover:border-[var(--accent-strong)] hover:text-[var(--accent-strong)]"
          >
            <svg
              viewBox="0 0 16 16"
              width="14"
              height="14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" />
            </svg>
          </button>
        </div>

        {/* Free Shipping Progress Banner */}
        <div className="border-b border-[rgba(var(--accent-rgb),0.2)] bg-[var(--accent-soft-surface)] px-5 py-2.5 text-center text-[0.76rem] font-bold text-ink">
          {hasFreeShipping ? (
            <span className="text-[var(--accent-strong)]">
              ✓ Free Express Shipping Unlocked!
            </span>
          ) : (
            <span>
              Add 1 more box or pick a 2-Box Pack for{' '}
              <strong className="text-[var(--accent-strong)]">
                Free Shipping
              </strong>
            </span>
          )}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-5">
          {orderPlaced ? (
            <div className="flex h-full flex-col items-center justify-center py-8 text-center">
              <span className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--accent-strong),var(--accent))] text-2xl font-black text-white shadow-[0_12px_28px_rgba(var(--accent-rgb),0.4)]">
                ✓
              </span>
              <p className="mb-1.5 text-[0.7rem] font-extrabold uppercase tracking-[0.2em] text-[var(--accent-strong)]">
                BOX RESERVED
              </p>
              <h4 className="mb-2 font-display text-[1.45rem] font-black tracking-[-0.025em] text-ink">
                Ready for the crunch!
              </h4>
              <p className="mb-6 max-w-[300px] text-[0.88rem] leading-[1.6] text-ink-secondary">
                {qty}× <strong>{pack.title}</strong> ({flavor.name}) —{' '}
                <strong>${total}</strong>. Connect your Shopify or Stripe
                checkout URL here to process live orders.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="cursor-pointer rounded-full bg-ink px-6 py-3 text-[0.74rem] font-extrabold uppercase tracking-[0.12em] text-white transition-colors duration-250 hover:bg-[var(--accent-strong)]"
              >
                Continue Exploring
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              {/* Selected Product Preview Card */}
              <div className="flex items-center gap-3.5 rounded-2xl border border-[var(--border-subtle)] bg-white p-3 shadow-[0_6px_18px_rgba(23,18,14,0.04)]">
                <img
                  src={flavor.image}
                  alt={flavor.name}
                  className="h-20 w-24 shrink-0 rounded-xl object-cover"
                />
                <div className="min-w-0 flex-1">
                  <span className="inline-block rounded-full bg-[var(--accent-soft-surface)] px-2 py-0.5 text-[0.6rem] font-extrabold uppercase tracking-[0.12em] text-[var(--accent-strong)]">
                    {flavor.badge}
                  </span>
                  <h4 className="mt-1 truncate font-display text-[1rem] font-black text-ink">
                    {flavor.name}
                  </h4>
                  <p className="text-[0.76rem] font-semibold text-ink-muted">
                    {flavor.nutrition.protein} Protein · 0g Sugar Alcohols ·{' '}
                    {flavor.nutrition.calories} kcal
                  </p>
                </div>
              </div>

              {/* Flavour Switcher Pills */}
              <div>
                <p className="mb-2 text-[0.7rem] font-extrabold uppercase tracking-[0.16em] text-ink-muted">
                  1. Flavour
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {FLAVOR_ORDER.map((id) => {
                    const item = FLAVORS[id];
                    const isActive = activeFlavor === id;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() =>
                          onSelectFlavor(id, { resetScroll: false })
                        }
                        className={[
                          'flex cursor-pointer items-center justify-center gap-1.5 rounded-xl border px-2 py-2.5 text-[0.72rem] font-bold transition-all duration-200',
                          isActive
                            ? 'border-[var(--accent-strong)] bg-[var(--accent-soft-surface)] text-[var(--accent-strong)] shadow-[0_4px_12px_rgba(var(--accent-rgb),0.18)]'
                            : 'border-ink/12 bg-white text-ink-secondary hover:border-ink/30 hover:text-ink',
                        ].join(' ')}
                      >
                        <span
                          aria-hidden="true"
                          className={`h-2 w-2 shrink-0 rounded-full ${item.swatchClass}`}
                        />
                        <span className="truncate">{item.shortName}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Pack Selector */}
              <div>
                <p className="mb-2 text-[0.7rem] font-extrabold uppercase tracking-[0.16em] text-ink-muted">
                  2. Choose Pack Size
                </p>
                <div className="flex flex-col gap-2.5">
                  {PACKS.map((p) => {
                    const isSelected = selectedPackId === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setSelectedPackId(p.id)}
                        className={[
                          'flex w-full cursor-pointer items-center justify-between gap-3 rounded-2xl border-[1.5px] px-4 py-3 text-left transition-all duration-250',
                          isSelected
                            ? 'border-[var(--accent-strong)] bg-white shadow-[0_8px_22px_rgba(var(--accent-rgb),0.16)]'
                            : 'border-[var(--border-subtle)] bg-white/75 hover:border-ink/25',
                        ].join(' ')}
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-display text-[0.9rem] font-extrabold text-ink">
                              {p.title}
                            </span>
                            {p.badge && (
                              <span className="rounded-full bg-[var(--accent-strong)] px-2 py-0.5 text-[0.58rem] font-extrabold uppercase tracking-[0.1em] text-white">
                                {p.badge}
                              </span>
                            )}
                          </div>
                          <span className="text-[0.75rem] font-medium text-ink-muted">
                            {p.subtitle}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="block font-display text-[0.96rem] font-black text-ink">
                            ${p.unitPrice.toFixed(2)}
                          </span>
                          {p.compareAt && (
                            <span className="text-[0.72rem] font-medium text-ink-muted line-through">
                              ${p.compareAt.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity Row */}
              <div className="flex items-center justify-between rounded-2xl border border-[var(--border-subtle)] bg-white px-4 py-3">
                <span className="text-[0.84rem] font-bold text-ink">
                  Quantity
                </span>
                <div className="inline-flex items-center gap-3">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-ink/15 bg-cream font-bold text-ink transition-colors hover:border-[var(--accent-strong)] hover:text-[var(--accent-strong)]"
                  >
                    −
                  </button>
                  <span className="w-5 text-center font-display text-[0.95rem] font-black text-ink">
                    {qty}
                  </span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() => setQty((q) => Math.min(10, q + 1))}
                    className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-ink/15 bg-cream font-bold text-ink transition-colors hover:border-[var(--accent-strong)] hover:text-[var(--accent-strong)]"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sticky Checkout Footer */}
        {!orderPlaced && (
          <div className="border-t border-[var(--border-subtle)] bg-white px-5 py-4">
            <div className="mb-3 flex items-center justify-between text-[0.86rem]">
              <span className="font-semibold text-ink-secondary">
                Subtotal ({qty}× {pack.title})
              </span>
              <strong className="font-display text-[1.18rem] font-black text-ink">
                ${total}
              </strong>
            </div>

            <button
              type="button"
              onClick={() => setOrderPlaced(true)}
              className="cta-sheen group/pay flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,var(--accent-strong),var(--accent))] py-3.5 font-sans text-[0.8rem] font-extrabold uppercase tracking-[0.12em] text-white shadow-[0_12px_28px_rgba(var(--accent-rgb),0.38)] transition-[transform,filter,box-shadow] duration-300 hover:-translate-y-0.5 hover:brightness-106 active:scale-[0.98]"
            >
              <span>Claim My Box — ${total}</span>
              <svg
                viewBox="0 0 16 16"
                width="14"
                height="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="transition-transform duration-300 group-hover/pay:translate-x-1"
              >
                <path d="M3 8h10" />
                <path d="M9 4l4 4-4 4" />
              </svg>
            </button>

            <p className="mt-2.5 text-center text-[0.7rem] font-medium text-ink-muted">
              4.6 ★ (1,750+ reviews) · 30-Day Satisfaction Guarantee
            </p>
          </div>
        )}
      </aside>
    </>
  );
}

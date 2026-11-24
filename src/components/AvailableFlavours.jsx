import { FLAVOR_ORDER, FLAVORS } from '../data/flavors';
import ClaimButton from './ClaimButton';

export default function AvailableFlavours({
  activeFlavor,
  onSelectFlavor,
  onClaimBox,
}) {
  return (
    <section
      id="flavours"
      className="relative scroll-mt-[60px] border-t border-[var(--border-subtle)] bg-cream py-[clamp(46px,5.4vw,72px)] text-ink"
    >
      <div className="mx-auto max-w-[1180px] px-[clamp(20px,4.5vw,44px)]">
        <div
          data-anim="fade-up"
          className="reveal mx-auto mb-[clamp(26px,3.2vw,38px)] max-w-[620px] text-center"
        >
          <p className="mb-2.5 font-sans text-[0.7rem] font-extrabold uppercase tracking-[0.22em] text-[var(--accent-strong)] transition-colors duration-400">
            AVAILABLE FLAVOURS
          </p>
          <h2 className="mb-3 font-display text-[clamp(1.9rem,4vw,3rem)] font-black leading-[1.06] tracking-[-0.03em] text-ink">
            Pick your favourite.
          </h2>
          <p className="text-[clamp(0.94rem,1.3vw,1.03rem)] leading-[1.62] text-ink-secondary">
            Three signature wafer flavours made with high-DH hydrolyzed whey
            protein and 0g sugar alcohols.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-[clamp(16px,2.2vw,24px)] sm:grid-cols-2 lg:grid-cols-3">
          {FLAVOR_ORDER.map((id, idx) => {
            const item = FLAVORS[id];
            const isSelected = activeFlavor === id;
            return (
              <article
                key={id}
                data-anim="fade-up"
                data-card-flavor={id}
                style={{ '--stagger': idx }}
                onClick={() => onSelectFlavor(id, { resetScroll: false })}
                className={[
                  'reveal group flex cursor-pointer flex-col overflow-hidden rounded-[24px] border-[1.5px] bg-white transition-[transform,border-color,box-shadow,opacity] duration-380 hover:-translate-y-1.5',
                  isSelected
                    ? 'is-selected border-[var(--accent-ring)] shadow-[0_0_0_2px_rgba(var(--accent-rgb),0.22),0_20px_42px_rgba(23,18,14,0.09)]'
                    : 'border-[var(--border-subtle)] shadow-[0_10px_28px_rgba(23,18,14,0.05)] hover:shadow-[0_24px_48px_rgba(23,18,14,0.11)]',
                ].join(' ')}
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#160c08]">
                  <span className="absolute top-3 left-3 z-[2] rounded-full bg-white/94 px-2.5 py-[5px] text-[0.64rem] font-extrabold uppercase tracking-[0.12em] text-ink shadow-[0_4px_12px_rgba(0,0,0,0.2)]">
                    {item.badge}
                  </span>
                  {isSelected && (
                    <span className="absolute top-3 right-3 z-[2] rounded-full bg-[var(--accent-strong)] px-2.5 py-[5px] text-[0.62rem] font-extrabold uppercase tracking-[0.12em] text-white shadow-[0_4px_12px_rgba(0,0,0,0.25)]">
                      SELECTED ✓
                    </span>
                  )}
                  <img
                    src={item.image}
                    alt={`Power Crunch ${item.name} 12 Count Box`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-550 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-1 flex-col p-5 pb-[22px]">
                  <h3 className="mb-1.5 font-display text-[1.15rem] font-extrabold tracking-[-0.02em] text-ink">
                    {item.name}
                  </h3>
                  <p className="mb-3.5 flex-1 text-[0.88rem] leading-[1.56] text-ink-secondary">
                    {item.cardDesc}
                  </p>

                  <div className="mb-[5px] flex items-baseline gap-2">
                    <span className="font-display text-[1.12rem] font-black text-ink">
                      {item.price}
                    </span>
                    <span className="text-[0.78rem] font-semibold text-ink-muted">
                      {item.pack}
                    </span>
                  </div>

                  <div
                    className="mb-4 inline-flex items-center gap-1.5"
                    aria-label="Rated 4.6 out of 5 from 1,750 reviews"
                  >
                    <span
                      aria-hidden="true"
                      className="text-[0.86rem] tracking-[1px] text-[#e67e22]"
                    >
                      ★★★★★
                    </span>
                    <span className="text-[0.8rem] font-bold text-ink">
                      4.6{' '}
                      <small className="font-medium text-ink-muted">
                        (1,750)
                      </small>
                    </span>
                  </div>

                  <ClaimButton
                    fullWidth
                    price={item.price}
                    variant={isSelected ? 'primary' : 'dark-to-accent'}
                    onClick={(e) => {
                      e.stopPropagation();
                      onClaimBox(id);
                    }}
                  />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

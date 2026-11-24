import { useEffect, useRef } from 'react';
import { FLAVOR_ORDER, FLAVORS } from '../data/flavors';
import SyncedProductImage from './SyncedProductImage';
import ClaimButton from './ClaimButton';

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

function animateCount(el, targetVal, suffix = '') {
  if (!el || Number.isNaN(targetVal)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const duration = 620;
  const start = performance.now();
  const tick = (now) => {
    const t = Math.min(Math.max((now - start) / duration, 0), 1);
    el.textContent = `${Math.round(easeOutCubic(t) * targetVal)}${suffix}`;
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

export default function RangeSpotlight({
  flavor,
  activeFlavor,
  countUpSignal,
  onSelectFlavor,
  onClaimBox,
}) {
  const proteinRef = useRef(null);
  const caloriesRef = useRef(null);
  const sugarRef = useRef(null);

  useEffect(() => {
    if (countUpSignal === 0) return;
    animateCount(proteinRef.current, flavor.nutrition.proteinNum, 'g');
    animateCount(caloriesRef.current, parseInt(flavor.nutrition.calories, 10), '');
    animateCount(sugarRef.current, flavor.nutrition.sugarNum, 'g');
  }, [countUpSignal]); // eslint-disable-line react-hooks/exhaustive-deps

  const n = flavor.nutrition;

  return (
    <section
      id="spotlight"
      className="relative scroll-mt-[60px] bg-cream py-[clamp(46px,5.4vw,72px)] text-ink"
    >
      <div className="mx-auto max-w-[1180px] px-[clamp(20px,4.5vw,44px)]">
        <div
          className="reveal mx-auto mb-[clamp(26px,3.2vw,38px)] max-w-[620px] text-center"
          data-anim="fade-up"
        >
          <p className="mb-2.5 font-sans text-[0.7rem] font-extrabold uppercase tracking-[0.22em] text-[var(--accent-strong)] transition-colors duration-400">
            THE POWER CRUNCH RANGE
          </p>
          <h2 className="mb-3 font-display text-[clamp(1.9rem,4vw,3rem)] font-black leading-[1.06] tracking-[-0.03em] text-ink">
            Protein worth craving.
          </h2>
          <p className="text-[clamp(0.94rem,1.3vw,1.03rem)] leading-[1.62] text-ink-secondary">
            High-DH hydrolyzed whey protein layered into light, crispy crème
            wafers — built for home or on the go.
          </p>
        </div>

        {/* Full-Width Ref1/Ref2 Editorial Spotlight Card */}
        <article
          id="spotlightCard"
          data-anim="scale-in"
          className="spotlight-card reveal w-full rounded-[28px] border border-[rgba(var(--accent-rgb),0.22)] bg-[var(--accent-soft-surface)] p-[clamp(14px,2vw,22px)] shadow-[0_22px_54px_rgba(23,18,14,0.07)] transition-[background-color,border-color,box-shadow] duration-500 hover:shadow-[0_28px_62px_rgba(23,18,14,0.11)]"
        >
          <div className="aspect-video overflow-hidden rounded-[20px] bg-[var(--bg-deep)] shadow-[0_18px_40px_rgba(0,0,0,0.16)]">
            <SyncedProductImage
              id="spotlightImg"
              src={flavor.image}
              alt={`Power Crunch ${flavor.name} Protein Energy Bar`}
              className="spotlight-img-reveal h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col items-start justify-between gap-5 px-[clamp(8px,1.4vw,14px)] pt-[clamp(20px,2.6vw,28px)] pb-1.5 lg:flex-row lg:items-end lg:gap-[clamp(20px,3.5vw,48px)]">
            <div className="min-w-0 max-w-[560px] flex-1">
              <div className="mb-2 inline-flex flex-wrap items-center gap-2.5">
                <span className="inline-block rounded-full bg-[var(--accent-strong)] px-2.5 py-1 text-[0.65rem] font-extrabold uppercase tracking-[0.14em] text-white transition-colors duration-400">
                  {flavor.badge}
                </span>
                <span className="text-[0.84rem] font-semibold text-ink-muted">
                  <strong className="mr-1 font-display font-black text-ink">
                    {flavor.price}
                  </strong>
                  · {flavor.pack}
                </span>
              </div>

              <h3 className="mb-1.5 font-display text-[clamp(1.5rem,2.8vw,2.15rem)] font-black leading-[1.08] tracking-[-0.025em] text-ink">
                {flavor.name}
              </h3>

              <p className="text-[0.94rem] leading-[1.56] text-ink-secondary">
                {flavor.spotlightDesc}
              </p>
            </div>

            <div className="grid w-full shrink-0 grid-cols-2 gap-3 border-t border-ink/10 pt-4 sm:grid-cols-4 lg:flex lg:w-auto lg:items-start lg:gap-[clamp(18px,2.8vw,34px)] lg:border-t-0 lg:pt-0 lg:pb-0.5">
              <div className="flex flex-col gap-[3px]">
                <strong
                  ref={proteinRef}
                  className="font-display text-[clamp(1.35rem,2.2vw,1.7rem)] font-black leading-[1.05] tracking-[-0.025em] text-[var(--accent-strong)] transition-colors duration-400"
                >
                  {n.protein}
                </strong>
                <span className="whitespace-nowrap text-[0.64rem] font-bold uppercase tracking-[0.13em] text-ink-muted">
                  PROTEIN
                </span>
              </div>

              <div className="flex flex-col gap-[3px]">
                <strong className="font-display text-[clamp(1.35rem,2.2vw,1.7rem)] font-black leading-[1.05] tracking-[-0.025em] text-ink">
                  0g
                </strong>
                <span className="whitespace-nowrap text-[0.64rem] font-bold uppercase tracking-[0.13em] text-ink-muted">
                  SUGAR ALC.
                </span>
              </div>

              <div className="flex flex-col gap-[3px]">
                <strong
                  ref={caloriesRef}
                  className="font-display text-[clamp(1.35rem,2.2vw,1.7rem)] font-black leading-[1.05] tracking-[-0.025em] text-ink"
                >
                  {n.calories}
                </strong>
                <span className="whitespace-nowrap text-[0.64rem] font-bold uppercase tracking-[0.13em] text-ink-muted">
                  KCAL
                </span>
              </div>

              <div className="flex flex-col gap-[3px]">
                <strong
                  ref={sugarRef}
                  className="font-display text-[clamp(1.35rem,2.2vw,1.7rem)] font-black leading-[1.05] tracking-[-0.025em] text-ink"
                >
                  {n.sugar}
                </strong>
                <span className="whitespace-nowrap text-[0.64rem] font-bold uppercase tracking-[0.13em] text-ink-muted">
                  SUGAR
                </span>
              </div>
            </div>
          </div>
        </article>

        {/* Centered Flavour Selector Pills + Primary Claim CTA Below Spotlight Card */}
        <div
          data-anim="fade-up"
          className="reveal mt-[22px] flex flex-col items-center gap-4"
        >
          <div
            role="tablist"
            aria-label="Preview flavour in range spotlight"
            className="flex flex-wrap items-center justify-center gap-2.5"
          >
            {FLAVOR_ORDER.map((id) => {
              const item = FLAVORS[id];
              const isActive = activeFlavor === id;
              return (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => onSelectFlavor(id, { resetScroll: false })}
                  className={[
                    'cursor-pointer rounded-full border px-[22px] py-[11px] font-sans text-[0.84rem] font-bold transition-[background-color,border-color,color,transform,box-shadow] duration-300',
                    isActive
                      ? 'is-active border-ink bg-ink text-white shadow-[0_10px_22px_rgba(23,18,14,0.2)]'
                      : 'border-ink/12 bg-white text-ink-secondary shadow-[0_4px_12px_rgba(23,18,14,0.04)] hover:-translate-y-0.5 hover:border-[var(--accent-strong)] hover:text-ink',
                  ].join(' ')}
                >
                  {item.name}
                </button>
              );
            })}
          </div>

          <ClaimButton
            onClick={() => onClaimBox(activeFlavor)}
            price={flavor.price}
            variant="primary"
          />
        </div>
      </div>
    </section>
  );
}

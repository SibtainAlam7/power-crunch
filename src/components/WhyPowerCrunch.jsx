import SyncedProductImage from './SyncedProductImage';

export default function WhyPowerCrunch({ flavor, onNavigate }) {
  const protein = flavor.nutrition.protein;

  return (
    <section
      id="why"
      className="relative scroll-mt-[60px] border-t border-[var(--border-subtle)] bg-cream-alt py-[clamp(46px,5.4vw,72px)] text-ink"
    >
      <div className="mx-auto max-w-[1180px] px-[clamp(20px,4.5vw,44px)]">
        <div className="grid grid-cols-1 items-center gap-[clamp(28px,4.5vw,60px)] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
          {/* Left Crisp Product Visual */}
          <div
            data-anim="slide-left"
            className="reveal group aspect-[4/3] overflow-hidden rounded-[26px] bg-[var(--bg-deep)] shadow-[0_24px_52px_rgba(23,18,14,0.15)]"
          >
            <SyncedProductImage
              id="whyImg"
              src={flavor.image}
              alt={`Power Crunch ${flavor.name} crisp wafer protein bar`}
              className="flavor-sync-img h-full w-full object-cover group-hover:scale-[1.04]"
            />
          </div>

          {/* Right Editorial Copy & Feature Rows */}
          <div data-anim="slide-right" className="reveal">
            <p className="mb-2.5 font-sans text-[0.7rem] font-extrabold uppercase tracking-[0.22em] text-[var(--accent-strong)] transition-colors duration-400">
              WHY POWER CRUNCH
            </p>
            <h2 className="mb-3.5 font-display text-[clamp(1.9rem,3.7vw,2.95rem)] font-black leading-[1.06] tracking-[-0.03em] text-ink">
              <span>{protein} protein.</span>
              <br />
              0g sugar alcohols.
              <br />
              All{' '}
              <span className="text-[var(--accent-strong)] transition-colors duration-450">
                crunch
              </span>
              .
            </h2>
            <p className="mb-[22px] text-[0.96rem] leading-[1.65] text-ink-secondary">
              {flavor.whyCopy}
            </p>

            <div className="mb-[26px] flex flex-col gap-[15px]">
              <div
                data-anim="fade-up"
                style={{ '--stagger': 0 }}
                className="reveal group flex items-start gap-3.5"
              >
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[13px] border border-[var(--border-subtle)] bg-white font-display text-[0.84rem] font-black text-[var(--accent-strong)] shadow-[0_4px_12px_rgba(23,18,14,0.04)] transition-[color,transform] duration-300 group-hover:-translate-y-0.5">
                  {protein}
                </span>
                <div>
                  <h3 className="mb-0.5 font-display text-[0.95rem] font-extrabold text-ink">
                    High-DH Hydrolyzed Whey
                  </h3>
                  <p className="text-[0.88rem] leading-[1.52] text-ink-secondary">
                    Light, fast-absorbing protein blend built for smooth
                    digestion without heavy chalkiness.
                  </p>
                </div>
              </div>

              <div
                data-anim="fade-up"
                style={{ '--stagger': 1 }}
                className="reveal group flex items-start gap-3.5"
              >
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[13px] border border-[var(--border-subtle)] bg-white font-display text-[0.84rem] font-black text-[var(--accent-strong)] shadow-[0_4px_12px_rgba(23,18,14,0.04)] transition-[color,transform] duration-300 group-hover:-translate-y-0.5">
                  0g
                </span>
                <div>
                  <h3 className="mb-0.5 font-display text-[0.95rem] font-extrabold text-ink">
                    Zero Sugar Alcohols
                  </h3>
                  <p className="text-[0.88rem] leading-[1.52] text-ink-secondary">
                    Balanced sweetness featuring stevia leaf extract — clean
                    finish with no sugar alcohol bloat.
                  </p>
                </div>
              </div>

              <div
                data-anim="fade-up"
                style={{ '--stagger': 2 }}
                className="reveal group flex items-start gap-3.5"
              >
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[13px] border border-[var(--border-subtle)] bg-white font-display text-[0.84rem] font-black text-[var(--accent-strong)] shadow-[0_4px_12px_rgba(23,18,14,0.04)] transition-[color,transform] duration-300 group-hover:-translate-y-0.5">
                  12x
                </span>
                <div>
                  <h3 className="mb-0.5 font-display text-[0.95rem] font-extrabold text-ink">
                    Built For On The Go
                  </h3>
                  <p className="text-[0.88rem] leading-[1.52] text-ink-secondary">
                    12 individually wrapped 40g wafer bars per box — effortless
                    crunch at home, work, or gym.
                  </p>
                </div>
              </div>
            </div>

            <a
              href="#nutrition"
              onClick={(e) => onNavigate('nutrition', e)}
              className="inline-flex items-center justify-center rounded-full bg-ink px-6 py-3 font-sans text-[0.76rem] font-extrabold uppercase tracking-[0.12em] text-white no-underline shadow-[0_10px_24px_rgba(23,18,14,0.18)] transition-[transform,background-color] duration-250 hover:-translate-y-0.5 hover:bg-[var(--accent-strong)]"
            >
              SEE THE NUTRITION
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

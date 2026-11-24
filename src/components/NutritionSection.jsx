import { FLAVOR_ORDER, FLAVORS } from '../data/flavors';

export default function NutritionSection({
  flavor,
  activeFlavor,
  updatePulseKey,
  onSelectFlavor,
}) {
  const n = flavor.nutrition;
  const proteinPct = `${Math.round((n.proteinNum / 15) * 100)}%`;
  const carbPct = `${Math.round((n.carbNum / 25) * 100)}%`;
  const sugarPct = `${Math.round((n.sugarNum / 18) * 100)}%`;

  return (
    <section
      id="nutrition"
      className="relative scroll-mt-[60px] border-t border-[var(--border-subtle)] bg-cream-alt py-[clamp(46px,5.4vw,72px)] text-ink"
    >
      <div className="mx-auto max-w-[1180px] px-[clamp(20px,4.5vw,44px)]">
        <div className="grid grid-cols-1 items-center gap-[clamp(28px,4.5vw,60px)] lg:grid-cols-2">
          {/* Left Column: Tabs, Featured Tiles & Visual Macro Balance Bars */}
          <div data-anim="slide-left" className="reveal">
            <p className="mb-2.5 font-sans text-[0.7rem] font-extrabold uppercase tracking-[0.22em] text-[var(--accent-strong)] transition-colors duration-400">
              PER 40G BAR · 12 SERVINGS PER BOX
            </p>
            <h2 className="mb-3 text-left font-display text-[clamp(1.9rem,4vw,3rem)] font-black leading-[1.06] tracking-[-0.03em] text-ink">
              What&apos;s in the bar.
            </h2>
            <p className="mb-5 max-w-[490px] text-[0.96rem] leading-[1.62] text-ink-secondary">
              Real high-DH hydrolyzed whey protein, balanced macros, and zero
              sugar alcohols — view exact facts for each flavour below.
            </p>

            {/* Inline Flavor Tabs */}
            <div
              role="tablist"
              aria-label="Compare flavour nutrition"
              className="mb-[22px] inline-flex flex-wrap gap-2"
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
                    data-select-flavor={id}
                    onClick={() => onSelectFlavor(id, { resetScroll: false })}
                    className={[
                      'cursor-pointer rounded-full border px-3.5 py-2 font-sans text-[0.78rem] font-bold transition-all duration-250',
                      isActive
                        ? 'is-active border-[var(--accent-strong)] bg-[var(--accent-strong)] text-white shadow-[0_6px_18px_rgba(var(--accent-rgb),0.32)]'
                        : 'border-ink/14 bg-white text-ink-secondary hover:-translate-y-px hover:border-ink hover:text-ink',
                    ].join(' ')}
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>

            {/* 4 Theme-Enhanced Metric Tiles */}
            <div className="mb-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {/* Featured Dark Protein Tile */}
              <div
                data-anim="fade-up"
                style={{
                  '--stagger': 0,
                  background: 'var(--featured-tile-bg)',
                }}
                className="reveal relative flex flex-col gap-1 overflow-hidden rounded-2xl border border-[rgba(var(--accent-rgb),0.35)] border-t-[3px] border-t-[var(--accent)] px-3 py-[15px] shadow-[0_12px_26px_rgba(23,18,14,0.16)] transition-[transform,box-shadow] duration-300 hover:-translate-y-[3px]"
              >
                <strong
                  key={`p-${updatePulseKey}`}
                  className={`${updatePulseKey > 0 ? 'is-updating' : ''} font-display text-[clamp(1.25rem,2.1vw,1.55rem)] font-black leading-[1.05] tracking-[-0.025em] text-[var(--accent)]`}
                >
                  {n.protein}
                </strong>
                <span className="text-[0.62rem] font-bold uppercase tracking-[0.12em] text-[#fff5ec]/84">
                  PROTEIN
                </span>
              </div>

              <div
                data-anim="fade-up"
                style={{ '--stagger': 1 }}
                className="reveal relative flex flex-col gap-1 overflow-hidden rounded-2xl border border-[var(--border-subtle)] border-t-[3px] border-t-[var(--accent-soft-surface)] bg-white px-3 py-[15px] shadow-[0_6px_18px_rgba(23,18,14,0.04)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-[3px] hover:border-t-[var(--accent-strong)] hover:shadow-[0_12px_24px_rgba(23,18,14,0.09)]"
              >
                <strong
                  key={`c-${updatePulseKey}`}
                  className={`${updatePulseKey > 0 ? 'is-updating' : ''} font-display text-[clamp(1.25rem,2.1vw,1.55rem)] font-black leading-[1.05] tracking-[-0.025em] text-ink`}
                >
                  {n.calories}
                </strong>
                <span className="text-[0.62rem] font-bold uppercase tracking-[0.12em] text-ink-muted">
                  KCAL
                </span>
              </div>

              <div
                data-anim="fade-up"
                style={{ '--stagger': 2 }}
                className="reveal relative flex flex-col gap-1 overflow-hidden rounded-2xl border border-[var(--border-subtle)] border-t-[3px] border-t-[var(--accent-soft-surface)] bg-white px-3 py-[15px] shadow-[0_6px_18px_rgba(23,18,14,0.04)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-[3px] hover:border-t-[var(--accent-strong)] hover:shadow-[0_12px_24px_rgba(23,18,14,0.09)]"
              >
                <strong
                  key={`s-${updatePulseKey}`}
                  className={`${updatePulseKey > 0 ? 'is-updating' : ''} font-display text-[clamp(1.25rem,2.1vw,1.55rem)] font-black leading-[1.05] tracking-[-0.025em] text-ink`}
                >
                  {n.sugar}
                </strong>
                <span className="text-[0.62rem] font-bold uppercase tracking-[0.12em] text-ink-muted">
                  SUGAR
                </span>
              </div>

              <div
                data-anim="fade-up"
                style={{ '--stagger': 3 }}
                className="reveal relative flex flex-col gap-1 overflow-hidden rounded-2xl border border-[var(--border-subtle)] border-t-[3px] border-t-[var(--accent-soft-surface)] bg-white px-3 py-[15px] shadow-[0_6px_18px_rgba(23,18,14,0.04)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-[3px] hover:border-t-[var(--accent-strong)] hover:shadow-[0_12px_24px_rgba(23,18,14,0.09)]"
              >
                <strong className="font-display text-[clamp(1.25rem,2.1vw,1.55rem)] font-black leading-[1.05] tracking-[-0.025em] text-ink">
                  0g
                </strong>
                <span className="text-[0.62rem] font-bold uppercase tracking-[0.12em] text-ink-muted">
                  SUGAR ALC.
                </span>
              </div>
            </div>

            {/* Visual Daily Value Highlight Card */}
            <div
              id="macroBarsCard"
              data-anim="fade-up"
              className="macro-bars-card reveal mb-3.5 flex flex-col gap-[13px] rounded-[20px] border border-[rgba(var(--accent-rgb),0.24)] bg-[linear-gradient(160deg,#ffffff_0%,var(--accent-soft-surface)_100%)] px-5 py-[18px] shadow-[0_10px_26px_rgba(23,18,14,0.05)] transition-[background,border-color] duration-450"
            >
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between gap-2 text-[0.8rem]">
                  <span className="font-bold text-ink">
                    High-DH Whey Protein
                  </span>
                  <span className="text-[0.76rem] font-bold text-[var(--accent-strong)]">
                    {n.protein} · {n.proteinDv}
                  </span>
                </div>
                <div className="h-[7px] overflow-hidden rounded-full bg-ink/9">
                  <div
                    style={{ '--bar-pct': proteinPct }}
                    className="macro-bar-fill h-full rounded-full bg-[linear-gradient(90deg,var(--accent-strong),var(--accent))]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between gap-2 text-[0.8rem]">
                  <span className="font-bold text-ink">Balanced Carbs</span>
                  <span className="text-[0.76rem] font-bold text-[var(--accent-strong)]">
                    {n.carb} · {n.carbDv}
                  </span>
                </div>
                <div className="h-[7px] overflow-hidden rounded-full bg-ink/9">
                  <div
                    style={{ '--bar-pct': carbPct }}
                    className="macro-bar-fill h-full rounded-full bg-[linear-gradient(90deg,rgba(23,18,14,0.55),rgba(23,18,14,0.35))]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between gap-2 text-[0.8rem]">
                  <span className="font-bold text-ink">Total Sugars</span>
                  <span className="text-[0.76rem] font-bold text-[var(--accent-strong)]">
                    {n.sugar} · 0g Sugar Alcohols
                  </span>
                </div>
                <div className="h-[7px] overflow-hidden rounded-full bg-ink/9">
                  <div
                    style={{ '--bar-pct': sugarPct }}
                    className="macro-bar-fill h-full rounded-full bg-[linear-gradient(90deg,rgba(var(--accent-rgb),0.72),rgba(var(--accent-rgb),0.45))]"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                <span className="rounded-full border border-[rgba(var(--accent-rgb),0.25)] bg-white/82 px-2.5 py-[5px] text-[0.72rem] font-bold text-ink">
                  ✓ High-DH Hydrolyzed Whey
                </span>
                <span className="rounded-full border border-[rgba(var(--accent-rgb),0.25)] bg-white/82 px-2.5 py-[5px] text-[0.72rem] font-bold text-ink">
                  ✓ 12 Count Box · $21.99
                </span>
              </div>
            </div>

            <p className="max-w-[480px] text-[0.78rem] leading-[1.55] text-ink-muted">
              12 individually wrapped bars per box (1.4 oz / 40g each). Percent
              Daily Values (% DV) are based on a 2,000 calorie diet.
            </p>
          </div>

          {/* Right Column: Elevated Hoverable Nutrition Facts Panel */}
          <div
            id="nutritionCard"
            data-anim="scale-in"
            aria-live="polite"
            className="reveal relative rounded-[26px] border-[1.5px] border-[rgba(var(--accent-rgb),0.28)] border-t-[3.5px] border-t-[var(--accent-strong)] bg-white p-[clamp(22px,2.8vw,32px)] shadow-[0_20px_48px_rgba(23,18,14,0.08)] transition-[transform,border-color,box-shadow] duration-380 hover:-translate-y-[5px] hover:border-[var(--accent-strong)] hover:shadow-[0_28px_58px_rgba(23,18,14,0.12),0_0_0_4px_rgba(var(--accent-rgb),0.16)]"
          >
            <div key={`card-${updatePulseKey}`} className={updatePulseKey > 0 ? 'is-updating' : ''}>
              <div className="mb-1 border-b-2 border-ink pb-3.5">
                <h3 className="mb-[3px] font-display text-[1.38rem] font-black tracking-[-0.025em] text-ink">
                  Nutrition facts
                </h3>
                <p className="text-[0.82rem] font-semibold text-ink-muted">
                  Serving size 1 Bar (40g) · {flavor.name}
                </p>
              </div>

              <dl className="flex flex-col">
                <div className="-mx-2 flex items-center justify-between gap-3 rounded-[10px] border-b border-ink/8 px-2 py-[9.5px] text-[0.95rem] font-extrabold text-ink transition-colors duration-220 hover:bg-[var(--accent-soft-surface)]">
                  <dt>Calories</dt>
                  <dd>{n.calories} kcal</dd>
                </div>

                <div className="-mx-2 flex items-center justify-between gap-3 rounded-[10px] border-b border-ink/8 px-2 py-[9.5px] text-[0.9rem] transition-colors duration-220 hover:bg-[var(--accent-soft-surface)]">
                  <dt className="font-extrabold text-ink">Protein</dt>
                  <dd className="inline-flex items-center gap-2">
                    <strong className="font-display font-black text-[var(--accent-strong)]">
                      {n.protein}
                    </strong>
                    <span className="rounded-full bg-cream px-2 py-[3px] text-[0.68rem] font-bold text-ink-muted">
                      {n.proteinDv}
                    </span>
                  </dd>
                </div>

                <div className="-mx-2 flex items-center justify-between gap-3 rounded-[10px] border-b border-ink/8 px-2 py-[9.5px] text-[0.9rem] transition-colors duration-220 hover:bg-[var(--accent-soft-surface)]">
                  <dt className="font-medium text-ink-secondary">Total Fat</dt>
                  <dd className="inline-flex items-center gap-2 font-bold text-ink">
                    <span>{n.fat}</span>
                    <span className="rounded-full bg-cream px-2 py-[3px] text-[0.68rem] font-bold text-ink-muted">
                      {n.fatDv}
                    </span>
                  </dd>
                </div>

                <div className="-mx-2 flex items-center justify-between gap-3 rounded-[10px] border-b border-ink/8 px-2 py-[9.5px] text-[0.84rem] transition-colors duration-220 hover:bg-[var(--accent-soft-surface)]">
                  <dt className="pl-2.5 font-medium text-ink-muted">
                    — Saturated Fat
                  </dt>
                  <dd className="inline-flex items-center gap-2 font-semibold text-ink">
                    <span>{n.satFat}</span>
                    <span className="rounded-full bg-cream px-2 py-[3px] text-[0.68rem] font-bold text-ink-muted">
                      {n.satFatDv}
                    </span>
                  </dd>
                </div>

                <div className="-mx-2 flex items-center justify-between gap-3 rounded-[10px] border-b border-ink/8 px-2 py-[9.5px] text-[0.9rem] transition-colors duration-220 hover:bg-[var(--accent-soft-surface)]">
                  <dt className="font-medium text-ink-secondary">
                    Total Carbohydrates
                  </dt>
                  <dd className="inline-flex items-center gap-2 font-bold text-ink">
                    <span>{n.carb}</span>
                    <span className="rounded-full bg-cream px-2 py-[3px] text-[0.68rem] font-bold text-ink-muted">
                      {n.carbDv}
                    </span>
                  </dd>
                </div>

                <div className="-mx-2 flex items-center justify-between gap-3 rounded-[10px] border-b border-ink/8 px-2 py-[9.5px] text-[0.84rem] transition-colors duration-220 hover:bg-[var(--accent-soft-surface)]">
                  <dt className="pl-2.5 font-medium text-ink-muted">
                    — Total Sugars
                  </dt>
                  <dd className="inline-flex items-center gap-2 font-semibold text-ink">
                    <span>{n.sugar}</span>
                    <span className="rounded-full bg-cream px-2 py-[3px] text-[0.68rem] font-bold text-ink-muted">
                      {n.addedSugarDv}
                    </span>
                  </dd>
                </div>

                <div className="-mx-2 flex items-center justify-between gap-3 rounded-[10px] border-b border-ink/8 px-2 py-[9.5px] text-[0.84rem] transition-colors duration-220 hover:bg-[var(--accent-soft-surface)]">
                  <dt className="pl-2.5 font-medium text-ink-muted">
                    — Sugar Alcohols
                  </dt>
                  <dd className="font-semibold text-ink">0g</dd>
                </div>

                <div className="-mx-2 flex items-center justify-between gap-3 rounded-[10px] border-b border-ink/8 px-2 py-[9.5px] text-[0.9rem] transition-colors duration-220 hover:bg-[var(--accent-soft-surface)]">
                  <dt className="font-medium text-ink-secondary">
                    Dietary Fiber
                  </dt>
                  <dd className="inline-flex items-center gap-2 font-bold text-ink">
                    <span>{n.fiber}</span>
                    <span className="rounded-full bg-cream px-2 py-[3px] text-[0.68rem] font-bold text-ink-muted">
                      {n.fiberDv}
                    </span>
                  </dd>
                </div>

                <div className="-mx-2 flex items-center justify-between gap-3 rounded-[10px] border-b border-ink/8 px-2 py-[9.5px] text-[0.9rem] transition-colors duration-220 hover:bg-[var(--accent-soft-surface)]">
                  <dt className="font-medium text-ink-secondary">Sodium</dt>
                  <dd className="inline-flex items-center gap-2 font-bold text-ink">
                    <span>{n.sodium}</span>
                    <span className="rounded-full bg-cream px-2 py-[3px] text-[0.68rem] font-bold text-ink-muted">
                      {n.sodiumDv}
                    </span>
                  </dd>
                </div>

                <div className="-mx-2 flex items-center justify-between gap-3 rounded-[10px] border-b border-ink/8 px-2 py-[9.5px] text-[0.9rem] transition-colors duration-220 hover:bg-[var(--accent-soft-surface)]">
                  <dt className="font-medium text-ink-secondary">
                    Cholesterol
                  </dt>
                  <dd className="inline-flex items-center gap-2 font-bold text-ink">
                    <span>{n.chol}</span>
                    <span className="rounded-full bg-cream px-2 py-[3px] text-[0.68rem] font-bold text-ink-muted">
                      {n.cholDv}
                    </span>
                  </dd>
                </div>
              </dl>

              <div className="mt-3.5 flex flex-wrap justify-between gap-2.5 border-t-[1.5px] border-ink/12 pt-3 text-[0.76rem] text-ink-muted">
                {n.micros.map((m) => (
                  <span key={m.label}>
                    {m.label} <strong className="text-ink">{m.val}</strong> (
                    {m.dv})
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

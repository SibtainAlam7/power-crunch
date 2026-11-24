export default function IngredientsSection({ flavor }) {
  const ing = flavor.ingredients;

  const cards = [
    {
      num: '01',
      tag: `${flavor.nutrition.protein} Protein`,
      title: 'High-DH Whey Protein Blend',
      body: ing.pillar1,
    },
    {
      num: '02',
      tag: ing.tag2,
      title: ing.pillar2Title,
      body: ing.pillar2,
    },
    {
      num: '03',
      tag: '0g Alcohols',
      title: 'Zero Sugar Alcohols',
      body: ing.pillar3,
    },
  ];

  return (
    <section
      id="ingredients"
      className="relative scroll-mt-[60px] border-t border-[var(--border-subtle)] bg-cream py-[clamp(46px,5.4vw,72px)] text-ink"
    >
      <div className="mx-auto max-w-[1180px] px-[clamp(20px,4.5vw,44px)]">
        <div
          data-anim="fade-up"
          className="reveal mx-auto mb-[clamp(26px,3.2vw,38px)] max-w-[620px] text-center"
        >
          <p className="mb-2.5 font-sans text-[0.7rem] font-extrabold uppercase tracking-[0.22em] text-[var(--accent-strong)] transition-colors duration-400">
            TRANSPARENT INGREDIENTS
          </p>
          <h2 className="mb-3 font-display text-[clamp(1.9rem,4vw,3rem)] font-black leading-[1.06] tracking-[-0.03em] text-ink">
            Crafted for crunch.
          </h2>
          <p className="text-[clamp(0.94rem,1.3vw,1.03rem)] leading-[1.62] text-ink-secondary">
            Every Power Crunch bar combines light hydrolyzed whey protein, crisp
            wafer layers, and real flavour notes — with zero sugar alcohols.
          </p>
        </div>

        <div className="mb-[22px] grid grid-cols-1 gap-[clamp(16px,2.2vw,24px)] sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, idx) => (
            <article
              key={card.num}
              data-anim="fade-up"
              style={{ '--stagger': idx }}
              className="reveal relative overflow-hidden rounded-[22px] border border-[rgba(var(--accent-rgb),0.26)] border-t-[3.5px] border-t-[var(--accent-strong)] bg-[linear-gradient(155deg,var(--accent-soft-surface)_0%,#ffffff_74%)] p-[clamp(20px,2.5vw,26px)] shadow-[0_12px_30px_rgba(23,18,14,0.06)] transition-[transform,box-shadow,border-color,background] duration-380 hover:-translate-y-1.5 hover:border-[rgba(var(--accent-rgb),0.55)] hover:shadow-[0_22px_42px_rgba(23,18,14,0.11)]"
            >
              <div className="mb-4 flex items-center justify-between gap-2.5">
                <span className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--accent-strong),var(--accent))] px-3 py-1.5 font-display text-[0.74rem] font-black tracking-[0.12em] text-white shadow-[0_6px_16px_rgba(var(--accent-rgb),0.32)]">
                  {card.num}
                </span>
                <span className="rounded-full border border-[rgba(var(--accent-rgb),0.25)] bg-white/85 px-2.5 py-[5px] text-[0.68rem] font-extrabold uppercase tracking-[0.1em] text-[var(--accent-strong)]">
                  {card.tag}
                </span>
              </div>
              <h3 className="mb-2 font-display text-[1.05rem] font-extrabold tracking-[-0.02em] text-ink">
                {card.title}
              </h3>
              <p className="text-[0.9rem] leading-[1.6] text-ink-secondary">
                {card.body}
              </p>
            </article>
          ))}
        </div>

        {/* Clean Expandable Full Label Disclosure */}
        <details
          data-anim="fade-up"
          className="label-disclosure reveal mx-auto max-w-[880px] overflow-hidden rounded-[18px] border border-[var(--border-subtle)] bg-white transition-colors duration-250 hover:border-ink/18"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-[22px] py-4 text-[0.88rem] font-bold text-ink">
            <span>View full ingredient &amp; allergen label ({flavor.name})</span>
            <span
              aria-hidden="true"
              className="disclosure-icon font-display text-[1.25rem] font-bold text-[var(--accent-strong)] transition-transform duration-250"
            >
              +
            </span>
          </summary>
          <div className="border-t border-[var(--border-subtle)] px-[22px] pt-3.5 pb-5">
            <p className="mb-2.5 text-[0.83rem] leading-[1.65] text-ink-secondary">
              {ing.fullList}
            </p>
            <p className="text-[0.8rem] font-bold text-ink">{ing.allergens}</p>
          </div>
        </details>
      </div>
    </section>
  );
}

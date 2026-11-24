import { REVIEWS } from '../data/flavors';

export default function ReviewsSection() {
  return (
    <section
      id="reviews"
      className="relative scroll-mt-[60px] border-t border-[var(--border-subtle)] bg-cream-alt py-[clamp(46px,5.4vw,72px)] text-ink"
    >
      <div className="mx-auto max-w-[1180px] px-[clamp(20px,4.5vw,44px)]">
        <div
          data-anim="fade-up"
          className="reveal mx-auto mb-[clamp(26px,3.2vw,38px)] max-w-[620px] text-center"
        >
          <p className="mb-2.5 font-sans text-[0.7rem] font-extrabold uppercase tracking-[0.22em] text-[var(--accent-strong)] transition-colors duration-400">
            4.6 ★ FROM 1,750+ VERIFIED FANS
          </p>
          <h2 className="font-display text-[clamp(1.9rem,4vw,3rem)] font-black leading-[1.06] tracking-[-0.03em] text-ink">
            Loved after the first
            <br />
            crunch.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-[clamp(16px,2.2vw,24px)] sm:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((review, idx) => (
            <article
              key={review.name}
              data-anim="fade-up"
              style={{ '--stagger': idx }}
              className="reveal flex flex-col justify-between gap-5 rounded-[24px] border border-[var(--border-subtle)] bg-white p-[clamp(22px,2.6vw,28px)] shadow-[0_12px_30px_rgba(23,18,14,0.05)] transition-[transform,box-shadow,border-color] duration-380 hover:-translate-y-[5px] hover:border-[rgba(var(--accent-rgb),0.4)] hover:shadow-[0_22px_44px_rgba(23,18,14,0.09)]"
            >
              <div>
                <div
                  aria-label="5 out of 5 stars"
                  className="mb-2.5 text-[0.92rem] tracking-[2px] text-[var(--accent-strong)]"
                >
                  ★★★★★
                </div>
                <blockquote className="text-[0.93rem] font-medium leading-[1.64] text-ink">
                  {review.quote}
                </blockquote>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <span
                  aria-hidden="true"
                  className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-display text-[0.78rem] font-extrabold tracking-[0.03em] text-white ${review.avatarGradient}`}
                >
                  {review.initials}
                </span>
                <div>
                  <strong className="block text-[0.88rem] font-extrabold leading-tight text-ink">
                    {review.name}
                  </strong>
                  <span className="block text-[0.76rem] font-medium text-ink-muted">
                    {review.meta}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

import SyncedProductImage from './SyncedProductImage';
import ClaimButton from './ClaimButton';

export default function BestSellersSection({
  flavor,
  onNavigate,
  onClaimBox,
}) {
  return (
    <section
      id="bestsellers"
      className="relative overflow-hidden bg-[var(--bg-deep)] py-[clamp(50px,6vw,80px)] text-white transition-colors duration-550"
    >
      <div className="mx-auto max-w-[1180px] px-[clamp(20px,4.5vw,44px)]">
        <div className="grid grid-cols-1 items-center gap-[clamp(28px,4.5vw,60px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
          <div data-anim="slide-left" className="reveal">
            <p className="mb-2.5 font-sans text-[0.7rem] font-extrabold uppercase tracking-[0.22em] text-[var(--accent)]">
              BEST SELLERS BOX · $21.99
            </p>
            <h2 className="mb-4 font-display text-[clamp(2rem,4.2vw,3.25rem)] font-black leading-[1.05] tracking-[-0.03em] text-white">
              Stock up on the
              <br />
              classics.
            </h2>
            <p className="mb-7 max-w-[470px] text-[0.96rem] leading-[1.66] text-[#fff5ec]/74">
              Twelve crisp 40g protein energy bars in every box, featuring
              high-DH hydrolyzed whey protein and 0g sugar alcohols. Pick Peanut
              Butter Fudge, Red Velvet, or Triple Chocolate for home or on the
              go.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <ClaimButton
                onClick={() => onClaimBox(flavor.id)}
                price={flavor.price}
                variant="light-accent"
              />
              <a
                href="#ingredients"
                onClick={(e) => onNavigate('ingredients', e)}
                className="inline-flex items-center justify-center rounded-full border border-white/18 bg-white/5 px-[22px] py-3 font-sans text-[0.76rem] font-bold uppercase tracking-[0.1em] text-white/90 no-underline transition-[background-color,border-color,transform] duration-250 hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/12"
              >
                VIEW INGREDIENTS
              </a>
            </div>
          </div>

          <div
            data-anim="slide-right"
            className="reveal group relative aspect-[16/10] overflow-hidden rounded-[26px] border border-white/8 bg-black/35 shadow-[0_28px_64px_rgba(0,0,0,0.45)]"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-1/4 z-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--accent-rgb),0.22),transparent_65%)]"
            />
            <SyncedProductImage
              id="bestImg"
              src={flavor.image}
              alt={`Power Crunch ${flavor.name} 12 Count Best Sellers Protein Energy Bar Box`}
              className="flavor-sync-img relative z-[1] h-full w-full object-cover group-hover:scale-[1.04]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

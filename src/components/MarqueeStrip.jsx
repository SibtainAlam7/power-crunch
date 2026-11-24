import { MARQUEE_ITEMS } from '../data/flavors';

function MarqueeGroup({ hidden = false }) {
  return (
    <div
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-[26px] pr-[26px]"
    >
      {MARQUEE_ITEMS.map((item) => (
        <div key={item} className="inline-flex items-center gap-[26px]">
          <span className="whitespace-nowrap font-display text-[0.75rem] font-extrabold uppercase tracking-[0.18em] text-white/88">
            {item}
          </span>
          <i
            aria-hidden="true"
            className="h-[5px] w-[5px] shrink-0 rounded-full bg-[var(--accent)] transition-colors duration-450"
          />
        </div>
      ))}
    </div>
  );
}

export default function MarqueeStrip() {
  return (
    <div
      aria-label="Power Crunch highlights"
      className="marquee-band relative z-[4] overflow-hidden border-y border-white/8 bg-[var(--bg-deep)] py-3.5 transition-colors duration-500"
    >
      <div className="animate-marquee flex w-max">
        <MarqueeGroup />
        <MarqueeGroup hidden />
      </div>
    </div>
  );
}

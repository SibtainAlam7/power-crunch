export default function ClaimButton({
  onClick,
  price,
  variant = 'primary',
  fullWidth = false,
  className = '',
  label = 'Claim My Box',
}) {
  const variantClasses =
    variant === 'light-accent'
      ? 'bg-[var(--accent)] text-[var(--accent-cta-text)] shadow-[0_10px_28px_rgba(var(--accent-rgb),0.32)] hover:brightness-108 hover:shadow-[0_14px_34px_rgba(var(--accent-rgb),0.45)]'
      : variant === 'dark-to-accent'
        ? 'bg-ink text-white shadow-[0_8px_22px_rgba(23,18,14,0.16)] hover:bg-[var(--accent-strong)] hover:shadow-[0_12px_28px_rgba(var(--accent-rgb),0.35)]'
        : 'bg-[linear-gradient(135deg,var(--accent-strong),var(--accent))] text-white shadow-[0_10px_26px_rgba(var(--accent-rgb),0.35)] hover:brightness-106 hover:shadow-[0_14px_32px_rgba(var(--accent-rgb),0.48)]';

  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'cta-sheen group/claim inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-6 py-3 font-sans text-[0.76rem] font-extrabold uppercase tracking-[0.11em] transition-[transform,box-shadow,background-color,filter] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 active:scale-[0.98]',
        variantClasses,
        fullWidth ? 'w-full' : '',
        className,
      ].join(' ')}
    >
      <span>{label}</span>
      {price && (
        <span className="opacity-85 font-bold tracking-[0.04em]">
          · {price}
        </span>
      )}
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
        className="shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/claim:translate-x-1"
      >
        <path d="M3 8h10" />
        <path d="M9 4l4 4-4 4" />
      </svg>
    </button>
  );
}

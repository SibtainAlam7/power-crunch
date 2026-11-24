import { useEffect, useRef, useState } from 'react';
import { FLAVOR_ORDER, FLAVORS } from '../data/flavors';

const PERKS = [
  '✓ 10% Off First Box',
  '✓ Early Flavour Drops',
  '✓ 1 Email / Month',
];

export default function JoinCrewSection({ activeFlavorName }) {
  const [selectedFlavor, setSelectedFlavor] = useState(activeFlavorName);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({
    type: 'idle',
    message: 'No spam — unsubscribe anytime.',
  });
  const [invalidKey, setInvalidKey] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    setSelectedFlavor(activeFlavorName);
  }, [activeFlavorName]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const val = email.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val);

    if (!valid) {
      setInvalidKey((k) => k + 1);
      setStatus({
        type: 'error',
        message: 'Please enter a valid email address.',
      });
      if (inputRef.current) inputRef.current.focus();
      return;
    }

    setStatus({
      type: 'success',
      message: `You're in! Watch your inbox for 10% off ${selectedFlavor} & early drops.`,
    });
    setEmail('');
  };

  return (
    <section
      id="join"
      aria-labelledby="crewHeading"
      className="relative scroll-mt-[60px] border-t border-[var(--border-subtle)] bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(var(--accent-rgb),0.14),transparent_70%),#f8f5ef] py-[clamp(46px,5.4vw,72px)] text-ink"
    >
      <div className="mx-auto max-w-[1180px] px-[clamp(20px,4.5vw,44px)]">
        <div
          data-anim="scale-in"
          className="reveal relative w-full overflow-hidden rounded-[30px] border border-[rgba(var(--accent-rgb),0.28)] border-t-[3.5px] border-t-[var(--accent-strong)] bg-[linear-gradient(155deg,#ffffff_0%,var(--accent-soft-surface)_100%)] px-[clamp(20px,4vw,48px)] py-[clamp(32px,4.6vw,54px)] shadow-[0_24px_56px_rgba(23,18,14,0.08)] transition-[background,border-color,box-shadow,transform] duration-400 hover:shadow-[0_30px_66px_rgba(23,18,14,0.11)]"
        >
          <div className="mx-auto max-w-[620px] text-center">
            <div data-anim="fade-up" style={{ '--stagger': 0 }} className="reveal">
              <p className="mb-2.5 font-sans text-[0.7rem] font-extrabold uppercase tracking-[0.22em] text-[var(--accent-strong)]">
                JOIN THE CREW
              </p>
              <h2
                id="crewHeading"
                className="mb-3 font-display text-[clamp(2.05rem,4.4vw,3.35rem)] font-black leading-[1.06] tracking-[-0.03em] text-ink"
              >
                Get the good
                <br />
                stuff first.
              </h2>
              <p className="mx-auto mb-5 max-w-[500px] text-[clamp(0.95rem,1.35vw,1.03rem)] leading-[1.62] text-ink-secondary">
                Early flavour drops, restock alerts, and 10% off your first
                12-count box. One email a month, never more.
              </p>
            </div>

            {/* Perk Highlight Pills */}
            <div
              data-anim="fade-up"
              style={{ '--stagger': 1 }}
              className="reveal mb-[22px] flex flex-wrap items-center justify-center gap-2"
            >
              {PERKS.map((perk) => (
                <span
                  key={perk}
                  className="rounded-full border border-[rgba(var(--accent-rgb),0.26)] bg-white/88 px-[13px] py-1.5 text-[0.72rem] font-bold text-ink shadow-[0_4px_12px_rgba(23,18,14,0.03)] transition-[transform,border-color] duration-250 hover:-translate-y-0.5 hover:border-[var(--accent-strong)]"
                >
                  {perk}
                </span>
              ))}
            </div>

            {/* Flavour Preference Picker */}
            <div
              data-anim="fade-up"
              style={{ '--stagger': 2 }}
              role="group"
              aria-label="Choose your favourite flavour"
              className="reveal mb-5 flex flex-wrap items-center justify-center gap-2"
            >
              <span className="text-[0.76rem] font-bold text-ink-muted">
                Favourite flavour:
              </span>
              <div className="inline-flex flex-wrap justify-center gap-1.5">
                {FLAVOR_ORDER.map((id) => {
                  const name = FLAVORS[id].name;
                  const isActive = selectedFlavor === name;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setSelectedFlavor(name)}
                      className={[
                        'cursor-pointer rounded-full border px-[13px] py-[7px] font-sans text-[0.74rem] font-bold transition-all duration-250',
                        isActive
                          ? 'is-active border-[var(--accent-strong)] bg-[var(--accent-strong)] text-white shadow-[0_6px_16px_rgba(var(--accent-rgb),0.3)]'
                          : 'border-ink/14 bg-white/92 text-ink-secondary hover:-translate-y-px hover:border-[var(--accent-strong)] hover:text-ink',
                      ].join(' ')}
                    >
                      {name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Email Signup Form */}
            <form
              id="crewForm"
              onSubmit={handleSubmit}
              noValidate
              data-anim="fade-up"
              style={{ '--stagger': 3 }}
              className="reveal mx-auto mb-3 flex max-w-[480px] flex-col items-stretch justify-center gap-2.5 min-[521px]:flex-row min-[521px]:items-center"
            >
              <label htmlFor="crewEmail" className="sr-only">
                Email address
              </label>
              <input
                ref={inputRef}
                key={invalidKey > 0 && status.type === 'error' ? invalidKey : 'stable'}
                type="email"
                id="crewEmail"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status.type === 'error') {
                    setStatus({
                      type: 'idle',
                      message: 'No spam — unsubscribe anytime.',
                    });
                  }
                }}
                placeholder="you@example.com"
                autoComplete="email"
                required
                className={[
                  'h-[50px] min-h-[50px] w-full flex-none rounded-full border-[1.5px] border-ink/14 bg-white px-[22px] font-sans text-[0.92rem] font-medium text-ink shadow-[0_6px_18px_rgba(23,18,14,0.04)] outline-none transition-[border-color,box-shadow] duration-250 placeholder:text-ink-muted focus:border-[var(--accent-strong)] focus:shadow-[0_0_0_4px_rgba(var(--accent-rgb),0.18)] min-[521px]:min-w-0 min-[521px]:flex-1',
                  status.type === 'error' ? 'is-invalid' : '',
                ].join(' ')}
              />
              <button
                type="submit"
                className="cta-sheen h-[50px] w-full shrink-0 cursor-pointer rounded-full border-0 bg-ink px-[26px] font-sans text-[0.76rem] font-extrabold uppercase tracking-[0.12em] text-white shadow-[0_10px_24px_rgba(23,18,14,0.18)] transition-[background-color,transform] duration-250 hover:-translate-y-0.5 hover:bg-[var(--accent-strong)] min-[521px]:w-auto"
              >
                SIGN UP
              </button>
            </form>

            <p
              id="crewStatus"
              role="status"
              aria-live="polite"
              className={[
                'min-h-[1.3em] text-[0.8rem] font-semibold transition-colors duration-250',
                status.type === 'error'
                  ? 'text-[#c9213f]'
                  : status.type === 'success'
                    ? 'text-[var(--accent-strong)]'
                    : 'text-ink-muted',
              ].join(' ')}
            >
              {status.message}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

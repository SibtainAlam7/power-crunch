import { useEffect, useRef, useState } from 'react';

export default function SyncedProductImage({
  id,
  src,
  alt,
  className = '',
  loading = 'lazy',
}) {
  const [displayedSrc, setDisplayedSrc] = useState(src);
  const [displayedAlt, setDisplayedAlt] = useState(alt);
  const [swapping, setSwapping] = useState(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (src === displayedSrc) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      setDisplayedSrc(src);
      setDisplayedAlt(alt);
      return;
    }

    setSwapping(true);
    const timer = setTimeout(() => {
      setDisplayedSrc(src);
      setDisplayedAlt(alt);
      requestAnimationFrame(() => {
        setSwapping(false);
      });
    }, 150);

    return () => clearTimeout(timer);
  }, [src, alt, displayedSrc]);

  return (
    <img
      id={id}
      src={displayedSrc}
      alt={displayedAlt}
      loading={loading}
      decoding="async"
      className={`${className} ${swapping ? 'is-swapping' : ''}`.trim()}
    />
  );
}

import { useEffect } from 'react';

export function useRevealAndSectionObserver(onActiveSectionChange, onSpotlightEnter) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const nodes = Array.from(document.querySelectorAll('.reveal'));
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      nodes.forEach((el) => {
        el.dataset.revealed = 'true';
      });
    } else {
      const revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const target = entry.target;
            target.dataset.revealed = 'true';
            if (target.id === 'spotlightCard' && onSpotlightEnter) {
              onSpotlightEnter();
            }
            revealObserver.unobserve(target);
          });
        },
        { threshold: 0.08, rootMargin: '0px 0px -12px 0px' }
      );

      nodes.forEach((el) => revealObserver.observe(el));

      const trackedIds = ['flavours', 'nutrition', 'ingredients', 'reviews'];
      const trackedSections = trackedIds
        .map((id) => document.getElementById(id))
        .filter(Boolean);

      const navObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            if (onActiveSectionChange) {
              onActiveSectionChange(entry.target.id);
            }
          });
        },
        { threshold: 0.35 }
      );

      trackedSections.forEach((sec) => navObserver.observe(sec));

      return () => {
        revealObserver.disconnect();
        navObserver.disconnect();
      };
    }

    return undefined;
  }, [onActiveSectionChange, onSpotlightEnter]);
}

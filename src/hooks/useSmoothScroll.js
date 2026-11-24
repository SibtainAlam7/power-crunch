import { useCallback } from 'react';

/**
 * Clean-URL smooth scrolling: scrolls cleanly to `#sectionId` without
 * appending `#hash` to the browser URL bar.
 */
export function useSmoothScroll(onBeforeScroll) {
  return useCallback(
    (sectionId, event) => {
      if (event) event.preventDefault();
      if (onBeforeScroll) onBeforeScroll();

      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;
      const behavior = prefersReducedMotion ? 'auto' : 'smooth';

      if (sectionId === 'hero') {
        window.scrollTo({ top: 0, behavior });
      } else {
        const targetEl = document.getElementById(sectionId);
        if (targetEl) {
          const header = document.getElementById('siteHeader');
          const headerOffset = header ? header.offsetHeight - 2 : 60;
          const top = Math.max(
            0,
            targetEl.getBoundingClientRect().top + window.scrollY - headerOffset
          );
          window.scrollTo({ top, behavior });
        }
      }

      if (window.location.hash && window.history.replaceState) {
        window.history.replaceState(
          null,
          '',
          window.location.pathname + window.location.search
        );
      }
    },
    [onBeforeScroll]
  );
}

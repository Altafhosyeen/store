import { type RefObject, useEffect } from "react";

/**
 * Fades `.reveal` elements in as they scroll into view (adds `.in`), including
 * elements rendered later — product grids that load after the first paint.
 */
export const useRevealOnScroll = (rootRef: RefObject<HTMLElement>) => {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reveal = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("in");
          reveal.unobserve(entry.target);
        }
      },
      { threshold: 0.12 },
    );
    const observeAll = () => {
      for (const element of root.querySelectorAll(".reveal:not(.in)")) reveal.observe(element);
    };

    observeAll();
    const mutations = new MutationObserver(observeAll);
    mutations.observe(root, { childList: true, subtree: true });

    return () => {
      reveal.disconnect();
      mutations.disconnect();
    };
  }, [rootRef]);
};

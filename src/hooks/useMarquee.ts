import { useEffect, useRef } from "react";

/**
 * Drives a scroll-linked marquee.
 *
 * Writes the section's progress through the viewport (0 → 1) to a
 * `--marquee-progress` custom property, which the stylesheet uses to offset the
 * strips. Updates are coalesced into one rAF per frame so a fast scroll cannot
 * queue more work than the browser can paint.
 */
export const useMarquee = <T extends HTMLElement = HTMLElement>() => {
  const marqueeRef = useRef<T | null>(null);

  useEffect(() => {
    const section = marqueeRef.current;

    if (!section) {
      return undefined;
    }

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const total = rect.height + viewport;
      const progress = Math.min(Math.max((viewport - rect.top) / total, 0), 1);
      section.style.setProperty("--marquee-progress", progress.toFixed(4));
    };

    const requestUpdate = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return marqueeRef;
};

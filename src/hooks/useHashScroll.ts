import { useEffect } from "react";

/**
 * Scrolls to the URL's hash target once on mount.
 *
 * Needed because the page mounts after the browser's own hash handling has
 * already run, so links like /#services would otherwise land at the top.
 */
export const useHashScroll = (): void => {
  useEffect(() => {
    if (!window.location.hash) {
      return;
    }

    window.requestAnimationFrame(() => {
      document.querySelector(window.location.hash)?.scrollIntoView();
    });
  }, []);
};

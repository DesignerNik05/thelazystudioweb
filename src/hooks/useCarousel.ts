import { useEffect, useRef, useState } from "react";
import type { PointerEvent } from "react";

interface CarouselOptions {
  /** Slides cloned on each side to make the loop seamless. */
  cloneCount?: number;
  /** Delay between automatic advances. */
  autoAdvanceMs?: number;
  /** How long auto-advance pauses after the visitor interacts. */
  pauseMs?: number;
  /** Duration of the eased scroll to a slide. */
  scrollMs?: number;
}

/**
 * Infinite drag-and-auto-advance carousel.
 *
 * The list is padded with clones at both ends, so the visible index ("virtual")
 * differs from the real data index. After each move the scroll position is
 * normalised back into the middle copy, which is what makes the loop seamless.
 *
 * Auto-advance pauses whenever the visitor drags or uses the arrows.
 */
export const useCarousel = <T>(items: readonly T[], options: CarouselOptions = {}) => {
  const { cloneCount = 3, autoAdvanceMs = 11800, pauseMs = 7000, scrollMs = 3600 } = options;

  const carouselRef = useRef<HTMLDivElement | null>(null);
  const dragState = useRef({ isDragging: false, startX: 0, scrollLeft: 0, didDrag: false });
  const virtualIndexRef = useRef(cloneCount);
  const normalizeTimer = useRef<number | null>(null);
  const animationFrame = useRef<number | null>(null);
  const pauseAutoUntil = useRef(0);

  const [activeIndex, setActiveIndex] = useState(0);

  const loopedItems = [...items.slice(-cloneCount), ...items, ...items.slice(0, cloneCount)];

  const getRealIndex = (virtualIndex: number) =>
    (((virtualIndex - cloneCount) % items.length) + items.length) % items.length;

  const getStep = () => {
    const carousel = carouselRef.current;
    const card = carousel?.querySelector<HTMLElement>(".service-card");

    if (!carousel || !card) {
      return null;
    }

    const gap = Number.parseFloat(getComputedStyle(carousel).columnGap || "0");
    return card.offsetWidth + gap;
  };

  const normalizeLoopPosition = () => {
    const carousel = carouselRef.current;
    const step = getStep();

    if (!carousel || !step) {
      return;
    }

    let virtualIndex = virtualIndexRef.current;

    if (virtualIndex >= items.length + cloneCount) {
      virtualIndex -= items.length;
    }

    if (virtualIndex < cloneCount) {
      virtualIndex += items.length;
    }

    if (virtualIndex !== virtualIndexRef.current) {
      virtualIndexRef.current = virtualIndex;
      carousel.scrollTo({ left: virtualIndex * step, behavior: "auto" });
    }
  };

  const animateTo = (targetLeft: number, duration = scrollMs) => {
    const carousel = carouselRef.current;

    if (!carousel) {
      return;
    }

    window.cancelAnimationFrame(animationFrame.current ?? 0);
    const startLeft = carousel.scrollLeft;
    const distance = targetLeft - startLeft;
    const startTime = performance.now();
    const originalSnap = carousel.style.scrollSnapType;
    carousel.style.scrollSnapType = "none";

    const easeInOutCubic = (progress: number) =>
      progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    const tick = (time: number) => {
      const progress = Math.min((time - startTime) / duration, 1);
      carousel.scrollLeft = startLeft + distance * easeInOutCubic(progress);

      if (progress < 1) {
        animationFrame.current = window.requestAnimationFrame(tick);
        return;
      }

      carousel.style.scrollSnapType = originalSnap;
    };

    animationFrame.current = window.requestAnimationFrame(tick);
  };

  const scrollToVirtual = (virtualIndex: number, behavior: ScrollBehavior = "smooth") => {
    const carousel = carouselRef.current;
    const step = getStep();

    if (!carousel || !step) {
      return;
    }

    window.clearTimeout(normalizeTimer.current ?? 0);
    virtualIndexRef.current = virtualIndex;
    setActiveIndex(getRealIndex(virtualIndex));

    if (behavior === "smooth") {
      animateTo(virtualIndex * step);
    } else {
      carousel.scrollTo({ left: virtualIndex * step, behavior: "auto" });
    }

    normalizeTimer.current = window.setTimeout(
      normalizeLoopPosition,
      behavior === "smooth" ? scrollMs + 100 : 0,
    );
  };

  // The auto-advance interval below must call the *latest* scrollToVirtual
  // without being re-created every render, so it reads through this ref.
  // That is what lets the effect keep an honest empty dependency array.
  const scrollToVirtualRef = useRef(scrollToVirtual);

  // Assigned in an effect, not during render: writing a ref while rendering is
  // unsafe under concurrent rendering. Running after every render keeps it current.
  useEffect(() => {
    scrollToVirtualRef.current = scrollToVirtual;
  });

  // Start in the middle copy so there is room to loop in both directions.
  useEffect(() => {
    const initialise = () => {
      const step = getStep();

      if (step && carouselRef.current) {
        carouselRef.current.scrollLeft = virtualIndexRef.current * step;
      }
    };

    window.requestAnimationFrame(initialise);
    window.addEventListener("resize", initialise);

    return () => window.removeEventListener("resize", initialise);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      if (Date.now() < pauseAutoUntil.current || dragState.current.isDragging) {
        return;
      }

      scrollToVirtualRef.current(virtualIndexRef.current + 1);
    }, autoAdvanceMs);

    return () => {
      window.clearInterval(interval);
      window.cancelAnimationFrame(animationFrame.current ?? 0);
      window.clearTimeout(normalizeTimer.current ?? 0);
    };
  }, [autoAdvanceMs]);

  const pause = () => {
    pauseAutoUntil.current = Date.now() + pauseMs;
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    const carousel = carouselRef.current;

    if (!carousel) {
      return;
    }

    dragState.current = {
      isDragging: true,
      startX: event.clientX,
      scrollLeft: carousel.scrollLeft,
      didDrag: false,
    };
    pause();
    window.cancelAnimationFrame(animationFrame.current ?? 0);
    carousel.style.scrollSnapType = "none";
    carousel.setPointerCapture?.(event.pointerId);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const carousel = carouselRef.current;

    if (!carousel || !dragState.current.isDragging) {
      return;
    }

    const delta = event.clientX - dragState.current.startX;
    dragState.current.didDrag = Math.abs(delta) > 4;
    carousel.scrollLeft = dragState.current.scrollLeft - delta;
  };

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const carousel = carouselRef.current;
    const card = carousel?.querySelector<HTMLElement>(".service-card");

    if (!carousel || !card) {
      return;
    }

    dragState.current.isDragging = false;
    carousel.style.scrollSnapType = "";
    carousel.releasePointerCapture?.(event.pointerId);
    const gap = Number.parseFloat(getComputedStyle(carousel).columnGap || "0");
    const index = Math.round(carousel.scrollLeft / (card.offsetWidth + gap));
    pause();
    scrollToVirtual(index);
  };

  const step = (delta: number) => {
    pauseAutoUntil.current = Date.now() + pauseMs + 2000;
    scrollToVirtual(virtualIndexRef.current + delta);
  };

  return {
    carouselRef,
    loopedItems,
    activeIndex,
    getRealIndex,
    goPrev: () => step(-1),
    goNext: () => step(1),
    pointerHandlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel: onPointerUp,
    },
  };
};

"use client";

import {
  isValidElement,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useReducedMotion } from "./useReducedMotion";

function stride(scroller: HTMLElement) {
  const slide = scroller.querySelector("li");

  if (!slide) {
    return 0;
  }

  const gap = Number.parseFloat(getComputedStyle(scroller).columnGap);

  return slide.offsetWidth + (Number.isFinite(gap) ? gap : 0);
}

export function slideKey(slide: ReactNode, index: number) {
  if (isValidElement(slide) && slide.key != null) {
    return slide.key;
  }

  return index;
}

/**
 * Scroll position for a native snap track.
 * One card plus the gap is one step. Previous and next disable at the ends.
 * The active index is the snapped card, so dots can mark it.
 * Reduced motion jumps instead of animating.
 */
export function useCarousel() {
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const scroller = scrollerRef.current;

    if (!scroller) {
      return;
    }

    function sync() {
      const track = scrollerRef.current;

      if (!track) {
        return;
      }

      const max = track.scrollWidth - track.clientWidth;
      const left = track.scrollLeft;
      const step = stride(track);
      const last = track.querySelectorAll("li").length - 1;

      setAtStart(left <= 1);
      setAtEnd(max <= 1 || left >= max - 1);

      if (step <= 0 || last < 0) {
        return;
      }

      const index = Math.round(left / step);
      setActiveIndex(Math.min(Math.max(index, 0), last));
    }

    sync();
    scroller.addEventListener("scroll", sync, { passive: true });

    const observer =
      typeof ResizeObserver === "function"
        ? new ResizeObserver(sync)
        : undefined;
    observer?.observe(scroller);

    return () => {
      scroller.removeEventListener("scroll", sync);
      observer?.disconnect();
    };
  }, []);

  function scrollToIndex(index: number) {
    const scroller = scrollerRef.current;

    if (!scroller) {
      return;
    }

    const step = stride(scroller);

    if (step <= 0) {
      return;
    }

    scroller.scrollTo({
      left: index * step,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }

  function scrollByCard(direction: 1 | -1) {
    const scroller = scrollerRef.current;

    if (!scroller) {
      return;
    }

    const step = stride(scroller);

    if (step <= 0) {
      return;
    }

    const index = Math.round(scroller.scrollLeft / step);
    scrollToIndex(index + direction);
  }

  return {
    scrollerRef,
    atStart,
    atEnd,
    activeIndex,
    scrollToIndex,
    scrollByCard,
  };
}

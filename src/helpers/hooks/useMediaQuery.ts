"use client";

import { useEffect, useState } from "react";
import { BREAKPOINT } from "@/config/breakpoints";

/**
 * Subscribes to a media query. `null` until the query has been read on the
 * client, and it stays `null` when `matchMedia` is missing.
 */
export function useMediaQueryState(query: string) {
  const [matches, setMatches] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") {
      return;
    }

    const media = window.matchMedia(query);

    function onChange() {
      setMatches(media.matches);
    }

    onChange();
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

/**
 * Subscribes to a media query. False until the query has been read on the client.
 */
export function useMediaQuery(query: string) {
  return useMediaQueryState(query) ?? false;
}

function minWidth(name: keyof typeof BREAKPOINT) {
  if (typeof window === "undefined") {
    return `(min-width: ${BREAKPOINT[name]})`;
  }

  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(`--breakpoint-${name}`)
    .trim();

  return `(min-width: ${value || BREAKPOINT[name]})`;
}

/**
 * Theme breakpoints. Mobile is below 810px, tablet is 810–1199px, desktop is 1200px and up.
 */
export function useBreakpoint() {
  const isTabletUp = useMediaQuery(minWidth("tablet"));
  const isDesktop = useMediaQuery(minWidth("desktop"));

  return {
    isMobile: !isTabletUp,
    isTablet: isTabletUp && !isDesktop,
    isDesktop,
  };
}

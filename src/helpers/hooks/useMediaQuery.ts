"use client";

import { useEffect, useState } from "react";

const FALLBACK = {
  tablet: "810px",
  desktop: "1200px",
} as const;

/**
 * Subscribes to a media query. False until the query has been read on the client.
 */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

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

function minWidth(name: keyof typeof FALLBACK) {
  if (typeof window === "undefined") {
    return `(min-width: ${FALLBACK[name]})`;
  }

  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(`--breakpoint-${name}`)
    .trim();

  return `(min-width: ${value || FALLBACK[name]})`;
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

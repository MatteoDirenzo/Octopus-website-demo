/**
 * Media queries for attributes that cannot read a CSS variable: `sizes`,
 * `<source media>`, `preload`, and the fallback in `useBreakpoint`.
 * The values mirror `--breakpoint-tablet` and `--breakpoint-desktop` in
 * `src/styles/tokens.css`, which stays the source of truth.
 */
export const BREAKPOINT = {
  tablet: "810px",
  desktop: "1200px",
} as const;

export const MEDIA_TABLET = `(min-width: ${BREAKPOINT.tablet})`;
export const MEDIA_DESKTOP = `(min-width: ${BREAKPOINT.desktop})`;
/** One pixel under the desktop breakpoint. */
export const MEDIA_BELOW_DESKTOP = "(max-width: 1199px)";
export const MEDIA_REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

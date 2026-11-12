/**
 * Carousel values used when a block omits them. `inset` is in spacing
 * steps and matches the header inset. `peek` shows two thirds of the next card.
 */
export const CAROUSEL_DEFAULTS = {
  visible: { mobile: 1, tablet: 2, desktop: 5 },
  inset: { mobile: 4, tablet: 8, desktop: 32 },
  peek: "calc(2 / 3)",
} as const;

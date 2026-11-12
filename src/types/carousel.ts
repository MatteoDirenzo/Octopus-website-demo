import type { BreakpointValue } from "./layout";

/** Carousel track modes. */
export const CAROUSEL_MODES = ["contained", "overflow"] as const;

/** One of `CAROUSEL_MODES`. */
export type CarouselMode = (typeof CAROUSEL_MODES)[number];

/** Full cards in view per breakpoint. The overflow peek is not included. */
export type CarouselVisible = BreakpointValue<number>;

/**
 * Overflow end inset per breakpoint, as a spacing step.
 * The same number as the padding utility: `4` matches `px-4`.
 */
export type CarouselEndOffset = BreakpointValue<number>;

/**
 * How much of the next card stays in view, as a percentage of one card.
 * `50` shows half. Omitted shows two thirds.
 */
export type CarouselPeek = BreakpointValue<number>;

/**
 * Overflow start inset per breakpoint, in the same spacing steps as the padding utilities.
 * Omitted matches the header: 4, 8, and 32.
 */
export type CarouselInset = BreakpointValue<number>;

import { MEDIA_DESKTOP, MEDIA_TABLET } from "./breakpoints";

/** `sizes` values shared by `next/image` callers. */
export const SIZES_FULL = "100vw";
export const SIZES_HALF_FROM_TABLET = `${MEDIA_TABLET} 50vw, 100vw`;
export const SIZES_HALF_FROM_DESKTOP = `${MEDIA_DESKTOP} 50vw, 100vw`;

/**
 * Card `sizes`. `background` is the picture across the card, `slot` the
 * picture beside the copy. 31rem matches `--container-card-image`.
 */
export const CARD_SIZES = {
  small: `${MEDIA_TABLET} 30vw, 80vw`,
  medium: {
    background: {
      vertical: `${MEDIA_DESKTOP} 50vw, ${MEDIA_TABLET} 45vw, 80vw`,
      horizontal: `${MEDIA_DESKTOP} 50vw, ${MEDIA_TABLET} 45vw, 80vw`,
    },
    slot: {
      vertical: `${MEDIA_DESKTOP} 40vw, ${MEDIA_TABLET} 45vw, 80vw`,
      horizontal: `${MEDIA_DESKTOP} 31rem, ${MEDIA_TABLET} 45vw, 80vw`,
    },
  },
  large: {
    background: {
      vertical: `${MEDIA_DESKTOP} 40vw, 90vw`,
      horizontal: `${MEDIA_TABLET} 80vw, 90vw`,
    },
    slot: {
      vertical: `${MEDIA_DESKTOP} 50vw, ${MEDIA_TABLET} 31rem, 80vw`,
      horizontal: `${MEDIA_TABLET} 31rem, 80vw`,
    },
  },
} as const;

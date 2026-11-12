import type { ImageAsset } from "./media";

/** Allowed category ids. */
export const CATEGORIES = [
  "kitchen",
  "home-security",
  "hair-care",
  "accessories",
] as const;

/** Id of a category in `categories.json`. */
export type CategoryId = (typeof CATEGORIES)[number];

/**
 * A shop category.
 * `tileImage` is the square cutout shown on a category card.
 */
export type Category = {
  /** Value from `CATEGORIES`. */
  id: CategoryId;
  /** Heading shown for the category. */
  title: string;
  /** Short line under the title. */
  tagline: string;
  /** Square category tile. */
  tileImage: ImageAsset;
  /** Destination of the category link. */
  href: string;
};

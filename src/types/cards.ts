import type { ImageAsset } from "./media";
import type { Cta } from "./ui";

/** Card size chosen by a carousel block. `product` is a product card. */
export const CARD_TYPES = ["large", "medium", "small", "product"] as const;

/** One of `CARD_TYPES`. */
export type CardType = (typeof CARD_TYPES)[number];

/** Card orientation for large and medium cards. */
export const CARD_VARIANTS = ["horizontal", "vertical"] as const;

/** One of `CARD_VARIANTS`. */
export type CardVariant = (typeof CARD_VARIANTS)[number];

/** Showcase layouts. `row` is small cards only. The feature layouts use `featureProductSlug`. */
export const SHOWCASE_LAYOUTS = ["feature-top", "feature-left", "row"] as const;

/** One of `SHOWCASE_LAYOUTS`. */
export type ShowcaseLayout = (typeof SHOWCASE_LAYOUTS)[number];

/** One of the two category showcase arrangements that have a feature card. */
export type FeatureShowcaseLayout = Exclude<ShowcaseLayout, "row">;

/** Copy and image for one showcase card. */
export type CategoryShowcaseCard = {
  title: string;
  description: string;
  image: ImageAsset;
  /**
   * Paint `image` across the card. Set on the feature card, whose picture
   * is `featuredImage`.
   */
  background?: boolean;
  cta: Cta;
};

/** One category link card. */
export type ExploreCategoryCard = {
  /** Cutout shown on the card. The link name comes from `alt`. */
  image: ImageAsset;
  /** Destination of the image link. */
  href: string;
  /** Name under the image. Replaces the product title and description. */
  label: string;
};

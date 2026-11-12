import type { ImageAsset, ImageSource } from "./media";

/** Width of a gallery item in the two-column gallery. */
export const GALLERY_SPANS = ["full", "half"] as const;

/** One of `GALLERY_SPANS`. */
export type GallerySpan = (typeof GALLERY_SPANS)[number];

/** Tone of text placed on a gallery image. */
export const TEXT_TONES = ["light", "dark"] as const;

/** One of `TEXT_TONES`. */
export type TextTone = (typeof TEXT_TONES)[number];

/** One cell in a product gallery. */
export type GalleryItem = {
  /** Image for this cell. */
  image: ImageAsset;
  /** `full` spans both columns. `half` spans one. */
  span: GallerySpan;
  /** Caption heading. Omit on an image-only cell. */
  title?: string;
  /** Caption body. Omit on an image-only cell. */
  description?: string;
  /** Caption tone. Omit on an image-only cell. */
  textTone?: TextTone;
};

/** One highlight card in a bento row. */
export type BentoCard = {
  title: string;
  description: string;
  /** Background photo. Omit it to use the shared placeholder. */
  image?: ImageSource;
};

/** One full-width card, or two equal cards, from 1200. */
export type BentoRow = readonly [BentoCard] | readonly [BentoCard, BentoCard];

/** A gallery cell with no title. It renders as a full-width image. */
export type GalleryImageBlock = {
  kind: "image";
  image: ImageAsset;
};

/** Consecutive titled cells. `full` is one row. Two `half` cells share a row. */
export type GalleryBentoBlock = {
  kind: "bento";
  rows: BentoRow[];
};

/** One step of the product gallery, in display order. */
export type GalleryBlock = GalleryImageBlock | GalleryBentoBlock;

/** A titled gallery cell, waiting to be placed in a bento row. */
export type GalleryCaption = {
  card: BentoCard;
  span: GalleryItem["span"];
};

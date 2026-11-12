import type { BentoCard, BentoRow } from "@/components/BentoBox";
import type { GalleryItem, ImageAsset } from "@/types/content";

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

type Caption = {
  card: BentoCard;
  span: GalleryItem["span"];
};

/**
 * Walks the gallery in order.
 * A cell with a title joins the current bento. A cell without one is an
 * image and closes that bento. A full cell is its own row. Two half cells
 * share a row. A half left on its own is a row of one.
 * `textTone` stays on the source item. The bento uses its own text colours.
 */
export function groupGallery(items: readonly GalleryItem[]): GalleryBlock[] {
  const blocks: GalleryBlock[] = [];
  let captions: Caption[] = [];

  const flush = () => {
    if (captions.length === 0) {
      return;
    }

    blocks.push({ kind: "bento", rows: toRows(captions) });
    captions = [];
  };

  for (const item of items) {
    if (!item.title) {
      flush();
      blocks.push({ kind: "image", image: item.image });
      continue;
    }

    captions.push({
      card: {
        title: item.title,
        description: item.description ?? "",
        image: { src: item.image.src, alt: item.image.alt },
      },
      span: item.span,
    });
  }

  flush();

  return blocks;
}

function toRows(captions: readonly Caption[]): BentoRow[] {
  const rows: BentoRow[] = [];
  let pending: BentoCard | undefined;

  for (const caption of captions) {
    if (caption.span === "full") {
      if (pending) {
        rows.push([pending]);
        pending = undefined;
      }

      rows.push([caption.card]);
      continue;
    }

    if (pending) {
      rows.push([pending, caption.card]);
      pending = undefined;
      continue;
    }

    pending = caption.card;
  }

  if (pending) {
    rows.push([pending]);
  }

  return rows;
}

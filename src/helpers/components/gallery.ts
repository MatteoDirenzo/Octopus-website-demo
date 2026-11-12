import type {
  BentoCard,
  BentoRow,
  GalleryBlock,
  GalleryCaption,
  GalleryItem,
} from "@/types";

/**
 * Walks the gallery in order.
 * A cell with a title joins the current bento. A cell without one is an
 * image and closes that bento. A full cell is its own row. Two half cells
 * share a row. A half left on its own is a row of one.
 * `textTone` stays on the source item. The bento uses its own text colours.
 */
export function groupGallery(items: readonly GalleryItem[]): GalleryBlock[] {
  const blocks: GalleryBlock[] = [];
  let captions: GalleryCaption[] = [];

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

function toRows(captions: readonly GalleryCaption[]): BentoRow[] {
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

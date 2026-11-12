import { expect, test } from "vitest";
import type { GalleryItem, GallerySpan } from "@/types/content";
import { groupGallery } from "./gallery";

function item(span: GallerySpan, title?: string): GalleryItem {
  return {
    image: {
      src: `/images/${title ?? span}.webp`,
      alt: title ?? `${span} image`,
      width: 1600,
      height: 1200,
    },
    span,
    ...(title ? { title, description: `${title} body` } : {}),
  };
}

test("a titled run becomes one bento and an untitled cell stays an image", () => {
  const blocks = groupGallery([
    item("full"),
    item("full", "Built for the hard jobs"),
    item("half", "Clean without a scrub"),
    item("half", "Pulse for control"),
    item("full", "A preset for most days"),
    item("full"),
  ]);

  expect(blocks.map((block) => block.kind)).toEqual(["image", "bento", "image"]);

  const bento = blocks[1];

  if (bento?.kind !== "bento") {
    throw new Error("Expected a bento");
  }

  expect(bento.rows.map((row) => row.map((card) => card.title))).toEqual([
    ["Built for the hard jobs"],
    ["Clean without a scrub", "Pulse for control"],
    ["A preset for most days"],
  ]);
  expect(blocks[0]).toMatchObject({
    kind: "image",
    image: { alt: "full image" },
  });
});

test("a half cell before a full cell stays its own row", () => {
  const blocks = groupGallery([
    item("half", "Pulse for control"),
    item("full", "A preset for most days"),
  ]);

  const bento = blocks[0];

  if (bento?.kind !== "bento") {
    throw new Error("Expected a bento");
  }

  expect(bento.rows.map((row) => row.length)).toEqual([1, 1]);
});

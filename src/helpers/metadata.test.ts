import { expect, test } from "vitest";
import type { ImageAsset } from "@/types";
import { toMetadata } from "./metadata";

const page = { title: "Where to buy", description: "Find a store near you." };

const image: ImageAsset = {
  src: "/images/share.webp",
  alt: "A video doorbell",
  width: 1620,
  height: 648,
};

test("copies the title and description into Open Graph and the Twitter card", () => {
  const metadata = toMetadata(page);

  expect(metadata.title).toBe(page.title);
  expect(metadata.description).toBe(page.description);
  expect(metadata.openGraph).toMatchObject({ ...page, type: "website" });
  expect(metadata.twitter).toMatchObject({
    ...page,
    card: "summary_large_image",
  });
});

test("adds the share image with its size and alt text", () => {
  const metadata = toMetadata({ ...page, image });

  expect(metadata.openGraph?.images).toEqual([
    { url: image.src, width: image.width, height: image.height, alt: image.alt },
  ]);
  expect(metadata.twitter?.images).toEqual([{ url: image.src, alt: image.alt }]);
});

test("a path becomes the canonical URL and og:url", () => {
  const metadata = toMetadata({ ...page, path: "/where-to-buy" });

  expect(metadata.alternates?.canonical).toBe("/where-to-buy");
  expect(metadata.openGraph?.url).toBe("/where-to-buy");
});

test("noIndex marks the page as noindex", () => {
  expect(toMetadata({ ...page, noIndex: true }).robots).toEqual({ index: false });
});

test("omits canonical, robots and images when they are not given", () => {
  const metadata = toMetadata();

  expect(metadata.alternates).toBeUndefined();
  expect(metadata.robots).toBeUndefined();
  expect(metadata.openGraph?.images).toBeUndefined();
  expect(metadata.twitter?.images).toBeUndefined();
});

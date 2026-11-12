import { expect, test } from "vitest";
import { getCropProps, responsiveImages, imageSrcForBreakpoint } from "./image";

test("breakpoint files insert -desktop, -mobile, and -tablet before the extension", () => {
  expect(imageSrcForBreakpoint("/images/banner-red.webp", "desktop")).toBe(
    "/images/banner-red-desktop.webp",
  );

  const crops = responsiveImages({
    src: "/images/banner-red.webp",
    alt: "Red set",
    desktop: { width: 4096, height: 1755 },
    mobile: { width: 4096, height: 2650 },
    tablet: { width: 810, height: 500 },
  });

  expect(Object.keys(crops)).toEqual(["desktop", "mobile", "tablet"]);
  expect(crops.desktop).toEqual({
    src: "/images/banner-red-desktop.webp",
    alt: "Red set",
    width: 4096,
    height: 1755,
  });
  expect(crops.mobile.src).toBe("/images/banner-red-mobile.webp");
  expect(crops.tablet.src).toBe("/images/banner-red-tablet.webp");
});

test("crop props keep the exported file and its size", () => {
  const props = getCropProps(
    { src: "/images/hero.webp", alt: "Blender", width: 1600, height: 900 },
    { sizes: "100vw" },
  );

  expect(props.src).toBe("/images/hero.webp");
  expect(props.alt).toBe("Blender");
  expect(props.width).toBe(1600);
  expect(props.height).toBe(900);
});

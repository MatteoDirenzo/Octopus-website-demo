import { expect, test } from "vitest";
import { responsiveImages, imageSrcForBreakpoint } from "./image";

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

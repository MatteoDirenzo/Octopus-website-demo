import type { ImageAsset } from "@/types/content";

/**
 * Breakpoint suffixes, in export order.
 * A file `/images/banner-red.webp` is delivered as
 * `banner-red-desktop.webp`, `banner-red-mobile.webp`, and `banner-red-tablet.webp`.
 */
export const IMAGE_BREAKPOINTS = ["desktop", "mobile", "tablet"] as const;

/** One of `IMAGE_BREAKPOINTS`. */
export type ImageBreakpoint = (typeof IMAGE_BREAKPOINTS)[number];

/** Pixel size of one crop. The path comes from the shared `src`. */
export type ImageCropSize = {
  /** Pixel width of this crop. */
  width: number;
  /** Pixel height of this crop. */
  height: number;
};

/**
 * One picture exported three times.
 * `src` has no breakpoint suffix. Each crop is that path with
 * `-desktop`, `-mobile`, or `-tablet` before the extension.
 */
export type ResponsiveImage = {
  /** Path without a breakpoint suffix. */
  src: string;
  /** Accessible description shared by every crop. */
  alt: string;
  /** Crop shown from 1200. */
  desktop: ImageCropSize;
  /** Crop shown below 810. */
  mobile: ImageCropSize;
  /** Crop shown from 810 until 1200. */
  tablet: ImageCropSize;
};

/**
 * Inserts the breakpoint before the extension.
 * `/images/banner-red.webp` and `desktop` become `/images/banner-red-desktop.webp`.
 */
export function imageSrcForBreakpoint(src: string, breakpoint: ImageBreakpoint) {
  const slash = src.lastIndexOf("/");
  const dot = src.lastIndexOf(".");

  if (dot === -1 || dot < slash) {
    return `${src}-${breakpoint}`;
  }

  return `${src.slice(0, dot)}-${breakpoint}${src.slice(dot)}`;
}

/**
 * The three files for a `ResponsiveImage`, keyed in export order:
 * desktop, then mobile, then tablet.
 */
export function responsiveImages(image: ResponsiveImage): Record<ImageBreakpoint, ImageAsset> {
  return {
    desktop: toCrop(image, "desktop"),
    mobile: toCrop(image, "mobile"),
    tablet: toCrop(image, "tablet"),
  };
}

function toCrop(image: ResponsiveImage, breakpoint: ImageBreakpoint): ImageAsset {
  return {
    src: imageSrcForBreakpoint(image.src, breakpoint),
    alt: image.alt,
    width: image[breakpoint].width,
    height: image[breakpoint].height,
  };
}

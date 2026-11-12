import type { ImageAsset, ImageBreakpoint, ResponsiveImage } from "@/types";

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

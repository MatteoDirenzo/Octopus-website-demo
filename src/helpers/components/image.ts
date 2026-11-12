import { getImageProps } from "next/image";
import type { ImageAsset, ImageBreakpoint, ResponsiveImage } from "@/types";

type CropOptions = {
  sizes: string;
  priority?: boolean;
  fetchPriority?: "high" | "low" | "auto";
};

/**
 * `img` props for one crop of a `picture`. A `source` uses `srcSet ?? src`.
 * The exported files are already the delivered size, so the optimizer is
 * skipped and does not recompress them.
 */
export function getCropProps(image: ImageAsset, options: CropOptions) {
  return getImageProps({
    ...options,
    src: image.src,
    alt: image.alt,
    width: image.width,
    height: image.height,
    unoptimized: true,
  }).props;
}

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

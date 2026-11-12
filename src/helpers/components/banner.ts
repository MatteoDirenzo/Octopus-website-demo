import type { ImageSource, ResponsiveImage } from "@/types";

/** True for a crop set, false for a single file. */
export function isResponsiveImage(
  image: ImageSource | ResponsiveImage,
): image is ResponsiveImage {
  return "mobile" in image;
}

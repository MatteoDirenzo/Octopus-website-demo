/**
 * Breakpoint suffixes, in export order.
 * A file `/images/banner-red.webp` is delivered as
 * `banner-red-desktop.webp`, `banner-red-mobile.webp`, and `banner-red-tablet.webp`.
 */
export const IMAGE_BREAKPOINTS = ["desktop", "mobile", "tablet"] as const;

/** One of `IMAGE_BREAKPOINTS`. */
export type ImageBreakpoint = (typeof IMAGE_BREAKPOINTS)[number];

/** MIME types allowed on a hero video source. */
export const VIDEO_TYPES = ["video/mp4", "video/webm"] as const;

/** One of `VIDEO_TYPES`. */
export type VideoType = (typeof VIDEO_TYPES)[number];

/**
 * Image file plus the space it reserves.
 * `alt` is required, and `width` and `height` are provisional stand-ins until the exported asset's ratio replaces them.
 */
export type ImageAsset = {
  /** Path or URL of the image file. */
  src: string;
  /** Accessible description. An empty alt is invalid. */
  alt: string;
  /** Provisional pixel width. */
  width: number;
  /** Provisional pixel height. */
  height: number;
};

/** Image file without a reserved size. An empty `alt` marks a decorative photo. */
export type ImageSource = {
  /** Path or URL of the image file. */
  src: string;
  /**
   * Accessible description. Pass an empty string when the photo is decorative.
   */
  alt: string;
};

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
 * Screen-height hero still.
 * `mobile` is the 9:16 crop and is also used at the tablet breakpoint.
 * `desktop` is the 16:9 crop and is used from the desktop breakpoint.
 */
export type HeroImage = {
  /** Portrait crop, 1080 by 1920. Shown below the desktop breakpoint. */
  mobile: ImageAsset;
  /** Landscape crop, 1920 by 1080. Shown from the desktop breakpoint. */
  desktop: ImageAsset;
};

/** One playable file in a `VideoAsset`. */
export type VideoSource = {
  /** Path or URL of the video file. */
  src: string;
  /** A value from `VIDEO_TYPES`. */
  type: VideoType;
};

/** Hero video: one or more sources plus a poster image. */
export type VideoAsset = {
  /** Playable files. Each `type` is a value from `VIDEO_TYPES`. */
  sources: VideoSource[];
  /** Image shown before the video plays. */
  poster: ImageAsset;
};

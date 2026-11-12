import clsx from "clsx";
import { preload } from "react-dom";
import { MEDIA_BELOW_DESKTOP, MEDIA_DESKTOP } from "@/config/breakpoints";
import { SIZES_FULL } from "@/config/sizes";
import { getCropProps } from "@/helpers/components/image";
import type { ImageAsset } from "@/types";

export type ImageHeroProps = {
  /** Portrait crop. Shown below the desktop breakpoint, including tablet. */
  mobile: ImageAsset;
  /** Landscape crop. Shown from the desktop breakpoint. */
  desktop: ImageAsset;
  className?: string;
};

/**
 * Full-bleed hero still. The parent is one screen tall. Below 1200 the
 * portrait file is shown; from 1200 the landscape file replaces it.
 * `object-bottom` keeps the product when the viewport is not 9:16 or 16:9.
 *
 * The source media query comes from `@/config/breakpoints`. Each file is preloaded only for its own query, so the other crop stays out
 * of the download.
 */
export function ImageHero({ mobile, desktop, className }: ImageHeroProps) {
  const options = {
    sizes: SIZES_FULL,
    priority: true,
    fetchPriority: "high" as const,
  };
  const desktopProps = getCropProps(desktop, options);
  const mobileProps = getCropProps(mobile, options);

  preload(desktopProps.src, {
    as: "image",
    imageSrcSet: desktopProps.srcSet,
    imageSizes: desktopProps.srcSet ? SIZES_FULL : undefined,
    fetchPriority: "high",
    media: MEDIA_DESKTOP,
  });
  preload(mobileProps.src, {
    as: "image",
    imageSrcSet: mobileProps.srcSet,
    imageSizes: mobileProps.srcSet ? SIZES_FULL : undefined,
    fetchPriority: "high",
    media: MEDIA_BELOW_DESKTOP,
  });

  return (
    <div className={clsx("relative h-full w-full", className)}>
      <picture className="absolute inset-0">
        <source
          media={MEDIA_DESKTOP}
          srcSet={desktopProps.srcSet ?? desktopProps.src}
        />
        <img
          {...mobileProps}
          alt={mobile.alt}
          className="h-full w-full object-cover object-bottom"
        />
      </picture>
    </div>
  );
}

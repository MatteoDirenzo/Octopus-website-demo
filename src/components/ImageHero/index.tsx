import clsx from "clsx";
import { getImageProps } from "next/image";
import { preload } from "react-dom";
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
 * The source media query is 1200px, the same value as `--breakpoint-desktop`
 * in `src/styles/tokens.css`. A media attribute cannot read a CSS variable.
 * Each file is preloaded only for its own query, so the other crop stays out
 * of the download.
 */
export function ImageHero({ mobile, desktop, className }: ImageHeroProps) {
  const common = {
    alt: mobile.alt,
    sizes: "100vw",
    priority: true,
    fetchPriority: "high" as const,
    /*
     * The exported files are already the delivered size.
     * Skip the optimizer so it does not recompress them.
     */
    unoptimized: true,
  };

  const {
    props: { srcSet: desktopSrcSet, src: desktopSrc },
  } = getImageProps({
    ...common,
    width: desktop.width,
    height: desktop.height,
    src: desktop.src,
  });

  const { props: mobileProps } = getImageProps({
    ...common,
    width: mobile.width,
    height: mobile.height,
    src: mobile.src,
  });

  preload(desktopSrc, {
    as: "image",
    imageSrcSet: desktopSrcSet,
    imageSizes: desktopSrcSet ? "100vw" : undefined,
    fetchPriority: "high",
    media: "(min-width: 1200px)",
  });
  preload(mobileProps.src, {
    as: "image",
    imageSrcSet: mobileProps.srcSet,
    imageSizes: mobileProps.srcSet ? "100vw" : undefined,
    fetchPriority: "high",
    media: "(max-width: 1199px)",
  });

  return (
    <div className={clsx("relative h-full w-full", className)}>
      <picture className="absolute inset-0">
        <source
          media="(min-width: 1200px)"
          srcSet={desktopSrcSet ?? desktopSrc}
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

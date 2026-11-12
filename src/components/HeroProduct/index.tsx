import clsx from "clsx";
import Image from "next/image";
import { SIZES_HALF_FROM_TABLET } from "@/config/sizes";
import type { ImageAsset } from "@/types";

export type HeroProductProps = {
  /** Cutout for the first screen. The frame has no padding. */
  image: ImageAsset;
  className?: string;
};

/**
 * Product still for the first screen of the detail page.
 * The frame is the full viewport, and the picture sits inside it with no
 * padding. The page pulls the frame up under the fixed header. Below 810
 * the frame is the full width. From 810 it is the left column.
 */
export function HeroProduct({ image, className }: HeroProductProps) {
  return (
    <div
      className={clsx(
        "relative h-dvh w-full min-w-0 bg-neutral-muted",
        className,
      )}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority
        sizes={SIZES_HALF_FROM_TABLET}
        className="object-contain"
      />
    </div>
  );
}

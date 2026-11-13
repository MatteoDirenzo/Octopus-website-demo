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
 * The picture sits inside the frame with no padding. The page pulls the
 * frame up under the fixed header. Below 810 the frame is the full width,
 * pads the header height on top so the picture starts below the header, and
 * is otherwise as tall as the picture, from its own width and height. From 810 it is the
 * left column, one viewport tall, and the picture fills it.
 */
export function HeroProduct({ image, className }: HeroProductProps) {
  return (
    <div
      className={clsx(
        "relative w-full min-w-0 bg-neutral-muted pt-header tablet:h-svh tablet:pt-0",
        className,
      )}
    >
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        priority
        sizes={SIZES_HALF_FROM_TABLET}
        className="h-auto w-full object-contain tablet:absolute tablet:inset-0 tablet:h-full"
      />
    </div>
  );
}

import clsx from "clsx";
import Image from "next/image";
import type { ImageAsset } from "@/types/content";

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
 * `sizes` uses 810px, the same value as `--breakpoint-tablet`. A sizes
 * attribute cannot read a CSS variable.
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
        sizes="(min-width: 810px) 50vw, 100vw"
        className="object-contain"
      />
    </div>
  );
}

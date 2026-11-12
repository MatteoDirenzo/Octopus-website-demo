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
 * The frame is the viewport under the fixed header, and the picture sits
 * inside it with no padding. Below 810 the frame is the full width. From
 * 810 it is the left column.
 * `sizes` uses 810px, the same value as `--breakpoint-tablet`. A sizes
 * attribute cannot read a CSS variable.
 */
export function HeroProduct({ image, className }: HeroProductProps) {
  return (
    <div
      className={clsx(
        "relative h-hero-product w-full min-w-0 bg-neutral-muted",
        "tablet:h-hero-product-tablet",
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

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { SIZES_FULL } from "@/config/sizes";
import type { ImageAsset } from "@/types";

export type ProductCardProps = {
  /** Cutout shown on the card. The link name comes from `alt`. */
  image: ImageAsset;
  /** Destination of the image link. Omit to show the image without a link. */
  href?: string;
  /** Card title. Omit for an image-only card. Ignored when `label` is set. */
  title?: string;
  /** Line under the title. Omit when the card has no copy. Ignored when `label` is set. */
  description?: string;
  /**
   * Single line under the image. Replaces `title` and `description`.
   * Body on mobile (16px). From 810, body metrics at 20px (`subtitle-m`).
   */
  label?: string;
};

/**
 * Product card. The image is a link only when `href` is set. Title and
 * description are optional. A label replaces both. The first line of copy
 * sits 16px under the image. A description under a title sits 8px below it.
 * From 810 the copy is inset 24px on each side. Mobile has no side inset.
 * The width comes from the parent.
 */
export function ProductCard({
  image,
  href,
  title,
  description,
  label,
}: ProductCardProps) {
  const imageElement = (
    <Image
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      sizes={SIZES_FULL}
      className="h-auto w-full"
    />
  );

  return (
    <article className="flex w-full min-w-0 flex-col">
      {href ? (
        <Link
          href={href}
          className="block overflow-hidden rounded-card outline-none focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-focus"
        >
          {imageElement}
        </Link>
      ) : (
        <div className="overflow-hidden rounded-card">{imageElement}</div>
      )}
      {label || title || description ? (
        <div className="tablet:px-6">
          {label ? (
            <p className="mt-4 text-center text-body text-text tablet:text-subtitle-m">
              {label}
            </p>
          ) : (
            <>
              {title ? (
                <h3 className="mt-4 text-title-bold text-text">{title}</h3>
              ) : null}
              {description ? (
                <p
                  className={clsx(
                    "text-body text-text-muted",
                    title ? "mt-2" : "mt-4",
                  )}
                >
                  {description}
                </p>
              ) : null}
            </>
          )}
        </div>
      ) : null}
    </article>
  );
}

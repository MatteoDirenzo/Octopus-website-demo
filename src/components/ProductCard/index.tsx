import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import type { ImageAsset } from "@/types/content";

export type ProductCardProps = {
  /** Cutout shown on the card. The link name comes from `alt`. */
  image: ImageAsset;
  /** Destination of the image link. */
  href: string;
  /** Card title. Omit for an image-only card. */
  title?: string;
  /** Line under the title. Omit when the card has no copy. */
  description?: string;
};

/**
 * Product card. Only the image is a link. Title and description are optional.
 * The first line of copy sits 16px under the image. A description under a
 * title sits 8px below it. The width comes from the parent.
 */
export function ProductCard({
  image,
  href,
  title,
  description,
}: ProductCardProps) {
  return (
    <article className="flex w-full min-w-0 flex-col">
      <Link
        href={href}
        className="block overflow-hidden rounded-card outline-none focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-focus"
      >
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes="100vw"
          className="h-auto w-full"
        />
      </Link>
      {title ? (
        <h3 className="mt-4 text-title-bold text-text">{title}</h3>
      ) : null}
      {description ? (
        <p className={clsx("text-body text-text-muted", title ? "mt-2" : "mt-4")}>
          {description}
        </p>
      ) : null}
    </article>
  );
}

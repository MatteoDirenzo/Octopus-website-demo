import type { Metadata } from "next";
import type { ImageAsset, PageMetadata } from "@/types";

export type ToMetadataOptions = Partial<PageMetadata> & {
  /** Site-relative path of the page. Becomes the canonical URL and `og:url`. */
  path?: string;
  /** Open Graph and Twitter image. */
  image?: ImageAsset;
  /** Keeps thin pages out of search results. */
  noIndex?: boolean;
};

/**
 * Title, description, Open Graph, Twitter card, canonical URL and robots.
 * Paths stay relative. The root layout's `metadataBase` makes them absolute.
 */
export function toMetadata({
  title,
  description,
  path,
  image,
  noIndex,
}: ToMetadataOptions = {}): Metadata {
  return {
    title,
    description,
    ...(path ? { alternates: { canonical: path } } : {}),
    ...(noIndex ? { robots: { index: false } } : {}),
    openGraph: {
      title,
      description,
      type: "website",
      ...(path ? { url: path } : {}),
      ...(image
        ? {
            images: [
              {
                url: image.src,
                width: image.width,
                height: image.height,
                alt: image.alt,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image ? { images: [{ url: image.src, alt: image.alt }] } : {}),
    },
  };
}

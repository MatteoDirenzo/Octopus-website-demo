import type { Metadata } from "next";
import type { PageMetadata } from "@/types";

/**
 * Title, description, and the matching Open Graph tags.
 * No absolute URL or `metadataBase` until the deploy URL exists.
 */
export function toMetadata({
  title,
  description,
}: Partial<PageMetadata> = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
    },
  };
}

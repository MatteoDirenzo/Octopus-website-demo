import type { Metadata } from "next";
import { toMetadata } from "@/helpers/metadata";
import { getSite } from "@/lib/api";
import type { PageMetadata } from "@/types";

type MetadataRoute = {
  /** Site-relative path. Omit on pages without a canonical URL, such as the 404. */
  path?: string;
  /** Marks a thin page as `noindex`. */
  noIndex?: boolean;
};

/**
 * Page metadata with the site share image.
 * Next replaces the layout's `openGraph` and `twitter` objects on every page,
 * so each page has to repeat the image.
 */
export async function loadMetadata(
  page: Partial<PageMetadata>,
  { path, noIndex }: MetadataRoute = {},
): Promise<Metadata> {
  const site = await getSite();

  return toMetadata({ ...page, path, noIndex, image: site.shareImage });
}

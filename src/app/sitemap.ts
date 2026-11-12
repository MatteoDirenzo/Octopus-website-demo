import type { MetadataRoute } from "next";
import { ROUTES } from "@/config/routes";
import { SITE_URL } from "@/config/site";
import { productHref } from "@/helpers/routes";
import { getProducts } from "@/lib/api";

/**
 * Indexable pages only: the home and products with `detail`.
 * Placeholder pages and products without `detail` are `noindex`, so they are left out.
 * The sitemap does not read `metadataBase`, so URLs are built from `SITE_URL`.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts();
  const paths = [
    ROUTES.home,
    ...products
      .filter((product) => product.detail)
      .map((product) => productHref(product.slug)),
  ];

  return paths.map((path) => ({ url: new URL(path, SITE_URL).href }));
}

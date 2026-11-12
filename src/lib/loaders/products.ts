import { notFound } from "next/navigation";
import { missingProductFieldError, unknownProductError } from "@/helpers/errors";
import { getProductBySlug } from "@/lib/api";
import type { Product } from "@/types";

/**
 * Product for this slug.
 * An unknown slug renders the not-found page.
 * A product without `detail` is still returned. The route shows its name.
 */
export async function loadProduct(slug: string): Promise<Product> {
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return product;
}

/**
 * Product listed by a page block. An unknown slug is a content error, so it
 * throws instead of rendering the not-found page.
 */
export async function requireProduct(slug: string): Promise<Product> {
  const product = await getProductBySlug(slug);

  if (!product) {
    throw unknownProductError(slug);
  }

  return product;
}

/** Block product that must have a `featuredImage`, narrowed to include it. */
export async function requireFeatured(slug: string) {
  const product = await requireProduct(slug);
  const featuredImage = product.featuredImage;

  if (!featuredImage) {
    throw missingProductFieldError(product.slug, "featuredImage");
  }

  return { ...product, featuredImage };
}

/** `detail` of the loaded product. A product-page block needs both. */
export function requireDetail(product: Product | undefined, component: string) {
  if (!product) {
    throw new Error(`Section ${component} requires a product`);
  }

  const detail = product.detail;

  if (!detail) {
    throw missingProductFieldError(product.slug, "detail");
  }

  return detail;
}

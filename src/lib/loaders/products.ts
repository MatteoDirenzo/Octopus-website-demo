import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/api";
import type { ProductDetail } from "@/types/content";

/**
 * Product for this slug.
 * An unknown slug, or a product with no detail page, renders the not-found page.
 */
export async function loadProduct(slug: string) {
  const product = await getProductBySlug(slug);
  const detail: ProductDetail | undefined = product?.detail;

  if (!product || !detail) {
    notFound();
  }

  return { ...product, detail };
}

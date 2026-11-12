import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/api";
import type { Product } from "@/types/content";

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

import productsData from "../../data/products.json";
import type { CategoryId, Product } from "../../types/content";
import { readContent } from "./shared";

/** Every product, in file order. */
export async function getProducts(): Promise<Product[]> {
  return readContent<Product[]>(productsData);
}

/**
 * The product with this slug, or null when the slug is missing.
 * A product without `detail` is still returned. Only products with `detail` have a Product Detail Page.
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find((product) => product.slug === slug) ?? null;
}

/**
 * Products for these slugs, in the given order.
 * A missing slug throws. The list is not filtered and is not reordered.
 */
export async function getProductsBySlugs(slugs: readonly string[]): Promise<Product[]> {
  const products = await getProducts();

  return slugs.map((slug) => {
    const product = products.find((item) => item.slug === slug);

    if (!product) {
      throw new Error(`Unknown product slug: ${slug}`);
    }

    return product;
  });
}

/** Products with `bestSeller: true`, in file order. */
export async function getBestSellers(): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((product) => product.bestSeller);
}

/** Products in this category, in file order. This list is not capped. */
export async function getProductsByCategory(
  category: CategoryId,
): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((product) => product.category === category);
}

/**
 * Feature card plus the other products.
 * The feature card is the first `featured` product, otherwise the first product.
 * When `limit` is set, the result keeps that feature card and at most `limit - 1` others.
 */
export function splitCategoryProducts(
  products: Product[],
  limit?: number,
): { feature: Product | null; cards: Product[] } {
  const featured = products.find((product) => product.featured === true);
  const feature = featured ?? products[0] ?? null;

  if (!feature) {
    return { feature: null, cards: [] };
  }

  const cards = products.filter((product) => product !== feature);
  const visibleCards =
    limit === undefined ? cards : cards.slice(0, Math.max(limit - 1, 0));

  return { feature, cards: visibleCards };
}

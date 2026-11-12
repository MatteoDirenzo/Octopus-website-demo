import productsData from "../../data/products.json";
import { unknownProductError } from "@/helpers/errors";
import type { CategoryId, Product } from "@/types";
import { readContent } from "./shared";

/** Every product, in file order. */
export async function getProducts(): Promise<Product[]> {
  return readContent<Product[]>(productsData);
}

/**
 * The product with this slug, or null when the slug is missing.
 * A product without `detail` is still returned. The route shows its name until `detail` exists.
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
      throw unknownProductError(slug);
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


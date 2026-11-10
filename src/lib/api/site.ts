import categoriesData from "../../data/categories.json";
import siteData from "../../data/site.json";
import type { Category, Site } from "../../types/content";
import { readContent } from "./shared";

/** Default metadata, Where to buy, store banner, and footer. */
export async function getSite(): Promise<Site> {
  return readContent<Site>(siteData);
}

/** Categories in file order. Navigation is built from this list. */
export async function getCategories(): Promise<Category[]> {
  return readContent<Category[]>(categoriesData);
}

/** The category with this id, or null when the id is missing. */
export async function getCategory(id: string): Promise<Category | null> {
  const categories = await getCategories();
  return categories.find((category) => category.id === id) ?? null;
}

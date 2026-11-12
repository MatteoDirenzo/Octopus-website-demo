import { ROUTES } from "@/config/routes";

/** Detail page for a product slug. */
export function productHref(slug: string) {
  return `${ROUTES.product}/${slug}`;
}

/** Category page for a category id. */
export function categoryHref(id: string) {
  return `${ROUTES.category}/${id}`;
}

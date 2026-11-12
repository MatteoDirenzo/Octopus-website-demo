/** A page block lists a slug that is not in `products.json`. */
export function unknownProductError(slug: string) {
  return new Error(`Unknown product slug: ${slug}`);
}

/** A product is missing data a block needs, for example `heroImage`. */
export function missingProductFieldError(slug: string, field: string) {
  return new Error(`Product ${slug} is missing ${field}`);
}

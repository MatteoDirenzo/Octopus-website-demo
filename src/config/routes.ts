/** Static page paths, and prefixes for pages built from a slug. */
export const ROUTES = {
  home: "/",
  whereToBuy: "/where-to-buy",
  contactUs: "/contact-us",
  policies: "/policies",
  product: "/product",
  category: "/category",
} as const;

/** Id of each page's `main`. The skip link targets it. */
export const MAIN_CONTENT_ID = "main-content";

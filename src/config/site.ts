/** Used when `NEXT_PUBLIC_SITE_URL` is unset or blank, as in local development. */
export const DEFAULT_SITE_URL = "http://localhost:3000";

/**
 * Origin of the deployed site, without a trailing slash. Set
 * `NEXT_PUBLIC_SITE_URL` on Vercel. It feeds `metadataBase`, the sitemap and robots.txt.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || DEFAULT_SITE_URL
).replace(/\/+$/, "");

import type { MetadataRoute } from "next";
import { SITE_URL } from "@/config/site";

/**
 * Every page stays crawlable. Placeholder pages opt out with a `noindex` meta tag,
 * which crawlers only see if robots.txt lets them fetch the page.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: new URL("/sitemap.xml", SITE_URL).href,
  };
}

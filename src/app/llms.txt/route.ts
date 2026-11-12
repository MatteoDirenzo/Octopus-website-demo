import { SITE_URL } from "@/config/site";
import { toLlmsTxt } from "@/helpers/llms";
import { getCategories, getProducts, getSite } from "@/lib/api";

/* Route handlers are dynamic by default. The data is static, so build the file once. */
export const dynamic = "force-static";

/** Plain-text site summary for language models, built from the same data as the pages. */
export async function GET() {
  const [site, categories, products] = await Promise.all([
    getSite(),
    getCategories(),
    getProducts(),
  ]);

  return new Response(toLlmsTxt({ site, categories, products, siteUrl: SITE_URL }), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

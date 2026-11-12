import { productHref } from "@/helpers/routes";
import type { Category, Product, Site } from "@/types";

export type LlmsTxtOptions = {
  site: Pick<Site, "name" | "metadata" | "llms" | "header">;
  categories: Pick<Category, "title" | "tagline" | "href">[];
  /** Products in file order. Only those with `detail` are listed. */
  products: Pick<Product, "name" | "slug" | "shortDescription" | "detail">[];
  siteUrl: string;
};

/**
 * `/llms.txt` in the llmstxt.org format: an `h1` with the site name, a
 * blockquote summary, then `h2` sections of absolute links with a short note.
 * Every line comes from the data, so it stays in step with the pages.
 */
export function toLlmsTxt({ site, categories, products, siteUrl }: LlmsTxtOptions) {
  const link = (label: string, path: string, note?: string) =>
    `- [${label}](${new URL(path, siteUrl).href})${note ? `: ${note}` : ""}`;

  return [
    `# ${site.name}`,
    "",
    `> ${site.metadata.description}`,
    "",
    `## ${site.llms.pagesTitle}`,
    "",
    link(site.header.home.label, site.header.home.href, site.metadata.title),
    "",
    `## ${site.llms.categoriesTitle}`,
    "",
    ...categories.map((category) => link(category.title, category.href, category.tagline)),
    "",
    `## ${site.llms.productsTitle}`,
    "",
    ...products
      .filter((product) => product.detail)
      .map((product) =>
        link(product.name, productHref(product.slug), product.shortDescription),
      ),
    "",
  ].join("\n");
}

import { ROUTES } from "@/config/routes";
import { productHref } from "@/helpers/routes";
import type {
  Category,
  JsonLdData,
  Product,
  ProductDetail,
  ProductJsonLd,
  Site,
  SiteJsonLd,
} from "@/types";

/**
 * JSON for an inline `<script type="application/ld+json">`.
 * `JSON.stringify` leaves `<` as is, so a value containing `</script>` would end
 * the tag early and let the rest run as HTML. `\u003c` is the same character to a
 * JSON parser but cannot close a tag. U+2028 and U+2029 are escaped too, because
 * older JavaScript parsers treat them as line breaks inside a string.
 */
export function serializeJsonLd(data: JsonLdData): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

/** Organization and WebSite for the home page, from `site.json`. */
export function siteJsonLd(
  site: Pick<Site, "name" | "metadata">,
  siteUrl: string,
): SiteJsonLd {
  const url = new URL(ROUTES.home, siteUrl).href;
  const organizationId = `${url}#organization`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: site.name,
        url,
        description: site.metadata.description,
      },
      {
        "@type": "WebSite",
        "@id": `${url}#website`,
        name: site.name,
        url,
        publisher: { "@id": organizationId },
      },
    ],
  };
}

export type ProductJsonLdOptions = {
  product: Pick<Product, "name" | "slug">;
  /** Same `detail` the page renders, so name and description match the visible copy. */
  detail: Pick<ProductDetail, "description" | "mainImage">;
  /** Omit when the category id has no entry. */
  category?: Pick<Category, "title">;
  /** Brand name, `site.name`. */
  brand: string;
  siteUrl: string;
};

/** Product for a detail page. Only facts in `products.json`: no price, rating or stock. */
export function productJsonLd({
  product,
  detail,
  category,
  brand,
  siteUrl,
}: ProductJsonLdOptions): ProductJsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: detail.description,
    image: new URL(detail.mainImage.src, siteUrl).href,
    url: new URL(productHref(product.slug), siteUrl).href,
    ...(category ? { category: category.title } : {}),
    brand: { "@type": "Brand", name: brand },
  };
}

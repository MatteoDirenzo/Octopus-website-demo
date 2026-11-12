/** schema.org `Organization`, the company behind the site. */
export type OrganizationJsonLd = {
  "@type": "Organization";
  /** Node id, so other nodes can reference it. */
  "@id": string;
  name: string;
  /** Absolute URL. */
  url: string;
  description: string;
};

/** schema.org `WebSite`. `publisher` references the organisation by `@id`. */
export type WebSiteJsonLd = {
  "@type": "WebSite";
  "@id": string;
  name: string;
  /** Absolute URL. */
  url: string;
  publisher: { "@id": string };
};

/**
 * schema.org `Product` with only the facts in `products.json`.
 * There is no price, rating or availability in the data, so there is no `offers` or `aggregateRating`.
 */
export type ProductJsonLd = {
  "@context": "https://schema.org";
  "@type": "Product";
  name: string;
  description: string;
  /** Absolute image URL. */
  image: string;
  /** Absolute page URL. */
  url: string;
  /** Category title. Omitted when the category is unknown. */
  category?: string;
  brand: { "@type": "Brand"; name: string };
};

/** Organization and WebSite in one `@graph`. */
export type SiteJsonLd = {
  "@context": "https://schema.org";
  "@graph": [OrganizationJsonLd, WebSiteJsonLd];
};

/** Payload of a `<script type="application/ld+json">`. */
export type JsonLdData = SiteJsonLd | ProductJsonLd;

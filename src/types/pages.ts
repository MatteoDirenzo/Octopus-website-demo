import type { Section } from "./sections";

/** Document title and meta description. */
export type PageMetadata = {
  /** Document title. */
  title: string;
  /** Meta description. */
  description: string;
};

/** Visible heading of a simple page. */
export type PageHeading = {
  /** Visible heading. */
  title: string;
  /** Line under the title. Omit when the page has none. */
  subtitle?: string;
};

/** A page file. */
export type PageConfig = {
  /** Page title and description. Omit when the page takes them from a product. */
  metadata?: PageMetadata;
  /** Rendered in this order. Reordering or removing an entry changes the page. */
  sections: Section[];
};

/** Where to buy page. The nav label stays on `site.header.whereToBuy`. */
export type WhereToBuyPage = {
  /** Document title and description. */
  metadata: PageMetadata;
  /** Heading rendered on the page. */
  heading: PageHeading;
};

/** Contact page. Same shape as Where to buy. The nav label stays in `site.json`. */
export type ContactPage = WhereToBuyPage;

/** Not-found page. The body is the heading only. */
export type NotFoundPage = WhereToBuyPage;

/** Policies page. The body is blank. The nav label stays in `site.json`. */
export type PoliciesPage = {
  /** Document title and description. */
  metadata: PageMetadata;
  heading: PageHeading;
};

import type { CarouselLabels } from "./carousel";
import type { PageMetadata } from "./pages";
import type { Cta } from "./ui";

/** Column count of a footer link group from tablet up. Mobile is always one column. */
export const FOOTER_COLUMNS = [1, 2] as const;

/** One of `FOOTER_COLUMNS`. */
export type FooterColumns = (typeof FOOTER_COLUMNS)[number];

/** A titled group of footer links. */
export type FooterGroup = {
  /** Group heading. */
  title: string;
  /** Columns from tablet up. Mobile stays one column. */
  columns: FooterColumns;
  /** Links, in display order. */
  links: Cta[];
};

/** Site-wide copy. The header and footer are rendered from this. */
export type Site = {
  /** Default title and description. */
  metadata: PageMetadata;
  /** Header chrome, category links, and Where to buy. */
  header: {
    /** Accessible name of the navigation. */
    label: string;
    /** Logo link. */
    home: Cta;
    /** Accessible name of the closed menu toggle. */
    openMenuLabel: string;
    /** Accessible name of the open menu toggle. */
    closeMenuLabel: string;
    /** Category links, in display order. */
    links: Cta[];
    /** Label and destination of the Where to buy control. */
    whereToBuy: Cta;
  };
  /** Copy for the `storeBanner` section. */
  storeBanner: {
    /** Banner heading. */
    title: string;
    /** Banner body. */
    text: string;
  };
  /** Shared product link used by the hero and the best-seller cards. */
  learnMore: {
    /** Visible label of the link. */
    label: string;
  };
  /** Shared category link used by the feature-top heading. */
  exploreAll: {
    /** Visible label of the link. */
    label: string;
  };
  /** Accessible names of the carousel controls. */
  carousel: CarouselLabels;
  /** Name of the product colour picker, also shown before the selected colour. */
  colourLabel: string;
  /** Footer chrome, link groups, and legal line. */
  footer: {
    /** Accessible name of the footer. */
    label: string;
    /** Logo link. */
    home: Cta;
    /** Link groups, in display order. */
    groups: FooterGroup[];
    /** Copyright line. */
    copyright: string;
    /** Policies link. */
    policies: Cta;
  };
};

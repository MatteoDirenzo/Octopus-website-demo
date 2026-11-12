/** Allowed category ids. */
export const CATEGORIES = [
  "kitchen",
  "home-security",
  "hair-care",
  "accessories",
] as const;

/** Id of a category in `categories.json`. */
export type CategoryId = (typeof CATEGORIES)[number];

/** Showcase layouts. `banner` renders no section header. `row` is small cards only. The feature layouts share one product selection. */
export const SHOWCASE_LAYOUTS = [
  "feature-top",
  "feature-left",
  "row",
  "banner",
] as const;

/** One of `SHOWCASE_LAYOUTS`. */
export type ShowcaseLayout = (typeof SHOWCASE_LAYOUTS)[number];

/** Width of a gallery item in the two-column gallery. */
export const GALLERY_SPANS = ["full", "half"] as const;

/** One of `GALLERY_SPANS`. */
export type GallerySpan = (typeof GALLERY_SPANS)[number];

/** Tone of text placed on a gallery image. */
export const TEXT_TONES = ["light", "dark"] as const;

/** One of `TEXT_TONES`. */
export type TextTone = (typeof TEXT_TONES)[number];

/** MIME types allowed on a hero video source. */
export const VIDEO_TYPES = ["video/mp4", "video/webm"] as const;

/** One of `VIDEO_TYPES`. */
export type VideoType = (typeof VIDEO_TYPES)[number];

/**
 * Section discriminants.
 * Kept equal to `Section["type"]` so a new section fails the build until both lists include it.
 */
export const SECTION_TYPES = [
  "hero",
  "bestSellers",
  "categoryShowcase",
  "exploreCategories",
  "storeBanner",
  "productShowcase",
  "specAccordion",
] as const;

/**
 * Image file plus the space it reserves.
 * `alt` is required, and `width` and `height` are provisional stand-ins until the exported asset's ratio replaces them.
 */
export type ImageAsset = {
  /** Path or URL of the image file. */
  src: string;
  /** Accessible description. An empty alt is invalid. */
  alt: string;
  /** Provisional pixel width. */
  width: number;
  /** Provisional pixel height. */
  height: number;
};

/** One playable file in a `VideoAsset`. */
export type VideoSource = {
  /** Path or URL of the video file. */
  src: string;
  /** A value from `VIDEO_TYPES`. */
  type: VideoType;
};

/** Hero video: one or more sources plus a poster image. */
export type VideoAsset = {
  /** Playable files. Each `type` is a value from `VIDEO_TYPES`. */
  sources: VideoSource[];
  /** Image shown before the video plays. */
  poster: ImageAsset;
};

/**
 * A shop category.
 * `tileImage` is a square 800 by 800 placeholder until the exported tile replaces it.
 */
export type Category = {
  /** Value from `CATEGORIES`. */
  id: CategoryId;
  /** Heading shown for the category. */
  title: string;
  /** Short line under the title. */
  tagline: string;
  /** Square tile, 800 by 800 in the placeholder data. */
  tileImage: ImageAsset;
  /** Destination of the category link. */
  href: string;
};

/** A product colour. `hex` is `#` plus six hex digits. */
export type Colour = {
  /** Unique id within the product. */
  id: string;
  /** Name shown next to the swatch. */
  label: string;
  /** `#RRGGBB`. */
  hex: string;
};

/** One cell in a product gallery. */
export type GalleryItem = {
  /** Image for this cell. */
  image: ImageAsset;
  /** `full` spans both columns. `half` spans one. */
  span: GallerySpan;
  /** Caption heading. Omit on an image-only cell. */
  title?: string;
  /** Caption body. Omit on an image-only cell. */
  description?: string;
  /** Caption tone. Omit on an image-only cell. */
  textTone?: TextTone;
};

/** A group of specification lines. */
export type SpecGroup = {
  /** Unique id within the product. */
  id: string;
  /** Heading of the group. */
  title: string;
  /** Lines shown in the group. */
  items: string[];
};

/** A downloadable file link. */
export type Download = {
  /** Link text. */
  label: string;
  /** Destination of the download. */
  href: string;
};

/** Detail-page content. Only a product with `detail` has a Product Detail Page. */
export type ProductDetail = {
  /** Long description. */
  description: string;
  /** Swatches. Colour ids are unique within the product. */
  colours: Colour[];
  /** Primary image on the detail page. */
  mainImage: ImageAsset;
  /** Gallery cells, in display order. */
  gallery: GalleryItem[];
  /** Specification groups. */
  specs: SpecGroup[];
  /** Download links. */
  downloads: Download[];
};

/** A catalogue product. Adding one to `products.json` places it in its category. */
export type Product = {
  /** Unique id. */
  id: string;
  /** Unique URL slug. */
  slug: string;
  /** Display name. */
  name: string;
  /** Category this product belongs to. */
  category: CategoryId;
  /** Line used on cards. */
  shortDescription: string;
  /** Cutout used by small cards and the carousel. Provisional size 800 by 800. */
  image: ImageAsset;
  /**
   * Lifestyle image for feature cards and banners.
   * Required when `featured` is true, and required on the product a `banner` showcase features.
   * Provisional size 1600 by 1200.
   */
  featureImage?: ImageAsset;
  /** When true, the product is included in Best sellers, in file order. */
  bestSeller: boolean;
  /** When true, this product is preferred as its category's feature card. Omit when it is not featured. */
  featured?: boolean;
  /** Present only when the product has a Product Detail Page. */
  detail?: ProductDetail;
};

/** Document title and meta description. */
export type PageMetadata = {
  /** Document title. */
  title: string;
  /** Meta description. */
  description: string;
};

/** Home hero. `title` is the accessible name stored for the video. */
export type HeroSection = {
  /** Section discriminant. */
  type: "hero";
  /** Accessible name of the hero video. */
  title: string;
  /** Hero video and poster. */
  video: VideoAsset;
  /** Optional product linked from the hero. Must exist in `products.json` when set. */
  productSlug?: string;
};

/** Best sellers block. Membership comes from `product.bestSeller`, not from this section. */
export type BestSellersSection = {
  /** Section discriminant. */
  type: "bestSellers";
  /** Section heading. */
  title: string;
};

/** A category block. Products are loaded from that category, not copied into the section. */
export type CategoryShowcaseSection = {
  /** Section discriminant. */
  type: "categoryShowcase";
  /** Category whose products fill the block. */
  category: CategoryId;
  /** Presentation. `row` is small cards only. The feature layouts share one selection. */
  layout: ShowcaseLayout;
  /**
   * Maximum products in the block.
   * On a feature layout this includes the feature card: that card stays, and at most `limit - 1` others follow.
   * On `row` it is the number of small cards. Omit for no cap.
   */
  limit?: number;
};

/** Block that links to every category. */
export type ExploreCategoriesSection = {
  /** Section discriminant. */
  type: "exploreCategories";
  /** Section heading. */
  title: string;
};

/** Find-us block. Its copy comes from `site.storeBanner`. */
export type StoreBannerSection = {
  /** Section discriminant. */
  type: "storeBanner";
};

/** Product detail media and buy panel. The page passes the loaded product. */
export type ProductShowcaseSection = {
  /** Section discriminant. */
  type: "productShowcase";
};

/** Product specification accordion. The page passes the loaded product. */
export type SpecAccordionSection = {
  /** Section discriminant. */
  type: "specAccordion";
};

/** One ordered block on a page. `type` selects the component. */
export type Section =
  | HeroSection
  | BestSellersSection
  | CategoryShowcaseSection
  | ExploreCategoriesSection
  | StoreBannerSection
  | ProductShowcaseSection
  | SpecAccordionSection;

type Equals<A, B> = [A] extends [B] ? ([B] extends [A] ? true : false) : false;

type AssertTrue<T extends true> = T;

type SectionTypesMatch = AssertTrue<
  Equals<Section["type"], (typeof SECTION_TYPES)[number]>
>;

/** Discriminant of `Section`. Stays equal to `(typeof SECTION_TYPES)[number]`. */
export type SectionType = SectionTypesMatch extends true
  ? Section["type"]
  : never;

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
  heading: {
    /** Visible heading. */
    title: string;
    /** Line under the title. Omit when the page has none. */
    subtitle?: string;
  };
};

/** Contact page. Same shape as Where to buy. The nav label stays in `site.json`. */
export type ContactPage = WhereToBuyPage;

/** Policies page. The body is blank. The nav label stays in `site.json`. */
export type PoliciesPage = {
  /** Document title and description. */
  metadata: PageMetadata;
  heading: {
    /** Visible heading. */
    title: string;
    /** Line under the title. Omit when the page has none. */
    subtitle?: string;
  };
};

/** A labelled destination used by the header and the footer. */
export type SiteLink = {
  /** Visible label. On the home control this is the accessible name. */
  label: string;
  /** Destination. */
  href: string;
};

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
  links: SiteLink[];
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
    home: SiteLink;
    /** Accessible name of the closed menu toggle. */
    openMenuLabel: string;
    /** Accessible name of the open menu toggle. */
    closeMenuLabel: string;
    /** Category links, in display order. */
    links: SiteLink[];
    /** Label and destination of the Where to buy control. */
    whereToBuy: SiteLink;
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
  /** Footer chrome, link groups, and legal line. */
  footer: {
    /** Accessible name of the footer. */
    label: string;
    /** Logo link. */
    home: SiteLink;
    /** Link groups, in display order. */
    groups: FooterGroup[];
    /** Copyright line. */
    copyright: string;
    /** Policies link. */
    policies: SiteLink;
  };
};

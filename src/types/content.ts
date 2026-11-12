import type { CardLargeVariant } from "@/components/CardLarge";
import type {
  CarouselEndOffset,
  CarouselInset,
  CarouselMode,
  CarouselPeek,
  CarouselVisible,
} from "@/components/Carousel";
import type { Variant } from "@/helpers/components/button";

/** Allowed category ids. */
export const CATEGORIES = [
  "kitchen",
  "home-security",
  "hair-care",
  "accessories",
] as const;

/** Id of a category in `categories.json`. */
export type CategoryId = (typeof CATEGORIES)[number];

/** Showcase layouts. `row` is small cards only. The feature layouts use `featureProductSlug`. */
export const SHOWCASE_LAYOUTS = ["feature-top", "feature-left", "row"] as const;

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

/** Carousel track modes. Stays equal to `CarouselMode`. */
export const CAROUSEL_MODES = ["contained", "overflow"] as const;

/** Card size chosen by a carousel block. `product` is a product card. */
export const CARD_TYPES = ["large", "medium", "small", "product"] as const;

/** One of `CARD_TYPES`. */
export type CardType = (typeof CARD_TYPES)[number];

/** Card orientation for large and medium carousel cards. Stays equal to `CardLargeVariant`. */
export const CARD_VARIANTS = ["horizontal", "vertical"] as const;

/** One of `CARD_VARIANTS`. */
export type CardVariant = (typeof CARD_VARIANTS)[number];

/** Button styles a banner can pass through. Stays equal to `Variant`. */
export const BUTTON_VARIANTS = ["primary", "secondary", "ghost"] as const;

/**
 * Block discriminants.
 * Kept equal to `Section["component"]` so a new block fails the build until both lists include it.
 */
export const SECTION_TYPES = [
  "hero",
  "carousel",
  "categoryShowcase",
  "banner",
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
 * `tileImage` is the square cutout shown on a category card.
 */
export type Category = {
  /** Value from `CATEGORIES`. */
  id: CategoryId;
  /** Heading shown for the category. */
  title: string;
  /** Short line under the title. */
  tagline: string;
  /** Square category tile. */
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
  /** Heading of the download row. */
  downloadsTitle: string;
  /** Download links. The detail page shows the first file. */
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
  /** Cutout used by `productSlugs`. Provisional size 800 by 800. */
  image: ImageAsset;
  /**
   * Lifestyle image for a `featureProductSlug`.
   * Required on that product. Provisional size 1600 by 1200.
   */
  featuredImage?: ImageAsset;
  /**
   * Two-crop still for a hero block that links this product.
   * `mobile` is 1080 by 1920. `desktop` is 1920 by 1080.
   */
  heroImage?: HeroImage;
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

/**
 * Screen-height hero still.
 * `mobile` is the 9:16 crop and is also used at the tablet breakpoint.
 * `desktop` is the 16:9 crop and is used from the desktop breakpoint.
 */
export type HeroImage = {
  /** Portrait crop, 1080 by 1920. Shown below the desktop breakpoint. */
  mobile: ImageAsset;
  /** Landscape crop, 1920 by 1080. Shown from the desktop breakpoint. */
  desktop: ImageAsset;
};

/**
 * Page padding for one block, in spacing-scale steps.
 * `20` is the same step as `pt-20`. A missing breakpoint copies the smaller one.
 * A missing side is `0`.
 */
export type BlockSpacing = {
  /** Steps below 810. */
  mobile?: BlockSpacingSide;
  /** Steps from 810. Omitted sides copy `mobile`. */
  tablet?: BlockSpacingSide;
  /** Steps from 1200. Omitted sides copy `tablet`. */
  desktop?: BlockSpacingSide;
};

/** One breakpoint of `BlockSpacing`. Omitted sides are `0`. */
export type BlockSpacingSide = {
  /** Top step. */
  top?: number;
  /** Right step. */
  right?: number;
  /** Bottom step. */
  bottom?: number;
  /** Left step. */
  left?: number;
};

/** Home hero. The still is `product.heroImage`. Copy and the link are on the block. */
export type HeroBlock = {
  /** Block discriminant. */
  component: "hero";
  /** Heading. */
  title: string;
  /** Line under the title. Omit when the hero has none. */
  subtitle?: string;
  /** Destination of the learn-more link. Omit when the hero has no link. */
  href?: string;
  /** Product whose `heroImage` fills the frame. */
  productSlug: string;
  /** Page padding. Omit for a full-bleed frame. */
  spacing?: BlockSpacing;
};

/**
 * A carousel of product cards.
 * `productSlugs` use the cutout. `featureProductSlug` uses `featuredImage` and is shown first.
 */
export type CarouselBlock = {
  /** Block discriminant. */
  component: "carousel";
  /** Section heading. */
  title: string;
  /** Card size. Omit for large cards. `product` renders a product card. */
  cardType?: CardType;
  /** Orientation of a large or medium card. Omit for horizontal. Ignored for small and product cards. */
  cardVariant?: CardVariantName;
  /** `contained` or `overflow`. Omit for the carousel default. */
  mode?: CarouselModeName;
  /** Full cards in view at each breakpoint. */
  visible?: CarouselVisible;
  /** Overflow end inset, in spacing steps. */
  endOffset?: CarouselEndOffset;
  /** How much of the next card stays in view, as a percentage. */
  peek?: CarouselPeek;
  /** Overflow start inset, in spacing steps. */
  inset?: CarouselInset;
  /** Position dots. Omit to show only the arrows. */
  showDots?: boolean;
  /** Products rendered with the cutout, in this order. */
  productSlugs: string[];
  /** Product rendered first with `featuredImage`. Omit when every card is a cutout. */
  featureProductSlug?: string;
  /** Page padding. */
  spacing?: BlockSpacing;
};

/**
 * Category block.
 * `feature-top` and `feature-left` use `featureProductSlug` as the feature card.
 * `row` renders `productSlugs` as small cards and omits the feature slug.
 */
export type CategoryShowcaseBlock = {
  /** Block discriminant. */
  component: "categoryShowcase";
  /** Heading. */
  title: string;
  /** Line under the title. Omit when the block has none. */
  subtitle?: string;
  /** Destination of the explore link. The label stays `site.exploreAll`. */
  href: string;
  /** Presentation. */
  layout: ShowcaseLayout;
  /** Feature card. Uses `featuredImage`. Omit on `row`. */
  featureProductSlug?: string;
  /** Other cards, or every card on `row`. Each uses the cutout. */
  productSlugs: string[];
  /** Page padding. */
  spacing?: BlockSpacing;
};

/** Shared banner options. */
type BannerBlockBase = {
  /** Block discriminant. */
  component: "banner";
  /** Set only when this banner is the page hero. */
  priority?: boolean;
  /** Page padding. Omit when the banner is full bleed. */
  spacing?: BlockSpacing;
};

/**
 * Copy promo.
 * The picture, heading, and link are on the block.
 * The link label stays `site.learnMore`.
 */
export type CopyBannerBlock = BannerBlockBase & {
  /** Heading. */
  title: string;
  /** Line under the title. */
  subtitle: string;
  /** Destination of the learn-more link. The label stays `site.learnMore`. */
  href: string;
  /**
   * Picture for the frame.
   * `src` has no breakpoint suffix.
   */
  images: BannerImages;
  /** Button style. Omit for primary. */
  variant?: ButtonVariantName;
};

/**
 * One banner picture exported three times.
 * `src` has no breakpoint suffix. The files add `-desktop`, `-mobile`, and `-tablet` before the extension.
 */
export type BannerImages = {
  /** Path without a breakpoint suffix. */
  src: string;
  /** Accessible description shared by every crop. */
  alt: string;
  /** Pixel size of the desktop file. */
  desktop: BannerImageSize;
  /** Pixel size of the mobile file. */
  mobile: BannerImageSize;
  /** Pixel size of the tablet file. */
  tablet: BannerImageSize;
};

/** Pixel size of one banner crop. The path comes from `BannerImages.src`. */
export type BannerImageSize = {
  /** Pixel width of this crop. */
  width: number;
  /** Pixel height of this crop. */
  height: number;
};

/** Action on an image banner. The label is on the block, not `site.learnMore`. */
export type BannerButton = {
  /** Visible label. */
  label: string;
  /** Destination. */
  href: string;
  /** Button style. Omit for primary. */
  variant?: ButtonVariantName;
};

/**
 * Promo with its own crops.
 * No product. Omit `title` and `subtitle` to show only the button.
 */
export type ImageBannerBlock = BannerBlockBase & {
  /** Mobile, tablet, and desktop crops. */
  images: BannerImages;
  /** Action. Its label and destination are on the block. */
  button: BannerButton;
  /** Heading. Omit when the frame has only a button. */
  title?: string;
  /** Line under the title. Omit when the frame has only a button. */
  subtitle?: string;
};

/** Full-width promo. A product banner or an image banner. */
export type BannerBlock = CopyBannerBlock | ImageBannerBlock;

/** Block that links to every category. */
export type ExploreCategoriesBlock = {
  /** Block discriminant. */
  component: "exploreCategories";
  /** Section heading. */
  title: string;
  /** Page padding. */
  spacing?: BlockSpacing;
};

/** Find-us block. Its copy comes from `site.storeBanner`. */
export type StoreBannerBlock = {
  /** Block discriminant. */
  component: "storeBanner";
  /** Page padding. */
  spacing?: BlockSpacing;
};

/** Product detail media and buy panel. The page passes the loaded product. */
export type ProductShowcaseBlock = {
  /** Block discriminant. */
  component: "productShowcase";
  /** Page padding. */
  spacing?: BlockSpacing;
};

/** Product specification accordion. The page passes the loaded product. */
export type SpecAccordionBlock = {
  /** Block discriminant. */
  component: "specAccordion";
  /** Page padding. */
  spacing?: BlockSpacing;
};

/** One ordered block on a page. `component` selects what is rendered. */
export type Section =
  | HeroBlock
  | CarouselBlock
  | CategoryShowcaseBlock
  | BannerBlock
  | ExploreCategoriesBlock
  | StoreBannerBlock
  | ProductShowcaseBlock
  | SpecAccordionBlock;

type Equals<A, B> = [A] extends [B] ? ([B] extends [A] ? true : false) : false;

type AssertTrue<T extends true> = T;

type SectionTypesMatch = AssertTrue<
  Equals<Section["component"], (typeof SECTION_TYPES)[number]>
>;

type CarouselModesMatch = AssertTrue<
  Equals<CarouselMode, (typeof CAROUSEL_MODES)[number]>
>;

type CardVariantsMatch = AssertTrue<
  Equals<CardLargeVariant, (typeof CARD_VARIANTS)[number]>
>;

type ButtonVariantsMatch = AssertTrue<
  Equals<Variant, (typeof BUTTON_VARIANTS)[number]>
>;

/** Discriminant of `Section`. Stays equal to `(typeof SECTION_TYPES)[number]`. */
export type SectionType = SectionTypesMatch extends true
  ? Section["component"]
  : never;

/** One of `CAROUSEL_MODES`. Stays equal to `CarouselMode`. */
export type CarouselModeName = CarouselModesMatch extends true
  ? (typeof CAROUSEL_MODES)[number]
  : never;

/** One of `CARD_VARIANTS`. Stays equal to `CardLargeVariant`. */
export type CardVariantName = CardVariantsMatch extends true
  ? (typeof CARD_VARIANTS)[number]
  : never;

/** One of `BUTTON_VARIANTS`. Stays equal to `Variant`. */
export type ButtonVariantName = ButtonVariantsMatch extends true
  ? (typeof BUTTON_VARIANTS)[number]
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

/** Not-found page. The body is the heading only. */
export type NotFoundPage = WhereToBuyPage;

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

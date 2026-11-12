import type { BannerButton } from "./banner";
import type { CardType, CardVariant, ShowcaseLayout } from "./cards";
import type {
  CarouselEndOffset,
  CarouselInset,
  CarouselMode,
  CarouselPeek,
  CarouselVisible,
} from "./carousel";
import type { BlockSpacing } from "./layout";
import type { ResponsiveImage } from "./media";
import type { ButtonVariant } from "./ui";

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
  cardVariant?: CardVariant;
  /** `contained` or `overflow`. Omit for the carousel default. */
  mode?: CarouselMode;
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
  images: ResponsiveImage;
  /** Button style. Omit for primary. */
  variant?: ButtonVariant;
};

/**
 * Promo with its own crops.
 * No product. Omit `title` and `subtitle` to show only the button.
 */
export type ImageBannerBlock = BannerBlockBase & {
  /** Mobile, tablet, and desktop crops. */
  images: ResponsiveImage;
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

/** Discriminant of `Section`. Stays equal to `(typeof SECTION_TYPES)[number]`. */
export type SectionType = SectionTypesMatch extends true
  ? Section["component"]
  : never;

import type { CategoryId } from "./category";
import type { GalleryItem } from "./gallery";
import type { HeroImage, ImageAsset } from "./media";

/** A product colour. `hex` is `#` plus six hex digits. */
export type Colour = {
  /** Unique id within the product. */
  id: string;
  /** Name shown next to the swatch. */
  label: string;
  /** `#RRGGBB`. */
  hex: string;
};

/** One text option in a feature selector. */
export type FeatureOption = {
  id: string;
  /** Text shown on the chip. */
  label: string;
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

/** Body of a specs accordion group: a bullet list or a paragraph. */
export type SpecsBody =
  | { kind: "list"; items: string[] }
  | { kind: "text"; text: string };

/** One group in the specs accordion, as the component renders it. */
export type SpecsGroup = {
  id: string;
  title: string;
  body: SpecsBody;
};

/** The download row under the specs accordion. */
export type SpecsDownload = {
  /** Label on the left, for example "Downloads". */
  label: string;
  /** File name on the right. This is the link's accessible name. */
  fileLabel: string;
  /** Destination of the file. */
  href: string;
};

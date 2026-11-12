# Content data

JSON in this folder is the only source of page copy. Functions in `src/lib/api/` cast it to the types in `src/types/content.ts`. Import them from `@/lib/api`. Route loaders in `src/lib/loaders/` call those functions and do not read these files. Components never import these files.

`src/data/*.json` -> `src/lib/api/` (typed functions, import from `@/lib/api`) -> pages (a route loader in `src/lib/loaders/` when the route needs one) -> `sections/registry.ts` -> components

Text fields use `Placeholder` until real copy replaces the value. Exported images use a `/images/...` path. The home hero uses the 1080 by 1920 portrait poster below 1200 and the 1920 by 1080 landscape poster from 1200. `/images/placeholders` remains only where no file exists. Replace values only. Leave every key in place. `width` and `height` match the exported file.

## Files

| File | Contains |
| --- | --- |
| `README.md` | This document. |
| `site.json` | Default metadata, header, store banner copy, and footer. |
| `categories.json` | The four categories. |
| `products.json` | Every product, including detail-page content where `detail` is set. |
| `pages/home.json` | Home metadata and the ordered home sections. |
| `pages/product.json` | Ordered product-page sections. The product comes from the route slug. |
| `pages/where-to-buy.json` | Where to buy metadata and heading. The nav label stays in `site.json`. |
| `pages/contact-us.json` | Contact metadata and heading. The nav label stays in `site.json`. |
| `pages/policies.json` | Policies metadata. The page body is blank. The nav label stays in `site.json`. |

## Shared shapes

`ImageAsset`: `src`, `alt`, `width`, and `height` are all required. `alt` must be non-empty. `width` and `height` reserve space so the layout does not shift. They match the file when one is exported.

`VideoAsset`: `sources` is a list of `{ src, type }`. `type` is `video/mp4` or `video/webm`. `poster` is an `ImageAsset`.

`Colour.hex` matches `#` plus six hex digits.

## site.json

| Key | Meaning | Required |
| --- | --- | --- |
| `metadata` | Default title and description. | yes |
| `metadata.title` | Default document title. | yes |
| `metadata.description` | Default meta description. | yes |
| `header` | Header chrome and category links. | yes |
| `header.label` | Accessible name of the navigation. | yes |
| `header.home` | Logo link (`label`, `href`). | yes |
| `header.openMenuLabel` | Accessible name of the closed menu toggle. | yes |
| `header.closeMenuLabel` | Accessible name of the open menu toggle. | yes |
| `header.links` | Category links, in display order. Each item is `label` and `href`. | yes |
| `header.whereToBuy` | Where to buy control (`label`, `href`). | yes |
| `storeBanner` | Copy for the `storeBanner` section. | yes |
| `storeBanner.title` | Banner heading. | yes |
| `storeBanner.text` | Banner body. | yes |
| `learnMore` | Shared product link used by the hero and the best-seller cards. | yes |
| `learnMore.label` | Visible label of that link. | yes |
| `exploreAll` | Shared category link used by the feature-top heading. | yes |
| `exploreAll.label` | Visible label of that link. | yes |
| `footer` | Footer chrome, link groups, and legal line. | yes |
| `footer.label` | Accessible name of the footer. | yes |
| `footer.home` | Logo link (`label`, `href`). | yes |
| `footer.groups` | Link groups, in display order. | yes |
| `footer.groups[].title` | Group heading. | yes |
| `footer.groups[].columns` | Columns from tablet up. `1` or `2`. Mobile stays one column. | yes |
| `footer.groups[].links` | Links in that group, in display order. Each item is `label` and `href`. | yes |
| `footer.copyright` | Copyright line. | yes |
| `footer.policies` | Policies link (`label`, `href`). | yes |

## categories.json

Each entry is a category. `tileImage` is the exported category image.

| Key | Meaning | Required |
| --- | --- | --- |
| `id` | Value from `CATEGORIES`. | yes |
| `title` | Heading shown for the category. | yes |
| `tagline` | Short line under the title. | yes |
| `tileImage` | Square tile image (`ImageAsset`). | yes |
| `href` | Destination of the category link. | yes |

## products.json

Each entry is a product. File order is the order of Best sellers and of each category list.

| Key | Meaning | Required |
| --- | --- | --- |
| `id` | Unique id. | yes |
| `slug` | Unique URL slug. | yes |
| `name` | Display name. | yes |
| `category` | Value from `CATEGORIES`. | yes |
| `shortDescription` | Line used on cards. | yes |
| `image` | Cutout for small cards and the carousel (`ImageAsset`). | yes |
| `featureImage` | Lifestyle image for feature cards and banners (`ImageAsset`). Required when `featured` is true, and required on the product a `banner` showcase features. | no |
| `bestSeller` | When true, the product is included in Best sellers. | yes |
| `featured` | When true, this product is preferred as its category's feature card. Omit when it is not featured. | no |
| `detail` | Detail-page content. Present only when the product has a Product Detail Page. | no |
| `detail.description` | Long description. | yes, inside `detail` |
| `detail.colours` | Swatches. | yes, inside `detail` |
| `detail.colours[].id` | Unique id within the product. | yes |
| `detail.colours[].label` | Name shown next to the swatch. | yes |
| `detail.colours[].hex` | `#` plus six hex digits. | yes |
| `detail.mainImage` | Primary detail-page image (`ImageAsset`). | yes, inside `detail` |
| `detail.gallery` | Gallery cells, in display order. | yes, inside `detail` |
| `detail.gallery[].image` | Cell image (`ImageAsset`). | yes |
| `detail.gallery[].span` | `full` spans both columns. `half` spans one. | yes |
| `detail.gallery[].title` | Caption heading. Omit on an image-only cell. | no |
| `detail.gallery[].description` | Caption body. Omit on an image-only cell. | no |
| `detail.gallery[].textTone` | `light` or `dark`. Omit on an image-only cell. | no |
| `detail.specs` | Specification groups. | yes, inside `detail` |
| `detail.specs[].id` | Unique id within the product. | yes |
| `detail.specs[].title` | Heading of the group. | yes |
| `detail.specs[].items` | Lines shown in the group. | yes |
| `detail.downloads` | Download links. | yes, inside `detail` |
| `detail.downloads[].label` | Link text. | yes |
| `detail.downloads[].href` | Destination of the download. | yes |

## Page configs

A section page file is `{ metadata?, sections[] }`. `metadata` has `title` and `description`. Omit `metadata` when the page takes its title from a product (`pages/product.json` does). `sections` render in the listed order. Reordering or deleting a line changes the page.

`pages/where-to-buy.json` and `pages/contact-us.json` are `{ metadata, heading }`. They have no `sections`. `heading.title` is the page heading. `heading.subtitle` is optional and omitted until there is copy. The nav label stays in `site.json`.

`pages/policies.json` is `{ metadata }` only. The page body is blank. The nav label stays in `site.json`.

| `type` | Properties | Required on that section |
| --- | --- | --- |
| `hero` | `title` (accessible name when no product is linked), `image.mobile` and `image.desktop` (`ImageAsset`), `productSlug` | `title` and `image` required. `image.mobile` is the 1080 by 1920 portrait, also used at the tablet breakpoint. `image.desktop` is the 1920 by 1080 landscape, from 1200. `productSlug` optional; when set, the slug must exist. |
| `bestSellers` | `title` | `title` required. Membership comes from `bestSeller`, not from this section. |
| `categoryShowcase` | `category`, `layout`, `limit` | `category` and `layout` required. `limit` optional. On a feature layout, `limit` counts the feature card: the feature card plus at most `limit - 1` others. On `row`, `limit` is the number of small cards. |
| `exploreCategories` | `title` | `title` required. |
| `storeBanner` | none | Copy comes from `site.storeBanner`. |
| `productShowcase` | none | The page passes the loaded product. |
| `specAccordion` | none | The page passes the loaded product. |

## Allowed values

Defined once as `as const` arrays in `src/types/content.ts`. Derived types follow the arrays.

| Array | Values |
| --- | --- |
| `CATEGORIES` | `kitchen`, `home-security`, `hair-care`, `accessories` |
| `SHOWCASE_LAYOUTS` | `feature-top`, `feature-left`, `row`, `banner` |
| `GALLERY_SPANS` | `full`, `half` |
| `TEXT_TONES` | `light`, `dark` |
| `VIDEO_TYPES` | `video/mp4`, `video/webm` |
| `SECTION_TYPES` | `hero`, `bestSellers`, `categoryShowcase`, `exploreCategories`, `storeBanner`, `productShowcase`, `specAccordion` |
| `FOOTER_COLUMNS` | `1`, `2` |

Layouts:

- `feature-top`: heading, one horizontal large card for the feature product, then the other products as vertical medium cards. The heading uses the category title and tagline, and `site.exploreAll`. Cards use `product.image` and `site.learnMore`.
- `feature-left`: same heading and cards as `feature-top`. Below 1200 the stack matches `feature-top`. From 1200 the feature card is a vertical large card on the left, and the other products stack on the right as horizontal medium cards. The feature card matches the height of that stack.
- `row`: heading, then the category products as small cards. No feature card. Stacked below 810 and in one row from 810. The heading uses the category title and tagline, and `site.exploreAll`. Cards use `product.image` and `site.learnMore`. `limit` caps the row. Without `limit`, every product in the category is shown.
- `banner`: not rendered by the section yet. The layout stays in the page config. It is a full-width Banner with no section padding and no section header, using the feature product's name, `shortDescription`, and `featureImage`, and `site.learnMore`. The feature card's product must have `featureImage`.

## Selection rules

Best sellers are the products with `bestSeller: true`, in file order.

The category feature card is the first product with `featured: true`. Otherwise it is the first product in that category. The rest are the other products, in file order. `row` does not pick a feature card. It shows the category products in file order, capped by `limit` when set.

`splitCategoryProducts(products, limit?)` keeps that feature card plus at most `limit - 1` others. Without `limit`, the other products all wrap. `getProductsByCategory` stays uncapped.

Every product with `featured: true` has a `featureImage`. The product chosen as the feature card of a `banner` layout has a `featureImage`.

Only a product with `detail` has a Product Detail Page.

## Recipes

**Add a product.** Append an object to `products.json` with a unique `id` and `slug`, a `category`, an `image`, and `bestSeller`. It shows in that category. It shows in Best sellers only when `bestSeller` is true. The Kitchen showcase uses `limit: 3`, so a new Kitchen product stays out of that section until the limit is raised.

**Add a category.** Add the id to `CATEGORIES`, then add the category object and point products at that id. A `categoryShowcase` section can then use it.

**Add a section type.** Add the variant to the `Section` union and to `SECTION_TYPES`. Register a component before a page JSON uses the type.

**Add an allowed value.** Add it to the `as const` array first. The derived type follows. Update this README in the same change.

**Replace placeholders.** Replace string values and image or video `src` values, including provisional `width` and `height`. Leave the keys in place.

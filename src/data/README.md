# Content data

JSON in this folder is the only source of page copy. Loaders in `src/lib/api/` cast it to the types in `src/types/content.ts`. Import loaders from `@/lib/api`. Components never import these files.

`src/data/*.json` -> `src/lib/api/` (typed loaders, import from `@/lib/api`) -> pages -> `sections/registry.ts` -> components

Text fields use `Placeholder` until real copy replaces the value. Image `src` values use `/images/placeholders` until exported assets replace the value. Replace values only. Leave every key in place. Stored image sizes are provisional and change to the exported ratio later.

## Files

| File | Contains |
| --- | --- |
| `README.md` | This document. |
| `site.json` | Default metadata, Where to buy, store banner copy, and footer text. |
| `categories.json` | The four categories. Navigation links are built from this file. |
| `products.json` | Every product, including detail-page content where `detail` is set. |
| `pages/home.json` | Home metadata and the ordered home sections. |
| `pages/product.json` | Ordered product-page sections. The product comes from the route slug. |

## Shared shapes

`ImageAsset`: `src`, `alt`, `width`, and `height` are all required. `alt` must be non-empty. `width` and `height` reserve space so the layout does not shift. The numbers in the JSON are provisional.

`VideoAsset`: `sources` is a list of `{ src, type }`. `type` is `video/mp4` or `video/webm`. `poster` is an `ImageAsset`.

`Colour.hex` matches `#` plus six hex digits.

## site.json

| Key | Meaning | Required |
| --- | --- | --- |
| `metadata` | Default title and description. | yes |
| `metadata.title` | Default document title. | yes |
| `metadata.description` | Default meta description. | yes |
| `whereToBuy` | Where to buy control. | yes |
| `whereToBuy.label` | Button label. | yes |
| `whereToBuy.href` | Button destination. | yes |
| `storeBanner` | Copy for the `storeBanner` section. | yes |
| `storeBanner.title` | Banner heading. | yes |
| `storeBanner.text` | Banner body. | yes |
| `footer` | Footer copy. | yes |
| `footer.text` | Footer text. | yes |

## categories.json

Each entry is a category. `tileImage` is an 800 by 800 square.

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
| `image` | Cutout for small cards and the carousel (`ImageAsset`, provisional 800 by 800). | yes |
| `featureImage` | Lifestyle image for feature cards and banners (`ImageAsset`, provisional 1600 by 1200). Required when `featured` is true, and required on the product a `banner` showcase features. | no |
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

A page file is `{ metadata?, sections[] }`. `metadata` has `title` and `description`. Omit `metadata` when the page takes its title from a product (`pages/product.json` does). `sections` render in the listed order. Reordering or deleting a line changes the page.

| `type` | Properties | Required on that section |
| --- | --- | --- |
| `hero` | `title` (accessible name of the video), `video` (`VideoAsset`), `productSlug` | `title` and `video` required. `productSlug` optional; when set, the slug must exist. |
| `bestSellers` | `title` | `title` required. Membership comes from `bestSeller`, not from this section. |
| `categoryShowcase` | `category`, `layout`, `limit` | `category` and `layout` required. `limit` optional. `limit` counts the feature card: the feature card plus at most `limit - 1` others. |
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

Layouts:

- `feature-top`: category showcase. Uses the feature-card selection below.
- `feature-left`: category showcase. Uses the feature-card selection below.
- `row`: category showcase. Uses the feature-card selection below.
- `banner`: category showcase with no section header. Uses the feature-card selection below. The feature card's product must have `featureImage`.

## Selection rules

Best sellers are the products with `bestSeller: true`, in file order.

The category feature card is the first product with `featured: true`. Otherwise it is the first product in that category. The rest are the other products, in file order.

`splitCategoryProducts(products, limit?)` keeps that feature card plus at most `limit - 1` others. Without `limit`, the other products all wrap. `getProductsByCategory` stays uncapped.

Every product with `featured: true` has a `featureImage`. The product chosen as the feature card of a `banner` layout has a `featureImage`.

Only a product with `detail` has a Product Detail Page.

## Recipes

**Add a product.** Append an object to `products.json` with a unique `id` and `slug`, a `category`, an `image`, and `bestSeller`. It shows in that category. It shows in Best sellers only when `bestSeller` is true. The Kitchen showcase uses `limit: 3`, so a new Kitchen product stays out of that section until the limit is raised.

**Add a category.** Add the id to `CATEGORIES`, then add the category object and point products at that id. A `categoryShowcase` section can then use it.

**Add a section type.** Add the variant to the `Section` union and to `SECTION_TYPES`. Register a component before a page JSON uses the type.

**Add an allowed value.** Add it to the `as const` array first. The derived type follows. Update this README in the same change.

**Replace placeholders.** Replace string values and image or video `src` values, including provisional `width` and `height`. Leave the keys in place.

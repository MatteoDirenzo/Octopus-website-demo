# Content data

JSON in this folder is the only source of page copy. Functions in `src/lib/api/` cast it to the types in `src/types/`. Import them from `@/lib/api`. Route loaders in `src/lib/loaders/` call those functions and do not read these files. Components never import these files.

`src/data/*.json` -> `src/lib/api/` (typed functions, import from `@/lib/api`) -> pages (a route loader in `src/lib/loaders/` when the route needs one) -> `PageSections` -> components

Text fields hold short mock copy until real copy replaces the value. Exported images use a `/images/...` path. The home hero uses the 1080 by 1920 portrait poster below 1200 and the 1920 by 1080 landscape poster from 1200. `/images/placeholders` remains only where no file exists. Replace values only. Leave every key in place. `width` and `height` match the exported file.

## Files

| File | Contains |
| --- | --- |
| `README.md` | This document. |
| `site.json` | Default metadata, header, store banner copy, and footer. |
| `categories.json` | The four categories. |
| `products.json` | Every product, including detail-page content where `detail` is set. |
| `pages/home.json` | Home metadata and the ordered home sections. |
| `pages/product.json` | Ordered product-page sections. The product comes from the route slug. Specs render inside `productShowcase`, so this file does not list `specAccordion`. |
| `pages/where-to-buy.json` | Where to buy metadata and heading. The nav label stays in `site.json`. |
| `pages/contact-us.json` | Contact metadata and heading. The nav label stays in `site.json`. |
| `pages/policies.json` | Policies metadata. The page body is blank. The nav label stays in `site.json`. |
| `pages/not-found.json` | Not-found metadata and heading. |

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
| `shareImage` | `ImageAsset` used as `og:image` and Twitter image on every page. `width` and `height` are the file's real pixels. | yes |
| `skipToContent` | Label of the skip link, the first focusable element on every page. | yes |
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
| `carousel` | Accessible names of the carousel controls. | yes |
| `carousel.dots` | Name of the position-dot group. | yes |
| `carousel.previous` | Previous arrow. | yes |
| `carousel.next` | Next arrow. | yes |
| `carousel.showItem` | One position dot. `{n}` becomes the slide number, from 1. | yes |
| `colourLabel` | Name of the product colour picker. Also shown before the selected colour, for example `Colour - Black`. | yes |
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

Each entry is a product. File order is the order of `getBestSellers` and of each category list. A page block lists the slugs it shows. A carousel that omits `productSlugs` shows the best sellers instead.

| Key | Meaning | Required |
| --- | --- | --- |
| `id` | Unique id. | yes |
| `slug` | Unique URL slug. | yes |
| `name` | Display name. | yes |
| `category` | Value from `CATEGORIES`. | yes |
| `shortDescription` | Line used on cards. | yes |
| `image` | Cutout for `productSlugs` (`ImageAsset`). | yes |
| `featuredImage` | Lifestyle image for a `featureProductSlug` (`ImageAsset`). Required on that product, and required when `featured` is true. | no |
| `heroImage` | Two-crop still for a hero block that links this product. `mobile` is 1080 by 1920. `desktop` is 1920 by 1080. | no |
| `bestSeller` | When true, `getBestSellers` includes the product. A carousel without `productSlugs` shows these products. Any other block still lists its own slugs. | yes |
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
| `detail.downloadsTitle` | Heading of the download row. | yes, inside `detail` |
| `detail.downloads` | Download links. The detail page shows the first file. | yes, inside `detail` |
| `detail.downloads[].label` | Link text. This is the file name. | yes |
| `detail.downloads[].href` | Destination of the download. | yes |

## Page configs

A section page file is `{ metadata?, sections[] }`. `metadata` has `title` and `description`. Omit `metadata` when the page takes its title from a product (`pages/product.json` does). `sections` render in the listed order. Reordering or deleting a line changes the page.

`pages/where-to-buy.json`, `pages/contact-us.json`, and `pages/not-found.json` are `{ metadata, heading }`. They have no `sections`. `heading.title` is the page heading. `heading.subtitle` is optional and omitted until there is copy. The nav label for where to buy and contact stays in `site.json`.

`pages/policies.json` is `{ metadata }` only. The page body is blank. The nav label stays in `site.json`.

`component` selects the block. `spacing` is optional on every block. Each side is a spacing step (`20` matches `pt-20`). A missing breakpoint copies the smaller one. A missing side is `0`. Omit `spacing` for a full-bleed block.

| `component` | Properties | Required on that block |
| --- | --- | --- |
| `hero` | `title`, `subtitle`, `href`, `productSlug`, `spacing` | `title` and `productSlug` required. The still is that product's `heroImage`. `subtitle` and `href` are optional. The link label stays `site.learnMore`. |
| `carousel` | `title`, `cardType`, `cardVariant`, `mode`, `visible`, `peek`, `inset`, `endOffset`, `showDots`, `productSlugs`, `featureProductSlug`, `spacing` | `title` required. `productSlugs` is optional. When it is present, the carousel shows those products, in list order, with the cutout. When it is omitted, the carousel shows `getBestSellers()`, in file order. `featureProductSlug` is optional, uses `featuredImage`, and is shown first. `cardType` `product` renders `ProductCard` with the cutout, the name, and the short description. The image is the link. `cardVariant` is ignored for `small` and `product`. Pass-through props match `Carousel`. Omit one and the carousel keeps its default. |
| `categoryShowcase` | `title`, `subtitle`, `href`, `layout`, `featureProductSlug`, `productSlugs`, `spacing` | `title`, `href`, `layout`, and `productSlugs` required. `feature-top` and `feature-left` require `featureProductSlug`. `row` omits it and renders `productSlugs` as small cards. The heading link label stays `site.exploreAll`. Card links use `site.learnMore`. |
| `banner` | `title`, `subtitle`, `href`, `images`, `button`, `variant`, `priority`, `spacing` | One of two shapes. Both use `images`. `images.src` has no breakpoint suffix. The files add `-desktop`, `-mobile`, and `-tablet` before the extension. `images.desktop`, `images.mobile`, and `images.tablet` are that crop's `width` and `height`. The frame has a fixed height and the picture covers it. Copy: `title`, `subtitle`, `href`, and `images` required. The link label stays `site.learnMore`. Button: `images` and `button` (`label`, `href`, `variant`) required. `title` and `subtitle` are optional and omitted to show only the button. `variant` on a copy banner, and `button.variant` on a button banner, pass through to `Banner`. |
| `exploreCategories` | `title`, `spacing` | `title` required. Cards are every category, in file order. The label is `title`, the link is `href`, and the picture is `tileImage`. |
| `storeBanner` | `spacing` | Copy comes from `site.storeBanner`. |
| `productShowcase` | `spacing` | The page passes the loaded product. The left column is the hero, then the gallery, then the specs. From 810 the info panel sticks beside that column. A gallery cell with a title is a bento card. A cell without a title is an image. Consecutive titled cells form one bento. `full` is a row of one. Two `half` cells share a row from 1200. |
| `specAccordion` | `spacing` | The page passes the loaded product. The product page does not list this block. The specs already sit in `productShowcase`. |

## Allowed values

Defined once as `as const` arrays in `src/types/`, in the file for their domain (`category.ts`, `sections.ts`, `cards.ts`, `gallery.ts`, and so on). Derived types follow the arrays.

| Array | Values |
| --- | --- |
| `CATEGORIES` | `kitchen`, `home-security`, `hair-care`, `accessories` |
| `SHOWCASE_LAYOUTS` | `feature-top`, `feature-left`, `row` |
| `GALLERY_SPANS` | `full`, `half` |
| `TEXT_TONES` | `light`, `dark` |
| `VIDEO_TYPES` | `video/mp4`, `video/webm` |
| `SECTION_TYPES` | `hero`, `carousel`, `categoryShowcase`, `banner`, `exploreCategories`, `storeBanner`, `productShowcase`, `specAccordion` |
| `CAROUSEL_MODES` | `contained`, `overflow` |
| `CARD_TYPES` | `large`, `medium`, `small`, `product` |
| `CARD_VARIANTS` | `horizontal`, `vertical` |
| `BUTTON_VARIANTS` | `primary`, `secondary`, `ghost` |
| `FOOTER_COLUMNS` | `1`, `2` |

Layouts:

- `feature-top`: heading from the block, one horizontal large card for `featureProductSlug`, then `productSlugs` as vertical medium cards. The feature card uses `featuredImage`. The other cards use `image`.
- `feature-left`: same cards as `feature-top`. Below 1200 the stack matches `feature-top`. From 1200 the feature card is a vertical large card on the left, and the other products stack on the right as horizontal medium cards. The feature card matches the height of that stack.
- `row`: heading from the block, then `productSlugs` as small cards. No feature card. Stacked below 810 and in one row from 810. Every card uses `image`.
- `banner`: a full-width `Banner`. Both shapes take their picture from `images`: `images.src` with `-desktop`, `-mobile`, and `-tablet` before the extension. The frame has a fixed height and the picture covers it. A copy banner takes its heading, subtitle, and link from the block. A button banner takes its button from `button`. Omit the heading and subtitle to show only that button.

## Selection rules

`getProductsBySlugs` returns products in the slug order it is given. A missing slug throws.

`getBestSellers` returns products with `bestSeller: true`, in file order. A carousel block without `productSlugs` shows this list. A carousel with `productSlugs` ignores the flag. `getCarouselProducts` picks between the two. An empty `productSlugs` stays empty.

`getProductsByCategory` stays uncapped. A showcase lists `featureProductSlug` and `productSlugs` itself.

Every product with `featured: true` has a `featuredImage`. Every `featureProductSlug` has a `featuredImage`. Every hero `productSlug` has a `heroImage`.

Only a product with `detail` renders the product detail page. A product without `detail` still has a route and shows its name.

## Recipes

**Add a product.** Append an object to `products.json` with a unique `id` and `slug`, a `category`, an `image`, and `bestSeller`. Add its slug to a page block to show it there. Add `featuredImage` when a block uses it as `featureProductSlug`. Add `heroImage` when a hero block links it.

**Add a category.** Add the id to `CATEGORIES`, then add the category object and point products at that id.

**Add a block.** Add the variant to the `Section` union and to `SECTION_TYPES`. Handle it in `PageSections` before a page JSON uses the component.

**Add an allowed value.** Add it to the `as const` array first. The derived type follows. Update this README in the same change.

**Replace placeholders.** Replace string values and image or video `src` values, including provisional `width` and `height`. Leave the keys in place.

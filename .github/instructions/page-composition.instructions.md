---
applyTo: "src/app/**,src/components/PageSections/**,src/data/pages/**"
---

# Page composition

- Pages are config-driven: each page's JSON lists ordered sections and page metadata.
- Route loaders live in `src/lib/loaders/`, one file per type (`categories.ts` now; later `products.ts`, `pages.ts`, and so on). They call `@/lib/api` and decide outcomes such as `notFound()`. They do not read JSON and do not replace the functions in `src/lib/api/`. Pages import them from `@/lib/loaders` and do not declare them locally. New route loaders go in that folder.
- `src/components/PageSections` is the only page composition layer. It switches on `component`, applies the block's spacing, and passes through the options that component already accepts. A new block fails the build until `SECTION_TYPES` and that switch both include it.
- Page files render `<PageSections blocks={page.sections} />`. No page-specific markup outside blocks.
- A block lists product slugs and its own heading, subtitle, and link. It does not copy product data. `productSlugs` use `product.image`. `featureProductSlug` uses `product.featuredImage`. A hero `productSlug` uses `product.heroImage`. `getProductsBySlugs` keeps slug order.
- Keep block types to what the pages need. Do not over-engineer.
- Presentational components stay specific (Carousel, CategoryShowcase, Banner, Button). `PageSections` only chooses among them and wraps spacing.
- Header and Footer live in the layout, with content from `site.json`.
- Product route: `src/app/products/[slug]/page.tsx` with `generateStaticParams` and `generateMetadata`; call `notFound()` for unknown slugs.
- The header is fixed and overlays the page top. Define `--header-height` once in tokens per breakpoint. Use it for `scroll-padding-top` on `html` and as the `top` offset of sticky elements. Never hardcode header offsets.
- A `featureProductSlug` uses `product.featuredImage`. `productSlugs` use `product.image`. A hero uses `product.heroImage`.
- The product page uses a single `productShowcase` section: a media column (main image + gallery) and a sticky info panel in one shared container. Do not split them into separate sections, or sticky breaks.
- Gallery items come from `product.detail.gallery`. `span` ('full' | 'half') drives a 2-column grid at every breakpoint; order comes from the data.
- "Where to buy" is a single button in the DOM, fixed to the bottom on mobile via CSS. Add bottom padding on mobile so it never covers content.
- Never use `overflow: hidden/auto` on ancestors of a sticky element; use `overflow-x: clip` if clipping is needed.
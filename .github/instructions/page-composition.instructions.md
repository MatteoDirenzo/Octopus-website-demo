---
applyTo: "src/app/**,src/components/PageSections/**,src/data/pages/**"
---

# Page composition

- Pages are config-driven: each page's JSON lists ordered sections and page metadata.
- Route loaders live in `src/lib/loaders/`, one file per type (`categories.ts`, `products.ts`, `metadata.ts`). They call `@/lib/api`, never read JSON, and decide the page outcome (`loadProduct` and `loadCategory` call `notFound()`). `PageSections` uses the throwing `requireProduct`, `requireFeatured` and `requireDetail`, because a bad slug in a block is a content error, not a 404. Pages import them from `@/lib/loaders` and do not declare them locally.
- `src/components/PageSections` is the only page composition layer. It switches on `component`, applies the block's spacing, and passes through the options that component already accepts. Its data mapping (spacing style, gallery grouping, spec and showcase mappers) lives in `src/helpers/components/`, so the component file only renders. A new block fails the build until `SECTION_TYPES` and that switch both include it.
- Page files render a `main` (see Accessibility) with `<PageSections blocks={page.sections} />` and, where relevant, `JsonLd`. No page-specific markup outside blocks.
- A block lists product slugs and its own heading, subtitle, and link. It does not copy product data. `productSlugs` use `product.image`, `featureProductSlug` uses `product.featuredImage`, a hero `productSlug` uses `product.heroImage`. `getProductsBySlugs` keeps slug order. A carousel may omit `productSlugs` and then shows `getBestSellers()`.
- Keep block types to what the pages need. Do not over-engineer. Presentational components stay specific (Carousel, CategoryShowcase, Banner, Button); `PageSections` only chooses among them and wraps spacing.
- Header, Footer and SkipLink live in the layout, with content from `site.json`.
- Every page exports `generateMetadata` built with `loadMetadata` from `@/lib/loaders`. Slug routes (`product/[slug]`, `category/[slug]`) also export `generateStaticParams`; in `generateMetadata` an unknown slug returns the not-found metadata instead of calling `notFound()`.
- Placeholder routes and products without `detail` render `PlaceholderPage` (it owns the `main`) with `noIndex: true` in their metadata. The not-found page also renders it, with no `path` so it has no canonical.
- The header is fixed and overlays the page top. Its height is `--spacing-header` / `--spacing-header-tablet` in `tokens.css` (utilities `pt-header`, `-mt-header`, `scroll-pt-header`, with `tablet:` variants). The body pads it once in the layout; sticky elements sit at `top-0` and pad the header inside. Never hardcode header offsets.
- Full-screen frames (home hero, product still, `PlaceholderPage`) pull up under the header with `-mt-header` and use `h-svh`/`min-h-svh`.
- The product page uses a single `productShowcase` section: a media column (main image + gallery) and a sticky info panel in one shared container. Do not split them into separate sections, or sticky breaks.
- Gallery items come from `product.detail.gallery`. `span` ('full' | 'half') drives a 2-column grid at every breakpoint; order comes from the data.
- "Where to buy" is a single button in the DOM, fixed to the bottom below 810 via CSS. The page `main` gets `buy-bar-space` so it never covers content or the footer.
- Never use `overflow: hidden/auto` on ancestors of a sticky element; use `overflow-x: clip` if clipping is needed.

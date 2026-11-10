---
applyTo: "src/app/**,src/components/sections/**,src/data/pages/**"
---

# Page composition

- Pages are config-driven: each page's JSON lists ordered sections and page metadata.
- `src/components/sections/registry.ts` maps each section type to its component, typed exhaustively so a new section type fails the build until it is registered.
- Page files only loop over sections and render through the registry. No page-specific markup outside sections.
- Sections reference products and categories by slug/id and never duplicate product data. Category sections filter `products.json` through the loaders.
- Keep section types to what the two pages need. Do not over-engineer.
- Each section is a small component built from the shared ones (ProductCard, SectionHeader, Button, Carousel). Do not build one generic "Section" component.
- Header and Footer live in the layout, with content from `site.json`.
- Product route: `src/app/products/[slug]/page.tsx` with `generateStaticParams` and `generateMetadata`; call `notFound()` for unknown slugs.
- The header is fixed and overlays the page top. Define `--header-height` once in tokens per breakpoint. Use it for `scroll-padding-top` on `html` and as the `top` offset of sticky elements. Never hardcode header offsets.
- Feature cards and banners use `product.featureImage`; small cards and the carousel use `product.image`.
- The product page uses a single `productShowcase` section: a media column (main image + gallery) and a sticky info panel in one shared container. Do not split them into separate sections, or sticky breaks.
- Gallery items come from `product.detail.gallery`. `span` ('full' | 'half') drives a 2-column grid at every breakpoint; order comes from the data.
- "Where to buy" is a single button in the DOM, fixed to the bottom on mobile via CSS. Add bottom padding on mobile so it never covers content.
- Never use `overflow: hidden/auto` on ancestors of a sticky element; use `overflow-x: clip` if clipping is needed.
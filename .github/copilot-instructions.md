# Project Instructions

## Stack

- Use Next.js App Router, strict TypeScript, Tailwind CSS, ESLint, and npm. Keep Server Components by default; use Client Components only when necessary (mobile menu, carousel, accordion, colour selector).
- Consult the installed Next.js documentation in `node_modules/next/dist/docs/` for version-specific behavior.
- No i18n library, icon library, UI kit, carousel library or animation library. Do not add runtime dependencies without asking first. Dev-only packages are allowed for testing.
- Commands: `npm run dev`, `lint`, `typecheck`, `build`, `test` (everything), `test:unit` (Vitest), `test:e2e` (Playwright).

## Content and data

- Source all content from local JSON in `src/data` (`site.json`, `products.json`, `categories.json`, `pages/*.json`). No hardcoded content in markup. Do not add a separate translation or messages system.
- JSON is accessed only through async functions in `src/lib/api/` (exposed via `src/lib/api/index.ts`; e.g. getProducts, getProductsBySlugs, getBestSellers, getCarouselProducts, getProductsByCategory, getProductBySlug, getPage), which act as a fake API. Import them from `@/lib/api`. Components and pages never import JSON directly.
- Route loaders live in `src/lib/loaders/`, one file per type (`categories.ts`, `products.ts`, `metadata.ts`; later `pages.ts`, and so on). They call `@/lib/api` and decide the page outcome (for example `notFound()`). `products.ts` also holds the throwing `require*` lookups used by page blocks. They do not read JSON and do not replace the functions in `src/lib/api/`. New route loaders go there. Pages and components do not declare these helpers locally. Import them from `@/lib/loaders`.
- No artificial delays and no internal `/api` routes. Server Components `await` the API functions or a route loader directly. Client components never call either; data is passed in as props.
- Page blocks list product slugs. Product copy and images stay in `products.json`. Adding a product does not place it on a page until a block lists its slug.
- Product-specific content (colours, feature cards, specs, downloads) lives on the product.
- Detailed rules for types, page composition and tests are in `.github/instructions/`.

## Styling

- Use the CSS theme tokens and Tailwind's existing type and spacing scales; do not hardcode design values in components (no hex, no arbitrary values like `text-[13px]`). Define new design values in `src/styles/tokens.css`. If a token is missing, say so instead of inventing one.
- Design mobile-first: unprefixed utilities are mobile, `tablet:` starts at 810px, and `desktop:` starts at 1200px. Define breakpoints only in the theme.
- No fixed px widths that break in-between widths. No horizontal scroll at any width.
- The font is defined once in `src/styles/fonts.ts` and exposed as a CSS variable.
- Use `clsx` to combine multiple classes. Do not write a local join helper. Put the classes on the element.

## Helpers, hooks and config

- `src/config/` holds shared values that code cannot read from CSS: media queries (`breakpoints.ts`, mirroring `--breakpoint-*` in `tokens.css`), `next/image` `sizes` (`sizes.ts`), carousel defaults, the placeholder image, and route prefixes. No functions and no content copy.
- `src/helpers/` holds pure functions. General helpers sit at the root (`metadata.ts`, `routes.ts`, `slug.ts`, `errors.ts`). Helpers used by components sit in `src/helpers/components/` (class names, image crops, spacing, gallery grouping, section mappers). Client hooks sit in `src/helpers/hooks/`.
- A component or page does not declare a reusable helper locally. Reuse one from `src/helpers/` or add it there. Build every page's metadata with `loadMetadata` from `@/lib/loaders` (it adds the share image and calls `toMetadata`), `productHref` for product links, and `useReducedMotion` for motion checks.
- Do not repeat breakpoint or `sizes` literals in components. Import them from `@/config/breakpoints` and `@/config/sizes`.

## Components

- Give each component its own folder under `src/components` and colocate its `Component.test.tsx`.
- Name the component file `index.tsx` so the import is the folder (`@/components/Button`) and not `Button/Button`. Keep `Component.test.tsx` beside it.
- Shared across both pages: Button, SectionHeader, ProductCard, Carousel, Accordion, Header, Footer. Typed props, no duplicated markup.
- Icons are inline SVG components in `src/components/icons` using `currentColor`. Decorative icons have `aria-hidden="true"`; icon-only buttons have `aria-label` on the button. The logo keeps its brand colours.

## Accessibility

- Use semantic HTML, keyboard-accessible controls, visible focus, and WCAG AA contrast. One `h1` per page and a logical heading order.
- Menu: `aria-expanded`, `aria-controls`, closes on Escape, focus managed.
- Accordion: `button` with `aria-expanded` and `aria-controls`, region with `aria-labelledby`.
- Carousel: labelled region, labelled prev/next buttons, `disabled` at start and end, dots reflect position.
- Colour selector: accessible name and a visible selected state.
- Meaningful alt text for informative images; `alt=""` for decorative ones.
- Mobile menu locks body scroll while open and returns focus to its toggle on close. Focus must never end up hidden behind the fixed header or bottom bar.

## Performance

- Use `next/image` with explicit dimensions or a sized `fill` container. Use `priority` only for the hero; everything below the fold is lazy.
- Carousel uses native scroll-snap with a light scroll listener or IntersectionObserver.
- Keep client JavaScript and assets lean; aim for mobile Lighthouse performance of at least 90.

## SEO

- Each page has a unique title and meta description, Open Graph and Twitter tags with the `site.json` share image, and a canonical path. Product page metadata comes from the product.
- `metadataBase`, the sitemap and robots.txt use `SITE_URL` from `src/config/site.ts` (`NEXT_PUBLIC_SITE_URL`, fallback `http://localhost:3000`). Do not hardcode the deploy URL.
- Placeholder pages and products without `detail` are `noindex` and stay out of `src/app/sitemap.ts`. Do not block them in robots.txt, or crawlers cannot read the `noindex`.

## Working rules

- Work one component or section at a time, not whole pages.
- Run `npm run lint`, `npm run typecheck`, and `npm test` for relevant changes.
- Before finishing a change, review your own diff for hardcoded values, non-semantic `div`s, fixed widths, missing focus/aria, images without dimensions, and content outside the JSON.
- Explain non-obvious code so the author can defend it in a review call.
- Record each user correction to AI output in `NOTES.md` (what was produced, what changed, why) for later use in the README. Do not invent retrospective notes.
- Small conventional commits (`feat`, `fix`, `style`, `refactor`, `test`, `docs`, `chore`, `perf`), one working thing each. Stage only intended files; never commit `node_modules`, `.next`, `.env*`, `test-results` or `playwright-report`.

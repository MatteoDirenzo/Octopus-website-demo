# Project Instructions

## Stack

- Use Next.js App Router, strict TypeScript, Tailwind CSS, ESLint, and npm. Keep Server Components by default; use Client Components only when necessary (mobile menu, carousel, accordion, colour selector).
- Consult the installed Next.js documentation in `node_modules/next/dist/docs/` for version-specific behavior.
- No i18n library, icon library, UI kit, carousel library or animation library. Do not add runtime dependencies without asking first. Dev-only packages are allowed for testing.
- Commands: `npm run dev`, `lint`, `typecheck`, `build`, `test` (everything), `test:unit` (Vitest), `test:e2e` (Playwright).

## Content and data

- Source all content from local JSON in `src/data` (`site.json`, `products.json`, `categories.json`, `pages/*.json`). No hardcoded content in markup. Do not add a separate translation or messages system.
- JSON is accessed only through async loader functions in `src/lib/api.ts` (e.g. getProducts, getBestSellers, getProductsByCategory, getProductBySlug, getPage), which act as a fake API. Components and pages never import JSON directly.
- No artificial delays and no internal `/api` routes. Server Components `await` loaders directly. Client components never call loaders; data is passed in as props.
- Never hand-list products in a page. Adding a product to the data must be enough to show it in the right section.
- Product-specific content (colours, feature cards, specs, downloads) lives on the product.
- Detailed rules for types, page composition and tests are in `.github/instructions/`.

## Styling

- Use the CSS theme tokens and Tailwind's existing type and spacing scales; do not hardcode design values in components (no hex, no arbitrary values like `text-[13px]`). Define new design values in `src/styles/tokens.css`. If a token is missing, say so instead of inventing one.
- Design mobile-first: unprefixed utilities are mobile, `tablet:` starts at 810px, and `desktop:` starts at 1200px. Define breakpoints only in the theme.
- No fixed px widths that break in-between widths. No horizontal scroll at any width.
- The font is defined once in `src/styles/fonts.ts` and exposed as a CSS variable.

## Components

- Give each component its own folder under `src/components` and colocate its `Component.test.tsx`.
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

- Each page has a title, meta description and Open Graph tags. Product page metadata comes from the product. Do not invent absolute URLs or `metadataBase` until the real deploy URL exists.

## Working rules

- Work one component or section at a time, not whole pages.
- Run `npm run lint`, `npm run typecheck`, and `npm test` for relevant changes.
- Before finishing a change, review your own diff for hardcoded values, non-semantic `div`s, fixed widths, missing focus/aria, images without dimensions, and content outside the JSON.
- Explain non-obvious code so the author can defend it in a review call.
- Record each user correction to AI output in `NOTES.md` (what was produced, what changed, why) for later use in the README. Do not invent retrospective notes.
- Small conventional commits (`feat`, `fix`, `style`, `refactor`, `test`, `docs`, `chore`, `perf`), one working thing each. Stage only intended files; never commit `node_modules`, `.next`, `.env*`, `test-results` or `playwright-report`.

# Octopus website demo

Demo built for the Product Engineer (Web) technical test: the Octopus **Homepage** and one **Product Detail Page** (Countertop Blender), fully responsive across the three Figma breakpoints.

- **Live:** https://octopus-website-demo-xi.vercel.app
- **Stack:** Next.js (App Router) · React · strict TypeScript · Tailwind CSS v4 · Vitest · Playwright

## Setup and run

```bash
npm ci
npx playwright install chromium
npm run dev
```

Open http://localhost:3000.

| Command             | Purpose                                                          |
| ------------------- | ---------------------------------------------------------------- |
| `npm run dev`       | Start the development server.                                    |
| `npm run lint`      | Run ESLint.                                                      |
| `npm run typecheck` | Check TypeScript without emitting files.                         |
| `npm run build`     | Create the production build.                                     |
| `npm run start`     | Serve a production build.                                        |
| `npm run test:unit` | Run Vitest component and helper tests.                           |
| `npm run test:e2e`  | Build, then run Playwright against its own production server.    |
| **`npm test`**      | **Run everything (unit + end-to-end) with a single command.**    |

Playwright uses port 3100 and fails if it is already taken. Free the port or change it in `playwright.config.ts`.

### Environment

| Variable               | Purpose                                                                                                                |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Site origin for `metadataBase`, canonical URLs, `sitemap.xml` and `robots.txt`. Falls back to `http://localhost:3000`. |

On Vercel set `NEXT_PUBLIC_SITE_URL=https://octopus-website-demo-xi.vercel.app`. It is read at build time, so redeploy after changing it.

## Architecture

Content flows in one direction and components never touch the JSON:

```
src/data/*.json  ->  src/lib/api  ->  src/lib/loaders  ->  pages  ->  PageSections  ->  components
 (content)          (typed fake API)   (route outcomes)    (routes)   (block -> UI)
```

- **Content from data.** `src/data` (`site.json`, `products.json`, `categories.json`, `pages/*.json`) is the only source of copy. `src/lib/api` exposes typed async functions (`getProducts`, `getBestSellers`, `getProductBySlug`, ...) that act as a mock API. Route loaders in `src/lib/loaders` call them and decide the page outcome (e.g. `notFound()`). See [`src/data/README.md`](src/data/README.md) for every field.
- **Pages are lists of blocks.** `pages/home.json` and `pages/product.json` list ordered content blocks; `PageSections` maps each block to a component. Each block holds its copy, links and product order. A new product stays in its category until a block lists its slug, so adding a product to `products.json` is enough to make it available in the right category and in any block that references it.
- **Typed models.** `src/types` holds the types for products, pages, blocks, media and UI. Images carry `src`, `alt`, `width` and `height`, which reserves space and avoids layout shift.
- **Design tokens defined once.** `src/styles/tokens.css` holds colours, type styles, spacing exceptions and the breakpoints (mobile-first, `tablet:` from 810px, `desktop:` from 1200px) in a Tailwind `@theme` block. The font (Satoshi, variable) is defined once in `src/styles/fonts.ts`. Components use tokens and Tailwind's scales; no hex or arbitrary values in markup. `src/config/breakpoints.ts` mirrors the breakpoints for JS.
- **Components.**
  - One folder per component, `src/components/<Name>/index.tsx` plus its colocated test, so imports stay clean (`@/components/Button`).
  - Reusable and data-driven: they take typed props and never read JSON. `ProductCard`, `Carousel`, `Button`, the `TechnicalSpecs` accordion, `Header` and `Footer` are shared by both pages. The home and the product page differ only in which blocks their page file lists.
  - Logic is separated from markup: behaviour lives in hooks (`useCarousel`, `useHeader`) and variant or class decisions live in pure helpers (`src/helpers/components`), so both are testable without rendering.
  - Server Components by default. A component becomes a Client Component only when it needs state: menu, carousel, accordion, colour selector.
- **Helpers.** `src/helpers` holds pure functions (metadata, JSON-LD, routes, image crops, gallery grouping) and client hooks (`useCarousel`, `useHeader`, `useMediaQuery`, `useReducedMotion`).

## Performance and accessibility

Lighthouse (mobile) reports:

| Page                    | Performance | Accessibility | Best practices | SEO | Screenshots                                                                                       |
| ----------------------- | ----------- | ------------- | -------------- | --- | ------------------------------------------------------------------------------------------------- |
| Homepage                | 100         | 100           | 100            | 100 | [mobile](lighthouse-screenshots/home-mobile.png) · [desktop](lighthouse-screenshots/home-desktop.png)       |
| Product Detail Page     | 97          | 100           | 100            | 100 | [mobile](lighthouse-screenshots/product-mobile.png) · [desktop](lighthouse-screenshots/product-desktop.png) |

What helps the scores: WebP images exported per breakpoint and compressed, a hero video with a poster image, `priority` only on the hero image, explicit image dimensions, a self-hosted variable font with `display: swap`, and Server Components keeping client JS small.

Accessibility: semantic landmarks and one `h1` per page, skip link, visible focus states, full keyboard navigation, alt text from data, accessible accordion, and WCAG AA contrast. Playwright runs axe (WCAG A/AA) on every route at three viewport widths, plus the open mobile menu.

## SEO

Every page builds its metadata through `loadMetadata`: title, description, canonical, Open Graph and Twitter tags (with a share image). Also generated: `sitemap.xml`, `robots.txt`, JSON-LD (`Organization`, `WebSite`, `Product`) that matches the visible content, and `/llms.txt` built from the data.

## Tests

- **Unit / component (Vitest + Testing Library):** components (carousel, accordion, header, cards, banner, colour selector, ...), helpers (metadata, JSON-LD, gallery, image), data integrity and sitemap.
- **End-to-end (Playwright, Chromium):**
  - `product-flow.spec.ts`: Homepage to the Countertop Blender Product Detail Page.
  - `home.spec.ts`: content renders and no horizontal scroll.
  - `a11y.spec.ts`: axe on every route and viewport, and the open menu.
  - `seo.spec.ts`: one `h1`, canonical, share tags, JSON-LD, `llms.txt`.

Run all of it with `npm test`.

## Trade-offs and assumptions

- **Mock API over a real one.** JSON behind async functions mirrors a CMS or API shape without a backend (out of scope). Swapping it for a headless CMS only changes `src/lib/api`.
- **No UI, carousel or animation libraries.** The carousel, accordion and menu are hand-built to keep the bundle small and to control accessibility. The cost is more code to maintain and test.
- **Placeholders where Figma assets were missing.** Some copy is mock text, the gallery repeats the first picture in its sixth cell (only five files were available), and the downloads PDF is a placeholder.
- **Out-of-scope routes are placeholders.** Category pages, "Where to buy", "Contact us" and "Policies" are minimal pages, as allowed by the brief.
- **Tokens extracted, not pixel-perfect.** Values come from Figma. A few measurements are not on Tailwind's scale (e.g. hero heading inset, product info width) and are named tokens.
- **Figma access.** The file is view-only: no Dev Mode, no MCP, no exportable variables and no downloadable SVG icons. Tokens were transcribed by hand and icons redrawn as inline SVG.
- **Figma issues, assumptions made.** On the product page the fixed texts on the right overlap, and on mobile the button text colour is not set. The prototype also scrolls horizontally on the whole home page, which I did not reproduce (the brief requires no horizontal scroll). The brief asks for carousel pagination dots but Figma shows none, so I built them with my own minimal style.
- **Browser coverage.** E2E runs on Chromium only. Safari, Firefox, iOS Safari and Android Chrome were not automated.

## What I would do with more time

- Run Playwright on WebKit and Firefox, and test on real iOS and Android devices.
- Add visual regression tests against the Figma frames at each breakpoint.
- Connect a headless CMS in place of the JSON files, with preview mode and image transforms.
- Add more product and category pages driven by the same data and blocks.
- Localisation (none is configured; copy is already separated from markup).
- Replace placeholder copy, gallery images and the downloads PDF with final assets, and compress the hero video further.
- Add Lighthouse CI so the performance and accessibility budgets are enforced on every PR.

## How I used AI coding tools

- **Tools:** Claude Code, Cursor and Copilot. Project rules live in `.cursor/rules` and `.github/instructions`: stack, data flow, token, component and testing conventions.
- **Used for:** scaffolding components and tests, translating Figma frames into layouts, the data and typing layer, SEO and JSON-LD, accessibility fixes and the Playwright suites.
- **Where I had to correct or rewrite the output:**
  - Too many scaffold and leftover files; I cleaned them up. The generated `copilot-instructions` held information I did not need, so I rewrote it, and the first README was too long, so I cut it down.
  - Too many API loaders for a demo, despite precise instructions on how to treat data. I reduced them to what the pages need.
  - It created `ComponentName/ComponentName.tsx`; I switched to `ComponentName/index.tsx` for cleaner imports and added the rule to the instructions.
  - It wrote its own function to join class names instead of installing `clsx`. I installed `clsx`, replaced it and added the rule.
  - Variants were fixed inside components, and helpers were often created without meaningful content. I moved variants into helpers and rewrote the instructions for helpers.
  - Some design values skipped the tokens despite clear instructions. I patched them and added a rule.
  - For the carousel it was unsure where to put logic. I told it to split the logic into a hook (`useCarousel`).
- **Overall:** a lot of my time went into organisational refactors and into refining the instructions, not just into prompting features.

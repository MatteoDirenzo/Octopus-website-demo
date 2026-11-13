---
applyTo: "**/*.test.ts,**/*.test.tsx,tests/**,vitest.config.*,playwright.config.*"
---

# Tests

- Vitest + Testing Library (jsdom) for components, hooks and helpers. Playwright for e2e, on Chromium and WebKit (WebKit catches Safari-only rendering such as button sizes and `svh`).
- Unit tests are colocated: `src/components/<Name>/<Name>.test.tsx`, `src/helpers/**/<name>.test.ts`, `src/app/sitemap.test.ts`, `src/lib/api/data.test.ts`. E2E specs live in `tests/*.spec.ts`.
- Vitest excludes `tests/`; Playwright only runs `tests/`.
- Query by role and accessible name, not by class or test id where avoidable. In e2e, read expected copy from the data functions instead of repeating it.
- Keep these covered:
  - Accordion opens and closes, and `aria-expanded` changes (`TechnicalSpecs`)
  - Carousel prev arrow is disabled at the start, next arrow at the end
  - Data validation (`data.test.ts`)
  - `product-flow`: Home → "Learn more" on the Countertop Blender → Product Detail Page
  - `a11y`: axe WCAG A/AA on every route and the open menu, at mobile, tablet and desktop widths
  - `seo`: one `h1`, canonical, share tags, robots, JSON-LD and `/llms.txt`
  - `home`, `buttons`, `full-screen`: no horizontal scroll, fixed 40px buttons and header bar, full-screen frames
- Keep tests few and meaningful. Each one should read as render/interact/assert so the author can explain every line.
- Playwright starts the production build itself via `webServer`, on port 3100, without reusing an existing server.

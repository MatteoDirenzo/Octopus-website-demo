---
applyTo: "**/*.test.ts,**/*.test.tsx,tests/**,vitest.config.*,playwright.config.*"
---

# Tests

- Vitest + Testing Library for components, Playwright (Chromium only) for e2e.
- Query by role and accessible name, not by class or test id where avoidable.
- Required tests:
  - Accordion opens and closes, and `aria-expanded` changes
  - Carousel prev arrow is disabled at the start, next arrow at the end
  - Data validation (`src/lib/api/data.test.ts`)
  - One e2e flow: Home → "Learn more" on the Countertop Blender → Product Detail Page
- Vitest excludes the `tests/` folder; Playwright only runs `tests/`.
- Keep tests few and meaningful. Each one should read as render/interact/assert so the author can explain every line.
- Playwright starts the production build itself via `webServer`, on a dedicated port, without reusing an existing server.

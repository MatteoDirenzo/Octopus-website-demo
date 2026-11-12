# Octopus-website-demo

A small demo built to show how an ecommerce with on product page would be coded.

## Local setup

```bash
npm ci
npx playwright install
npm run dev
```

Open http://localhost:3000.
The tests use Chromium only, so `npx playwright install chromium` is a smaller alternative to installing every Playwright browser.

## Environment

| Variable               | Purpose                                                                                                              |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Site origin for `metadataBase`, canonical URLs, `sitemap.xml` and `robots.txt`. Falls back to `http://localhost:3000`. |

On Vercel, set `NEXT_PUBLIC_SITE_URL=https://octopus-website-demo-xi.vercel.app` in the project's environment variables. The value is read at build time, so redeploy after changing it.

## Scripts

| Command             | Purpose                                                     |
| ------------------- | ----------------------------------------------------------- |
| `npm run dev`       | Start the development server.                               |
| `npm run lint`      | Run ESLint.                                                 |
| `npm run typecheck` | Check TypeScript without emitting files.                    |
| `npm run build`     | Create the production build.                                |
| `npm run start`     | Serve a production build.                                   |
| `npm run test:unit` | Run Vitest component tests.                                 |
| `npm run test:e2e`  | Build and run Playwright against its own production server. |
| `npm test`          | Run both unit and end-to-end tests.                         |

Playwright uses port 3100 and will fail if another server is already using it. Free the port or change it in `playwright.config.ts` before running end-to-end tests.

## Project structure

- `src/data/site.json` contains placeholder page content and metadata.
- `src/styles/tokens.css` contains placeholder colours and the mobile-first tablet (810px) and desktop (1200px) breakpoints. Tailwind's default typography and spacing scales remain available until the Figma values are ready.
- `src/styles/fonts.ts` defines the placeholder Geist font in one place; replace its loader there when the Figma font is available.
- `src/components` contains components in individual folders with colocated tests. `src/lib` and `src/types` are reserved for shared utilities and types.

## Future improvements

- Localization is a possible future extension; none is configured now.
- compressed videos
- 

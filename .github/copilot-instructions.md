# Project Instructions

- Use Next.js App Router, strict TypeScript, Tailwind CSS, ESLint, and npm. Keep Server Components by default; use Client Components only when necessary.
- Consult the installed Next.js documentation in `node_modules/next/dist/docs/` for version-specific behavior.
- Source page content from local JSON in `src/data`. Do not add a separate translation or messages system.
- Use the CSS theme tokens and Tailwind's existing type and spacing scales for styling; do not hardcode design values in components. Define new design values in `src/styles/tokens.css`.
- Design mobile-first: unprefixed utilities are mobile, `tablet:` starts at 810px, and `desktop:` starts at 1200px. Define breakpoints only in the theme.
- Give each component its own folder under `src/components` and colocate its `Component.test.tsx` test.
- Use semantic HTML, keyboard-accessible controls, visible focus, and appropriate ARIA semantics and states for menus, accordions, and carousels.
- Use `next/image` for images, with explicit dimensions or a sized `fill` container. Use image `priority` or preload only for the hero when needed.
- Keep client JavaScript and assets lean; aim for mobile Lighthouse performance of at least 90.
- Record each user correction to AI output in `NOTES.md` for later use in the README.
- Run `npm run lint`, `npm run typecheck`, and `npm test` for relevant changes.
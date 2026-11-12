---
applyTo: "src/types/**,src/lib/**,src/data/**"
---

# Types and data validation

- All types live in `src/types/`, split by domain (`media`, `ui`, `layout`, `carousel`, `cards`, `gallery`, `banner`, `category`, `product`, `sections`, `pages`, `site`) and re-exported from `src/types/index.ts`. Import them from `@/types`.
- A component file holds only its own `XProps` type. Every other type, including shared shapes such as images and links, goes in `src/types/`. Reuse an existing shape before adding a near copy. `src/types/` imports nothing from `components` or `helpers`.
- Allowed values (categories, section types, showcase layouts, card types and variants, button variants, carousel modes, gallery spans, text tones) are defined once as `as const` arrays in the `src/types/` file for their domain; types are derived from them.
- Sections are a discriminated union on `component`.
- The JSON-to-type cast happens only in the `readContent` helper in `src/lib/api/shared.ts`. No `any`, no casts elsewhere.
- `src/lib/api/data.test.ts` validates the loaded data through the loaders, not the raw files:
  - allowed values for section types, categories and layouts
  - valid references (e.g. a hero's `productSlug` must exist, and that product must have `heroImage`)
- When adding a new allowed value, update the `as const` array first and let the types follow.
- When a type or a JSON key changes, update `src/data/README.md` in the same commit.

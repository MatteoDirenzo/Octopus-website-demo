import type { SectionViewProps } from "../types";

/** Placeholder for a category showcase. Banner layout hides its header in the real UI. */
export function CategoryShowcase({
  section,
}: SectionViewProps<"categoryShowcase">) {
  return <section aria-label={section.type}>{section.type}</section>;
}

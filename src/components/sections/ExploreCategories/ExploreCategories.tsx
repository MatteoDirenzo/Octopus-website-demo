import type { SectionViewProps } from "../types";

/** Placeholder for the category links block. */
export function ExploreCategories({
  section,
}: SectionViewProps<"exploreCategories">) {
  return <section aria-label={section.type}>{section.type}</section>;
}

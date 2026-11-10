import type { SectionViewProps } from "../types";

/** Placeholder for the product media and buy panel. */
export function ProductShowcase({
  section,
}: SectionViewProps<"productShowcase">) {
  return <section aria-label={section.type}>{section.type}</section>;
}

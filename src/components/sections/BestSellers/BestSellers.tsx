import type { SectionViewProps } from "../types";

/** Placeholder for the best sellers block. */
export function BestSellers({ section }: SectionViewProps<"bestSellers">) {
  return <section aria-label={section.type}>{section.type}</section>;
}

import type { SectionViewProps } from "../types";

/** Placeholder for the specification accordion. */
export function SpecAccordion({ section }: SectionViewProps<"specAccordion">) {
  return <section aria-label={section.type}>{section.type}</section>;
}

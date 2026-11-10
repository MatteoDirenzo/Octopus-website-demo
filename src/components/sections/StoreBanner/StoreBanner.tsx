import type { SectionViewProps } from "../types";

/** Placeholder for the find-us banner. */
export function StoreBanner({ section }: SectionViewProps<"storeBanner">) {
  return <section aria-label={section.type}>{section.type}</section>;
}

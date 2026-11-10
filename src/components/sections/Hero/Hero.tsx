import type { SectionViewProps } from "../types";

/** Placeholder for the hero. The video player is later work. */
export function Hero({ section }: SectionViewProps<"hero">) {
  return <section aria-label={section.type}>{section.type}</section>;
}

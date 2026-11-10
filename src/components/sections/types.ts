import type { Product, Section, SectionType } from "@/types/content";

/** Props for a registered section. Product-page sections require the loaded product. */
export type SectionViewProps<T extends SectionType> = T extends
  | "productShowcase"
  | "specAccordion"
  ? { section: Extract<Section, { type: T }>; product: Product }
  : { section: Extract<Section, { type: T }>; product?: Product };

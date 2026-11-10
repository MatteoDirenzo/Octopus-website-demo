import type { ReactNode } from "react";
import type { Product, Section, SectionType } from "@/types/content";
import { BestSellers } from "./BestSellers/BestSellers";
import { CategoryShowcase } from "./CategoryShowcase/CategoryShowcase";
import { ExploreCategories } from "./ExploreCategories/ExploreCategories";
import { Hero } from "./Hero/Hero";
import { ProductShowcase } from "./ProductShowcase/ProductShowcase";
import { SpecAccordion } from "./SpecAccordion/SpecAccordion";
import { StoreBanner } from "./StoreBanner/StoreBanner";
import type { SectionViewProps } from "./types";

type SectionRegistry = {
  [K in SectionType]: (props: SectionViewProps<K>) => ReactNode;
};

/** Every section type has one component. A missing key fails the build. */
export const sectionRegistry = {
  hero: Hero,
  bestSellers: BestSellers,
  categoryShowcase: CategoryShowcase,
  exploreCategories: ExploreCategories,
  storeBanner: StoreBanner,
  productShowcase: ProductShowcase,
  specAccordion: SpecAccordion,
} satisfies SectionRegistry;

/**
 * Renders one section through the registry.
 * Product-only sections throw when the loaded product is missing.
 */
export function renderSection(section: Section, product?: Product): ReactNode {
  switch (section.type) {
    case "hero":
      return sectionRegistry.hero({ section, product });
    case "bestSellers":
      return sectionRegistry.bestSellers({ section, product });
    case "categoryShowcase":
      return sectionRegistry.categoryShowcase({ section, product });
    case "exploreCategories":
      return sectionRegistry.exploreCategories({ section, product });
    case "storeBanner":
      return sectionRegistry.storeBanner({ section, product });
    case "productShowcase":
    case "specAccordion": {
      if (!product) {
        throw new Error(`Section ${section.type} requires a product`);
      }

      return section.type === "productShowcase"
        ? sectionRegistry.productShowcase({ section, product })
        : sectionRegistry.specAccordion({ section, product });
    }
    default: {
      const unreachable: never = section;
      throw new Error(`Unregistered section: ${JSON.stringify(unreachable)}`);
    }
  }
}

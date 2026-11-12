import {
  CategoryShowcase as CategoryShowcaseLayout,
  type CategoryShowcaseCard,
} from "@/components/CategoryShowcase";
import {
  getCategory,
  getProductsByCategory,
  getSite,
  splitCategoryProducts,
} from "@/lib/api";
import type { Product } from "@/types/content";
import type { SectionViewProps } from "../types";

/**
 * Loads a category showcase and passes the heading and cards into the shared
 * layout. `feature-top` and `feature-left` use the same product selection.
 * `row` passes the category products as small cards and omits the feature card.
 * `banner` stays as a placeholder.
 */
export async function CategoryShowcase({
  section,
}: SectionViewProps<"categoryShowcase">) {
  if (section.layout === "banner") {
    return <section aria-label={section.type}>{section.type}</section>;
  }

  const [category, products, site] = await Promise.all([
    getCategory(section.category),
    getProductsByCategory(section.category),
    getSite(),
  ]);

  if (!category) {
    return null;
  }

  const titleId = `${section.type}-${section.category}`;
  const label = site.learnMore.label;
  const button = { label: site.exploreAll.label, href: category.href };

  if (section.layout === "row") {
    const visible =
      section.limit === undefined
        ? products
        : products.slice(0, section.limit);

    return (
      <CategoryShowcaseLayout
        titleId={titleId}
        title={category.title}
        subtitle={category.tagline}
        button={button}
        cards={visible.map((product) => toCard(product, label))}
      />
    );
  }

  const { feature, cards } = splitCategoryProducts(products, section.limit);

  return (
    <CategoryShowcaseLayout
      layout={section.layout}
      titleId={titleId}
      title={category.title}
      subtitle={category.tagline}
      button={button}
      feature={feature ? toCard(feature, label) : undefined}
      cards={cards.map((product) => toCard(product, label))}
    />
  );
}

/** Card copy for one product. The link uses the shared learn-more label. */
function toCard(product: Product, label: string): CategoryShowcaseCard {
  return {
    title: product.name,
    description: product.shortDescription,
    image: product.image,
    cta: {
      label,
      href: `/product/${product.slug}`,
    },
  };
}

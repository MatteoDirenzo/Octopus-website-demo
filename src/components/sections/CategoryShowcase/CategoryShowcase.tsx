import { CardLarge } from "@/components/CardLarge";
import { CardMedium } from "@/components/CardMedium";
import { Heading } from "@/components/Heading";
import {
  getCategory,
  getProductsByCategory,
  getSite,
  splitCategoryProducts,
} from "@/lib/api";
import type { SectionViewProps } from "../types";

/**
 * `feature-top` category block. The heading sits 40px above the cards, and
 * 80px from 1200. Cards are 16px apart, and 24px from 1200. The section pads
 * 40px, 16px, and 80px below 810; 80px, 32px, and 40px from 810; and 60px,
 * 128px, and 180px from 1200. The feature card is a horizontal large card.
 * The other cards are vertical medium cards, stacked below 810 and in one
 * row from 810. Other layouts stay as a placeholder.
 */
export async function CategoryShowcase({
  section,
}: SectionViewProps<"categoryShowcase">) {
  if (section.layout !== "feature-top") {
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

  const { feature, cards } = splitCategoryProducts(products, section.limit);
  const titleId = `${section.type}-${section.category}`;

  return (
    <section
      aria-labelledby={titleId}
      className="px-4 pt-10 pb-20 tablet:px-8 tablet:pt-20 tablet:pb-10 desktop:px-32 desktop:pt-15 desktop:pb-45"
    >
      <div className="flex w-full min-w-0 flex-col gap-10 desktop:gap-20">
        <Heading
          variant="secondary"
          titleId={titleId}
          title={category.title}
          subtitle={category.tagline}
          button={{ label: site.exploreAll.label, href: category.href }}
        />
        {feature ? (
          <div className="flex w-full min-w-0 flex-col gap-4 desktop:gap-6">
            <CardLarge
              variant="horizontal"
              title={feature.name}
              description={feature.shortDescription}
              image={feature.image}
              cta={{
                label: site.learnMore.label,
                href: `/product/${feature.slug}`,
              }}
            />
            {cards.length > 0 ? (
              <div className="flex min-w-0 flex-col gap-4 tablet:flex-row desktop:gap-6">
                {cards.map((product) => (
                  <div key={product.id} className="min-w-0 flex-1">
                    <CardMedium
                      variant="vertical"
                      title={product.name}
                      description={product.shortDescription}
                      image={product.image}
                      cta={{
                        label: site.learnMore.label,
                        href: `/product/${product.slug}`,
                      }}
                    />
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}

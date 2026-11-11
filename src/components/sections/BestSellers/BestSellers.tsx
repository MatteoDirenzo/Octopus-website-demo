import { CardLarge } from "@/components/CardLarge";
import { Carousel } from "@/components/Carousel";
import { getBestSellers, getCategories, getSite } from "@/lib/api";
import type { SectionViewProps } from "../types";

/**
 * Best sellers in file order. One large card is fully in view. The next card
 * peeks past the inset: 10% below 810, 20% from 810, and 40% from 1200.
 */
export async function BestSellers({ section }: SectionViewProps<"bestSellers">) {
  const [products, categories, site] = await Promise.all([
    getBestSellers(),
    getCategories(),
    getSite(),
  ]);

  return (
    <Carousel
      title={section.title}
      mode="overflow"
      visible={{ mobile: 1, tablet: 1, desktop: 1 }}
      peek={{ mobile: 10, tablet: 20, desktop: 40 }}
      inset={{ mobile: 4, tablet: 20, desktop: 32 }}
      endOffset={{ mobile: 4, tablet: 20, desktop: 32 }}
      className="pt-20 pb-10 tablet:py-8 desktop:pt-30 desktop:pb-15"
    >
      {products.map((product) => {
        const category = categories.find((item) => item.id === product.category);

        return (
          <CardLarge
            key={product.id}
            variant="horizontal"
            eyebrow={category?.title}
            title={product.name}
            description={product.shortDescription}
            image={product.image}
            cta={{
              label: site.learnMore.label,
              href: `/product/${product.slug}`,
            }}
          />
        );
      })}
    </Carousel>
  );
}

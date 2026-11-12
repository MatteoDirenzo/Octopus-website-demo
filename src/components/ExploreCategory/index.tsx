import { useId } from "react";
import { ProductCard } from "@/components/ProductCard";
import type { ExploreCategoryCard } from "@/types";

export type ExploreCategoryProps = {
  title: string;
  /** Category cards. The grid is built for four: two columns, then one row from 810. */
  cards: ExploreCategoryCard[];
};

/**
 * Category row. The title is an `h2` on the h3 scale. There is no `h3-l`
 * token: H3/L is `h2-s` (32px, 110%, 700). Card gaps are 16px across and 24px
 * down on mobile, 16px from 810, and 24px from 1200. The title sits 32px above
 * the grid. The width comes from the parent.
 */
export function ExploreCategory({ title, cards }: ExploreCategoryProps) {
  const titleId = useId();

  return (
    <section
      aria-labelledby={titleId}
      className="flex w-full min-w-0 flex-col gap-8"
    >
      <h2
        id={titleId}
        className="text-h3-s text-text tablet:text-h3-m desktop:text-h2-s"
      >
        {title}
      </h2>
      <ul className="grid grid-cols-2 gap-x-4 gap-y-6 tablet:grid-cols-4 tablet:gap-4 desktop:gap-6">
        {cards.map((card) => (
          <li key={`${card.href}-${card.label}`} className="min-w-0">
            <ProductCard
              image={card.image}
              href={card.href}
              label={card.label}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

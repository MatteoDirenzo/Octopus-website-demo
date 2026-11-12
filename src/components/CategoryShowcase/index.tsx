import clsx from "clsx";
import { CardLarge } from "@/components/CardLarge";
import { CardMedium } from "@/components/CardMedium";
import { CardSmall } from "@/components/CardSmall";
import { Heading } from "@/components/Heading";
import type {
  CategoryShowcaseCard,
  Cta,
  FeatureShowcaseLayout,
} from "@/types";

export type CategoryShowcaseProps = {
  /**
   * `feature-top` puts a horizontal feature card above a row of medium cards.
   * `feature-left` puts a vertical feature card on the left from 1200.
   */
  layout?: FeatureShowcaseLayout;
  /** Id of the title, so the section can name itself from this heading. */
  titleId: string;
  title: string;
  subtitle?: string;
  /** Category link beside the heading. Omit it when the block has none. */
  button?: Cta;
  /** Large feature card. Omit it to render the small-card row. */
  feature?: CategoryShowcaseCard;
  /**
   * Medium cards under a feature card, or small cards when there is no feature.
   * Display order.
   */
  cards?: CategoryShowcaseCard[];
};

/**
 * Category block with a heading, an optional feature card, and the other cards.
 * `feature-top` is the default: a horizontal large card, then vertical medium
 * cards stacked below 810 and in one row from 810.
 * `feature-left` uses that same stack below 1200. From 1200 the columns are
 * equal width. The horizontal medium cards keep their own height and set the
 * row. The vertical feature card is taken out of flow and stretched to that
 * height, so both columns end on one baseline. Both variants already fall
 * back below 1200, so the large card becomes a horizontal row and a horizontal
 * medium card stays vertical.
 * Omit `feature` to render the cards as small cards, stacked below 810 and in
 * one row from 810.
 * The heading sits 40px above the cards, and 80px from 1200. Cards are 16px
 * apart, and 24px from 1200. The page block owns the section padding.
 */
export function CategoryShowcase({
  layout = "feature-top",
  titleId,
  title,
  subtitle,
  button,
  feature,
  cards = [],
}: CategoryShowcaseProps) {
  const featureLeft = layout === "feature-left";
  const matchStack = featureLeft && cards.length > 0;

  return (
    <section aria-labelledby={titleId}>
      <div className="flex w-full min-w-0 flex-col gap-10 desktop:gap-20">
        <Heading
          variant="secondary"
          titleId={titleId}
          title={title}
          subtitle={subtitle}
          button={button}
        />
        {feature ? (
          <div
            className={clsx(
              "flex w-full min-w-0 flex-col gap-4 desktop:gap-6",
              matchStack && "desktop:grid desktop:grid-cols-2",
            )}
          >
            <div className={clsx("min-w-0 w-full", matchStack && "desktop:relative")}>
              <div className={clsx(matchStack && "desktop:absolute desktop:inset-0")}>
                <CardLarge
                  variant={featureLeft ? "vertical" : "horizontal"}
                  fill={matchStack}
                  title={feature.title}
                  description={feature.description}
                  image={feature.image}
                  background={feature.background}
                  cta={feature.cta}
                />
              </div>
            </div>
            {cards.length > 0 ? (
              <div
                className={clsx(
                  "flex min-w-0 flex-col gap-4 tablet:flex-row desktop:gap-6",
                  featureLeft && "desktop:flex-col",
                )}
              >
                {cards.map((card) => (
                  <div
                    key={card.cta.href}
                    className={clsx(
                      "min-w-0 flex-1",
                      featureLeft && "desktop:flex-none",
                    )}
                  >
                    <CardMedium
                      variant={featureLeft ? "horizontal" : "vertical"}
                      title={card.title}
                      description={card.description}
                      image={card.image}
                      cta={card.cta}
                    />
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        ) : cards.length > 0 ? (
          <div className="flex min-w-0 flex-col gap-4 tablet:flex-row desktop:gap-6">
            {cards.map((card) => (
              <div key={card.cta.href} className="min-w-0 flex-1">
                <CardSmall
                  title={card.title}
                  description={card.description}
                  image={card.image}
                  cta={card.cta}
                />
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

import clsx from "clsx";
import Image from "next/image";
import placeholder from "@/assets/images/placeholder.webp";

export type BentoImage = {
  /** Path or URL of the image file. */
  src: string;
  /**
   * Accessible description. Pass an empty string when the photo is decorative.
   */
  alt: string;
};

export type BentoCard = {
  title: string;
  description: string;
  /** Background photo. Omit it to use the shared placeholder. */
  image?: BentoImage;
};

/** One full-width card, or two equal cards, from 1200. */
export type BentoRow = readonly [BentoCard] | readonly [BentoCard, BentoCard];

export type BentoBoxProps = {
  /**
   * Each row is one card or two cards at desktop.
   * Below 1200 every card stacks in this order.
   */
  rows: readonly BentoRow[];
};

/**
 * Simple highlight cards. The parent decides which rows are one card and
 * which are two. Desktop keeps that row: a single card is 325px and
 * vertically centered, a pair is 456px with the copy at the top. Tablet and
 * mobile stack every card at 477px. `flex-1` starts at desktop: on a column
 * it would replace that fixed height. A missing image uses the shared placeholder.
 * The width comes from the parent.
 */
export function BentoBox({ rows }: BentoBoxProps) {
  return (
    <div className="flex w-full min-w-0 flex-col gap-4">
      {rows.map((row, rowIndex) => {
        const paired = row.length === 2;

        return (
          <div
            key={rowIndex}
            className="flex min-w-0 flex-col gap-4 desktop:flex-row"
          >
            {row.map((card, cardIndex) => {
              const image = card.image ?? { src: placeholder, alt: "" };

              return (
                <article
                  key={`${card.title}-${rowIndex}-${cardIndex}`}
                  className={clsx(
                    "relative w-full min-w-0 overflow-hidden rounded-card desktop:flex-1",
                    "h-bento tablet:h-bento-tablet",
                    paired
                      ? "desktop:h-bento-vertical"
                      : "desktop:h-bento-horizontal",
                  )}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes={
                      paired ? "(min-width: 1200px) 50vw, 100vw" : "100vw"
                    }
                    className="object-cover"
                  />
                  <div
                    className={clsx(
                      "relative flex h-full w-full min-w-0 flex-col gap-1 items-center p-8 text-center",
                      "tablet:px-10 tablet:py-12",
                      paired
                        ? "desktop:items-start desktop:px-8 desktop:py-10 desktop:text-left"
                        : "desktop:items-start desktop:justify-center desktop:px-10 desktop:py-0 desktop:text-left",
                    )}
                  >
                    <h3 className="max-w-full text-title-bold-thinner text-text tablet:text-h3-m desktop:text-title-bold-thinner">
                      {card.title}
                    </h3>
                    <p className="max-w-full text-body text-text-muted tablet:text-subtitle-m desktop:text-body">
                      {card.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

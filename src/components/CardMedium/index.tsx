import clsx from "clsx";
import Image from "next/image";
import { Button } from "@/components/Button";
import { cardSizes } from "@/helpers/components/card";
import type { CardVariant, Cta, ImageAsset } from "@/types";

export type CardMediumProps = {
  /** Vertical at every breakpoint, or horizontal from 1200. */
  variant: CardVariant;
  title: string;
  description: string;
  image: ImageAsset;
  /**
   * Paint `image` across the card, behind the copy.
   * Use this for a product `featuredImage`. The copy keeps its place.
   */
  background?: boolean;
  cta: Cta;
};

/**
 * Medium highlight card. Copy comes first in the DOM, so a row puts the image
 * on the right. Horizontal is desktop only, so below 1200 it uses the vertical layout.
 * The card is not a link. The width comes from the parent.
 * `background` paints `image` across the card and leaves the copy where it
 * is. Otherwise the picture sits in a slot: the leftover height in a column,
 * and at most half the card (capped at the card-image width) in a row.
 */
export function CardMedium({
  variant,
  title,
  description,
  image,
  background = false,
  cta,
}: CardMediumProps) {
  const sizes = cardSizes("medium", variant, background);

  return (
    <article
      className={clsx(
        "flex w-full min-w-0 justify-between overflow-hidden rounded-card bg-surface-hover",
        background && "relative",
        "h-card-medium flex-col px-6 pt-16 pb-0",
        "tablet:h-card-medium-tablet tablet:px-20",
        variant === "vertical" && "desktop:h-card-medium-desktop",
        variant === "horizontal" &&
          "desktop:h-card-medium-horizontal desktop:flex-row desktop:items-stretch desktop:pt-0 desktop:pr-0 desktop:pl-10",
      )}
    >
      {background ? (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          className="pointer-events-none object-cover"
        />
      ) : null}
      <div
        className={clsx(
          "flex min-w-0 w-full shrink-0 flex-col items-center text-center",
          background && "relative",
          variant === "horizontal" &&
            "desktop:w-auto desktop:max-w-1/2 desktop:shrink desktop:items-start desktop:justify-center desktop:self-stretch desktop:text-left",
        )}
      >
        <h3 className="max-w-full text-h3-s text-text desktop:text-h2-s">
          {title}
        </h3>
        <p className="mt-4 max-w-full text-body text-text-muted desktop:text-subtitle-m">
          {description}
        </p>
        <Button variant="primary" href={cta.href} className="mt-6 desktop:mt-8">
          {cta.label}
        </Button>
      </div>
      {background ? null : (
        <div
          className={clsx(
            "relative min-h-0 w-full flex-1",
            variant === "horizontal" &&
              "desktop:h-full desktop:w-1/2 desktop:max-w-card-image desktop:flex-none",
          )}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes={sizes}
            className="object-contain"
          />
        </div>
      )}
    </article>
  );
}

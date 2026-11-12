import clsx from "clsx";
import Image from "next/image";
import { Button } from "@/components/Button";

export type CardImage = {
  /** Path or URL of the image file. */
  src: string;
  /** Accessible description. */
  alt: string;
  /** Pixel width used to keep the ratio. */
  width: number;
  /** Pixel height used to keep the ratio. */
  height: number;
};

export type CardCta = {
  /** Accessible name of the action. */
  label: string;
  /** Destination of the action. */
  href: string;
};

export type CardLargeVariant = "horizontal" | "vertical";

export type CardLargeProps = {
  /** Horizontal at every breakpoint, or vertical from 1200. */
  variant: CardLargeVariant;
  /**
   * From 1200, a vertical card fills its parent instead of the fixed height.
   * The image uses the space under the copy. Ignored on the horizontal variant.
   */
  fill?: boolean;
  /** Short label above the title. Omit when the card has none. */
  eyebrow?: string;
  title: string;
  description: string;
  image: CardImage;
  /**
   * Paint `image` across the card, behind the copy.
   * Use this for a product `featuredImage`. The copy keeps its place.
   */
  background?: boolean;
  cta: CardCta;
};

/**
 * Large highlight card. Copy comes first in the DOM, so the horizontal row
 * keeps the text on the left and the image on the right. The image side has
 * no padding. Vertical is desktop only, so below 1200 it uses that row.
 * The card is not a link. The width comes from the parent. `fill` lets a
 * vertical card match a sibling stack instead of the fixed desktop height.
 * `background` paints `image` across the card. The copy stays in its place:
 * from 810 the row keeps it in the left half, so a long line does not cross
 * the picture. Otherwise the picture sits in a slot: the leftover height in
 * a column, and at most half the card (capped at the card-image width) in a row.
 */
export function CardLarge({
  variant,
  fill = false,
  eyebrow,
  title,
  description,
  image,
  background = false,
  cta,
}: CardLargeProps) {
  // 31rem matches `--container-card-image`. The sizes attribute cannot read it.
  const sizes = background
    ? variant === "vertical"
      ? "(min-width: 1200px) 40vw, 90vw"
      : "(min-width: 810px) 80vw, 90vw"
    : variant === "vertical"
      ? "(min-width: 1200px) 50vw, (min-width: 810px) 31rem, 80vw"
      : "(min-width: 810px) 31rem, 80vw";

  return (
    <article
      className={clsx(
        "flex w-full min-w-0 justify-between overflow-hidden rounded-card bg-surface-hover",
        background && "relative",
        "h-card-large flex-col px-10 pt-6 pb-0",
        "tablet:h-card-large-tablet tablet:flex-row tablet:items-stretch tablet:pt-0 tablet:pr-0 tablet:pb-0 tablet:pl-10",
        variant === "horizontal" && "desktop:h-card-large-desktop desktop:pl-20",
        variant === "vertical" &&
          "desktop:flex-col desktop:px-16 desktop:pt-card-large-vertical-y desktop:pb-0",
        variant === "vertical" &&
          (fill
            ? "desktop:h-full desktop:min-h-0"
            : "desktop:h-card-large-vertical"),
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
          "flex min-w-0 flex-col",
          background && "relative",
          "order-1 w-full shrink-0 items-center text-center",
          "tablet:w-auto tablet:max-w-1/2 tablet:shrink tablet:items-start tablet:justify-center tablet:self-stretch tablet:text-left",
          variant === "vertical" &&
            "desktop:order-1 desktop:w-full desktop:max-w-none desktop:shrink-0 desktop:items-center desktop:justify-start desktop:text-center",
        )}
      >
        {eyebrow ? (
          <p className="mb-2 text-label text-brand">{eyebrow}</p>
        ) : null}
        <h3 className="max-w-full text-h3-s text-text tablet:text-h3-m desktop:text-h2-s">
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
            "relative order-2 min-h-0 w-full flex-1",
            "tablet:h-full tablet:w-1/2 tablet:max-w-card-image tablet:flex-none",
            variant === "vertical" &&
              "desktop:h-auto desktop:w-full desktop:max-w-none desktop:flex-1",
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

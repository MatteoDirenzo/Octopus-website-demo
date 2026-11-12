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
  cta: CardCta;
};

/**
 * Large highlight card. Copy comes first in the DOM, so the horizontal row
 * keeps the text on the left and the image on the right. The image side has
 * no padding. Vertical is desktop only, so below 1200 it uses that row.
 * The card is not a link. The width comes from the parent. `fill` lets a
 * vertical card match a sibling stack instead of the fixed desktop height.
 */
export function CardLarge({
  variant,
  fill = false,
  eyebrow,
  title,
  description,
  image,
  cta,
}: CardLargeProps) {
  return (
    <article
      className={clsx(
        "flex w-full min-w-0 justify-between overflow-hidden rounded-card bg-surface-hover",
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
      <div
        className={clsx(
          "flex min-w-0 flex-col",
          "order-1 w-full shrink-0 items-center text-center",
          "tablet:w-auto tablet:shrink tablet:items-start tablet:justify-center tablet:self-stretch tablet:text-left",
          variant === "vertical" &&
            "desktop:order-1 desktop:w-full desktop:shrink-0 desktop:items-center desktop:justify-start desktop:text-center",
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
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes="100vw"
        className={clsx(
          "order-2 h-auto w-full min-w-0",
          "tablet:h-full tablet:w-auto tablet:max-w-card-image tablet:shrink-0 tablet:object-contain",
          variant === "vertical" &&
            "desktop:order-2 desktop:w-full desktop:max-w-none",
          variant === "vertical" &&
            (fill
              ? "desktop:h-auto desktop:min-h-0 desktop:flex-1 desktop:object-contain desktop:object-bottom"
              : "desktop:h-auto"),
        )}
      />
    </article>
  );
}

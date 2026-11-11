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

export type CardMediumVariant = "vertical" | "horizontal";

export type CardMediumProps = {
  /** Vertical at every breakpoint, or horizontal from 1200. */
  variant: CardMediumVariant;
  title: string;
  description: string;
  image: CardImage;
  cta: CardCta;
};

/**
 * Medium highlight card. Copy comes first in the DOM, so a row puts the image
 * on the right. Horizontal is desktop only, so below 1200 it uses the vertical layout.
 * The card is not a link. The width comes from the parent.
 */
export function CardMedium({
  variant,
  title,
  description,
  image,
  cta,
}: CardMediumProps) {
  return (
    <article
      className={clsx(
        "flex w-full min-w-0 justify-between overflow-hidden rounded-card bg-surface-hover",
        "h-card-medium flex-col px-6 pt-16 pb-0",
        "tablet:h-card-medium-tablet tablet:px-20",
        variant === "vertical" && "desktop:h-card-medium-desktop",
        variant === "horizontal" &&
          "desktop:h-card-medium-horizontal desktop:flex-row desktop:items-stretch desktop:pt-0 desktop:pr-0 desktop:pl-10",
      )}
    >
      <div
        className={clsx(
          "flex min-w-0 flex-col w-full shrink-0 items-center text-center",
          variant === "horizontal" &&
            "desktop:w-auto desktop:shrink desktop:items-start desktop:justify-center desktop:self-stretch desktop:text-left",
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
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes="100vw"
        className={clsx(
          "h-auto w-full min-w-0",
          variant === "horizontal" &&
            "desktop:h-full desktop:w-auto desktop:max-w-card-image desktop:shrink-0 desktop:object-contain",
        )}
      />
    </article>
  );
}

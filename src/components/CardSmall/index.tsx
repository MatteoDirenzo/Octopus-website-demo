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

export type CardSmallProps = {
  title: string;
  description: string;
  image: CardImage;
  cta: CardCta;
};

/**
 * Small highlight card. Copy comes first in the DOM. `order` puts the image
 * on top from 810, capped at half the card so it does not cover the text.
 * The card is not a link. The width comes from the parent.
 */
export function CardSmall({ title, description, image, cta }: CardSmallProps) {
  return (
    <article
      className={clsx(
        "flex w-full min-w-0 justify-between overflow-hidden rounded-card bg-surface-hover",
        "h-card-small flex-col px-6 pt-10 pb-0",
        "tablet:h-card-small-tablet tablet:px-6 tablet:pt-0 tablet:pb-6",
        "desktop:h-card-small-desktop desktop:px-10 desktop:pb-10",
      )}
    >
      <div className="order-1 flex min-w-0 w-full shrink-0 flex-col items-center text-center tablet:order-2 tablet:items-start tablet:text-left">
        <h3 className="max-w-full text-title-bold text-text tablet:text-title-bold-thinner desktop:text-title-bold">
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
        className="order-2 h-auto w-full min-w-0 tablet:order-1 tablet:max-h-1/2 tablet:min-h-0 tablet:object-contain"
      />
    </article>
  );
}

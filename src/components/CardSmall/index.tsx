import clsx from "clsx";
import Image from "next/image";
import { Button } from "@/components/Button";
import { CtaLabel } from "@/components/CtaLabel";
import { CARD_SIZES } from "@/config/sizes";
import type { Cta, ImageAsset } from "@/types";

export type CardSmallProps = {
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
 * Small highlight card. Copy comes first in the DOM. `order` puts the image
 * on top from 810. The picture uses the height left beside the copy, so it
 * cannot cover the text. The card is not a link. The width comes from the parent.
 * `background` paints `image` across the card. From 810 the copy stays at
 * the bottom, which `mt-auto` holds once the picture leaves the flow.
 */
export function CardSmall({
  title,
  description,
  image,
  background = false,
  cta,
}: CardSmallProps) {
  const sizes = CARD_SIZES.small;

  return (
    <article
      className={clsx(
        "flex w-full min-w-0 justify-between overflow-hidden rounded-card bg-surface-hover",
        background && "relative",
        "h-card-small flex-col px-6 pt-10 pb-0",
        "tablet:h-card-small-tablet tablet:px-6 tablet:pt-0 tablet:pb-6",
        "desktop:h-card-small-desktop desktop:px-10 desktop:pb-10",
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
          "order-1 flex min-w-0 w-full shrink-0 flex-col items-center text-center tablet:order-2 tablet:items-start tablet:text-left",
          background && "relative tablet:mt-auto",
        )}
      >
        <h3 className="max-w-full text-title-bold text-text tablet:text-title-bold-thinner desktop:text-title-bold">
          {title}
        </h3>
        <p className="mt-4 max-w-full text-body text-text-muted desktop:text-subtitle-m">
          {description}
        </p>
        <Button variant="primary" href={cta.href} className="mt-6 desktop:mt-8">
          <CtaLabel label={cta.label} context={cta.context} />
        </Button>
      </div>
      {background ? null : (
        <div className="relative order-2 min-h-0 w-full flex-1 tablet:order-1">
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

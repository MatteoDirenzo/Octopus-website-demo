import Image from "next/image";
import type { ReactNode } from "react";
import { Button } from "@/components/Button";
import type { Variant } from "@/helpers/components/button";

export type BannerImage = {
  /** Path or URL of the image file. */
  src: string;
  /**
   * Accessible description. Pass an empty string when the photo is decorative.
   */
  alt: string;
};

export type BannerCta = {
  /** Accessible name of the action. */
  label: string;
  /** Destination of the action. */
  href: string;
};

type BannerFrame = {
  image: BannerImage;
  /** Set only when this banner is the page hero. */
  priority?: boolean;
};

type BannerCopy = BannerFrame & {
  title: string;
  subtitle: string;
  cta: BannerCta;
  /** Button visual style. Defaults to `primary`. */
  variant?: Variant;
  /** Id of the title, so a section can name itself from this heading. */
  titleId?: string;
};

type BannerCustom = BannerFrame & {
  /** Replaces the title, subtitle, and button. The frame alignment stays. */
  children: ReactNode;
};

export type BannerProps = BannerCopy | BannerCustom;

/**
 * Full-width promo frame. The image fills the frame. Copy is left aligned,
 * at the top on mobile and vertically centered from 810. From 810 the copy
 * column is half the padded width so it stays off the subject on the right.
 * Pass `children` to replace the title, subtitle, and button.
 * The width comes from the parent.
 */
export function Banner(props: BannerProps) {
  const { image, priority = false } = props;

  return (
    <article className="relative h-banner w-full min-w-0 overflow-hidden tablet:h-banner-tablet desktop:h-banner-desktop">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="100vw"
        priority={priority}
        className="object-cover object-bottom tablet:object-right"
      />
      <div className="relative flex h-full flex-col items-start px-4 py-20 tablet:justify-center tablet:px-8 tablet:py-0 desktop:px-12">
        <div className="flex w-full min-w-0 flex-col items-start tablet:w-1/2">
          {"children" in props ? (
            props.children
          ) : (
            <>
              <h2
                id={props.titleId}
                className="max-w-full text-h2-s text-text tablet:text-h2-m desktop:text-h2-l"
              >
                {props.title}
              </h2>
              <p className="mt-4 max-w-full text-subtitle-s text-text-muted tablet:text-subtitle-m desktop:text-subtitle-l">
                {props.subtitle}
              </p>
              <Button
                variant={props.variant}
                href={props.cta.href}
                className="mt-8"
              >
                {props.cta.label}
              </Button>
            </>
          )}
        </div>
      </div>
    </article>
  );
}

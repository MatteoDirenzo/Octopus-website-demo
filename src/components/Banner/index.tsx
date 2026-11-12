import clsx from "clsx";
import Image, { getImageProps } from "next/image";
import type { ReactNode } from "react";
import { Button } from "@/components/Button";
import type { Variant } from "@/helpers/components/button";
import { responsiveImages } from "@/helpers/components/image";
import type { BannerImages } from "@/types/content";

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
  /** One file, or a base path whose crops are `-desktop`, `-mobile`, and `-tablet`. */
  image: BannerImage | BannerImages;
  /** Set only when this banner is the page hero. */
  priority?: boolean;
};

type BannerCopy = BannerFrame & {
  /** Heading. Omit, with `subtitle`, to show only the button. */
  title?: string;
  /** Line under the title. Omit, with `title`, to show only the button. */
  subtitle?: string;
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
 * Full-width promo frame. The height is fixed. The image covers that
 * frame, anchored to the bottom on mobile and to the right from 810.
 * Copy is centered at the top on mobile, and left aligned from 810.
 * From 810 it is also vertically centered, in a column half the padded
 * width, so it stays off the subject on the right.
 * Pass `children` to replace the title, subtitle, and button.
 * Omit the title and subtitle to show only the button.
 * The width comes from the parent.
 */
export function Banner(props: BannerProps) {
  const { image, priority = false } = props;

  return (
    <article className="relative h-banner w-full min-w-0 overflow-hidden tablet:h-banner-tablet desktop:h-banner-desktop">
      <BannerPicture image={image} priority={priority} />
      <div className="relative flex h-full flex-col items-center px-4 py-20 tablet:items-start tablet:justify-center tablet:px-8 tablet:py-0 desktop:px-12">
        <div className="flex w-full min-w-0 flex-col items-center text-center tablet:w-1/2 tablet:items-start tablet:text-left">
          {"children" in props ? (
            props.children
          ) : (
            <>
              {props.title ? (
                <h2
                  id={props.titleId}
                  className="max-w-full text-h2-s text-text tablet:text-h2-m desktop:text-h2-l"
                >
                  {props.title}
                </h2>
              ) : null}
              {props.subtitle ? (
                <p
                  className={clsx(
                    "max-w-full text-subtitle-s text-text-muted tablet:text-subtitle-m desktop:text-subtitle-l",
                    props.title && "mt-4",
                  )}
                >
                  {props.subtitle}
                </p>
              ) : null}
              <Button
                variant={props.variant}
                href={props.cta.href}
                className={clsx((props.title || props.subtitle) && "mt-8")}
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

/**
 * One file uses `fill`. A crop set uses `responsiveImages`, which adds
 * `-desktop`, `-mobile`, and `-tablet` before the extension, then a `picture`
 * so each breakpoint downloads its own file. The source queries are 810px and
 * 1200px, the same values as `--breakpoint-tablet` and `--breakpoint-desktop`.
 * A media attribute cannot read a CSS variable. Desktop is listed first
 * because the browser uses the first source that matches.
 * `object-cover` fills the fixed frame. The anchor keeps the subject in view.
 */
function BannerPicture({
  image,
  priority,
}: {
  image: BannerImage | BannerImages;
  priority: boolean;
}) {
  const frameClass = "h-full w-full object-cover object-bottom tablet:object-right";

  if (!isBannerImages(image)) {
    return (
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="100vw"
        priority={priority}
        className={frameClass}
      />
    );
  }

  const crops = responsiveImages(image);
  const common = {
    alt: crops.mobile.alt,
    sizes: "100vw",
    priority,
    /*
     * The exported files are already the delivered size.
     * Skip the optimizer so it does not recompress them.
     */
    unoptimized: true,
  };

  const {
    props: { srcSet: desktopSrcSet, src: desktopSrc },
  } = getImageProps({
    ...common,
    width: crops.desktop.width,
    height: crops.desktop.height,
    src: crops.desktop.src,
  });

  const {
    props: { srcSet: tabletSrcSet, src: tabletSrc },
  } = getImageProps({
    ...common,
    width: crops.tablet.width,
    height: crops.tablet.height,
    src: crops.tablet.src,
  });

  const { props: mobileProps } = getImageProps({
    ...common,
    width: crops.mobile.width,
    height: crops.mobile.height,
    src: crops.mobile.src,
  });

  return (
    <picture className="absolute inset-0">
      <source
        media="(min-width: 1200px)"
        srcSet={desktopSrcSet ?? desktopSrc}
      />
      <source media="(min-width: 810px)" srcSet={tabletSrcSet ?? tabletSrc} />
      <img
        {...mobileProps}
        alt={crops.mobile.alt}
        className={frameClass}
      />
    </picture>
  );
}

function isBannerImages(
  image: BannerImage | BannerImages,
): image is BannerImages {
  return "mobile" in image;
}

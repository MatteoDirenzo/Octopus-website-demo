import clsx from "clsx";
import Image from "next/image";
import { Button } from "@/components/Button";
import { MEDIA_DESKTOP, MEDIA_TABLET } from "@/config/breakpoints";
import { SIZES_FULL } from "@/config/sizes";
import { isResponsiveImage } from "@/helpers/components/banner";
import { getCropProps, responsiveImages } from "@/helpers/components/image";
import type {
  BannerCopy,
  BannerCustom,
  ImageSource,
  ResponsiveImage,
} from "@/types";

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
      <div className="relative flex h-full flex-col items-center px-4 py-20 tablet:items-start tablet:justify-center tablet:px-8 tablet:py-0 desktop:px-32">
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
 * so each breakpoint downloads its own file. The source queries come from
 * `@/config/breakpoints`. Desktop is listed first because the browser uses
 * the first source that matches.
 * `object-cover` fills the fixed frame. The anchor keeps the subject in view.
 */
function BannerPicture({
  image,
  priority,
}: {
  image: ImageSource | ResponsiveImage;
  priority: boolean;
}) {
  const frameClass = "h-full w-full object-cover object-bottom tablet:object-right";

  if (!isResponsiveImage(image)) {
    return (
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={SIZES_FULL}
        priority={priority}
        className={frameClass}
      />
    );
  }

  const crops = responsiveImages(image);
  const options = { sizes: SIZES_FULL, priority };
  const desktop = getCropProps(crops.desktop, options);
  const tablet = getCropProps(crops.tablet, options);
  const mobileProps = getCropProps(crops.mobile, options);

  return (
    <picture className="absolute inset-0">
      <source media={MEDIA_DESKTOP} srcSet={desktop.srcSet ?? desktop.src} />
      <source media={MEDIA_TABLET} srcSet={tablet.srcSet ?? tablet.src} />
      <img
        {...mobileProps}
        alt={crops.mobile.alt}
        className={frameClass}
      />
    </picture>
  );
}
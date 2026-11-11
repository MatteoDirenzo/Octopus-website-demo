import clsx from "clsx";
import { Heading } from "@/components/Heading";
import { VideoHero } from "@/components/VideoHero";
import { getProductBySlug, getSite } from "@/lib/api";
import type { SectionViewProps } from "../types";

const TITLE_ID = "hero-title";

/**
 * Home hero. The heading comes from the linked product and sits on the video.
 * The video plays once, with no controls. The frame pulls up under the fixed
 * header. Below 810 the heading clears that header by 29px, with 24px
 * on each side. From 810 it clears the header by 84px, with 32px on
 * each side. From 1200 it is half the frame and centered.
 */
export async function Hero({ section }: SectionViewProps<"hero">) {
  const product = section.productSlug
    ? await getProductBySlug(section.productSlug)
    : null;
  const site = product ? await getSite() : null;

  return (
    <section
      aria-labelledby={product ? TITLE_ID : undefined}
      aria-label={product ? undefined : section.title}
      className={clsx(
        "relative -mt-header grid w-full min-w-0 grid-cols-[minmax(0,1fr)] bg-neutral-muted",
        "tablet:-mt-header-tablet",
      )}
    >
      {/*
       * The empty frame keeps the video at 16:9. The heading can make the
       * row taller, and the video stretches to stay behind it.
       */}
      <div aria-hidden="true" className="col-start-1 row-start-1 aspect-video" />
      <VideoHero
        video={section.video}
        className="col-start-1 row-start-1 h-full min-w-0"
      />
      {product && site ? (
        <Heading
          titleId={TITLE_ID}
          className="z-10 col-start-1 row-start-1 w-full min-w-0 self-start px-6 pt-hero-heading-top tablet:px-8 tablet:pt-hero-heading-top-tablet desktop:w-1/2 desktop:justify-self-center desktop:px-0"
          title={product.name}
          subtitle={product.shortDescription}
          button={{
            label: site.learnMore.label,
            href: `/product/${product.slug}`,
          }}
        />
      ) : null}
    </section>
  );
}

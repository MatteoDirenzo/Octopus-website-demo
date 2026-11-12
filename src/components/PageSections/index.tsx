import clsx from "clsx";
import { Fragment, type CSSProperties, type ReactNode } from "react";
import { Banner } from "@/components/Banner";
import { CardLarge } from "@/components/CardLarge";
import { CardMedium } from "@/components/CardMedium";
import { CardSmall } from "@/components/CardSmall";
import {
  CategoryShowcase,
  type CategoryShowcaseCard,
} from "@/components/CategoryShowcase";
import { Carousel } from "@/components/Carousel";
import { Heading } from "@/components/Heading";
import { ImageHero } from "@/components/ImageHero";
import { getCategories, getProductBySlug, getProductsBySlugs, getSite } from "@/lib/api";
import type {
  BannerBlock,
  BlockSpacing,
  BlockSpacingSide,
  CardType,
  CardVariantName,
  CarouselBlock,
  CategoryShowcaseBlock,
  HeroBlock,
  ImageAsset,
  Product,
  Section,
} from "@/types/content";

/**
 * Padding utilities stay written out so Tailwind can see them.
 * The steps live on the element. `--spacing()` turns a step into a length,
 * the same way the carousel turns its inset into a length.
 */
const SPACING_CLASS = clsx(
  "[--section-pt:--spacing(var(--section-step-pt))]",
  "[--section-pr:--spacing(var(--section-step-pr))]",
  "[--section-pb:--spacing(var(--section-step-pb))]",
  "[--section-pl:--spacing(var(--section-step-pl))]",
  "tablet:[--section-pt-tablet:--spacing(var(--section-step-pt-tablet))]",
  "tablet:[--section-pr-tablet:--spacing(var(--section-step-pr-tablet))]",
  "tablet:[--section-pb-tablet:--spacing(var(--section-step-pb-tablet))]",
  "tablet:[--section-pl-tablet:--spacing(var(--section-step-pl-tablet))]",
  "desktop:[--section-pt-desktop:--spacing(var(--section-step-pt-desktop))]",
  "desktop:[--section-pr-desktop:--spacing(var(--section-step-pr-desktop))]",
  "desktop:[--section-pb-desktop:--spacing(var(--section-step-pb-desktop))]",
  "desktop:[--section-pl-desktop:--spacing(var(--section-step-pl-desktop))]",
  "pt-(--section-pt) pr-(--section-pr) pb-(--section-pb) pl-(--section-pl)",
  "tablet:pt-(--section-pt-tablet) tablet:pr-(--section-pr-tablet) tablet:pb-(--section-pb-tablet) tablet:pl-(--section-pl-tablet)",
  "desktop:pt-(--section-pt-desktop) desktop:pr-(--section-pr-desktop) desktop:pb-(--section-pb-desktop) desktop:pl-(--section-pl-desktop)",
);

type PageSectionsProps = {
  /** Blocks in display order. */
  blocks: Section[];
  /** Loaded product for the product-page blocks. */
  product?: Product;
};

/**
 * Renders a page from its blocks.
 * Spacing comes from the block. Product pictures come from the slug field:
 * `productSlugs` use the cutout, `featureProductSlug` uses `featuredImage`
 * as the card background, and a hero `productSlug` uses `heroImage`.
 */
export async function PageSections({ blocks, product }: PageSectionsProps) {
  return Promise.all(
    blocks.map(async (block, index) => (
      <Fragment key={`${block.component}-${index}`}>
        {await renderBlock(block, index, product)}
      </Fragment>
    )),
  );
}

async function renderBlock(
  block: Section,
  index: number,
  product: Product | undefined,
) {
  return (
    <BlockSpacingFrame spacing={block.spacing}>
      {await renderBlockContent(block, index, product)}
    </BlockSpacingFrame>
  );
}

async function renderBlockContent(
  block: Section,
  index: number,
  product: Product | undefined,
): Promise<ReactNode> {
  switch (block.component) {
    case "hero":
      return renderHero(block);
    case "carousel":
      return renderCarousel(block);
    case "categoryShowcase":
      return renderCategoryShowcase(block, index);
    case "banner":
      return renderBanner(block, index);
    case "exploreCategories":
      return <section aria-label={block.component}>{block.component}</section>;
    case "storeBanner":
      return <section aria-label={block.component}>{block.component}</section>;
    case "productShowcase":
    case "specAccordion":
      if (!product) {
        throw new Error(`Section ${block.component} requires a product`);
      }

      return <section aria-label={block.component}>{block.component}</section>;
    default: {
      const unreachable: never = block;
      throw new Error(`Unregistered section: ${JSON.stringify(unreachable)}`);
    }
  }
}

/**
 * Home hero. The heading comes from the block and sits on the product still.
 * The frame is one screen tall and pulls up under the fixed header. Below 810
 * the heading clears that header by 29px, with 24px on each side. From 810 it
 * clears the header by 84px, with 32px on each side. From 1200 it is half the
 * frame and centered.
 */
async function renderHero(block: HeroBlock) {
  const product = await requireProduct(block.productSlug);

  if (!product.heroImage) {
    throw new Error(`Product ${product.slug} is missing heroImage`);
  }

  const site = block.href ? await getSite() : null;
  const titleId = "hero-title";

  return (
    <section
      aria-labelledby={titleId}
      className={clsx(
        "relative -mt-header grid h-dvh w-full min-w-0 grid-cols-[minmax(0,1fr)] overflow-hidden bg-neutral-muted",
        "tablet:-mt-header-tablet",
      )}
    >
      <ImageHero
        mobile={product.heroImage.mobile}
        desktop={product.heroImage.desktop}
        className="col-start-1 row-start-1 h-full min-h-0 min-w-0"
      />
      <Heading
        titleId={titleId}
        className="z-10 col-start-1 row-start-1 w-full min-w-0 self-start px-6 pt-hero-heading-top tablet:px-8 tablet:pt-hero-heading-top-tablet desktop:w-1/2 desktop:justify-self-center desktop:px-0"
        title={block.title}
        subtitle={block.subtitle}
        button={
          block.href && site
            ? { label: site.learnMore.label, href: block.href }
            : undefined
        }
      />
    </section>
  );
}

async function renderCarousel(block: CarouselBlock) {
  const [products, feature, categories, site] = await Promise.all([
    getProductsBySlugs(block.productSlugs),
    block.featureProductSlug
      ? requireFeatured(block.featureProductSlug)
      : Promise.resolve(null),
    getCategories(),
    getSite(),
  ]);
  const cardType = block.cardType ?? "large";
  const cardVariant = block.cardVariant ?? "horizontal";
  const slides = [
    ...(feature
      ? [{ product: feature, image: feature.featuredImage, background: true }]
      : []),
    ...products.map((product) => ({
      product,
      image: product.image,
      background: false,
    })),
  ];

  return (
    <Carousel
      title={block.title}
      mode={block.mode}
      visible={block.visible}
      peek={block.peek}
      inset={block.inset}
      endOffset={block.endOffset}
      showDots={block.showDots}
    >
      {slides.map(({ product, image, background }) => {
        const category = categories.find((item) => item.id === product.category);

        return (
          <ProductSlide
            key={product.id}
            product={product}
            image={image}
            background={background}
            eyebrow={category?.title}
            label={site.learnMore.label}
            cardType={cardType}
            cardVariant={cardVariant}
          />
        );
      })}
    </Carousel>
  );
}

async function renderCategoryShowcase(block: CategoryShowcaseBlock, index: number) {
  const site = await getSite();
  const label = site.learnMore.label;
  const feature =
    block.layout === "row" || !block.featureProductSlug
      ? null
      : await requireFeatured(block.featureProductSlug);
  const products = await getProductsBySlugs(block.productSlugs);

  return (
    <CategoryShowcase
      layout={block.layout === "feature-left" ? "feature-left" : "feature-top"}
      titleId={`category-showcase-${index}`}
      title={block.title}
      subtitle={block.subtitle}
      button={{ label: site.exploreAll.label, href: block.href }}
      feature={
        feature
          ? toShowcaseCard(feature, feature.featuredImage, label, true)
          : undefined
      }
      cards={products.map((product) => toShowcaseCard(product, product.image, label))}
    />
  );
}

async function renderBanner(block: BannerBlock, index: number) {
  const [product, site] = await Promise.all([
    requireFeatured(block.featureProductSlug),
    getSite(),
  ]);

  return (
    <Banner
      titleId={`banner-${index}`}
      title={block.title}
      subtitle={block.subtitle}
      image={product.featuredImage}
      cta={{ label: site.learnMore.label, href: block.href }}
      variant={block.variant}
      priority={block.priority}
    />
  );
}

function BlockSpacingFrame({
  spacing,
  children,
}: {
  spacing?: BlockSpacing;
  children: ReactNode;
}) {
  if (!spacing) {
    return children;
  }

  return (
    <div className={clsx("w-full min-w-0", SPACING_CLASS)} style={spacingStyle(spacing)}>
      {children}
    </div>
  );
}

function spacingStyle(spacing: BlockSpacing): CSSProperties {
  const mobile = spacing.mobile;
  const tablet = { ...spacing.mobile, ...spacing.tablet };
  const desktop = { ...tablet, ...spacing.desktop };

  return {
    "--section-step-pt": step(mobile, "top"),
    "--section-step-pr": step(mobile, "right"),
    "--section-step-pb": step(mobile, "bottom"),
    "--section-step-pl": step(mobile, "left"),
    "--section-step-pt-tablet": step(tablet, "top"),
    "--section-step-pr-tablet": step(tablet, "right"),
    "--section-step-pb-tablet": step(tablet, "bottom"),
    "--section-step-pl-tablet": step(tablet, "left"),
    "--section-step-pt-desktop": step(desktop, "top"),
    "--section-step-pr-desktop": step(desktop, "right"),
    "--section-step-pb-desktop": step(desktop, "bottom"),
    "--section-step-pl-desktop": step(desktop, "left"),
  } as CSSProperties;
}

function step(side: BlockSpacingSide | undefined, key: keyof BlockSpacingSide) {
  return side?.[key] ?? 0;
}

async function requireProduct(slug: string) {
  const product = await getProductBySlug(slug);

  if (!product) {
    throw new Error(`Unknown product slug: ${slug}`);
  }

  return product;
}

async function requireFeatured(slug: string) {
  const product = await requireProduct(slug);
  const featuredImage = product.featuredImage;

  if (!featuredImage) {
    throw new Error(`Product ${product.slug} is missing featuredImage`);
  }

  return { ...product, featuredImage };
}

function toShowcaseCard(
  product: Product,
  image: ImageAsset,
  label: string,
  background = false,
): CategoryShowcaseCard {
  return {
    title: product.name,
    description: product.shortDescription,
    image,
    background,
    cta: {
      label,
      href: `/product/${product.slug}`,
    },
  };
}

function ProductSlide({
  product,
  image,
  background = false,
  eyebrow,
  label,
  cardType,
  cardVariant,
}: {
  product: Product;
  image: ImageAsset;
  /** True when `image` is the product `featuredImage`. */
  background?: boolean;
  eyebrow?: string;
  label: string;
  cardType: CardType;
  cardVariant: CardVariantName;
}) {
  const cta = { label, href: `/product/${product.slug}` };

  if (cardType === "small") {
    return (
      <CardSmall
        title={product.name}
        description={product.shortDescription}
        image={image}
        background={background}
        cta={cta}
      />
    );
  }

  if (cardType === "medium") {
    return (
      <CardMedium
        variant={cardVariant}
        title={product.name}
        description={product.shortDescription}
        image={image}
        background={background}
        cta={cta}
      />
    );
  }

  return (
    <CardLarge
      variant={cardVariant}
      eyebrow={eyebrow}
      title={product.name}
      description={product.shortDescription}
      image={image}
      background={background}
      cta={cta}
    />
  );
}

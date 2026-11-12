import clsx from "clsx";
import Image from "next/image";
import { Fragment, type CSSProperties, type ReactNode } from "react";
import { Banner } from "@/components/Banner";
import { BentoBox } from "@/components/BentoBox";
import { CardLarge } from "@/components/CardLarge";
import { CardMedium } from "@/components/CardMedium";
import { CardSmall } from "@/components/CardSmall";
import { CategoryShowcase } from "@/components/CategoryShowcase";
import { Carousel } from "@/components/Carousel";
import { ColourSelector } from "@/components/ColourSelector";
import { ExploreCategory } from "@/components/ExploreCategory";
import { Heading } from "@/components/Heading";
import { HeroProduct } from "@/components/HeroProduct";
import { ImageHero } from "@/components/ImageHero";
import { ProductCard } from "@/components/ProductCard";
import { ProductInfo } from "@/components/ProductInfo";
import { TechnicalSpecs } from "@/components/TechnicalSpecs";
import { getCategories, getProductBySlug, getProductsBySlugs, getSite } from "@/lib/api";
import type {
  BannerBlock,
  BlockSpacing,
  BlockSpacingSide,
  CardType,
  CardVariant,
  CarouselBlock,
  CategoryShowcaseBlock,
  CategoryShowcaseCard,
  ExploreCategoriesBlock,
  HeroBlock,
  ImageAsset,
  Product,
  ProductDetail,
  Section,
  SpecsDownload,
  SpecsGroup,
} from "@/types";
import { groupGallery } from "./gallery";

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
      return renderExploreCategories(block);
    case "storeBanner":
      return <section aria-label={block.component}>{block.component}</section>;
    case "productShowcase":
      return renderProductShowcase(product);
    case "specAccordion":
      return renderSpecAccordion(product);
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
/**
 * Detail page. The hero has no padding and fills the viewport. The grid
 * pulls up under the fixed header, the same way the home hero does.
 * The info column uses 16px, 32px from 810, and 128px from 1200 on each side.
 * The gallery under the hero uses that same left inset, and no right inset,
 * so the pictures meet the right edge of the column. The first item has the
 * same space above it as the items have between them: 40px below 810, and
 * 80px from 810.
 * The info cell spans the hero and the media so it can stick for the whole
 * left column. The sticky element is the inner box: the cell itself is as
 * tall as that column, and a sticky box only stays put when it is shorter
 * than its cell. The box is one viewport tall, stuck to the top, with header
 * padding so the copy stays in the clear area. Specs sit in the column for
 * the same reason. A later section would end the stick.
 * The grid has no overflow. An overflow ancestor would break the stick.
 * Below 810 the same order stacks, because the column and row placements
 * start at 810.
 */
async function renderProductShowcase(product: Product | undefined) {
  const detail = requireDetail(product, "productShowcase");
  const colour = detail.colours[0];

  if (!product || !colour) {
    throw new Error(`Product ${product?.slug ?? "unknown"} is missing a colour`);
  }

  const site = await getSite();
  const blocks = groupGallery(detail.gallery);
  const colourLabel = "Colour";

  return (
    <div className="grid min-w-0 -mt-header grid-cols-1 tablet:-mt-header-tablet tablet:grid-cols-2">
      <HeroProduct
        image={detail.mainImage}
        className="tablet:col-start-1 tablet:row-start-1"
      />
      <div className="min-w-0 px-4 tablet:col-start-2 tablet:row-span-2 tablet:row-start-1 tablet:px-8 desktop:px-32">
        <div className="tablet:sticky tablet:top-0 tablet:flex tablet:h-dvh tablet:items-center tablet:pt-header-tablet">
          <ProductInfo
            heading="h1"
            title={product.name}
            description={detail.description}
            selectionLabel={`${colourLabel} - ${colour.label}`}
            action={{
              label: site.header.whereToBuy.label,
              href: site.header.whereToBuy.href,
            }}
          >
            <ColourSelector
              label={colourLabel}
              options={detail.colours}
              value={colour.id}
            />
          </ProductInfo>
        </div>
      </div>
      <div className="flex min-w-0 flex-col gap-10 pt-10 pl-4 pr-4 tablet:col-start-1 tablet:row-start-2 tablet:gap-20 tablet:pt-20 tablet:pr-0 tablet:pl-8 desktop:pl-32">
        {blocks.map((block, index) =>
          block.kind === "image" ? (
            <GalleryImage key={`${block.image.src}-${index}`} image={block.image} />
          ) : (
            <BentoBox key={`bento-${index}`} rows={block.rows} />
          ),
        )}
        <TechnicalSpecs
          groups={toSpecGroups(detail)}
          download={toDownload(detail)}
        />
      </div>
    </div>
  );
}

/**
 * Full-width specs. The product page does not list this block.
 * The specs already sit in the showcase column.
 */
function renderSpecAccordion(product: Product | undefined) {
  const detail = requireDetail(product, "specAccordion");

  return (
    <TechnicalSpecs groups={toSpecGroups(detail)} download={toDownload(detail)} />
  );
}

function requireDetail(product: Product | undefined, component: string) {
  if (!product) {
    throw new Error(`Section ${component} requires a product`);
  }

  const detail = product.detail;

  if (!detail) {
    throw new Error(`Product ${product.slug} is missing detail`);
  }

  return detail;
}

function toSpecGroups(detail: ProductDetail): SpecsGroup[] {
  return detail.specs.map((group) => ({
    id: group.id,
    title: group.title,
    body: { kind: "list", items: group.items },
  }));
}

/**
 * The specs component shows one file. Later downloads stay in the data.
 */
function toDownload(detail: ProductDetail): SpecsDownload | undefined {
  const file = detail.downloads[0];

  if (!file) {
    return undefined;
  }

  return {
    label: detail.downloadsTitle,
    fileLabel: file.label,
    href: file.href,
  };
}

/**
 * A gallery cell with no title. The radius matches the bento cards.
 * `sizes` uses 810px, the same value as `--breakpoint-tablet`.
 */
function GalleryImage({ image }: { image: ImageAsset }) {
  return (
    <figure className="overflow-hidden rounded-card">
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes="(min-width: 810px) 50vw, 100vw"
        className="h-auto w-full"
      />
    </figure>
  );
}

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

/**
 * One `banner` case for both shapes. Copy and picture come from the block.
 * `images` becomes `-desktop`, `-mobile`, and `-tablet` files. A block with
 * `button` uses that label and link. Otherwise the label stays `site.learnMore`.
 */
async function renderBanner(block: BannerBlock, index: number) {
  if (!("button" in block)) {
    const site = await getSite();

    return (
      <Banner
        titleId={`banner-${index}`}
        title={block.title}
        subtitle={block.subtitle}
        image={block.images}
        cta={{ label: site.learnMore.label, href: block.href }}
        variant={block.variant}
        priority={block.priority}
      />
    );
  }

  return (
    <Banner
      titleId={block.title ? `banner-${index}` : undefined}
      title={block.title}
      subtitle={block.subtitle}
      image={block.images}
      cta={{ label: block.button.label, href: block.button.href }}
      variant={block.button.variant}
      priority={block.priority}
    />
  );
}

/**
 * Category row. Each card is one category: the tile is the image, the title
 * is the label, and `href` is the category page.
 */
async function renderExploreCategories(block: ExploreCategoriesBlock) {
  const categories = await getCategories();

  return (
    <ExploreCategory
      title={block.title}
      cards={categories.map((category) => ({
        image: category.tileImage,
        href: category.href,
        label: category.title,
      }))}
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
  cardVariant: CardVariant;
}) {
  const cta = { label, href: `/product/${product.slug}` };

  if (cardType === "product") {
    return (
      <ProductCard
        title={product.name}
        description={product.shortDescription}
        image={product.image}
        href={cta.href}
      />
    );
  }

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

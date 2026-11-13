import clsx from "clsx";
import Image from "next/image";
import { Fragment, type ReactNode } from "react";
import { Banner } from "@/components/Banner";
import { BannerLead } from "@/components/BannerLead";
import { BentoBox } from "@/components/BentoBox";
import { CardLarge } from "@/components/CardLarge";
import { CardMedium } from "@/components/CardMedium";
import { CardSmall } from "@/components/CardSmall";
import { CategoryShowcase } from "@/components/CategoryShowcase";
import { Carousel } from "@/components/Carousel";
import { ExploreCategory } from "@/components/ExploreCategory";
import { Heading } from "@/components/Heading";
import { HeroProduct } from "@/components/HeroProduct";
import { ImageHero } from "@/components/ImageHero";
import { ProductCard } from "@/components/ProductCard";
import { ProductSelection } from "@/components/ProductSelection";
import { TechnicalSpecs } from "@/components/TechnicalSpecs";
import { SIZES_HALF_FROM_TABLET } from "@/config/sizes";
import { groupGallery } from "@/helpers/components/gallery";
import {
  learnMoreCta,
  toDownload,
  toShowcaseCard,
  toSpecGroups,
} from "@/helpers/components/sections";
import { SPACING_CLASS, spacingStyle } from "@/helpers/components/spacing";
import { missingProductFieldError } from "@/helpers/errors";
import { productHref } from "@/helpers/routes";
import {
  getCarouselProducts,
  getCategories,
  getProductsBySlugs,
  getSite,
} from "@/lib/api";
import { requireDetail, requireFeatured, requireProduct } from "@/lib/loaders";
import type {
  BannerBlock,
  BlockSpacing,
  CardType,
  CardVariant,
  CarouselBlock,
  CategoryShowcaseBlock,
  ExploreCategoriesBlock,
  HeroBlock,
  ImageAsset,
  Product,
  Section,
  Site,
} from "@/types";
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
    throw missingProductFieldError(product?.slug ?? "unknown", "a colour");
  }

  const site = await getSite();
  const blocks = groupGallery(detail.gallery);
  const colourLabel = site.colourLabel;

  return (
    <div className="grid min-w-0 -mt-header grid-cols-1 tablet:-mt-header-tablet tablet:grid-cols-2">
      <HeroProduct
        image={detail.mainImage}
        className="tablet:col-start-1 tablet:row-start-1"
      />
      <div className="min-w-0 px-4 pt-10 tablet:col-start-2 tablet:pt-0 tablet:row-span-2 tablet:row-start-1 tablet:px-8 desktop:px-32">
        <div className="tablet:sticky tablet:top-0 tablet:flex tablet:h-dvh tablet:items-center tablet:pt-header-tablet">
          <ProductSelection
            title={product.name}
            description={detail.description}
            colourLabel={colourLabel}
            colours={detail.colours}
            action={{
              label: site.header.whereToBuy.label,
              href: site.header.whereToBuy.href,
            }}
          />
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

/**
 * A gallery cell with no title. The radius matches the bento cards.
 */
function GalleryImage({ image }: { image: ImageAsset }) {
  return (
    <figure className="overflow-hidden rounded-card">
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={SIZES_HALF_FROM_TABLET}
        className="h-auto w-full"
      />
    </figure>
  );
}

async function renderHero(block: HeroBlock) {
  const product = await requireProduct(block.productSlug);

  if (!product.heroImage) {
    throw missingProductFieldError(product.slug, "heroImage");
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
            ? learnMoreCta(site.learnMore, product.name, block.href)
            : undefined
        }
      />
    </section>
  );
}

async function renderCarousel(block: CarouselBlock) {
  const [products, feature, categories, site] = await Promise.all([
    getCarouselProducts(block.productSlugs),
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
      labels={site.carousel}
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
            learnMore={site.learnMore}
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
  const { learnMore } = site;
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
          ? toShowcaseCard(feature, feature.featuredImage, learnMore, true)
          : undefined
      }
      cards={products.map((product) => toShowcaseCard(product, product.image, learnMore))}
    />
  );
}

/**
 * One `banner` case for both shapes. Copy and picture come from the block.
 * `images` becomes `-desktop`, `-mobile`, and `-tablet` files. A block with
 * `button` uses that label and link. Otherwise the label stays `site.learnMore`.
 * A button block with `eyebrow` and `logo` shows them above the button instead
 * of the title and subtitle.
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
        cta={learnMoreCta(site.learnMore, block.title, block.href)}
        variant={block.variant}
        priority={block.priority}
      />
    );
  }

  if (block.eyebrow && block.logo) {
    return (
      <Banner image={block.images} priority={block.priority}>
        <BannerLead
          text={block.eyebrow}
          logo={block.logo}
          cta={{ label: block.button.label, href: block.button.href }}
          variant={block.button.variant}
        />
      </Banner>
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

function ProductSlide({
  product,
  image,
  background = false,
  eyebrow,
  learnMore,
  cardType,
  cardVariant,
}: {
  product: Product;
  image: ImageAsset;
  /** True when `image` is the product `featuredImage`. */
  background?: boolean;
  eyebrow?: string;
  learnMore: Site["learnMore"];
  cardType: CardType;
  cardVariant: CardVariant;
}) {
  const cta = learnMoreCta(learnMore, product.name, productHref(product.slug));

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

import { expect, test } from "vitest";
import {
  BUTTON_VARIANTS,
  CARD_TYPES,
  CARD_VARIANTS,
  CAROUSEL_MODES,
  CATEGORIES,
  FOOTER_COLUMNS,
  GALLERY_SPANS,
  SECTION_TYPES,
  SHOWCASE_LAYOUTS,
  TEXT_TONES,
  type BlockSpacing,
  type ImageAsset,
  type Section,
} from "../../types/content";
import {
  getBestSellers,
  getCategories,
  getContactPage,
  getPage,
  getPoliciesPage,
  getProductBySlug,
  getProducts,
  getProductsByCategory,
  getProductsBySlugs,
  getSite,
  getWhereToBuyPage,
  splitCategoryProducts,
} from "./index";

const HEX_COLOUR = /^#[0-9a-fA-F]{6}$/;

function includesValue<T extends string>(
  allowed: readonly T[],
  value: string,
): value is T {
  return allowed.some((item) => item === value);
}

function assertImage(image: ImageAsset) {
  expect(image.alt.length).toBeGreaterThan(0);
  expect(image.width).toBeGreaterThan(0);
  expect(image.height).toBeGreaterThan(0);
}

test("products have unique ids and slugs and a known category", async () => {
  const products = await getProducts();
  const ids = products.map((product) => product.id);
  const slugs = products.map((product) => product.slug);

  expect(new Set(ids).size).toBe(ids.length);
  expect(new Set(slugs).size).toBe(slugs.length);

  for (const product of products) {
    expect(includesValue(CATEGORIES, product.category)).toBe(true);
  }
});

test("categories have unique ids and hrefs", async () => {
  const categories = await getCategories();
  const ids = categories.map((category) => category.id);

  expect(new Set(ids).size).toBe(ids.length);

  for (const category of categories) {
    expect(category.href).toBe(`/category/${category.id}`);
  }
});

test("the header and where to buy come from the site", async () => {
  const site = await getSite();

  expect(site.header.home.href).toBe("/");
  expect(site.header.links.map((link) => link.href)).toEqual([
    "/category/kitchen",
    "/category/home-security",
    "/category/hair-care",
    "/category/accessories",
  ]);
  expect(site.header.whereToBuy.href).toBe("/where-to-buy");
});

test("the where to buy page has metadata and a heading", async () => {
  const page = await getWhereToBuyPage();

  expect(page.metadata.title).toBe("Where to buy");
  expect(page.metadata.description.length).toBeGreaterThan(0);
  expect(page.heading.title).toBe("Where to buy");
});

test("the footer comes from the site", async () => {
  const site = await getSite();

  expect(site.footer.home.href).toBe("/");
  expect(site.footer.copyright.length).toBeGreaterThan(0);
  expect(site.footer.policies.href).toBe("/policies");
  expect(site.footer.groups.map((group) => group.title)).toEqual([
    "Our Products",
    "Learn",
  ]);

  for (const group of site.footer.groups) {
    expect(FOOTER_COLUMNS.some((columns) => columns === group.columns)).toBe(
      true,
    );
  }

  expect(site.footer.groups[0]?.links.map((link) => link.href)).toEqual([
    "/category/kitchen",
    "/category/home-security",
    "/category/hair-care",
    "/category/accessories",
  ]);
  expect(site.footer.groups[1]?.links.map((link) => link.href)).toEqual([
    "/where-to-buy",
    "/contact-us",
  ]);
});

test("the contact page has metadata and a heading", async () => {
  const page = await getContactPage();

  expect(page.metadata.title).toBe("Contact us");
  expect(page.metadata.description.length).toBeGreaterThan(0);
  expect(page.heading.title).toBe("Contact us");
});

test("the policies page has metadata and a heading", async () => {
  const page = await getPoliciesPage();

  expect(page.metadata.title).toBe("Policies & Terms");
  expect(page.metadata.description.length).toBeGreaterThan(0);
  expect(page.heading.title).toBe("Policies & Terms");
});

test("page sections use allowed values and resolve their references", async () => {
  const pages = [await getPage("home"), await getPage("product")];

  for (const page of pages) {
    for (const section of page.sections) {
      expect(includesValue(SECTION_TYPES, section.component)).toBe(true);
      assertSpacing(section.spacing);
      await assertSectionReferences(section);
    }
  }
});

test("getProductsBySlugs keeps the requested order", async () => {
  const products = await getProductsBySlugs([
    "indoor-camera",
    "air-fryer-5-7-l",
  ]);

  expect(products.map((product) => product.slug)).toEqual([
    "indoor-camera",
    "air-fryer-5-7-l",
  ]);
  await expect(getProductsBySlugs(["missing-product"])).rejects.toThrow(
    "Unknown product slug: missing-product",
  );
});

function assertSpacing(spacing: BlockSpacing | undefined) {
  if (!spacing) {
    return;
  }

  for (const side of [spacing.mobile, spacing.tablet, spacing.desktop]) {
    if (!side) {
      continue;
    }

    for (const value of [side.top, side.right, side.bottom, side.left]) {
      if (value === undefined) {
        continue;
      }

      expect(value).toBeGreaterThanOrEqual(0);
    }
  }
}

async function assertSectionReferences(section: Section) {
  switch (section.component) {
    case "hero": {
      const product = await getProductBySlug(section.productSlug);

      expect(product?.heroImage).toBeDefined();

      if (product?.heroImage) {
        assertImage(product.heroImage.mobile);
        assertImage(product.heroImage.desktop);
      }

      break;
    }
    case "carousel": {
      if (section.mode) {
        expect(includesValue(CAROUSEL_MODES, section.mode)).toBe(true);
      }

      if (section.cardType) {
        expect(includesValue(CARD_TYPES, section.cardType)).toBe(true);
      }

      if (section.cardVariant) {
        expect(includesValue(CARD_VARIANTS, section.cardVariant)).toBe(true);
      }

      for (const slug of section.productSlugs) {
        expect(await getProductBySlug(slug)).not.toBeNull();
      }

      if (section.featureProductSlug) {
        const feature = await getProductBySlug(section.featureProductSlug);

        expect(feature?.featuredImage).toBeDefined();
      }

      break;
    }
    case "categoryShowcase": {
      expect(includesValue(SHOWCASE_LAYOUTS, section.layout)).toBe(true);

      for (const slug of section.productSlugs) {
        expect(await getProductBySlug(slug)).not.toBeNull();
      }

      if (section.layout === "row") {
        expect(section.featureProductSlug).toBeUndefined();
        break;
      }

      expect(section.featureProductSlug).toBeDefined();

      if (section.featureProductSlug) {
        const feature = await getProductBySlug(section.featureProductSlug);

        expect(feature?.featuredImage).toBeDefined();
      }

      break;
    }
    case "banner": {
      if (section.variant) {
        expect(includesValue(BUTTON_VARIANTS, section.variant)).toBe(true);
      }

      const feature = await getProductBySlug(section.featureProductSlug);

      expect(feature?.featuredImage).toBeDefined();
      break;
    }
    default:
      break;
  }
}

test("category and best-seller queries follow the flags and the file order", async () => {
  const products = await getProducts();

  for (const category of CATEGORIES) {
    const queried = await getProductsByCategory(category);
    const expected = products.filter((product) => product.category === category);

    expect(queried.map((product) => product.id)).toEqual(
      expected.map((product) => product.id),
    );
    expect(queried.every((product) => product.category === category)).toBe(
      true,
    );
  }

  const bestSellers = await getBestSellers();

  expect(bestSellers.map((product) => product.id)).toEqual(
    products
      .filter((product) => product.bestSeller)
      .map((product) => product.id),
  );
  expect(bestSellers.map((product) => product.slug)).toEqual([
    "air-fryer-5-7-l",
    "indoor-camera",
    "ionic-hair-dryer",
  ]);
});

test("the feature card is the first featured product, otherwise the first product", async () => {
  for (const category of CATEGORIES) {
    const products = await getProductsByCategory(category);
    const { feature, cards } = splitCategoryProducts(products);
    const featured = products.find((product) => product.featured === true);
    const expectedFeature = featured ?? products[0] ?? null;

    expect(feature).toBe(expectedFeature);
    expect(cards).toEqual(
      products.filter((product) => product !== expectedFeature),
    );
  }
});

test("the Kitchen limit keeps the feature card and two other products", async () => {
  const kitchen = await getProductsByCategory("kitchen");
  const { feature, cards } = splitCategoryProducts(kitchen, 3);

  expect(feature?.slug).toBe("kettle-1-7-l");
  expect(cards.map((product) => product.slug)).toEqual([
    "blender",
    "countertop-blender",
  ]);
  expect(kitchen.map((product) => product.slug)).toContain("air-fryer-5-7-l");
});

test("product detail has a gallery, valid spans, and unique colour ids", async () => {
  const products = await getProducts();

  for (const product of products) {
    if (!product.detail) {
      continue;
    }

    assertImage(product.detail.mainImage);
    expect(product.detail.gallery.length).toBeGreaterThan(0);

    const colourIds = product.detail.colours.map((colour) => colour.id);
    expect(new Set(colourIds).size).toBe(colourIds.length);

    for (const colour of product.detail.colours) {
      expect(colour.hex).toMatch(HEX_COLOUR);
    }

    for (const item of product.detail.gallery) {
      expect(includesValue(GALLERY_SPANS, item.span)).toBe(true);

      if (item.textTone) {
        expect(includesValue(TEXT_TONES, item.textTone)).toBe(true);
      }
    }
  }

  const countertop = await getProductBySlug("countertop-blender");

  expect(countertop?.detail?.gallery.map((item) => item.span)).toEqual([
    "full",
    "full",
    "half",
    "half",
    "full",
    "full",
  ]);
});

test("featured products have a featured image", async () => {
  const products = await getProducts();

  for (const product of products) {
    if (product.featured === true) {
      expect(product.featuredImage).toBeDefined();
    }
  }
});

test("every image has alt text and positive dimensions", async () => {
  const categories = await getCategories();
  const products = await getProducts();

  for (const category of categories) {
    assertImage(category.tileImage);
  }

  for (const product of products) {
    assertImage(product.image);

    if (product.featuredImage) {
      assertImage(product.featuredImage);
    }

    if (product.heroImage) {
      assertImage(product.heroImage.mobile);
      assertImage(product.heroImage.desktop);
    }

    if (!product.detail) {
      continue;
    }

    assertImage(product.detail.mainImage);

    for (const item of product.detail.gallery) {
      assertImage(item.image);
    }
  }
});

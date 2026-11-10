import { expect, test } from "vitest";
import {
  CATEGORIES,
  GALLERY_SPANS,
  SECTION_TYPES,
  SHOWCASE_LAYOUTS,
  TEXT_TONES,
  VIDEO_TYPES,
  type ImageAsset,
  type Section,
} from "../../types/content";
import {
  getBestSellers,
  getCategories,
  getCategory,
  getPage,
  getProductBySlug,
  getProducts,
  getProductsByCategory,
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

test("categories have unique ids", async () => {
  const categories = await getCategories();
  const ids = categories.map((category) => category.id);

  expect(new Set(ids).size).toBe(ids.length);
});

test("page sections use allowed values and resolve their references", async () => {
  const pages = [await getPage("home"), await getPage("product")];

  for (const page of pages) {
    for (const section of page.sections) {
      expect(includesValue(SECTION_TYPES, section.type)).toBe(true);
      await assertSectionReferences(section);
    }
  }
});

async function assertSectionReferences(section: Section) {
  if (section.type === "hero") {
    for (const source of section.video.sources) {
      expect(includesValue(VIDEO_TYPES, source.type)).toBe(true);
    }

    assertImage(section.video.poster);

    if (section.productSlug) {
      expect(await getProductBySlug(section.productSlug)).not.toBeNull();
    }
  }

  if (section.type === "categoryShowcase") {
    expect(includesValue(CATEGORIES, section.category)).toBe(true);
    expect(includesValue(SHOWCASE_LAYOUTS, section.layout)).toBe(true);
    expect(await getCategory(section.category)).not.toBeNull();
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

test("featured products and banner feature cards have a feature image", async () => {
  const products = await getProducts();

  for (const product of products) {
    if (product.featured === true) {
      expect(product.featureImage).toBeDefined();
    }
  }

  const home = await getPage("home");

  for (const section of home.sections) {
    if (section.type !== "categoryShowcase" || section.layout !== "banner") {
      continue;
    }

    const categoryProducts = await getProductsByCategory(section.category);
    const { feature } = splitCategoryProducts(
      categoryProducts,
      section.limit,
    );

    expect(feature?.featureImage).toBeDefined();
  }
});

test("every image has alt text and positive dimensions", async () => {
  const categories = await getCategories();
  const products = await getProducts();
  const pages = [await getPage("home"), await getPage("product")];

  for (const category of categories) {
    assertImage(category.tileImage);
  }

  for (const product of products) {
    assertImage(product.image);

    if (product.featureImage) {
      assertImage(product.featureImage);
    }

    if (!product.detail) {
      continue;
    }

    assertImage(product.detail.mainImage);

    for (const item of product.detail.gallery) {
      assertImage(item.image);
    }
  }

  for (const page of pages) {
    for (const section of page.sections) {
      if (section.type === "hero") {
        assertImage(section.video.poster);
      }
    }
  }
});

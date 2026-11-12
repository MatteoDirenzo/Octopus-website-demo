import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";
import { getCategories, getPage, getProductsBySlugs } from "@/lib/api";
import type { Section } from "@/types/content";
import { PageSections } from "./index";

afterEach(() => {
  cleanup();
});

test("renders the linked product heading and its learn more link", async () => {
  const block = await findBlock("hero");

  render(await PageSections({ blocks: [block] }));

  expect(
    screen.getByRole("heading", {
      level: 1,
      name: "Octopus Ionic Hair Dryer",
    }),
  ).toBeTruthy();
  expect(
    screen.getByText(
      "Dry your hair faster and with less frizz with this powerful ionic hair dryer",
    ),
  ).toBeTruthy();
  expect(
    screen.getByRole("link", { name: "Learn more" }).getAttribute("href"),
  ).toBe("/product/ionic-hair-dryer");
});

test("renders one learn more link for each carousel product", async () => {
  const block = await findBlock("carousel");

  if (block.component !== "carousel") {
    throw new Error("Carousel block is missing");
  }

  const products = await getProductsBySlugs(block.productSlugs);

  render(await PageSections({ blocks: [block] }));

  expect(
    screen.getByRole("heading", { level: 2, name: "Best sellers" }),
  ).toBeTruthy();

  for (const product of products) {
    expect(
      screen.getByRole("heading", { level: 3, name: product.name }),
    ).toBeTruthy();
  }

  const links = screen.getAllByRole("link", { name: "Learn more" });

  expect(links).toHaveLength(products.length);
  expect(links.map((link) => link.getAttribute("href"))).toEqual(
    products.map((product) => `/product/${product.slug}`),
  );
});

test("renders the kitchen feature card and two medium cards", async () => {
  const block = await findBlock(
    "categoryShowcase",
    (section) => section.layout === "feature-top",
  );

  render(await PageSections({ blocks: [block] }));

  expect(screen.getByRole("heading", { level: 2, name: "Kitchen" })).toBeTruthy();
  expect(
    screen.getByText("Powerful appliances for everyday cooking"),
  ).toBeTruthy();
  expect(
    screen.getByRole("link", { name: "Explore all products" }).getAttribute("href"),
  ).toBe("/category/kitchen");

  expect(
    screen.getByRole("heading", { level: 3, name: "Octopus Kettle 1.7 L" }),
  ).toBeTruthy();
  expect(
    screen.getByRole("heading", { level: 3, name: "Octopus Blender" }),
  ).toBeTruthy();
  expect(
    screen.getByRole("heading", {
      level: 3,
      name: "Octopus Countertop Blender",
    }),
  ).toBeTruthy();
  expect(
    screen.queryByRole("heading", {
      level: 3,
      name: "Octopus Air Fryer 5.7 L",
    }),
  ).toBeNull();

  const links = screen.getAllByRole("link", { name: "Learn more" });

  expect(links.map((link) => link.getAttribute("href"))).toEqual([
    "/product/kettle-1-7-l",
    "/product/blender",
    "/product/countertop-blender",
  ]);
});

test("renders the home-security feature card and two medium cards", async () => {
  const block = await findBlock(
    "categoryShowcase",
    (section) => section.layout === "feature-left",
  );

  render(await PageSections({ blocks: [block] }));

  expect(
    screen.getByRole("heading", { level: 2, name: "Home Security" }),
  ).toBeTruthy();
  expect(
    screen.getByRole("link", { name: "Explore all products" }).getAttribute("href"),
  ).toBe("/category/home-security");

  const feature = screen.getByRole("heading", {
    level: 3,
    name: "Octopus Indoor Camera",
  });

  expect(feature.closest("article")?.className).toContain("desktop:h-full");
  expect(feature.closest("article")?.className).not.toContain(
    "desktop:h-card-large-vertical",
  );

  for (const name of ["Octopus Outdoor Camera", "Octopus Video Doorbell"]) {
    const heading = screen.getByRole("heading", { level: 3, name });

    expect(heading.closest("article")?.className).toContain(
      "desktop:h-card-medium-horizontal",
    );
  }

  const links = screen.getAllByRole("link", { name: "Learn more" });

  expect(links.map((link) => link.getAttribute("href"))).toEqual([
    "/product/indoor-camera",
    "/product/outdoor-camera",
    "/product/video-doorbell",
  ]);
});

test("renders the accessories row as three small cards", async () => {
  const block = await findBlock(
    "categoryShowcase",
    (section) => section.layout === "row",
  );

  render(await PageSections({ blocks: [block] }));

  expect(
    screen.getByRole("heading", { level: 2, name: "Accessories" }),
  ).toBeTruthy();
  expect(
    screen.getByRole("link", { name: "Explore all products" }).getAttribute("href"),
  ).toBe("/category/accessories");

  for (const name of [
    "Octopus Power Bank 10,000 mAh",
    "Octopus Power Board with USB Charging",
    "Octopus 3-in-1 Magnetic Charging Station",
  ]) {
    const article = screen
      .getByRole("heading", { level: 3, name })
      .closest("article");

    expect(article?.className).toContain("h-card-small");
  }

  expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(3);
});

test("renders one link for each category under the explore heading", async () => {
  const block = await findBlock("exploreCategories");
  const categories = await getCategories();

  render(await PageSections({ blocks: [block] }));

  expect(block.title).toBe("Explore all categories");
  expect(
    screen.getByRole("heading", { level: 2, name: block.title }),
  ).toBeTruthy();

  const links = screen.getAllByRole("link");

  expect(links.map((link) => link.getAttribute("href"))).toEqual(
    categories.map((category) => category.href),
  );

  for (const category of categories) {
    expect(screen.getByText(category.title)).toBeTruthy();
  }
});

test("renders the hair-care banner from the block copy and the suffixed picture", async () => {
  const block = await findBlock(
    "banner",
    (section) => "href" in section,
  );

  render(await PageSections({ blocks: [block] }));

  expect(screen.getByRole("heading", { level: 2, name: "Hair Care" })).toBeTruthy();
  expect(screen.getByText("Placeholder")).toBeTruthy();
  expect(
    screen.getByRole("link", { name: "Learn more" }).getAttribute("href"),
  ).toBe("/category/hair-care");
  const picture = screen.getByRole("img", { name: "Woman drying her hair" });

  expect(picture.getAttribute("src")).toContain("banner-girl-mobile.webp");
});

test("renders the red banner from its crops and button, with no heading", async () => {
  const block = await findBlock("banner", (section) => "button" in section);

  render(await PageSections({ blocks: [block] }));

  expect(screen.queryByRole("heading")).toBeNull();
  expect(
    screen.getByRole("link", { name: "Find your nearest store" }).getAttribute("href"),
  ).toBe("/where-to-buy");
  expect(
    screen.getByRole("img", { name: "Kettle, blender, and air fryer on a red set" }),
  ).toBeTruthy();
  expect(screen.getAllByRole("link")).toHaveLength(1);
});

function isBlock<T extends Section["component"]>(
  section: Section,
  component: T,
): section is Extract<Section, { component: T }> {
  return section.component === component;
}

async function findBlock<T extends Section["component"]>(
  component: T,
  match?: (section: Extract<Section, { component: T }>) => boolean,
) {
  const page = await getPage("home");
  const section = page.sections.find(
    (item): item is Extract<Section, { component: T }> =>
      isBlock(item, component) && (!match || match(item)),
  );

  if (!section) {
    throw new Error(`${component} block is missing`);
  }

  return section;
}

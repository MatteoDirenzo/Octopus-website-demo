import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";
import { CategoryShowcase, type CategoryShowcaseCard } from "./index";

const image = {
  src: "/images/placeholders/category-kitchen.png",
  alt: "Kitchen tile",
  width: 800,
  height: 800,
};

const feature: CategoryShowcaseCard = {
  title: "Kettle",
  description: "Boils water",
  image,
  cta: { label: "Learn more", href: "/product/kettle" },
};

const cards: CategoryShowcaseCard[] = [
  {
    title: "Blender",
    description: "Blends food",
    image: { ...image, alt: "Blender tile" },
    cta: { label: "Learn more", href: "/product/blender" },
  },
  {
    title: "Air fryer",
    description: "Fries food",
    image: { ...image, alt: "Air fryer tile" },
    cta: { label: "Learn more", href: "/product/air-fryer" },
  },
  {
    title: "Toaster",
    description: "Toasts bread",
    image: { ...image, alt: "Toaster tile" },
    cta: { label: "Learn more", href: "/product/toaster" },
  },
];

afterEach(() => {
  cleanup();
});

test("feature-top renders the heading, the feature card, and the medium cards", () => {
  render(
    <CategoryShowcase
      titleId="kitchen"
      title="Kitchen"
      subtitle="Everyday cooking"
      button={{ label: "Explore all products", href: "/category/kitchen" }}
      feature={feature}
      cards={cards.slice(0, 2)}
    />,
  );

  expect(screen.getByRole("heading", { level: 2, name: "Kitchen" })).toBeTruthy();
  expect(screen.getByText("Everyday cooking")).toBeTruthy();
  expect(
    screen.getByRole("link", { name: "Explore all products" }).getAttribute("href"),
  ).toBe("/category/kitchen");

  const featureHeading = screen.getByRole("heading", { level: 3, name: "Kettle" });

  expect(featureHeading).toBeTruthy();
  expect(featureHeading.closest("article")?.className).toContain(
    "desktop:h-card-large-desktop",
  );
  expect(featureHeading.closest("article")?.className).not.toContain(
    "desktop:h-card-large-vertical",
  );

  const links = screen.getAllByRole("link", { name: "Learn more" });

  expect(links.map((link) => link.getAttribute("href"))).toEqual([
    "/product/kettle",
    "/product/blender",
    "/product/air-fryer",
  ]);
});

test("feature-left uses a vertical feature card and horizontal medium cards", () => {
  render(
    <CategoryShowcase
      layout="feature-left"
      titleId="security"
      title="Home Security"
      feature={feature}
      cards={cards.slice(0, 2)}
    />,
  );

  const featureHeading = screen.getByRole("heading", { level: 3, name: "Kettle" });

  expect(featureHeading.closest("article")?.className).toContain(
    "desktop:h-full",
  );
  expect(featureHeading.closest("article")?.className).toContain(
    "desktop:flex-col",
  );
  expect(featureHeading.closest("article")?.className).not.toContain(
    "desktop:h-card-large-vertical",
  );

  for (const name of ["Blender", "Air fryer"]) {
    const heading = screen.getByRole("heading", { level: 3, name });

    expect(heading.closest("article")?.className).toContain(
      "desktop:h-card-medium-horizontal",
    );
  }
});

test("no feature card renders small cards in one row", () => {
  render(
    <CategoryShowcase titleId="accessories" title="Accessories" cards={cards} />,
  );

  const row = screen
    .getByRole("heading", { level: 3, name: "Blender" })
    .closest("article")?.parentElement?.parentElement;

  expect(row?.className).toContain("flex-col");
  expect(row?.className).toContain("tablet:flex-row");

  for (const name of ["Blender", "Air fryer", "Toaster"]) {
    const article = screen
      .getByRole("heading", { level: 3, name })
      .closest("article");

    expect(article?.className).toContain("h-card-small");
    expect(article?.className).not.toContain("h-card-medium");
    expect(article?.className).not.toContain("h-card-large");
  }

  expect(screen.queryByRole("heading", { level: 3, name: "Kettle" })).toBeNull();
});

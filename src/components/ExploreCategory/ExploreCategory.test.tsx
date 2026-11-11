import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";
import { ExploreCategory } from "./index";

const image = {
  src: "/images/placeholders/category-kitchen.png",
  alt: "Blender",
  width: 800,
  height: 800,
};

const cards = [
  { image, href: "/category/kitchen", label: "Kitchen" },
  {
    image: { ...image, alt: "Camera" },
    href: "/category/home-security",
    label: "Home Security",
  },
  {
    image: { ...image, alt: "Hair dryer" },
    href: "/category/hair-care",
    label: "Hair Care",
  },
  {
    image: { ...image, alt: "Cable" },
    href: "/category/accessories",
    label: "Accessories",
  },
];

afterEach(() => {
  cleanup();
});

test("shows the title and one labelled link per card", () => {
  render(<ExploreCategory title="Explore all categories" cards={cards} />);

  expect(
    screen.getByRole("heading", { level: 2, name: "Explore all categories" }),
  ).toBeTruthy();
  expect(screen.queryByRole("heading", { level: 3 })).toBeNull();
  expect(screen.getAllByRole("link")).toHaveLength(4);

  for (const card of cards) {
    expect(
      screen.getByRole("link", { name: card.image.alt }).getAttribute("href"),
    ).toBe(card.href);
    expect(screen.getByText(card.label)).toBeTruthy();
  }
});

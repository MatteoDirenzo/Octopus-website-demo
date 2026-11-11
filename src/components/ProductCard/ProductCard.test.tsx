import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";
import { ProductCard } from "./index";

const image = {
  src: "/images/placeholders/category-kitchen.png",
  alt: "Kettle",
  width: 800,
  height: 800,
};

afterEach(() => {
  cleanup();
});

test("links the image and shows the title and description", () => {
  render(
    <ProductCard
      title="Octopus Kettle"
      description="Boils fast"
      image={image}
      href="/products/kettle"
    />,
  );

  expect(
    screen.getByRole("link", { name: "Kettle" }).getAttribute("href"),
  ).toBe("/products/kettle");
  expect(screen.getAllByRole("link")).toHaveLength(1);
  expect(
    screen.getByRole("heading", { level: 3, name: "Octopus Kettle" }),
  ).toBeTruthy();
  expect(screen.getByText("Boils fast")).toBeTruthy();
});

test("a label replaces the title and description", () => {
  render(
    <ProductCard
      label="Kitchen"
      title="Octopus Kettle"
      description="Boils fast"
      image={image}
      href="/products/kettle"
    />,
  );

  expect(screen.getByText("Kitchen")).toBeTruthy();
  expect(screen.queryByRole("heading")).toBeNull();
  expect(screen.queryByText("Octopus Kettle")).toBeNull();
  expect(screen.queryByText("Boils fast")).toBeNull();
  expect(screen.getAllByRole("link")).toHaveLength(1);
});

test("omits the title and description when they are not passed", () => {
  render(<ProductCard image={image} href="/products/kettle" />);

  expect(screen.getByRole("link", { name: "Kettle" })).toBeTruthy();
  expect(screen.getAllByRole("link")).toHaveLength(1);
  expect(screen.queryByRole("heading")).toBeNull();
  expect(screen.queryByText("Boils fast")).toBeNull();
});

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";
import { ProductInfo } from "./index";

const copy = {
  title: "Octopus Blender Pro",
  description: "Crushes ice and frozen fruit.",
  selectionLabel: "Colour - Black",
};

afterEach(() => {
  cleanup();
});

test("renders the title, description, selection line, child, and action", () => {
  render(
    <ProductInfo {...copy} action={{ label: "Where to buy" }}>
      <p>Swatches</p>
    </ProductInfo>,
  );

  expect(
    screen.getByRole("heading", { level: 2, name: "Octopus Blender Pro" }),
  ).toBeTruthy();
  expect(screen.getByText("Crushes ice and frozen fruit.")).toBeTruthy();
  expect(screen.getByText("Colour - Black")).toBeTruthy();
  expect(screen.getByText("Swatches")).toBeTruthy();
  expect(screen.getByRole("button", { name: "Where to buy" }).tagName).toBe(
    "BUTTON",
  );
});

test("the product page can title the product with an h1", () => {
  render(
    <ProductInfo {...copy} heading="h1" action={{ label: "Where to buy" }}>
      <p>Swatches</p>
    </ProductInfo>,
  );

  expect(
    screen.getByRole("heading", { level: 1, name: "Octopus Blender Pro" }),
  ).toBeTruthy();
});

test("an action href renders a link", () => {
  render(
    <ProductInfo
      {...copy}
      action={{ label: "Where to buy", href: "/where-to-buy" }}
    >
      <p>Swatches</p>
    </ProductInfo>,
  );

  expect(
    screen.getByRole("link", { name: "Where to buy" }).getAttribute("href"),
  ).toBe("/where-to-buy");
});

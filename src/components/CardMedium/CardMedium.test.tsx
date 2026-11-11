import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";
import { CardMedium } from "./index";

const image = {
  src: "/images/placeholders/category-kitchen.png",
  alt: "Kitchen tile",
  width: 800,
  height: 800,
};

afterEach(() => {
  cleanup();
});

test("vertical exposes the passed copy and one link", () => {
  render(
    <CardMedium
      variant="vertical"
      title="Kitchen"
      description="Cookware"
      image={image}
      cta={{ label: "Open kitchen", href: "/category/kitchen" }}
    />,
  );

  expect(screen.getByRole("heading", { level: 3, name: "Kitchen" })).toBeTruthy();
  expect(screen.getByText("Cookware")).toBeTruthy();
  expect(screen.getByRole("img", { name: "Kitchen tile" })).toBeTruthy();
  expect(
    screen.getByRole("link", { name: "Open kitchen" }).getAttribute("href"),
  ).toBe("/category/kitchen");
  expect(screen.getAllByRole("link")).toHaveLength(1);
});

test("horizontal exposes the passed copy and one link", () => {
  render(
    <CardMedium
      variant="horizontal"
      title="Kitchen"
      description="Cookware"
      image={image}
      cta={{ label: "Open kitchen", href: "/category/kitchen" }}
    />,
  );

  expect(screen.getByRole("heading", { level: 3, name: "Kitchen" })).toBeTruthy();
  expect(
    screen.getByRole("link", { name: "Open kitchen" }).getAttribute("href"),
  ).toBe("/category/kitchen");
  expect(screen.getAllByRole("link")).toHaveLength(1);
});

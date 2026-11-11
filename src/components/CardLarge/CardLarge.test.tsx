import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";
import { CardLarge } from "./index";

const image = {
  src: "/images/placeholders/category-kitchen.png",
  alt: "Kitchen tile",
  width: 800,
  height: 800,
};

afterEach(() => {
  cleanup();
});

test("horizontal exposes the passed copy and one link", () => {
  render(
    <CardLarge
      variant="horizontal"
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

test("vertical exposes the passed copy and one link", () => {
  render(
    <CardLarge
      variant="vertical"
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

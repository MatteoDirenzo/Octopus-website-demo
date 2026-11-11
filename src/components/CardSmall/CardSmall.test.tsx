import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";
import { CardSmall } from "./index";

afterEach(() => {
  cleanup();
});

test("exposes the passed copy and one link", () => {
  render(
    <CardSmall
      title="Kitchen"
      description="Cookware"
      image={{
        src: "/images/placeholders/category-kitchen.png",
        alt: "Kitchen tile",
        width: 800,
        height: 800,
      }}
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

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";
import { Banner } from "./index";

const image = {
  src: "/images/placeholders/category-kitchen.png",
  alt: "Kitchen tile",
};

afterEach(() => {
  cleanup();
});

test("copy mode exposes the heading, subtitle, image, and one link", () => {
  render(
    <Banner
      title="Ionic hair dryer"
      subtitle="Less frizz"
      image={image}
      cta={{ label: "Learn more", href: "/product/ionic-hair-dryer" }}
    />,
  );

  expect(
    screen.getByRole("heading", { level: 2, name: "Ionic hair dryer" }),
  ).toBeTruthy();
  expect(screen.getByText("Less frizz")).toBeTruthy();
  expect(screen.getByRole("img", { name: "Kitchen tile" })).toBeTruthy();
  expect(
    screen.getByRole("link", { name: "Learn more" }).getAttribute("href"),
  ).toBe("/product/ionic-hair-dryer");
  expect(screen.getAllByRole("link")).toHaveLength(1);
});

test("children mode renders the child and no banner heading or link", () => {
  render(
    <Banner image={image}>
      <p>Custom copy</p>
    </Banner>,
  );

  expect(screen.getByText("Custom copy")).toBeTruthy();
  expect(screen.queryByRole("heading")).toBeNull();
  expect(screen.queryByRole("link")).toBeNull();
});

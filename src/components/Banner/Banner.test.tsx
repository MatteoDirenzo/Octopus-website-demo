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

test("the cta context names the link and is visually hidden", () => {
  render(
    <Banner
      title="Hair Care"
      image={image}
      cta={{
        label: "Learn more",
        href: "/category/hair-care",
        context: "about Hair Care",
      }}
    />,
  );

  const link = screen.getByRole("link", { name: "Learn more about Hair Care" });

  expect(link.getAttribute("href")).toBe("/category/hair-care");
  expect(screen.getByText("about Hair Care").className).toBe("sr-only");
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

test("button-only mode renders the link and no heading", () => {
  render(
    <Banner
      image={image}
      variant="secondary"
      cta={{ label: "Find your nearest store", href: "/where-to-buy" }}
    />,
  );

  expect(screen.queryByRole("heading")).toBeNull();
  expect(
    screen.getByRole("link", { name: "Find your nearest store" }).getAttribute("href"),
  ).toBe("/where-to-buy");
  expect(screen.getAllByRole("link")).toHaveLength(1);
});

const redSet = {
  src: "/images/banner-red.webp",
  alt: "Kettle, blender, and air fryer on a red set",
  desktop: { width: 4096, height: 1755 },
  mobile: { width: 4096, height: 2650 },
  tablet: { width: 810, height: 500 },
};

test("a crop set exposes one image and a source for tablet and desktop", () => {
  render(
    <Banner
      image={redSet}
      cta={{ label: "Find your nearest store", href: "/where-to-buy" }}
    />,
  );

  const picture = screen.getByRole("img", {
    name: "Kettle, blender, and air fryer on a red set",
  });
  const sources = picture.parentElement?.querySelectorAll("source");

  expect(screen.getAllByRole("img")).toHaveLength(1);
  expect(picture.getAttribute("src")).toContain("banner-red-mobile.webp");
  expect(sources?.[0]?.getAttribute("media")).toBe("(min-width: 1200px)");
  expect(sources?.[0]?.getAttribute("srcset")).toContain(
    "banner-red-desktop.webp",
  );
  expect(sources?.[1]?.getAttribute("media")).toBe("(min-width: 810px)");
  expect(sources?.[1]?.getAttribute("srcset")).toContain(
    "banner-red-tablet.webp",
  );
  expect(picture.className).toContain("object-cover");
});

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";
import type { ImageAsset } from "@/types/content";
import { ImageHero } from "./index";

const mobile: ImageAsset = {
  src: "/images/hero-home-poster-mobile.webp",
  alt: "Hair dryer",
  width: 1080,
  height: 1920,
};

const desktop: ImageAsset = {
  src: "/images/hero-home-poster.webp",
  alt: "Hair dryer on a wide frame",
  width: 1920,
  height: 1080,
};

afterEach(() => {
  cleanup();
});

test("shows the portrait image and swaps in the landscape file from 1200px", () => {
  render(<ImageHero mobile={mobile} desktop={desktop} />);

  const image = screen.getByRole("img", { name: "Hair dryer" });
  const source = document.querySelector("source");

  expect(image.getAttribute("src")).toContain("hero-home-poster-mobile.webp");
  expect(source?.getAttribute("media")).toBe("(min-width: 1200px)");
  expect(source?.getAttribute("srcset")).toContain(
    "/images/hero-home-poster.webp",
  );
  expect(source?.getAttribute("srcset")).not.toContain("poster-mobile");
  expect(document.querySelector("video")).toBeNull();
});

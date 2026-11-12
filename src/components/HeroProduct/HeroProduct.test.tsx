import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";
import type { ImageAsset } from "@/types";
import { HeroProduct } from "./index";

const image: ImageAsset = {
  src: "/images/placeholders/countertop-blender-main.png",
  alt: "Octopus Countertop Blender",
  width: 1600,
  height: 1200,
};

afterEach(() => {
  cleanup();
});

test("renders the product image", () => {
  render(<HeroProduct image={image} />);

  const picture = screen.getByRole("img", { name: "Octopus Countertop Blender" });

  expect(picture.getAttribute("src")).toContain(
    "countertop-blender-main.png",
  );
});

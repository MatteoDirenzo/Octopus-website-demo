import { cleanup, render } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";
import type { ProductJsonLd } from "@/types";
import { JsonLd } from "./index";

afterEach(() => {
  cleanup();
});

const data: ProductJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Octopus <Blender>",
  description: "A blender.",
  image: "https://octopus.example/images/blender.webp",
  url: "https://octopus.example/product/blender",
  brand: { "@type": "Brand", name: "Octopus" },
};

test("renders the data as a JSON-LD script that parses back to the same object", () => {
  const { container } = render(<JsonLd data={data} />);
  const script = container.querySelector('script[type="application/ld+json"]');

  expect(script?.innerHTML).not.toContain("<");
  expect(JSON.parse(script?.textContent ?? "")).toEqual(data);
});

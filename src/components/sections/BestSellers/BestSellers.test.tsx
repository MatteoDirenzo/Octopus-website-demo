import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";
import { getBestSellers, getPage } from "@/lib/api";
import { BestSellers } from "./BestSellers";

afterEach(() => {
  cleanup();
});

test("renders one learn more link for each best seller", async () => {
  const page = await getPage("home");
  const section = page.sections.find((item) => item.type === "bestSellers");
  const products = await getBestSellers();

  if (!section || section.type !== "bestSellers") {
    throw new Error("Best sellers section is missing");
  }

  render(await BestSellers({ section }));

  expect(
    screen.getByRole("heading", { level: 2, name: "Best sellers" }),
  ).toBeTruthy();

  for (const product of products) {
    expect(
      screen.getByRole("heading", { level: 3, name: product.name }),
    ).toBeTruthy();
  }

  const links = screen.getAllByRole("link", { name: "Learn more" });

  expect(links).toHaveLength(products.length);
  expect(links.map((link) => link.getAttribute("href"))).toEqual(
    products.map((product) => `/product/${product.slug}`),
  );
});

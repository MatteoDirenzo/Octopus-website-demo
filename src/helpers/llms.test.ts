import { expect, test } from "vitest";
import { getCategories, getProducts, getSite } from "@/lib/api";
import { toLlmsTxt } from "./llms";

test("lists the site, its categories and only products with a detail page", async () => {
  const [site, categories, products] = await Promise.all([
    getSite(),
    getCategories(),
    getProducts(),
  ]);
  const siteUrl = "https://octopus.example";

  const text = toLlmsTxt({ site, categories, products, siteUrl });

  expect(text.startsWith(`# ${site.name}\n\n> ${site.metadata.description}`)).toBe(true);
  expect(text).toContain(`(${siteUrl}/category/kitchen)`);
  expect(text).toContain(`(${siteUrl}/product/countertop-blender)`);
  expect(text).not.toContain("/product/blender)");
});

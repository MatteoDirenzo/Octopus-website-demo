import { expect, test } from "@playwright/test";
import { getProductBySlug, getSite } from "../src/lib/api";

test("home leads to the Countertop Blender product page", async ({ page }) => {
  const [product, site] = await Promise.all([
    getProductBySlug("countertop-blender"),
    getSite(),
  ]);

  if (!product) {
    throw new Error("Countertop Blender product is missing");
  }

  await page.goto("/");

  // Cards have no accessible name, and "Learn more" repeats across the page.
  const card = page.getByRole("article").filter({
    has: page.getByRole("heading", {
      level: 3,
      name: product.name,
      exact: true,
    }),
  });

  await card.getByRole("link", { name: site.learnMore.label }).click();

  await expect(page).toHaveURL(/\/product\/countertop-blender/);
  await expect(page).toHaveTitle(product.name);
  await expect(
    page.getByRole("heading", { level: 1, name: product.name }),
  ).toBeVisible();
});

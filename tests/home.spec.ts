import { expect, test } from "@playwright/test";
import site from "../src/data/site.json";

test("home page renders its placeholder content", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1, name: site.homeHeading })).toBeVisible();
  await expect(page).toHaveTitle(site.title);
});
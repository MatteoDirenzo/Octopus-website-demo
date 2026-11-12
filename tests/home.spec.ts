import { expect, test } from "@playwright/test";
import { getPage } from "../src/lib/api";

test("home page renders its placeholder content", async ({ page }) => {
  const home = await getPage("home");

  if (!home.metadata) {
    throw new Error("Home page metadata is missing");
  }

  await page.goto("/");

  await expect(page).toHaveTitle(home.metadata.title);
  await expect(
    page.getByRole("heading", { level: 1, name: "Octopus Ionic Hair Dryer" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { level: 2, name: "Best sellers" }),
  ).toBeVisible();
});

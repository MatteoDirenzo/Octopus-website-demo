import { expect, test } from "@playwright/test";
import { getPage, getSite } from "../src/lib/api";

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

test("home page does not scroll horizontally", async ({ page }) => {
  await page.goto("/");

  for (const width of [390, 810, 1440]) {
    await page.setViewportSize({ width, height: 900 });

    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    );

    expect(overflow, `overflow at ${width}px`).toBe(0);
  }
});

test("the desktop header fills the page side insets", async ({ page }) => {
  const site = await getSite();

  await page.setViewportSize({ width: 1920, height: 900 });
  await page.goto("/");

  const nav = await page
    .getByRole("navigation", { name: site.header.label })
    .boundingBox();

  expect(nav?.x).toBe(128);
  expect(nav ? 1920 - nav.x - nav.width : null).toBe(128);
});

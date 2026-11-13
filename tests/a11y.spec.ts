import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import { getSite } from "../src/lib/api";

const ROUTES = [
  "/",
  "/category/kitchen",
  "/product/countertop-blender",
  "/where-to-buy",
  "/contact-us",
  "/policies",
  "/missing-page",
];

const VIEWPORTS = [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 810, height: 1080 },
  { name: "desktop", width: 1280, height: 800 },
];

const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

async function axeViolations(page: Page) {
  const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();

  return results.violations.map((violation) => ({
    rule: violation.id,
    impact: violation.impact,
    targets: violation.nodes.map((node) => node.target.join(" ")),
  }));
}

for (const viewport of VIEWPORTS) {
  test.describe(`${viewport.name} (${viewport.width}px)`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    for (const route of ROUTES) {
      test(`${route} has no WCAG A/AA violations`, async ({ page }) => {
        await page.goto(route);

        expect(await axeViolations(page)).toEqual([]);
      });
    }
  });
}

for (const viewport of VIEWPORTS.filter((item) => item.name !== "desktop")) {
  test.describe(`${viewport.name} menu`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    test("open menu has no WCAG A/AA violations", async ({ page }) => {
      const site = await getSite();

      await page.goto("/");
      await page
        .getByRole("button", { name: site.header.openMenuLabel })
        .click();
      await expect(
        page.getByRole("button", { name: site.header.closeMenuLabel }),
      ).toHaveAttribute("aria-expanded", "true");

      expect(await axeViolations(page)).toEqual([]);
    });
  });
}

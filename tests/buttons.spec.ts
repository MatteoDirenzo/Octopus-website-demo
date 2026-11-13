import { expect, test, type Locator } from "@playwright/test";
import { getSite } from "../src/lib/api";

const viewports = [
  { name: "mobile", width: 390, height: 844, bar: 59, menu: true },
  { name: "tablet", width: 810, height: 1080, bar: 64, menu: true },
  { name: "desktop", width: 1280, height: 800, bar: 64, menu: false },
];

async function heightOf(locator: Locator) {
  return (await locator.boundingBox())?.height;
}

for (const viewport of viewports) {
  test.describe(viewport.name, () => {
    test.use({
      viewport: { width: viewport.width, height: viewport.height },
    });

    test("the header bar has its fixed height", async ({ page }) => {
      const site = await getSite();

      await page.goto("/");

      const nav = page.getByRole("navigation", { name: site.header.label });

      expect(await heightOf(nav)).toBe(viewport.bar);
    });

    test("header buttons are 40px tall with a 500 label", async ({ page }) => {
      const site = await getSite();

      await page.goto("/");

      const nav = page.getByRole("navigation", { name: site.header.label });

      if (viewport.menu) {
        const toggle = nav.getByRole("button", {
          name: site.header.openMenuLabel,
        });
        const toggleBox = await toggle.boundingBox();

        expect(toggleBox?.height).toBe(40);
        expect(toggleBox?.width).toBe(40);
        await toggle.click();
      }

      const whereToBuy = nav.getByRole("link", {
        name: site.header.whereToBuy.label,
      });

      expect(
        await heightOf(
          nav.getByRole("link", { name: site.header.home.label, exact: true }),
        ),
      ).toBe(40);
      expect(
        await heightOf(
          nav.getByRole("link", { name: site.header.links[0].label }),
        ),
      ).toBe(40);
      expect(await heightOf(whereToBuy)).toBe(40);
      await expect(whereToBuy).toHaveCSS("font-weight", "500");
    });

    test("carousel arrows are 40px squares", async ({ page }) => {
      const site = await getSite();

      await page.goto("/");

      const next = page
        .getByRole("button", { name: site.carousel.next })
        .first();

      await next.scrollIntoViewIfNeeded();
      const box = await next.boundingBox();

      expect(box?.height).toBe(40);
      expect(box?.width).toBe(40);
    });
  });
}

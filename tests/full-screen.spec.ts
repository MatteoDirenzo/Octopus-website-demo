import { expect, test } from "@playwright/test";
import { getContactPage, getSite } from "../src/lib/api";

const viewports = [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 810, height: 1080 },
  { name: "desktop", width: 1440, height: 900 },
];

for (const viewport of viewports) {
  test.describe(viewport.name, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    test("the home hero fills the first screen", async ({ page }) => {
      await page.goto("/");

      const hero = await page
        .getByRole("region", { name: "Octopus Ionic Hair Dryer" })
        .boundingBox();
      const next = await page
        .getByRole("heading", { level: 2, name: "Best sellers" })
        .boundingBox();

      expect(hero?.y).toBe(0);
      expect(hero?.height).toBe(viewport.height);
      expect(next?.y).toBeGreaterThanOrEqual(viewport.height);
    });

    test("a placeholder page fills the first screen", async ({ page }) => {
      const [contact, site] = await Promise.all([getContactPage(), getSite()]);

      await page.goto("/contact-us");

      await expect(
        page.getByRole("heading", { level: 1, name: contact.heading.title }),
      ).toBeVisible();

      const main = await page.getByRole("main").boundingBox();
      const footer = await page
        .getByRole("contentinfo", { name: site.footer.label })
        .boundingBox();
      const overflow = await page.evaluate(
        () =>
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
      );

      expect(main?.y).toBe(0);
      expect(main?.height).toBe(viewport.height);
      expect(footer?.y).toBe(viewport.height);
      expect(overflow).toBe(0);
    });
  });
}

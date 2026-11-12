import { expect, test } from "@playwright/test";
import { ROUTES } from "../src/config/routes";
import { SITE_URL } from "../src/config/site";
import { categoryHref, productHref } from "../src/helpers/routes";
import { getCategories, getProducts } from "../src/lib/api";

type SeoRoute = { path: string; noIndex: boolean };

async function seoRoutes(): Promise<SeoRoute[]> {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  return [
    { path: ROUTES.home, noIndex: false },
    ...products.map((product) => ({
      path: productHref(product.slug),
      noIndex: !product.detail,
    })),
    ...categories.map((category) => ({ path: categoryHref(category.id), noIndex: true })),
    { path: ROUTES.whereToBuy, noIndex: true },
    { path: ROUTES.contactUs, noIndex: true },
    { path: ROUTES.policies, noIndex: true },
  ];
}

test("every page has one h1, its own canonical, share tags and the right robots", async ({
  page,
}) => {
  const titles: string[] = [];
  const descriptions: string[] = [];

  for (const route of await seoRoutes()) {
    await page.goto(route.path);

    await expect(page.locator("h1"), route.path).toHaveCount(1);
    /* Next drops the slash on the home canonical; for a bare origin it is the same URL. */
    await expect(page.locator('link[rel="canonical"]'), route.path).toHaveAttribute(
      "href",
      route.path === ROUTES.home ? SITE_URL : `${SITE_URL}${route.path}`,
    );
    await expect(page.locator('meta[property="og:image"]'), route.path).toHaveCount(1);
    await expect(page.locator('meta[property="og:image:alt"]'), route.path).toHaveCount(1);
    await expect(page.locator('meta[name="twitter:card"]'), route.path).toHaveAttribute(
      "content",
      "summary_large_image",
    );

    const robots = page.locator('meta[name="robots"]');
    if (route.noIndex) {
      await expect(robots, route.path).toHaveAttribute("content", /noindex/);
    } else {
      await expect(robots, route.path).toHaveCount(0);
    }

    titles.push(await page.title());
    descriptions.push(
      (await page.locator('meta[name="description"]').getAttribute("content")) ?? "",
    );
  }

  expect(new Set(titles).size).toBe(titles.length);
  expect(new Set(descriptions).size).toBe(descriptions.length);
});

test("the not-found page has one h1 and no canonical", async ({ page }) => {
  await page.goto("/missing-page");

  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
});

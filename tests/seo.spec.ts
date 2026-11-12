import { expect, test, type Page } from "@playwright/test";
import { ROUTES } from "../src/config/routes";
import { SITE_URL } from "../src/config/site";
import { categoryHref, productHref } from "../src/helpers/routes";
import { getCategories, getProducts, getSite } from "../src/lib/api";

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

/** Every JSON-LD block on the page. `JSON.parse` throws if one is not valid JSON. */
async function readJsonLd(page: Page): Promise<Record<string, unknown>[]> {
  const blocks = await page
    .locator('script[type="application/ld+json"]')
    .allTextContents();

  return blocks.map((block) => JSON.parse(block));
}

test("the home describes the organisation and the website", async ({ page }) => {
  const site = await getSite();
  const homeUrl = new URL(ROUTES.home, SITE_URL).href;

  await page.goto(ROUTES.home);
  const [data, ...rest] = await readJsonLd(page);

  expect(rest).toHaveLength(0);
  expect(data).toMatchObject({
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Organization", name: site.name, url: homeUrl },
      { "@type": "WebSite", name: site.name, url: homeUrl },
    ],
  });
});

test("product JSON-LD matches the visible name and description", async ({ page }) => {
  const site = await getSite();
  const products = await getProducts();
  const withDetail = products.find((product) => product.detail);
  const withoutDetail = products.find((product) => !product.detail);

  if (!withDetail || !withoutDetail) {
    throw new Error("Expected products with and without detail");
  }

  await page.goto(productHref(withDetail.slug));
  const [data, ...rest] = await readJsonLd(page);
  const name = await page.locator("h1").textContent();
  const description = await page
    .locator('meta[name="description"]')
    .getAttribute("content");

  expect(rest).toHaveLength(0);
  expect(data).toMatchObject({
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    url: `${SITE_URL}${productHref(withDetail.slug)}`,
    brand: { "@type": "Brand", name: site.name },
  });
  expect(String(data?.image).startsWith(`${SITE_URL}/`)).toBe(true);
  await expect(page.getByText(String(data?.description), { exact: true })).toBeVisible();
  expect(data).not.toHaveProperty("offers");
  expect(data).not.toHaveProperty("aggregateRating");

  await page.goto(productHref(withoutDetail.slug));
  expect(await readJsonLd(page)).toHaveLength(0);
});

test("llms.txt summarises the site from the data", async ({ request }) => {
  const site = await getSite();
  const response = await request.get("/llms.txt");
  const text = await response.text();

  expect(response.ok()).toBe(true);
  expect(response.headers()["content-type"]).toContain("text/plain");
  expect(text.startsWith(`# ${site.name}\n`)).toBe(true);
  expect(text).toContain(new URL(ROUTES.home, SITE_URL).href);
});

test("the not-found page has one h1 and no canonical", async ({ page }) => {
  await page.goto("/missing-page");

  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
});

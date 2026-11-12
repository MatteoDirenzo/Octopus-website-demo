import { expect, test } from "vitest";
import { SITE_URL } from "@/config/site";
import { getProducts } from "@/lib/api";
import robots from "./robots";
import sitemap from "./sitemap";

test("lists the home and every product with detail, as absolute URLs", async () => {
  const products = await getProducts();
  const indexable = products.filter((product) => product.detail);

  const urls = (await sitemap()).map((entry) => entry.url);

  expect(urls).toEqual([
    `${SITE_URL}/`,
    ...indexable.map((product) => `${SITE_URL}/product/${product.slug}`),
  ]);
  expect(urls).toContain(`${SITE_URL}/product/countertop-blender`);
});

test("leaves out noindex pages", async () => {
  const products = await getProducts();
  const thin = products.filter((product) => !product.detail);

  const urls = (await sitemap()).map((entry) => entry.url);

  for (const product of thin) {
    expect(urls).not.toContain(`${SITE_URL}/product/${product.slug}`);
  }
  for (const url of urls) {
    expect(url).not.toMatch(/\/(category|where-to-buy|contact-us|policies)/);
  }
});

test("robots.txt allows crawling and points to the sitemap", () => {
  expect(robots()).toEqual({
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  });
});

import { expect, test } from "vitest";
import type { ProductJsonLd } from "@/types";
import { productJsonLd, serializeJsonLd, siteJsonLd } from "./jsonLd";

const siteUrl = "https://octopus.example";

const product = { name: "Octopus Countertop Blender", slug: "countertop-blender" };

const detail = {
  description: "A countertop blender with presets.",
  mainImage: {
    src: "/images/products/mixer-big.webp",
    alt: "Octopus Countertop Blender",
    width: 1600,
    height: 1200,
  },
};

test("serializeJsonLd escapes < so a value cannot close the script tag", () => {
  const data: ProductJsonLd = {
    ...productJsonLd({ product, detail, brand: "Octopus", siteUrl }),
    name: "</script><script>alert(1)</script>\u2028",
  };

  const json = serializeJsonLd(data);

  expect(json).not.toContain("<");
  expect(json).not.toContain("\u2028");
  expect(json).toContain("\\u003c/script>");
  expect(JSON.parse(json)).toEqual(data);
});

test("siteJsonLd links the WebSite to the Organization, both named from the site", () => {
  const site = {
    name: "Octopus",
    metadata: { title: "Octopus - Home", description: "Smart appliances." },
  };

  const [organization, website] = siteJsonLd(site, siteUrl)["@graph"];

  expect(organization).toMatchObject({
    "@type": "Organization",
    name: "Octopus",
    url: `${siteUrl}/`,
    description: "Smart appliances.",
  });
  expect(website).toMatchObject({ "@type": "WebSite", name: "Octopus", url: `${siteUrl}/` });
  expect(website.publisher["@id"]).toBe(organization["@id"]);
});

test("productJsonLd uses the product copy, an absolute image and the brand, and no offers", () => {
  const data = productJsonLd({
    product,
    detail,
    category: { title: "Kitchen" },
    brand: "Octopus",
    siteUrl,
  });

  expect(data).toEqual({
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: detail.description,
    image: `${siteUrl}/images/products/mixer-big.webp`,
    url: `${siteUrl}/product/countertop-blender`,
    category: "Kitchen",
    brand: { "@type": "Brand", name: "Octopus" },
  });
  expect(data).not.toHaveProperty("offers");
  expect(data).not.toHaveProperty("aggregateRating");
});

test("productJsonLd omits the category when it is unknown", () => {
  const data = productJsonLd({ product, detail, brand: "Octopus", siteUrl });

  expect(data).not.toHaveProperty("category");
});

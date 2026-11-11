import homePage from "../../data/pages/home.json";
import productPage from "../../data/pages/product.json";
import whereToBuyPage from "../../data/pages/where-to-buy.json";
import type { PageConfig, WhereToBuyPage } from "../../types/content";
import { readContent } from "./shared";

/** Home or product page config. The product page does not name a product. */
export async function getPage(id: "home" | "product"): Promise<PageConfig> {
  const page = id === "home" ? homePage : productPage;
  return readContent<PageConfig>(page);
}

/** Where to buy metadata and heading. The nav label stays in `site.json`. */
export async function getWhereToBuyPage(): Promise<WhereToBuyPage> {
  return readContent<WhereToBuyPage>(whereToBuyPage);
}

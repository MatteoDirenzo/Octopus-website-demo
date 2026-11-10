import homePage from "../../data/pages/home.json";
import productPage from "../../data/pages/product.json";
import type { PageConfig } from "../../types/content";
import { readContent } from "./shared";

/** Home or product page config. The product page does not name a product. */
export async function getPage(id: "home" | "product"): Promise<PageConfig> {
  const page = id === "home" ? homePage : productPage;
  return readContent<PageConfig>(page);
}

import contactPage from "../../data/pages/contact-us.json";
import homePage from "../../data/pages/home.json";
import notFoundPage from "../../data/pages/not-found.json";
import policiesPage from "../../data/pages/policies.json";
import productPage from "../../data/pages/product.json";
import whereToBuyPage from "../../data/pages/where-to-buy.json";
import type {
  ContactPage,
  NotFoundPage,
  PageConfig,
  PoliciesPage,
  WhereToBuyPage,
} from "../../types/content";
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

/** Contact metadata and heading. The nav label stays in `site.json`. */
export async function getContactPage(): Promise<ContactPage> {
  return readContent<ContactPage>(contactPage);
}

/** Policies metadata. The page body is blank. The nav label stays in `site.json`. */
export async function getPoliciesPage(): Promise<PoliciesPage> {
  return readContent<PoliciesPage>(policiesPage);
}

/** Not-found metadata and heading. */
export async function getNotFoundPage(): Promise<NotFoundPage> {
  return readContent<NotFoundPage>(notFoundPage);
}

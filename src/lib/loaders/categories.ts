import { notFound } from "next/navigation";
import { getCategory } from "@/lib/api";
import type { Category } from "@/types/content";

/** Category for this slug. An unknown slug renders the not-found page. */
export async function loadCategory(slug: string): Promise<Category> {
  const category = await getCategory(slug);

  if (!category) {
    notFound();
  }

  return category;
}

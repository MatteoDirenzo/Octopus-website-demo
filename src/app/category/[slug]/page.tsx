import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/PlaceholderPage";
import { categoryHref } from "@/helpers/routes";
import { getCategories, getCategory, getNotFoundPage } from "@/lib/api";
import { loadCategory, loadMetadata } from "@/lib/loaders";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const categories = await getCategories();

  return categories.map((category) => ({ slug: category.id }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategory(slug);

  /*
   * An unknown slug 404s from the page loader.
   * `notFound()` in metadata replaces the document with an empty shell.
   */
  if (!category) {
    const page = await getNotFoundPage();

    return loadMetadata(page.metadata);
  }

  return loadMetadata(
    { title: category.title, description: category.tagline },
    { path: categoryHref(category.id), noIndex: true },
  );
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await loadCategory(slug);

  return <PlaceholderPage title={category.title} />;
}

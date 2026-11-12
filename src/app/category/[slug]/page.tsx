import type { Metadata } from "next";
import { Heading } from "@/components/Heading";
import { getCategories, getCategory, getNotFoundPage } from "@/lib/api";
import { loadCategory } from "@/lib/loaders";

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

    return {
      title: page.metadata.title,
      description: page.metadata.description,
      openGraph: {
        title: page.metadata.title,
        description: page.metadata.description,
        type: "website",
      },
    };
  }

  return {
    title: category.title,
    description: category.tagline,
    openGraph: {
      title: category.title,
      description: category.tagline,
      type: "website",
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await loadCategory(slug);

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-4 tablet:px-8 desktop:px-32">
      <Heading className="w-full" title={category.title} />
    </main>
  );
}

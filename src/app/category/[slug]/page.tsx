import type { Metadata } from "next";
import { Heading } from "@/components/Heading";
import { getCategories } from "@/lib/api";
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
  const category = await loadCategory(slug);

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
    <main>
      <Heading title={category.title} />
    </main>
  );
}

import type { Metadata } from "next";
import { Heading } from "@/components/Heading";
import { PageSections } from "@/components/PageSections";
import { toMetadata } from "@/helpers/metadata";
import { getNotFoundPage, getPage, getProductBySlug, getProducts } from "@/lib/api";
import { loadProduct } from "@/lib/loaders";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const products = await getProducts();

  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  /*
   * An unknown slug 404s from the page loader.
   * `notFound()` in metadata replaces the document with an empty shell.
   */
  if (!product) {
    const page = await getNotFoundPage();

    return toMetadata(page.metadata);
  }

  return toMetadata({
    title: product.name,
    description: product.detail?.description ?? product.shortDescription,
  });
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await loadProduct(slug);

  if (!product.detail) {
    return (
      <main className="flex min-h-dvh flex-col items-center justify-center px-4 tablet:px-8 desktop:px-32">
        <Heading className="w-full" title={product.name} />
      </main>
    );
  }

  const page = await getPage("product");

  /*
   * `buy-bar-space` lets the fixed mobile buy bar clear the footer.
   * The rule lives in `globals.css` because the footer is outside this page.
   */
  return (
    <main className="buy-bar-space">
      <PageSections blocks={page.sections} product={product} />
    </main>
  );
}

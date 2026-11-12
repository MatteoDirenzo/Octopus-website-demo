import type { Metadata } from "next";
import { Heading } from "@/components/Heading";
import { PageSections } from "@/components/PageSections";
import { MAIN_CONTENT_ID } from "@/config/routes";
import { productHref } from "@/helpers/routes";
import { getNotFoundPage, getPage, getProductBySlug, getProducts } from "@/lib/api";
import { loadMetadata, loadProduct } from "@/lib/loaders";

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

    return loadMetadata(page.metadata);
  }

  /* A product without `detail` shows only its name, so it stays out of the index. */
  return loadMetadata(
    {
      title: product.name,
      description: product.detail?.description ?? product.shortDescription,
    },
    { path: productHref(product.slug), noIndex: !product.detail },
  );
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await loadProduct(slug);

  if (!product.detail) {
    return (
      <main
        id={MAIN_CONTENT_ID}
        tabIndex={-1}
        className="flex min-h-dvh flex-col items-center justify-center px-4 outline-none tablet:px-8 desktop:px-32"
      >
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
    <main id={MAIN_CONTENT_ID} tabIndex={-1} className="buy-bar-space outline-none">
      <PageSections blocks={page.sections} product={product} />
    </main>
  );
}

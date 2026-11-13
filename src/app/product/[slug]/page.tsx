import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { PageSections } from "@/components/PageSections";
import { PlaceholderPage } from "@/components/PlaceholderPage";
import { MAIN_CONTENT_ID } from "@/config/routes";
import { SITE_URL } from "@/config/site";
import { productJsonLd } from "@/helpers/jsonLd";
import { productHref } from "@/helpers/routes";
import {
  getCategory,
  getNotFoundPage,
  getPage,
  getProductBySlug,
  getProducts,
  getSite,
} from "@/lib/api";
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
    return <PlaceholderPage title={product.name} />;
  }

  const [page, site, category] = await Promise.all([
    getPage("product"),
    getSite(),
    getCategory(product.category),
  ]);

  /*
   * `buy-bar-space` lets the fixed mobile buy bar clear the footer.
   * The rule lives in `globals.css` because the footer is outside this page.
   * The JSON-LD reads the same `name` and `detail` the product showcase renders.
   */
  return (
    <main id={MAIN_CONTENT_ID} tabIndex={-1} className="buy-bar-space outline-none">
      <JsonLd
        data={productJsonLd({
          product,
          detail: product.detail,
          category: category ?? undefined,
          brand: site.name,
          siteUrl: SITE_URL,
        })}
      />
      <PageSections blocks={page.sections} product={product} />
    </main>
  );
}

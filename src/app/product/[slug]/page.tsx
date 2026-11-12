import type { Metadata } from "next";
import { PageSections } from "@/components/PageSections";
import { getPage, getProducts } from "@/lib/api";
import { loadProduct } from "@/lib/loaders";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const products = await getProducts();

  return products.flatMap((product) =>
    product.detail ? [{ slug: product.slug }] : [],
  );
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await loadProduct(slug);

  return {
    title: product.name,
    description: product.detail.description,
    openGraph: {
      title: product.name,
      description: product.detail.description,
      type: "website",
    },
  };
}

/**
 * `buy-bar-space` lets the fixed mobile buy bar clear the footer.
 * The rule lives in `globals.css` because the footer is outside this page.
 */
export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await loadProduct(slug);
  const page = await getPage("product");

  return (
    <main className="buy-bar-space">
      <PageSections blocks={page.sections} product={product} />
    </main>
  );
}

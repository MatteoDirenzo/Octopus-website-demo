import { productHref } from "@/helpers/routes";
import type {
  CategoryShowcaseCard,
  ImageAsset,
  Product,
  ProductDetail,
  SpecsDownload,
  SpecsGroup,
} from "@/types";

/** Product specs as accordion groups with a list body. */
export function toSpecGroups(detail: ProductDetail): SpecsGroup[] {
  return detail.specs.map((group) => ({
    id: group.id,
    title: group.title,
    body: { kind: "list", items: group.items },
  }));
}

/**
 * The specs component shows one file. Later downloads stay in the data.
 */
export function toDownload(detail: ProductDetail): SpecsDownload | undefined {
  const file = detail.downloads[0];

  if (!file) {
    return undefined;
  }

  return {
    label: detail.downloadsTitle,
    fileLabel: file.label,
    href: file.href,
  };
}

/** A category showcase card that links to the product page. */
export function toShowcaseCard(
  product: Product,
  image: ImageAsset,
  label: string,
  background = false,
): CategoryShowcaseCard {
  return {
    title: product.name,
    description: product.shortDescription,
    image,
    background,
    cta: {
      label,
      href: productHref(product.slug),
    },
  };
}

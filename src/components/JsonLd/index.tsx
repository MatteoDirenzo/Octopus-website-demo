import { serializeJsonLd } from "@/helpers/jsonLd";
import type { JsonLdData } from "@/types";

export type JsonLdProps = {
  data: JsonLdData;
};

/**
 * Structured data for crawlers and generative engines.
 * A native `script`, not `next/script`: this is data, not code to load.
 * `dangerouslySetInnerHTML` is needed because React escapes text children, which
 * would corrupt the JSON. It is safe because `serializeJsonLd` escapes `<`, so
 * no value can close the tag.
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}

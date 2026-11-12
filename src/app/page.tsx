import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { PageSections } from "@/components/PageSections";
import { MAIN_CONTENT_ID, ROUTES } from "@/config/routes";
import { SITE_URL } from "@/config/site";
import { siteJsonLd } from "@/helpers/jsonLd";
import { getPage, getSite } from "@/lib/api";
import { loadMetadata } from "@/lib/loaders";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage("home");

  return loadMetadata(page.metadata ?? {}, { path: ROUTES.home });
}

export default async function Home() {
  const [page, site] = await Promise.all([getPage("home"), getSite()]);

  return (
    <main id={MAIN_CONTENT_ID} tabIndex={-1} className="outline-none">
      <JsonLd data={siteJsonLd(site, SITE_URL)} />
      <PageSections blocks={page.sections} />
    </main>
  );
}

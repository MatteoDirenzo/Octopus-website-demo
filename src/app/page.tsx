import type { Metadata } from "next";
import { PageSections } from "@/components/PageSections";
import { MAIN_CONTENT_ID, ROUTES } from "@/config/routes";
import { getPage } from "@/lib/api";
import { loadMetadata } from "@/lib/loaders";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage("home");

  return loadMetadata(page.metadata ?? {}, { path: ROUTES.home });
}

export default async function Home() {
  const page = await getPage("home");

  return (
    <main id={MAIN_CONTENT_ID} tabIndex={-1} className="outline-none">
      <PageSections blocks={page.sections} />
    </main>
  );
}

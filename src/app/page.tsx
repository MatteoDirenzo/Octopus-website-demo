import type { Metadata } from "next";
import { PageSections } from "@/components/PageSections";
import { MAIN_CONTENT_ID } from "@/config/routes";
import { toMetadata } from "@/helpers/metadata";
import { getPage } from "@/lib/api";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage("home");

  return toMetadata(page.metadata);
}

export default async function Home() {
  const page = await getPage("home");

  return (
    <main id={MAIN_CONTENT_ID} tabIndex={-1} className="outline-none">
      <PageSections blocks={page.sections} />
    </main>
  );
}

import type { Metadata } from "next";
import { PageSections } from "@/components/PageSections";
import { toMetadata } from "@/helpers/metadata";
import { getPage } from "@/lib/api";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage("home");

  return toMetadata(page.metadata);
}

export default async function Home() {
  const page = await getPage("home");

  return (
    <main>
      <PageSections blocks={page.sections} />
    </main>
  );
}

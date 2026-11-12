import type { Metadata } from "next";
import { PageSections } from "@/components/PageSections";
import { getPage } from "@/lib/api";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage("home");

  return {
    title: page.metadata?.title,
    description: page.metadata?.description,
    openGraph: {
      title: page.metadata?.title,
      description: page.metadata?.description,
      type: "website",
    },
  };
}

export default async function Home() {
  const page = await getPage("home");

  return (
    <main>
      <PageSections blocks={page.sections} />
    </main>
  );
}

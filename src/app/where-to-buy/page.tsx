import type { Metadata } from "next";
import { Heading } from "@/components/Heading";
import { getWhereToBuyPage } from "@/lib/api";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getWhereToBuyPage();

  return {
    title: page.metadata.title,
    description: page.metadata.description,
    openGraph: {
      title: page.metadata.title,
      description: page.metadata.description,
      type: "website",
    },
  };
}

export default async function WhereToBuyPage() {
  const page = await getWhereToBuyPage();

  return (
    <main>
      <Heading title={page.heading.title} />
    </main>
  );
}

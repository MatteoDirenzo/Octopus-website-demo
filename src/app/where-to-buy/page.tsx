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
    <main className="flex min-h-dvh flex-col items-center justify-center px-4 tablet:px-8 desktop:px-32">
      <Heading className="w-full" title={page.heading.title} />
    </main>
  );
}

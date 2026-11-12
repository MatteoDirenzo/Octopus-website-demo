import type { Metadata } from "next";
import { Heading } from "@/components/Heading";
import { getNotFoundPage } from "@/lib/api";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getNotFoundPage();

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

/** Unknown routes. The title comes from the page JSON. */
export default async function NotFound() {
  const page = await getNotFoundPage();

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-4 tablet:px-8 desktop:px-32">
      <Heading className="w-full" title={page.heading.title} />
    </main>
  );
}

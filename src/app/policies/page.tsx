import type { Metadata } from "next";
import { getPoliciesPage } from "@/lib/api";
import { Heading } from "@/components/Heading";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPoliciesPage();

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

/** Blank until the policies copy exists. The title still comes from the page JSON. */
export default async function PoliciesPage() {
  const page = await getPoliciesPage();

  return (
    <main>
      <Heading title={page.heading.title} />
    </main>
  );
}

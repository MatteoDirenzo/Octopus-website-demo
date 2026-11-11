import type { Metadata } from "next";
import { Heading } from "@/components/Heading";
import { getContactPage } from "@/lib/api";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getContactPage();

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

export default async function ContactPage() {
  const page = await getContactPage();

  return (
    <main>
      <Heading title={page.heading.title} />
    </main>
  );
}

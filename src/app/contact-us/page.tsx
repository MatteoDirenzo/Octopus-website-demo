import type { Metadata } from "next";
import { Heading } from "@/components/Heading";
import { toMetadata } from "@/helpers/metadata";
import { getContactPage } from "@/lib/api";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getContactPage();

  return toMetadata(page.metadata);
}

export default async function ContactPage() {
  const page = await getContactPage();

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-4 tablet:px-8 desktop:px-32">
      <Heading className="w-full" title={page.heading.title} />
    </main>
  );
}

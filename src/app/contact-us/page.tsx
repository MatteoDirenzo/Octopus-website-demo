import type { Metadata } from "next";
import { Heading } from "@/components/Heading";
import { MAIN_CONTENT_ID, ROUTES } from "@/config/routes";
import { getContactPage } from "@/lib/api";
import { loadMetadata } from "@/lib/loaders";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getContactPage();

  return loadMetadata(page.metadata, { path: ROUTES.contactUs, noIndex: true });
}

export default async function ContactPage() {
  const page = await getContactPage();

  return (
    <main
      id={MAIN_CONTENT_ID}
      tabIndex={-1}
      className="flex min-h-svh flex-col items-center justify-center px-4 outline-none tablet:px-8 desktop:px-32"
    >
      <Heading className="w-full" title={page.heading.title} />
    </main>
  );
}

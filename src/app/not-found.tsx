import type { Metadata } from "next";
import { Heading } from "@/components/Heading";
import { MAIN_CONTENT_ID } from "@/config/routes";
import { getNotFoundPage } from "@/lib/api";
import { loadMetadata } from "@/lib/loaders";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getNotFoundPage();

  return loadMetadata(page.metadata);
}

/** Unknown routes. The title comes from the page JSON. */
export default async function NotFound() {
  const page = await getNotFoundPage();

  return (
    <main
      id={MAIN_CONTENT_ID}
      tabIndex={-1}
      className="flex min-h-dvh flex-col items-center justify-center px-4 outline-none tablet:px-8 desktop:px-32"
    >
      <Heading className="w-full" title={page.heading.title} />
    </main>
  );
}

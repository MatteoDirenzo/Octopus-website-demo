import type { Metadata } from "next";
import { Heading } from "@/components/Heading";
import { MAIN_CONTENT_ID, ROUTES } from "@/config/routes";
import { getWhereToBuyPage } from "@/lib/api";
import { loadMetadata } from "@/lib/loaders";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getWhereToBuyPage();

  return loadMetadata(page.metadata, { path: ROUTES.whereToBuy, noIndex: true });
}

export default async function WhereToBuyPage() {
  const page = await getWhereToBuyPage();

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

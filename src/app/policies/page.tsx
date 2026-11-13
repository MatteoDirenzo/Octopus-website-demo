import type { Metadata } from "next";
import { getPoliciesPage } from "@/lib/api";
import { Heading } from "@/components/Heading";
import { MAIN_CONTENT_ID, ROUTES } from "@/config/routes";
import { loadMetadata } from "@/lib/loaders";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPoliciesPage();

  return loadMetadata(page.metadata, { path: ROUTES.policies, noIndex: true });
}

/** Blank until the policies copy exists. The title still comes from the page JSON. */
export default async function PoliciesPage() {
  const page = await getPoliciesPage();

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

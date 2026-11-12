import type { Metadata } from "next";
import { getPoliciesPage } from "@/lib/api";
import { Heading } from "@/components/Heading";
import { MAIN_CONTENT_ID } from "@/config/routes";
import { toMetadata } from "@/helpers/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPoliciesPage();

  return toMetadata(page.metadata);
}

/** Blank until the policies copy exists. The title still comes from the page JSON. */
export default async function PoliciesPage() {
  const page = await getPoliciesPage();

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

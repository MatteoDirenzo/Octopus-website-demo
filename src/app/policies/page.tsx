import type { Metadata } from "next";
import { getPoliciesPage } from "@/lib/api";
import { PlaceholderPage } from "@/components/PlaceholderPage";
import { ROUTES } from "@/config/routes";
import { loadMetadata } from "@/lib/loaders";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPoliciesPage();

  return loadMetadata(page.metadata, { path: ROUTES.policies, noIndex: true });
}

/** Blank until the policies copy exists. The title still comes from the page JSON. */
export default async function PoliciesPage() {
  const page = await getPoliciesPage();

  return <PlaceholderPage title={page.heading.title} />;
}

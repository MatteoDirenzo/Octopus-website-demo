import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/PlaceholderPage";
import { getNotFoundPage } from "@/lib/api";
import { loadMetadata } from "@/lib/loaders";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getNotFoundPage();

  return loadMetadata(page.metadata);
}

/** Unknown routes. The title comes from the page JSON. */
export default async function NotFound() {
  const page = await getNotFoundPage();

  return <PlaceholderPage title={page.heading.title} />;
}

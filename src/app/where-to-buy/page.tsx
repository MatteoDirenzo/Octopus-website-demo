import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/PlaceholderPage";
import { ROUTES } from "@/config/routes";
import { getWhereToBuyPage } from "@/lib/api";
import { loadMetadata } from "@/lib/loaders";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getWhereToBuyPage();

  return loadMetadata(page.metadata, { path: ROUTES.whereToBuy, noIndex: true });
}

export default async function WhereToBuyPage() {
  const page = await getWhereToBuyPage();

  return <PlaceholderPage title={page.heading.title} />;
}

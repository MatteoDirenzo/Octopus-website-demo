import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/PlaceholderPage";
import { ROUTES } from "@/config/routes";
import { getContactPage } from "@/lib/api";
import { loadMetadata } from "@/lib/loaders";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getContactPage();

  return loadMetadata(page.metadata, { path: ROUTES.contactUs, noIndex: true });
}

export default async function ContactPage() {
  const page = await getContactPage();

  return <PlaceholderPage title={page.heading.title} />;
}

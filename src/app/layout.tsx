import clsx from "clsx";
import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SkipLink } from "@/components/SkipLink";
import { SITE_URL } from "@/config/site";
import { getSite } from "@/lib/api";
import { loadMetadata } from "@/lib/loaders";
import { fontProject } from "@/styles/fonts";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();

  return {
    ...(await loadMetadata(site.metadata)),
    metadataBase: new URL(SITE_URL),
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const site = await getSite();

  return (
    <html lang="en" className="scroll-pt-header tablet:scroll-pt-header-tablet">
      <body
        className={clsx(
          fontProject.variable,
          " pt-header font-sans  tablet:pt-header-tablet",
        )}
      >
        <SkipLink label={site.skipToContent} />
        <Header header={site.header} />
        {children}
        <Footer footer={site.footer} />
      </body>
    </html>
  );
}

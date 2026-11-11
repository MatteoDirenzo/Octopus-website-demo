import clsx from "clsx";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { getSite } from "@/lib/api";
import { fontProject } from "@/styles/fonts";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();

  return {
    title: site.metadata.title,
    description: site.metadata.description,
    openGraph: {
      title: site.metadata.title,
      description: site.metadata.description,
      type: "website",
    },
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
        <Header header={site.header} />
        {children}
      </body>
    </html>
  );
}

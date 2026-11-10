import type { Metadata } from "next";
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body
        className={`${fontProject.variable} bg-surface font-sans text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}

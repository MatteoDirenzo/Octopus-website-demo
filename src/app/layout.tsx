import type { Metadata } from "next";
import metadataContent from "@/data/metadata.json";
import { fontProject } from "@/styles/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: metadataContent.title,
  description: metadataContent.description,
  openGraph: {
    title: metadataContent.title,
    description: metadataContent.description,
    type: "website",
  },
};

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

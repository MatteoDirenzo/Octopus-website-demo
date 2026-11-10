import type { Metadata } from "next";
import site from "@/data/site.json";
import { projectFont } from "@/styles/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
  openGraph: {
    title: site.title,
    description: site.description,
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className={`${projectFont.variable} bg-surface font-sans text-foreground`}>
        {children}
      </body>
    </html>
  );
}

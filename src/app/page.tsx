import type { Metadata } from "next";
import { Fragment } from "react";
import { renderSection } from "@/components/sections/registry";
import { getPage } from "@/lib/api";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage("home");

  return {
    title: page.metadata?.title,
    description: page.metadata?.description,
    openGraph: {
      title: page.metadata?.title,
      description: page.metadata?.description,
      type: "website",
    },
  };
}

export default async function Home() {
  const page = await getPage("home");

  return (
    <main>
      {page.sections.map((section, index) => (
        <Fragment key={`${section.type}-${index}`}>
          {renderSection(section)}
        </Fragment>
      ))}
    </main>
  );
}

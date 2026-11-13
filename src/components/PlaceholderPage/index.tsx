import clsx from "clsx";
import { Heading } from "@/components/Heading";
import { MAIN_CONTENT_ID } from "@/config/routes";

export type PlaceholderPageProps = {
  /** The page's only `h1`. */
  title: string;
};

/**
 * One-screen page with a centred title. The footer shows only on scroll.
 * The body pads the fixed header, so the main pulls up under it by the same
 * height and pads it back. It then starts at the top of the screen and is one
 * small viewport tall: `border-box` keeps the padding inside the height, and
 * the title centres in the area below the header.
 */
export function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <main
      id={MAIN_CONTENT_ID}
      tabIndex={-1}
      className={clsx(
        "-mt-header flex min-h-svh flex-col items-center justify-center px-4 pt-header outline-none",
        "tablet:-mt-header-tablet tablet:px-8 tablet:pt-header-tablet",
        "desktop:px-32",
      )}
    >
      <Heading className="w-full" title={title} />
    </main>
  );
}

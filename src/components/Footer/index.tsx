import clsx from "clsx";
import Link from "next/link";
import { Button } from "@/components/Button";
import { LogoWordmarkStackedWhite } from "@/components/icons/LogoWordmarkStackedWhite";
import { toId } from "@/helpers/slug";
import type { FooterGroup, Site } from "@/types";

export type FooterProps = {
  footer: Site["footer"];
};

/**
 * Site footer. Link groups and the legal line come from `site.footer`.
 * The logo is a plain link: a ghost button's padding would change the 100px size.
 */
export function Footer({ footer }: FooterProps) {
  return (
    <footer
      aria-label={footer.label}
      className="bg-brand px-4 pt-12 pb-6 text-text-inverse tablet:px-8 desktop:px-32 desktop:pt-15"
    >
      <div className="flex flex-col gap-12 tablet:flex-row tablet:items-start tablet:justify-between">
        <Link
          href={footer.home.href}
          aria-label={footer.home.label}
          className="inline-flex shrink-0 rounded-sm outline-none focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-focus"
        >
          <LogoWordmarkStackedWhite className="size-25" />
        </Link>
        {/*
         * The groups stay together so the spare width sits between the logo and this pair.
         */}
        <div className="flex flex-col gap-12 tablet:flex-row tablet:gap-15">
          {footer.groups.map((group) => (
            <FooterGroupNav key={group.title} group={group} />
          ))}
        </div>
      </div>
      <div className="mt-12 flex flex-col items-start gap-4 tablet:flex-row tablet:items-center tablet:justify-between desktop:mt-15">
        <p className="text-small-label">{footer.copyright}</p>
        <Link
          href={footer.policies.href}
          className="text-small-label outline-none focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-focus"
        >
          {footer.policies.label}
        </Link>
      </div>
    </footer>
  );
}

function FooterGroupNav({ group }: { group: FooterGroup }) {
  const titleId = `footer-${toId(group.title)}`;

  return (
    <nav
      aria-labelledby={titleId}
      className="flex flex-col items-start gap-10 tablet:gap-8"
    >
      <h2 id={titleId} className="text-body-bold">
        {group.title}
      </h2>
      {/*
       * Column flow from tablet paints file order down the first column.
       * Grid starts there so it does not apply on mobile.
       */}
      <ul
        className={clsx(
          "flex w-full flex-col gap-6 tablet:w-auto tablet:gap-4",
          group.columns === 2 &&
            "tablet:grid tablet:grid-flow-col tablet:grid-rows-2 tablet:justify-items-start",
        )}
      >
        {group.links.map((link) => (
          <li key={link.href} className="w-full tablet:w-auto tablet:min-w-30.75">
            {/*
             * Footer links are text links, not 40px controls. This call site
             * clears the shared padding and height and keeps the label line-height.
             */}
            <Button
              href={link.href}
              variant="ghost"
              tone="dark"
              className="h-auto! p-0! leading-(--text-label--line-height)!"
            >
              {link.label}
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

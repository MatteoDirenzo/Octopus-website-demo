"use client";

import clsx from "clsx";
import { Button } from "@/components/Button";
import { Close } from "@/components/icons/Close";
import { Hamburger } from "@/components/icons/Hamburger";
import { LogoMarkRed } from "@/components/icons/LogoMarkRed";
import { LogoWordmarkRed } from "@/components/icons/LogoWordmarkRed";
import { useHeader } from "@/helpers/hooks/useHeader";
import type { Site } from "@/types";

const MENU_ID = "site-menu";

export type HeaderProps = {
  header: Site["header"];
};

/**
 * Fixed pill header. One link list serves every breakpoint.
 * On mobile it is hidden until the menu is open. From tablet it is the right-hand row.
 */
export function Header({ header }: HeaderProps) {
  const { open, toggleRef, toggleMenu, closeMenu, current } = useHeader();

  /*
   * The shell is fixed and full-bleed so the pill can sit inside the side insets.
   * Pointer events stay on the pill, so the empty gutters do not block the page.
   */
  return (
    <header
      className={clsx(
        "pointer-events-none fixed inset-x-0 z-50 flex justify-center",
        "top-2 px-4",
        "tablet:top-4 tablet:px-8",
        "desktop:px-32",
      )}
    >
      <nav
        aria-label={header.label}
        className={clsx(
          "pointer-events-auto flex w-full max-w-navbar flex-col gap-4 rounded-4xl",
          "bg-navbar px-2.5 py-2 shadow-navbar backdrop-blur-3xl",
          "tablet:flex-row tablet:items-center tablet:justify-between tablet:gap-0 tablet:p-3",
        )}
      >
        <div className="flex w-full items-center justify-between tablet:w-auto">
          {/*
           * `aria-current` alone matches the value "true".
           * The page link uses "page", so the variant has to name that value.
           */}
          <Button
            href={header.home.href}
            variant="ghost"
            aria-label={header.home.label}
            aria-current={current(header.home.href)}
            className="aria-[current=page]:text-text"
            onClick={closeMenu}
          >
            <LogoMarkRed className="tablet:hidden" />
            <LogoWordmarkRed className="hidden tablet:block" />
          </Button>
          <Button
            ref={toggleRef}
            iconOnly
            variant="ghost"
            aria-label={open ? header.closeMenuLabel : header.openMenuLabel}
            aria-expanded={open}
            aria-controls={MENU_ID}
            className="tablet:hidden"
            onClick={toggleMenu}
          >
            {open ? <Close /> : <Hamburger />}
          </Button>
        </div>
        {/*
         * `hidden` and `flex` must not both apply at the same breakpoint.
         * Closed is hidden on mobile and shown from tablet. Open is shown at every width.
         */}
        <div
          id={MENU_ID}
          className={clsx(
            open ? "flex flex-col gap-4" : "hidden tablet:flex",
            "tablet:flex-row tablet:items-center tablet:gap-1 desktop:gap-2",
          )}
        >
          <ul
            className={clsx(
              "flex w-full flex-col gap-2 px-4 pt-4 pb-2",
              "tablet:w-auto tablet:flex-row tablet:items-center tablet:gap-1 tablet:p-0",
              "desktop:gap-2",
            )}
          >
            {header.links.map((link) => (
              <li key={link.href} className="w-full tablet:w-auto">
                <Button
                  href={link.href}
                  variant="ghost"
                  aria-current={current(link.href)}
                  className="w-full justify-start aria-[current=page]:text-text tablet:w-auto tablet:justify-center"
                  onClick={closeMenu}
                >
                  {link.label}
                </Button>
              </li>
            ))}
          </ul>
          <div className="p-2 tablet:p-0">
            <Button
              href={header.whereToBuy.href}
              aria-current={current(header.whereToBuy.href)}
              className="w-full tablet:w-auto"
              onClick={closeMenu}
            >
              {header.whereToBuy.label}
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
}

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
 * Below desktop it is hidden until the menu is open. From desktop it is the right-hand row.
 */
export function Header({ header }: HeaderProps) {
  const { open, toggleRef, toggleMenu, closeMenu, current } = useHeader();

  /*
   * The shell is fixed and full-bleed. Its side insets match the page, and the
   * pill fills them at every width.
   * Pointer events stay on the pill, so the empty gutters do not block the page.
   * Below desktop the shell also reaches the bottom inset, so the open menu can
   * scroll inside the pill on short or zoomed screens while the body is locked.
   */
  return (
    <header
      className={clsx(
        "pointer-events-none fixed inset-x-0 z-50 flex items-start justify-center",
        "top-2 bottom-2 px-4",
        "tablet:top-4 tablet:bottom-4 tablet:px-8",
        "desktop:bottom-auto desktop:px-32",
      )}
    >
      <nav
        aria-label={header.label}
        className="pointer-events-auto relative flex max-h-full w-full flex-col rounded-4xl shadow-navbar"
      >
        {/*
         * The blur sits on its own layer, not on the scrolling box.
         * A backdrop filter on a rounded scroll container flickers in Chrome and Safari.
         * The content box is positioned after it, so it paints on top.
         */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-4xl bg-navbar backdrop-blur-3xl"
        />
        <div
          className={clsx(
            "relative flex min-h-0 flex-col gap-4 rounded-4xl px-2.5 py-2",
            "tablet:p-3",
            "desktop:flex-row desktop:items-center desktop:justify-between desktop:gap-0",
            open && "overflow-y-auto overscroll-contain",
          )}
        >
          <div className="flex w-full items-center justify-between desktop:w-auto">
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
            {/*
             * The logo sits 15px inside its button (border plus `px-3.5`).
             * The toggle's glyph sits 11.5px inside (border, `p-2`, and the
             * icon's own 2.5px), so the margin lines the two edges up.
             */}
            <Button
              ref={toggleRef}
              iconOnly
              variant="ghost"
              aria-label={open ? header.closeMenuLabel : header.openMenuLabel}
              aria-expanded={open}
              aria-controls={MENU_ID}
              className="mr-1 desktop:hidden"
              onClick={toggleMenu}
            >
              {open ? <Close /> : <Hamburger />}
            </Button>
          </div>
          {/*
           * `hidden` and `flex` must not both apply at the same breakpoint.
           * Closed is hidden below desktop and shown from desktop. Open is shown at every width.
           */}
          <div
            id={MENU_ID}
            className={clsx(
              open ? "flex flex-col gap-4" : "hidden desktop:flex",
              "desktop:flex-row desktop:items-center desktop:gap-2",
            )}
          >
            <ul
              className={clsx(
                "flex w-full flex-col gap-2 px-4 pt-4 pb-2",
                "desktop:w-auto desktop:flex-row desktop:items-center desktop:gap-2 desktop:p-0",
              )}
            >
              {header.links.map((link) => (
                <li key={link.href} className="w-full desktop:w-auto">
                  <Button
                    href={link.href}
                    variant="ghost"
                    aria-current={current(link.href)}
                    className="w-full justify-start aria-[current=page]:text-text desktop:w-auto desktop:justify-center"
                    onClick={closeMenu}
                  >
                    {link.label}
                  </Button>
                </li>
              ))}
            </ul>
            {/* From desktop the button keeps the same distance from the edge as the logo. */}
            <div className="p-2 desktop:p-0 desktop:pr-navbar-end">
              <Button
                href={header.whereToBuy.href}
                aria-current={current(header.whereToBuy.href)}
                className="w-full desktop:w-auto"
                onClick={closeMenu}
              >
                {header.whereToBuy.label}
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

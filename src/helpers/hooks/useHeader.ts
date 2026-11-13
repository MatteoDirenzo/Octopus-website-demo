"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useBreakpoint } from "@/helpers/hooks/useMediaQuery";

/**
 * Open state for the collapsed menu, used below the desktop breakpoint.
 * The menu closes from desktop, locks scroll while open, and returns focus on close.
 */
export function useHeader() {
  const pathname = usePathname();
  const { isDesktop } = useBreakpoint();
  const isCollapsed = !isDesktop;
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  if (!isCollapsed && open) {
    setOpen(false);
  }

  useEffect(() => {
    if (!open || !isCollapsed) {
      return;
    }

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") {
        return;
      }

      setOpen(false);
      toggleRef.current?.focus();
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, isCollapsed]);

  function closeMenu() {
    setOpen(false);

    if (isCollapsed) {
      toggleRef.current?.focus();
    }
  }

  function toggleMenu() {
    setOpen((value) => !value);
  }

  function current(href: string): "page" | undefined {
    return pathname === href ? "page" : undefined;
  }

  return { open, toggleRef, toggleMenu, closeMenu, current };
}

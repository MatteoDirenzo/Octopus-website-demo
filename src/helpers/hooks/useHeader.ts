"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useBreakpoint } from "@/helpers/hooks/useMediaQuery";

/**
 * Open state for the mobile menu.
 * The menu closes past the mobile breakpoint, locks scroll while open, and returns focus on close.
 */
export function useHeader() {
  const pathname = usePathname();
  const { isMobile } = useBreakpoint();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  if (!isMobile && open) {
    setOpen(false);
  }

  useEffect(() => {
    if (!open || !isMobile) {
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
  }, [open, isMobile]);

  function closeMenu() {
    setOpen(false);

    if (isMobile) {
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

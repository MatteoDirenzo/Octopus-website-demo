import clsx from "clsx";
import { MAIN_CONTENT_ID } from "@/config/routes";
import { buttonClassName } from "@/helpers/components/button";

export type SkipLinkProps = {
  label: string;
};

/**
 * First focusable element on the page. It is visually hidden until focused,
 * then shows above the fixed header. A plain anchor, not `next/link`: the
 * native jump moves focus to `main`, which has `tabIndex={-1}` for that.
 */
export function SkipLink({ label }: SkipLinkProps) {
  return (
    <a
      href={`#${MAIN_CONTENT_ID}`}
      className={buttonClassName({
        variant: "secondary",
        className: clsx(
          /* `not-sr-only` resets padding to 0 and height to auto, so the button size is set again. */
          "sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-4 focus:z-60 focus:h-10 focus:px-3.5",
          "tablet:focus:top-4 tablet:focus:left-8",
        ),
      })}
    >
      {label}
    </a>
  );
}

import clsx from "clsx";
import type { ButtonClassNameOptions, ButtonVariant } from "@/types";

/*
 * Keyboard focus matches hover and adds the focus ring.
 * Secondary and icon ghost keep only the ring on focus. A click uses pressed instead.
 * Disabled keeps the native disabled state, so the control stays in the accessibility tree.
 * The blocked cursor is visual only. Links are never disabled.
 */
const BASE = clsx(
  "inline-flex items-center justify-center rounded-full border text-label",
  "outline-none focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-focus",
  "disabled:cursor-not-allowed",
);

const VARIANT: Record<Exclude<ButtonVariant, "ghost">, string> = {
  primary: clsx(
    "border-brand-border bg-brand text-text-inverse",
    "hover:bg-brand-hover focus-visible:bg-brand-hover",
    "active:bg-brand-pressed",
    "disabled:border-neutral-muted disabled:bg-neutral-muted disabled:text-text-disabled",
  ),
  secondary: clsx(
    "border-border-subtle bg-surface text-text",
    "hover:bg-surface-hover",
    "active:bg-neutral-muted",
    "disabled:border-border-subtle disabled:bg-neutral-muted disabled:text-text-disabled",
  ),
};

/*
 * Transparent border keeps ghost the same height as the bordered variants.
 * Text ghost darkens the label. Icon ghost keeps the tint on hover and press, and only the ring on focus.
 * Dark ghost, text and icon, does not change its fill or its text.
 */
const GHOST_TEXT = clsx(
  "border-transparent bg-surface text-text-subtle",
  "hover:text-text focus-visible:text-text active:text-text",
  "disabled:border-transparent disabled:bg-transparent disabled:text-text-disabled",
);

const GHOST_ICON = clsx(
  "border-transparent bg-surface text-text-subtle",
  "hover:bg-tint-hover",
  "active:bg-tint-pressed",
  "disabled:border-transparent disabled:bg-transparent disabled:text-text-disabled",
);

const GHOST_DARK = clsx(
  "border-transparent bg-transparent text-text-inverse",
  "disabled:border-transparent disabled:bg-transparent disabled:text-text-disabled",
);

export function buttonClassName({
  variant = "primary",
  tone = "light",
  iconOnly = false,
  className,
}: ButtonClassNameOptions) {
  const colors =
    variant !== "ghost"
      ? VARIANT[variant]
      : tone === "dark"
        ? GHOST_DARK
        : iconOnly
          ? GHOST_ICON
          : GHOST_TEXT;

  return clsx(BASE, iconOnly ? "p-2" : "px-3.5 py-1.5", colors, className);
}

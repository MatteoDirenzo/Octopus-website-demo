import clsx from "clsx";

export type Variant = "primary" | "secondary" | "ghost";
export type Tone = "light" | "dark";

type ButtonClassNameOptions = {
  variant?: Variant;
  tone?: Tone;
  iconOnly?: boolean;
  className?: string;
};

/*
 * Keyboard focus matches hover and adds the focus ring. A click uses pressed instead.
 * Disabled keeps the native disabled state, so the control stays in the accessibility tree.
 * The blocked cursor is visual only. Links are never disabled.
 */
const BASE = clsx(
  "inline-flex items-center justify-center rounded-full border text-label",
  "outline-none focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-focus",
  "disabled:cursor-not-allowed",
);

const VARIANT: Record<Variant, string> = {
  primary: clsx(
    "border-brand-border bg-brand text-text-inverse",
    "hover:bg-brand-hover focus-visible:bg-brand-hover",
    "active:bg-brand-pressed",
    "disabled:border-neutral-muted disabled:bg-neutral-muted disabled:text-text-disabled",
  ),
  secondary: clsx(
    "border-border-subtle bg-surface text-text",
    "hover:bg-surface-hover focus-visible:bg-surface-hover",
    "active:bg-neutral-muted",
    "disabled:border-border-subtle disabled:bg-neutral-muted disabled:text-text-disabled",
  ),
  /* Transparent border keeps ghost the same height as the bordered variants. */
  ghost: clsx(
    "border-transparent bg-surface text-text-subtle",
    "hover:bg-tint-hover focus-visible:bg-tint-hover",
    "active:bg-tint-pressed",
    "disabled:border-transparent disabled:bg-transparent disabled:text-text-disabled",
  ),
};

const GHOST_DARK = clsx(
  "border-transparent bg-transparent text-text-inverse",
  "hover:bg-tint-hover focus-visible:bg-tint-hover",
  "active:bg-tint-pressed",
  "disabled:border-transparent disabled:bg-transparent disabled:text-text-disabled",
);

export function buttonClassName({
  variant = "primary",
  tone = "light",
  iconOnly = false,
  className,
}: ButtonClassNameOptions) {
  const colors =
    variant === "ghost" && tone === "dark" ? GHOST_DARK : VARIANT[variant];

  return clsx(BASE, iconOnly ? "p-2" : "px-3.5 py-1.5", colors, className);
}

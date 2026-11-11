import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { buttonClassName, type Tone, type Variant } from "@/helpers/components/button";

type ButtonStyle = {
  /** Visual style. Defaults to `primary`. */
  variant?: Variant;
  /**
   * Surface the control sits on. Only `ghost` uses this.
   * `dark` keeps a transparent fill and inverse text.
   */
  tone?: Tone;
  className?: string;
};

type ButtonContent =
  | {
      /** Text buttons take their accessible name from `children`. */
      iconOnly?: false;
      children: ReactNode;
      "aria-label"?: string;
    }
  | {
      /** Icon-only buttons use 8px padding and require an accessible name. */
      iconOnly: true;
      children: ReactNode;
      "aria-label": string;
    };

type ButtonAsButton = ButtonStyle &
  ButtonContent &
  Omit<
    ComponentProps<"button">,
    "className" | "children" | "aria-label"
  > & {
    href?: undefined;
  };

type ButtonAsLink = ButtonStyle &
  ButtonContent &
  Omit<
    ComponentProps<typeof Link>,
    "className" | "children" | "aria-label" | "href"
  > & {
    /** Renders a link. A link has no disabled state. */
    href: string;
    disabled?: undefined;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * Shared action control. Pass `href` for a link, otherwise this renders a button.
 */
export function Button({
  variant = "primary",
  tone = "light",
  iconOnly = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = buttonClassName({ variant, tone, iconOnly, className });

  if ("href" in props && props.href !== undefined) {
    return (
      <Link className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}

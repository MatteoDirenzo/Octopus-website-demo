import Link from "next/link";
import { buttonClassName } from "@/helpers/components/button";
import type { ButtonAsButton, ButtonAsLink } from "@/types";

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

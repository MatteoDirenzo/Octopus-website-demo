import { Button } from "@/components/Button";
import { headingClassName } from "@/helpers/components/heading";
import type { ButtonAction, HeadingVariant } from "@/types";

export type HeadingProps = {
  /** Visual style and heading level. Primary is the page `h1`. */
  variant?: HeadingVariant;
  title: string;
  subtitle?: string;
  button?: ButtonAction;
  /** Id of the title, so a section can name itself from this heading. */
  titleId?: string;
  className?: string;
};

/**
 * Centered title, subtitle, and button. Primary is the only `h1` on a page.
 * Secondary is an `h2`. The button uses the same variant.
 */
export function Heading({
  variant = "primary",
  title,
  subtitle,
  button,
  titleId,
  className,
}: HeadingProps) {
  const classes = headingClassName({ variant, className });
  const Title = variant === "primary" ? "h1" : "h2";

  return (
    <div className={classes.root}>
      <Title id={titleId} className={classes.title}>
        {title}
      </Title>
      {subtitle ? <p className={classes.subtitle}>{subtitle}</p> : null}
      {button?.href !== undefined ? (
        <Button variant={variant} href={button.href} className={classes.action}>
          {button.label}
        </Button>
      ) : button ? (
        <Button variant={variant} className={classes.action}>
          {button.label}
        </Button>
      ) : null}
    </div>
  );
}

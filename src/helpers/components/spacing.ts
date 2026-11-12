import clsx from "clsx";
import type { CSSProperties } from "react";
import type { BlockSpacing } from "@/types";
import { cascade } from "./breakpoints";

/**
 * Padding utilities stay written out so Tailwind can see them.
 * The steps live on the element. `--spacing()` turns a step into a length,
 * the same way the carousel turns its inset into a length.
 */
export const SPACING_CLASS = clsx(
  "[--section-pt:--spacing(var(--section-step-pt))]",
  "[--section-pr:--spacing(var(--section-step-pr))]",
  "[--section-pb:--spacing(var(--section-step-pb))]",
  "[--section-pl:--spacing(var(--section-step-pl))]",
  "tablet:[--section-pt-tablet:--spacing(var(--section-step-pt-tablet))]",
  "tablet:[--section-pr-tablet:--spacing(var(--section-step-pr-tablet))]",
  "tablet:[--section-pb-tablet:--spacing(var(--section-step-pb-tablet))]",
  "tablet:[--section-pl-tablet:--spacing(var(--section-step-pl-tablet))]",
  "desktop:[--section-pt-desktop:--spacing(var(--section-step-pt-desktop))]",
  "desktop:[--section-pr-desktop:--spacing(var(--section-step-pr-desktop))]",
  "desktop:[--section-pb-desktop:--spacing(var(--section-step-pb-desktop))]",
  "desktop:[--section-pl-desktop:--spacing(var(--section-step-pl-desktop))]",
  "pt-(--section-pt) pr-(--section-pr) pb-(--section-pb) pl-(--section-pl)",
  "tablet:pt-(--section-pt-tablet) tablet:pr-(--section-pr-tablet) tablet:pb-(--section-pb-tablet) tablet:pl-(--section-pl-tablet)",
  "desktop:pt-(--section-pt-desktop) desktop:pr-(--section-pr-desktop) desktop:pb-(--section-pb-desktop) desktop:pl-(--section-pl-desktop)",
);

const SIDES = { pt: "top", pr: "right", pb: "bottom", pl: "left" } as const;

/**
 * The twelve step variables read by `SPACING_CLASS`. A side missing at a
 * breakpoint copies the smaller breakpoint, and a side missing everywhere is `0`.
 */
export function spacingStyle(spacing: BlockSpacing): CSSProperties {
  const style: Record<string, number> = {};

  for (const [short, side] of Object.entries(SIDES)) {
    const steps = cascade(
      {
        mobile: spacing.mobile?.[side],
        tablet: spacing.tablet?.[side],
        desktop: spacing.desktop?.[side],
      },
      0,
    );

    style[`--section-step-${short}`] = steps.mobile;
    style[`--section-step-${short}-tablet`] = steps.tablet;
    style[`--section-step-${short}-desktop`] = steps.desktop;
  }

  return style as CSSProperties;
}

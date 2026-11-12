import clsx from "clsx";
import type { HeadingClassNameOptions, HeadingVariant } from "@/types";

/* Full width so a long line wraps and stays centered instead of scrolling sideways. */
const TITLE: Record<HeadingVariant, string> = {
  primary: "w-full text-h1-s text-text tablet:text-h1-m desktop:text-h1-l",
  secondary: "w-full text-h2-s text-text tablet:text-h2-m desktop:text-h2-l",
};

const SUBTITLE =
  "w-full text-subtitle-s text-text-muted tablet:text-subtitle-m desktop:text-subtitle-l";

/* Primary title gap is 8px, then 12px from 1200. Secondary stays 8px. */
const SUBTITLE_GAP: Record<HeadingVariant, string> = {
  primary: "mt-2 desktop:mt-3",
  secondary: "mt-2",
};

/* Primary button gap is 24px below 810, then 32px. Secondary stays 32px. */
const BUTTON_GAP: Record<HeadingVariant, string> = {
  primary: "mt-6 tablet:mt-8",
  secondary: "mt-8",
};

export function headingClassName({
  variant = "primary",
  className,
}: HeadingClassNameOptions) {
  return {
    root: clsx("flex flex-col items-center text-center", className),
    title: TITLE[variant],
    subtitle: clsx(SUBTITLE, SUBTITLE_GAP[variant]),
    action: BUTTON_GAP[variant],
  };
}

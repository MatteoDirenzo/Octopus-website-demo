import type { ReactNode } from "react";
import type { ImageSource, ResponsiveImage } from "./media";
import type { ButtonVariant, Cta } from "./ui";

/** Action on an image banner. The label is on the block, not `site.learnMore`. */
export type BannerButton = Cta & {
  /** Button style. Omit for primary. */
  variant?: ButtonVariant;
};

/** Picture and priority shared by every banner form. */
export type BannerFrame = {
  /** One file, or a base path whose crops are `-desktop`, `-mobile`, and `-tablet`. */
  image: ImageSource | ResponsiveImage;
  /** Set only when this banner is the page hero. */
  priority?: boolean;
};

/** Banner with a heading, a line, and a button. */
export type BannerCopy = BannerFrame & {
  /** Heading. Omit, with `subtitle`, to show only the button. */
  title?: string;
  /** Line under the title. Omit, with `title`, to show only the button. */
  subtitle?: string;
  cta: Cta;
  /** Button visual style. Defaults to `primary`. */
  variant?: ButtonVariant;
  /** Id of the title, so a section can name itself from this heading. */
  titleId?: string;
};

/** Banner whose content is passed as children. */
export type BannerCustom = BannerFrame & {
  /** Replaces the title, subtitle, and button. The frame alignment stays. */
  children: ReactNode;
};

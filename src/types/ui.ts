import type Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

/** A labelled destination: card actions, banner links, header and footer links. */
export type Cta = {
  /** Visible label. On the home control this is the accessible name. */
  label: string;
  /** Destination. */
  href: string;
  /**
   * Screen-reader text after `label`, such as `about Kettle`. Generic labels
   * like `Learn more` need it so the link text names its destination.
   */
  context?: string;
};

/** An action that renders a link when `href` is set and a button otherwise. */
export type ButtonAction = {
  /** Accessible name of the action. */
  label: string;
  /** Renders a link. Omit it for a button. */
  href?: string;
  /** Screen-reader text after `label`. See `Cta.context`. */
  context?: string;
};

/** Button styles. */
export const BUTTON_VARIANTS = ["primary", "secondary", "ghost"] as const;

/** One of `BUTTON_VARIANTS`. */
export type ButtonVariant = (typeof BUTTON_VARIANTS)[number];

/** Surface a button sits on. */
export const BUTTON_TONES = ["light", "dark"] as const;

/** One of `BUTTON_TONES`. */
export type ButtonTone = (typeof BUTTON_TONES)[number];

/** Heading styles. Primary is the page `h1`. Secondary is an `h2`. */
export const HEADING_VARIANTS = ["primary", "secondary"] as const;

/** One of `HEADING_VARIANTS`. */
export type HeadingVariant = (typeof HEADING_VARIANTS)[number];

/** Options of `buttonClassName`. */
export type ButtonClassNameOptions = {
  variant?: ButtonVariant;
  tone?: ButtonTone;
  iconOnly?: boolean;
  className?: string;
};

/** Options of `headingClassName`. */
export type HeadingClassNameOptions = {
  variant?: HeadingVariant;
  className?: string;
};

/** Style props shared by the button and the link form. */
export type ButtonStyle = {
  /** Visual style. Defaults to `primary`. */
  variant?: ButtonVariant;
  /**
   * Surface the control sits on. Only `ghost` uses this.
   * `dark` keeps a transparent fill and inverse text.
   */
  tone?: ButtonTone;
  className?: string;
};

/** Text button or icon-only button. The icon-only form requires an accessible name. */
export type ButtonContent =
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

/** Props of the button form. */
export type ButtonAsButton = ButtonStyle &
  ButtonContent &
  Omit<
    ComponentProps<"button">,
    "className" | "children" | "aria-label"
  > & {
    href?: undefined;
  };

/** Props of the link form. */
export type ButtonAsLink = ButtonStyle &
  ButtonContent &
  Omit<
    ComponentProps<typeof Link>,
    "className" | "children" | "aria-label" | "href"
  > & {
    /** Renders a link. A link has no disabled state. */
    href: string;
    disabled?: undefined;
  };

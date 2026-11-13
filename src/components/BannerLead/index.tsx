import type { ComponentType, SVGProps } from "react";
import { Button } from "@/components/Button";
import { CtaLabel } from "@/components/CtaLabel";
import { LogoWarehouse } from "@/components/icons/LogoWarehouse";
import type { BannerLogo, ButtonVariant, Cta } from "@/types";

export type BannerLeadProps = {
  /** Lead line above the logo. */
  text: string;
  /** Logo between the line and the button. */
  logo: BannerLogo;
  cta: Cta;
  /** Button style. Defaults to `primary`. */
  variant?: ButtonVariant;
};

const LOGOS: Record<BannerLogo, ComponentType<SVGProps<SVGSVGElement>>> = {
  warehouse: LogoWarehouse,
};

/**
 * Banner content: a lead line, a logo, and a button.
 * Rendered as a fragment so `Banner` keeps aligning each item.
 * The logo is 8px under the line. The button is 20px under the logo,
 * and 28px from 810.
 * The logo is decorative because its name is in the line above.
 */
export function BannerLead({ text, logo, cta, variant }: BannerLeadProps) {
  const Logo = LOGOS[logo];

  return (
    <>
      <p className="max-w-full text-lead text-text-inverse">{text}</p>
      <Logo className="mt-2 h-auto w-57.5 max-w-full" />
      <Button variant={variant} href={cta.href} className="mt-5 tablet:mt-7">
        <CtaLabel label={cta.label} context={cta.context} />
      </Button>
    </>
  );
}

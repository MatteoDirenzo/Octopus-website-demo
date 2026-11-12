import type { ReactNode } from "react";
import { Button } from "@/components/Button";

export type ProductInfoAction = {
  /** Accessible name of the action. */
  label: string;
  /** Renders a link. Omit it for a button. */
  href?: string;
};

export type ProductInfoProps = {
  title: string;
  description: string;
  /** Line under the description, for example "Colour - Black". */
  selectionLabel: string;
  /** Colour swatches or text options. The page chooses which selector. */
  children: ReactNode;
  /**
   * Heading level. The product page passes `h1`.
   * The size stays h2/s, h2/m from 810, and h2/l from 1200.
   */
  heading?: "h1" | "h2";
  /** Primary action. Fixed to the bottom of the screen below 810px. */
  action: ProductInfoAction;
};

/**
 * Title, description, selection line, and a picker passed as children.
 * The title is h2/s, h2/m from 810, and h2/l from 1200.
 * Description and the selection line are body. The gaps are 24px, 32px, then 12px.
 * The primary action spans the column. Below 810 it is fixed to the bottom
 * of the screen, with 16px of surface around it, so the page can scroll
 * clear of it. From 810 it sits back in the column. There is one button.
 * The position sits on a wrapper. Button is inline-flex, so fixed on that
 * element would not win reliably. The width comes from the parent, and the
 * block does not grow past 355px. The fixed bar stays the full screen width.
 */
export function ProductInfo({
  title,
  description,
  selectionLabel,
  children,
  heading = "h2",
  action,
}: ProductInfoProps) {
  const Title = heading;

  return (
    <div className="flex w-full min-w-0 max-w-product-info flex-col">
      <Title className="max-w-full text-h2-s text-text tablet:text-h2-m desktop:text-h2-l">
        {title}
      </Title>
      <p className="mt-6 max-w-full text-body text-text-muted">{description}</p>
      <p className="mt-8 max-w-full text-body text-text-muted">{selectionLabel}</p>
      <div className="mt-3">{children}</div>
      <div className="fixed inset-x-0 bottom-0 z-40 w-full bg-surface p-4 tablet:static tablet:z-auto tablet:mt-3 tablet:bg-transparent tablet:p-0">
        {action.href !== undefined ? (
          <Button href={action.href} className="w-full">
            {action.label}
          </Button>
        ) : (
          <Button className="w-full">{action.label}</Button>
        )}
      </div>
    </div>
  );
}

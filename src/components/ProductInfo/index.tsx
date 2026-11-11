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
  /** Primary action. Hidden below 810px. */
  action: ProductInfoAction;
};

/**
 * Title, description, selection line, and a picker passed as children.
 * The title is h2/s, h2/m from 810, and h2/l from 1200.
 * Description and the selection line are body. The gaps are 24px, 32px, then 12px.
 * The primary action spans the column and is out of the layout below 810.
 * The hide sits on a wrapper. Button is inline-flex, so hidden on that
 * element would not win reliably. The width comes from the parent.
 */
export function ProductInfo({
  title,
  description,
  selectionLabel,
  children,
  action,
}: ProductInfoProps) {
  return (
    <div className="flex w-full min-w-0 flex-col">
      <h2 className="max-w-full text-h2-s text-text tablet:text-h2-m desktop:text-h2-l">
        {title}
      </h2>
      <p className="mt-6 max-w-full text-body text-text-muted">{description}</p>
      <p className="mt-8 max-w-full text-body text-text-muted">{selectionLabel}</p>
      <div className="mt-3">{children}</div>
      <div className="mt-3 hidden w-full tablet:block">
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

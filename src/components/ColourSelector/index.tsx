"use client";

import clsx from "clsx";
import { useId } from "react";
import type { Colour } from "@/types/content";

export type ColourSelectorProps = {
  /** Accessible name of the group, for example "Colour". */
  label: string;
  /** Swatches. Pass `product.detail.colours` through unchanged. */
  options: Colour[];
  /** Id of the selected colour. */
  value: string;
  /** Called with the chosen id. Omit it for a static specimen. */
  onChange?: (id: string) => void;
};

/**
 * Colour swatches. Each disc is 30px with a 1px tint stroke.
 * Selecting one paints a 2px brand ring 7px outside the disc.
 * The ring keeps its space when it is transparent, so the row does not jump.
 * The fill is the colour hex from the product, not a theme colour.
 * The page owns `value` and the selection line above this group.
 */
export function ColourSelector({
  label,
  options,
  value,
  onChange,
}: ColourSelectorProps) {
  const name = useId();

  return (
    <fieldset className="m-0 w-full min-w-0 border-0 p-0">
      <legend className="sr-only">{label}</legend>
      <div className="flex flex-wrap gap-3">
        {options.map((option) => {
          const selected = option.id === value;

          return (
            <label key={option.id} className="inline-flex">
              <input
                type="radio"
                name={name}
                value={option.id}
                checked={selected}
                onChange={() => onChange?.(option.id)}
                className="peer sr-only"
                aria-label={option.label}
              />
              <span
                className={clsx(
                  "inline-flex rounded-full border-2 p-swatch-ring",
                  "peer-focus-visible:outline-2 peer-focus-visible:outline-solid peer-focus-visible:outline-offset-2 peer-focus-visible:outline-focus",
                  selected ? "border-brand" : "border-transparent",
                )}
              >
                <span
                  aria-hidden="true"
                  className="size-swatch rounded-full border border-tint-pressed"
                  style={{ backgroundColor: option.hex }}
                />
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

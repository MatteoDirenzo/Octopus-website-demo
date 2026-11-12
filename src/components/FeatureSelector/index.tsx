"use client";

import clsx from "clsx";
import { useId } from "react";
import type { FeatureOption } from "@/types";

export type FeatureSelectorProps = {
  /** Accessible name of the group, for example "Battery". */
  label: string;
  options: FeatureOption[];
  /** Id of the selected option. */
  value: string;
  /** Called with the chosen id. Omit it for a static specimen. */
  onChange?: (id: string) => void;
};

/**
 * Text options. The resting stroke is 1px disabled grey. Selected is 2px brand.
 * Horizontal padding is 12.5px and vertical padding is 17px, both off the scale.
 * The page owns `value`.
 */
export function FeatureSelector({
  label,
  options,
  value,
  onChange,
}: FeatureSelectorProps) {
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
              />
              <span
                className={clsx(
                  "rounded-lg px-option-x py-option-y text-body text-text",
                  "peer-focus-visible:outline-2 peer-focus-visible:outline-solid peer-focus-visible:outline-offset-2 peer-focus-visible:outline-focus",
                  selected
                    ? "border-2 border-brand"
                    : "border border-text-disabled",
                )}
              >
                {option.label}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

"use client";

import { useState } from "react";
import { ColourSelector } from "@/components/ColourSelector";
import { ProductInfo } from "@/components/ProductInfo";
import type { ButtonAction, Colour } from "@/types";

export type ProductSelectionProps = {
  title: string;
  description: string;
  /** Group name and prefix of the selection line, for example "Colour". */
  colourLabel: string;
  /** Swatches. The first one starts selected. */
  colours: Colour[];
  action: ButtonAction;
};

/**
 * Product info with a live colour choice. It owns the selected colour, so
 * the selection line and the swatches stay in step. The page stays a Server
 * Component and passes plain data in.
 */
export function ProductSelection({
  title,
  description,
  colourLabel,
  colours,
  action,
}: ProductSelectionProps) {
  const [selectedId, setSelectedId] = useState(colours[0]?.id ?? "");
  const selected = colours.find((colour) => colour.id === selectedId);

  const handleChangeSelection = (id: string) => {
    console.log("Selected colour:", id);
    setSelectedId(id);
  };

  return (
    <ProductInfo
      heading="h1"
      title={title}
      description={description}
      selectionLabel={`${colourLabel} - ${selected?.label ?? ""}`}
      action={action}
    >
      <ColourSelector
        label={colourLabel}
        options={colours}
        value={selectedId}
        onChange={handleChangeSelection}
      />
    </ProductInfo>
  );
}

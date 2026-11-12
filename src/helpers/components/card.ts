import { CARD_SIZES } from "@/config/sizes";
import type { CardVariant } from "@/types";

/** `sizes` for a medium or large card picture. */
export function cardSizes(
  card: "medium" | "large",
  variant: CardVariant,
  background: boolean,
) {
  return CARD_SIZES[card][background ? "background" : "slot"][variant];
}

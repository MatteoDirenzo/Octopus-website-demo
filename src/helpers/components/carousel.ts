import type { CSSProperties } from "react";
import { CAROUSEL_DEFAULTS } from "@/config/carousel";
import type {
  CarouselEndOffset,
  CarouselInset,
  CarouselPeek,
  CarouselVisible,
} from "@/types";
import { cascade } from "./breakpoints";

/** A peek percentage as a fraction of one card. Omitted is two thirds. */
export function peekValue(value: number | undefined) {
  if (value == null) {
    return CAROUSEL_DEFAULTS.peek;
  }

  return String(value / 100);
}

/**
 * Per-breakpoint variables read by the carousel classes. A missing end
 * offset copies the smaller breakpoint. Visible and inset fall back to
 * `CAROUSEL_DEFAULTS` at each breakpoint.
 */
export function carouselStyle({
  visible,
  endOffset,
  peek,
  inset,
}: {
  visible?: CarouselVisible;
  endOffset?: CarouselEndOffset;
  peek?: CarouselPeek;
  inset?: CarouselInset;
}): CSSProperties {
  const end = cascade(endOffset, 0);

  return {
    "--carousel-mobile": visible?.mobile ?? CAROUSEL_DEFAULTS.visible.mobile,
    "--carousel-tablet": visible?.tablet ?? CAROUSEL_DEFAULTS.visible.tablet,
    "--carousel-desktop": visible?.desktop ?? CAROUSEL_DEFAULTS.visible.desktop,
    "--carousel-end-mobile": end.mobile,
    "--carousel-end-tablet": end.tablet,
    "--carousel-end-desktop": end.desktop,
    "--carousel-peek-mobile": peekValue(peek?.mobile),
    "--carousel-peek-tablet": peekValue(peek?.tablet),
    "--carousel-peek-desktop": peekValue(peek?.desktop),
    "--carousel-inset-mobile": inset?.mobile ?? CAROUSEL_DEFAULTS.inset.mobile,
    "--carousel-inset-tablet": inset?.tablet ?? CAROUSEL_DEFAULTS.inset.tablet,
    "--carousel-inset-desktop": inset?.desktop ?? CAROUSEL_DEFAULTS.inset.desktop,
  } as CSSProperties;
}

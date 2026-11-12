"use client";

import { MEDIA_REDUCED_MOTION } from "@/config/breakpoints";
import { useMediaQueryState } from "./useMediaQuery";

/**
 * The reduced-motion preference. `null` until it has been read, so a caller
 * can wait before starting anything that moves.
 */
export function useReducedMotion() {
  return useMediaQueryState(MEDIA_REDUCED_MOTION);
}

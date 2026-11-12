import type { BreakpointValue } from "@/types";

/**
 * Fills every breakpoint. Mobile falls back to `fallback`, tablet to mobile,
 * and desktop to tablet.
 */
export function cascade<T>(
  value: BreakpointValue<T> | undefined,
  fallback: T,
): Required<BreakpointValue<T>> {
  const mobile = value?.mobile ?? fallback;
  const tablet = value?.tablet ?? mobile;
  const desktop = value?.desktop ?? tablet;

  return { mobile, tablet, desktop };
}

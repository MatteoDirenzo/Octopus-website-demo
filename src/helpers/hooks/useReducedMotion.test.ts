import { cleanup, renderHook } from "@testing-library/react";
import { afterEach, expect, test, vi } from "vitest";
import { useReducedMotion } from "./useReducedMotion";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

test("reads the reduced-motion query and stays null without matchMedia", () => {
  vi.stubGlobal("matchMedia", (query: string) => ({
    matches: query === "(prefers-reduced-motion: reduce)",
    media: query,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
  }));

  expect(renderHook(() => useReducedMotion()).result.current).toBe(true);

  vi.stubGlobal("matchMedia", undefined);

  expect(renderHook(() => useReducedMotion()).result.current).toBeNull();
});

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";
import { MAIN_CONTENT_ID } from "@/config/routes";
import { SkipLink } from "./index";

afterEach(() => {
  cleanup();
});

test("links to the main content by its id", () => {
  render(<SkipLink label="Skip to main content" />);

  expect(
    screen.getByRole("link", { name: "Skip to main content" }).getAttribute("href"),
  ).toBe(`#${MAIN_CONTENT_ID}`);
});

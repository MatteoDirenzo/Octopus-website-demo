import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";
import { MAIN_CONTENT_ID } from "@/config/routes";
import { PlaceholderPage } from "./index";

afterEach(() => {
  cleanup();
});

test("renders the title as the page h1 inside the skip-link target", () => {
  render(<PlaceholderPage title="Contact us" />);

  const main = screen.getByRole("main");

  expect(main.id).toBe(MAIN_CONTENT_ID);
  expect(
    screen.getByRole("heading", { level: 1, name: "Contact us" }),
  ).toBeTruthy();
});

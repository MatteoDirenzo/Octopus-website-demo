import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";
import { Heading } from "./index";

afterEach(() => {
  cleanup();
});

test("primary exposes the title, subtitle, and button", () => {
  render(
    <Heading
      title="Ionic hair dryer"
      subtitle="Placeholder"
      button={{ label: "Where to buy" }}
    />,
  );

  expect(
    screen.getByRole("heading", { level: 1, name: "Ionic hair dryer" }),
  ).toBeTruthy();
  expect(screen.getByText("Placeholder")).toBeTruthy();
  expect(screen.getByRole("button", { name: "Where to buy" }).tagName).toBe(
    "BUTTON",
  );
});

test("a button href renders a link", () => {
  render(
    <Heading
      title="Ionic hair dryer"
      button={{ label: "Where to buy", href: "/where-to-buy" }}
    />,
  );

  expect(
    screen.getByRole("link", { name: "Where to buy" }).getAttribute("href"),
  ).toBe("/where-to-buy");
});

test("secondary exposes an h2", () => {
  render(<Heading variant="secondary" title="Best sellers" />);

  expect(
    screen.getByRole("heading", { level: 2, name: "Best sellers" }),
  ).toBeTruthy();
});

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";
import { Button } from "./index";

afterEach(() => {
  cleanup();
});

test("a text button exposes its label", () => {
  render(<Button>Where to buy</Button>);

  expect(screen.getByRole("button", { name: "Where to buy" }).tagName).toBe(
    "BUTTON",
  );
});

test("an icon-only button exposes its accessible name", () => {
  render(
    <Button iconOnly aria-label="Next">
      <svg aria-hidden="true" />
    </Button>,
  );

  expect(screen.getByRole("button", { name: "Next" }).tagName).toBe("BUTTON");
});

test("href renders a link with the label", () => {
  render(<Button href="/where-to-buy">Where to buy</Button>);

  expect(
    screen.getByRole("link", { name: "Where to buy" }).getAttribute("href"),
  ).toBe("/where-to-buy");
});

test("a disabled button is disabled", () => {
  render(<Button disabled>Where to buy</Button>);

  expect(screen.getByRole("button", { name: "Where to buy" })).toHaveProperty(
    "disabled",
    true,
  );
});

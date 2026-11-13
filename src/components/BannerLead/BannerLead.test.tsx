import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";
import { BannerLead } from "./index";

afterEach(() => {
  cleanup();
});

test("renders the lead line, a hidden logo, and one link", () => {
  const { container } = render(
    <BannerLead
      text="Find us at"
      logo="warehouse"
      variant="secondary"
      cta={{ label: "Find your nearest store", href: "/where-to-buy" }}
    />,
  );

  expect(screen.getByText("Find us at")).toBeTruthy();
  expect(container.querySelector("svg")?.getAttribute("aria-hidden")).toBe("true");
  expect(
    screen.getByRole("link", { name: "Find your nearest store" }).getAttribute("href"),
  ).toBe("/where-to-buy");
  expect(screen.getAllByRole("link")).toHaveLength(1);
});

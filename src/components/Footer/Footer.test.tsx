import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";
import type { Site } from "@/types/content";
import { Footer } from "./index";

const footer: Site["footer"] = {
  label: "Footer",
  home: { label: "Home", href: "/" },
  groups: [
    {
      title: "Our Products",
      columns: 2,
      links: [
        { label: "Kitchen", href: "/category/kitchen" },
        { label: "Home Security", href: "/category/home-security" },
      ],
    },
    {
      title: "Learn",
      columns: 1,
      links: [
        { label: "Where to buy", href: "/where-to-buy" },
        { label: "Contact us", href: "/contact-us" },
      ],
    },
  ],
  copyright: "Copyright 2026 Octopus - All rights reserved",
  policies: { label: "Policies & Terms", href: "/policies" },
};

afterEach(() => {
  cleanup();
});

test("the footer links come from the footer", () => {
  render(<Footer footer={footer} />);

  expect(screen.getByRole("contentinfo", { name: "Footer" })).toBeTruthy();
  expect(screen.getByRole("link", { name: "Home" }).getAttribute("href")).toBe(
    "/",
  );
  expect(
    screen.getByRole("navigation", { name: "Our Products" }),
  ).toBeTruthy();
  expect(screen.getByRole("navigation", { name: "Learn" })).toBeTruthy();
  expect(
    screen.getByRole("heading", { level: 2, name: "Our Products" }),
  ).toBeTruthy();
  expect(
    screen.getByRole("link", { name: "Kitchen" }).getAttribute("href"),
  ).toBe("/category/kitchen");
  expect(
    screen.getByRole("link", { name: "Home Security" }).getAttribute("href"),
  ).toBe("/category/home-security");
  expect(
    screen.getByRole("link", { name: "Where to buy" }).getAttribute("href"),
  ).toBe("/where-to-buy");
  expect(
    screen.getByRole("link", { name: "Contact us" }).getAttribute("href"),
  ).toBe("/contact-us");
  expect(
    screen.getByText("Copyright 2026 Octopus - All rights reserved"),
  ).toBeTruthy();
  expect(
    screen.getByRole("link", { name: "Policies & Terms" }).getAttribute("href"),
  ).toBe("/policies");
});

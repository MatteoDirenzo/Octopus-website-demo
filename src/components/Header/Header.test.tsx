import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { Header } from "./index";

const pathname = vi.hoisted(() => ({ current: "/" }));

vi.mock("next/navigation", () => ({
  usePathname: () => pathname.current,
}));

const header = {
  label: "Main",
  home: { label: "Home", href: "/" },
  openMenuLabel: "Open menu",
  closeMenuLabel: "Close menu",
  links: [
    { label: "Kitchen", href: "/category/kitchen" },
    { label: "Hair Care", href: "/category/hair-care" },
  ],
  whereToBuy: {
    label: "Where to buy",
    href: "/where-to-buy",
  },
};

beforeEach(() => {
  pathname.current = "/";
  document.body.style.overflow = "";
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
});

afterEach(() => {
  cleanup();
  document.body.style.overflow = "";
});

function renderHeader() {
  render(<Header header={header} />);
}

test("navigation comes from the header", () => {
  renderHeader();

  expect(screen.getByRole("navigation", { name: "Main" })).toBeTruthy();
  expect(screen.getAllByRole("listitem")).toHaveLength(header.links.length);
  expect(screen.getByRole("link", { name: "Home" }).getAttribute("href")).toBe(
    "/",
  );
  expect(
    screen.getByRole("link", { name: "Kitchen" }).getAttribute("href"),
  ).toBe("/category/kitchen");
  expect(
    screen.getByRole("link", { name: "Hair Care" }).getAttribute("href"),
  ).toBe("/category/hair-care");
  expect(
    screen.getByRole("link", { name: "Where to buy" }).getAttribute("href"),
  ).toBe("/where-to-buy");
});

test("the menu toggle opens and closes", () => {
  renderHeader();

  const toggle = screen.getByRole("button", { name: "Open menu" });

  expect(toggle.getAttribute("aria-expanded")).toBe("false");
  expect(toggle.getAttribute("aria-controls")).toBe("site-menu");

  fireEvent.click(toggle);

  expect(
    screen
      .getByRole("button", { name: "Close menu" })
      .getAttribute("aria-expanded"),
  ).toBe("true");

  fireEvent.click(screen.getByRole("button", { name: "Close menu" }));

  expect(
    screen
      .getByRole("button", { name: "Open menu" })
      .getAttribute("aria-expanded"),
  ).toBe("false");
});

test("escape closes the menu and returns focus to the toggle", () => {
  renderHeader();

  fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
  fireEvent.keyDown(document, { key: "Escape" });

  const toggle = screen.getByRole("button", { name: "Open menu" });

  expect(toggle.getAttribute("aria-expanded")).toBe("false");
  expect(document.activeElement).toBe(toggle);
});

test("a link click closes the menu", () => {
  renderHeader();

  fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
  fireEvent.click(screen.getByRole("link", { name: "Kitchen" }));

  expect(
    screen
      .getByRole("button", { name: "Open menu" })
      .getAttribute("aria-expanded"),
  ).toBe("false");
});

test("the current route is marked on its link", () => {
  pathname.current = "/category/kitchen";
  renderHeader();

  expect(
    screen.getByRole("link", { name: "Kitchen" }).getAttribute("aria-current"),
  ).toBe("page");
  expect(
    screen
      .getByRole("link", { name: "Hair Care" })
      .getAttribute("aria-current"),
  ).toBeNull();
  expect(
    screen.getByRole("link", { name: "Home" }).getAttribute("aria-current"),
  ).toBeNull();
});

test("the open menu locks body scroll", () => {
  renderHeader();

  expect(document.body.style.overflow).toBe("");

  fireEvent.click(screen.getByRole("button", { name: "Open menu" }));

  expect(document.body.style.overflow).toBe("hidden");

  fireEvent.click(screen.getByRole("button", { name: "Close menu" }));

  expect(document.body.style.overflow).toBe("");
});

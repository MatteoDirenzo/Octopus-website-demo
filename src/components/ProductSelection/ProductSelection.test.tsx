import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, test, vi } from "vitest";
import { ProductSelection } from "./index";

const props = {
  title: "Octopus Countertop Blender",
  description: "Crushes ice and frozen fruit.",
  colourLabel: "Colour",
  colours: [
    { id: "black", label: "Black", hex: "#000000" },
    { id: "white", label: "White", hex: "#ffffff" },
  ],
  action: { label: "Where to buy", href: "/where-to-buy" },
};

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

test("starts on the first colour", () => {
  render(<ProductSelection {...props} />);

  expect(
    screen.getByRole("heading", { level: 1, name: props.title }),
  ).toBeTruthy();
  expect(screen.getByText("Colour - Black")).toBeTruthy();
  expect(screen.getByRole("radio", { name: "Black" })).toHaveProperty(
    "checked",
    true,
  );
});

test("choosing a colour updates the selection line and logs it", () => {
  const log = vi.spyOn(console, "log").mockImplementation(() => {});

  render(<ProductSelection {...props} />);
  fireEvent.click(screen.getByRole("radio", { name: "White" }));

  expect(screen.getByText("Colour - White")).toBeTruthy();
  expect(screen.getByRole("radio", { name: "White" })).toHaveProperty(
    "checked",
    true,
  );
  expect(log).toHaveBeenCalledWith("Selected colour:", "white");
});

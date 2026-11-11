import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, test, vi } from "vitest";
import { ColourSelector } from "./index";

const options = [
  { id: "black", label: "Black", hex: "#1b1b1b" },
  { id: "white", label: "White", hex: "#ffffff" },
];

afterEach(() => {
  cleanup();
});

test("exposes the group and checks the selected colour", () => {
  render(
    <ColourSelector label="Colour" options={options} value="black" />,
  );

  expect(screen.getByRole("group", { name: "Colour" })).toBeTruthy();
  expect(screen.getByRole("radio", { name: "Black" })).toHaveProperty(
    "checked",
    true,
  );
  expect(screen.getByRole("radio", { name: "White" })).toHaveProperty(
    "checked",
    false,
  );
});

test("choosing a colour reports its id", () => {
  const onChange = vi.fn();

  render(
    <ColourSelector
      label="Colour"
      options={options}
      value="black"
      onChange={onChange}
    />,
  );

  fireEvent.click(screen.getByRole("radio", { name: "White" }));

  expect(onChange).toHaveBeenCalledWith("white");
});

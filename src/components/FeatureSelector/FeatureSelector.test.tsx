import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, test, vi } from "vitest";
import { FeatureSelector } from "./index";

const options = [
  { id: "20000", label: "20,000 mhA" },
  { id: "10000", label: "10,000 mhA" },
];

afterEach(() => {
  cleanup();
});

test("exposes the group and checks the selected option", () => {
  render(
    <FeatureSelector label="Battery" options={options} value="20000" />,
  );

  expect(screen.getByRole("group", { name: "Battery" })).toBeTruthy();
  expect(screen.getByRole("radio", { name: "20,000 mhA" })).toHaveProperty(
    "checked",
    true,
  );
  expect(screen.getByRole("radio", { name: "10,000 mhA" })).toHaveProperty(
    "checked",
    false,
  );
});

test("choosing an option reports its id", () => {
  const onChange = vi.fn();

  render(
    <FeatureSelector
      label="Battery"
      options={options}
      value="20000"
      onChange={onChange}
    />,
  );

  fireEvent.click(screen.getByRole("radio", { name: "10,000 mhA" }));

  expect(onChange).toHaveBeenCalledWith("10000");
});

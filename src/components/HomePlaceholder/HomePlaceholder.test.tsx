import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { HomePlaceholder } from "./HomePlaceholder";

test("renders the provided heading", () => {
  render(<HomePlaceholder heading="Placeholder heading" />);

  expect(screen.getByRole("heading", { level: 1, name: "Placeholder heading" })).toBeDefined();
});
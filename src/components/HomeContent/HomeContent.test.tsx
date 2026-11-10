import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { HomeContent } from "./HomeContent";

test("renders the provided heading", () => {
  render(<HomeContent heading="Placeholder heading" />);

  expect(
    screen.getByRole("heading", { level: 1, name: "Placeholder heading" }),
  ).toBeDefined();
});

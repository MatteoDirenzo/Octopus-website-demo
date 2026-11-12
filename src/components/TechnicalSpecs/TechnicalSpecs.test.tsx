import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";
import type { SpecsGroup } from "@/types";
import { TechnicalSpecs } from "./index";

const groups: SpecsGroup[] = [
  {
    id: "technical",
    title: "Technical specifications",
    body: { kind: "list", items: ["Power:", "Voltage:"] },
  },
  {
    id: "movement",
    title: "Movement & control",
    body: { kind: "text", text: "Pan and tilt:" },
  },
];

const download = {
  label: "Downloads",
  fileLabel: "User manual",
  href: "/manuals/user-manual.pdf",
};

afterEach(() => {
  cleanup();
});

test("renders list groups, text groups, and the download", () => {
  render(<TechnicalSpecs groups={groups} download={download} />);

  expect(
    screen.getByRole("heading", { name: "Technical specifications" }),
  ).toBeTruthy();
  expect(
    screen.getAllByRole("listitem").map((item) => item.textContent),
  ).toEqual(["Power:", "Voltage:"]);
  expect(screen.getByText("Pan and tilt:")).toBeTruthy();
  expect(screen.getByText("Downloads")).toBeTruthy();
  expect(
    screen.getByRole("link", { name: "User manual" }).getAttribute("href"),
  ).toBe("/manuals/user-manual.pdf");
});

test("opens and closes a group", () => {
  render(<TechnicalSpecs groups={groups} />);

  const header = screen.getByRole("button", { name: "Movement & control" });

  expect(header).toHaveProperty("ariaExpanded", "true");
  expect(
    screen.getByRole("region", { name: "Movement & control" }),
  ).toBeTruthy();

  fireEvent.click(header);

  expect(header).toHaveProperty("ariaExpanded", "false");
  expect(
    screen.queryByRole("region", { name: "Movement & control" }),
  ).toBeNull();

  fireEvent.click(header);

  expect(header).toHaveProperty("ariaExpanded", "true");
  expect(
    screen.getByRole("region", { name: "Movement & control" }),
  ).toBeTruthy();
});

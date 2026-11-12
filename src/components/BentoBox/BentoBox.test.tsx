import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";
import { BentoBox } from "./index";

const image = {
  src: "/images/placeholders/category-kitchen.png",
  alt: "Kitchen tile",
};

afterEach(() => {
  cleanup();
});

test("renders each card in row order", () => {
  render(
    <BentoBox
      rows={[
        [
          {
            title: "Title feature 1",
            description: "Description feature 1",
            image,
          },
        ],
        [
          {
            title: "Title feature F2",
            description: "Description feature F2",
            image,
          },
          {
            title: "Title feature F3",
            description: "Description feature F3",
            image,
          },
        ],
        [
          {
            title: "Title feature F4",
            description: "Description feature F4",
          },
        ],
      ]}
    />,
  );

  expect(
    screen.getAllByRole("heading", { level: 2 }).map((heading) => heading.textContent),
  ).toEqual([
    "Title feature 1",
    "Title feature F2",
    "Title feature F3",
    "Title feature F4",
  ]);
  expect(screen.getByText("Description feature 1")).toBeTruthy();
  expect(screen.getByText("Description feature F2")).toBeTruthy();
  expect(screen.getByText("Description feature F3")).toBeTruthy();
  expect(screen.getByText("Description feature F4")).toBeTruthy();
});

test("keeps a passed image name and leaves a missing image unnamed", () => {
  render(
    <BentoBox
      rows={[
        [
          {
            title: "With photo",
            description: "Shown",
            image,
          },
        ],
        [
          {
            title: "Without photo",
            description: "Placeholder",
          },
        ],
      ]}
    />,
  );

  expect(screen.getByRole("img", { name: "Kitchen tile" })).toBeTruthy();
  expect(screen.getAllByRole("img")).toHaveLength(1);
});

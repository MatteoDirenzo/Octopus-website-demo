import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";
import { getPage } from "@/lib/api";
import { CategoryShowcase } from "./CategoryShowcase";

afterEach(() => {
  cleanup();
});

test("renders the kitchen feature card and two medium cards", async () => {
  const page = await getPage("home");
  const section = page.sections.find(
    (item) => item.type === "categoryShowcase" && item.layout === "feature-top",
  );

  if (!section || section.type !== "categoryShowcase") {
    throw new Error("Kitchen showcase is missing");
  }

  render(await CategoryShowcase({ section }));

  expect(screen.getByRole("heading", { level: 2, name: "Kitchen" })).toBeTruthy();
  expect(
    screen.getByText("Powerful appliances for everyday cooking"),
  ).toBeTruthy();
  expect(
    screen.getByRole("link", { name: "Explore all products" }).getAttribute("href"),
  ).toBe("/category/kitchen");

  expect(
    screen.getByRole("heading", { level: 3, name: "Octopus Kettle 1.7 L" }),
  ).toBeTruthy();
  expect(
    screen.getByRole("heading", { level: 3, name: "Octopus Blender" }),
  ).toBeTruthy();
  expect(
    screen.getByRole("heading", {
      level: 3,
      name: "Octopus Countertop Blender",
    }),
  ).toBeTruthy();
  expect(
    screen.queryByRole("heading", {
      level: 3,
      name: "Octopus Air Fryer 5.7 L",
    }),
  ).toBeNull();

  const links = screen.getAllByRole("link", { name: "Learn more" });

  expect(links.map((link) => link.getAttribute("href"))).toEqual([
    "/product/kettle-1-7-l",
    "/product/blender",
    "/product/countertop-blender",
  ]);
});

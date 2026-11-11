import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";
import { getPage } from "@/lib/api";
import { Hero } from "./Hero";

afterEach(() => {
  cleanup();
});

test("renders the linked product heading and its learn more link", async () => {
  const page = await getPage("home");
  const section = page.sections.find((item) => item.type === "hero");

  if (!section || section.type !== "hero") {
    throw new Error("Home hero is missing");
  }

  render(await Hero({ section }));

  expect(
    screen.getByRole("heading", {
      level: 1,
      name: "Octopus Ionic Hair Dryer",
    }),
  ).toBeTruthy();
  expect(screen.getByText("Placeholder")).toBeTruthy();
  expect(
    screen.getByRole("link", { name: "Learn more" }).getAttribute("href"),
  ).toBe("/product/ionic-hair-dryer");
});

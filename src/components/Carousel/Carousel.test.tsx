import { act, cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";
import { Carousel } from "./index";

afterEach(() => {
  cleanup();
});

function setScroll(
  scroller: HTMLElement,
  slide: HTMLElement,
  metrics: {
    scrollWidth: number;
    clientWidth: number;
    scrollLeft: number;
    slideWidth: number;
  },
) {
  Object.defineProperty(scroller, "scrollWidth", {
    configurable: true,
    value: metrics.scrollWidth,
  });
  Object.defineProperty(scroller, "clientWidth", {
    configurable: true,
    value: metrics.clientWidth,
  });
  Object.defineProperty(scroller, "scrollLeft", {
    configurable: true,
    value: metrics.scrollLeft,
  });
  Object.defineProperty(slide, "offsetWidth", {
    configurable: true,
    value: metrics.slideWidth,
  });
  act(() => {
    scroller.dispatchEvent(new Event("scroll"));
  });
}

test("hides the position dots unless they are requested", () => {
  render(
    <Carousel title="Best sellers">
      <p>One</p>
      <p>Two</p>
    </Carousel>,
  );

  const scroller = screen.getByRole("list");
  const slide = screen.getAllByRole("listitem")[0];

  if (!slide) {
    throw new Error("Missing slide");
  }

  setScroll(scroller, slide, {
    scrollWidth: 600,
    clientWidth: 300,
    scrollLeft: 0,
    slideWidth: 300,
  });

  expect(screen.queryByRole("button", { name: "Show item 1" })).toBeNull();
  expect(screen.getByRole("button", { name: "Previous" })).toHaveProperty(
    "disabled",
    true,
  );
});

test("disables the previous control at the start and the next control at the end", () => {
  render(
    <Carousel title="Best sellers" showDots>
      <p>One</p>
      <p>Two</p>
      <p>Three</p>
    </Carousel>,
  );

  const scroller = screen.getByRole("list");
  const slides = screen.getAllByRole("listitem");
  const slide = slides[0];

  if (!slide) {
    throw new Error("Missing slide");
  }

  setScroll(scroller, slide, {
    scrollWidth: 900,
    clientWidth: 300,
    scrollLeft: 0,
    slideWidth: 300,
  });

  expect(screen.getByRole("button", { name: "Previous" })).toHaveProperty(
    "disabled",
    true,
  );
  expect(screen.getByRole("button", { name: "Next" })).toHaveProperty(
    "disabled",
    false,
  );
  expect(
    screen
      .getByRole("button", { name: "Show item 1" })
      .getAttribute("aria-current"),
  ).toBe("true");

  setScroll(scroller, slide, {
    scrollWidth: 900,
    clientWidth: 300,
    scrollLeft: 300,
    slideWidth: 300,
  });

  expect(
    screen
      .getByRole("button", { name: "Show item 2" })
      .getAttribute("aria-current"),
  ).toBe("true");
  expect(
    screen
      .getByRole("button", { name: "Show item 1" })
      .getAttribute("aria-current"),
  ).toBeNull();

  setScroll(scroller, slide, {
    scrollWidth: 900,
    clientWidth: 300,
    scrollLeft: 600,
    slideWidth: 300,
  });

  expect(screen.getByRole("button", { name: "Previous" })).toHaveProperty(
    "disabled",
    false,
  );
  expect(screen.getByRole("button", { name: "Next" })).toHaveProperty(
    "disabled",
    true,
  );
});

test("sets the overflow peek from a percentage and keeps two thirds by default", () => {
  const { rerender } = render(
    <Carousel title="Best sellers" mode="overflow">
      <p>One</p>
    </Carousel>,
  );

  const region = () => screen.getByRole("region", { name: "Best sellers" });

  expect(region().style.getPropertyValue("--carousel-peek")).toBe("calc(2 / 3)");

  rerender(
    <Carousel title="Best sellers" mode="overflow" peek={50}>
      <p>One</p>
    </Carousel>,
  );

  expect(region().style.getPropertyValue("--carousel-peek")).toBe("0.5");
});

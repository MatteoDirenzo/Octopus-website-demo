import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, test, vi } from "vitest";
import type { VideoAsset } from "@/types";
import { VideoHero } from "./index";

const video: VideoAsset = {
  sources: [{ src: "/videos/hero-home-video.webm", type: "video/webm" }],
  poster: {
    src: "/images/hero-home-poster.webp",
    alt: "Hair dryer",
    width: 1280,
    height: 720,
  },
};

function mockMotion(matches: boolean) {
  vi.stubGlobal("matchMedia", (query: string) => ({
    matches,
    media: query,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
  }));
}

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

test("plays the source with no controls when motion is allowed", () => {
  mockMotion(false);
  render(<VideoHero video={video} />);

  const player = document.querySelector("video");
  const source = player?.querySelector("source");

  expect(player).not.toBeNull();
  expect(player?.hasAttribute("controls")).toBe(false);
  expect(player?.muted).toBe(true);
  expect(player?.loop).toBe(false);
  expect(source?.getAttribute("src")).toBe("/videos/hero-home-video.webm");
  expect(source?.getAttribute("type")).toBe("video/webm");
});

test("keeps the poster and skips the video when motion is reduced", () => {
  mockMotion(true);
  render(<VideoHero video={video} />);

  expect(document.querySelector("video")).toBeNull();
  expect(screen.getByRole("img", { name: "Hair dryer" })).toBeTruthy();
});

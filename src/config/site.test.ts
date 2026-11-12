import { afterEach, expect, test, vi } from "vitest";

/* `SITE_URL` is read once at import, so each case re-imports the module. */
async function siteUrlWith(value: string | undefined) {
  vi.stubEnv("NEXT_PUBLIC_SITE_URL", value);
  vi.resetModules();
  const { SITE_URL } = await import("./site");
  return SITE_URL;
}

afterEach(() => {
  vi.unstubAllEnvs();
});

test("falls back to localhost when the variable is unset or blank", async () => {
  expect(await siteUrlWith(undefined)).toBe("http://localhost:3000");
  expect(await siteUrlWith("  ")).toBe("http://localhost:3000");
});

test("uses the deploy URL without a trailing slash", async () => {
  expect(await siteUrlWith("https://octopus-website-demo-xi.vercel.app/")).toBe(
    "https://octopus-website-demo-xi.vercel.app",
  );
});

import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

describe("published CLI manifest", () => {
  it("exposes both the product command and the npm package-name command", async () => {
    const manifest = JSON.parse(await readFile(new URL("../package.json", import.meta.url), "utf8"));
    expect(manifest.bin).toEqual({
      archlint: "dist/index.js",
      "archlint-ai": "dist/index.js"
    });
  });
});

import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";
import { ForbiddenDependencyEvaluator } from "../src/rules/forbidden-dependency.js";
import { ImportBoundaryEvaluator } from "../src/rules/import-boundary.js";
import { ProtectedPathEvaluator } from "../src/rules/protected-path.js";
import type { ChangedFile } from "../src/types.js";

async function fixture(rule: string, result: "pass" | "fail"): Promise<ChangedFile> {
  const value = JSON.parse(await readFile(new URL(`../fixtures/${rule}/${result}.json`, import.meta.url), "utf8"));
  return { status: "M", patch: "", ...value };
}

describe("forbidden_dependency", () => {
  const evaluator = new ForbiddenDependencyEvaluator();
  const rule = { id: "no-firebase", type: "forbidden_dependency" as const, packages: ["firebase"], severity: "error" as const };
  it("passes an allowed dependency", async () => expect(evaluator.evaluate(rule, { cwd: "", files: [await fixture("forbidden-dependency", "pass")] })).toHaveLength(0));
  it("flags a forbidden package subpath", async () => expect(evaluator.evaluate(rule, { cwd: "", files: [await fixture("forbidden-dependency", "fail")] })).toMatchObject([{ evidence: "firebase", line: 1 }]));
  it("flags a forbidden package in an npm lockfile", () => {
    const file = { path: "package-lock.json", status: "M", patch: "", addedLines: [{ line: 4, content: "    \"node_modules/firebase\": {" }] };
    expect(evaluator.evaluate(rule, { cwd: "", files: [file] })).toMatchObject([{ evidence: "firebase", line: 4 }]);
  });
});

describe("import_boundary", () => {
  const evaluator = new ImportBoundaryEvaluator();
  const rule = { id: "db-boundary", type: "import_boundary" as const, from: ["src/components/**"], deny: ["src/db/**"], severity: "error" as const };
  it("passes an allowed layer", async () => expect(evaluator.evaluate(rule, { cwd: "", files: [await fixture("import-boundary", "pass")] })).toHaveLength(0));
  it("flags a denied relative import", async () => expect(evaluator.evaluate(rule, { cwd: "", files: [await fixture("import-boundary", "fail")] })).toHaveLength(1));
});

describe("protected_path", () => {
  const evaluator = new ProtectedPathEvaluator();
  const rule = { id: "protect-auth", type: "protected_path" as const, paths: ["src/auth/**"], severity: "warning" as const };
  it("passes an ordinary path", async () => expect(evaluator.evaluate(rule, { cwd: "", files: [await fixture("protected-path", "pass")] })).toHaveLength(0));
  it("flags a protected path", async () => expect(evaluator.evaluate(rule, { cwd: "", files: [await fixture("protected-path", "fail")] })).toMatchObject([{ severity: "warning", file: "src/auth/session.ts" }]));
});

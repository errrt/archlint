import { execFile } from "node:child_process";
import { mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { beforeEach, describe, expect, it } from "vitest";

const exec = promisify(execFile);
const cli = path.resolve("dist/index.js");
let repo: string;

async function run(command: string, args: string[] = []) { return exec(command, args, { cwd: repo }); }
async function git(args: string[]) { return run("git", args); }

beforeEach(async () => {
  repo = await mkdtemp(path.join(tmpdir(), "archlint-test-"));
  await git(["init", "-q"]);
  await git(["config", "user.email", "archlint@example.test"]);
  await git(["config", "user.name", "ArchLint Test"]);
  await writeFile(path.join(repo, "README.md"), "fixture\n");
  await git(["add", "."]);
  await git(["commit", "-qm", "initial"]);
});

describe("CLI exit codes", () => {
  it("returns 0 when the diff passes", async () => {
    await writeFile(path.join(repo, ".archlint.yml"), "version: 1\nrules:\n  - id: no-firebase\n    type: forbidden_dependency\n    packages: [firebase]\n");
    await writeFile(path.join(repo, "safe.ts"), "import x from 'safe-package';\n");
    const result = await run(process.execPath, [cli, "check"]);
    expect(result.stdout).toContain("NO ARCHITECTURE DRIFT DETECTED");
  });

  it("returns 1 for an error violation", async () => {
    await writeFile(path.join(repo, ".archlint.yml"), "version: 1\nrules:\n  - id: no-firebase\n    type: forbidden_dependency\n    packages: [firebase]\n");
    await writeFile(path.join(repo, "bad.ts"), "import { x } from 'firebase/app';\n");
    await expect(run(process.execPath, [cli, "check"])).rejects.toMatchObject({ code: 1 });
  });

  it("returns 2 for a config error", async () => {
    await expect(run(process.execPath, [cli, "check"])).rejects.toMatchObject({ code: 2 });
  });

  it("does not block on warning-only violations", async () => {
    await writeFile(path.join(repo, ".archlint.yml"), "version: 1\nrules:\n  - id: protect-readme\n    type: protected_path\n    paths: [README.md]\n    severity: warning\n");
    await writeFile(path.join(repo, "README.md"), "changed\n");
    const result = await run(process.execPath, [cli, "check"]);
    expect(result.stdout).toContain("1 warning");
  });
});

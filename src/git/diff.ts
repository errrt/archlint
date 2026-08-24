import { execFile as execFileCallback } from "node:child_process";
import { promisify } from "node:util";
import { readFile } from "node:fs/promises";
import path from "node:path";
import type { ChangedFile } from "../types.js";

const execFile = promisify(execFileCallback);

async function git(cwd: string, args: string[]): Promise<string> {
  try { return (await execFile("git", args, { cwd, maxBuffer: 20 * 1024 * 1024 })).stdout; }
  catch (error) {
    const message = (error as { stderr?: string }).stderr?.trim();
    throw new Error(message || "Unable to read Git diff. Is this a Git repository?");
  }
}

function parsePatch(patch: string): ChangedFile[] {
  const files: ChangedFile[] = [];
  let current: ChangedFile | undefined;
  let newLine = 0;
  for (const raw of patch.split("\n")) {
    if (raw.startsWith("diff --git ")) {
      if (current) files.push(current);
      const match = raw.match(/^diff --git a\/(.+) b\/(.+)$/);
      current = { path: match?.[2] ?? "unknown", status: "M", patch: `${raw}\n`, addedLines: [] };
      continue;
    }
    if (!current) continue;
    current.patch += `${raw}\n`;
    if (raw.startsWith("new file mode")) current.status = "A";
    if (raw.startsWith("deleted file mode")) current.status = "D";
    if (raw.startsWith("rename to ")) current.path = raw.slice(10);
    const hunk = raw.match(/^@@ -\d+(?:,\d+)? \+(\d+)/);
    if (hunk) { newLine = Number(hunk[1]); continue; }
    if (raw.startsWith("+") && !raw.startsWith("+++")) { current.addedLines.push({ line: newLine, content: raw.slice(1) }); newLine++; }
    else if (!raw.startsWith("-") && !raw.startsWith("\\")) newLine++;
  }
  if (current) files.push(current);
  return files;
}

export async function getChangedFiles(cwd: string, base?: string): Promise<ChangedFile[]> {
  await git(cwd, ["rev-parse", "--show-toplevel"]);
  const trackedPatch = base
    ? await git(cwd, ["diff", "--no-ext-diff", "--unified=3", `${base}...HEAD`])
    : await git(cwd, ["diff", "--no-ext-diff", "--unified=3", "HEAD"]);
  const files = parsePatch(trackedPatch);
  if (base) return files;
  const untracked = (await git(cwd, ["ls-files", "--others", "--exclude-standard"])).split("\n").filter(Boolean);
  for (const file of untracked) {
    const content = await readFile(path.join(cwd, file), "utf8");
    files.push({ path: file, status: "A", patch: content.split("\n").map((line) => `+${line}`).join("\n"), addedLines: content.split("\n").map((line, index) => ({ line: index + 1, content: line })) });
  }
  return files;
}

import { readFile } from "node:fs/promises";
import path from "node:path";
import YAML from "yaml";
import { ZodError } from "zod";
import { configSchema } from "./schema.js";
export class ConfigError extends Error {
}
export async function loadConfig(cwd) {
    const file = path.join(cwd, ".archlint.yml");
    let source;
    try {
        source = await readFile(file, "utf8");
    }
    catch {
        throw new ConfigError("No .archlint.yml found. Run `archlint init` first.");
    }
    try {
        return configSchema.parse(YAML.parse(source));
    }
    catch (error) {
        if (error instanceof ZodError) {
            const details = error.issues.map((issue) => `${issue.path.join(".") || "config"}: ${issue.message}`).join("\n");
            throw new ConfigError(`Invalid ArchLint config\n\n${details}`);
        }
        throw new ConfigError(`Invalid ArchLint config\n\n${error instanceof Error ? error.message : String(error)}`);
    }
}
//# sourceMappingURL=load.js.map
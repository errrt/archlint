import { type ArchLintConfig } from "./schema.js";
export declare class ConfigError extends Error {
}
export declare function loadConfig(cwd: string): Promise<ArchLintConfig>;

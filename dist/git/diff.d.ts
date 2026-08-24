import type { ChangedFile } from "../types.js";
export declare function getChangedFiles(cwd: string, base?: string): Promise<ChangedFile[]>;

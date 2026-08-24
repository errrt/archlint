export type Severity = "warning" | "error";

export interface Violation {
  ruleId: string;
  ruleType: string;
  severity: Severity;
  file?: string;
  line?: number;
  message: string;
  evidence?: string;
  confidence?: number;
}

export interface ChangedFile {
  path: string;
  status: string;
  patch: string;
  addedLines: Array<{ line: number; content: string }>;
}

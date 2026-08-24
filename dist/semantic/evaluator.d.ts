import type { SemanticRule } from "../config/schema.js";
import type { ChangedFile } from "../types.js";
export interface SemanticResult {
    result: "PASS" | "WARNING" | "VIOLATION";
    confidence: number;
    reason: string;
    files: string[];
}
export interface SemanticEvaluator {
    evaluate(rule: SemanticRule, diff: ChangedFile[]): Promise<SemanticResult>;
}

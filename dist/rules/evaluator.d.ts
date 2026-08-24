import type { Rule } from "../config/schema.js";
import type { ChangedFile, Violation } from "../types.js";
export interface RuleContext {
    cwd: string;
    files: ChangedFile[];
}
export interface RuleEvaluator<T extends Rule = Rule> {
    evaluate(rule: T, context: RuleContext): Promise<Violation[]> | Violation[];
}

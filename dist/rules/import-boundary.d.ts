import type { ImportBoundaryRule } from "../config/schema.js";
import type { Violation } from "../types.js";
import type { RuleContext, RuleEvaluator } from "./evaluator.js";
export declare class ImportBoundaryEvaluator implements RuleEvaluator<ImportBoundaryRule> {
    evaluate(rule: ImportBoundaryRule, context: RuleContext): Violation[];
}

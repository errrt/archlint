import type { ProtectedPathRule } from "../config/schema.js";
import type { Violation } from "../types.js";
import type { RuleContext, RuleEvaluator } from "./evaluator.js";
export declare class ProtectedPathEvaluator implements RuleEvaluator<ProtectedPathRule> {
    evaluate(rule: ProtectedPathRule, context: RuleContext): Violation[];
}

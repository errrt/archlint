import type { ForbiddenDependencyRule } from "../config/schema.js";
import type { Violation } from "../types.js";
import type { RuleContext, RuleEvaluator } from "./evaluator.js";
export declare class ForbiddenDependencyEvaluator implements RuleEvaluator<ForbiddenDependencyRule> {
    evaluate(rule: ForbiddenDependencyRule, context: RuleContext): Violation[];
}

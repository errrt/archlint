import type { SemanticRule } from "../config/schema.js";
import type { Violation } from "../types.js";
import type { SemanticEvaluator } from "../semantic/evaluator.js";
import type { RuleContext, RuleEvaluator } from "./evaluator.js";
export declare class SemanticRuleEvaluator implements RuleEvaluator<SemanticRule> {
    private readonly provider?;
    constructor(provider?: SemanticEvaluator | undefined);
    evaluate(rule: SemanticRule, context: RuleContext): Promise<Violation[]>;
}

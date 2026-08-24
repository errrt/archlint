import type { SemanticRule } from "../config/schema.js";
import type { Violation } from "../types.js";
import type { SemanticEvaluator } from "../semantic/evaluator.js";
import type { RuleContext, RuleEvaluator } from "./evaluator.js";

export class SemanticRuleEvaluator implements RuleEvaluator<SemanticRule> {
  constructor(private readonly provider?: SemanticEvaluator) {}
  async evaluate(rule: SemanticRule, context: RuleContext): Promise<Violation[]> {
    if (!this.provider) return [];
    const result = await this.provider.evaluate(rule, context.files);
    if (result.confidence < 0.8 || result.result === "PASS") return [];
    const severity = result.confidence > 0.9 && result.result === "VIOLATION" ? "error" : "warning";
    return (result.files.length ? result.files : [undefined]).map((file) => ({ ruleId: rule.id, ruleType: rule.type, severity, file, message: result.reason, confidence: result.confidence }));
  }
}

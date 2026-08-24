import { minimatch } from "minimatch";
import type { ProtectedPathRule } from "../config/schema.js";
import type { Violation } from "../types.js";
import type { RuleContext, RuleEvaluator } from "./evaluator.js";

export class ProtectedPathEvaluator implements RuleEvaluator<ProtectedPathRule> {
  evaluate(rule: ProtectedPathRule, context: RuleContext): Violation[] {
    return context.files.filter((file) => rule.paths.some((pattern) => minimatch(file.path, pattern, { dot: true }))).map((file) => ({
      ruleId: rule.id, ruleType: rule.type, severity: rule.severity, file: file.path,
      message: rule.message ?? `Protected path changed: ${file.path}`
    }));
  }
}

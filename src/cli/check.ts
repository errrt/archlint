import { loadConfig } from "../config/load.js";
import type { Rule } from "../config/schema.js";
import { getChangedFiles } from "../git/diff.js";
import { ForbiddenDependencyEvaluator } from "../rules/forbidden-dependency.js";
import { ImportBoundaryEvaluator } from "../rules/import-boundary.js";
import { ProtectedPathEvaluator } from "../rules/protected-path.js";
import { SemanticRuleEvaluator } from "../rules/semantic.js";
import type { RuleContext, RuleEvaluator } from "../rules/evaluator.js";
import { report } from "../reporter/console.js";
import type { Violation } from "../types.js";

const evaluators: Record<Rule["type"], RuleEvaluator> = {
  forbidden_dependency: new ForbiddenDependencyEvaluator() as RuleEvaluator,
  import_boundary: new ImportBoundaryEvaluator() as RuleEvaluator,
  protected_path: new ProtectedPathEvaluator() as RuleEvaluator,
  semantic: new SemanticRuleEvaluator() as RuleEvaluator
};

export async function checkCommand(cwd: string, base?: string): Promise<number> {
  const config = await loadConfig(cwd);
  const files = await getChangedFiles(cwd, base);
  const context: RuleContext = { cwd, files };
  const violations: Violation[] = [];
  for (const rule of config.rules) violations.push(...await evaluators[rule.type].evaluate(rule, context));
  report(files.length, config.rules.length, violations);
  return violations.some((item) => item.severity === "error") ? 1 : 0;
}

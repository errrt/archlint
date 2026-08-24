import { loadConfig } from "../config/load.js";
import { getChangedFiles } from "../git/diff.js";
import { ForbiddenDependencyEvaluator } from "../rules/forbidden-dependency.js";
import { ImportBoundaryEvaluator } from "../rules/import-boundary.js";
import { ProtectedPathEvaluator } from "../rules/protected-path.js";
import { SemanticRuleEvaluator } from "../rules/semantic.js";
import { report } from "../reporter/console.js";
const evaluators = {
    forbidden_dependency: new ForbiddenDependencyEvaluator(),
    import_boundary: new ImportBoundaryEvaluator(),
    protected_path: new ProtectedPathEvaluator(),
    semantic: new SemanticRuleEvaluator()
};
export async function checkCommand(cwd, base) {
    const config = await loadConfig(cwd);
    const files = await getChangedFiles(cwd, base);
    const context = { cwd, files };
    const violations = [];
    for (const rule of config.rules)
        violations.push(...await evaluators[rule.type].evaluate(rule, context));
    report(files.length, config.rules.length, violations);
    return violations.some((item) => item.severity === "error") ? 1 : 0;
}
//# sourceMappingURL=check.js.map
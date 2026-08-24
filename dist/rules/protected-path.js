import { minimatch } from "minimatch";
export class ProtectedPathEvaluator {
    evaluate(rule, context) {
        return context.files.filter((file) => rule.paths.some((pattern) => minimatch(file.path, pattern, { dot: true }))).map((file) => ({
            ruleId: rule.id, ruleType: rule.type, severity: rule.severity, file: file.path,
            message: rule.message ?? `Protected path changed: ${file.path}`
        }));
    }
}
//# sourceMappingURL=protected-path.js.map
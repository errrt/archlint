const importPattern = /(?:from\s*|import\s*(?:\(|)\s*|require\s*\()\s*["']([^"']+)["']/g;
const packageName = (specifier) => specifier.startsWith("@") ? specifier.split("/").slice(0, 2).join("/") : specifier.split("/")[0];
const lockfiles = new Set(["package-lock.json", "npm-shrinkwrap.json", "yarn.lock", "pnpm-lock.yaml"]);
function lockfileContains(line, dependency) {
    const escaped = dependency.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(`(?:node_modules/|["']?)${escaped}(?:@|["']?\\s*:|/)`).test(line);
}
export class ForbiddenDependencyEvaluator {
    evaluate(rule, context) {
        const violations = [];
        for (const file of context.files) {
            for (const added of file.addedLines) {
                const candidates = [];
                for (const match of added.content.matchAll(importPattern))
                    candidates.push(packageName(match[1]));
                if (file.path === "package.json") {
                    const match = added.content.match(/^\s*["']([^"']+)["']\s*:/);
                    if (match)
                        candidates.push(match[1]);
                }
                if (lockfiles.has(file.path)) {
                    for (const dependency of rule.packages)
                        if (lockfileContains(added.content, dependency))
                            candidates.push(dependency);
                }
                for (const dependency of new Set(candidates.filter((item) => rule.packages.includes(item)))) {
                    violations.push({ ruleId: rule.id, ruleType: rule.type, severity: rule.severity, file: file.path, line: added.line, message: rule.message ?? `Forbidden dependency detected: ${dependency}`, evidence: dependency });
                }
            }
        }
        return violations;
    }
}
//# sourceMappingURL=forbidden-dependency.js.map
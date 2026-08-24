import path from "node:path";
import { minimatch } from "minimatch";
const extensions = ["", ".js", ".jsx", ".ts", ".tsx", "/index.js", "/index.jsx", "/index.ts", "/index.tsx"];
const importPattern = /(?:from\s*|import\s*\(|require\s*\()\s*["']([^"']+)["']/g;
const normalize = (value) => value.split(path.sep).join("/").replace(/^\.\//, "");
function targets(source, specifier) {
    if (specifier.startsWith(".")) {
        const resolved = normalize(path.posix.normalize(path.posix.join(path.posix.dirname(source), specifier)));
        return extensions.map((extension) => `${resolved}${extension}`);
    }
    return extensions.map((extension) => `${normalize(specifier)}${extension}`);
}
export class ImportBoundaryEvaluator {
    evaluate(rule, context) {
        const violations = [];
        for (const file of context.files.filter((item) => /\.[cm]?[jt]sx?$/.test(item.path) && rule.from.some((pattern) => minimatch(item.path, pattern)))) {
            for (const added of file.addedLines)
                for (const match of added.content.matchAll(importPattern)) {
                    const resolved = targets(file.path, match[1]);
                    if (resolved.some((target) => rule.deny.some((pattern) => minimatch(target, pattern)))) {
                        violations.push({ ruleId: rule.id, ruleType: rule.type, severity: rule.severity, file: file.path, line: added.line, message: rule.message ?? `Import boundary violated: ${file.path} imports ${match[1]}`, evidence: match[1] });
                    }
                }
        }
        return violations;
    }
}
//# sourceMappingURL=import-boundary.js.map
export class SemanticRuleEvaluator {
    provider;
    constructor(provider) {
        this.provider = provider;
    }
    async evaluate(rule, context) {
        if (!this.provider)
            return [];
        const result = await this.provider.evaluate(rule, context.files);
        if (result.confidence < 0.8 || result.result === "PASS")
            return [];
        const severity = result.confidence > 0.9 && result.result === "VIOLATION" ? "error" : "warning";
        return (result.files.length ? result.files : [undefined]).map((file) => ({ ruleId: rule.id, ruleType: rule.type, severity, file, message: result.reason, confidence: result.confidence }));
    }
}
//# sourceMappingURL=semantic.js.map
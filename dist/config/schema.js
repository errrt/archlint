import { z } from "zod";
const base = z.object({
    id: z.string().min(1),
    message: z.string().optional(),
    severity: z.enum(["warning", "error"]).default("error")
});
export const forbiddenDependencyRuleSchema = base.extend({
    type: z.literal("forbidden_dependency"),
    packages: z.array(z.string().min(1)).min(1)
});
export const protectedPathRuleSchema = base.extend({
    type: z.literal("protected_path"),
    paths: z.array(z.string().min(1)).min(1)
});
export const importBoundaryRuleSchema = base.extend({
    type: z.literal("import_boundary"),
    from: z.array(z.string().min(1)).min(1),
    deny: z.array(z.string().min(1)).min(1)
});
export const semanticRuleSchema = base.extend({
    type: z.literal("semantic"),
    rule: z.string().min(1)
});
export const ruleSchema = z.discriminatedUnion("type", [
    forbiddenDependencyRuleSchema,
    protectedPathRuleSchema,
    importBoundaryRuleSchema,
    semanticRuleSchema
]);
export const configSchema = z.object({
    version: z.literal(1),
    rules: z.array(ruleSchema).default([])
}).superRefine((value, context) => {
    const ids = new Set();
    for (const [index, rule] of value.rules.entries()) {
        if (ids.has(rule.id))
            context.addIssue({ code: "custom", path: ["rules", index, "id"], message: `Duplicate rule id: ${rule.id}` });
        ids.add(rule.id);
    }
});
//# sourceMappingURL=schema.js.map
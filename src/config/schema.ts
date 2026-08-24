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
  const ids = new Set<string>();
  for (const [index, rule] of value.rules.entries()) {
    if (ids.has(rule.id)) context.addIssue({ code: "custom", path: ["rules", index, "id"], message: `Duplicate rule id: ${rule.id}` });
    ids.add(rule.id);
  }
});

export type ArchLintConfig = z.infer<typeof configSchema>;
export type Rule = z.infer<typeof ruleSchema>;
export type ForbiddenDependencyRule = z.infer<typeof forbiddenDependencyRuleSchema>;
export type ProtectedPathRule = z.infer<typeof protectedPathRuleSchema>;
export type ImportBoundaryRule = z.infer<typeof importBoundaryRuleSchema>;
export type SemanticRule = z.infer<typeof semanticRuleSchema>;

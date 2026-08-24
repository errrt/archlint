import { z } from "zod";
export declare const forbiddenDependencyRuleSchema: z.ZodObject<{
    id: z.ZodString;
    message: z.ZodOptional<z.ZodString>;
    severity: z.ZodDefault<z.ZodEnum<["warning", "error"]>>;
} & {
    type: z.ZodLiteral<"forbidden_dependency">;
    packages: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    id: string;
    severity: "warning" | "error";
    type: "forbidden_dependency";
    packages: string[];
    message?: string | undefined;
}, {
    id: string;
    type: "forbidden_dependency";
    packages: string[];
    message?: string | undefined;
    severity?: "warning" | "error" | undefined;
}>;
export declare const protectedPathRuleSchema: z.ZodObject<{
    id: z.ZodString;
    message: z.ZodOptional<z.ZodString>;
    severity: z.ZodDefault<z.ZodEnum<["warning", "error"]>>;
} & {
    type: z.ZodLiteral<"protected_path">;
    paths: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    id: string;
    severity: "warning" | "error";
    type: "protected_path";
    paths: string[];
    message?: string | undefined;
}, {
    id: string;
    type: "protected_path";
    paths: string[];
    message?: string | undefined;
    severity?: "warning" | "error" | undefined;
}>;
export declare const importBoundaryRuleSchema: z.ZodObject<{
    id: z.ZodString;
    message: z.ZodOptional<z.ZodString>;
    severity: z.ZodDefault<z.ZodEnum<["warning", "error"]>>;
} & {
    type: z.ZodLiteral<"import_boundary">;
    from: z.ZodArray<z.ZodString, "many">;
    deny: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    id: string;
    severity: "warning" | "error";
    type: "import_boundary";
    from: string[];
    deny: string[];
    message?: string | undefined;
}, {
    id: string;
    type: "import_boundary";
    from: string[];
    deny: string[];
    message?: string | undefined;
    severity?: "warning" | "error" | undefined;
}>;
export declare const semanticRuleSchema: z.ZodObject<{
    id: z.ZodString;
    message: z.ZodOptional<z.ZodString>;
    severity: z.ZodDefault<z.ZodEnum<["warning", "error"]>>;
} & {
    type: z.ZodLiteral<"semantic">;
    rule: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    severity: "warning" | "error";
    type: "semantic";
    rule: string;
    message?: string | undefined;
}, {
    id: string;
    type: "semantic";
    rule: string;
    message?: string | undefined;
    severity?: "warning" | "error" | undefined;
}>;
export declare const ruleSchema: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
    id: z.ZodString;
    message: z.ZodOptional<z.ZodString>;
    severity: z.ZodDefault<z.ZodEnum<["warning", "error"]>>;
} & {
    type: z.ZodLiteral<"forbidden_dependency">;
    packages: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    id: string;
    severity: "warning" | "error";
    type: "forbidden_dependency";
    packages: string[];
    message?: string | undefined;
}, {
    id: string;
    type: "forbidden_dependency";
    packages: string[];
    message?: string | undefined;
    severity?: "warning" | "error" | undefined;
}>, z.ZodObject<{
    id: z.ZodString;
    message: z.ZodOptional<z.ZodString>;
    severity: z.ZodDefault<z.ZodEnum<["warning", "error"]>>;
} & {
    type: z.ZodLiteral<"protected_path">;
    paths: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    id: string;
    severity: "warning" | "error";
    type: "protected_path";
    paths: string[];
    message?: string | undefined;
}, {
    id: string;
    type: "protected_path";
    paths: string[];
    message?: string | undefined;
    severity?: "warning" | "error" | undefined;
}>, z.ZodObject<{
    id: z.ZodString;
    message: z.ZodOptional<z.ZodString>;
    severity: z.ZodDefault<z.ZodEnum<["warning", "error"]>>;
} & {
    type: z.ZodLiteral<"import_boundary">;
    from: z.ZodArray<z.ZodString, "many">;
    deny: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    id: string;
    severity: "warning" | "error";
    type: "import_boundary";
    from: string[];
    deny: string[];
    message?: string | undefined;
}, {
    id: string;
    type: "import_boundary";
    from: string[];
    deny: string[];
    message?: string | undefined;
    severity?: "warning" | "error" | undefined;
}>, z.ZodObject<{
    id: z.ZodString;
    message: z.ZodOptional<z.ZodString>;
    severity: z.ZodDefault<z.ZodEnum<["warning", "error"]>>;
} & {
    type: z.ZodLiteral<"semantic">;
    rule: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    severity: "warning" | "error";
    type: "semantic";
    rule: string;
    message?: string | undefined;
}, {
    id: string;
    type: "semantic";
    rule: string;
    message?: string | undefined;
    severity?: "warning" | "error" | undefined;
}>]>;
export declare const configSchema: z.ZodEffects<z.ZodObject<{
    version: z.ZodLiteral<1>;
    rules: z.ZodDefault<z.ZodArray<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
        id: z.ZodString;
        message: z.ZodOptional<z.ZodString>;
        severity: z.ZodDefault<z.ZodEnum<["warning", "error"]>>;
    } & {
        type: z.ZodLiteral<"forbidden_dependency">;
        packages: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        severity: "warning" | "error";
        type: "forbidden_dependency";
        packages: string[];
        message?: string | undefined;
    }, {
        id: string;
        type: "forbidden_dependency";
        packages: string[];
        message?: string | undefined;
        severity?: "warning" | "error" | undefined;
    }>, z.ZodObject<{
        id: z.ZodString;
        message: z.ZodOptional<z.ZodString>;
        severity: z.ZodDefault<z.ZodEnum<["warning", "error"]>>;
    } & {
        type: z.ZodLiteral<"protected_path">;
        paths: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        severity: "warning" | "error";
        type: "protected_path";
        paths: string[];
        message?: string | undefined;
    }, {
        id: string;
        type: "protected_path";
        paths: string[];
        message?: string | undefined;
        severity?: "warning" | "error" | undefined;
    }>, z.ZodObject<{
        id: z.ZodString;
        message: z.ZodOptional<z.ZodString>;
        severity: z.ZodDefault<z.ZodEnum<["warning", "error"]>>;
    } & {
        type: z.ZodLiteral<"import_boundary">;
        from: z.ZodArray<z.ZodString, "many">;
        deny: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        severity: "warning" | "error";
        type: "import_boundary";
        from: string[];
        deny: string[];
        message?: string | undefined;
    }, {
        id: string;
        type: "import_boundary";
        from: string[];
        deny: string[];
        message?: string | undefined;
        severity?: "warning" | "error" | undefined;
    }>, z.ZodObject<{
        id: z.ZodString;
        message: z.ZodOptional<z.ZodString>;
        severity: z.ZodDefault<z.ZodEnum<["warning", "error"]>>;
    } & {
        type: z.ZodLiteral<"semantic">;
        rule: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        severity: "warning" | "error";
        type: "semantic";
        rule: string;
        message?: string | undefined;
    }, {
        id: string;
        type: "semantic";
        rule: string;
        message?: string | undefined;
        severity?: "warning" | "error" | undefined;
    }>]>, "many">>;
}, "strip", z.ZodTypeAny, {
    version: 1;
    rules: ({
        id: string;
        severity: "warning" | "error";
        type: "forbidden_dependency";
        packages: string[];
        message?: string | undefined;
    } | {
        id: string;
        severity: "warning" | "error";
        type: "protected_path";
        paths: string[];
        message?: string | undefined;
    } | {
        id: string;
        severity: "warning" | "error";
        type: "import_boundary";
        from: string[];
        deny: string[];
        message?: string | undefined;
    } | {
        id: string;
        severity: "warning" | "error";
        type: "semantic";
        rule: string;
        message?: string | undefined;
    })[];
}, {
    version: 1;
    rules?: ({
        id: string;
        type: "forbidden_dependency";
        packages: string[];
        message?: string | undefined;
        severity?: "warning" | "error" | undefined;
    } | {
        id: string;
        type: "protected_path";
        paths: string[];
        message?: string | undefined;
        severity?: "warning" | "error" | undefined;
    } | {
        id: string;
        type: "import_boundary";
        from: string[];
        deny: string[];
        message?: string | undefined;
        severity?: "warning" | "error" | undefined;
    } | {
        id: string;
        type: "semantic";
        rule: string;
        message?: string | undefined;
        severity?: "warning" | "error" | undefined;
    })[] | undefined;
}>, {
    version: 1;
    rules: ({
        id: string;
        severity: "warning" | "error";
        type: "forbidden_dependency";
        packages: string[];
        message?: string | undefined;
    } | {
        id: string;
        severity: "warning" | "error";
        type: "protected_path";
        paths: string[];
        message?: string | undefined;
    } | {
        id: string;
        severity: "warning" | "error";
        type: "import_boundary";
        from: string[];
        deny: string[];
        message?: string | undefined;
    } | {
        id: string;
        severity: "warning" | "error";
        type: "semantic";
        rule: string;
        message?: string | undefined;
    })[];
}, {
    version: 1;
    rules?: ({
        id: string;
        type: "forbidden_dependency";
        packages: string[];
        message?: string | undefined;
        severity?: "warning" | "error" | undefined;
    } | {
        id: string;
        type: "protected_path";
        paths: string[];
        message?: string | undefined;
        severity?: "warning" | "error" | undefined;
    } | {
        id: string;
        type: "import_boundary";
        from: string[];
        deny: string[];
        message?: string | undefined;
        severity?: "warning" | "error" | undefined;
    } | {
        id: string;
        type: "semantic";
        rule: string;
        message?: string | undefined;
        severity?: "warning" | "error" | undefined;
    })[] | undefined;
}>;
export type ArchLintConfig = z.infer<typeof configSchema>;
export type Rule = z.infer<typeof ruleSchema>;
export type ForbiddenDependencyRule = z.infer<typeof forbiddenDependencyRuleSchema>;
export type ProtectedPathRule = z.infer<typeof protectedPathRuleSchema>;
export type ImportBoundaryRule = z.infer<typeof importBoundaryRuleSchema>;
export type SemanticRule = z.infer<typeof semanticRuleSchema>;

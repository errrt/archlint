import { writeFile } from "node:fs/promises";
import path from "node:path";
export const EXAMPLE_CONFIG = `version: 1

rules:
  - id: no-firebase
    type: forbidden_dependency
    packages:
      - firebase
    message: "Use Supabase Auth only."

  - id: db-boundary
    type: import_boundary
    from:
      - "src/components/**"
    deny:
      - "src/db/**"
    message: "UI components must not access the database directly."

  - id: protect-auth
    type: protected_path
    paths:
      - "src/auth/**"
    severity: warning
`;
export async function initCommand(cwd) {
    const target = path.join(cwd, ".archlint.yml");
    try {
        await writeFile(target, EXAMPLE_CONFIG, { encoding: "utf8", flag: "wx" });
    }
    catch (error) {
        if (error.code === "EEXIST")
            throw new Error(".archlint.yml already exists; it was not overwritten.");
        throw error;
    }
    console.log("✓ Created .archlint.yml\n✓ Created example rules\n\nRun:\n\n  npx archlint-ai check");
}
//# sourceMappingURL=init.js.map
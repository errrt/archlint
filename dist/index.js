#!/usr/bin/env node
import { Command } from "commander";
import { checkCommand } from "./cli/check.js";
import { initCommand } from "./cli/init.js";
const program = new Command();
program.name("archlint").description("Architecture linter for AI-generated code").version("0.1.1");
program.command("init").description("Create .archlint.yml with example rules").action(async () => { await initCommand(process.cwd()); });
program.command("check").description("Check the current Git diff").option("--base <ref>", "compare base...HEAD for pull requests").action(async ({ base }) => {
    process.exitCode = await checkCommand(process.cwd(), base);
});
program.showHelpAfterError();
try {
    await program.parseAsync();
}
catch (error) {
    console.error(`ArchLint error\n\n${error instanceof Error ? error.message : String(error)}`);
    process.exitCode = 2;
}
//# sourceMappingURL=index.js.map
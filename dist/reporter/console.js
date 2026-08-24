export function report(fileCount, ruleCount, violations) {
    console.log(`ArchLint\n\nChecking ${fileCount} changed file${fileCount === 1 ? "" : "s"}...\n`);
    if (!violations.length) {
        console.log(`✓ ${ruleCount} rule${ruleCount === 1 ? "" : "s"} passed\n\nNO ARCHITECTURE DRIFT DETECTED`);
        return;
    }
    console.log(`✗ ${violations.length} architecture violation${violations.length === 1 ? "" : "s"}`);
    for (const violation of violations) {
        console.log(`\n────────────────────────────\n\n[${violation.ruleId}]\n`);
        if (violation.file)
            console.log(`${violation.file}${violation.line ? `:${violation.line}` : ""}\n`);
        console.log(violation.message);
        if (violation.evidence)
            console.log(`\nEvidence: ${violation.evidence}`);
        if (violation.confidence !== undefined)
            console.log(`\nConfidence: ${Math.round(violation.confidence * 100)}%`);
        console.log(`\nSeverity: ${violation.severity.toUpperCase()}`);
    }
    const errors = violations.filter((item) => item.severity === "error").length;
    const warnings = violations.length - errors;
    console.log(`\n────────────────────────────\n\nARCHITECTURE DRIFT DETECTED\n\n${errors} error${errors === 1 ? "" : "s"}\n${warnings} warning${warnings === 1 ? "" : "s"}`);
}
//# sourceMappingURL=console.js.map
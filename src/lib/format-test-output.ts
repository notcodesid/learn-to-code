export interface FormattedTestIssue {
  kind: "missing" | "compile" | "assert" | "failed";
  title: string;
  message: string;
  hint?: string;
}

export interface FormattedTestResult {
  passed: boolean;
  summary: string;
  issues: FormattedTestIssue[];
  display: string;
}

function stripAnsi(text: string): string {
  return text.replace(/\x1b\[[0-9;]*m/g, "");
}

function extractMissingFunctions(stderr: string): string[] {
  const names = new Set<string>();
  const re = /cannot find function `([^`]+)`/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(stderr)) !== null) {
    names.add(match[1]);
  }
  return [...names];
}

function extractAssertFailures(stdout: string): Array<{
  testName: string;
  left: string;
  right: string;
}> {
  const clean = stripAnsi(stdout);
  const failures: Array<{ testName: string; left: string; right: string }> = [];

  const blocks = clean.split(/test (\S+) \.\.\. FAILED/g);
  // blocks[0] is preamble; then pairs of (name, body)
  for (let i = 1; i < blocks.length; i += 2) {
    const testName = blocks[i];
    const body = blocks[i + 1] || "";
    const leftMatch = body.match(/left:\s*(\S+)/);
    const rightMatch = body.match(/right:\s*(\S+)/);
    if (leftMatch && rightMatch) {
      failures.push({
        testName,
        left: leftMatch[1],
        right: rightMatch[1],
      });
    }
  }

  return failures;
}

function extractCompileErrors(stderr: string): string[] {
  const clean = stripAnsi(stderr);
  const errors: string[] = [];
  const lines = clean.split("\n");
  for (const line of lines) {
    if (line.startsWith("error[E")) {
      errors.push(line.replace(/^error\[E\d+\]:\s*/, "").trim());
    }
  }
  return [...new Set(errors)];
}

/** Turn Rust Playground test output into LeetCode-style feedback. */
export function formatRustTestResult(
  success: boolean,
  stdout: string,
  stderr: string
): FormattedTestResult {
  if (success) {
    const ran = stdout.match(/(\d+) passed/)?.[0] ?? "All tests passed";
    return {
      passed: true,
      summary: ran,
      issues: [],
      display: `✓ ${ran}`,
    };
  }

  const issues: FormattedTestIssue[] = [];
  const missing = extractMissingFunctions(stderr);

  if (missing.length > 0) {
    for (const fn of missing) {
      issues.push({
        kind: "missing",
        title: `Missing required function: ${fn}`,
        message:
          `The test suite calls \`${fn}(...)\`, but your code does not define it.\n` +
          `Move your loop logic into this function and call it from \`main()\`.`,
        hint:
          "Example:\n" +
          `  fn ${fn}(start: i32, end: i32) -> i32 {\n` +
          "      let mut counter = 0;\n" +
          "      for x in start..=end {\n" +
          "          if x % 2 == 0 { counter += 1; }\n" +
          "      }\n" +
          "      counter\n" +
          "  }\n" +
          "  fn main() {\n" +
          `      println!("{}", ${fn}(1, 10));\n` +
          "  }",
      });
    }
  }

  const assertFailures = extractAssertFailures(stdout);
  for (const f of assertFailures) {
    issues.push({
      kind: "assert",
      title: `Test failed: ${f.testName}`,
      message:
        `Your function returned the wrong value.\n\n` +
        `  Expected: ${f.right}\n` +
        `  Got:      ${f.left}`,
      hint:
        f.left === "0"
          ? "Check that your loop runs over the full range and increments the counter when `x % 2 == 0`."
          : "Double-check the loop bounds and the even check (`x % 2 == 0`).",
    });
  }

  const compileErrors = extractCompileErrors(stderr);
  if (issues.length === 0 && compileErrors.length > 0) {
    for (const msg of compileErrors.slice(0, 3)) {
      issues.push({
        kind: "compile",
        title: "Compilation error",
        message: msg,
      });
    }
  }

  if (issues.length === 0) {
    const testFailed = stdout.includes("test result: FAILED");
    issues.push({
      kind: "failed",
      title: testFailed ? "One or more tests failed" : "Tests could not run",
      message: testFailed
        ? "See details below."
        : stderr.trim() || stdout.trim() || "Unknown test error",
    });
  }

  const lines: string[] = ["✗ Tests did not pass", ""];
  issues.forEach((issue, i) => {
    if (i > 0) lines.push("");
    lines.push(`${i + 1}. ${issue.title}`);
    lines.push(issue.message);
    if (issue.hint) {
      lines.push("");
      lines.push(`   💡 ${issue.hint.split("\n").join("\n   ")}`);
    }
  });

  return {
    passed: false,
    summary: issues[0]?.title ?? "Tests failed",
    issues,
    display: lines.join("\n"),
  };
}
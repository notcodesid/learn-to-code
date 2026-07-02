import { TestCaseSpec, TestCaseResult, TestRunResult } from "./types";
import {
  formatCaseInput,
  toDisplayExpected,
} from "./generate-rust";

export function buildTestRunResult(
  spec: TestCaseSpec,
  success: boolean,
  stdout: string,
  stderr: string
): TestRunResult {
  const caseStatus = new Map<number, boolean>();

  for (const c of spec.cases) {
    const pattern = new RegExp(
      `test challenge_tests::case_${c.id} \\.\\.\\. (ok|FAILED)`,
      "m"
    );
    const match = stdout.match(pattern) || stderr.match(pattern);
    if (match) {
      caseStatus.set(c.id, match[1] === "ok");
    }
  }

  if (success && caseStatus.size === 0) {
    for (const c of spec.cases) {
      caseStatus.set(c.id, true);
    }
  }

  if (!success && caseStatus.size === 0) {
    for (const c of spec.cases) {
      caseStatus.set(c.id, false);
    }
  }

  const cases: TestCaseResult[] = spec.cases.map((c) => {
    const passed = caseStatus.get(c.id) ?? false;
    const input = formatCaseInput(spec, c);
    const expected = toDisplayExpected(c.expected);
    const panic = stderr.match(
      new RegExp(
        `challenge_tests::case_${c.id}[\\s\\S]*?left: ([^\\n]+)\\s+right: ([^\\n]+)`,
        "m"
      )
    );

    return {
      id: c.id,
      label: c.label ?? `Case ${c.id}`,
      passed,
      input,
      expected,
      output: passed ? expected : panic ? panic[1].trim() : undefined,
      error: passed
        ? undefined
        : panic
          ? `Got ${panic[1].trim()}, expected ${panic[2].trim()}`
          : "Test failed",
    };
  });

  const passedCases = cases.filter((c) => c.passed).length;

  return {
    accepted: success && passedCases === cases.length,
    totalCases: cases.length,
    passedCases,
    cases,
  };
}
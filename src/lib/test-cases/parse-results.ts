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
  const combinedOutput = `${stdout}\n${stderr}`;

  for (const c of spec.cases) {
    const patterns = [
      new RegExp(`test challenge_tests::case_${c.id} \\.\\.\\. (ok|FAILED)`, "m"),
      new RegExp(`test challenge_tests::case_${c.id} \\.\\.\\. (ok|failed)`, "m"),
      new RegExp(`case_${c.id} \\.\\.\\. (ok|FAILED)`, "m"),
      new RegExp(`case_${c.id} \\.\\.\\. (ok|failed)`, "m"),
      new RegExp(`test case_${c.id} \\.\\.\\. (ok|FAILED)`, "m"),
      new RegExp(`test case_${c.id} \\.\\.\\. (ok|failed)`, "m"),
    ];

    let matched = false;
    for (const pattern of patterns) {
      const match = combinedOutput.match(pattern);
      if (match) {
        caseStatus.set(c.id, match[1].toLowerCase() === "ok");
        matched = true;
        break;
      }
    }

    if (!matched) {
      const passedPattern = new RegExp(
        `(?:test )?challenge_tests::case_${c.id}[^\\n]*\\bpassed\\b`,
        "im"
      );
      const failedPattern = new RegExp(
        `(?:test )?challenge_tests::case_${c.id}[^\\n]*\\bfailed\\b`,
        "im"
      );
      if (combinedOutput.match(passedPattern)) {
        caseStatus.set(c.id, true);
        matched = true;
      } else if (combinedOutput.match(failedPattern)) {
        caseStatus.set(c.id, false);
        matched = true;
      }
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
    const panic = combinedOutput.match(
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
import { TestCaseSpec, TestCaseValue } from "./types";

export function toRustLiteral(value: TestCaseValue): string {
  if (value === null) return "None";
  if (typeof value === "object") return `Some(${toRustLiteral(value.some)})`;
  if (typeof value === "string") return `"${value.replace(/"/g, '\\"')}"`;
  if (typeof value === "boolean") return value ? "true" : "false";
  return String(value);
}

export function toDisplayValue(value: TestCaseValue): string {
  return toRustLiteral(value);
}

export function formatFunctionCall(
  functionName: string,
  args: TestCaseValue[]
): string {
  return `${functionName}(${args.map(toRustLiteral).join(", ")})`;
}

export function generateRustTests(spec: TestCaseSpec): string {
  const tests = spec.cases
    .map(
      (c) => `    #[test]
    fn case_${c.id}() {
        assert_eq!(${formatFunctionCall(spec.functionName, c.args)}, ${toRustLiteral(c.expected)});
    }`
    )
    .join("\n\n");

  return `#[cfg(test)]
mod challenge_tests {
    use super::*;

${tests}
}`;
}

export function parseTestCaseSpec(raw: unknown): TestCaseSpec | null {
  if (!raw || typeof raw !== "object") return null;
  const spec = raw as TestCaseSpec;
  if (!spec.functionName || !Array.isArray(spec.cases)) return null;
  return spec;
}
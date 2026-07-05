import {
  TestCase,
  TestCaseExpected,
  TestCaseSpec,
  TestCaseValue,
  isStructExpected,
} from "./types";

export function isEnumValue(
  value: TestCaseValue
): value is { enum: string; variant: string } {
  return (
    typeof value === "object" &&
    value !== null &&
    "enum" in value &&
    "variant" in value
  );
}

function isF64Value(value: TestCaseValue): value is { f64: number } {
  return typeof value === "object" && value !== null && "f64" in value;
}

export function toRustLiteral(value: TestCaseValue): string {
  if (value === null) return "None";
  if (isEnumValue(value)) return `&${value.enum}::${value.variant}`;
  if (isF64Value(value)) {
    const n = value.f64;
    return Number.isInteger(n) ? `${n}.0` : String(n);
  }
  if (typeof value === "object" && "some" in value) {
    return `Some(${toRustLiteral(value.some)})`;
  }
  if (typeof value === "string") return `"${value.replace(/"/g, '\\"')}"`;
  if (typeof value === "boolean") return value ? "true" : "false";
  return String(value);
}

export function toDisplayExpected(expected: TestCaseExpected): string {
  if (isStructExpected(expected)) {
    const fields = Object.entries(expected.struct)
      .map(([k, v]) => `${k}: ${toRustLiteral(v)}`)
      .join(", ");
    return `{ ${fields} }`;
  }
  return toRustLiteral(expected);
}

export function resolveFunctionName(spec: TestCaseSpec, c: TestCase): string {
  return c.functionName ?? c.method ?? spec.functionName;
}

export function formatFunctionCall(
  functionName: string,
  args: TestCaseValue[]
): string {
  return `${functionName}(${args.map(toRustLiteral).join(", ")})`;
}

export function formatCaseInput(spec: TestCaseSpec, c: TestCase): string {
  const fn = resolveFunctionName(spec, c);

  if (spec.callKind === "method" && c.receiver) {
    return `${c.receiver}.${fn}()`;
  }

  if (spec.callKind === "mutate" && c.initial !== undefined) {
    const varName = c.mutateVar ?? "s";
    return `${fn}(&mut ${varName}) after "${c.initial}"`;
  }

  return formatFunctionCall(fn, c.args ?? []);
}

function generateCaseAssert(spec: TestCaseSpec, c: TestCase): string {
  const fn = resolveFunctionName(spec, c);

  if (spec.callKind === "mutate" && c.initial !== undefined) {
    const varName = c.mutateVar ?? "s";
    return `let mut ${varName} = String::from(${toRustLiteral(c.initial)});
        ${fn}(&mut ${varName});
        assert_eq!(${varName}, ${toDisplayExpected(c.expected)});`;
  }

  if (spec.callKind === "method" && c.receiver) {
    const recvVar = `receiver_${c.id}`;
    const call = `${recvVar}.${fn}(${(c.args ?? []).map(toRustLiteral).join(", ")})`;
    return `let ${recvVar} = ${c.receiver};
        assert_eq!(${call}, ${toDisplayExpected(c.expected)});`;
  }

  if (spec.callKind === "associated" && isStructExpected(c.expected)) {
    const call = formatFunctionCall(fn, c.args ?? []);
    const resultVar = `result_${c.id}`;
    const fieldAsserts = Object.entries(c.expected.struct)
      .map(([field, value]) => `assert_eq!(${resultVar}.${field}, ${toRustLiteral(value)});`)
      .join("\n        ");
    return `let ${resultVar} = ${call};
        ${fieldAsserts}`;
  }

  return `assert_eq!(${formatFunctionCall(fn, c.args ?? [])}, ${toDisplayExpected(c.expected)});`;
}

export function generateRustTests(spec: TestCaseSpec): string {
  const tests = spec.cases
    .map(
      (c) => `    #[test]
    fn case_${c.id}() {
        ${generateCaseAssert(spec, c)}
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
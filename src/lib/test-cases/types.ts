export type TestCaseValue =
  | number
  | string
  | boolean
  | null
  | { some: TestCaseValue }
  | { enum: string; variant: string }
  | { f64: number };

export type TestCaseExpected =
  | TestCaseValue
  | { struct: Record<string, TestCaseValue> };

export type TestCallKind = "function" | "method" | "associated" | "mutate";

export interface TestCase {
  id: number;
  label?: string;
  args?: TestCaseValue[];
  expected: TestCaseExpected;
  receiver?: string;
  method?: string;
  functionName?: string;
  initial?: string;
  mutateVar?: string;
}

export interface TestCaseSpec {
  functionName: string;
  callKind?: TestCallKind;
  cases: TestCase[];
}

export interface TestCaseResult {
  id: number;
  label: string;
  passed: boolean;
  input: string;
  expected: string;
  output?: string;
  error?: string;
}

export interface TestRunResult {
  accepted: boolean;
  totalCases: number;
  passedCases: number;
  cases: TestCaseResult[];
}

export function isStructExpected(
  expected: TestCaseExpected
): expected is { struct: Record<string, TestCaseValue> } {
  return (
    typeof expected === "object" &&
    expected !== null &&
    "struct" in expected &&
    !("some" in expected) &&
    !("enum" in expected)
  );
}
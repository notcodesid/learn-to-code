export type TestCaseValue =
  | number
  | string
  | boolean
  | null
  | { some: TestCaseValue };

export interface TestCaseSpec {
  functionName: string;
  cases: Array<{
    id: number;
    label?: string;
    args: TestCaseValue[];
    expected: TestCaseValue;
  }>;
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
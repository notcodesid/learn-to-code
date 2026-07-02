import { TestCaseSpec } from "./test-cases/types";

export const CHALLENGE_TEST_SPECS: Record<number, TestCaseSpec> = {
  4: {
    functionName: "add",
    cases: [
      { id: 1, label: "Case 1", args: [3, 7], expected: 10 },
      { id: 2, label: "Case 2", args: [0, 0], expected: 0 },
      { id: 3, label: "Case 3", args: [-2, 5], expected: 3 },
    ],
  },
};
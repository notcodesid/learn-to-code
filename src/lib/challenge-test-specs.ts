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

  10: {
    functionName: "count_evens_in_range",
    cases: [
      { id: 1, label: "Case 1", args: [1, 10], expected: 5 },
      { id: 2, label: "Case 2", args: [2, 2], expected: 1 },
      { id: 3, label: "Case 3", args: [1, 1], expected: 0 },
    ],
  },

  12: {
    functionName: "multiply_by_addition",
    cases: [
      { id: 1, label: "Case 1", args: [5, 4], expected: 20 },
      { id: 2, label: "Case 2", args: [0, 5], expected: 0 },
      { id: 3, label: "Case 3", args: [3, 0], expected: 0 },
      { id: 4, label: "Case 4", args: [7, 1], expected: 7 },
    ],
  },

  13: {
    functionName: "power",
    cases: [
      { id: 1, label: "Case 1", args: [2, 5], expected: 32 },
      { id: 2, label: "Case 2", args: [5, 0], expected: 1 },
      { id: 3, label: "Case 3", args: [9, 1], expected: 9 },
    ],
  },

  14: {
    functionName: "is_prime",
    cases: [
      { id: 1, label: "Case 1", args: [7], expected: true },
      { id: 2, label: "Case 2", args: [12], expected: false },
      { id: 3, label: "Case 3", args: [1], expected: false },
      { id: 4, label: "Case 4", args: [2], expected: true },
    ],
  },

  16: {
    functionName: "largest_proper_divisor",
    cases: [
      { id: 1, label: "Case 1", args: [12], expected: { some: 6 } },
      { id: 2, label: "Case 2", args: [7], expected: { some: 1 } },
      { id: 3, label: "Case 3", args: [1], expected: null },
    ],
  },

  17: {
    functionName: "fibonacci",
    cases: [
      { id: 1, label: "Case 1", args: [0], expected: 0 },
      { id: 2, label: "Case 2", args: [1], expected: 1 },
      { id: 3, label: "Case 3", args: [10], expected: 55 },
    ],
  },

  18: {
    functionName: "factorial",
    cases: [
      { id: 1, label: "Case 1", args: [0], expected: 1 },
      { id: 2, label: "Case 2", args: [5], expected: 120 },
    ],
  },
};
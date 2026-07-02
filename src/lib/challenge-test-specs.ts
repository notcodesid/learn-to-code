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

  32: {
    functionName: "calculate_length",
    cases: [
      { id: 1, label: "Case 1", args: ["hello"], expected: 5 },
      { id: 2, label: "Case 2", args: [""], expected: 0 },
      { id: 3, label: "Case 3", args: ["Rustacean"], expected: 9 },
    ],
  },

  33: {
    functionName: "append_world",
    callKind: "mutate",
    cases: [
      { id: 1, label: "Case 1", initial: "hello", expected: "hello world" },
      { id: 2, label: "Case 2", initial: "hi", expected: "hi world" },
      { id: 3, label: "Case 3", initial: "Rust", expected: "Rust world" },
    ],
  },

  38: {
    functionName: "first_word",
    cases: [
      { id: 1, label: "Case 1", args: ["hello world"], expected: "hello" },
      { id: 2, label: "Case 2", args: ["solo"], expected: "solo" },
      { id: 3, label: "Case 3", args: ["hi there friend"], expected: "hi" },
    ],
  },

  42: {
    functionName: "area",
    callKind: "method",
    cases: [
      {
        id: 1,
        label: "Case 1",
        receiver: "Rectangle { width: 10.0, height: 5.5 }",
        args: [],
        expected: { f64: 55 },
      },
      {
        id: 2,
        label: "Case 2",
        receiver: "Rectangle { width: 2.0, height: 3.0 }",
        args: [],
        expected: { f64: 6 },
      },
      {
        id: 3,
        label: "Case 3",
        receiver: "Rectangle { width: 4.0, height: 0.5 }",
        args: [],
        expected: { f64: 2 },
      },
    ],
  },

  43: {
    functionName: "value_in_cents",
    cases: [
      {
        id: 1,
        label: "Case 1",
        args: [{ enum: "Coin", variant: "Penny" }],
        expected: 1,
      },
      {
        id: 2,
        label: "Case 2",
        args: [{ enum: "Coin", variant: "Nickel" }],
        expected: 5,
      },
      {
        id: 3,
        label: "Case 3",
        args: [{ enum: "Coin", variant: "Dime" }],
        expected: 10,
      },
      {
        id: 4,
        label: "Case 4",
        args: [{ enum: "Coin", variant: "Quarter" }],
        expected: 25,
      },
    ],
  },

  45: {
    functionName: "area",
    callKind: "method",
    cases: [
      {
        id: 1,
        label: "area",
        method: "area",
        receiver: "Rectangle { width: 10.0, height: 5.0 }",
        args: [],
        expected: { f64: 50 },
      },
      {
        id: 2,
        label: "perimeter",
        method: "perimeter",
        receiver: "Rectangle { width: 10.0, height: 5.0 }",
        args: [],
        expected: { f64: 30 },
      },
      {
        id: 3,
        label: "area 3x4",
        method: "area",
        receiver: "Rectangle { width: 3.0, height: 4.0 }",
        args: [],
        expected: { f64: 12 },
      },
    ],
  },

  46: {
    functionName: "Point::new",
    callKind: "associated",
    cases: [
      {
        id: 1,
        label: "new",
        args: [{ f64: 3 }, { f64: 4 }],
        expected: { struct: { x: { f64: 3 }, y: { f64: 4 } } },
      },
      {
        id: 2,
        label: "origin",
        functionName: "Point::origin",
        args: [],
        expected: { struct: { x: { f64: 0 }, y: { f64: 0 } } },
      },
      {
        id: 3,
        label: "new negative",
        args: [{ f64: -1 }, { f64: 2 }],
        expected: { struct: { x: { f64: -1 }, y: { f64: 2 } } },
      },
    ],
  },
};
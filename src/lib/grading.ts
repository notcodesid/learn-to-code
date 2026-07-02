export type GradingMode = "tests" | "output" | "none";

export function getGradingMode(challenge: {
  testCases?: string | null;
  expectedOutput?: string | null;
}): GradingMode {
  if (challenge.testCases) return "tests";
  if (challenge.expectedOutput) return "output";
  return "none";
}

export function isChallengeCorrect(
  mode: GradingMode,
  result: { success: boolean; stdout: string },
  expectedOutput?: string | null
): boolean {
  if (mode === "tests") return result.success;
  if (mode === "output" && expectedOutput) {
    return result.stdout.trim() === expectedOutput.trim();
  }
  return false;
}
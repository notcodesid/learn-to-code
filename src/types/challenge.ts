import { Challenge as PrismaChallenge } from "@prisma/client";

export type Challenge = Omit<PrismaChallenge, "testCases" | "testCaseSpec"> & {
  difficulty: "beginner" | "intermediate" | "advanced" | string;
  hasTestCases?: boolean;
  hasStructuredTests?: boolean;
};
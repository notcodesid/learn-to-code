import { Challenge as PrismaChallenge } from "@prisma/client";

export type Challenge = Omit<PrismaChallenge, "testCases" | "testCaseSpec"> & {
  locked?: boolean;
  difficulty: "beginner" | "intermediate" | "advanced" | string;
  hasTestCases?: boolean;
  hasStructuredTests?: boolean;
};
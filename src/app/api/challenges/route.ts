import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_request: NextRequest) {
  try {
    const challenges = await prisma.challenge.findMany({
      orderBy: [{ order: "asc" }, { id: "asc" }],
    });

    // Never expose hidden test cases to the client
    const publicChallenges = challenges.map(
      ({ testCases, testCaseSpec, ...challenge }) => ({
        ...challenge,
        hasTestCases: !!testCaseSpec || !!testCases?.trim(),
        hasStructuredTests: !!testCaseSpec,
      })
    );

    return NextResponse.json({ challenges: publicChallenges });
  } catch (error) {
    console.error("Get challenges error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
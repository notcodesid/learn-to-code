import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { canAccessChallenge, isPaywallEnabled } from "@/lib/payments";
import { generateRustTests, parseTestCaseSpec } from "@/lib/test-cases/generate-rust";
import { buildTestRunResult } from "@/lib/test-cases/parse-results";

export async function POST(request: NextRequest) {
  let useTests = false;

  try {
    const body = await request.json();
    const { code, challengeId, mode = "run" } = body;

    if (isPaywallEnabled() && typeof challengeId === "number") {
      const session = await getServerSession(authOptions);
      const allowed = await canAccessChallenge(session?.user?.id, challengeId);
      if (!allowed) {
        return NextResponse.json(
          {
            success: false,
            stderr: "This challenge is temporarily unavailable.",
            locked: true,
            mode,
          },
          { status: 402 }
        );
      }
    }

    if (typeof code !== "string") {
      return NextResponse.json(
        { success: false, stderr: "Invalid code" },
        { status: 400 }
      );
    }

    let testCases: string | null = null;
    let testCaseSpec = null;

    if (mode === "test" && typeof challengeId === "number") {
      const challenge = await prisma.challenge.findUnique({
        where: { id: challengeId },
        select: { testCases: true, testCaseSpec: true },
      });

      testCaseSpec = parseTestCaseSpec(challenge?.testCaseSpec);
      testCases = testCaseSpec
        ? generateRustTests(testCaseSpec)
        : challenge?.testCases?.trim() || null;
    }

    useTests = mode === "test" && !!testCases;
    const fullCode = useTests ? `${code}\n\n${testCases}` : code;

    const response = await fetch("https://play.rust-lang.org/execute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        channel: "stable",
        mode: "debug",
        edition: "2021",
        crateType: "bin",
        tests: useTests,
        code: fullCode,
        backtrace: false,
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { success: false, stderr: "Failed to reach Rust Playground" },
        { status: 502 }
      );
    }

    const data = await response.json();
    const stdout = data.stdout || "";
    const stderr = data.stderr || "";

    const payload: Record<string, unknown> = {
      success: data.success,
      stdout,
      stderr,
      mode: useTests ? "test" : "run",
    };

    if (useTests && testCaseSpec) {
      payload.testResult = buildTestRunResult(
        testCaseSpec,
        data.success,
        stdout,
        stderr
      );
    }

    return NextResponse.json(payload);
  } catch (error) {
    console.error("Run API error:", error);

    const message =
      error instanceof Error ? error.message : "Unknown server error";

    const isPrismaStale = message.includes("testCaseSpec");

    return NextResponse.json(
      {
        success: false,
        stderr: isPrismaStale
          ? "Server needs a restart after the latest update. Stop the dev server, run `bunx prisma generate`, then `bun run dev` again."
          : `Server error: ${message}`,
        mode: useTests ? "test" : "run",
      },
      { status: 500 }
    );
  }
}
import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { canAccessChallenge } from "@/lib/payments";

export async function POST(request: NextRequest) {
  const { code, challengeId } = await request.json();

  // Enforce paywall: locked challenges can't be run by free users.
  // `challengeId` is optional for backwards compat but recommended.
  if (typeof challengeId === "number") {
    const session = await getServerSession(authOptions);
    const allowed = await canAccessChallenge(session?.user?.id, challengeId);
    if (!allowed) {
      return Response.json(
        {
          success: false,
          stderr: "This challenge is locked. Unlock all challenges with a one-time purchase.",
          locked: true,
        },
        { status: 402 }
      );
    }
  }

  try {
    const response = await fetch("https://play.rust-lang.org/execute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        channel: "stable",
        mode: "debug",
        edition: "2021",
        crateType: "bin",
        tests: false,
        code,
        backtrace: false,
      }),
    });

    if (!response.ok) {
      return Response.json(
        { success: false, stderr: "Failed to reach Rust Playground" },
        { status: 502 }
      );
    }

    const data = await response.json();
    return Response.json({
      success: data.success,
      stdout: data.stdout || "",
      stderr: data.stderr || "",
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        stderr: `Server error: ${error instanceof Error ? error.message : "Unknown"}`,
      },
      { status: 500 }
    );
  }
}

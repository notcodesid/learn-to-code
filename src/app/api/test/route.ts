import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { code, test } = await request.json();

  try {
    // Combine user code with test cases
    const fullCode = `${code}\n\n${test}`;

    const response = await fetch("https://play.rust-lang.org/execute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        channel: "stable",
        mode: "debug",
        edition: "2021",
        crateType: "bin",
        tests: true,
        code: fullCode,
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

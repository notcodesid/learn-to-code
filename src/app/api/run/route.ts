import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { code, testCases } = await request.json();

  if (typeof code !== "string") {
    return Response.json(
      { success: false, stderr: "Invalid code" },
      { status: 400 }
    );
  }

  const useTests = typeof testCases === "string" && testCases.trim().length > 0;
  const fullCode = useTests ? `${code}\n\n${testCases}` : code;

  try {
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
      mode: useTests ? "tests" : "output",
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        stderr: `Server error: ${error instanceof Error ? error.message : "Unknown"}`,
        mode: useTests ? "tests" : "output",
      },
      { status: 500 }
    );
  }
}
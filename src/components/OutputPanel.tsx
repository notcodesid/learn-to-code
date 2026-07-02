"use client";

import { GradingMode } from "@/lib/grading";

interface OutputPanelProps {
  output: string;
  expectedOutput?: string;
  isRunning: boolean;
  justCompleted?: boolean;
  height?: number;
  className?: string;
  executionMode?: "run" | "test" | null;
  challengeGradingMode?: GradingMode;
  verified?: boolean | null;
}

export function OutputPanel({
  output,
  expectedOutput,
  isRunning,
  justCompleted,
  height,
  className = "",
  executionMode = null,
  challengeGradingMode = "output",
  verified = null,
}: OutputPanelProps) {
  const isTestView = executionMode === "test";
  const isOutputGrading =
    challengeGradingMode === "output" && executionMode === "run";

  const outputMatch =
    isOutputGrading &&
    expectedOutput &&
    output.trim() === expectedOutput.trim();
  const testsPassed = isTestView && verified === true;
  const testsFailed = isTestView && verified === false && !isRunning && output.length > 0;
  const isMatch = outputMatch || testsPassed;

  const isError =
    !isRunning &&
    output.length > 0 &&
    !isMatch &&
    (testsFailed ||
      output.includes("error") ||
      output.includes("Error") ||
      output.includes("FAILED") ||
      output.includes("panicked"));

  const hasOutput = output.length > 0;
  const showTestHint = challengeGradingMode === "tests" && !hasOutput && !isRunning;

  return (
    <div
      style={height !== undefined ? { height: `${height}px` } : undefined}
      className={`border-t flex flex-col transition-colors duration-500 ${
        height === undefined ? "flex-1 md:shrink-0 md:h-40" : "shrink-0"
      } ${
        justCompleted
          ? "border-success/30 bg-success/5"
          : isError
            ? "border-error/20 bg-error/5"
            : "border-border bg-[#111]"
      } ${className}`}
    >
      <div className="flex items-center justify-between px-3 md:px-4 py-1.5 border-b border-border/50 bg-surface/60 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div
            className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
              isRunning
                ? "bg-amber-400 animate-pulse"
                : isMatch
                  ? "bg-success"
                  : isError
                    ? "bg-error"
                    : "bg-muted/30"
            }`}
          />
          <span className="text-[11px] text-muted font-mono uppercase tracking-wider">
            {isTestView ? "Test Results" : "Output"}
          </span>
        </div>

        {hasOutput && !isRunning && (
          <div className="animate-fade-in">
            {isMatch ? (
              <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-success">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                {isTestView ? "All tests passed" : "Output matches expected"}
              </span>
            ) : isError ? (
              <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-error">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M15 9l-6 6M9 9l6 6" />
                </svg>
                {testsFailed ? "Tests failed" : "Compilation error"}
              </span>
            ) : null}
          </div>
        )}
      </div>

      <pre className="flex-1 overflow-auto px-3 md:px-4 py-3 text-[13px] font-mono leading-relaxed whitespace-pre-wrap">
        {isRunning ? (
          <span className="flex items-center gap-2 text-accent">
            <svg
              className="animate-spin h-3.5 w-3.5"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="3"
                className="opacity-20"
              />
              <path
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                className="opacity-80"
              />
            </svg>
            {isTestView ? "Running tests..." : "Compiling and running..."}
          </span>
        ) : hasOutput ? (
          <span
            className={`animate-fade-in ${
              isMatch
                ? "text-success/90"
                : isError
                  ? "text-error/90"
                  : "text-foreground/80"
            }`}
          >
            {output}
          </span>
        ) : showTestHint ? (
          <span className="text-muted/40 flex flex-col gap-1 leading-relaxed">
            <span>
              <strong className="text-muted/60">Run</strong> — compile and see your program&apos;s output
            </span>
            <span>
              <strong className="text-muted/60">Submit</strong> — run hidden test cases to verify your solution
            </span>
          </span>
        ) : (
          <span className="text-muted/30 flex items-center gap-2">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="opacity-50"
            >
              <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" />
              <path d="M13 2v7h7" />
            </svg>
            Click &quot;Run&quot; or press Ctrl+Enter to execute
          </span>
        )}
      </pre>
    </div>
  );
}
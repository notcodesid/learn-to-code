"use client";

import { useState } from "react";
import { TestRunResult } from "@/lib/test-cases/types";

interface TestResultPanelProps {
  result: TestRunResult;
  height?: number;
}

export function TestResultPanel({ result, height }: TestResultPanelProps) {
  const [selectedId, setSelectedId] = useState(
    result.cases.find((c) => !c.passed)?.id ?? result.cases[0]?.id ?? 1
  );

  const selected = result.cases.find((c) => c.id === selectedId) ?? result.cases[0];

  return (
    <div
      style={height !== undefined ? { height: `${height}px` } : undefined}
      className={`shrink-0 border-t border-border bg-[#111] flex flex-col ${
        height === undefined ? "h-36 md:h-40" : ""
      }`}
    >
      <div className="px-3 md:px-4 py-2 border-b border-border/50 bg-surface/60">
        <div className="flex items-center gap-3">
          <span
            className={`text-sm font-semibold ${
              result.accepted ? "text-success" : "text-error"
            }`}
          >
            {result.accepted ? "Accepted" : "Wrong Answer"}
          </span>
          <span className="text-[11px] text-muted font-mono">
            {result.passedCases}/{result.totalCases} passed
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1 px-3 md:px-4 py-2 border-b border-border/40 overflow-x-auto">
        {result.cases.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedId(c.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
              selectedId === c.id
                ? "bg-surface-hover text-foreground border border-border"
                : "text-muted hover:text-foreground hover:bg-surface/50"
            }`}
          >
            {c.passed ? (
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="text-success"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            ) : (
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="text-error"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M15 9l-6 6M9 9l6 6" />
              </svg>
            )}
            {c.label}
          </button>
        ))}
      </div>

      {selected && (
        <div className="flex-1 overflow-auto px-3 md:px-4 py-3 space-y-3 text-[13px] font-mono">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted mb-1">
              Input
            </div>
            <div className="text-foreground/90">{selected.input}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted mb-1">
              Output
            </div>
            <div
              className={
                selected.passed ? "text-success/90" : "text-error/90"
              }
            >
              {selected.output ?? "—"}
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted mb-1">
              Expected
            </div>
            <div className="text-foreground/90">{selected.expected}</div>
          </div>
          {selected.error && !selected.passed && (
            <div className="text-xs text-error/80 pt-1 border-t border-border/30">
              {selected.error}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
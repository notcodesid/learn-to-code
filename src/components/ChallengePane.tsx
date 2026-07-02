"use client";

import { useState, useEffect } from "react";
import { Challenge } from "@/types/challenge";
import { getGradingMode } from "@/lib/grading";

interface ChallengePaneProps {
  challenge: Challenge;
  justCompleted?: boolean;
  compact?: boolean;
}

export function ChallengePane({
  challenge,
  justCompleted,
  compact,
}: ChallengePaneProps) {
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    setAnimKey((k) => k + 1);
  }, [challenge.id]);

  if (compact) {
    return (
      <div className="border-b border-border bg-surface/50 px-4 py-2.5 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-accent uppercase tracking-wider">
            #{challenge.id}
          </span>
          <h2 className="text-sm font-semibold text-foreground truncate">
            {challenge.title}
          </h2>
          {justCompleted && (
            <span className="text-[10px] font-bold text-success animate-fade-in">
              SOLVED
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      key={animKey}
      className="border-b border-border bg-gradient-to-b from-surface/80 to-surface/40 px-4 md:px-6 py-4 shrink-0 animate-fade-in-up"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-bold text-accent uppercase tracking-wider px-1.5 py-0.5 bg-accent/10 rounded">
              Challenge {challenge.id}
            </span>
            <span className="text-[10px] text-muted/60">/</span>
            <span className="text-[10px] text-muted/60 uppercase tracking-wider">
              {challenge.category}
            </span>
            {justCompleted && (
              <span className="text-[10px] font-bold text-success animate-success-pulse bg-success/10 px-1.5 py-0.5 rounded">
                COMPLETED
              </span>
            )}
          </div>

          <h2 className="text-lg md:text-xl font-bold text-foreground mb-1.5 tracking-tight">
            {challenge.title}
          </h2>
          <p className="text-sm text-muted leading-relaxed mb-2">
            {challenge.description}
          </p>
          <p className="text-sm text-foreground/85 leading-relaxed">
            {challenge.instructions}
          </p>
          {getGradingMode(challenge) === "tests" && (
            <p className="mt-2.5 text-xs text-blue-400/90 leading-relaxed flex items-start gap-1.5">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="shrink-0 mt-0.5"
              >
                <path d="M9 12l2 2 4-4" />
                <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>
                Use <strong className="font-semibold text-blue-300">Run</strong> to
                see your output, then{" "}
                <strong className="font-semibold text-blue-300">Submit</strong> to
                verify against hidden test cases.
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

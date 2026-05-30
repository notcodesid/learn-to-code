"use client";

import { useState, useEffect } from "react";
import { Challenge } from "@/types/challenge";

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
        </div>
      </div>
    </div>
  );
}

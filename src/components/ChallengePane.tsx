"use client";

import { useState } from "react";
import { Challenge } from "@/data/challenges";

interface ChallengePaneProps {
  challenge: Challenge;
}

export function ChallengePane({ challenge }: ChallengePaneProps) {
  const [showHint, setShowHint] = useState(false);

  return (
    <div className="border-b border-border bg-surface/50 px-5 py-4 shrink-0">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-medium text-accent uppercase tracking-wide">
              Challenge {challenge.id}
            </span>
            <span className="text-xs text-muted">/ {challenge.category}</span>
          </div>
          <h2 className="text-lg font-semibold text-foreground mb-1">
            {challenge.title}
          </h2>
          <p className="text-sm text-muted mb-2">{challenge.description}</p>
          <p className="text-sm text-foreground/90">{challenge.instructions}</p>
        </div>
        <button
          onClick={() => setShowHint(!showHint)}
          className="shrink-0 px-3 py-1.5 text-xs font-medium rounded-md bg-surface-hover text-muted hover:text-foreground transition-colors"
        >
          {showHint ? "Hide Hint" : "Show Hint"}
        </button>
      </div>
      {showHint && (
        <div className="mt-3 p-3 bg-accent/10 border border-accent/20 rounded-md text-sm text-accent">
          {challenge.hint}
        </div>
      )}
    </div>
  );
}

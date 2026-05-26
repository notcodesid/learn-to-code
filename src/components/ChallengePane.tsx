"use client";

import { useState, useEffect } from "react";
import { Challenge } from "@/data/challenges";

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
  const [showHint, setShowHint] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    setShowHint(false);
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

        <button
          onClick={() => setShowHint(!showHint)}
          className={`shrink-0 px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 btn-press border ${
            showHint
              ? "bg-accent/15 border-accent/30 text-accent"
              : "bg-surface-hover border-border text-muted hover:text-foreground hover:border-border"
          }`}
        >
          <span className="flex items-center gap-1.5">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={`transition-transform duration-200 ${showHint ? "rotate-180" : ""}`}
            >
              <path d="M12 2a7 7 0 017 7c0 2.5-1.3 4-3 5.5V17a1 1 0 01-1 1h-6a1 1 0 01-1-1v-2.5C6.3 13 5 11.5 5 9a7 7 0 017-7z" />
              <path d="M10 21h4" />
            </svg>
            {showHint ? "Hide" : "Hint"}
          </span>
        </button>
      </div>

      {/* Hint with slide-down animation */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-out ${
          showHint ? "max-h-40 opacity-100 mt-3" : "max-h-0 opacity-0 mt-0"
        }`}
      >
        <div className="p-3 bg-accent/8 border border-accent/15 rounded-lg text-sm text-accent/90 leading-relaxed">
          <span className="font-semibold text-accent">Hint: </span>
          {challenge.hint}
        </div>
      </div>
    </div>
  );
}

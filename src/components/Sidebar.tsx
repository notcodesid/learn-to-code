"use client";

import { Lock } from "lucide-react";
import { Challenge } from "@/types/challenge";

interface SidebarProps {
  challenges: Challenge[];
  selectedId: number;
  completedIds: Set<number>;
  onSelect: (challenge: Challenge) => void;
  className?: string;
}

const difficultyConfig = {
  beginner: { color: "text-emerald-400", bg: "bg-emerald-400/10", label: "BEG" },
  intermediate: { color: "text-amber-400", bg: "bg-amber-400/10", label: "INT" },
  advanced: { color: "text-rose-400", bg: "bg-rose-400/10", label: "ADV" },
};

export function Sidebar({
  challenges,
  selectedId,
  completedIds,
  onSelect,
  className = "",
}: SidebarProps) {
  const categories = Array.from(
    new Set(challenges.map((c) => c.category))
  );

  const totalCompleted = completedIds.size;
  const totalChallenges = challenges.length;

  return (
    <aside className={`w-80 shrink-0 h-full border-r border-border bg-surface/95 backdrop-blur-sm overflow-y-auto ${className}`}>
      <div className="p-3">
        {/* Progress summary */}
        <div className="mb-4 p-3 rounded-lg bg-surface-hover/50 border border-border/50 animate-fade-in-down">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted">
              Progress
            </span>
            <span className="text-xs font-bold text-accent tabular-nums">
              {totalCompleted}/{totalChallenges}
            </span>
          </div>
          <div className="w-full h-1.5 bg-border rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-accent to-amber-400 rounded-full transition-all duration-700 ease-out"
              style={{
                width: `${(totalCompleted / totalChallenges) * 100}%`,
              }}
            />
          </div>
        </div>

        {categories.map((category, catIdx) => (
          <div key={category} className="mb-3 animate-fade-in-up" style={{ animationDelay: `${catIdx * 40}ms` }}>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted/60 mb-1 px-2 flex items-center gap-2">
              <span className="flex-1">{category}</span>
              <span className="text-[9px] text-muted/40 tabular-nums">
                {challenges.filter((c) => c.category === category && completedIds.has(c.id)).length}/
                {challenges.filter((c) => c.category === category).length}
              </span>
            </h3>
            {challenges
              .filter((c) => c.category === category)
              .map((challenge) => {
                const isSelected = challenge.id === selectedId;
                const isCompleted = completedIds.has(challenge.id);
                const isLocked = challenge.locked;
                const diff = difficultyConfig[challenge.difficulty as keyof typeof difficultyConfig];
                return (
                  <button
                    key={challenge.id}
                    onClick={() => onSelect(challenge)}
                    className={`group w-full text-left px-2.5 py-2 rounded-lg text-[13px] transition-all duration-200 flex items-center gap-2.5 mb-0.5 btn-press ${
                      isLocked
                        ? "text-muted/60 hover:bg-surface-hover border border-transparent"
                        : isSelected
                          ? "bg-accent/12 text-accent border border-accent/20 shadow-sm shadow-accent/5"
                          : "text-foreground/75 hover:bg-surface-hover hover:text-foreground border border-transparent"
                    }`}
                  >
                    {/* Status indicator */}
                    <span className="shrink-0 w-5 h-5 flex items-center justify-center">
                      {isLocked ? (
                        <Lock className="w-3.5 h-3.5 text-muted/50" />
                      ) : isCompleted ? (
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          className="text-success animate-check-draw"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeOpacity="0.3"
                          />
                          <path
                            d="M8 12l3 3 5-5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : (
                        <span
                          className={`text-[10px] font-bold tabular-nums ${
                            isSelected ? "text-accent" : "text-muted/50 group-hover:text-muted"
                          } transition-colors`}
                        >
                          {String(challenge.id).padStart(2, "0")}
                        </span>
                      )}
                    </span>

                    <span className="truncate flex-1 font-medium">
                      {challenge.title}
                    </span>

                    <span
                      className={`text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${diff.color} ${diff.bg}`}
                    >
                      {diff.label}
                    </span>
                  </button>
                );
              })}
          </div>
        ))}
      </div>
    </aside>
  );
}

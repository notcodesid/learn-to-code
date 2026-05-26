"use client";

import { Challenge } from "@/data/challenges";

interface SidebarProps {
  challenges: Challenge[];
  selectedId: number;
  completedIds: Set<number>;
  onSelect: (challenge: Challenge) => void;
}

const difficultyColor = {
  beginner: "text-green-400",
  intermediate: "text-yellow-400",
  advanced: "text-red-400",
};

export function Sidebar({
  challenges,
  selectedId,
  completedIds,
  onSelect,
}: SidebarProps) {
  const categories = Array.from(
    new Set(challenges.map((c) => c.category))
  );

  return (
    <aside className="w-64 border-r border-border bg-surface overflow-y-auto shrink-0">
      <div className="p-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
          Challenges
        </h2>
        {categories.map((category) => (
          <div key={category} className="mb-4">
            <h3 className="text-[11px] font-semibold uppercase tracking-wider text-muted/70 mb-1.5 px-2">
              {category}
            </h3>
            {challenges
              .filter((c) => c.category === category)
              .map((challenge) => {
                const isSelected = challenge.id === selectedId;
                const isCompleted = completedIds.has(challenge.id);
                return (
                  <button
                    key={challenge.id}
                    onClick={() => onSelect(challenge)}
                    className={`w-full text-left px-2 py-1.5 rounded-md text-sm transition-colors flex items-center gap-2 mb-0.5 ${
                      isSelected
                        ? "bg-accent/15 text-accent"
                        : "text-foreground/80 hover:bg-surface-hover"
                    }`}
                  >
                    <span className="shrink-0 w-4 text-center">
                      {isCompleted ? (
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          className="text-green-400"
                        >
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      ) : (
                        <span className="text-[10px] text-muted">
                          {challenge.id}
                        </span>
                      )}
                    </span>
                    <span className="truncate flex-1">{challenge.title}</span>
                    <span
                      className={`text-[9px] uppercase font-bold ${difficultyColor[challenge.difficulty]}`}
                    >
                      {challenge.difficulty.slice(0, 3)}
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

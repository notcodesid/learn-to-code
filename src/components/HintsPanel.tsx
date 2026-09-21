"use client";

import { useState } from "react";
import { Lightbulb, ChevronDown, ChevronUp, Lock, Unlock } from "lucide-react";

interface Hint {
  level: number;
  title: string;
  content: string;
}

interface HintsPanelProps {
  hints: Hint[];
  onHintUsed?: (level: number) => void;
}

export function HintsPanel({ hints, onHintUsed }: HintsPanelProps) {
  const [expandedHints, setExpandedHints] = useState<Set<number>>(new Set([1]));

  const toggleHint = (level: number) => {
    setExpandedHints(prev => {
      const next = new Set(prev);
      if (next.has(level)) {
        next.delete(level);
      } else {
        next.add(level);
        onHintUsed?.(level);
      }
      return next;
    });
  };

  const isExpanded = (level: number) => expandedHints.has(level);

  return (
    <div className="border-t border-border/50 bg-surface/50">
      <div className="px-4 py-3 border-b border-border/30 bg-surface/80">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-400" />
          <span className="text-sm font-semibold text-foreground">Progressive Hints</span>
          <span className="text-[11px] text-muted font-mono">
            {hints.filter(h => expandedHints.has(h.level)).length}/{hints.length} revealed
          </span>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {hints.map((hint) => {
          const expanded = isExpanded(hint.level);
          const isLocked = hint.level > 1 && !expandedHints.has(hint.level - 1);

          return (
            <div
              key={hint.level}
              className={`rounded-lg border transition-all duration-200 ${
                expanded
                  ? "border-amber-400/30 bg-amber-400/5"
                  : isLocked
                    ? "border-border/30 bg-surface/30 opacity-60"
                    : "border-border/30 bg-surface"
              }`}
            >
              <button
                onClick={() => !isLocked && toggleHint(hint.level)}
                disabled={isLocked}
                className="w-full px-4 py-3 text-left flex items-center gap-3"
              >
                <div className="flex items-center gap-2">
                  <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${
                    expanded
                      ? "bg-amber-400 text-black"
                      : isLocked
                        ? "bg-muted/50 text-muted/50"
                        : "bg-accent/10 text-accent"
                  }`}>
                    {hint.level}
                  </span>
                  <span className="font-medium text-sm">{hint.title}</span>
                  {isLocked && <Lock className="w-3.5 h-3.5 text-muted/50" />}
                </div>
                <span className="ml-auto text-muted/50 text-[11px]">
                  {expanded ? "Click to hide" : isLocked ? "Complete previous hint" : "Click to reveal"}
                </span>
                <span className={`transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}>
                  <ChevronDown className="w-4 h-4 text-muted" />
                </span>
              </button>

              {expanded && (
                <div className="px-4 pb-4 pt-2 animate-fade-in">
                  <div className="pl-8 border-l-2 border-amber-400/30 ml-8">
                    <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap">{hint.content}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {hints.every(h => expandedHints.has(h.level)) && (
          <div className="text-center py-4 text-sm text-success/80">
            <Unlock className="w-5 h-5 mx-auto mb-2" />
            <p>All hints revealed! You're on your own now. 🚀</p>
          </div>
        )}
      </div>
    </div>
  );
}
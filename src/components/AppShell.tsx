"use client";

import { useState, useEffect, useCallback } from "react";
import { challenges, Challenge } from "@/data/challenges";
import { Sidebar } from "./Sidebar";
import { ChallengePane } from "./ChallengePane";
import { CodeEditor } from "./CodeEditor";
import { OutputPanel } from "./OutputPanel";
import { AIChatPanel } from "./AIChatPanel";

function loadProgress(): Set<number> {
  if (typeof window === "undefined") return new Set();
  try {
    const stored = localStorage.getItem("learn-to-code-progress");
    if (stored) return new Set(JSON.parse(stored));
  } catch {}
  return new Set();
}

function saveProgress(completed: Set<number>) {
  localStorage.setItem(
    "learn-to-code-progress",
    JSON.stringify(Array.from(completed))
  );
}

function loadCode(challengeId: number): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(`learn-to-code-code-${challengeId}`);
  } catch {
    return null;
  }
}

function saveCode(challengeId: number, code: string) {
  localStorage.setItem(`learn-to-code-code-${challengeId}`, code);
}

export function AppShell() {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge>(
    challenges[0]
  );
  const [code, setCode] = useState(challenges[0].starterCode);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [completedChallenges, setCompletedChallenges] = useState<Set<number>>(
    new Set()
  );
  const [showChat, setShowChat] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    setCompletedChallenges(loadProgress());
  }, []);

  const handleSelectChallenge = useCallback(
    (challenge: Challenge) => {
      saveCode(selectedChallenge.id, code);
      setSelectedChallenge(challenge);
      const saved = loadCode(challenge.id);
      setCode(saved ?? challenge.starterCode);
      setOutput("");
    },
    [selectedChallenge.id, code]
  );

  const handleRunCode = useCallback(async () => {
    setIsRunning(true);
    setOutput("Compiling...");
    saveCode(selectedChallenge.id, code);

    try {
      const res = await fetch("/api/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();

      if (data.success) {
        setOutput(data.stdout || "(no output)");
        if (
          selectedChallenge.expectedOutput &&
          (data.stdout || "").trim() === selectedChallenge.expectedOutput.trim()
        ) {
          const updated = new Set(completedChallenges);
          updated.add(selectedChallenge.id);
          setCompletedChallenges(updated);
          saveProgress(updated);
        }
      } else {
        setOutput(data.stderr || "Compilation error");
      }
    } catch (err) {
      setOutput(`Error: ${err instanceof Error ? err.message : "Unknown error"}`);
    } finally {
      setIsRunning(false);
    }
  }, [code, selectedChallenge, completedChallenges]);

  const handleResetCode = useCallback(() => {
    setCode(selectedChallenge.starterCode);
    saveCode(selectedChallenge.id, selectedChallenge.starterCode);
    setOutput("");
  }, [selectedChallenge]);

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Top bar */}
      <header className="h-12 flex items-center justify-between px-4 border-b border-border bg-surface shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="text-muted hover:text-foreground transition-colors"
            title="Toggle sidebar"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </button>
          <h1 className="text-lg font-bold tracking-tight">
            <span className="text-accent">learn</span>
            <span className="text-foreground">-to-code</span>
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted">
            {completedChallenges.size}/{challenges.length} completed
          </span>
          <div className="w-24 h-1.5 bg-border rounded-full overflow-hidden">
            <div
              className="h-full bg-accent rounded-full transition-all duration-500"
              style={{
                width: `${(completedChallenges.size / challenges.length) * 100}%`,
              }}
            />
          </div>
          <button
            onClick={() => setShowChat(!showChat)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              showChat
                ? "bg-accent text-white"
                : "bg-surface-hover text-foreground hover:bg-border"
            }`}
          >
            AI Mentor
          </button>
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        {showSidebar && (
          <Sidebar
            challenges={challenges}
            selectedId={selectedChallenge.id}
            completedIds={completedChallenges}
            onSelect={handleSelectChallenge}
          />
        )}

        {/* Center: challenge + editor + output */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Challenge description */}
          <ChallengePane challenge={selectedChallenge} />

          {/* Editor + output */}
          <div className="flex-1 flex flex-col min-h-0">
            <CodeEditor
              code={code}
              onChange={setCode}
              onRun={handleRunCode}
              onReset={handleResetCode}
              isRunning={isRunning}
            />
            <OutputPanel
              output={output}
              expectedOutput={selectedChallenge.expectedOutput}
              isRunning={isRunning}
            />
          </div>
        </div>

        {/* AI Chat */}
        {showChat && (
          <AIChatPanel
            challenge={selectedChallenge}
            code={code}
            onClose={() => setShowChat(false)}
          />
        )}
      </div>
    </div>
  );
}

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
  const [isLoaded, setIsLoaded] = useState(false);
  const [justCompleted, setJustCompleted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileTab, setMobileTab] = useState<"challenge" | "code" | "chat">(
    "code"
  );

  useEffect(() => {
    setCompletedChallenges(loadProgress());
    const timer = setTimeout(() => setIsLoaded(true), 100);

    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setShowSidebar(false);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        handleRunCode();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  const handleSelectChallenge = useCallback(
    (challenge: Challenge) => {
      saveCode(selectedChallenge.id, code);
      setSelectedChallenge(challenge);
      const saved = loadCode(challenge.id);
      setCode(saved ?? challenge.starterCode);
      setOutput("");
      setJustCompleted(false);
      if (isMobile) {
        setShowSidebar(false);
        setMobileTab("code");
      }
    },
    [selectedChallenge.id, code, isMobile]
  );

  const handleRunCode = useCallback(async () => {
    setIsRunning(true);
    setOutput("Compiling...");
    setJustCompleted(false);
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
          const wasAlreadyDone = completedChallenges.has(selectedChallenge.id);
          const updated = new Set(completedChallenges);
          updated.add(selectedChallenge.id);
          setCompletedChallenges(updated);
          saveProgress(updated);
          if (!wasAlreadyDone) setJustCompleted(true);
        }
      } else {
        setOutput(data.stderr || "Compilation error");
      }
    } catch (err) {
      setOutput(
        `Error: ${err instanceof Error ? err.message : "Unknown error"}`
      );
    } finally {
      setIsRunning(false);
    }
  }, [code, selectedChallenge, completedChallenges]);

  const handleResetCode = useCallback(() => {
    setCode(selectedChallenge.starterCode);
    saveCode(selectedChallenge.id, selectedChallenge.starterCode);
    setOutput("");
    setJustCompleted(false);
  }, [selectedChallenge]);

  const progressPercent =
    (completedChallenges.size / challenges.length) * 100;

  if (!isLoaded) {
    return (
      <div className="h-full flex items-center justify-center bg-background">
        <div className="text-center animate-fade-in">
          <h1 className="text-3xl font-bold mb-2">
            <span className="gradient-text">learn</span>
            <span className="text-foreground">-to-code</span>
          </h1>
          <div className="flex items-center justify-center gap-1 mt-4">
            <div className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce" />
            <div className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce [animation-delay:0.15s]" />
            <div className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce [animation-delay:0.3s]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-background animate-fade-in">
      {/* ── Header ──────────────────────────── */}
      <header className="h-12 flex items-center justify-between px-3 md:px-4 border-b border-border bg-surface/80 backdrop-blur-sm shrink-0 z-30">
        <div className="flex items-center gap-2 md:gap-3">
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="p-1.5 rounded-md text-muted hover:text-foreground hover:bg-surface-hover transition-all duration-200 btn-press"
            title="Toggle sidebar"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={`transition-transform duration-300 ${showSidebar ? "rotate-0" : "rotate-180"}`}
            >
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </button>
          <h1 className="text-base md:text-lg font-bold tracking-tight select-none">
            <span className="gradient-text">learn</span>
            <span className="text-foreground">-to-code</span>
          </h1>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-[11px] text-muted tabular-nums">
              {completedChallenges.size}/{challenges.length}
            </span>
            <div className="w-20 md:w-28 h-1.5 bg-border rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-accent to-amber-400 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
          <button
            onClick={() => {
              setShowChat(!showChat);
              if (isMobile && !showChat) setMobileTab("chat");
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 btn-press flex items-center gap-1.5 ${
              showChat
                ? "bg-accent text-white btn-glow shadow-lg shadow-accent/20"
                : "bg-surface-hover text-foreground/80 hover:bg-border hover:text-foreground"
            }`}
          >
            <div
              className={`w-1.5 h-1.5 rounded-full ${showChat ? "bg-white" : "bg-success"} animate-pulse`}
            />
            <span className="hidden sm:inline">AI Mentor</span>
            <span className="sm:hidden">AI</span>
          </button>
        </div>
      </header>

      {/* ── Mobile tabs ─────────────────────── */}
      {isMobile && (
        <div className="flex border-b border-border bg-surface shrink-0 animate-fade-in-down">
          {(["challenge", "code", "chat"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setMobileTab(tab);
                if (tab === "chat") setShowChat(true);
              }}
              className={`flex-1 py-2 text-xs font-medium capitalize transition-all duration-200 border-b-2 ${
                mobileTab === tab
                  ? "text-accent border-accent"
                  : "text-muted border-transparent hover:text-foreground"
              }`}
            >
              {tab === "challenge" ? "Info" : tab}
            </button>
          ))}
        </div>
      )}

      {/* ── Main content ────────────────────── */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar overlay on mobile */}
        {showSidebar && isMobile && (
          <div
            className="mobile-overlay absolute inset-0 z-20 animate-fade-in"
            onClick={() => setShowSidebar(false)}
          />
        )}

        {/* Sidebar */}
        <div
          className={`transition-all duration-300 ease-in-out z-20 ${
            showSidebar
              ? isMobile
                ? "absolute left-0 top-0 bottom-0 w-72 animate-slide-in-left"
                : "w-64"
              : "w-0 overflow-hidden"
          }`}
        >
          {showSidebar && (
            <Sidebar
              challenges={challenges}
              selectedId={selectedChallenge.id}
              completedIds={completedChallenges}
              onSelect={handleSelectChallenge}
            />
          )}
        </div>

        {/* Center: challenge + editor + output */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Desktop: show both panes. Mobile: show based on tab */}
          {(!isMobile || mobileTab === "challenge") && (
            <ChallengePane
              challenge={selectedChallenge}
              justCompleted={justCompleted}
            />
          )}

          {(!isMobile || mobileTab === "code") && (
            <div className="flex-1 flex flex-col min-h-0">
              {isMobile && (
                <ChallengePane
                  challenge={selectedChallenge}
                  justCompleted={justCompleted}
                  compact
                />
              )}
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
                justCompleted={justCompleted}
              />
            </div>
          )}
        </div>

        {/* AI Chat — desktop sidebar or mobile full view */}
        {showChat && !isMobile && (
          <div className="animate-slide-in-right">
            <AIChatPanel
              challenge={selectedChallenge}
              code={code}
              onClose={() => setShowChat(false)}
            />
          </div>
        )}
        {isMobile && mobileTab === "chat" && (
          <div className="absolute inset-0 z-10 animate-fade-in">
            <AIChatPanel
              challenge={selectedChallenge}
              code={code}
              onClose={() => {
                setShowChat(false);
                setMobileTab("code");
              }}
              fullHeight
            />
          </div>
        )}
      </div>

      {/* ── Success celebration overlay ───── */}
      {justCompleted && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center animate-fade-in">
          <div className="animate-success-pulse text-center">
            <div className="text-6xl mb-2">
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#22c55e"
                strokeWidth="2"
                className="mx-auto animate-check-draw"
              >
                <circle cx="12" cy="12" r="10" strokeOpacity="0.3" />
                <path d="M8 12l3 3 5-5" />
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

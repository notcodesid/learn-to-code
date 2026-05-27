"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { challenges, Challenge } from "@/data/challenges";
import { Sidebar } from "./Sidebar";
import { ChallengePane } from "./ChallengePane";
import { CodeEditor } from "./CodeEditor";
import { OutputPanel } from "./OutputPanel";
import { AIChatPanel } from "./AIChatPanel";

export function AppShell() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge>(
    challenges[0]
  );
  const [code, setCode] = useState(challenges[0].starterCode);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [completedChallenges, setCompletedChallenges] = useState<Set<number>>(
    new Set()
  );
  const [savedCode, setSavedCode] = useState<Record<number, string>>({});
  const [showChat, setShowChat] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [isLoadingProgress, setIsLoadingProgress] = useState(true);

  // Resizable output panel states & callbacks
  const containerRef = useRef<HTMLDivElement>(null);
  const [outputHeight, setOutputHeight] = useState(160);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!isDragging) return;

    const handlePointerMove = (e: PointerEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const newHeight = rect.bottom - e.clientY;
        const minHeight = 40;
        const maxHeight = rect.height - 100;
        setOutputHeight(Math.max(minHeight, Math.min(newHeight, maxHeight)));
      }
    };

    const handlePointerUp = () => {
      setIsDragging(false);
    };

    document.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerup", handlePointerUp);
    document.addEventListener("pointercancel", handlePointerUp);

    return () => {
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerup", handlePointerUp);
      document.removeEventListener("pointercancel", handlePointerUp);
    };
  }, [isDragging]);

  const startDragging = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  // Load progress from server when authenticated
  useEffect(() => {
    if (status === "authenticated") {
      loadProgressFromServer();
    } else if (status === "unauthenticated") {
      // Load from localStorage as fallback for unauthenticated users
      loadProgressFromLocalStorage();
      setIsLoadingProgress(false);
    }
  }, [status]);

  const loadProgressFromServer = async () => {
    try {
      const res = await fetch("/api/progress");
      if (res.ok) {
        const data = await res.json();
        const completed = new Set<number>();
        const codeMap: Record<number, string> = {};
        
        Object.entries(data.progress).forEach(([challengeId, progress]: [string, any]) => {
          const id = parseInt(challengeId);
          if (progress.completed) {
            completed.add(id);
          }
          if (progress.code) {
            codeMap[id] = progress.code;
          }
        });
        
        setCompletedChallenges(completed);
        setSavedCode(codeMap);
      }
    } catch (error) {
      console.error("Failed to load progress:", error);
    } finally {
      setIsLoadingProgress(false);
    }
  };

  const loadProgressFromLocalStorage = () => {
    try {
      const stored = localStorage.getItem("learn-to-code-progress");
      if (stored) {
        const completed = new Set<number>(JSON.parse(stored) as number[]);
        setCompletedChallenges(completed);
      }
      
      // Load saved code for all challenges
      challenges.forEach(challenge => {
        const saved = localStorage.getItem(`learn-to-code-code-${challenge.id}`);
        if (saved) {
          setSavedCode(prev => ({ ...prev, [challenge.id]: saved }));
        }
      });
    } catch (error) {
      console.error("Failed to load from localStorage:", error);
    }
  };

  const saveProgressToServer = async (challengeId: number, completed: boolean, code: string) => {
    if (status !== "authenticated") return;
    
    try {
      await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ challengeId, completed, code }),
      });
    } catch (error) {
      console.error("Failed to save progress:", error);
    }
  };

  const handleSelectChallenge = useCallback(
    (challenge: Challenge) => {
      // Save current code before switching
      if (status === "authenticated") {
        saveProgressToServer(selectedChallenge.id, completedChallenges.has(selectedChallenge.id), code);
      } else {
        localStorage.setItem(`learn-to-code-code-${selectedChallenge.id}`, code);
      }
      
      setSelectedChallenge(challenge);
      const saved = savedCode[challenge.id] || challenge.starterCode;
      setCode(saved);
      setOutput("");
    },
    [selectedChallenge.id, code, savedCode, status, completedChallenges]
  );

  const handleRunCode = useCallback(async () => {
    setIsRunning(true);
    setOutput("Compiling...");

    try {
      const res = await fetch("/api/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();

      if (data.success) {
        setOutput(data.stdout || "(no output)");
        const isCorrect = 
          selectedChallenge.expectedOutput &&
          (data.stdout || "").trim() === selectedChallenge.expectedOutput.trim();
        
        if (isCorrect) {
          const updated = new Set(completedChallenges);
          updated.add(selectedChallenge.id);
          setCompletedChallenges(updated);
          
          // Save to server or localStorage
          if (status === "authenticated") {
            saveProgressToServer(selectedChallenge.id, true, code);
          } else {
            localStorage.setItem("learn-to-code-progress", JSON.stringify(Array.from(updated)));
          }
        }
      } else {
        setOutput(data.stderr || "Compilation error");
      }
    } catch (err) {
      setOutput(`Error: ${err instanceof Error ? err.message : "Unknown error"}`);
    } finally {
      setIsRunning(false);
    }
  }, [code, selectedChallenge, completedChallenges, status]);

  const handleResetCode = useCallback(() => {
    setCode(selectedChallenge.starterCode);
    setOutput("");
    // Clear saved code
    setSavedCode(prev => {
      const updated = { ...prev };
      delete updated[selectedChallenge.id];
      return updated;
    });
  }, [selectedChallenge]);

  // Auto-save code when it changes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (status === "authenticated") {
        saveProgressToServer(selectedChallenge.id, completedChallenges.has(selectedChallenge.id), code);
      } else {
        localStorage.setItem(`learn-to-code-code-${selectedChallenge.id}`, code);
      }
      setSavedCode(prev => ({ ...prev, [selectedChallenge.id]: code }));
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [code, selectedChallenge.id, status, completedChallenges]);

  if (status === "loading" || isLoadingProgress) {
    return (
      <div className="h-full flex items-center justify-center bg-background">
        <div className="text-muted">Loading...</div>
      </div>
    );
  }

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
          
          {session ? (
            <>
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
              <div className="flex items-center gap-2 pl-2 border-l border-border">
                {session.user?.image && (
                  <img
                    src={session.user.image}
                    alt="Profile"
                    className="w-6 h-6 rounded-full"
                  />
                )}
                <span className="text-xs text-muted">
                  {session.user?.name || session.user?.email}
                </span>
                <button
                  onClick={() => signOut({ callbackUrl: "/auth/signin" })}
                  className="text-xs text-muted hover:text-foreground transition-colors"
                >
                  Sign out
                </button>
              </div>
            </>
          ) : (
            <button
              onClick={() => router.push("/auth/signin")}
              className="px-3 py-1.5 text-xs font-medium rounded-md bg-accent text-white hover:opacity-90 transition-opacity"
            >
              Sign in
            </button>
          )}
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
          <div
            ref={containerRef}
            className={`flex-1 flex flex-col min-h-0 relative ${isDragging ? "select-none" : ""}`}
          >
            <CodeEditor
              code={code}
              onChange={setCode}
              onRun={handleRunCode}
              onReset={handleResetCode}
              isRunning={isRunning}
            />
            {/* Drag Handle Divider */}
            <div
              className={`h-2 cursor-ns-resize bg-border/50 hover:bg-accent/40 active:bg-accent transition-colors shrink-0 flex items-center justify-center relative group z-10 select-none touch-none`}
              onPointerDown={startDragging}
            >
              <div className="w-8 h-0.5 rounded-full bg-muted/20 group-hover:bg-accent/60 group-active:bg-accent transition-colors" />
            </div>

            <OutputPanel
              output={output}
              expectedOutput={selectedChallenge.expectedOutput}
              isRunning={isRunning}
              height={outputHeight}
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
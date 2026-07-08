"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Challenge } from "@/types/challenge";
import { getGradingMode, isChallengeCorrect } from "@/lib/grading";
import { Sidebar } from "./Sidebar";
import { ChallengePane } from "./ChallengePane";
import { CodeEditor } from "./CodeEditor";
import { OutputPanel } from "./OutputPanel";
import { TestResultPanel } from "./TestResultPanel";
import { AuthPromptModal } from "./AuthPromptModal";
import { TestRunResult } from "@/lib/test-cases/types";
import { parseApiJson } from "@/lib/parse-api-response";


// Custom SVG Logo Icon
const LogoIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 46 47"
    fill="none"
    className={className}
  >
    <g fill="currentColor" clipPath="url(#logo-clip-shell)">
      <path d="M19.03 46.41a3.175 3.175 0 0 0 3.166-3.174v-4.758h12.697a3.174 3.174 0 0 0 0-6.349H22.196v-4.757a3.167 3.167 0 0 0-3.174-3.167 3.167 3.167 0 0 0-3.166 3.167v15.864a3.174 3.174 0 0 0 3.174 3.174Z" />
      <path d="M46.002 27.37a3.167 3.167 0 0 0-3.175-3.167H38.07V11.506a3.174 3.174 0 1 0-6.349 0v12.697h-4.757a3.161 3.161 0 0 0-3.167 3.167 3.167 3.167 0 0 0 3.167 3.174h15.863a3.174 3.174 0 0 0 3.175-3.174Z" />
      <path d="M26.962.408a3.167 3.167 0 0 0-3.167 3.174V8.34H11.1a3.174 3.174 0 0 0-3.167 3.167 3.174 3.174 0 0 0 3.167 3.174h12.696v4.758a3.167 3.167 0 0 0 5.412 2.237c.595-.596.93-1.403.93-2.245V3.582A3.174 3.174 0 0 0 26.961.408Z" />
      <path d="M0 19.438a3.174 3.174 0 0 0 3.174 3.167h4.758v12.697a3.174 3.174 0 0 0 3.167 3.174 3.175 3.175 0 0 0 3.166-3.174V22.605h4.758a3.174 3.174 0 0 0 3.174-3.167 3.174 3.174 0 0 0-3.174-3.166H3.174A3.174 3.174 0 0 0 0 19.438Z" />
    </g>
    <defs>
      <clipPath id="logo-clip-shell">
        <path fill="#fff" d="M0 .408h46v46H0z" />
      </clipPath>
    </defs>
  </svg>
);

export function AppShell() {
  const { data: session, status } = useSession();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const router = useRouter();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [completedChallenges, setCompletedChallenges] = useState<Set<number>>(
    new Set()
  );
  // Keep a ref to the latest completed set so the auto-save effect doesn't
  // re-run every time we create a new Set instance.
  const completedChallengesRef = useRef(completedChallenges);
  completedChallengesRef.current = completedChallenges;
  const [savedCode, setSavedCode] = useState<Record<number, string>>({});
  const [showSidebar, setShowSidebar] = useState(true);
  const [isLoadingProgress, setIsLoadingProgress] = useState(true);
  const [isLoadingChallenges, setIsLoadingChallenges] = useState(true);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState<"challenge" | "editor" | "output">("challenge");
  const [runVerified, setRunVerified] = useState<boolean | null>(null);
  const [executionMode, setExecutionMode] = useState<"run" | "test" | null>(null);
  const [runningAction, setRunningAction] = useState<"run" | "test" | null>(null);
  const [testResult, setTestResult] = useState<TestRunResult | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();

    if (window.innerWidth < 768) {
      setShowSidebar(false);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Track if we've already shown the "please sign up" prompt for typing.
  // We only auto-show once on write, but re-show on Run attempts (stronger intent).
  const hasSeenWritePromptRef = useRef(false);

  // Track if we've already restored saved code after initial load
  // to prevent the restore effect from running during auto-save operations.
  const hasRestoredCodeRef = useRef(false);

  // Load challenges from the database
  useEffect(() => {
    const loadChallenges = async () => {
      try {
        const res = await fetch("/api/challenges");
        if (res.ok) {
          const data = await res.json();
          const list: Challenge[] = data.challenges || [];
          setChallenges(list);
          if (list.length > 0) {
            setSelectedChallenge(list[0]);
            setCode(list[0].starterCode);
          }
        }
      } catch (error) {
        console.error("Failed to load challenges:", error);
      } finally {
        setIsLoadingChallenges(false);
      }
    };
    loadChallenges();
  }, [status]);

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

  // Load progress from server (authenticated users only).
  // Unauthenticated users can browse challenges but the editor is gated.
  // Defined as a regular function before the effect so it is hoisted for the recursive retry call.
  async function loadProgressFromServer(retryCount = 0) {
    try {
      const res = await fetch("/api/progress");
      if (res.ok) {
        const data = await res.json();
        const completed = new Set<number>();
        const codeMap: Record<number, string> = {};
        
        Object.entries(data.progress).forEach(([challengeId, progress]) => {
          const p = progress as { completed?: boolean; code?: string | null };
          const id = parseInt(challengeId);
          if (p.completed) {
            completed.add(id);
          }
          if (p.code) {
            codeMap[id] = p.code;
          }
        });
        
        setCompletedChallenges(completed);
        setSavedCode(codeMap);
      } else if (res.status === 404 && retryCount === 0) {
        // User not found in database, try to sync from session
        console.log("User not found in database, attempting to sync...");
        try {
          const syncRes = await fetch("/api/auth/sync-user", { method: "POST" });
          if (syncRes.ok) {
            console.log("User synced successfully, retrying progress load");
            // Retry loading progress after sync (only once)
            await loadProgressFromServer(retryCount + 1);
          } else {
            console.error("Failed to sync user, signing out");
            await signOut({ callbackUrl: "/auth/signin" });
          }
        } catch (syncError) {
          console.error("Sync failed:", syncError);
          await signOut({ callbackUrl: "/auth/signin" });
        }
      } else {
        // Failed after retry or other error
        console.error("Failed to load progress after retry");
        await signOut({ callbackUrl: "/auth/signin" });
      }
    } catch (error) {
      console.error("Failed to load progress:", error);
    } finally {
      setIsLoadingProgress(false);
    }
  }

  useEffect(() => {
    if (status === "authenticated") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsLoadingProgress(true);
      void loadProgressFromServer();
    } else if (status === "unauthenticated") {
      setIsLoadingProgress(false);
    }
  }, [status]);

  // After both challenges and progress have loaded, restore any saved code
  // for the initially selected challenge. This fixes the case where we
  // blindly set starterCode during the challenges load, before we knew
  // the user's saved progress.
  useEffect(() => {
    if (isLoadingProgress || isLoadingChallenges) return;
    if (!selectedChallenge) return;

    // Only restore once after initial load to prevent interfering with auto-save
    if (hasRestoredCodeRef.current) return;
    hasRestoredCodeRef.current = true;

    const saved = savedCode[selectedChallenge.id];
    if (saved && saved !== code) {
      setCode(saved);
    }
  }, [isLoadingProgress, isLoadingChallenges, selectedChallenge?.id, savedCode, code]);

  const saveProgressToServer = async (challengeId: number, completed: boolean, code: string) => {
    if (status !== "authenticated") return false;

    try {
      const res = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ challengeId, completed, code }),
      });

      if (res.ok) {
        setSavedCode(prev => ({ ...prev, [challengeId]: code }));
        return true;
      }

      // If user row is missing (can happen in some OAuth timing cases), try to sync once
      if (res.status === 404) {
        try {
          const syncRes = await fetch("/api/auth/sync-user", { method: "POST" });
          if (syncRes.ok) {
            const retryRes = await fetch("/api/progress", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ challengeId, completed, code }),
            });
            if (retryRes.ok) {
              setSavedCode(prev => ({ ...prev, [challengeId]: code }));
              return true;
            }
          }
        } catch (syncErr) {
          console.error("User sync during save failed:", syncErr);
        }
      }

      console.error("Failed to save progress, status:", res.status);
      return false;
    } catch (error) {
      console.error("Failed to save progress:", error);
      return false;
    }
  };

  const handleSelectChallenge = useCallback(
    (challenge: Challenge) => {
      // Save current code before switching (only for authenticated users)
      if (selectedChallenge && status === "authenticated") {
        const isCompleted = completedChallengesRef.current.has(selectedChallenge.id);
        saveProgressToServer(selectedChallenge.id, isCompleted, code);
      }

      setSelectedChallenge(challenge);
      const saved = savedCode[challenge.id] || challenge.starterCode;
      setCode(saved);
      setOutput("");
      setRunVerified(null);
      setExecutionMode(null);
      setTestResult(null);
      // Reset the restore flag so saved code is restored when switching challenges
      hasRestoredCodeRef.current = false;

      if (window.innerWidth < 768) {
        setShowSidebar(false);
        setActiveTab("challenge");
      }
    },
    [selectedChallenge, code, savedCode, status]
  );

  const requireAuth = useCallback(() => {
    if (status === "unauthenticated") {
      setShowAuthPrompt(true);
      return false;
    }
    return true;
  }, [status]);

  const handleRunCode = useCallback(async () => {
    if (!selectedChallenge || !requireAuth()) return;

    if (window.innerWidth < 768) {
      setActiveTab("output");
    }

    const gradingMode = getGradingMode(selectedChallenge);
    const usesTests = gradingMode === "tests";

    setIsRunning(true);
    setRunningAction("run");
    setExecutionMode("run");
    setRunVerified(null);
    setTestResult(null);
    setOutput("Compiling...");

    try {
      const res = await fetch("/api/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          challengeId: selectedChallenge.id,
          mode: "run",
        }),
      });
      const data = await parseApiJson<{
        success: boolean;
        stdout?: string;
        stderr?: string;
        locked?: boolean;
      }>(res);

      if (res.status === 402 || data.locked) {
        setOutput("This challenge is temporarily unavailable.");
        setIsRunning(false);
        setRunningAction(null);
        return;
      }

      if (data.success) {
        const stdout = data.stdout || "(no output)";
        setOutput(stdout);

        // Print-based challenges: Run grades the solution
        if (!usesTests) {
          const passed = isChallengeCorrect(
            "output",
            { success: data.success, stdout },
            selectedChallenge.expectedOutput
          );
          setRunVerified(passed);

          if (passed) {
            const updated = new Set(completedChallengesRef.current);
            updated.add(selectedChallenge.id);
            setCompletedChallenges(updated);

            if (status === "authenticated") {
              saveProgressToServer(selectedChallenge.id, true, code);
            }
          }
        }
      } else {
        setRunVerified(false);
        setOutput(data.stderr || "Compilation error");
      }
    } catch (err) {
      setRunVerified(false);
      setOutput(`Error: ${err instanceof Error ? err.message : "Unknown error"}`);
    } finally {
      setIsRunning(false);
      setRunningAction(null);
    }
  }, [code, selectedChallenge, status, requireAuth]);

  const handleSubmitTests = useCallback(async () => {
    if (!selectedChallenge || !requireAuth()) return;

    if (window.innerWidth < 768) {
      setActiveTab("output");
    }

    setIsRunning(true);
    setRunningAction("test");
    setExecutionMode("test");
    setRunVerified(null);
    setTestResult(null);
    setOutput("Running tests...");

    try {
      const res = await fetch("/api/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          challengeId: selectedChallenge.id,
          mode: "test",
        }),
      });
      const data = await parseApiJson<{
        success: boolean;
        stdout?: string;
        stderr?: string;
        locked?: boolean;
        testResult?: TestRunResult;
      }>(res);

      if (res.status === 402 || data.locked) {
        setOutput("This challenge is temporarily unavailable.");
        setIsRunning(false);
        setRunningAction(null);
        return;
      }

      if (data.testResult) {
        setTestResult(data.testResult);
        setRunVerified(data.testResult.accepted);

        if (data.testResult.accepted) {
          const updated = new Set(completedChallengesRef.current);
          updated.add(selectedChallenge.id);
          setCompletedChallenges(updated);

          if (status === "authenticated") {
            saveProgressToServer(selectedChallenge.id, true, code);
          }
        }
      } else if (data.success) {
        setOutput(data.stdout || "All tests passed!");
        setRunVerified(true);

        const updated = new Set(completedChallengesRef.current);
        updated.add(selectedChallenge.id);
        setCompletedChallenges(updated);

        if (status === "authenticated") {
          saveProgressToServer(selectedChallenge.id, true, code);
        }
      } else {
        setRunVerified(false);
        setOutput(data.stderr || data.stdout || "Tests failed");
      }
    } catch (err) {
      setRunVerified(false);
      setOutput(`Error: ${err instanceof Error ? err.message : "Unknown error"}`);
    } finally {
      setIsRunning(false);
      setRunningAction(null);
    }
  }, [code, selectedChallenge, status, requireAuth]);

  const handleResetCode = useCallback(() => {
    if (!selectedChallenge) return;

    const starter = selectedChallenge.starterCode;
    setCode(starter);
    setOutput("");
    setRunVerified(null);
    setExecutionMode(null);
    setTestResult(null);

    // Remove from local cache
    setSavedCode(prev => {
      const updated = { ...prev };
      delete updated[selectedChallenge.id];
      return updated;
    });

    // Persist the reset to the server so it stays cleared across refreshes
    if (status === "authenticated") {
      void saveProgressToServer(selectedChallenge.id, false, starter);
    }
  }, [selectedChallenge, status]);

  // Wrapped code change handler: guests can type and see the editor fully.
  // We gently prompt them once the first time they start writing code.
  const handleCodeChange = useCallback((newCode: string) => {
    if (status === "unauthenticated" && !hasSeenWritePromptRef.current) {
      hasSeenWritePromptRef.current = true;
      setShowAuthPrompt(true);
    }
    // Always update so the editor feels completely real for guests too.
    setCode(newCode);
  }, [status]);

  // Auto-save code when it changes (only for authenticated users now)
  useEffect(() => {
    if (!selectedChallenge || status !== "authenticated") return;

    const challengeId = selectedChallenge.id;
    const timer = setTimeout(() => {
      // Use ref to get latest completed state without causing this effect to re-run
      // every time a new Set is created in setCompletedChallenges.
      const isCompleted = completedChallengesRef.current.has(challengeId);
      saveProgressToServer(challengeId, isCompleted, code);
      // Optimistic local update (saveProgressToServer also does this on success)
      setSavedCode(prev => ({ ...prev, [challengeId]: code }));
    }, 1000);

    return () => clearTimeout(timer);
  }, [code, selectedChallenge, status]);

  if (status === "loading" || isLoadingProgress || isLoadingChallenges || !selectedChallenge) {
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
          <div className="flex items-center gap-2 select-none">
            <span className="text-accent flex items-center shrink-0">
              <LogoIcon className="w-5.5 h-5.5" />
            </span>
            <h1 className="text-[15px] font-extrabold tracking-tight text-foreground font-sans">
              learn-to-code
            </h1>
          </div>
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
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center focus:outline-none cursor-pointer"
              >
                {session.user?.image ? (
                  <img
                    src={session.user.image}
                    alt="Profile"
                    className="w-7.5 h-7.5 rounded-full border border-border hover:border-accent transition-colors"
                  />
                ) : (
                  <div className="w-7.5 h-7.5 rounded-full bg-surface border border-border flex items-center justify-center text-xs font-semibold text-accent hover:border-accent transition-colors">
                    {(session.user?.name || "U").substring(0, 1).toUpperCase()}
                  </div>
                )}
              </button>
              
              {isProfileOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40 cursor-default" 
                    onClick={() => setIsProfileOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-[#161616] border border-border/80 rounded-xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-100 origin-top-right">
                    <div className="px-4 py-1.5 text-xs text-muted-foreground truncate border-b border-border/30 pb-2 mb-1 select-none">
                      <div className="font-semibold text-foreground truncate">
                        {session.user?.name || "User"}
                      </div>
                      <div className="text-[10.5px] text-muted truncate mt-0.5">
                        {session.user?.email || ""}
                      </div>
                    </div>
                    <button
                      onClick={() => signOut({ callbackUrl: "/auth/signin" })}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-muted hover:text-foreground hover:bg-surface transition-colors cursor-pointer"
                    >
                      Sign out
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <button
              onClick={() => setShowAuthPrompt(true)}
              className="px-3 py-1.5 text-xs font-medium rounded-md bg-accent text-white hover:opacity-90 transition-opacity"
            >
              Sign in
            </button>
          )}
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden relative">
        {showSidebar && isMobile && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden animate-fade-in"
            onClick={() => setShowSidebar(false)}
          />
        )}

        <Sidebar
          challenges={challenges}
          selectedId={selectedChallenge.id}
          completedIds={completedChallenges}
          onSelect={handleSelectChallenge}
          className={`
            transition-transform duration-300 ease-in-out z-50
            fixed inset-y-0 left-0 w-80 h-full border-r border-border
            md:static md:translate-x-0 md:z-auto
            ${showSidebar ? "translate-x-0" : "-translate-x-full md:hidden"}
          `}
        />

        <div className="flex-1 flex flex-col min-w-0 bg-background relative">
          <div className="flex md:hidden border-b border-border bg-surface shrink-0 z-10">
            <button
              onClick={() => setActiveTab("challenge")}
              className={`flex-1 py-3.5 text-center text-xs font-bold tracking-wider uppercase border-b-2 transition-all duration-200 cursor-pointer ${
                activeTab === "challenge"
                  ? "border-accent text-accent"
                  : "border-transparent text-muted hover:text-foreground"
              }`}
            >
              Challenge
            </button>
            <button
              onClick={() => setActiveTab("editor")}
              className={`flex-1 py-3.5 text-center text-xs font-bold tracking-wider uppercase border-b-2 transition-all duration-200 cursor-pointer ${
                activeTab === "editor"
                  ? "border-accent text-accent"
                  : "border-transparent text-muted hover:text-foreground"
              }`}
            >
              Editor
            </button>
            <button
              onClick={() => setActiveTab("output")}
              className={`flex-1 py-3.5 text-center text-xs font-bold tracking-wider uppercase border-b-2 transition-all duration-200 cursor-pointer relative ${
                activeTab === "output"
                  ? "border-accent text-accent"
                  : "border-transparent text-muted hover:text-foreground"
              }`}
            >
              Output
              {(output || testResult) && !isRunning && activeTab !== "output" && (
                <span
                  className={`absolute top-3 right-4.5 w-1.5 h-1.5 rounded-full ${
                    runVerified === true || testResult?.accepted
                      ? "bg-success animate-pulse"
                      : "bg-error animate-pulse"
                  }`}
                />
              )}
            </button>
          </div>

          <div
            className={`
            md:block shrink-0
            ${isMobile && activeTab === "challenge" ? "flex-1 overflow-y-auto block" : "hidden"}
          `}
          >
            <ChallengePane challenge={selectedChallenge} />
          </div>

          <div
            ref={containerRef}
            className={`
              flex-1 flex flex-col min-h-0 relative
              ${isMobile && activeTab !== "editor" && activeTab !== "output" ? "hidden" : "flex"}
              ${isDragging ? "select-none" : ""}
            `}
          >
            <div
              className={`
              flex-1 flex flex-col min-h-0
              ${isMobile && activeTab !== "editor" ? "hidden" : "flex"}
            `}
            >
              <CodeEditor
                code={code}
                onChange={handleCodeChange}
                onRun={handleRunCode}
                onSubmitTests={handleSubmitTests}
                onReset={handleResetCode}
                isRunning={isRunning}
                runningAction={runningAction}
                hasTestCases={!!selectedChallenge.hasTestCases}
              />
            </div>

            <div
              className="hidden md:flex h-2 cursor-ns-resize bg-border/50 hover:bg-accent/40 active:bg-accent transition-colors shrink-0 items-center justify-center relative group z-10 select-none touch-none"
              onPointerDown={startDragging}
            >
              <div className="w-8 h-0.5 rounded-full bg-muted/20 group-hover:bg-accent/60 group-active:bg-accent transition-colors" />
            </div>

            <div
              className={`
              ${isMobile && activeTab !== "output" ? "hidden" : "flex flex-col"}
              ${isMobile ? "flex-1 min-h-0 h-full" : "shrink-0"}
            `}
            >
              {executionMode === "test" && testResult && !isRunning ? (
                <TestResultPanel
                  result={testResult}
                  height={isMobile ? undefined : outputHeight}
                />
              ) : (
                <OutputPanel
                  output={output}
                  expectedOutput={selectedChallenge.expectedOutput || undefined}
                  isRunning={isRunning}
                  height={isMobile ? undefined : outputHeight}
                  executionMode={executionMode}
                  challengeGradingMode={getGradingMode(selectedChallenge)}
                  verified={runVerified}
                  className={isMobile ? "border-t-0 flex-1" : ""}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <AuthPromptModal
        open={showAuthPrompt}
        onClose={() => setShowAuthPrompt(false)}
      />
    </div>
  );
}
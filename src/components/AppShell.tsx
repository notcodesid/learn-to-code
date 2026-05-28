"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Challenge } from "@/data/challenges";
import { Sidebar } from "./Sidebar";
import { ChallengePane } from "./ChallengePane";
import { CodeEditor } from "./CodeEditor";
import { OutputPanel } from "./OutputPanel";
import { AuthPromptModal } from "./AuthPromptModal";


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
  const [savedCode, setSavedCode] = useState<Record<number, string>>({});
  const [showSidebar, setShowSidebar] = useState(true);
  const [isLoadingProgress, setIsLoadingProgress] = useState(true);
  const [isLoadingChallenges, setIsLoadingChallenges] = useState(true);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);

  // Track if we've already shown the "please sign up" prompt for typing.
  // We only auto-show once on write, but re-show on Run attempts (stronger intent).
  const hasSeenWritePromptRef = useRef(false);

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
  }, []);

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
      // Save current code before switching (only for authenticated users)
      if (selectedChallenge && status === "authenticated") {
        saveProgressToServer(selectedChallenge.id, completedChallenges.has(selectedChallenge.id), code);
      }
      
      setSelectedChallenge(challenge);
      const saved = savedCode[challenge.id] || challenge.starterCode;
      setCode(saved);
      setOutput("");
    },
    [selectedChallenge, code, savedCode, status, completedChallenges]
  );

  const handleRunCode = useCallback(async () => {
    if (!selectedChallenge) return;

    // For guests: show the friendly sign-up prompt instead of running.
    // We always show on Run (even if they dismissed the typing prompt).
    if (status === "unauthenticated") {
      setShowAuthPrompt(true);
      return;
    }

    setIsRunning(true);
    setOutput("Compiling...");

    try {
      const res = await fetch("/api/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, challengeId: selectedChallenge.id }),
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
          
          // Save completion to server (authenticated users only)
          if (status === "authenticated") {
            saveProgressToServer(selectedChallenge.id, true, code);
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
    if (!selectedChallenge) return;
    setCode(selectedChallenge.starterCode);
    setOutput("");
    // Clear saved code
    setSavedCode(prev => {
      const updated = { ...prev };
      delete updated[selectedChallenge.id];
      return updated;
    });
  }, [selectedChallenge]);

  const handleTestCode = useCallback(async () => {
    if (!selectedChallenge) return;

    if (status === "unauthenticated") {
      setShowAuthPrompt(true);
      return;
    }

    setIsRunning(true);
    setOutput("Running tests...");

    try {
      const res = await fetch("/api/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, test: selectedChallenge.test }),
      });
      const data = await res.json();

      if (data.success) {
        setOutput(data.stdout || "Tests passed!");
      } else {
        setOutput(data.stderr || "Test failed");
      }
    } catch (err) {
      setOutput(`Error: ${err instanceof Error ? err.message : "Unknown error"}`);
    } finally {
      setIsRunning(false);
    }
  }, [code, selectedChallenge, status]);

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
      saveProgressToServer(challengeId, completedChallenges.has(challengeId), code);
      setSavedCode(prev => ({ ...prev, [challengeId]: code }));
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [code, selectedChallenge, status, completedChallenges]);

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

          {/* Editor + output — always visible so guests can see the code and starter.
              We intercept writes/runs via modal for unauthenticated users. */}
          <div
            ref={containerRef}
            className={`flex-1 flex flex-col min-h-0 relative ${isDragging ? "select-none" : ""}`}
          >
            <CodeEditor
              code={code}
              onChange={handleCodeChange}
              onRun={handleRunCode}
              onReset={handleResetCode}
              onTest={handleTestCode}
              isRunning={isRunning}
              hasTest={!!selectedChallenge.test}
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


      </div>

      <AuthPromptModal
        open={showAuthPrompt}
        onClose={() => setShowAuthPrompt(false)}
      />
    </div>
  );
}
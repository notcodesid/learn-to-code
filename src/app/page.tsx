"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { PricingCard } from "@/components/PricingCard";
import {
  Play,
  Terminal,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Layers,
  Check
} from "lucide-react";

// Custom SVG Logo Icon provided by the user
const LogoIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 46 47"
    fill="none"
    className={className}
  >
    <g fill="currentColor" clipPath="url(#logo-clip)">
      <path d="M19.03 46.41a3.175 3.175 0 0 0 3.166-3.174v-4.758h12.697a3.174 3.174 0 0 0 0-6.349H22.196v-4.757a3.167 3.167 0 0 0-3.174-3.167 3.167 3.167 0 0 0-3.166 3.167v15.864a3.174 3.174 0 0 0 3.174 3.174Z" />
      <path d="M46.002 27.37a3.167 3.167 0 0 0-3.175-3.167H38.07V11.506a3.174 3.174 0 1 0-6.349 0v12.697h-4.757a3.161 3.161 0 0 0-3.167 3.167 3.167 3.167 0 0 0 3.167 3.174h15.863a3.174 3.174 0 0 0 3.175-3.174Z" />
      <path d="M26.962.408a3.167 3.167 0 0 0-3.167 3.174V8.34H11.1a3.174 3.174 0 0 0-3.167 3.167 3.174 3.174 0 0 0 3.167 3.174h12.696v4.758a3.167 3.167 0 0 0 5.412 2.237c.595-.596.93-1.403.93-2.245V3.582A3.174 3.174 0 0 0 26.961.408Z" />
      <path d="M0 19.438a3.174 3.174 0 0 0 3.174 3.167h4.758v12.697a3.174 3.174 0 0 0 3.167 3.174 3.175 3.175 0 0 0 3.166-3.174V22.605h4.758a3.174 3.174 0 0 0 3.174-3.167 3.174 3.174 0 0 0-3.174-3.166H3.174A3.174 3.174 0 0 0 0 19.438Z" />
    </g>
    <defs>
      <clipPath id="logo-clip">
        <path fill="#fff" d="M0 .408h46v46H0z" />
      </clipPath>
    </defs>
  </svg>
);

const CODE_SEGMENTS = [
  { text: "fn ", className: "text-accent" },
  { text: "main", className: "text-blue-400" },
  { text: "() {\n", className: "" },
  { text: "  ", className: "" },
  { text: "let", className: "text-accent" },
  { text: " language = ", className: "" },
  { text: "\"Rust\"", className: "text-emerald-400" },
  { text: ";\n  ", className: "" },
  { text: "println!", className: "text-blue-400" },
  { text: "(", className: "" },
  { text: "\"Hello, {} learner!\"", className: "text-emerald-400" },
  { text: ", language);\n\n  ", className: "" },
  { text: "// Compiler checks test cases\n  ", className: "text-muted-foreground" },
  { text: "let mut", className: "text-accent" },
  { text: " lines_written = ", className: "" },
  { text: "1", className: "text-amber-500" },
  { text: ";\n  ", className: "" },
  { text: "lines_written += ", className: "" },
  { text: "999", className: "text-amber-500" },
  { text: ";\n\n  ", className: "" },
  { text: "assert_eq!", className: "text-blue-400" },
  { text: "(lines_written, ", className: "" },
  { text: "1000", className: "text-amber-500" },
  { text: ");\n  ", className: "" },
  { text: "println!", className: "text-blue-400" },
  { text: "(", className: "" },
  { text: "\"Muscle memory unlocked: {} lines.\"", className: "text-emerald-400" },
  { text: ", lines_written);\n", className: "" },
  { text: "}", className: "" }
];

export default function LandingPage() {
  const { data: session } = useSession();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isLoadingCheckout, setIsLoadingCheckout] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const handleLandingCheckout = async () => {
    if (!session?.user) {
      window.location.href = `/auth/signin?callbackUrl=${encodeURIComponent("/learn")}`;
      return;
    }
    setIsLoadingCheckout(true);
    setCheckoutError(null);
    try {
      const res = await fetch("/api/checkout/dodo", { method: "POST" });
      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error || "Failed to start checkout");
      }
      window.location.href = data.url;
    } catch (e: unknown) {
      setCheckoutError(e instanceof Error ? e.message : "Checkout failed");
      setIsLoadingCheckout(false);
    }
  };

  // Mock Workspace Interactive Preview States
  const [mockRunning, setMockRunning] = useState(false);
  const [mockFinished, setMockFinished] = useState(false);
  const [mockActiveTab, setMockActiveTab] = useState<"main.rs" | "Cargo.toml">("main.rs");
  const [typedLength, setTypedLength] = useState(0);

  const totalLength = CODE_SEGMENTS.reduce((sum, seg) => sum + seg.text.length, 0);

  useEffect(() => {
    if (mockActiveTab === "main.rs") {
      setTypedLength(0);
      const startTimeout = setTimeout(() => {
        const interval = setInterval(() => {
          setTypedLength((prev) => {
            if (prev >= totalLength) {
              clearInterval(interval);
              return totalLength;
            }
            return prev + 1;
          });
        }, 15);
        return () => clearInterval(interval);
      }, 500);

      return () => clearTimeout(startTimeout);
    }
  }, [mockActiveTab, totalLength]);

  const triggerMockRun = () => {
    if (mockRunning) return;
    setTypedLength(totalLength); // instantly complete typing
    setMockRunning(true);
    setMockFinished(false);
    setTimeout(() => {
      setMockRunning(false);
      setMockFinished(true);
    }, 1500);
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const renderTypedCode = () => {
    let currentLen = 0;
    const elements: React.ReactNode[] = [];

    for (let i = 0; i < CODE_SEGMENTS.length; i++) {
      const seg = CODE_SEGMENTS[i];
      const segLen = seg.text.length;

      if (currentLen >= typedLength) {
        break;
      }

      if (currentLen + segLen >= typedLength) {
        const visibleText = seg.text.slice(0, typedLength - currentLen);
        elements.push(
          <span key={i} className={seg.className}>
            {visibleText}
          </span>
        );
        break;
      }

      elements.push(
        <span key={i} className={seg.className}>
          {seg.text}
        </span>
      );
      currentLen += segLen;
    }

    if (typedLength < totalLength) {
      elements.push(
        <span key="cursor" className="inline-block w-1.5 h-4 bg-accent animate-pulse ml-0.5 align-middle" />
      );
    }

    return elements;
  };

  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground font-sans">
      {/* Header */}
      <header className="flex h-16 flex-shrink-0 items-center justify-between px-6 sm:px-10 border-b border-border/30">
        <div className="flex items-center gap-2.5">
          <span className="flex h-7.5 w-7.5 items-center justify-center rounded-lg bg-surface border border-border text-accent">
            <LogoIcon className="w-5.5 h-5.5" />
          </span>
          <span className="font-sans text-[17px] font-bold tracking-tight">learn-to-code</span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            className="rounded-full bg-foreground px-4 py-2 text-[14px] font-medium text-background transition hover:bg-foreground/90"
            href="/learn"
          >
            {session ? "go to workspace" : "start coding"}
          </Link>
          {session && (
            <div className="relative border-l border-border/30 pl-4">
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
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="mx-auto w-full max-w-4xl px-6 pt-16 pb-12 text-center sm:pt-24">
        <h1 className="font-sans text-4xl font-semibold tracking-tight sm:text-6xl text-foreground">
          write your first 1,000 lines of Rust
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-[16px] leading-relaxed text-muted">
          Build coding muscle memory and make Rust syntax second nature. Learn through <Link href="/blog/learn-rust-online-interactive" className="text-accent hover:text-accent/80">interactive practice</Link> with real browser compilation.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            className="rounded-full bg-foreground px-6 py-3 text-[15px] font-medium text-background transition hover:bg-foreground/90 active:scale-[0.98]"
            href="/learn"
          >
            start coding →
          </Link>
          <Link
            href="/blog"
            className="rounded-full px-5 py-3 text-[15px] font-medium text-muted transition hover:bg-surface hover:text-foreground"
          >
            learning guides
          </Link>
        </div>
      </section>

      {/* --- High-Fidelity Workspace Mockup (Interactive) --- */}
      <section className="mx-auto w-full max-w-7xl px-6 pb-12">
        <div className="border border-border bg-surface/20 rounded-2xl overflow-hidden shadow-2xl relative w-full backdrop-blur-sm">
          {/* Top Address & Control Bar */}
          <div className="h-11 bg-surface/60 border-b border-border flex items-center px-4 justify-between">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#ef4444]/60" />
              <span className="w-3 h-3 rounded-full bg-[#eab308]/60" />
              <span className="w-3 h-3 rounded-full bg-[#22c55e]/60" />
            </div>
            <div className="bg-background/80 border border-border/80 px-4 py-1 rounded-md text-[10px] text-muted-foreground w-64 text-center select-none font-mono flex items-center justify-center gap-1.5">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" className="text-muted-foreground/70 shrink-0">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                <path d="M12 3c-2.5 3-4 5.7-4 9s1.5 6 4 9M12 3c2.5 3 4 5.7 4 9s-1.5 6-4 9M3 12h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              learntocode.notcodesid.com/learn
            </div>
            <div className="w-14" /> {/* spacer */}
          </div>

          {/* Browser Workspace Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 min-h-[700px] text-left text-xs bg-background/40">
            {/* Sidebar Column (Mock Challenges) - 3/12 cols */}
            <div className="md:col-span-3 border-r border-border bg-surface/10 p-4 flex flex-col justify-between overflow-y-auto max-h-[700px]">
              <div>
                <h3 className="font-bold text-foreground/85 tracking-wide uppercase text-[10px] mb-3 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-accent" />
                  Syllabus Tracks
                </h3>

                {/* Module 1: Foundations */}
                <div className="mb-3">
                  <div className="text-[9px] font-bold uppercase tracking-widest text-muted/50 mb-1.5 px-1 flex items-center justify-between">
                    <span>Module 1 — Foundations</span>
                    <span className="text-accent/70 tabular-nums">4/6</span>
                  </div>
                  <div className="space-y-0.5">
                    {[
                      { id: 1, label: "01. Hello, Rust!", status: "completed" },
                      { id: 2, label: "02. Variables & Mutability", status: "completed" },
                      { id: 3, label: "03. Data Types", status: "completed" },
                      { id: 4, label: "04. Functions", status: "completed" },
                      { id: 5, label: "05. Control Flow (if/else)", status: "active" },
                      { id: 6, label: "06. Loops", status: "locked" }
                    ].map((item) => (
                      <div
                        key={item.id}
                        className={`flex items-center justify-between p-2 rounded-lg transition select-none text-[11px] ${
                          item.status === "active"
                            ? "bg-accent/10 border border-accent/20 text-accent font-semibold"
                            : item.status === "completed"
                            ? "text-muted/80"
                            : "text-muted/50"
                        }`}
                      >
                        <span className="truncate">{item.label}</span>
                        {item.status === "completed" && <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />}
                        {item.status === "active" && <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping shrink-0" />}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Module 2: Ownership & Memory */}
                <div className="mb-3">
                  <div className="text-[9px] font-bold uppercase tracking-widest text-muted/50 mb-1.5 px-1 flex items-center justify-between">
                    <span>Module 2 — Ownership & Memory</span>
                    <span className="text-muted/40 tabular-nums">0/4</span>
                  </div>
                  <div className="space-y-0.5">
                    {[
                      { id: 7, label: "07. Ownership Basics", status: "locked" },
                      { id: 8, label: "08. References & Borrowing", status: "locked" },
                      { id: 9, label: "09. Slices", status: "locked" },
                      { id: 10, label: "10. Move vs Copy", status: "locked" }
                    ].map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-2 rounded-lg transition select-none text-[11px] text-muted/50"
                      >
                        <span className="truncate">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Module 3: Structs, Enums & Patterns */}
                <div className="mb-3">
                  <div className="text-[9px] font-bold uppercase tracking-widest text-muted/50 mb-1.5 px-1 flex items-center justify-between">
                    <span>Module 3 — Structs & Enums</span>
                    <span className="text-muted/40 tabular-nums">0/4</span>
                  </div>
                  <div className="space-y-0.5">
                    {[
                      { id: 11, label: "11. Defining Structs", status: "locked" },
                      { id: 12, label: "12. Struct Methods", status: "locked" },
                      { id: 13, label: "13. Enums & Variants", status: "locked" },
                      { id: 14, label: "14. Pattern Matching", status: "locked" }
                    ].map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-2 rounded-lg transition select-none text-[11px] text-muted/50"
                      >
                        <span className="truncate">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Module 4: Error Handling & Collections */}
                <div className="mb-3">
                  <div className="text-[9px] font-bold uppercase tracking-widest text-muted/50 mb-1.5 px-1 flex items-center justify-between">
                    <span>Module 4 — Error Handling</span>
                    <span className="text-muted/40 tabular-nums">0/3</span>
                  </div>
                  <div className="space-y-0.5">
                    {[
                      { id: 15, label: "15. Option<T>", status: "locked" },
                      { id: 16, label: "16. Result<T, E>", status: "locked" },
                      { id: 17, label: "17. The ? Operator", status: "locked" }
                    ].map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-2 rounded-lg transition select-none text-[11px] text-muted/50"
                      >
                        <span className="truncate">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Module 5: Traits & Generics */}
                <div className="mb-3">
                  <div className="text-[9px] font-bold uppercase tracking-widest text-muted/50 mb-1.5 px-1 flex items-center justify-between">
                    <span>Module 5 — Traits & Generics</span>
                    <span className="text-muted/40 tabular-nums">0/4</span>
                  </div>
                  <div className="space-y-0.5">
                    {[
                      { id: 18, label: "18. Defining Traits", status: "locked" },
                      { id: 19, label: "19. Generic Functions", status: "locked" },
                      { id: 20, label: "20. Lifetimes", status: "locked" },
                      { id: 21, label: "21. Closures & Iterators", status: "locked" }
                    ].map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-2 rounded-lg transition select-none text-[11px] text-muted/50"
                      >
                        <span className="truncate">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Overall progress */}
              <div className="p-2.5 border border-border/60 bg-surface/30 rounded-xl mt-4 shrink-0">
                <div className="flex items-center justify-between text-[10px] text-muted-foreground font-semibold mb-1">
                  <span>OVERALL PROGRESS</span>
                  <span>4/21 Challenges</span>
                </div>
                <div className="w-full bg-border h-1.5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-accent to-amber-400 rounded-full" style={{ width: '19%' }} />
                </div>
              </div>
            </div>

            {/* Code Editor Column - 9/12 cols */}
            <div className="md:col-span-9 flex flex-col justify-between">
              {/* Tab Selector */}
              <div>
                <div className="flex bg-surface/20 border-b border-border">
                  <button
                    onClick={() => setMockActiveTab("main.rs")}
                    className={`px-4 py-2 border-r border-border font-mono text-[11px] transition ${
                      mockActiveTab === "main.rs"
                        ? "bg-background text-foreground font-bold border-t-2 border-t-accent"
                        : "text-muted hover:bg-surface/30"
                    }`}
                  >
                    main.rs
                  </button>
                  <button
                    onClick={() => setMockActiveTab("Cargo.toml")}
                    className={`px-4 py-2 border-r border-border font-mono text-[11px] transition ${
                      mockActiveTab === "Cargo.toml"
                        ? "bg-background text-foreground font-bold border-t-2 border-t-accent"
                        : "text-muted hover:bg-surface/30"
                    }`}
                  >
                    Cargo.toml
                  </button>
                </div>

                {/* Editor Space */}
                <div className="p-4 font-mono text-[11.5px] text-muted-foreground leading-relaxed overflow-x-auto min-h-[450px]">
                  {mockActiveTab === "main.rs" ? (
                    <pre className="text-foreground/90 whitespace-pre">
                      <code>{renderTypedCode()}</code>
                    </pre>
                  ) : (
                    <pre className="text-foreground/80">
                      <code>
                        [package]{"\n"}
                        name = <span className="text-emerald-400">"learn-rust"</span>{"\n"}
                        version = <span className="text-emerald-400">"0.1.0"</span>{"\n"}
                        edition = <span className="text-emerald-400">"2021"</span>
                      </code>
                    </pre>
                  )}
                </div>
              </div>

              {/* Console/Run Panel */}
              <div className="border-t border-border bg-black/30 flex flex-col justify-between">
                <div className="h-9.5 px-4 flex items-center justify-between border-b border-border bg-surface/10">
                  <div className="flex items-center gap-1.5 text-muted-foreground font-semibold text-[10px]">
                    <Terminal className="w-3.5 h-3.5 text-accent" />
                    TERMINAL CONSOLE
                  </div>
                  <button
                    onClick={triggerMockRun}
                    className="flex items-center gap-1.5 rounded-full bg-accent px-4.5 py-1 text-[10.5px] font-bold text-white transition hover:bg-accent-hover active:scale-95 shadow-sm shadow-accent/25 cursor-pointer"
                  >
                    <Play className="w-2.5 h-2.5 fill-current" />
                    <span>{mockRunning ? "Compiling..." : "Run Code"}</span>
                  </button>
                </div>
                <div className="p-4 font-mono text-[10.5px] min-h-[180px] text-muted-foreground bg-black/15 select-none">
                  {mockRunning && (
                    <div className="space-y-1 text-accent animate-pulse">
                      <div>$ cargo test</div>
                      <div>   Compiling learn-rust v0.1.0 (/sandbox)</div>
                      <div>    Finished test [unoptimized + debuginfo] target(s) in 0.98s</div>
                      <div>     Running unittests src/main.rs</div>
                    </div>
                  )}
                  {mockFinished && !mockRunning && (
                    <div className="space-y-1 text-emerald-400">
                      <div className="text-muted/65">$ cargo test</div>
                      <div>Hello, Rust learner!</div>
                      <div>Muscle memory unlocked: 1000 lines.</div>
                      <div className="text-emerald-500 font-semibold mt-2 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        tests passed successfully! 1 completed; 0 failed.
                      </div>
                    </div>
                  )}
                  {!mockRunning && !mockFinished && (
                    <span className="text-muted/60 leading-relaxed italic">
                      // Click the orange "Run Code" button on the right to compile and test this code live.
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="mx-auto w-full max-w-5xl px-6 py-20 border-t border-border/30 scroll-mt-6">
        <h2 className="text-center font-sans text-2xl font-semibold tracking-tight sm:text-3xl text-foreground">
          learn by active repetition
        </h2>
        <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-[15px] font-semibold text-foreground">interactive editor</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-muted">
              write code in a fully configured web Monaco editor inside your browser.
            </p>
          </div>
          <div>
            <h3 className="text-[15px] font-semibold text-foreground">instant compiler</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-muted">
              compile Rust files directly in the browser sandbox with real-time test feedback.
            </p>
          </div>
          <div>
            <h3 className="text-[15px] font-semibold text-foreground">guided curriculum</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-muted">
              follow curated modules going step-by-step from variables to advanced lifetimes.
            </p>
          </div>
          <div>
            <h3 className="text-[15px] font-semibold text-foreground">syntax nuance</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-muted">
              move past looking up basic syntax by practicing enough reps to make patterns second nature.
            </p>
          </div>
        </div>
      </section>

      {/* Highlight Banner Section */}
      <section className="mt-6 border-y border-border bg-surface/20">
        <div className="mx-auto w-full max-w-2xl px-6 py-16 text-center">
          <h2 className="font-sans text-2xl font-semibold tracking-tight sm:text-3xl text-foreground">
            compiled, not simulated
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-muted">
            most online guides show static text or simulate compiler responses. learn-to-code integrates a real web compilation pipeline that validates your code directly in the sandbox, explaining compiler failures as they happen. one workspace, three parts:
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <span className="rounded-full border border-border bg-background px-4 py-1.5 text-[13px] text-foreground/80">
              monaco editor
            </span>
            <span className="rounded-full border border-border bg-background px-4 py-1.5 text-[13px] text-foreground/80">
              browser sandbox
            </span>
            <span className="rounded-full border border-border bg-background px-4 py-1.5 text-[13px] text-foreground/80">
              compiler checks
            </span>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how" className="mx-auto w-full max-w-5xl px-6 py-20 scroll-mt-6">
        <h2 className="text-center font-sans text-2xl font-semibold tracking-tight sm:text-3xl text-foreground">
          how it works
        </h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          <div className="text-center sm:text-left">
            <div className="mx-auto mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-[13px] font-semibold text-white sm:mx-0">
              1
            </div>
            <h3 className="text-[15px] font-semibold text-foreground">read the challenge</h3>
            <p className="mt-1.5 text-[14px] leading-relaxed text-muted">
              review the requirements and constraints of the active module. no local environments needed.
            </p>
          </div>
          <div className="text-center sm:text-left">
            <div className="mx-auto mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-[13px] font-semibold text-white sm:mx-0">
              2
            </div>
            <h3 className="text-[15px] font-semibold text-foreground">write and compile</h3>
            <p className="mt-1.5 text-[14px] leading-relaxed text-muted">
              write your implementation inside the Monaco editor and execute the compile pipeline.
            </p>
          </div>
          <div className="text-center sm:text-left">
            <div className="mx-auto mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-[13px] font-semibold text-white sm:mx-0">
              3
            </div>
            <h3 className="text-[15px] font-semibold text-foreground">pass unit tests</h3>
            <p className="mt-1.5 text-[14px] leading-relaxed text-muted">
              the browser sandbox verifies your safety constraints and unlocks the next level.
            </p>
          </div>
        </div>
      </section>

      <section id="pricing" className="mx-auto w-full max-w-5xl px-6 py-20 border-t border-border/30 scroll-mt-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-sans text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
            simple, transparent pricing
          </h2>
          <p className="mt-4 text-[16px] text-muted leading-relaxed">
            Pay once to unlock every Pro challenge. The first 35 stay free — no subscription, no hidden fees.
          </p>
        </div>
        <div className="flex justify-center items-center">
          <PricingCard
            onCheckout={handleLandingCheckout}
            isLoading={isLoadingCheckout}
            error={checkoutError}
          />
        </div>
      </section>

      {/* Accordion FAQ Section */}
      <section id="faq" className="mx-auto w-full max-w-3xl px-6 py-20 border-t border-border/30 scroll-mt-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="font-sans text-2xl font-semibold tracking-tight sm:text-3xl text-foreground">
            frequently asked questions
          </h2>
        </div>

        <div className="space-y-3.5">
          {[
            {
              q: "What is learn-to-code?",
              a: "learn-to-code is a browser-native Learning Management System (LMS) that offers interactive coding exercises, compilers, and test suites to help developers learn programming languages by writing code."
            },
            {
              q: "Do I need to install Rust locally to start?",
              a: "No! All exercises compile and run directly in our remote browser sandbox, allowing you to learn from any device with zero environment configuration."
            },
            {
              q: "How does learn-to-code help me learn?",
              a: "We believe true proficiency comes from active coding and repetition. Instead of just reading text tutorials or watching videos, our structured tracks force you to write implementations and pass unit test constraints."
            },
            {
              q: "How do I access my modules?",
              a: "Once you sign up, you'll find the full curriculum dashboard inside your workspace. Just choose a module and start writing code."
            },
            {
              q: "Are completion certificates provided?",
              a: "Yes! Completing all structured challenges in a curriculum module generates a shareable completion badge to display on your developer resume."
            },
            {
              q: "Can I cancel my account settings or data?",
              a: "Yes, you have full control over your profile and progress logs, which can be updated or deleted at any time from your settings panel."
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="border border-border/40 rounded-xl bg-surface/5 overflow-hidden transition-all duration-200"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full text-left px-5 py-4 font-semibold text-[14.5px] hover:bg-surface/20 flex justify-between items-center transition duration-200 text-foreground/90"
              >
                <span>{item.q}</span>
                <span className="text-accent shrink-0 ml-4">
                  {activeFaq === idx ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </span>
              </button>
              {activeFaq === idx && (
                <div className="px-5 pb-4.5 pt-1 text-[13.5px] text-muted leading-relaxed border-t border-border/30 bg-black/10">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Ready Section */}
      <section className="mx-auto w-full max-w-2xl px-6 pb-24 text-center">
        <h2 className="font-sans text-2xl font-semibold tracking-tight sm:text-3xl text-foreground">
          ready to write your first line of Rust?
        </h2>
        <Link
          className="mt-6 inline-block rounded-full bg-foreground px-6 py-3 text-[15px] font-medium text-background transition hover:bg-foreground/90 active:scale-[0.98]"
          href="/learn"
        >
          start coding →
        </Link>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-border/30 bg-surface/10">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-6 text-[13px] text-muted">
          <span>learn-to-code — write your first 1,000 lines of Rust</span>
          <div className="flex items-center gap-4">
            <span>built with Rust & Next.js</span>
          </div>
        </div>
      </footer>
    </main>
  );
}

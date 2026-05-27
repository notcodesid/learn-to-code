"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import {
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  Star,
  Layers,
  Globe,
  Users,
  BookOpen,
  Award,
  Play,
  Terminal,
  MessageSquare,
  Sparkle,
  Code2,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
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

// Double Arrow Icon inside the pill button CTA matching the reference mockup
const DoubleArrowIcon = () => (
  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-white shrink-0 shadow-sm shadow-accent/20 animate-pulse">
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-3.5 h-3.5"
    >
      <polyline points="13 17 18 12 13 7" />
      <polyline points="6 17 11 12 6 7" />
    </svg>
  </span>
);

export default function LandingPage() {
  const { data: session } = useSession();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">("monthly");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Mock Workspace Interactive Preview States
  const [mockRunning, setMockRunning] = useState(false);
  const [mockFinished, setMockFinished] = useState(false);
  const [mockActiveTab, setMockActiveTab] = useState<"main.rs" | "Cargo.toml">("main.rs");

  const triggerMockRun = () => {
    if (mockRunning) return;
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

  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground overflow-x-hidden font-sans relative selection:bg-accent/30 selection:text-white">
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-[800px] right-1/4 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-[400px] left-10 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Top Banner / Announcement */}
      <div className="bg-accent/10 border-b border-accent/20 py-2.5 text-center text-[11px] sm:text-xs font-semibold text-accent tracking-wide relative z-50 px-4">
        ⚡ Welcome to the Beta launch: All premium interactive challenges & AI mentoring are currently free!
      </div>

      {/* Floating Centered Capsule Header Container */}
      <div className="w-full sticky top-0 z-50 px-4 pt-4 pb-2 md:pt-6">
        <header className="mx-auto max-w-5xl bg-surface/50 border border-border/80 backdrop-blur-xl rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between shadow-lg shadow-black/30">
          {/* Logo & Name */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition">
            <span className="text-accent flex items-center shrink-0">
              <LogoIcon className="w-7 h-7 sm:w-8 sm:h-8" />
            </span>
            <span className="font-extrabold text-[15px] sm:text-[17px] tracking-tight text-foreground font-sans">
              learn-to-code
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-[13px] font-semibold text-muted">
            <a href="#features" className="hover:text-foreground hover:scale-105 transition duration-200">
              Features
            </a>
            <a href="#steps" className="hover:text-foreground hover:scale-105 transition duration-200">
              How it Works
            </a>
            <a href="#benefits" className="hover:text-foreground hover:scale-105 transition duration-200">
              Benefits
            </a>
            <a href="#pricing" className="hover:text-foreground hover:scale-105 transition duration-200">
              Pricing
            </a>
            <a href="#faq" className="hover:text-foreground hover:scale-105 transition duration-200">
              FAQ
            </a>
          </nav>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-3">
            {session ? (
              <div className="flex items-center gap-3">
                {session.user?.image && (
                  <img
                    src={session.user.image}
                    alt="Profile"
                    className="w-7 h-7 rounded-full border border-border hidden sm:block"
                  />
                )}
                <Link
                  href="/learn"
                  className="flex items-center gap-2 rounded-full border border-border bg-surface/80 hover:bg-surface-hover pl-2.5 pr-4 py-1.5 transition text-xs font-bold text-foreground btn-glow"
                >
                  <DoubleArrowIcon />
                  <span>Go to Workspace</span>
                </Link>
                <button
                  onClick={() => signOut()}
                  className="text-xs font-semibold text-muted hover:text-foreground transition duration-200 px-1 hidden sm:block"
                >
                  Log out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/auth/signin"
                  className="text-xs font-semibold text-muted hover:text-foreground transition duration-200 px-2"
                >
                  Sign In
                </Link>
                <Link
                  href="/learn"
                  className="flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 hover:bg-accent/25 pl-2 pr-4.5 py-1.5 transition text-xs font-bold text-accent btn-glow"
                >
                  <DoubleArrowIcon />
                  <span>Open App</span>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full text-muted hover:text-foreground hover:bg-surface transition"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </header>

        {/* Mobile Dropdown Panel */}
        {mobileMenuOpen && (
          <div className="md:hidden mx-auto max-w-5xl mt-2 bg-surface border border-border backdrop-blur-xl rounded-3xl p-6 shadow-2xl animate-scale-in">
            <nav className="flex flex-col gap-4 text-sm font-semibold text-muted mb-4">
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-foreground py-2 border-b border-border/30"
              >
                Features
              </a>
              <a
                href="#steps"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-foreground py-2 border-b border-border/30"
              >
                How it Works
              </a>
              <a
                href="#benefits"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-foreground py-2 border-b border-border/30"
              >
                Benefits
              </a>
              <a
                href="#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-foreground py-2 border-b border-border/30"
              >
                Pricing
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-foreground py-2"
              >
                FAQ
              </a>
            </nav>
            {session && (
              <button
                onClick={() => {
                  signOut();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-center py-2.5 rounded-xl border border-border text-xs font-bold text-muted hover:text-foreground transition"
              >
                Log out
              </button>
            )}
          </div>
        )}
      </div>

      {/* Hero Section */}
      <section className="mx-auto w-full max-w-5xl px-6 pt-16 pb-12 text-center sm:pt-24 sm:pb-20 animate-fade-in-up">
        {/* LMS Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/30 text-[11px] font-bold text-accent mb-6 animate-pulse shadow-sm shadow-accent/5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          Trusted by over 50,000+ students
        </div>

        <h1 className="font-sans text-4xl sm:text-[68px] font-extrabold tracking-tight leading-[1.05] max-w-4xl mx-auto text-foreground">
          Your Ultimate LMS for <br />
          <span className="text-accent gradient-text">Seamless Learning & Growth</span>
        </h1>
        <p className="mx-auto mt-8 max-w-2xl text-[15px] sm:text-[17px] leading-relaxed text-muted font-medium">
          Transform the way you teach and learn with our AI-driven Learning Management System. Manage courses, track progress, and engage learners like never before.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4.5">
          <Link
            className="rounded-full bg-accent px-8 py-4 text-[14px] font-bold text-white transition hover:bg-accent-hover active:scale-[0.97] btn-glow shadow-md shadow-accent/30 flex items-center gap-2"
            href="/learn"
          >
            <span>Get Started for Free</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="#features"
            className="rounded-full border border-border bg-surface/30 px-7 py-4 text-[14px] font-bold text-foreground/90 transition hover:bg-surface-hover hover:text-foreground"
          >
            Learn More
          </a>
        </div>

        {/* --- High-Fidelity Workspace Mockup (Interactive) --- */}
        <div className="mt-16 sm:mt-24 border border-border bg-surface/20 rounded-2xl overflow-hidden shadow-2xl relative max-w-5xl mx-auto backdrop-blur-sm">
          {/* Top Address & Control Bar */}
          <div className="h-11 bg-surface/60 border-b border-border flex items-center px-4 justify-between">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#ef4444]/60" />
              <span className="w-3 h-3 rounded-full bg-[#eab308]/60" />
              <span className="w-3 h-3 rounded-full bg-[#22c55e]/60" />
            </div>
            <div className="bg-background/80 border border-border/80 px-4 py-1 rounded-md text-[10px] text-muted-foreground w-64 text-center select-none font-mono flex items-center justify-center gap-1.5">
              <span className="text-emerald-500">🔒</span> learn-to-code.com/learn
            </div>
            <div className="w-14" /> {/* spacer */}
          </div>

          {/* Browser Workspace Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 min-h-[460px] text-left text-xs bg-background/40">
            {/* Sidebar Column (Mock Challenges) - 3/12 cols */}
            <div className="md:col-span-3 border-r border-border bg-surface/10 p-4 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-foreground/80 tracking-wide uppercase text-[10px] mb-3 flex items-center gap-1.5">
                  <Layers className="w-3 h-3 text-accent" />
                  Course Curriculum
                </h3>
                <div className="space-y-1">
                  {[
                    { id: 1, label: "01. Hello, Rust!", status: "completed" },
                    { id: 2, label: "02. Variables & Mutability", status: "active" },
                    { id: 3, label: "03. Data Types & Layouts", status: "locked" },
                    { id: 4, label: "04. Basic Control Flow", status: "locked" },
                    { id: 5, label: "05. References & Borrowing", status: "locked" }
                  ].map((item) => (
                    <div
                      key={item.id}
                      className={`flex items-center justify-between p-2 rounded-lg transition select-none ${
                        item.status === "active"
                          ? "bg-accent/10 border border-accent/20 text-accent font-semibold"
                          : "text-muted/80 hover:bg-surface/20"
                      }`}
                    >
                      <span className="truncate">{item.label}</span>
                      {item.status === "completed" && <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />}
                      {item.status === "active" && <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping shrink-0" />}
                      {item.status === "locked" && <span className="text-[10px] opacity-40 shrink-0">🔒</span>}
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-2 border border-border/60 bg-surface/30 rounded-xl mt-4">
                <div className="flex items-center justify-between text-[10px] text-muted-foreground font-semibold mb-1">
                  <span>MODULE PROGRESS</span>
                  <span>20% Complete</span>
                </div>
                <div className="w-full bg-border h-1.5 rounded-full overflow-hidden">
                  <div className="h-full bg-accent rounded-full w-1/5" />
                </div>
              </div>
            </div>

            {/* Code Editor Column - 5/12 cols */}
            <div className="md:col-span-5 border-r border-border flex flex-col justify-between">
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
                <div className="p-4 font-mono text-[11px] text-muted-foreground leading-relaxed overflow-x-auto min-h-[220px]">
                  {mockActiveTab === "main.rs" ? (
                    <pre className="text-foreground/90">
                      <code>
                        <span className="text-accent">fn</span> <span className="text-blue-400">main</span>() &#123;{"\n"}
                        {"  "}<span className="text-accent">let</span> language = <span className="text-emerald-400">"Rust"</span>;{"\n"}
                        {"  "}println!(<span className="text-emerald-400">"Hello, &#123;&#125; learner!"</span>, language);{"\n\n"}
                        {"  "}<span className="text-muted-foreground">// Safety guarantees</span>{"\n"}
                        {"  "}<span className="text-accent">let mut</span> data = vec![<span className="text-amber-500">1</span>, <span className="text-amber-500">2</span>, <span className="text-amber-500">3</span>];{"\n"}
                        {"  "}<span className="text-accent">let</span> reference = &data[<span className="text-amber-500">0</span>];{"\n\n"}
                        {"  "}println!(<span className="text-emerald-400">"Safe reference value: &#123;&#125;"</span>, reference);{"\n"}
                        &#125;
                      </code>
                    </pre>
                  ) : (
                    <pre className="text-foreground/80">
                      <code>
                        [package]{"\n"}
                        name = <span className="text-emerald-400">"hello-rust"</span>{"\n"}
                        version = <span className="text-emerald-400">"0.1.0"</span>{"\n"}
                        edition = <span className="text-emerald-400">"2021"</span>{"\n\n"}
                        [dependencies]{"\n"}
                        tokio = &#123; version = <span className="text-emerald-400">"1"</span>, features = [<span className="text-emerald-400">"full"</span>] &#125;
                      </code>
                    </pre>
                  )}
                </div>
              </div>

              {/* Console/Run Panel */}
              <div className="border-t border-border bg-black/30 flex flex-col justify-between">
                <div className="h-9 px-4 flex items-center justify-between border-b border-border bg-surface/10">
                  <div className="flex items-center gap-1.5 text-muted-foreground font-semibold text-[10px]">
                    <Terminal className="w-3.5 h-3.5 text-accent" />
                    TERMINAL OUTPUT
                  </div>
                  <button
                    onClick={triggerMockRun}
                    className="flex items-center gap-1 rounded bg-accent px-2.5 py-1 text-[10px] font-bold text-white transition hover:bg-accent-hover active:scale-95 shadow-sm shadow-accent/25"
                  >
                    <Play className="w-2.5 h-2.5 fill-current" />
                    <span>{mockRunning ? "Compiling..." : "Run Code"}</span>
                  </button>
                </div>
                <div className="p-3.5 font-mono text-[10px] min-h-[95px] text-muted-foreground bg-black/10 select-none">
                  {mockRunning && (
                    <div className="space-y-1 text-accent animate-pulse">
                      <div>$ cargo run</div>
                      <div>   Compiling hello-rust v0.1.0 (/sandbox)</div>
                      <div>    Finished dev [unoptimized + debuginfo] target(s) in 0.85s</div>
                      <div>     Running `target/debug/hello-rust`</div>
                    </div>
                  )}
                  {mockFinished && !mockRunning && (
                    <div className="space-y-1 text-emerald-400">
                      <div className="text-muted/65">$ cargo run</div>
                      <div>Hello, Rust learner!</div>
                      <div>Safe reference value: 1</div>
                      <div className="text-emerald-500 font-semibold mt-2 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Compilation Successful! All static checks passed.
                      </div>
                    </div>
                  )}
                  {!mockRunning && !mockFinished && (
                    <span className="text-muted/60 leading-relaxed italic">
                      // Click the "Run Code" button above to execute this Rust code snippet in our web sandbox container.
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* AI Mentor Column - 4/12 cols */}
            <div className="md:col-span-4 bg-surface/5 p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-border/80 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-6.5 w-6.5 items-center justify-center rounded-full bg-accent/10 border border-accent/20 text-accent">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span className="absolute bottom-0 right-0 h-1.5 w-1.5 rounded-full bg-emerald-500 ring-1 ring-background" />
                    </span>
                    <div>
                      <h4 className="font-bold text-foreground/90 text-[11px] leading-tight">AI Mentor</h4>
                      <p className="text-[9px] text-muted-foreground leading-none">Online & active</p>
                    </div>
                  </div>
                  <span className="text-[9px] font-bold text-accent bg-accent/10 border border-accent/20 px-1.5 py-0.5 rounded uppercase tracking-wider">
                    Context Aware
                  </span>
                </div>

                <div className="space-y-3 max-h-[280px] overflow-y-auto pr-1">
                  <div className="p-2.5 rounded-xl bg-background/50 border border-border/40 text-[11px] leading-relaxed text-muted-foreground">
                    <span className="font-semibold text-foreground/90 block mb-0.5">User</span>
                    Why is ownership important in Rust?
                  </div>
                  <div className="p-2.5 rounded-xl bg-accent/5 border border-accent/10 text-[11px] leading-relaxed text-foreground/90 relative">
                    <span className="font-bold text-accent block mb-0.5 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      AI Mentor
                    </span>
                    Ownership rules allow Rust to guarantee memory safety at compile time without any garbage collector. They eliminate issues like null pointer dereferencing, use-after-free, and data races!
                  </div>
                </div>
              </div>

              {/* Mock Chat input */}
              <div className="mt-4 pt-3 border-t border-border/80 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Ask AI mentor..."
                  disabled
                  className="flex-1 bg-background/80 border border-border rounded-lg px-3 py-1.5 text-[11px] text-muted-foreground/80 cursor-not-allowed"
                />
                <button
                  disabled
                  className="h-7 w-7 rounded-lg bg-surface hover:bg-surface-hover border border-border flex items-center justify-center text-muted cursor-not-allowed shrink-0"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid Features Section (Smart Learning Features) */}
      <section
        id="features"
        className="mx-auto w-full max-w-5xl px-6 py-20 border-t border-border/40 scroll-mt-20"
      >
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-[10px] font-bold tracking-widest text-accent uppercase bg-accent/10 border border-accent/20 px-3 py-1 rounded-full">
            SMART LMS SYSTEM
          </span>
          <h2 className="mt-4 font-sans text-3xl sm:text-[44px] font-extrabold tracking-tight text-foreground">
            Smart, Simple & Powerful Learning
          </h2>
          <p className="mt-4 text-muted max-w-xl mx-auto text-[14px] sm:text-[15px] leading-relaxed">
            Eduvex simplifies learning and teaching with AI tools and interactive features, offering an exceptional LMS experience for students and educators.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="p-6.5 rounded-2xl bg-surface/20 border border-border/80 hover:border-accent/30 transition-all duration-300 group hover:-translate-y-1 shadow-md shadow-black/10">
            <div className="w-11 h-11 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-5 group-hover:scale-110 transition duration-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-[16px] font-bold text-foreground">AI-Powered Learning</h3>
            <p className="mt-2.5 text-[13px] leading-relaxed text-muted font-medium">
              Get personalized course recommendations and automated progress tracking tailored specifically to your speed and level of understanding.
            </p>
          </div>

          <div className="p-6.5 rounded-2xl bg-surface/20 border border-border/80 hover:border-accent/30 transition-all duration-300 group hover:-translate-y-1 shadow-md shadow-black/10">
            <div className="w-11 h-11 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-5 group-hover:scale-110 transition duration-300">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-[16px] font-bold text-foreground">Smart Progress Tracking</h3>
            <p className="mt-2.5 text-[13px] leading-relaxed text-muted font-medium">
              Monitor student performance with in-depth analytics and reports, ensuring you stay on track and close coding knowledge gaps quickly.
            </p>
          </div>

          <div className="p-6.5 rounded-2xl bg-surface/20 border border-border/80 hover:border-accent/30 transition-all duration-300 group hover:-translate-y-1 shadow-md shadow-black/10 sm:col-span-2 lg:col-span-1">
            <div className="w-11 h-11 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-5 group-hover:scale-110 transition duration-300">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-[16px] font-bold text-foreground">Gamification & Rewards</h3>
            <p className="mt-2.5 text-[13px] leading-relaxed text-muted font-medium">
              Excite users with badges, leaderboards, and achievements! Make coding a rewarding experience that sparks healthy competition.
            </p>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section
        id="steps"
        className="mx-auto w-full max-w-5xl px-6 py-20 border-t border-border/40 scroll-mt-20"
      >
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-[10px] font-bold tracking-widest text-accent uppercase bg-accent/10 border border-accent/20 px-3 py-1 rounded-full">
            ROADMAP
          </span>
          <h2 className="mt-4 font-sans text-3xl sm:text-[44px] font-extrabold tracking-tight text-foreground">
            Start Learning in 3 Simple Steps
          </h2>
          <p className="mt-4 text-muted max-w-lg mx-auto text-[14px]">
            Follow our structured workflow to go from setup to code execution and certified expert.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3 relative">
          {[
            {
              step: "01",
              title: "Register Account",
              desc: "Hey, why not create a free account with your email address? It's super easy and takes just a few moments!"
            },
            {
              step: "02",
              title: "Choose a Course",
              desc: "Take a moment to browse through our extensive catalog and enroll in a course that truly interests you!"
            },
            {
              step: "03",
              title: "Start Learning",
              desc: "Explore our easy lessons, try out fun quizzes to see what you know, and earn cool certificates to show off your success!"
            }
          ].map((item, idx) => (
            <div key={idx} className="p-8 rounded-2xl bg-surface/10 border border-border/60 relative hover:border-accent/25 transition duration-300 group shadow-lg">
              <span className="absolute top-4 right-6 text-6xl font-extrabold text-accent/5 group-hover:text-accent/10 transition duration-300 select-none font-mono">
                {item.step}
              </span>
              <div className="w-9 h-9 rounded-full bg-accent text-white flex items-center justify-center font-bold text-xs shadow-sm shadow-accent/15 mb-6">
                {idx + 1}
              </div>
              <h3 className="text-[16px] font-extrabold text-foreground">{item.title}</h3>
              <p className="mt-3.5 text-[13px] leading-relaxed text-muted font-medium">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits & Stats Section */}
      <section
        id="benefits"
        className="mx-auto w-full max-w-5xl px-6 py-20 border-t border-border/40 bg-surface/5 rounded-3xl scroll-mt-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[10px] font-bold tracking-widest text-accent uppercase bg-accent/10 border border-accent/20 px-3 py-1 rounded-full">
              BENEFITS
            </span>
            <h2 className="font-sans text-3xl sm:text-[42px] font-extrabold tracking-tight leading-tight text-foreground">
              Benefits of Eduvex – Why Students Love It!
            </h2>
            <p className="text-[14px] leading-relaxed text-muted font-medium">
              At Eduvex, we believe education should be accessible and engaging. Our AI-powered Learning Management System (LMS) makes learning smarter and tailored to each student’s needs, helping everyone succeed.
            </p>

            {/* Statistics Counters */}
            <div className="grid grid-cols-2 gap-4.5 pt-4">
              {[
                { count: "50k+", label: "Students Enrolled" },
                { count: "100+", label: "Courses Available" },
                { count: "95%", label: "Satisfaction Rate" },
                { count: "24/7", label: "Access Anytime" }
              ].map((stat, i) => (
                <div key={i} className="border border-border/60 bg-surface/30 p-4 rounded-xl shadow-sm">
                  <div className="text-2xl font-extrabold text-accent">{stat.count}</div>
                  <div className="text-[10px] font-bold text-muted uppercase tracking-wider mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            {[
              {
                title: "Earn Certificates & Boost Your Career",
                desc: "Get certified upon completion and showcase your verified credentials to employers to jumpstart your career."
              },
              {
                title: "Unlimited Access to Quality Courses",
                desc: "Check out awesome courses from experts whenever you want, wherever you are—entirely self-paced."
              },
              {
                title: "Interactive Courses",
                desc: "Fun code challenges, cool quizzes, and assignments that test compiler diagnostics to keep you on your toes."
              },
              {
                title: "Community & Peer Learning",
                desc: "Join community channels, interact with peers, share code reviews, and enhance your overall learning speed."
              },
              {
                title: "Personalized Learning Experience",
                desc: "Eduvex offers tailored code suggestions and pathways based on your historical learning inputs and progress!"
              }
            ].map((benefit, i) => (
              <div key={i} className="flex gap-4 p-4.5 rounded-xl border border-border/40 bg-surface/10 hover:bg-surface/20 transition duration-200">
                <span className="h-6.5 w-6.5 shrink-0 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent text-xs">
                  ✓
                </span>
                <div>
                  <h4 className="font-extrabold text-[14px] text-foreground">{benefit.title}</h4>
                  <p className="mt-1 text-[12.5px] leading-relaxed text-muted">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations Cloud */}
      <section className="mx-auto w-full max-w-5xl px-6 py-20 border-t border-border/40 text-center">
        <span className="text-[10px] font-bold tracking-widest text-accent uppercase bg-accent/10 border border-accent/20 px-3 py-1 rounded-full">
          INTEGRATIONS
        </span>
        <h2 className="mt-4 font-sans text-3xl sm:text-[40px] font-extrabold tracking-tight text-foreground">
          Powerful Integrations for Seamless Learning
        </h2>
        <p className="mt-4 text-muted max-w-xl mx-auto text-[14px] leading-relaxed">
          Boost your learning with integrations that make studying smarter. Eduvex connects with your favorite tools for seamless collaboration.
        </p>

        {/* Integration logos mockup */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 md:gap-14 opacity-75">
          {["Zoom", "Slack", "VS Code", "GitHub", "Discord"].map((tool, index) => (
            <div
              key={index}
              className="flex items-center gap-2.5 px-6 py-3 rounded-full border border-border bg-surface/20 shadow-md hover:opacity-100 hover:border-accent/30 hover:scale-105 transition duration-300 select-none font-semibold text-foreground/80"
            >
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-[13px] tracking-tight">{tool}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="mx-auto w-full max-w-5xl px-6 py-20 border-t border-border/40 bg-surface/5 rounded-3xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] font-bold tracking-widest text-accent uppercase bg-accent/10 border border-accent/20 px-3 py-1 rounded-full">
            TESTIMONIALS
          </span>
          <h2 className="mt-4 font-sans text-3xl sm:text-[40px] font-extrabold tracking-tight text-foreground">
            Real Talk – What Users Are Saying!
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {[
            {
              quote: "Eduvex completely transformed my entire learning journey! The innovative AI-powered course suggestions, combined with the engaging interactive lessons, made studying not only fun but also incredibly effective and enjoyable. I couldn't have asked for a better educational experience!",
              author: "Kristin Watson",
              role: "Business Analyst"
            },
            {
              quote: "Integrating Zoom and Slack has made collaborating with classmates easy and efficient. I highly recommend it for better teamwork!",
              author: "Robert Fox",
              role: "Project Manager"
            },
            {
              quote: "The instructors clarify concepts exceptionally well, and the engaging projects allowed for immediate application of my learning in real-world scenarios.",
              author: "Jacob Jones",
              role: "Software Developer"
            },
            {
              quote: "As a dedicated full-time employee, I truly needed a flexible platform that could accommodate my busy schedule. Eduvex’s self-paced courses provided me with the perfect opportunity to upskill effectively without disrupting my work commitments.",
              author: "Leslie Alexander",
              role: "Marketing Specialist"
            }
          ].map((item, i) => (
            <div
              key={i}
              className="p-8 rounded-2xl border border-border/60 bg-background/60 flex flex-col justify-between hover:border-accent/20 hover:bg-surface/20 transition-all duration-300 relative group shadow-lg"
            >
              <div className="absolute top-6 right-8 text-6xl text-accent/5 group-hover:text-accent/10 font-serif pointer-events-none select-none">
                “
              </div>
              <p className="text-[13.5px] leading-relaxed text-foreground/80 italic font-medium relative z-10">
                "{item.quote}"
              </p>
              <div className="mt-8 flex items-center gap-3 border-t border-border/40 pt-4">
                <span className="h-8.5 w-8.5 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center font-bold text-accent text-xs">
                  {item.author[0]}
                </span>
                <div>
                  <h4 className="text-xs font-bold text-foreground">{item.author}</h4>
                  <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        className="mx-auto w-full max-w-5xl px-6 py-20 border-t border-border/40 scroll-mt-20"
      >
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-[10px] font-bold tracking-widest text-accent uppercase bg-accent/10 border border-accent/20 px-3 py-1 rounded-full">
            PRICING PLANS
          </span>
          <h2 className="mt-4 font-sans text-3xl sm:text-[44px] font-extrabold tracking-tight text-foreground">
            Eduvex Pricing Plans – Learn at Your Own Pace!
          </h2>
          <p className="mt-4 text-muted text-[14px]">
            Pricing plans suited for hobbyists, university classes, and professional code schools.
          </p>

          {/* Monthly / Annual Toggle Switcher */}
          <div className="mt-8 inline-flex items-center gap-3 bg-surface/50 border border-border p-1.5 rounded-full">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-4.5 py-1.5 rounded-full text-xs font-bold transition duration-200 ${
                billingCycle === "monthly"
                  ? "bg-accent text-white shadow-sm"
                  : "text-muted hover:text-foreground"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("annually")}
              className={`px-4.5 py-1.5 rounded-full text-xs font-bold transition duration-200 flex items-center gap-1.5 ${
                billingCycle === "annually"
                  ? "bg-accent text-white shadow-sm"
                  : "text-muted hover:text-foreground"
              }`}
            >
              <span>Annually</span>
              <span className="text-[9px] bg-emerald-500 text-white px-1.5 py-0.5 rounded-full font-extrabold leading-none">
                -25%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="mt-14 grid gap-8 md:grid-cols-3 max-w-4xl mx-auto items-stretch">
          {/* Free Plan */}
          <div className="flex flex-col p-8 rounded-2xl border border-border bg-background/50 hover:bg-surface/10 hover:border-accent/10 transition-all duration-300 shadow-xl relative">
            <h3 className="text-[17px] font-extrabold text-foreground">Hobby Sandbox</h3>
            <p className="mt-2 text-xs text-muted font-medium">Perfect for those who want to explore Eduvex before upgrading.</p>
            <div className="mt-6 flex items-baseline">
              <span className="text-4xl font-extrabold tracking-tight text-foreground">$0</span>
              <span className="ml-1 text-xs text-muted-foreground">/ month</span>
            </div>
            <ul className="mt-8 space-y-4 text-[12.5px] text-muted flex-1">
              <li className="flex items-center gap-2">
                <span className="text-accent font-bold shrink-0">✔</span> Access to 10+ free courses
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent font-bold shrink-0">✔</span> Basic code compilation
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent font-bold shrink-0">✔</span> Community support
              </li>
              <li className="flex items-center gap-2 text-muted/50 line-through">
                <span>✔</span> Unlimited AI mentor queries
              </li>
              <li className="flex items-center gap-2 text-muted/50 line-through">
                <span>✔</span> Course completion certificates
              </li>
            </ul>
            <Link
              href="/learn"
              className="mt-8 block w-full text-center rounded-full border border-border bg-surface/50 px-4 py-3 text-xs font-bold text-foreground hover:bg-surface hover:text-foreground transition duration-200 btn-press"
            >
              Get Free Plan
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="flex flex-col p-8 rounded-2xl border-2 border-accent bg-accent/[0.03] hover:bg-accent/[0.06] transition-all duration-300 shadow-xl relative scale-105 z-10">
            <div className="absolute top-0 right-8 -translate-y-1/2 rounded-full bg-accent px-3 py-0.5 text-[9px] font-extrabold uppercase tracking-widest text-white shadow-md shadow-accent/25">
              POPULAR
            </div>
            <h3 className="text-[17px] font-extrabold text-foreground">Developer Pro</h3>
            <p className="mt-2 text-xs text-accent font-medium">For students who want to learn with a structured approach.</p>
            <div className="mt-6 flex items-baseline">
              <span className="text-4xl font-extrabold tracking-tight text-foreground">
                ${billingCycle === "monthly" ? "19" : "14.25"}
              </span>
              <span className="ml-1 text-xs text-muted-foreground">
                / month {billingCycle === "annually" && "(billed annually)"}
              </span>
            </div>
            <ul className="mt-8 space-y-4 text-[12.5px] text-foreground/80 flex-1">
              <li className="flex items-center gap-2">
                <span className="text-accent font-bold shrink-0">✔</span> Access to all premium courses
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent font-bold shrink-0">✔</span> Offline course access
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent font-bold shrink-0">✔</span> Live Q&A sessions with instructors
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent font-bold shrink-0">✔</span> Priority email support
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent font-bold shrink-0">✔</span> AI-powered recommendations
              </li>
            </ul>
            <Link
              href="/learn"
              className="mt-8 block w-full text-center rounded-full bg-accent px-4 py-3 text-xs font-bold text-white transition hover:bg-accent-hover active:scale-[0.97] btn-glow shadow-md shadow-accent/30"
            >
              Get Pro Plan
            </Link>
          </div>

          {/* Premium Plan */}
          <div className="flex flex-col p-8 rounded-2xl border border-border bg-background/50 hover:bg-surface/10 hover:border-accent/10 transition-all duration-300 shadow-xl relative">
            <h3 className="text-[17px] font-extrabold text-foreground">Elite Premium</h3>
            <p className="mt-2 text-xs text-muted font-medium">For those who want a full learning experience with advanced features.</p>
            <div className="mt-6 flex items-baseline">
              <span className="text-4xl font-extrabold tracking-tight text-foreground">
                ${billingCycle === "monthly" ? "49" : "36.75"}
              </span>
              <span className="ml-1 text-xs text-muted-foreground">
                / month {billingCycle === "annually" && "(billed annually)"}
              </span>
            </div>
            <ul className="mt-8 space-y-4 text-[12.5px] text-muted flex-1">
              <li className="flex items-center gap-2">
                <span className="text-accent font-bold shrink-0">✔</span> Everything in Pro Plan
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent font-bold shrink-0">✔</span> Exclusive career webinars
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent font-bold shrink-0">✔</span> Job placement assistance
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent font-bold shrink-0">✔</span> Personalized study plans
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent font-bold shrink-0">✔</span> 24/7 AI-powered assistant (unlimited)
              </li>
            </ul>
            <Link
              href="/learn"
              className="mt-8 block w-full text-center rounded-full border border-border bg-surface/50 px-4 py-3 text-xs font-bold text-foreground hover:bg-surface hover:text-foreground transition duration-200 btn-press"
            >
              Get Premium Plan
            </Link>
          </div>
        </div>
      </section>

      {/* Accordion FAQ Section */}
      <section
        id="faq"
        className="mx-auto w-full max-w-3xl px-6 py-20 border-t border-border/40 scroll-mt-20"
      >
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] font-bold tracking-widest text-accent uppercase bg-accent/10 border border-accent/20 px-3 py-1 rounded-full">
            FAQ
          </span>
          <h2 className="mt-4 font-sans text-3xl sm:text-[40px] font-extrabold tracking-tight text-foreground">
            Everything You Need to Know About Eduvex
          </h2>
          <p className="mt-4 text-muted text-[14px]">
            Got questions? Visit our FAQs for detailed info on competitive pricing, diverse courses, and support!
          </p>
        </div>

        <div className="space-y-4">
          {[
            {
              q: "What is Eduvex?",
              a: "Eduvex is an AI-powered Learning Management System (LMS) that offers interactive courses, video lessons, quizzes, and certifications to help students and professionals learn anytime, anywhere."
            },
            {
              q: "Who can use Eduvex?",
              a: "Eduvex is dedicated to delivering exceptional online learning experiences that cater to students, professionals, and educational institutions alike, ensuring that everyone has access to quality education."
            },
            {
              q: "Can I cancel my subscription anytime?",
              a: "Absolutely! You can cancel anytime from your account settings. No hidden fees."
            },
            {
              q: "Do you offer refunds?",
              a: "Absolutely! You have the flexibility to cancel your subscription at any time directly from your account settings. Plus, rest assured, there are no hidden fees involved."
            },
            {
              q: "How do I access my courses?",
              a: "Once you sign up, you'll uncover a vast array of exciting courses available right on your dashboard, giving you the freedom to learn at your own pace whenever you feel inspired!"
            },
            {
              q: "Are certificates provided?",
              a: "For sure! With Eduvex, you get verified certificates for all the courses you finish in our paid plans, so you can show off your credentials!"
            },
            {
              q: "How can I contact support?",
              a: "Feel free to reach out to our super friendly support team through live chat, drop us an email at support@eduvex.com, or swing by our help center for all the info you need!"
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="border border-border/60 rounded-2xl bg-surface/5 overflow-hidden transition-all duration-200 hover:border-accent/15"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full text-left px-6 py-4.5 font-bold text-[14.5px] hover:bg-surface/20 flex justify-between items-center transition duration-200 text-foreground/90"
              >
                <span>{item.q}</span>
                <span className="text-accent shrink-0 ml-4">
                  {activeFaq === idx ? (
                    <ChevronUp className="w-4.5 h-4.5" />
                  ) : (
                    <ChevronDown className="w-4.5 h-4.5" />
                  )}
                </span>
              </button>
              {activeFaq === idx && (
                <div className="px-6 pb-5 pt-1 text-[13.5px] text-muted-foreground/95 border-t border-border/30 leading-relaxed bg-black/10">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Call To Action Bottom / Newsletter */}
      <section className="mx-auto w-full max-w-4xl px-6 py-20 text-center relative z-10">
        <div className="rounded-3xl border border-border bg-surface/30 backdrop-blur-md p-10 sm:p-16 relative overflow-hidden shadow-2xl">
          <div className="absolute -top-16 -left-16 w-48 h-48 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

          <span className="text-[10px] font-bold tracking-widest text-accent uppercase bg-accent/10 border border-accent/20 px-3 py-1 rounded-full">
            NEWSLETTER
          </span>
          <h2 className="mt-6 font-sans text-3xl sm:text-[44px] font-extrabold tracking-tight leading-tight text-foreground">
            Stay Ahead in Education with Eduvex <br />
            and Unlock Your Full Potential!
          </h2>
          <p className="mt-4 text-sm text-muted-foreground max-w-lg mx-auto font-medium">
            Want to stay updated on the latest trends in online learning? Join the Eduvex newsletter and receive expert insights, new course launches, and exclusive offers—all in one place!
          </p>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto relative z-10"
          >
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="flex-1 px-5 py-3 rounded-full bg-background border border-border text-sm text-foreground focus:outline-none focus:border-accent transition"
            />
            <button
              type="submit"
              className="rounded-full bg-accent px-6 py-3 text-xs font-bold text-white transition hover:bg-accent-hover active:scale-95 shadow-sm shadow-accent/25 btn-glow shrink-0"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-border/40 bg-surface/10 relative z-10">
        <div className="mx-auto max-w-5xl px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-[13px] text-muted mb-12">
            {/* Column 1 - Brand info */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-accent flex items-center shrink-0">
                  <LogoIcon className="w-6 h-6" />
                </span>
                <span className="font-extrabold text-[15px] tracking-tight text-foreground font-sans">
                  learn-to-code
                </span>
              </div>
              <p className="text-muted/80 leading-relaxed max-w-sm">
                Transform your teaching and learning with our AI-driven Learning Management System. Effortlessly manage courses and engage learners.
              </p>
            </div>

            {/* Column 2 - Links */}
            <div className="md:col-span-2.5 space-y-3">
              <h4 className="font-bold text-foreground text-xs uppercase tracking-wider">Useful Links</h4>
              <ul className="space-y-2 font-medium">
                <li>
                  <a href="#benefits" className="hover:text-foreground transition">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-foreground transition">
                    Pricing Plan
                  </a>
                </li>
                <li>
                  <a href="#features" className="hover:text-foreground transition">
                    Features
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3 - Quick Links */}
            <div className="md:col-span-2.5 space-y-3">
              <h4 className="font-bold text-foreground text-xs uppercase tracking-wider">Quick Links</h4>
              <ul className="space-y-2 font-medium">
                <li>
                  <a href="#faq" className="hover:text-foreground transition">
                    Terms of Use
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-foreground transition">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-foreground transition">
                    404 Page
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4 - Connect */}
            <div className="md:col-span-2 space-y-3">
              <h4 className="font-bold text-foreground text-xs uppercase tracking-wider">Let's Connect</h4>
              <ul className="space-y-2 font-medium">
                <li>
                  <a href="https://instagram.com" target="_blank" className="hover:text-foreground transition">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="https://x.com" target="_blank" className="hover:text-foreground transition">
                    x.com
                  </a>
                </li>
                <li>
                  <a href="https://linkedin.com" target="_blank" className="hover:text-foreground transition">
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border/40 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-muted/65 gap-4">
            <span>© 2026 learn-to-code. All rights reserved. Created by Design Monks.</span>
            <div className="flex items-center gap-2">
              <span>Built with Framer template aesthetics</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

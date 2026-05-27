"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useSession } from "next-auth/react";

interface PaywallModalProps {
  open: boolean;
  onClose: () => void;
  /** Challenge title that triggered the paywall (for context). */
  triggerTitle?: string;
}

type Tab = "card" | "crypto";

export function PaywallModal({ open, onClose, triggerTitle }: PaywallModalProps) {
  const { data: session, update: updateSession } = useSession();
  const [tab, setTab] = useState<Tab>("card");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Solana Pay state
  const [solanaQr, setSolanaQr] = useState<string | null>(null);
  const [solanaUrl, setSolanaUrl] = useState<string | null>(null);
  const [solanaReference, setSolanaReference] = useState<string | null>(null);
  const [solanaStatus, setSolanaStatus] = useState<
    "idle" | "waiting" | "confirmed" | "failed"
  >("idle");
  const pollTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  // Reset state when modal closes.
  useEffect(() => {
    if (!open) {
      setError(null);
      setSolanaQr(null);
      setSolanaUrl(null);
      setSolanaReference(null);
      setSolanaStatus("idle");
      if (pollTimer.current) clearInterval(pollTimer.current);
    }
  }, [open]);

  // Poll Solana verification while a reference is pending.
  useEffect(() => {
    if (!solanaReference || solanaStatus !== "waiting") return;
    pollTimer.current = setInterval(async () => {
      try {
        const res = await fetch(
          `/api/checkout/solana/verify?reference=${solanaReference}`
        );
        const data = await res.json();
        if (data.confirmed) {
          setSolanaStatus("confirmed");
          if (pollTimer.current) clearInterval(pollTimer.current);
          // Refresh session to pick up hasPaid=true.
          await updateSession();
          // Brief celebration delay, then reload.
          setTimeout(() => {
            window.location.href = "/payment/success";
          }, 1200);
        }
      } catch (e) {
        console.error("Verify poll failed:", e);
      }
    }, 3000);
    return () => {
      if (pollTimer.current) clearInterval(pollTimer.current);
    };
  }, [solanaReference, solanaStatus, updateSession]);

  const handleDodoCheckout = useCallback(async () => {
    if (!session?.user) {
      setError("Please sign in first to purchase.");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout/dodo", { method: "POST" });
      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error || "Failed to start checkout");
      }
      window.location.href = data.url;
    } catch (e: any) {
      setError(e.message || "Checkout failed");
      setIsLoading(false);
    }
  }, [session]);

  const handleSolanaCheckout = useCallback(async () => {
    if (!session?.user) {
      setError("Please sign in first to purchase.");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout/solana", { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create payment request");
      setSolanaUrl(data.url);
      setSolanaQr(data.qr);
      setSolanaReference(data.reference);
      setSolanaStatus("waiting");
    } catch (e: any) {
      setError(e.message || "Checkout failed");
    } finally {
      setIsLoading(false);
    }
  }, [session]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in-down"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-2xl border border-border bg-surface shadow-2xl overflow-hidden"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-muted hover:bg-surface-hover hover:text-foreground transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 6l12 12M6 18L18 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-border/60">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest font-bold text-accent mb-2">
            <LockIcon className="w-3.5 h-3.5" />
            Pro Unlock
          </div>
          <h2 className="text-xl font-bold text-foreground mb-1">
            Unlock all 155 Rust challenges
          </h2>
          {triggerTitle ? (
            <p className="text-sm text-muted">
              <span className="text-foreground/80">{triggerTitle}</span> is part
              of the Pro library.
            </p>
          ) : (
            <p className="text-sm text-muted">
              Continue your journey from beginner to advanced.
            </p>
          )}
        </div>

        {/* Pricing */}
        <div className="px-6 py-4 flex items-baseline gap-2 border-b border-border/60">
          <span className="text-3xl font-bold text-foreground tabular-nums">
            $1
          </span>
          <span className="text-sm text-muted">USD</span>
          <span className="text-muted">·</span>
          <span className="text-sm text-muted">one-time, lifetime</span>
        </div>

        {/* Benefits */}
        <ul className="px-6 py-4 space-y-2 text-sm border-b border-border/60">
          <Benefit>All 155 challenges (35 free + 120 Pro)</Benefit>
          <Benefit>Beginner → Advanced full curriculum</Benefit>
          <Benefit>Capstone projects & traits/lifetimes deep dive</Benefit>
          <Benefit>Lifetime access — no subscription</Benefit>
        </ul>

        {/* Tabs */}
        <div className="px-6 pt-4 flex gap-1 p-1 mx-6 my-2 bg-surface-hover rounded-lg">
          <button
            onClick={() => setTab("card")}
            className={`flex-1 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              tab === "card"
                ? "bg-accent/15 text-accent"
                : "text-muted hover:text-foreground"
            }`}
          >
            Card / UPI
          </button>
          <button
            onClick={() => setTab("crypto")}
            className={`flex-1 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              tab === "crypto"
                ? "bg-accent/15 text-accent"
                : "text-muted hover:text-foreground"
            }`}
          >
            USDC (Solana)
          </button>
        </div>

        {/* Body */}
        <div className="px-6 pb-6 pt-2 min-h-[160px]">
          {error && (
            <div className="mb-3 p-2 rounded-md bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
              {error}
            </div>
          )}

          {tab === "card" && (
            <div>
              <p className="text-xs text-muted mb-3">
                Pay with card (Visa/MC/Amex) or UPI via Dodo Payments. Powered by
                Dodo Payments — handles GST/VAT globally.
              </p>
              <button
                onClick={handleDodoCheckout}
                disabled={isLoading}
                className="w-full py-2.5 rounded-lg bg-accent hover:bg-accent-hover text-white font-semibold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Redirecting…" : "Pay $1 with Card / UPI"}
              </button>
            </div>
          )}

          {tab === "crypto" && (
            <div>
              {solanaStatus === "idle" && (
                <>
                  <p className="text-xs text-muted mb-3">
                    Pay 1 USDC on Solana. Devnet mode while we test — use a
                    devnet-funded wallet (Phantom, Backpack, Solflare).
                  </p>
                  <button
                    onClick={handleSolanaCheckout}
                    disabled={isLoading}
                    className="w-full py-2.5 rounded-lg bg-foreground/10 border border-border hover:bg-foreground/15 text-foreground font-semibold text-sm transition-colors disabled:opacity-50"
                  >
                    {isLoading ? "Generating…" : "Generate USDC Payment Request"}
                  </button>
                </>
              )}
              {solanaStatus === "waiting" && solanaQr && (
                <div className="text-center">
                  <div className="inline-block bg-white p-3 rounded-lg mb-3">
                    {/* QR is a data URL */}
                    <img
                      src={solanaQr}
                      alt="Solana Pay QR code"
                      width={180}
                      height={180}
                    />
                  </div>
                  <p className="text-xs text-muted mb-2">
                    Scan with a Solana wallet, or
                  </p>
                  {solanaUrl && (
                    <a
                      href={solanaUrl}
                      className="inline-block text-xs text-accent hover:underline mb-3"
                    >
                      Open in wallet
                    </a>
                  )}
                  <div className="flex items-center justify-center gap-2 text-xs text-muted">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    Waiting for confirmation…
                  </div>
                </div>
              )}
              {solanaStatus === "confirmed" && (
                <div className="text-center py-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-success/15 text-success mb-3">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 12l5 5L20 7"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <p className="text-sm font-semibold text-foreground">
                    Payment confirmed!
                  </p>
                  <p className="text-xs text-muted mt-1">Unlocking your account…</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Benefit({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2 text-foreground/85">
      <svg
        className="w-4 h-4 mt-0.5 shrink-0 text-success"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M5 12l5 5L20 7"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span>{children}</span>
    </li>
  );
}

function LockIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect
        x="5"
        y="11"
        width="14"
        height="9"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M8 11V7a4 4 0 1 1 8 0v4"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

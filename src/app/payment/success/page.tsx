"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const isFailed = status === "failed" || status === "cancelled";

  const { data: session, update } = useSession();
  const [pollCount, setPollCount] = useState(0);
  const hasPaid = !!session?.user?.hasPaid;

  useEffect(() => {
    if (isFailed || hasPaid || pollCount >= 10) return;
    const t = setTimeout(async () => {
      try {
        await fetch("/api/payment/sync", { method: "POST" });
      } catch {
        // Non-fatal — session refresh below may still pick up DB state.
      }
      await update();
      setPollCount((n) => n + 1);
    }, 1500);
    return () => clearTimeout(t);
  }, [isFailed, hasPaid, pollCount, update]);

  if (isFailed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-6">
        <div className="max-w-md w-full rounded-2xl border border-border bg-surface p-8 text-center shadow-2xl">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-500/15 text-rose-400 mb-5">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 6l12 12M6 18L18 6"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Payment failed
          </h1>
          <p className="text-sm text-muted mb-6">
            Something went wrong with your payment. No charges were made.
          </p>
          <Link
            href="/learn"
            className="inline-block px-5 py-2.5 rounded-lg bg-accent hover:bg-accent-hover text-white font-semibold text-sm transition-colors"
          >
            ← Back to challenges
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="max-w-md w-full rounded-2xl border border-border bg-surface p-8 text-center shadow-2xl">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success/15 text-success mb-5">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 12l5 5L20 7"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Payment successful
        </h1>
        <p className="text-sm text-muted mb-6">
          {hasPaid
            ? "All 155 challenges are unlocked. Time to write some Rust."
            : "Confirming your payment… this can take a few seconds."}
        </p>
        <Link
          href="/learn"
          className="inline-block px-5 py-2.5 rounded-lg bg-accent hover:bg-accent-hover text-white font-semibold text-sm transition-colors"
        >
          Continue learning →
        </Link>
        {!hasPaid && pollCount >= 10 && (
          <p className="mt-4 text-xs text-muted">
            Payment may still be processing. Refresh in a minute, or contact
            support if it doesn&apos;t unlock.
          </p>
        )}
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-background p-6">
        <div className="text-muted">Loading…</div>
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
}

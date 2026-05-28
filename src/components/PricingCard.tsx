"use client";

import { CheckCircle2, ShieldAlert } from "lucide-react";
import React from "react";

interface PricingCardProps {
  /** Optional title to show context (e.g. "Ownership Basics is part of the Pro library") */
  triggerTitle?: string;
  /** Checkout button click handler */
  onCheckout: () => void;
  /** Loading state of the checkout button */
  isLoading?: boolean;
  /** Error message to display */
  error?: string | null;
  /** Optional classes for wrapper */
  className?: string;
  /** When true, shows review/demo messaging instead of real payment button */
  reviewMode?: boolean;
}

export function PricingCard({
  triggerTitle,
  onCheckout,
  isLoading = false,
  error = null,
  className = "",
  reviewMode = false,
}: PricingCardProps) {
  return (
    <div
      className={`relative w-full max-w-md mx-auto rounded-3xl border border-neutral-800/80 bg-neutral-900/60 backdrop-blur-xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden group hover:border-accent/30 transition-all duration-500 ${className}`}
    >
      {/* Decorative top orange gradient spotlight glow */}
      <div className="absolute -top-32 -left-32 w-64 h-64 bg-accent/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-accent/20 transition-all duration-500" />
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/5 rounded-full blur-[80px] pointer-events-none" />

      {/* Header Badge */}
      <div className="flex justify-between items-start mb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-[10.5px] font-bold uppercase tracking-widest text-accent">
          <svg
            className="w-3.5 h-3.5 animate-pulse"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0110 21a3.745 3.745 0 01-3.296-1.593 3.746 3.746 0 01-1.043-3.296 3.745 3.745 0 01-3.296-1.043A3.746 3.746 0 013 12c0-1.268.63-2.39 1.593-3.068a3.746 3.746 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0114 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
            />
          </svg>
          Pro Lifetime Pass
        </div>
        <div className="text-[10px] text-muted font-mono tracking-wider bg-neutral-900 border border-neutral-800 px-2.5 py-1 rounded-md">
          v1.0 UNLOCKED
        </div>
      </div>

      {/* Heading */}
      <h3 className="text-2xl font-extrabold text-foreground tracking-tight mb-2">
        Unlock all 155 Rust challenges
      </h3>
      
      {triggerTitle ? (
        <p className="text-[13.5px] text-muted mb-6 leading-relaxed">
          <span className="text-foreground/90 font-semibold">{triggerTitle}</span> is part of the Pro curriculum. Upgrade to keep coding.
        </p>
      ) : (
        <p className="text-[13.5px] text-muted mb-6 leading-relaxed">
          Get complete, lifetime access to all levels. Write more code, build muscle memory, and master Rust today.
        </p>
      )}

      {/* Pricing Display */}
      <div className="flex items-center gap-3 bg-neutral-950/60 border border-neutral-900 rounded-2xl p-4.5 mb-6">
        <div className="flex items-baseline">
          <span className="text-4.5xl font-extrabold text-foreground tracking-tight bg-gradient-to-r from-white via-neutral-100 to-neutral-400 bg-clip-text text-transparent">
            $1
          </span>
          <span className="text-sm font-semibold text-muted ml-1.5 uppercase tracking-wider">
            USD
          </span>
        </div>
        <div className="w-[1px] h-8 bg-neutral-800" />
        <div className="flex flex-col justify-center">
          <span className="text-[12px] font-bold text-accent uppercase tracking-wider">
            One-Time Payment
          </span>
          <span className="text-[11.5px] text-muted">
            Lifetime access, zero subscriptions
          </span>
        </div>
      </div>

      {/* Benefits List */}
      <div className="space-y-3.5 mb-8">
        <div className="flex items-start gap-3">
          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mt-0.5 shrink-0">
            <CheckCircle2 className="w-3.5 h-3.5" />
          </span>
          <span className="text-[13.5px] text-foreground/80">
            <strong>All 155 challenges</strong> (35 free + 120 Pro)
          </span>
        </div>
        <div className="flex items-start gap-3">
          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mt-0.5 shrink-0">
            <CheckCircle2 className="w-3.5 h-3.5" />
          </span>
          <span className="text-[13.5px] text-foreground/80">
            Complete curriculum (Beginner to Advanced)
          </span>
        </div>
        <div className="flex items-start gap-3">
          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mt-0.5 shrink-0">
            <CheckCircle2 className="w-3.5 h-3.5" />
          </span>
          <span className="text-[13.5px] text-foreground/80">
            Capstone projects & traits/lifetimes deep dive
          </span>
        </div>
        <div className="flex items-start gap-3">
          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mt-0.5 shrink-0">
            <CheckCircle2 className="w-3.5 h-3.5" />
          </span>
          <span className="text-[13.5px] text-foreground/80">
            Unlimited compilation sandbox & AI helper support
          </span>
        </div>
      </div>

      {/* Error display */}
      {error && (
        <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex gap-2.5 items-start">
          <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* CTA Button */}
      {reviewMode ? (
        <button
          onClick={onCheckout}
          className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-[14px] transition-all duration-300"
        >
          Payments coming soon after review
        </button>
      ) : (
        <button
          onClick={onCheckout}
          disabled={isLoading}
          className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-[14px] transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99] hover:shadow-[0_0_24px_rgba(249,115,22,0.3)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Redirecting to checkout…
            </span>
          ) : (
            "Pay $1 with Card"
          )}
        </button>
      )}

      {/* Footer Trust badge */}
      <div className="mt-4 flex flex-col items-center justify-center gap-2">
        <p className="text-[11px] text-muted flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          Secured by Dodo Payments
        </p>
        <div className="flex items-center gap-3.5 opacity-50 text-[10.5px] font-semibold text-neutral-400 mt-1 select-none flex-wrap justify-center">
          <span className="font-black italic tracking-tighter hover:text-indigo-400 transition-colors cursor-default">VISA</span>
          <span className="hover:text-orange-400 transition-colors cursor-default">Mastercard</span>
          <span className="border border-neutral-700/60 px-1 py-0.2 rounded text-[9.5px] font-bold hover:text-sky-400 hover:border-sky-400/40 transition-colors cursor-default">AMEX</span>
          <span className="hover:text-white transition-colors cursor-default"> Pay</span>
          <span className="hover:text-white transition-colors cursor-default">G Pay</span>
        </div>
      </div>
    </div>
  );
}

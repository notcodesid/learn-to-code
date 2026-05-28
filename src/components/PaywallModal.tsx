"use client";

import { useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { PricingCard } from "./PricingCard";

interface PaywallModalProps {
  open: boolean;
  onClose: () => void;
  /** Challenge title that triggered the paywall (for context). */
  triggerTitle?: string;
}

export function PaywallModal({ open, onClose, triggerTitle }: PaywallModalProps) {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm transition-all duration-300"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md transition-all duration-300"
      >
        {/* Close button layered cleanly on top right */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 w-7 h-7 rounded-full flex items-center justify-center bg-neutral-950/80 border border-neutral-800 text-muted hover:bg-neutral-850 hover:text-foreground transition-all duration-200 cursor-pointer"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 6l12 12M6 18L18 6"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <PricingCard
          triggerTitle={triggerTitle}
          onCheckout={handleDodoCheckout}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </div>
  );
}

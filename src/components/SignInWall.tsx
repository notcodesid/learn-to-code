"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

interface SignInWallProps {
  /** Optional challenge title to personalize the message */
  challengeTitle?: string;
}

export function SignInWall({ challengeTitle }: SignInWallProps) {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      await signIn("google", { callbackUrl: "/learn" });
    } catch (error) {
      console.error("Google sign in failed:", error);
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center bg-[#111] border-t border-border p-6">
      <div className="w-full max-w-md">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/20 to-amber-400/10 border border-accent/20">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            className="text-accent"
          >
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
            <path d="M14 2v6h6" />
            <path d="M12 18v-6M9 15h6" />
          </svg>
        </div>

        {/* Headline */}
        <div className="text-center mb-3">
          <h2 className="text-2xl font-bold tracking-tight text-foreground mb-2">
            Sign in to start coding
          </h2>
          <p className="text-[15px] text-muted leading-relaxed">
            {challengeTitle ? (
              <>
                Unlock the editor to write and run <span className="text-foreground font-medium">{challengeTitle}</span> and the rest of the curriculum.
              </>
            ) : (
              "Write, compile, and master 155 hands-on Rust challenges with instant feedback."
            )}
          </p>
        </div>

        {/* Value props */}
        <div className="my-6 space-y-2 text-sm">
          <div className="flex items-center gap-3 text-muted">
            <div className="h-1.5 w-1.5 rounded-full bg-success" />
            <span>First 35 challenges are completely free</span>
          </div>
          <div className="flex items-center gap-3 text-muted">
            <div className="h-1.5 w-1.5 rounded-full bg-success" />
            <span>Real Rust compiler — no setup required</span>
          </div>
          <div className="flex items-center gap-3 text-muted">
            <div className="h-1.5 w-1.5 rounded-full bg-success" />
            <span>Track progress across devices</span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading}
            className="w-full flex items-center justify-center gap-3 rounded-xl bg-white py-3 text-sm font-semibold text-gray-900 hover:bg-gray-100 active:bg-gray-200 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
            </svg>
            {isGoogleLoading ? "Connecting to Google..." : "Continue with Google"}
          </button>
        </div>
      </div>
    </div>
  );
}

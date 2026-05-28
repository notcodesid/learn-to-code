"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

interface AuthPromptModalProps {
  open: boolean;
  onClose: () => void;
}

// Project logo (exact same paths used in header + landing)
const LogoIcon = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 46 47"
    fill="none"
    className={className}
  >
    <g fill="currentColor" clipPath="url(#logo-clip-modal)">
      <path d="M19.03 46.41a3.175 3.175 0 0 0 3.166-3.174v-4.758h12.697a3.174 3.174 0 0 0 0-6.349H22.196v-4.757a3.167 3.167 0 0 0-3.174-3.167 3.167 3.167 0 0 0-3.166 3.167v15.864a3.174 3.174 0 0 0 3.174 3.174Z" />
      <path d="M46.002 27.37a3.167 3.167 0 0 0-3.175-3.167H38.07V11.506a3.174 3.174 0 1 0-6.349 0v12.697h-4.757a3.161 3.161 0 0 0-3.167 3.167 3.167 3.167 0 0 0 3.167 3.174h15.863a3.174 3.174 0 0 0 3.175-3.174Z" />
      <path d="M26.962.408a3.167 3.167 0 0 0-3.167 3.174V8.34H11.1a3.174 3.174 0 0 0-3.167 3.167 3.174 3.174 0 0 0 3.167 3.174h12.696v4.758a3.167 3.167 0 0 0 5.412 2.237c.595-.596.93-1.403.93-2.245V3.582A3.174 3.174 0 0 0 26.961.408Z" />
      <path d="M0 19.438a3.174 3.174 0 0 0 3.174 3.167h4.758v12.697a3.174 3.174 0 0 0 3.167 3.174 3.175 3.175 0 0 0 3.166-3.174V22.605h4.758a3.174 3.174 0 0 0 3.174-3.167 3.174 3.174 0 0 0-3.174-3.166H3.174A3.174 3.174 0 0 0 0 19.438Z" />
    </g>
    <defs>
      <clipPath id="logo-clip-modal">
        <path fill="#fff" d="M0 .408h46v46H0z" />
      </clipPath>
    </defs>
  </svg>
);

export function AuthPromptModal({ open, onClose }: AuthPromptModalProps) {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  if (!open) return null;

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

        {/* Content - matching the clean signin page style */}
        <div className="px-6 pt-8 pb-7 text-center">
          {/* Small logo at top */}
          <div className="flex justify-center mb-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-surface border border-border">
              <LogoIcon className="w-8 h-8 text-accent" />
            </div>
          </div>

          <h1 className="text-3xl font-bold tracking-tight mb-1.5">
            <span className="text-accent">learn</span>
            <span className="text-foreground">-to-code</span>
          </h1>

          <p className="text-muted text-[15px] mb-6">
            Sign in to write real Rust and track your progress
          </p>

          <button
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading}
            className="w-full flex items-center justify-center gap-3 rounded-xl bg-white py-3.5 text-base font-semibold text-gray-900 hover:bg-gray-100 active:bg-gray-200 transition-colors disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
          >
            <svg width="20" height="20" viewBox="0 0 48 48" className="shrink-0">
              <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20c11.045 0 20-8.955 20-20 0-1.341-.138-2.65-.389-3.917z" />
              <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
              <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
              <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
            </svg>
            {isGoogleLoading ? "Connecting to Google..." : "Continue with Google"}
          </button>
        </div>
      </div>
    </div>
  );
}

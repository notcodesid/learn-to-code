"use client";

import dynamic from "next/dynamic";
import { loader } from "@monaco-editor/react";

// Suppress Monaco cancellation errors
loader.config({ 
  paths: { vs: "/monaco/vs" }
});

// Suppress cancellation errors in browser console
if (typeof window !== "undefined") {
  const originalError = console.error;
  console.error = (...args) => {
    if (typeof args[0] === "string" && args[0].includes("Canceled")) {
      return; // Suppress Monaco cancellation errors
    }
    originalError.apply(console, args);
  };
}

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="flex-1 flex flex-col items-center justify-center bg-[#111] gap-3">
      <div className="space-y-2 w-3/4 max-w-md">
        <div className="skeleton h-4 w-1/3" />
        <div className="skeleton h-4 w-2/3" />
        <div className="skeleton h-4 w-1/2" />
        <div className="skeleton h-4 w-3/4" />
        <div className="skeleton h-4 w-1/4" />
      </div>
      <span className="text-xs text-muted/50 animate-pulse mt-2">
        Loading editor...
      </span>
    </div>
  ),
});

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  onRun: () => void;
  onReset: () => void;
  isRunning: boolean;
}

export function CodeEditor({
  code,
  onChange,
  onRun,
  onReset,
  isRunning,
}: CodeEditorProps) {
  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-3 md:px-4 py-2 border-b border-border bg-surface/80 backdrop-blur-sm shrink-0">
        <div className="flex items-center gap-2">
          {/* File tab */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-surface-hover/60 rounded-md border border-border/50">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-accent/70"
            >
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
              <path d="M14 2v6h6" />
            </svg>
            <span className="text-xs text-foreground/70 font-mono">
              main.rs
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onReset}
            className="px-2.5 py-1 text-xs font-medium rounded-md bg-surface-hover text-muted hover:text-foreground transition-all duration-200 btn-press border border-transparent hover:border-border flex items-center gap-1.5"
          >
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M1 4v6h6M23 20v-6h-6" />
              <path d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15" />
            </svg>
            Reset
          </button>

          <button
            onClick={onRun}
            disabled={isRunning}
            className="group px-4 py-1.5 text-xs font-bold rounded-md bg-accent text-white hover:bg-accent-hover transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 btn-glow btn-press shadow-sm shadow-accent/20"
          >
            {isRunning ? (
              <>
                <svg
                  className="animate-spin h-3 w-3"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    className="opacity-25"
                  />
                  <path
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    className="opacity-75"
                  />
                </svg>
                <span>Running...</span>
              </>
            ) : (
              <>
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="transition-transform duration-200 group-hover:scale-110"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
                <span>
                  Run
                  <span className="hidden md:inline text-white/50 ml-1 font-normal">
                    Ctrl+Enter
                  </span>
                </span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Monaco */}
      <div className="flex-1 min-h-0 animate-fade-in">
        <MonacoEditor
          height="100%"
          defaultLanguage="rust"
          theme="vs-dark"
          value={code}
          onChange={(value) => onChange(value || "")}
          options={{
            fontSize: 14,
            fontFamily: "var(--font-geist-mono), 'Fira Code', monospace",
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            padding: { top: 16, bottom: 16 },
            lineNumbers: "on",
            renderLineHighlight: "line",
            bracketPairColorization: { enabled: true },
            automaticLayout: true,
            tabSize: 4,
            wordWrap: "on",
            smoothScrolling: true,
            cursorSmoothCaretAnimation: "on",
            cursorBlinking: "smooth",
            roundedSelection: true,
            lineHeight: 22,
          }}
        />
      </div>
    </div>
  );
}

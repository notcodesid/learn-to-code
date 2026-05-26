"use client";

import dynamic from "next/dynamic";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="flex-1 flex items-center justify-center bg-[#141414] text-muted text-sm">
      Loading editor...
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
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-surface shrink-0">
        <span className="text-xs text-muted font-mono">main.rs</span>
        <div className="flex items-center gap-2">
          <button
            onClick={onReset}
            className="px-3 py-1 text-xs font-medium rounded-md bg-surface-hover text-muted hover:text-foreground transition-colors"
          >
            Reset
          </button>
          <button
            onClick={onRun}
            disabled={isRunning}
            className="px-4 py-1 text-xs font-semibold rounded-md bg-accent text-white hover:bg-accent-hover transition-colors disabled:opacity-50 flex items-center gap-1.5"
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
                Running...
              </>
            ) : (
              <>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
                Run
              </>
            )}
          </button>
        </div>
      </div>

      {/* Monaco */}
      <div className="flex-1 min-h-0">
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
            padding: { top: 12 },
            lineNumbers: "on",
            renderLineHighlight: "line",
            bracketPairColorization: { enabled: true },
            automaticLayout: true,
            tabSize: 4,
            wordWrap: "on",
          }}
        />
      </div>
    </div>
  );
}

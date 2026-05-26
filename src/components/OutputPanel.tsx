"use client";

interface OutputPanelProps {
  output: string;
  expectedOutput?: string;
  isRunning: boolean;
}

export function OutputPanel({
  output,
  expectedOutput,
  isRunning,
}: OutputPanelProps) {
  const isMatch =
    expectedOutput && output.trim() === expectedOutput.trim();
  const hasOutput = output.length > 0;

  return (
    <div className="h-40 shrink-0 border-t border-border bg-[#141414] flex flex-col">
      <div className="flex items-center justify-between px-4 py-1.5 border-b border-border bg-surface">
        <span className="text-xs text-muted font-mono">Output</span>
        {hasOutput && !isRunning && (
          <span
            className={`text-[10px] font-bold uppercase tracking-wider ${
              isMatch ? "text-green-400" : "text-muted"
            }`}
          >
            {isMatch ? "Output matches expected!" : ""}
          </span>
        )}
      </div>
      <pre className="flex-1 overflow-auto p-4 text-sm font-mono leading-relaxed whitespace-pre-wrap">
        {isRunning ? (
          <span className="text-accent animate-pulse">Compiling...</span>
        ) : hasOutput ? (
          <span className={isMatch ? "text-green-300" : "text-foreground/80"}>
            {output}
          </span>
        ) : (
          <span className="text-muted/50">
            Click &quot;Run&quot; to compile and execute your code
          </span>
        )}
      </pre>
    </div>
  );
}

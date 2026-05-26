"use client";

import { useState, useRef, useEffect } from "react";
import { Challenge } from "@/data/challenges";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface AIChatPanelProps {
  challenge: Challenge;
  code: string;
  onClose: () => void;
  fullHeight?: boolean;
}

export function AIChatPanel({
  challenge,
  code,
  onClose,
  fullHeight,
}: AIChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 300);
    return () => clearTimeout(timer);
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages,
          challenge: {
            title: challenge.title,
            description: challenge.description,
            instructions: challenge.instructions,
            hint: challenge.hint,
          },
          code,
        }),
      });

      const data = await res.json();
      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content: data.reply || "Sorry, I could not respond.",
        },
      ]);
    } catch {
      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content:
            "Sorry, I encountered an error. Please check that an API key is configured.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div
      className={`border-l border-border bg-surface/95 backdrop-blur-sm flex flex-col ${
        fullHeight ? "w-full h-full" : "w-80 shrink-0"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-surface/80 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-accent to-amber-500 flex items-center justify-center shadow-sm shadow-accent/20">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="white"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-success rounded-full border-2 border-surface animate-pulse" />
          </div>
          <div>
            <span className="text-sm font-semibold text-foreground block leading-tight">
              AI Mentor
            </span>
            <span className="text-[10px] text-muted">Always here to help</span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-md text-muted hover:text-foreground hover:bg-surface-hover transition-all duration-200 btn-press"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.length === 0 && (
          <div className="text-center py-6 animate-fade-in-up">
            <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-accent/20 to-amber-400/20 flex items-center justify-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-accent"
              >
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
              </svg>
            </div>
            <p className="text-sm text-foreground/80 font-medium mb-1">
              Hi! I&apos;m your Rust mentor.
            </p>
            <p className="text-xs text-muted mb-4">
              Ask me anything about the current challenge.
            </p>
            <div className="space-y-1.5">
              {[
                { icon: "M12 2a7 7 0 017 7c0 2.5-1.3 4-3 5.5V17a1 1 0 01-1 1h-6a1 1 0 01-1-1v-2.5C6.3 13 5 11.5 5 9a7 7 0 017-7z", text: "Give me a hint" },
                { icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253", text: "Explain the concept" },
                { icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z", text: "What's wrong with my code?" },
              ].map((suggestion, idx) => (
                <button
                  key={suggestion.text}
                  onClick={() => setInput(suggestion.text)}
                  className="group flex items-center gap-2.5 w-full text-left px-3 py-2 text-xs rounded-lg bg-surface-hover/50 text-foreground/60 hover:text-foreground hover:bg-surface-hover border border-transparent hover:border-border/50 transition-all duration-200 btn-press animate-fade-in-up"
                  style={{ animationDelay: `${idx * 80}ms` }}
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="shrink-0 text-accent/50 group-hover:text-accent transition-colors"
                  >
                    <path d={suggestion.icon} />
                  </svg>
                  {suggestion.text}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex animate-fade-in-up ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[85%] px-3.5 py-2.5 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-accent text-white rounded-2xl rounded-br-md shadow-sm shadow-accent/20"
                  : "bg-surface-hover text-foreground rounded-2xl rounded-bl-md border border-border/30"
              }`}
            >
              <pre className="whitespace-pre-wrap font-sans">
                {msg.content}
              </pre>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start animate-fade-in">
            <div className="bg-surface-hover px-4 py-3 rounded-2xl rounded-bl-md border border-border/30">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-accent rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-accent rounded-full animate-bounce [animation-delay:0.15s]" />
                <div className="w-2 h-2 bg-accent rounded-full animate-bounce [animation-delay:0.3s]" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-3 border-t border-border bg-surface/60 shrink-0">
        <div className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask your mentor..."
            rows={1}
            className="flex-1 resize-none bg-surface-hover/80 border border-border rounded-xl px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted/40 focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/10 transition-all duration-200"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
            className="shrink-0 w-9 h-9 flex items-center justify-center rounded-xl bg-accent text-white hover:bg-accent-hover transition-all duration-200 disabled:opacity-20 disabled:cursor-not-allowed btn-glow btn-press shadow-sm shadow-accent/20"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="translate-x-[1px]"
            >
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

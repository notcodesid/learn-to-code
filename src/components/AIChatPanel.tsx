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
}

export function AIChatPanel({ challenge, code, onClose }: AIChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
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
        { role: "assistant", content: data.reply || "Sorry, I could not respond." },
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
    <div className="w-80 border-l border-border bg-surface flex flex-col shrink-0">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-sm font-semibold text-foreground">
            AI Mentor
          </span>
        </div>
        <button
          onClick={onClose}
          className="text-muted hover:text-foreground transition-colors"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.length === 0 && (
          <div className="text-center py-8">
            <p className="text-sm text-muted mb-3">
              I&apos;m your Rust mentor! Ask me anything about the current
              challenge.
            </p>
            <div className="space-y-2">
              {[
                "Give me a hint",
                "Explain the concept",
                "What's wrong with my code?",
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setInput(suggestion)}
                  className="block w-full text-left px-3 py-2 text-xs rounded-md bg-surface-hover text-foreground/70 hover:text-foreground transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] px-3 py-2 rounded-lg text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-accent text-white"
                  : "bg-surface-hover text-foreground"
              }`}
            >
              <pre className="whitespace-pre-wrap font-sans">{msg.content}</pre>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-surface-hover px-3 py-2 rounded-lg">
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce" />
                <div className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce [animation-delay:0.15s]" />
                <div className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce [animation-delay:0.3s]" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-3 border-t border-border">
        <div className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask your mentor..."
            rows={1}
            className="flex-1 resize-none bg-surface-hover border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent/50 transition-colors"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
            className="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-accent text-white hover:bg-accent-hover transition-colors disabled:opacity-30"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

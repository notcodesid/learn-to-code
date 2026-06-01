"use client";

import Link from "next/link";
import { ReactNode } from "react";

interface BlogPostLayoutProps {
  title: string;
  date: string;
  readingTime: number;
  category?: string;
  children: ReactNode;
}

export function BlogPostLayout({
  title,
  date,
  readingTime,
  category,
  children,
}: BlogPostLayoutProps) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border/30 bg-surface/20">
        <div className="max-w-3xl mx-auto px-6 py-8">
          <div className="flex items-center gap-2 mb-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors"
            >
              ← Back to Blog
            </Link>
          </div>

          <div className="flex items-center gap-3 text-xs uppercase tracking-[1.5px] text-muted/70 mb-4">
            {category && <span>{category}</span>}
            {category && <span className="text-border/60">•</span>}
            <time dateTime={date}>
              {new Date(date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </time>
            <span className="text-border/60">•</span>
            <span>{readingTime} min read</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-semibold tracking-tighter leading-[1.05] text-balance">
            {title}
          </h1>
        </div>
      </header>

      {/* Article Body */}
      <article className="max-w-3xl mx-auto px-6 py-12">
        <div className="blog-content text-[15px] leading-[1.75] text-foreground/90">
          {children}
        </div>

        {/* Bottom Navigation */}
        <div className="mt-16 pt-8 border-t border-border/30 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground transition-colors"
          >
            ← All Articles
          </Link>

          <Link
            href="/learn"
            className="inline-flex items-center gap-2 text-sm font-medium bg-accent text-white px-5 py-2.5 rounded-lg hover:bg-accent/90 active:scale-[0.985] transition-all"
          >
            Start Practicing Rust →
          </Link>
        </div>
      </article>
    </main>
  );
}

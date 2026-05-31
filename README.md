# learn-to-code

The best place on the internet for anyone learning a programming language. An AI-powered platform for mastering programming through curated challenges and instant mentorship. Inspired by [RareCode.ai](https://rarecode.ai/).

## Features

- **Multi-language support** — currently featuring 155+ curated challenges for Rust, with architecture designed to expand to any programming language
- **Curated learning paths** — from "Hello, World!" to advanced capstone projects, covering language-specific concepts and best practices
- **Monaco code editor** — VS Code-quality editing with syntax highlighting for multiple languages
- **Live code execution** — compile and run code in various languages (currently Rust via Rust Playground API)
- **AI mentor chat** — get hints, explanations, and feedback on your code (uses OpenAI API, with a built-in fallback)
- **Progress tracking** — completed challenges are tracked in the database with a visual progress bar
- **Dark theme** — clean, focused UI designed for extended coding sessions

## Getting Started

```bash
# Install dependencies
bun install

# Copy env example and configure
cp .env.example .env.local

# Configure required env vars:
# - DATABASE_URL (Supabase PostgreSQL)
# - NEXTAUTH_SECRET (generate with openssl rand -base64 32)
# - NEXTAUTH_URL (http://localhost:3000)
# - GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET (for OAuth)
# - (Optional) OPENAI_API_KEY for full AI mentorship

# Run the dev server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to start learning. Currently featuring Rust challenges with more languages coming soon.

## Tech Stack

- **Next.js 16** (App Router, TypeScript)
- **Prisma** + **PostgreSQL** (Supabase)
- **NextAuth** for authentication
- **Tailwind CSS** for styling
- **Monaco Editor** (same editor as VS Code)
- **Language execution APIs** — currently Rust Playground API, designed to support multiple language runtimes
- **OpenAI API** (optional) for AI mentor chat

## Current Curriculum: Rust

*Note: This is our first language. We're designed to expand to Python, JavaScript, Go, and more.*

| Category | Challenges | Difficulty |
|---|---|---|
| Basics | Hello Rust, Variables, Data Types, Functions, Control Flow, Loops | Beginner |
| Ownership & Borrowing | Ownership, References, Slices | Intermediate |
| Structs & Enums | Structs, Enums & Pattern Matching | Intermediate |
| Error Handling | Option\<T\>, Result\<T, E\> | Intermediate |
| Collections | Vectors, HashMaps | Intermediate |
| Traits & Generics | Traits, Generics, Lifetimes | Advanced |
| Functional Patterns | Closures & Iterators | Advanced |
| Capstone | Mini CLI Statistics Tool | Advanced |

## Vision

Our goal is to become the best place on the internet for anyone learning a programming language. We're starting with Rust because of its growing importance in systems programming, blockchain, and performance-critical applications.

The platform is architected to support any programming language — we plan to expand to Python, JavaScript/TypeScript, Go, and other popular languages based on community demand.

## AI Mentor

The AI mentor works in two modes:

1. **With OpenAI API key** — full conversational AI mentorship powered by GPT-4o-mini
2. **Without API key** — built-in fallback that provides hints, concept explanations, and code guidance based on the current challenge

## Deploy

```bash
bun run build
bun run start
```

Or deploy to [Vercel](https://vercel.com) with one click.

# learn-to-code

An AI-powered platform to learn Rust through curated challenges and instant mentorship. Inspired by [RareCode.ai](https://rarecode.ai/).

## Features

- **20 curated Rust challenges** — from "Hello, Rust!" to a capstone statistics calculator, covering variables, ownership, borrowing, structs, enums, traits, generics, lifetimes, closures, and more
- **Monaco code editor** — VS Code-quality editing with Rust syntax highlighting
- **Live code execution** — compile and run Rust code via the Rust Playground API
- **AI mentor chat** — get hints, explanations, and feedback on your code (uses OpenAI API, with a built-in fallback)
- **Progress tracking** — completed challenges are tracked in local storage with a visual progress bar
- **Dark theme** — clean, focused UI designed for extended coding sessions

## Getting Started

```bash
# Install dependencies
bun install

# (Optional) Add OpenAI API key for full AI mentorship
cp .env.example .env.local
# Edit .env.local with your OPENAI_API_KEY

# Run the dev server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to start learning Rust.

## Tech Stack

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS** for styling
- **Monaco Editor** (same editor as VS Code)
- **Rust Playground API** for code compilation and execution
- **OpenAI API** (optional) for AI mentor chat

## Challenge Categories

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

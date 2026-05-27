# learn-to-code

An AI-powered platform to learn Rust through curated challenges and instant mentorship. Inspired by [RareCode.ai](https://rarecode.ai/).

## Features

- **155 curated Rust challenges** — from "Hello, Rust!" to advanced capstone projects, covering variables, ownership, borrowing, structs, enums, traits, generics, lifetimes, closures, and more
- **Monaco code editor** — VS Code-quality editing with Rust syntax highlighting
- **Live code execution** — compile and run Rust code via the Rust Playground API
- **AI mentor chat** — get hints, explanations, and feedback on your code (uses OpenAI API, with a built-in fallback)
- **Progress tracking** — completed challenges are tracked in the database with a visual progress bar
- **Freemium with lifetime unlock** — first 35 challenges free; unlock all 155 with a one-time $1 payment via card/UPI or USDC on Solana
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
# - DODO_PAYMENTS_API_KEY, DODO_WEBHOOK_SECRET, DODO_PRODUCT_ID_USD/INR (for payments)
# - SOLANA_RECIPIENT (your Solana wallet address for USDC payments)
# - (Optional) OPENAI_API_KEY for full AI mentorship

# Run the dev server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to start learning Rust.

## Tech Stack

- **Next.js 16** (App Router, TypeScript)
- **Prisma** + **PostgreSQL** (Supabase)
- **NextAuth** for authentication
- **Tailwind CSS** for styling
- **Monaco Editor** (same editor as VS Code)
- **Rust Playground API** for code compilation and execution
- **OpenAI API** (optional) for AI mentor chat
- **Dodo Payments** for fiat payments (cards, UPI)
- **Solana Pay** for USDC payments

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

## Payment Setup

The platform supports two payment methods for the lifetime unlock ($1):

### Dodo Payments (Cards, UPI)

1. Create an account at [dodopayments.com](https://dodopayments.com)
2. Create two products in the dashboard:
   - **Lifetime Unlock (USD)**: $1 one-time
   - **Lifetime Unlock (INR)**: ₹85 one-time
3. Get your API key from Developer > API Keys
4. Create a webhook endpoint at `/api/webhooks/dodo` and subscribe to `payment.succeeded` events
5. Copy the webhook secret from the dashboard
6. Add to `.env.local`:
   ```
   DODO_PAYMENTS_API_KEY=sk_live_xxx
   DODO_PAYMENTS_ENVIRONMENT=test_mode  # or live_mode
   DODO_WEBHOOK_SECRET=whsec_xxx
   DODO_PRODUCT_ID_USD=prod_xxx
   DODO_PRODUCT_ID_INR=prod_xxx
   ```

### Solana Pay (USDC)

1. Create or use an existing Solana wallet (Phantom, Backpack, etc.)
2. Get the wallet's base58 address
3. For testing, fund it with devnet USDC from [faucet](https://faucet.solana.com/)
4. Add to `.env.local`:
   ```
   SOLANA_NETWORK=devnet  # or mainnet-beta
   SOLANA_RECIPIENT=your_wallet_base58_address
   SOLANA_USDC_MINT=4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU  # devnet USDC
   ```

## Deploy

```bash
bun run build
bun run start
```

Or deploy to [Vercel](https://vercel.com) with one click.

## Architecture

- **Free tier**: First 35 challenges (sorted by order) are accessible to all users
- **Paid tier**: One-time $1 lifetime unlock for all 155 challenges
- **Gating**: Server-side enforcement via `canAccessChallenge()` in API routes
- **Webhooks**: Dodo Payments webhook marks users as paid on successful payment
- **Verification**: Solana Pay polls the blockchain for confirmed transfers with reference keys

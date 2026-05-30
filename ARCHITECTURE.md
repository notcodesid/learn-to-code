# Architecture

This document provides a high-level overview of the learn-to-code architecture and design decisions.

## Overview

learn-to-code is a modern web application built with Next.js that provides an interactive platform for learning Rust programming through hands-on challenges.

## Tech Stack

### Frontend
- **Next.js 16**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Monaco Editor**: VS Code-quality code editor
- **React 19**: UI library

### Backend
- **Next.js API Routes**: Serverless API endpoints
- **Prisma ORM**: Database ORM and migrations
- **PostgreSQL**: Primary database (via Supabase)

### Authentication
- **NextAuth.js**: Authentication library
- **Google OAuth**: Primary authentication provider

### External Services
- **Rust Playground API**: Code compilation and execution
- **OpenAI API**: AI mentor chat (optional)

## System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Browser       │    │   Next.js       │    │   PostgreSQL    │
│   (React App)   │◄──►│   (API Routes)  │◄──►│   (Supabase)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       │
┌─────────────────┐    ┌─────────────────┘              │
│  Monaco Editor  │    │  Prisma ORM                    │
└─────────────────┘    └─────────────────┘              │
         │                                            │
         │                                            │
         ▼                                            │
┌─────────────────┐                                   │
│ Rust Playground │                                   │
│      API        │                                   │
└─────────────────┘                                   │
                                                      │
         ┌────────────────────────────────────────────┘
         │
         ▼
┌─────────────────┐
│  OpenAI API     │ (Optional)
│  (AI Mentor)    │
└─────────────────┘
```

## Directory Structure

```
learn-to-code/
├── prisma/                    # Database layer
│   ├── schema.prisma         # Database schema
│   ├── seed.ts              # Database seeding
│   └── migrations/          # Database migrations
├── public/                   # Static assets
├── scripts/                  # Utility scripts
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── api/            # API routes
│   │   │   ├── auth/       # Authentication endpoints
│   │   │   ├── challenges/ # Challenge data
│   │   │   ├── progress/   # User progress
│   │   │   ├── run/        # Code execution
│   │   │   └── chat/       # AI mentor chat
│   │   ├── auth/           # Auth pages (login, signup)
│   │   ├── learn/          # Main learning interface
│   │   └── page.tsx        # Landing page
│   ├── components/         # React components
│   │   ├── AppShell.tsx    # Main app layout
│   │   ├── ChallengePane.tsx
│   │   ├── CodeEditor.tsx
│   │   ├── OutputPanel.tsx
│   │   └── Sidebar.tsx
│   ├── lib/               # Utility libraries
│   │   ├── auth.ts        # Auth configuration
│   │   ├── prisma.ts      # Prisma client
│   │   └── env.ts         # Environment variables
│   └── types/             # TypeScript definitions
│       ├── challenge.ts   # Challenge types
│       └── next-auth.d.ts # Auth types
├── .env.example           # Environment variables template
├── package.json           # Dependencies
└── tsconfig.json          # TypeScript config
```

## Database Schema

### Core Models

```prisma
User {
  id, name, email, image
  progress[]          // User's challenge progress
  accounts[]          // OAuth accounts
  sessions[]          // User sessions
}

Challenge {
  id, title, difficulty, category
  description, instructions, starterCode
  hint, expectedOutput, explanation, test
  progress[]          // User progress for this challenge
}

Progress {
  id, userId, challengeId
  completed, code     // User's solution code
}
```

### Key Relationships
- One User has many Progress records
- One Challenge has many Progress records
- Progress links Users to Challenges with completion status

## API Architecture

### Authentication Flow
1. User initiates OAuth via Google
2. NextAuth handles OAuth callback
3. User record created/updated in database
4. Session established with JWT token
5. Subsequent requests include session token

### Challenge Access Flow
1. Client requests challenges via `/api/challenges`
2. Server fetches all challenges from database
3. Returns full challenge data (no payment gating)
4. Client displays challenges in sidebar

### Code Execution Flow
1. User writes code in Monaco Editor
2. Client sends code to `/api/run`
3. Server forwards code to Rust Playground API
4. Rust Playground compiles and executes code
5. Server returns output to client
6. Client displays output in OutputPanel

### Progress Tracking Flow
1. User completes challenge successfully
2. Client sends progress to `/api/progress`
3. Server updates/creates Progress record
4. Server returns updated progress status
5. Client updates UI to show completion

## Component Architecture

### AppShell
Main application container that manages:
- User authentication state
- Challenge selection and navigation
- Code execution state
- Progress tracking
- UI layout (sidebar, editor, output)

### Code Editor
Monaco Editor integration providing:
- Rust syntax highlighting
- Code completion
- Error highlighting
- Auto-indentation

### Challenge Pane
Displays challenge information:
- Title, difficulty, category
- Description and instructions
- Starter code template
- Hints for stuck users

### Output Panel
Shows code execution results:
- Compilation output
- Runtime output
- Error messages
- Success/failure indication

## State Management

### Client-Side State
- React hooks (useState, useEffect, useCallback)
- Session data via NextAuth useSession hook
- Local component state for UI interactions

### Server-Side State
- Database as single source of truth
- Prisma for data access
- Session management via NextAuth

## Security Considerations

### Authentication
- JWT-based session management
- Secure OAuth flow
- HTTP-only cookies for session tokens

### Data Validation
- Input validation on all API endpoints
- Type safety via TypeScript
- SQL injection prevention via Prisma

### Environment Variables
- Sensitive data stored in environment variables
- .env files excluded from version control
- Different configs for development/production

## Performance Optimizations

### Frontend
- Code splitting via Next.js
- Static page generation where possible
- Optimistic UI updates
- Debounced API calls

### Backend
- Database query optimization
- Connection pooling via Prisma
- Caching of frequently accessed data
- Efficient state management

## Scalability Considerations

### Database
- Indexed fields for common queries
- Efficient relationship loading
- Migration strategy for schema changes

### API
- Stateless API routes
- Efficient error handling
- Rate limiting considerations
- Horizontal scaling capability

## Deployment Architecture

### Development
- Local development with Bun
- Hot module reloading
- Local PostgreSQL instance

### Production
- Vercel for Next.js hosting
- Supabase for PostgreSQL
- Environment-specific configuration
- CDN for static assets

## Monitoring & Observability

### Logging
- Server-side error logging
- Client-side error tracking
- Performance monitoring

### Analytics
- User engagement tracking
- Challenge completion rates
- Error rate monitoring

## Future Considerations

### Potential Enhancements
- Real-time collaboration features
- Advanced analytics dashboard
- Mobile application
- Offline capability
- Additional programming languages

### Technical Debt
- Comprehensive test coverage
- Performance benchmarking
- Security audit
- Documentation improvements
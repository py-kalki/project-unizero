# Phase 1: Foundation - Research

**Researched:** 2026-02-14
**Domain:** Full-stack web application infrastructure setup
**Confidence:** HIGH

## Summary

Phase 1 establishes the foundational infrastructure for the project. This includes scaffolding a Next.js 15 application with TypeScript and Tailwind CSS, connecting to a PostgreSQL database using Prisma ORM, integrating Clerk authentication with the App Router, and setting up shadcn/ui component library with dark/light mode support.

**Primary recommendation:** Use `npx create-next-app@latest` with App Router, TypeScript, and Tailwind CSS. Then initialize Prisma with PostgreSQL provider, install Clerk SDK, and run `npx shadcn-ui@latest init` to scaffold the base UI components.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **Feature-based organization** — Group by feature (features/auth/, features/subscriptions/)
- **File colocation** — Components, hooks, utils sit next to the pages that use them
- **Module boundaries** — Separate components/, lib/, app/ at top level
- **API in /api** — Backend routes in app/api/ organized by feature
- **TypeScript strict mode** — Full type safety enabled
- **Incremental build** — Only Users table in Phase 1, add tables as phases progress
- **Local PostgreSQL** — For development (switch to cloud later if needed)
- **Prisma type-safe queries** — Use Prisma's generated types
- **Upfront indexes** — On foreign keys and unique fields
- **Dark + Light mode** — Both supported with system preference detection
- **shadcn/ui defaults** — Professional slate/neutral theme
- **Essential components first** — Button, Input, Card, Table; install more as needed
- **clsx + tailwind-merge** — For combining utility classes
- **ESLint + Prettier** — For linting and formatting
- **Husky pre-commit hook** — Prevent bad commits
- **Minimal testing** — Focus on features, add tests later
- **Environment variables** — .env.local for secrets, .env.example for templates

### Claude's Discretion
- No specific discretion areas - all decisions are locked

### Deferred Ideas (OUT OF SCOPE)
- None — all decisions stayed within Phase 1 scope.
</user_constraints>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 15.x | Full-stack React framework with App Router | Industry standard for React SSR/SSG |
| TypeScript | 5.x | Type safety | Enabled by default in Next.js 15 |
| Tailwind CSS | 4.x | Utility-first styling | Recommended by Next.js team |
| Prisma | 6.x | Type-safe ORM for PostgreSQL | Best-in-class type safety |
| PostgreSQL | Latest | Relational database | User-specified choice |
| Clerk | Latest | Authentication | User-specified choice |
| shadcn/ui | Latest | UI component library | Built on Radix + Tailwind |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| next-themes | ^0.4.x | Dark/light mode | Required for shadcn/ui theming |
| clsx | ^2.x | Conditional class names | For combining CSS classes |
| tailwind-merge | ^2.x | Tailwind class override | For component class merging |
| @clerk/nextjs | Latest | Clerk integration | For App Router auth |
| eslint-config-next | Latest | Next.js linting | Built-in with create-next-app |
| prettier | Latest | Code formatting | For consistent style |
| husky | ^9.x | Git hooks | For pre-commit validation |
| lint-staged | ^16.x | Staged file linting | For optimized pre-commit |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Local PostgreSQL | Supabase, Neon (cloud) | Local is simpler for Phase 1 dev |
| Clerk | Auth0, Firebase Auth | Clerk has best App Router support |
| shadcn/ui | Radix UI primitives, MUI | shadcn gives you ownership of components |

**Installation:**
```bash
# 1. Create Next.js 15 app with TypeScript, Tailwind, ESLint
npx create-next-app@latest my-app --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm

# 2. Initialize Prisma with PostgreSQL
cd my-app
npm install prisma --save-dev
npx prisma init --datasource-provider postgresql

# 3. Install Clerk
npm install @clerk/nextjs

# 4. Initialize shadcn/ui
npx shadcn-ui@latest init

# 5. Add essential dependencies
npm install next-themes clsx tailwind-merge

# 6. Add development tools
npm install --save-dev prettier husky lint-staged eslint-config-prettier

# 7. Add essential shadcn components
npx shadcn-ui@latest add button input card table
```

## Architecture Patterns

### Recommended Project Structure
```
my-app/
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── migrations/        # Migration files
├── src/
│   ├── app/               # App Router (pages, layouts, API)
│   │   ├── api/           # API routes organized by feature
│   │   ├── (auth)/        # Auth routes (sign-in, sign-up)
│   │   ├── layout.tsx     # Root layout
│   │   └── page.tsx       # Home page
│   ├── components/        # Shared components
│   │   ├── ui/            # shadcn/ui components
│   │   └── *.tsx          # Feature-agnostic components
│   ├── features/          # Feature-based modules
│   │   ├── auth/          # Auth feature
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   └── lib/
│   │   └── subscriptions/ # Future features
│   ├── lib/               # Utilities and configs
│   │   ├── db.ts          # Prisma client singleton
│   │   └── utils.ts       # cn() utility
│   └── styles/
│       └── globals.css    # Global styles
├── .env.local             # Local secrets
├── .env.example           # Template for secrets
├── .eslintrc.json
├── prettier.config.js
├── next.config.ts
└── tsconfig.json
```

### Pattern 1: Prisma Client Singleton
**What:** Create a single Prisma client instance to prevent connection exhaustion in development
**When to use:** Every database query in the application
**Example:**
```typescript
// Source: Prisma official docs
// src/lib/db.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

### Pattern 2: Clerk Middleware Protection
**What:** Use clerkMiddleware() to protect routes at the edge before rendering
**When to use:** Securing authenticated routes
**Example:**
```typescript
// Source: Clerk official docs
// middleware.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/settings(.*)'
])

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect()
})

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    '/((?!.*\\..*|_next).*)',
    '/',
    '/(api|trpc)(.*)'
  ]
}
```

### Pattern 3: Theme Provider Setup
**What:** Wrap the application with ThemeProvider for dark/light mode
**When to use:** Every Next.js app using shadcn/ui
**Example:**
```typescript
// Source: shadcn/ui docs
// src/components/theme-provider.tsx
"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
```

### Pattern 4: Root Layout with Clerk and Theme
**What:** Configure root layout to include ClerkProvider and ThemeProvider
**When to use:** App Router root layout setup
**Example:**
```typescript
// Source: Clerk + shadcn docs
// src/app/layout.tsx
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from '@/components/theme-provider'
import { dark } from '@clerk/themes'
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
```

### Anti-Patterns to Avoid
- **Creating new PrismaClient per request:** Will exhaust database connections in production
- **Using old Clerk APIs:** Never use `authMiddleware()` or `withAuth()` - use `clerkMiddleware()` only
- **Skipping TypeScript strict mode:** Phase 1 decisions mandate strict mode
- **Using Pages Router:** This project uses App Router exclusively

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Authentication | Custom JWT/session handling | Clerk | CVE-2025-29927 vulnerability - Clerk patches automatically |
| Database queries | Raw SQL with manual typing | Prisma | Type safety, migration management, connection pooling |
| UI components | Custom accessible components | shadcn/ui | Built on Radix primitives, fully accessible |
| CSS utility merging | Manual class concatenation | clsx + tailwind-merge | Handles Tailwind precedence correctly |
| Dark mode | Custom CSS variables | next-themes + shadcn | System preference detection, no flash of wrong theme |

**Key insight:** Authentication vulnerabilities like CVE-2025-29927 (March 2025) affect millions of Next.js apps. Using Clerk provides automatic security patches without building custom solutions.

## Common Pitfalls

### Pitfall 1: Prisma Client Connection Exhaustion
**What goes wrong:** Creating new PrismaClient in hot module reload causes "Too many connections" errors
**Why it happens:** Next.js dev server restarts frequently, each restart opens new connections
**How to avoid:** Use the singleton pattern shown above in Pattern 1
**Warning signs:** "P3009" or "Too many connections" errors in development console

### Pitfall 2: Using Deprecated Clerk APIs
**What goes wrong:** Auth doesn't work - pages are accessible without login
**Why it happens:** Clerk renamed `authMiddleware()` to `clerkMiddleware()` in late 2024
**How to avoid:** Only use `clerkMiddleware()` from `@clerk/nextjs/server`
**Warning signs:** Auth redirects not working, users able to access protected routes

### Pitfall 3: Hydration Mismatch with Theme
**What goes wrong:** Console shows "Text content does not match server-rendered HTML" warnings
**Why it happens:** Theme applied differently on server vs client (system preference differs)
**How to avoid:** Add `suppressHydrationWarning` to html tag and use `enableSystem` prop
**Warning signs:** Hydration warnings in dev console

### Pitfall 4: Missing Environment Variables
**What goes wrong:** Application crashes on first run with "Missing environment variable" errors
**Why it happens:** `.env.local` not committed, `.env.example` not created
**How to avoid:** Create `.env.example` with placeholder values for all required vars
**Warning signs:** Build fails immediately after cloning repo

### Pitfall 5: Husky Not Running on First Commit
**What goes wrong:** Pre-commit hook doesn't trigger after initial setup
**Why it happens:** Husky not properly initialized or package.json scripts missing
**How to avoid:** Run `npx husky install` in postinstall script or manually initialize
**Warning signs:** Commits succeed without linting even though husky is installed

## Code Examples

### Initializing Prisma Schema (Users Only)
```prisma
// Source: Prisma official docs
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Indexes on foreign keys and unique fields
  @@index([email])
}
```

### Setting Up Husky Pre-commit Hook
```bash
# Source: Husky official docs
# Initialize husky
npx husky init

# Update .husky/pre-commit
echo "npx lint-staged" > .husky/pre-commit
```

```json
// package.json
{
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,css,md}": ["prettier --write"]
  }
}
```

### .env.example Template
```
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `withAuth()` HOC | `clerkMiddleware()` | Late 2024 | Middleware runs at edge, better performance |
| Prisma 5.x | Prisma 6.x/7.x | 2025 | TypeScript-based engine, faster cold starts |
| `authMiddleware()` | `clerkMiddleware()` | Late 2024 | New unified API |
| Tailwind 3.x | Tailwind 4.x | 2024 | CSS-native configuration, no config file needed |
| Pages Router | App Router | 2023+ | Server components, layouts, streaming |

**Deprecated/outdated:**
- `withAuth()` from `@clerk/nextjs` - Use only `clerkMiddleware()`
- `currentUser()` from `@clerk/nextjs/server` - Now import from `@clerk/nextjs`
- `pages/` directory - App Router is the standard

## Open Questions

1. **Database migration strategy**
   - What we know: Use `npx prisma migrate dev` for dev, `prisma migrate deploy` for production
   - What's unclear: Whether to use baseline migration or fresh start
   - Recommendation: For fresh projects, use `npx prisma db push` initially, then switch to migrations

2. **Clerk webhook handling**
   - What we know: Need to sync Clerk users to local database
   - What's unclear: Whether to implement in Phase 1 or defer
   - Recommendation: Defer to later phase - Phase 1 only needs auth setup

## Sources

### Primary (HIGH confidence)
- Next.js official docs - https://nextjs.org/docs/app/getting-started/installation
- Prisma official docs - https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch
- Clerk official docs - https://clerk.com/docs/nextjs/getting-started/quickstart
- shadcn/ui official docs - https://ui.shadcn.com/docs/installation

### Secondary (MEDIUM confidence)
- Dev.to guides on Next.js 15 + shadcn setup (2025)
- StackOverflow on dark mode configuration

### Tertiary (LOW confidence)
- YouTube tutorials - for verification only, not primary source

## Metadata

**Confidence breakdown:**
- Standard Stack: HIGH - All libraries verified with official docs
- Architecture: HIGH - All patterns from official documentation
- Pitfalls: HIGH - Known issues from community and official sources

**Research date:** 2026-02-14
**Valid until:** 2026-03-14 (30 days for stable stack)

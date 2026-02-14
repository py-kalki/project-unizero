# Phase 1: Foundation - Context

**Gathered:** 2026-02-14
**Status:** Ready for planning

<domain>
## Phase Boundary

Project infrastructure is ready for feature development — database schema, authentication setup, and base UI components.

This phase delivers:
- Next.js 15 project scaffolded with TypeScript and Tailwind CSS
- PostgreSQL database with Prisma ORM connected
- Clerk authentication integrated with Next.js App Router
- Base UI component library (shadcn/ui) installed and configured

</domain>

<decisions>
## Implementation Decisions

### Project Structure
- **Feature-based organization** — Group by feature (features/auth/, features/subscriptions/)
- **File colocation** — Components, hooks, utils sit next to the pages that use them
- **Module boundaries** — Separate components/, lib/, app/ at top level
- **API in /api** — Backend routes in app/api/ organized by feature
- **TypeScript strict mode** — Full type safety enabled

### Database Schema
- **Incremental build** — Only Users table in Phase 1, add tables as phases progress
- **Local PostgreSQL** — For development (switch to cloud later if needed)
- **Prisma type-safe queries** — Use Prisma's generated types
- **Upfront indexes** — On foreign keys and unique fields

### UI Configuration
- **Dark + Light mode** — Both supported with system preference detection
- **shadcn/ui defaults** — Professional slate/neutral theme
- **Essential components first** — Button, Input, Card, Table; install more as needed
- **clsx + tailwind-merge** — For combining utility classes

### Development Workflow
- **ESLint + Prettier** — For linting and formatting
- **Husky pre-commit hook** — Prevent bad commits
- **Minimal testing** — Focus on features, add tests later
- **Environment variables** — .env.local for secrets, .env.example for templates

</decisions>

<specifics>
## Specific Ideas

No specific references provided — open to standard approaches for infrastructure setup.

</specifics>

<deferred>
## Deferred Ideas

None — all decisions stayed within Phase 1 scope.

</deferred>

---

*Phase: 01-foundation*
*Context gathered: 2026-02-14*

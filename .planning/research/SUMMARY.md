# Project Research Summary

**Project:** UNIZERO - AI Discovery & Subscription Management Platform
**Domain:** AI Tool Marketplace + Personal Subscription Tracker
**Researched:** 2026-02-14
**Confidence:** MEDIUM-HIGH

## Executive Summary

UNIZERO is a dual-value platform combining AI tool discovery with personal subscription management — a unique position in the market with no direct competitors. The platform serves users who want to discover, compare, and track their AI tool subscriptions in one place. Based on research, the recommended approach uses Next.js 15 with modern React patterns, PostgreSQL for structured data, and Clerk for fastest time-to-production authentication.

**Key recommendation:** Start with a curated AI tool catalog + manual subscription tracking. The side-by-side comparison feature is the primary differentiator versus pure directories like Futurepedia, while the AI-specific focus differentiates from generic subscription trackers like Rocket Money. Avoid the temptation to build automatic subscription sync or in-app purchases in v1 — these add massive complexity without adding core value.

**Key risks to mitigate:**
1. **Stale data** — AI tools change pricing weekly; data architecture must include staleness tracking from day one
2. **Pricing complexity** — AI pricing is notoriously variable; always show "estimated" vs "actual" and support manual overrides
3. **Comparison shallow** — Feature checklists aren't helpful; build use-case-based comparisons with real user context
4. **Auth scope creep** — Don't try to integrate every AI tool's OAuth; start manual, prioritize high-value integrations only

## Key Findings

### Recommended Stack

**Core technologies:**
- **Next.js 15.x** — Full-stack React framework with App Router, SSR/SSG, and Vercel integration
- **PostgreSQL 16.x + Prisma 6.x** — Type-safe database access with excellent JSON support for flexible schemas
- **Clerk** — Best-in-class Next.js authentication; ~30 min to production auth with App Router support
- **Stripe** — Industry standard for subscription billing; built-in customer portal and webhooks
- **Tailwind CSS + shadcn/ui** — Utility-first styling with copy-paste component ownership; 35+ accessible components
- **Tremor 3.x** — Dashboard-specific components built on Recharts for spending analytics
- **Vercel** — Zero-config deployments with edge network, ISR, and preview deployments

**Quick start command:**
```bash
npx create-next-app@latest unizero --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --turbopack
```

### Expected Features

**Must have (table stakes):**
- AI Tool Discovery/Catalog — Browse curated AI tools organized by category
- Tool Categorization — Filter by use case (LLMs, Image, Video, Audio, Coding, Productivity)
- Search & Filter — Quick find by name, category, or attribute
- Tool Detail Pages — Individual pages with description, pricing, features
- User Authentication — Email/password + Google OAuth
- Add Personal Subscriptions — Manual entry form (tool, cost, billing cycle, renewal date)
- Subscription List View — See all tracked subscriptions
- Basic Spending Dashboard — Total monthly spend calculation
- Payment Reminders — Email notifications before renewal dates
- Side-by-Side Comparison — Compare 2-3 tools (key differentiator)

**Should have (competitive advantage):**
- Category Spending Breakdown — Visual pie/bar chart of spend by category
- Tool Recommendations — "Users who use X also use Y" suggestions
- Pricing Trend Alerts — Notify when tools change pricing
- What's New Feed — Curated feed of new AI tool launches

**Defer (v2+):**
- AI-Powered Search — Semantic/natural language search (HIGH complexity)
- Subscription Health Score — AI analysis of subscription usage
- In-App Purchases — Direct purchase via platform (marketplace model)
- Team/Business Features — Enterprise tier
- Browser Extensions — Quick access (maintenance overhead)

### Architecture Approach

The recommended architecture uses a **service-oriented backend** with clear separation between presentation, business logic, and data access layers. Next.js App Router handles both UI and API (Server Actions), while PostgreSQL stores all data with Prisma as the ORM.

**Major components:**
1. **Frontend (Next.js App Router)** — UI rendering with React Server Components and client-side state for filters/modals
2. **Auth Service** — Handles user authentication via Clerk; session management with middleware
3. **AI Tool Service** — CRUD for tool catalog with categorization and search indexing
4. **Subscription Service** — Track user subscriptions, renewal dates, pricing
5. **Analytics Service** — Aggregate spending, generate category breakdowns
6. **Notification Service** — Email reminders via Resend/SendGrid
7. **Comparison Engine** — Side-by-side tool comparison logic

**Key architectural patterns:**
- Multi-tenant data isolation with `user_id` on all user-scoped tables
- Event-driven analytics updates (pre-compute, not on-read)
- Optimistic UI with Server Revalidation for snappy interactions
- Thin API routes that delegate to services (no business logic in controllers)

### Critical Pitfalls

1. **Stale AI Tool Data** — AI tools evolve at extreme pace; include timestamp tracking for every data point, build crowdsourced updates, prioritize high-traffic tools for refresh
2. **Pricing Model Complexity** — AI pricing has variables (tokens, seats, usage); track list price vs actual spend, support manual overrides, show "estimated" vs "confirmed" badges
3. **Shallow Comparison UX** — Feature checklists become meaningless; build use-case comparisons, show limitations not just features, add decision guidance
4. **Authentication Scope Creep** — OAuth integration with every AI tool is unsustainable; start manual, prioritize stable APIs (Stripe, Paddle), set integration limits
5. **Performance Traps** — N+1 queries on comparison, missing pagination, unindexed search; plan indexes from day one, eager load relations

## Implications for Roadmap

Based on research, suggested phase structure:

### Phase 1: Foundation
**Rationale:** Core infrastructure must be built first — database schema, authentication, and base UI components are prerequisites for all other features
**Delivers:** Database setup, user auth, basic UI components, project structure
**Addresses:** Authentication, data architecture
**Avoids:** Security mistakes, coupling UI to database schema, hardcoded data
**Stack:** PostgreSQL + Prisma, Clerk, Tailwind + shadcn/ui, Vercel

### Phase 2: Core Discovery
**Rationale:** AI tool catalog is the foundation of the platform — discovery and comparison depend on having tools properly documented
**Delivers:** AI tool catalog, categorization, search, tool detail pages
**Addresses:** AI Tool Discovery, Tool Categorization, Search & Filter, Tool Detail Pages
**Avoids:** Stale data pitfall (includes timestamp tracking from day one)
**Stack:** PostgreSQL full-text search, Tremor for any dashboard elements

### Phase 3: Subscription Tracking
**Rationale:** User value proposition depends on personal subscription tracking — dashboard requires subscription data to exist
**Delivers:** Add subscriptions form, subscription list, basic spending dashboard
**Addresses:** Add Personal Subscriptions, Subscription List View, Basic Spending Dashboard
**Avoids:** Pricing complexity pitfall (includes manual override capability)
**Stack:** Server Actions for mutations, Zustand for client state

### Phase 4: Comparison & Enhancement
**Rationale:** The key differentiator — side-by-side comparison — depends on having tool detail pages complete
**Delivers:** Side-by-side comparison UI, payment reminders, favorites
**Addresses:** Side-by-Side Comparison (key differentiator), Payment Reminders
**Avoids:** Shallow comparison UX pitfall (includes use-case-based approach)
**Stack:** Comparison Engine service, email integration (Resend)

### Phase 5: Growth Features (v1.x)
**Rationale:** Add value after core is validated — spending breakdowns, recommendations, alerts
**Delivers:** Category spending charts, tool recommendations, pricing alerts, what's new feed
**Addresses:** Category Spending Breakdown, Tool Recommendations, Pricing Trend Alerts, What's New Feed
**Stack:** Tremor charts, analytics service

### Phase 6: Scale (v2)
**Rationale:** Only after product-market fit — marketplace model requires fundamentally different architecture
**Delivers:** In-app purchases, vendor portal, multi-tenant data, Stripe Connect
**Addresses:** In-App Purchases, Team Features, API Access
**Avoids:** Auth scope creep (planned abstraction layer)

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 4 (Comparison):** Complex UI interactions, may need additional UX research for decision guidance
- **Phase 6 (Scale):** Marketplace architecture is significantly different; needs dedicated research

Phases with standard patterns (skip research-phase):
- **Phase 1 (Foundation):** Well-documented Next.js + Prisma patterns
- **Phase 2 (Discovery):** Standard e-commerce catalog patterns
- **Phase 3 (Subscriptions):** CRUD patterns well-established

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Official docs for Next.js, Clerk, Stripe, Prisma — well-established technologies |
| Features | MEDIUM | Competitor analysis from adjacent domains (Futurepedia, Rocket Money) — unique combination is novel |
| Architecture | MEDIUM | Standard SaaS patterns from Stripe/Next.js blogs, but UNIZERO's specific dual-value is new |
| Pitfalls | MEDIUM | Inferred from adjacent domains (marketplaces, subscription tracking), some domain-specific findings are novel |

**Overall confidence:** MEDIUM-HIGH

The stack recommendations are highly confident — established technologies with excellent documentation. The features and architecture are based on adapting standard patterns to a novel combination (AI discovery + subscription tracking), which introduces some uncertainty. Pitfalls are partially inferred from adjacent domains since this exact combination is relatively new.

### Gaps to Address

- **AI Tool Data Sources:** Research needed on reliable sources for AI tool data (pricing, features, updates) — may need partnerships or manual curation workflow
- **Comparison UX:** Additional user research needed on what makes comparison "useful" beyond feature checklists
- **Pricing Data Accuracy:** No existing API for AI tool pricing — manual entry + community updates likely needed
- **Multi-vendor Architecture:** Phase 6 marketplace model needs deeper architecture research when approaching v2

## Sources

### Primary (HIGH confidence)
- Next.js 15 Docs: https://nextjs.org/docs/app/building-your-application — Official framework docs
- Clerk Next.js SDK: https://clerk.com/docs/references/nextjs/overview — Official auth integration
- Stripe Subscriptions: https://docs.stripe.com/billing/subscriptions/overview — Official billing docs
- Prisma Next.js Guide: https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices — Official ORM docs
- shadcn/ui: https://ui.shadcn.com/ — Official component library

### Secondary (MEDIUM confidence)
- Tremor Docs: https://tremor.so/docs/visualizations/bar-chart — Dashboard components
- Vercel vs Railway Comparison: https://www.houseofloops.com/blog/vercel-vs-netlify-vs-railway — Hosting analysis
- Multi-tenant architecture patterns: Achromatic.dev blog
- Stripe Developer Blog: Subscription management patterns
- Baymard Institute UX Research: Digital subscriptions & SaaS

### Tertiary (LOW confidence)
- Competitor analysis: Futurepedia, Rocket Money, AIComparison — inferring feature gaps
- Community discussions: r/SaaS, Hacker News on subscription tracking pain points
- Stale Data in AI Systems: Medium (November 2025) — needs validation

---

*Research completed: 2026-02-14*
*Ready for roadmap: yes*

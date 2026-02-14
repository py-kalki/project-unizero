# Stack Research

**Domain:** AI Discovery & Subscription Management Platform
**Researched:** 2026-02-14
**Confidence:** HIGH

## Recommended Stack

### Core Framework

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Next.js | 15.x (latest) | Full-stack React framework | Industry standard for React apps. Built-in SSR/SSG, App Router, API routes. Native Vercel integration provides zero-config deployments, edge middleware, and ISR. Active LTS as of 2025. |
| React | 19.x | UI library | Required by Next.js 15. Note: Some third-party libraries still have compatibility issues with React 19 - test thoroughly. |
| TypeScript | 5.x | Type safety | Essential for maintainability. Full Next.js and React 19 support. |
| Node.js | 20.x (LTS) | Runtime | Required by Next.js. Use nvm to manage versions. |

### Database & ORM

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| PostgreSQL | 16.x | Relational database | Industry standard for structured data. Excellent JSON support for flexible schemas. Integrates seamlessly with Prisma. |
| Prisma | 6.x | ORM | Type-safe database access. Excellent Next.js integration. Auto-generated types eliminate boilerplate. Use singleton pattern to prevent connection pool exhaustion in dev. |
| Supabase | Managed | Database + Auth + API | Alternative: Use Supabase for managed PostgreSQL, auto-generated REST/GraphQL APIs, and built-in Auth. Good for rapid prototyping. |

### Authentication

| Technology | Purpose | Why Recommended |
|------------|---------|-----------------|
| Clerk | User authentication | Best-in-class Next.js integration. Pre-built components work natively with App Router and Server Components. ~30 min to production auth. First-class RSC support. Active middleware with `clerkMiddleware()`. |
| NextAuth.js v5 | Alternative auth | Maximum flexibility. Good App Router support but requires more setup than Clerk. Open-source alternative if you need self-hosted. |

**Recommendation:** Use **Clerk** for fastest time-to-production. Use NextAuth if you need complete control or have specific provider requirements not supported by Clerk.

### Payments & Billing

| Technology | Purpose | Why Recommended |
|------------|---------|-----------------|
| Stripe | Subscription billing | Industry leader for subscription management. Built-in customer portal, tax handling, webhooks, and dunning management. Excellent docs and SDKs. |

### UI Components & Styling

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Tailwind CSS | 4.x | Utility-first CSS | Standard for modern React. Zero runtime overhead, excellent performance. Works perfectly with shadcn/ui. |
| shadcn/ui | Latest | Component library | Copy-paste approach gives full ownership of code. Built on Radix UI primitives for accessibility. Actively maintained, excellent docs. 35+ components ready to use. |
| Tremor | 3.x | Dashboard components | Built on Recharts, designed specifically for dashboards. Beautiful out-of-the-box charts, KPI cards, tables. Open-source, Tailwind-native. |
| Recharts | Latest | Charting library | Powers Tremor. Use directly for custom chart requirements. |

### Infrastructure & Hosting

| Technology | Purpose | Why Recommended |
|------------|---------|-----------------|
| Vercel | Primary hosting | Creator of Next.js. Zero-config deployments, global edge network, automatic HTTPS, preview deployments for every PR. Best developer experience. Native ISR and edge middleware support. |
| Railway | Alternative hosting | Excellent for full-stack apps needing persistent containers. Native PostgreSQL, Redis, MySQL support. Better pricing for high-bandwidth apps. Use for staging or if you need more control. |

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @tremor/react | 3.x | Dashboard UI | Building spending analytics, KPI cards, charts |
| @clerk/nextjs | Latest | Authentication | User auth with Next.js App Router |
| @stripe/stripe-js | Latest | Stripe frontend | Payment form integration |
| stripe | Latest | Stripe backend | Subscription management, webhooks |
| @prisma/client | 6.x | Database client | Type-safe DB queries |
| lucide-react | Latest | Icons | Consistent icon set, works with shadcn/ui |
| zod | Latest | Validation | Schema validation for forms and API inputs |
| react-hook-form | Latest | Form handling | Performance forms with shadcn/ui |
| @hookform/resolvers | Latest | Zod + forms | Connect Zod schemas to react-hook-form |
| date-fns | Latest | Date utilities | Subscription renewal dates, spending timelines |
| @radix-ui/react-* | Latest | Headless primitives | When building custom accessible components |

## Installation

```bash
# Create Next.js app with TypeScript, Tailwind, App Router
npx create-next-app@latest unizero --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --turbopack

# Core dependencies
npm install react react-dom next

# Database
npm install prisma @prisma/client

# Authentication
npm install @clerk/nextjs

# Payments
npm install @stripe/stripe-js stripe

# UI Components
npm install tailwindcss postcss autoprefixer
npx shadcn-ui@latest init
npx shadcn-ui@latest add button card input dialog table badge avatar sheet dropdown-menu tabs

# Dashboard/Charts
npm install @tremor/react recharts

# Icons & Utilities
npm install lucide-react clsx tailwind-merge class-variance-authority zod react-hook-form @hookform/resolvers date-fns

# Dev dependencies
npm install -D typescript @types/react @types/node eslint eslint-config-next
```

## Alternatives Considered

| Category | Recommended | Alternative | When to Use Alternative |
|----------|-------------|-------------|------------------------|
| Frontend | Next.js 15 | Remix | If you prefer Remix's data loading model or need specific SSR patterns |
| Database | PostgreSQL + Prisma | MongoDB + Mongoose | If you need flexible schemas for rapidly changing AI tool data |
| Auth | Clerk | Supabase Auth | If already using Supabase for database (single platform preference) |
| Auth | Clerk | NextAuth v5 | If you need complete open-source control or custom OAuth providers |
| Payments | Stripe | Paddle | If you need global tax handling or prefer Paddle's merchant-of-record model |
| Hosting | Vercel | Railway | If you need persistent containers or native database hosting |
| Hosting | Vercel | VPS (DigitalOcean, Hetzner) | If you need full control, predictable costs at scale, or GDPR compliance |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| Create React App (CRA) | Deprecated, no longer maintained. Poor performance, no SSR. | Next.js |
| Redux | Overkill for most apps. Zustand or Jotai for global state if needed. | Zustand, Jotai, or React Context |
| MongoDB (for this use case) | Less structured data fits better in Postgres JSON columns. AI tools have fixed attributes (pricing, features). | PostgreSQL |
| Styled Components | Runtime overhead, slower than Tailwind. CSS-in-JS approach is declining. | Tailwind CSS |
| jQuery | Deprecated for React development. | React hooks |
| NextAuth v4 | Deprecated, no App Router support. | Clerk or NextAuth v5 |
| MySQL | PostgreSQL has better JSON support, more feature-rich. | PostgreSQL |

## Stack Patterns by Variant

**If you want the fastest time-to-market:**
- Next.js + Clerk + Supabase (Auth + DB + API) + Stripe + Tremor
- Rationale: Supabase replaces Prisma, provides Auth, and auto-generates APIs. Reduces code you need to write.

**If you need maximum control:**
- Next.js + NextAuth v5 + PostgreSQL + Prisma + Stripe + shadcn/ui + Recharts
- Rationale: You own every piece. More setup time but full control over architecture.

**If you're building for enterprise from day one:**
- Next.js + Clerk + PostgreSQL + Prisma + Stripe + shadcn/ui + Tremor + Sentry
- Rationale: Add observability (Sentry), more comprehensive components for B2B features.

## Version Compatibility

| Package | Compatible With | Notes |
|---------|-----------------|-------|
| Next.js 15.x | React 19.x | Requires React 19 minimum. Some third-party libs may have issues. |
| Next.js 15.x | Node.js 18+ | Use Node 20 LTS for best compatibility |
| Prisma 6.x | PostgreSQL 11-16 | Works with all modern PostgreSQL versions |
| @clerk/nextjs | Next.js 14/15 | Use App Router, follow current docs |
| shadcn/ui | Next.js 14/15 + Tailwind 3/4 | Works with both Tailwind versions |
| Tremor 3.x | Next.js 14/15 + Tailwind 3.x | Tailwind 4 support evolving |
| Stripe SDK | Node.js 18+ | Use Stripe Node.js SDK for backend |

**Important:** When using Next.js 15 with React 19, some Radix UI dependencies in shadcn/ui may have compatibility issues. Test thoroughly or consider downgrading to React 18 if you encounter issues:
```bash
npm install react@18 react-dom@18
```

## Marketplace Scalability Considerations

For the eventual marketplace model (Phase 2+):

| Concern | MVP Approach | Marketplace Approach |
|---------|--------------|----------------------|
| Multi-vendor data | Single `tools` table | Separate `vendors` table with RLS |
| Transaction handling | User subscriptions only | Stripe Connect for marketplace payouts |
| Search | Basic PostgreSQL full-text | Algolia or Elasticsearch for advanced search |
| Images/Assets | Supabase Storage or external URLs | Dedicated CDN (CloudFront) for vendor assets |
| API Rate limits | Vercel default | Dedicated API gateway (Cloudflare) |

## Sources

- **Next.js 15 Docs:** https://nextjs.org/docs/app/building-your-application — Official docs, HIGH confidence
- **Clerk Next.js SDK:** https://clerk.com/docs/references/nextjs/overview — Official docs, HIGH confidence
- **Stripe Subscriptions:** https://docs.stripe.com/billing/subscriptions/overview — Official docs, HIGH confidence
- **Prisma Next.js Guide:** https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices — Official docs, HIGH confidence
- **Tremor Docs:** https://tremor.so/docs/visualizations/bar-chart — Official docs, MEDIUM confidence
- **Vercel vs Railway Comparison:** https://www.houseofloops.com/blog/vercel-vs-netlify-vs-railway — Industry analysis, MEDIUM confidence
- **shadcn/ui:** https://ui.shadcn.com/ — Official docs, HIGH confidence

---

*Stack research for: AI Discovery & Subscription Management Platform*
*Researched: 2026-02-14*

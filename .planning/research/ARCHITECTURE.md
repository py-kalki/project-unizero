# Architecture Research

**Domain:** AI Discovery & Subscription Management Platform
**Researched:** 2026-02-14
**Confidence:** MEDIUM

Based on research into SaaS subscription management patterns, marketplace architectures, and multi-tenant application design.

## Standard Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           PRESENTATION LAYER                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │   Explore   │  │   Compare    │  │  Dashboard  │  │   Profile   │     │
│  │    Page     │  │     UI       │  │    Page     │  │    Page     │     │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘     │
│         │                │                │                │              │
│  ┌──────┴────────────────┴────────────────┴────────────────┴──────┐     │
│  │                     State Management (Zustand/Context)              │     │
│  └──────────────────────────────┬─────────────────────────────────────┘     │
└─────────────────────────────────┼───────────────────────────────────────────┘
                                  │
┌─────────────────────────────────┼───────────────────────────────────────────┐
│                           API GATEWAY LAYER                                │
├─────────────────────────────────┼───────────────────────────────────────────┤
│  ┌──────────────────────────────┴─────────────────────────────────────┐    │
│  │              Next.js API Routes / Server Actions                     │    │
│  │    (Auth → Rate Limit → Validation → Controller → Response)          │    │
│  └──────────────────────────────┬─────────────────────────────────────┘    │
└─────────────────────────────────┼───────────────────────────────────────────┘
                                  │
┌─────────────────────────────────┼───────────────────────────────────────────┐
│                           BUSINESS LOGIC LAYER                             │
├─────────────────────────────────┼───────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │   Auth      │  │  AI Tool    │  │ Subscription│  │   Payment   │     │
│  │   Service   │  │   Service   │  │   Service   │  │   Service   │     │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘     │
│         │                │                │                │              │
│  ┌──────┴────────────────┴────────────────┴────────────────┴──────┐     │
│  │              Shared: Validation, Logging, Caching                   │     │
│  └──────────────────────────────┬─────────────────────────────────────┘     │
└─────────────────────────────────┼───────────────────────────────────────────┘
                                  │
┌─────────────────────────────────┼───────────────────────────────────────────┐
│                            DATA ACCESS LAYER                               │
├─────────────────────────────────┼───────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │    User     │  │   AI Tool   │  │  Subscription│  │   Analytics │     │
│  │  Repository │  │  Repository │  │  Repository │  │  Repository │     │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘     │
│         │                │                │                │              │
├─────────┴────────────────┴────────────────┴────────────────┴─────────────┤
│                         DATABASE (PostgreSQL)                               │
│   Tables: users, ai_tools, subscriptions, payments, categories,            │
│           comparisons, favorites, notifications, audit_logs                 │
└─────────────────────────────────────────────────────────────────────────────┘
                                  │
┌─────────────────────────────────┼───────────────────────────────────────────┐
│                        EXTERNAL INTEGRATIONS                                │
├─────────────────────────────────┼───────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │   Stripe    │  │   Email     │  │   AI Tool   │  │  Analytics  │     │
│  │  (Payments) │  │ (Resend/SendGrid) │  (APIs)    │  │ (PostHog)   │     │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘     │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| **Frontend (Next.js)** | UI rendering, client state, API calls | Next.js 14+ App Router, React Server Components |
| **Auth Service** | User authentication, session management, authorization | Supabase Auth / NextAuth.js |
| **AI Tool Service** | CRUD for AI tools, categorization, search indexing | Prisma/Drizzle ORM, PostgreSQL full-text search |
| **Subscription Service** | Track user subscriptions, renewal dates, pricing | PostgreSQL with time-based queries |
| **Payment Service** | Handle payments, webhooks, invoices | Stripe API integration |
| **Analytics Service** | Aggregate spending, generate reports, track usage | PostgreSQL aggregations + caching |
| **Notification Service** | Email reminders, payment alerts | Resend / SendGrid |
| **Comparison Engine** | Side-by-side tool comparison logic | In-memory processing |

## Recommended Project Structure

```
src/
├── app/                        # Next.js App Router pages
│   ├── (auth)/                 # Auth routes (login, register)
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/            # Protected dashboard routes
│   │   ├── dashboard/          # Main spending dashboard
│   │   ├── subscriptions/     # Subscription management
│   │   ├── tools/             # AI tool exploration
│   │   └── compare/           # Comparison feature
│   ├── api/                   # API routes
│   │   ├── auth/              # Auth endpoints
│   │   ├── tools/             # AI tool CRUD
│   │   ├── subscriptions/     # Subscription CRUD
│   │   └── webhooks/          # Stripe webhooks
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Landing page
│
├── components/                 # Reusable UI components
│   ├── ui/                    # Base UI (buttons, inputs, cards)
│   ├── tools/                 # AI tool-specific components
│   ├── subscriptions/         # Subscription components
│   ├── dashboard/             # Dashboard widgets/charts
│   └── compare/               # Comparison UI components
│
├── lib/                        # Core utilities
│   ├── db/                    # Database client & config
│   │   ├── client.ts          # Prisma/DB client
│   │   └── schema.ts          # Database schema
│   ├── auth/                  # Auth utilities
│   │   ├── config.ts          # Auth configuration
│   │   └── utils.ts           # Auth helpers
│   ├── stripe/                # Stripe integration
│   │   ├── client.ts          # Stripe client
│   │   └── webhooks.ts        # Webhook handlers
│   └── utils/                 # General utilities
│
├── services/                   # Business logic layer
│   ├── auth.service.ts        # Authentication logic
│   ├── tool.service.ts        # AI tool operations
│   ├── subscription.service.ts# Subscription management
│   ├── payment.service.ts     # Payment processing
│   ├── analytics.service.ts  # Analytics calculations
│   └── notification.service.ts# Email/notification logic
│
├── repositories/               # Data access layer
│   ├── user.repository.ts
│   ├── tool.repository.ts
│   ├── subscription.repository.ts
│   └── analytics.repository.ts
│
├── types/                      # TypeScript type definitions
│   ├── index.ts               # Global types
│   ├── tools.ts                # Tool-related types
│   ├── subscription.ts        # Subscription types
│   └── user.ts                # User types
│
├── hooks/                      # Custom React hooks
│   ├── useAuth.ts
│   ├── useSubscription.ts
│   ├── useTools.ts
│   └── useAnalytics.ts
│
├── stores/                     # State management
│   └── user-store.ts          # Zustand store
│
└── constants/                  # App constants
    ├── categories.ts           # AI categories
    └── config.ts               # App configuration
```

### Structure Rationale

- **Service Layer Pattern:** Business logic isolated in services, making it testable and maintainable. Services don't know about HTTP - they receive data and return results.
- **Repository Pattern:** Data access abstracted into repositories. If you switch databases later, only repositories change.
- **Feature-First Organization:** Components grouped by feature (tools, subscriptions) rather than type, reducing cognitive load when working on features.
- **API Routes as Thin Controllers:** Keep them minimal - validate, call service, return response. No business logic in routes.
- **Server Actions for Mutations:** Use Next.js Server Actions for form submissions and data mutations - reduces client JavaScript and API overhead.

## Architectural Patterns

### Pattern 1: Multi-Tenant Data Isolation

**What:** Single database with `user_id` column on all user-scoped tables
**When to use:** Individual users (not businesses) - UNIZERO Phase 1
**Trade-offs:** Simpler than full multi-tenancy; works well for personal subscription tracking

```typescript
// Database schema approach
interface Subscription {
  id: string;
  userId: string;           // All queries filter by this
  toolName: string;
  monthlyPrice: number;
  billingCycle: 'monthly' | 'yearly';
  nextBillingDate: Date;
  categoryId: string;
  createdAt: Date;
}

// Query with user isolation
const getUserSubscriptions = async (userId: string) => {
  return db.subscriptions.findMany({
    where: { userId }  // Always filter by userId
  });
};
```

### Pattern 2: Service-Oriented Backend

**What:** Backend organized as independent services with clear interfaces
**When to use:** Medium complexity - enough to separate concerns, not so much you need microservices
**Trade-offs:** Clear boundaries; easier to test; slight overhead for small projects

```typescript
// Example: Subscription Service
class SubscriptionService {
  constructor(
    private db: Database,
    private stripe: StripeClient,
    private notifications: NotificationService
  ) {}

  async addSubscription(userId: string, data: CreateSubscriptionDTO) {
    // Validate
    const tool = await this.db.aiTools.findUnique({ where: { id: data.toolId }});
    if (!tool) throw new Error('Tool not found');

    // Create subscription
    const subscription = await this.db.subscriptions.create({
      data: {
        userId,
        toolId: data.toolId,
        monthlyPrice: tool.defaultPrice,
        billingCycle: data.billingCycle,
        nextBillingDate: calculateNextBillingDate(data.billingCycle),
        categoryId: tool.categoryId
      }
    });

    // Schedule notification
    await this.notifications.scheduleReminder(subscription);

    return subscription;
  }
}
```

### Pattern 3: Event-Driven Analytics Updates

**What:** Analytics calculated from events, not computed on-read
**When to use:** Dashboard with complex aggregations, spending breakdowns
**Trade-offs:** Faster reads; slightly more complex write path; eventual consistency

```typescript
// On subscription create - emit event
await analytics.track('subscription_added', {
  userId,
  toolId,
  category: tool.category,
  price: subscription.monthlyPrice
});

// Analytics service aggregates
class AnalyticsService {
  async getSpendingByCategory(userId: string) {
    return this.db.subscriptions.groupBy({
      by: ['categoryId'],
      where: { userId },
      _sum: { monthlyPrice: true }
    });
  }

  async getTotalMonthlySpend(userId: string) {
    const result = await this.db.subscriptions.aggregate({
      where: { userId },
      _sum: { monthlyPrice: true }
    });
    return result._sum.monthlyPrice || 0;
  }
}
```

### Pattern 4: Optimistic UI with Server Revalidation

**What:** Update UI immediately, then sync with server
**When to use:** Interactive dashboards, subscription management
**Trade-offs:** Snappy feel; must handle sync failures gracefully

```typescript
// Example: Add subscription with optimistic update
const handleAddSubscription = async (tool: AITool) => {
  // 1. Optimistically update UI
  addSubscription({ ...tool, pending: true });

  try {
    // 2. Call server action
    const result = await addSubscriptionAction(tool.id);

    // 3. Update with real data
    updateSubscription(result.id, result);
  } catch (error) {
    // 4. Rollback on failure
    removeSubscription(tool.id);
    toast.error('Failed to add subscription');
  }
};
```

## Data Flow

### Request Flow: Add Subscription

```
[User clicks "Add Subscription"]
         │
         ▼
[Client Component] ──calls──► [Server Action: addSubscriptionAction]
         │                           │
         │                    ┌──────┴──────┐
         │                    ▼             ▼
         │            [Validate Input]  [Check Tool Exists]
         │                    │             │
         │                    └──────┬──────┘
         │                           ▼
         │                    [SubscriptionService.addSubscription()]
         │                           │
         │              ┌────────────┼────────────┐
         │              ▼            ▼            ▼
         │      [DB: Create]  [Stripe: Create]  [Queue: Reminder]
         │              │            │            │
         │              └────────────┴────────────┘
         │                           │
         │                    ┌──────┴──────┐
         │                    ▼             ▼
         │            [revalidatePath]  [Return Result]
         │                           │
         ▼                    ┌──────┴──────┐
[UI Updates via        ◄─── [React Revalidate]
 Server Action]
```

### State Management Flow

```
┌──────────────────┐
│   User Actions   │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐     ┌──────────────────┐
│ Server Actions   │────►│ Database (DB)    │
│ (mutations)      │     │                  │
└────────┬─────────┘     └──────────────────┘
         │
         │ triggers
         ▼
┌──────────────────┐
│ revalidatePath() │────► Page re-renders with fresh data
│ router.refresh() │
└──────────────────┘

For client state (filters, modals):
┌──────────────────┐     ┌──────────────────┐
│   Zustand Store  │◄───►│  React State     │
│   (subscription) │     │  (local UI)      │
└──────────────────┘     └──────────────────┘
```

### Key Data Flows

1. **Tool Discovery Flow:** User browses → API fetches filtered tools → Components render cards → User clicks → Detail page
2. **Subscription Tracking Flow:** User adds subscription → Server validates → DB stores → Analytics updates → Dashboard reflects change
3. **Comparison Flow:** User selects tools → Comparison engine fetches details → Side-by-side view renders → User modifies selection
4. **Payment Reminder Flow:** Background job checks subscriptions → Identifies upcoming renewals → Sends email → Logs notification

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| **0-1k users** | Single Next.js instance, PostgreSQL, single DB connection pool. Monolith is fine. |
| **1k-100k users** | Add Redis caching for frequently accessed tools. Consider read replicas. Implement API rate limiting. |
| **100k-1M users** | Service separation for high-traffic components. CDN for static assets. Background job queue (BullMQ). Move to dedicated analytics DB. |

### Scaling Priorities

1. **First bottleneck: Database queries**
   - Problem: N+1 queries, missing indexes on category/user filters
   - Fix: Add proper indexes, use Prisma's `include` for relations, implement pagination

2. **Second bottleneck: Analytics calculations**
   - Problem: Complex aggregations slow down dashboard
   - Fix: Pre-compute analytics nightly, cache results, use materialized views

3. **Third bottleneck: Search performance**
   - Problem: Full-text search on large tool catalog
   - Fix: PostgreSQL full-text search → Algolia/Meilisearch when needed

### Marketplace Scaling Path

For Phase 2+ (marketplace with vendor tools):

```
Current (v1)          →      Marketplace (v2)
─────────────────────────────────────────────────
Single-tenant data    →      Multi-tenant data (vendor_id)
User-subscribed tools →      Vendor-listed tools + revenue share
Static tool catalog   →      Dynamic vendor submissions
Simple pricing        →      Multiple pricing models (usage, tiered)
Internal analytics    →      Vendor analytics dashboard
```

## Anti-Patterns

### Anti-Pattern 1: Business Logic in API Routes

**What people do:** Put validation, calculations, database operations all in `app/api/route.ts`
**Why it's wrong:** Hard to test, duplicates logic, mix of concerns
**Do this instead:** Use thin controllers that call services with business logic

### Anti-Pattern 2: Storing Prices Without Currency

**What people do:** `monthlyPrice: number` without currency field
**Why it's wrong:** AI tools priced in different currencies; display breaks when expanding internationally
**Do this instead:** Always store currency code: `{ amount: number; currency: string }`

### Anti-Pattern 3: Real-time Analytics Computation

**What people do:** Calculate total spend on every dashboard page load
**Why it's wrong:** Aggregates require full table scans; becomes slow with hundreds of subscriptions
**Do this instead:** Pre-compute and cache analytics; update on subscription changes

### Anti-Pattern 4: Coupling UI to Database Schema

**What people do:** Component directly uses Prisma types in props
**Why it's wrong:** Schema changes break UI components throughout app
**Do this instead:** Define TypeScript interfaces in `/types`; map DB to interfaces at service layer

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| **Stripe** | Webhooks + API | Use Stripe Checkout for new subscriptions; webhooks for renewal tracking |
| **Supabase Auth** | SDK + cookies | Next.js middleware for session refresh; server actions for auth |
| **Resend/SendGrid** | API | Transactional emails for reminders; template-based |
| **PostHog** | Client-side events | Analytics, feature flags, user identification |
| **AI Tool APIs** | Direct (future) | For auto-fetching tool pricing/features |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| **Frontend ↔ Backend** | Server Actions + REST | Server Actions for mutations; fetch for data |
| **Services ↔ Database** | Prisma/Drizzle | Repositories abstract data access |
| **Services ↔ External** | SDK clients | Injected into services for testability |
| **Background Jobs** | Queue (Redis/BullMQ) | Email reminders, analytics updates |

## Database Schema (Core Tables)

```sql
-- Users table (extends Supabase auth.users)
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT NOT NULL,
  name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- AI Tool Categories
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,  -- 'LLMs', 'Image Generation', 'Coding', etc.
  slug TEXT NOT NULL UNIQUE,
  icon TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- AI Tools (curated catalog)
CREATE TABLE ai_tools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  website_url TEXT NOT NULL,
  logo_url TEXT,
  category_id UUID REFERENCES categories(id),
  pricing_type TEXT NOT NULL DEFAULT 'freemium',  -- 'free', 'freemium', 'paid'
  monthly_price DECIMAL(10,2),
  yearly_price DECIMAL(10,2),
  features JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User Subscriptions (what user is tracking/paying for)
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  tool_id UUID NOT NULL REFERENCES ai_tools(id),
  tool_name TEXT NOT NULL,  -- Denormalized for ease
  monthly_price DECIMAL(10,2) NOT NULL,
  billing_cycle TEXT NOT NULL DEFAULT 'monthly',  -- 'monthly', 'yearly'
  start_date DATE NOT NULL,
  next_billing_date DATE NOT NULL,
  category_id UUID REFERENCES categories(id),
  is_active BOOLEAN DEFAULT TRUE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User Favorites (bookmarked tools)
CREATE TABLE favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  tool_id UUID NOT NULL REFERENCES ai_tools(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, tool_id)
);

-- Notifications/Reminders
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  subscription_id UUID REFERENCES subscriptions(id),
  type TEXT NOT NULL,  -- 'reminder', 'renewal', 'price_change'
  scheduled_for TIMESTAMPTZ NOT NULL,
  sent_at TIMESTAMPTZ,
  content TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for common queries
CREATE INDEX idx_subscriptions_user ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_user_active ON subscriptions(user_id) WHERE is_active = TRUE;
CREATE INDEX idx_subscriptions_category ON subscriptions(category_id);
CREATE INDEX idx_ai_tools_category ON ai_tools(category_id);
CREATE INDEX idx_favorites_user ON favorites(user_id);
```

## Build Order (Dependencies)

```
Phase 1: Foundation
───────────────────
1. Database Schema + Prisma setup
   └─> All other features depend on data model

2. Auth (Supabase + Next.js middleware)
   └─> All protected routes depend on auth

3. Basic UI Components
   └─> All pages depend on components

Phase 2: Core Features
─────────────────────
4. AI Tool Catalog + Search
   └─> Discovery and comparison depend on this

5. Subscription Tracking (CRUD)
   └─> Dashboard depends on subscriptions

6. Dashboard + Analytics
   └─> Depends on subscription data

Phase 3: Enhancement
───────────────────
7. Comparison Feature
   └─> Depends on tool catalog

8. Notifications/Reminders
   └─> Depends on subscriptions

9. Favorites/Bookmarks
   └─> Depends on tools + users

Phase 4: Scale (Future)
──────────────────────
10. Payment Integration (Stripe)
11. Vendor Portal
12. Marketplace Features
```

## Sources

- **Multi-tenant architecture:** Achromatic.dev (2025) - https://www.achromatic.dev/blog/multi-tenant-architecture-nextjs
- **SaaS subscription patterns:** Stripe Developer Blog (2025) - https://stripe.dev/blog/aws-microservice-architecture-subscription-management
- **Database schema patterns:** AppMaster (2025) - https://appmaster.io/blog/plans-entitlements-database-schema
- **Next.js SaaS patterns:** Vladimir Siedykh (2025) - https://vladimirsiedykh.com/blog/saas-architecture-patterns-nextjs
- **Marketplace architecture:** Ulan Software (2026) - https://ulansoftware.com/blog/marketplace-software-architecture-trends-2025

---

*Architecture research for: UNIZERO - AI Discovery & Subscription Management Platform*
*Researched: 2026-02-14*

# UNIZERO Roadmap

**Project:** UNIZERO - AI Discovery & Subscription Management Platform  
**Core Value:** One platform to discover, compare, and manage all AI tools — and eventually buy/sell them in one place.  
**Depth:** Comprehensive (8-12 phases)  
**Total v1 Requirements:** 27

---

## Overview

This roadmap delivers UNIZERO in 9 phases, progressing from infrastructure through core features to analytics and comparison. Each phase delivers a complete, verifiable capability. The structure respects dependencies: authentication must precede user-specific features, discovery feeds comparison, and subscription data powers the dashboard.

---

## Phase Structure

| Phase                         | Goal                                                   | Dependencies        | Requirements       |
| ----------------------------- | ------------------------------------------------------ | ------------------- | ------------------ |
| 1 - Foundation                | Project infrastructure (database, auth, UI components) | None                | SETUP-01, SETUP-02 |
| 2 - Authentication            | Users can securely create accounts and log in          | None                | AUTH-01 to AUTH-07 |
| 3 - AI Discovery Core         | Users can browse and search AI tool catalog            | None                | DISC-01 to DISC-06 |
| 4 - Subscription Core         | Users can add, view, edit, delete subscriptions        | Phase 2 (Auth)      | SUB-01 to SUB-04   |
| 5 - Subscription Calculations | Users see spending totals and can set reminders        | Phase 4             | SUB-05 to SUB-08   |
| 6 - Dashboard Core            | Users see total spending and subscription counts       | Phase 5             | DASH-01, DASH-04   |
| 7 - Analytics Dashboard       | Users see spending breakdown and upcoming payments     | Phase 6             | DASH-02, DASH-03   |
| 8 - Comparison                | Users can compare AI tools side-by-side                | Phase 3 (Discovery) | COMP-01 to COMP-03 |
| 9 - Polish                    | Edge cases, performance, cleanup                       | All prior           | —                  |

---

## Phase Details

### Phase 1: Foundation

**Goal:** Project infrastructure is ready for feature development — database schema, authentication setup, and base UI components.

**Requirements:** SETUP-01, SETUP-02

**Success Criteria (4):**

1. Project scaffolded with Next.js 15, TypeScript, Tailwind CSS
2. PostgreSQL database configured with Prisma ORM
3. Clerk authentication integrated with Next.js App Router
4. Base UI component library (shadcn/ui) installed and configured

**Plans:** 2 plans

**Plan List:**

- [ ] 01-01-PLAN.md — Scaffold Next.js 15 project with TypeScript and Tailwind
- [ ] 01-02-PLAN.md — Complete infrastructure (Prisma, Clerk, shadcn/ui, dev tools)

---

### Phase 2: Authentication

**Goal:** Users can securely create accounts and access the platform with persistent sessions.

**Requirements:** AUTH-01, AUTH-02, AUTH-03, AUTH-04, AUTH-05, AUTH-06, AUTH-07

**Success Criteria (5):**

1. User can sign up with email and password
2. User can sign in with email/password, Google, or GitHub OAuth
3. User session persists across browser refresh (stays logged in)
4. User can sign out from any page in the application
5. User can reset forgotten password via email link

**Plans:** 2 plans

**Plan List:**

- [ ] 02-01-PLAN.md — Create custom auth pages (sign-in, sign-up, forgot-password) and user button
- [ ] 02-02-PLAN.md — Configure OAuth providers (Google, GitHub) in Clerk Dashboard

---

### Phase 3: AI Discovery Core

**Goal:** Users can browse, search, and filter the AI tool catalog to discover tools.

**Requirements:** DISC-01, DISC-02, DISC-03, DISC-04, DISC-05, DISC-06

**Success Criteria (5):**

1. User can browse AI tools organized by category (LLMs, Image/Video, Productivity, Audio, Coding)
2. User can search AI tools by name
3. User can filter tools by category
4. User can filter tools by pricing model (free, freemium, subscription, per-token)
5. User can view detailed tool pages with name, description, pricing, website link

---

### Phase 4: Subscription Core

**Goal:** Users can manage their personal AI subscriptions with full CRUD operations.

**Requirements:** SUB-01, SUB-02, SUB-03, SUB-04

**Success Criteria (4):**

1. User can add a subscription manually (select tool or enter custom, enter cost, select billing cycle)
2. User can view list of all their tracked subscriptions
3. User can edit subscription details (cost, billing date, billing cycle)
4. User can delete a subscription

---

### Phase 5: Subscription Calculations

**Goal:** Users see automatic spending calculations and can set payment reminders.

**Requirements:** SUB-05, SUB-06, SUB-07, SUB-08

**Success Criteria (3):**

1. System displays total monthly spending automatically
2. System displays total yearly spending automatically
3. User can set payment reminder (days before billing) and receives in-app notification

---

### Phase 6: Dashboard Core

**Goal:** Users see their primary spending metrics and subscription status overview.

**Requirements:** DASH-01, DASH-04

**Success Criteria (2):**

1. Dashboard displays total monthly AI spending
2. Dashboard shows subscription count by status (active, expiring soon)

---

### Phase 7: Analytics Dashboard

**Goal:** Users gain insight into spending patterns through category breakdowns.

**Requirements:** DASH-02, DASH-03

**Success Criteria (2):**

1. Dashboard displays spending breakdown by category (pie or bar chart)
2. Dashboard displays list of upcoming payments with dates

---

### Phase 8: Comparison

**Goal:** Users can compare AI tools side-by-side to make informed decisions.

**Requirements:** COMP-01, COMP-02, COMP-03

**Success Criteria (3):**

1. User can select 2-3 tools and view them side-by-side
2. Comparison view shows pricing models side-by-side
3. Comparison view shows features side-by-side

---

### Phase 9: Polish

**Goal:** Platform is production-ready with edge cases handled and performance optimized.

**Requirements:** — (cross-cutting)

**Success Criteria (3):**

1. All forms have proper validation and error handling
2. Loading states and empty states handled for all views
3. Responsive design works on mobile, tablet, and desktop

---

## Coverage

### Requirements Mapping

| Requirement | Phase   | Status  |
| ----------- | ------- | ------- |
| AUTH-01     | Phase 2 | Pending |
| AUTH-02     | Phase 2 | Pending |
| AUTH-03     | Phase 2 | Pending |
| AUTH-04     | Phase 2 | Pending |
| AUTH-05     | Phase 2 | Pending |
| AUTH-06     | Phase 2 | Pending |
| AUTH-07     | Phase 2 | Pending |
| DISC-01     | Phase 3 | Pending |
| DISC-02     | Phase 3 | Pending |
| DISC-03     | Phase 3 | Pending |
| DISC-04     | Phase 3 | Pending |
| DISC-05     | Phase 3 | Pending |
| DISC-06     | Phase 3 | Pending |
| SUB-01      | Phase 4 | Pending |
| SUB-02      | Phase 4 | Pending |
| SUB-03      | Phase 4 | Pending |
| SUB-04      | Phase 4 | Pending |
| SUB-05      | Phase 5 | Pending |
| SUB-06      | Phase 5 | Pending |
| SUB-07      | Phase 5 | Pending |
| SUB-08      | Phase 5 | Pending |
| DASH-01     | Phase 6 | Pending |
| DASH-02     | Phase 7 | Pending |
| DASH-03     | Phase 7 | Pending |
| DASH-04     | Phase 6 | Pending |
| COMP-01     | Phase 8 | Pending |
| COMP-02     | Phase 8 | Pending |
| COMP-03     | Phase 8 | Pending |

**Coverage:** 27/27 requirements mapped ✓

---

## Progress

| Phase | Name                      | Requirements | Status   |
| ----- | ------------------------- | ------------ | -------- |
| 1     | Foundation                | 2            | Complete |
| 2     | Authentication            | 7            | Planned  |
| 3     | AI Discovery Core         | 6            | Pending  |
| 4     | Subscription Core         | 4            | Pending  |
| 5     | Subscription Calculations | 4            | Pending  |
| 6     | Dashboard Core            | 2            | Pending  |
| 7     | Analytics Dashboard       | 2            | Pending  |
| 8     | Comparison                | 3            | Pending  |
| 9     | Polish                    | —            | Pending  |

**Overall:** 0/9 phases complete

---

_Roadmap created: 2026-02-14_
_Plans created: 2 plans for Phase 1 (Foundation)_
_Next: `/gsd-execute-phase 1` to execute Phase 1_

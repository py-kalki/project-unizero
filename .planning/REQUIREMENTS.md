# Requirements: UNIZERO

**Defined:** 2026-02-14
**Core Value:** One platform to discover, compare, and manage all AI tools — and eventually buy/sell them in one place.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Authentication

- [ ] **AUTH-01**: User can sign up with email and password
- [ ] **AUTH-02**: User can sign in with email and password
- [ ] **AUTH-03**: User can sign in with Google OAuth
- [ ] **AUTH-04**: User can sign in with GitHub OAuth
- [ ] **AUTH-05**: User session persists across browser refresh
- [ ] **AUTH-06**: User can sign out from any page
- [ ] **AUTH-07**: User can reset password via email link

### AI Discovery

- [ ] **DISC-01**: User can browse AI tools by category (LLMs, Image/Video, Productivity, Audio, Coding, etc.)
- [ ] **DISC-02**: User can search AI tools by name
- [ ] **DISC-03**: User can filter AI tools by category
- [ ] **DISC-04**: User can filter AI tools by pricing model (free, freemium, subscription, per-token)
- [ ] **DISC-05**: User can view AI tool detail page with name, description, pricing, website link
- [ ] **DISC-06**: User can see AI tools data (at least 50 curated tools) on launch

### Subscription Management

- [ ] **SUB-01**: User can add a subscription manually (select tool or enter custom, enter cost, select billing cycle)
- [ ] **SUB-02**: User can view list of their subscriptions
- [ ] **SUB-03**: User can edit subscription details (cost, billing date, billing cycle)
- [ ] **SUB-04**: User can delete a subscription
- [ ] **SUB-05**: System calculates total monthly spending automatically
- [ ] **SUB-06**: System calculates total yearly spending automatically
- [ ] **SUB-07**: User can set payment reminder for a subscription (days before billing date)
- [ ] **SUB-08**: User receives in-app notification for payment reminders

### Dashboard

- [ ] **DASH-01**: User can view dashboard with total monthly AI spending
- [ ] **DASH-02**: User can view spending breakdown by category
- [ ] **DASH-03**: User can view list of upcoming payments
- [ ] **DASH-04**: User can view subscription count by status (active, expiring soon)

### Comparison

- [ ] **COMP-01**: User can compare 2-3 AI tools side-by-side
- [ ] **COMP-02**: User can compare pricing models between tools
- [ ] **COMP-03**: User can compare features between tools

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Authentication

- **AUTH-08**: Multi-device session management
- **AUTH-09**: Two-factor authentication (2FA)

### AI Discovery

- **DISC-07**: Side-by-side comparison with favorites
- **DISC-08**: Personalized recommendations based on usage
- **DISC-09**: User can submit new AI tools for inclusion
- **DISC-10**: AI tool price change alerts

### Subscription Management

- **SUB-09**: Automatic subscription sync via API integrations
- **SUB-10**: Subscription upgrade/downgrade tracking
- **SUB-11**: Export subscriptions to CSV/Excel
- **SUB-12**: Email notifications for payment reminders

### Comparison

- **COMP-04**: Use-case-based comparison
- **COMP-05**: Decision guidance (which tool for what use case)
- **COMP-06**: Feature scoring and ranking

### Business Features

- **BIZ-01**: Team/organization management
- **BIZ-02**: Team spending dashboard
- **BIZ-03**: Bulk subscription management

### Marketplace (v3)

- **MKT-01**: Vendor/developer portal for listing AI tools
- **MKT-02**: In-app purchase of AI subscriptions
- **MKT-03**: Revenue sharing and payouts
- **MKT-04**: Vendor analytics dashboard

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| AI tool API integrations for auto-sync | High complexity, defer to v2 |
| User reviews/ratings | Not core to value proposition, defer to v2 |
| AI recommendation engine | Requires user data first, defer to v2 |
| Social features (follow, share) | Not core to value proposition, defer to v2 |
| Business/team features | Focus on individuals first, defer to v2 |
| Marketplace/reselling | Major feature, defer to v2+ |
| Mobile app | Web-first, mobile later |
| Browser extension | Not core to value proposition |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| AUTH-01 | Phase X | Pending |
| AUTH-02 | Phase X | Pending |
| AUTH-03 | Phase X | Pending |
| AUTH-04 | Phase X | Pending |
| AUTH-05 | Phase X | Pending |
| AUTH-06 | Phase X | Pending |
| AUTH-07 | Phase X | Pending |
| DISC-01 | Phase X | Pending |
| DISC-02 | Phase X | Pending |
| DISC-03 | Phase X | Pending |
| DISC-04 | Phase X | Pending |
| DISC-05 | Phase X | Pending |
| DISC-06 | Phase X | Pending |
| SUB-01 | Phase X | Pending |
| SUB-02 | Phase X | Pending |
| SUB-03 | Phase X | Pending |
| SUB-04 | Phase X | Pending |
| SUB-05 | Phase X | Pending |
| SUB-06 | Phase X | Pending |
| SUB-07 | Phase X | Pending |
| SUB-08 | Phase X | Pending |
| DASH-01 | Phase X | Pending |
| DASH-02 | Phase X | Pending |
| DASH-03 | Phase X | Pending |
| DASH-04 | Phase X | Pending |
| COMP-01 | Phase X | Pending |
| COMP-02 | Phase X | Pending |
| COMP-03 | Phase X | Pending |

**Coverage:**
- v1 requirements: 27 total
- Mapped to phases: 0
- Unmapped: 27 ⚠️

---
*Requirements defined: 2026-02-14*
*Last updated: 2026-02-14 after initial definition*

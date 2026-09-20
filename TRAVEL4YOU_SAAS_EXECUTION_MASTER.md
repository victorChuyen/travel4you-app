# TRAVEL4YOU — SaaS Execution Master

> **Document type:** Product + Architecture + Execution Source of Truth  
> **Version:** 3.0 — OPC SaaS War Plan  
> **Status:** APPROVED FOR EXECUTION  
> **Owner:** Lucky — AI CEO / Co-founder  
> **Founder / Chairman:** Victor  
> **Target repository path:** `D:\n8n-selfhost\travel4you.app\TRAVEL4YOU_SAAS_EXECUTION_MASTER.md`  
> **Related baseline:** `TECHNICAL_ARCHITECTURE.md` v2.0-Sovereign-Luxury  
> **Effective date:** 2026-09-19

---

## 0. EXECUTIVE ORDER

Travel4You is moving from a luxury travel content + affiliate website into a **SaaS Hub / AI Travel Business OS**.

We do **not** rebuild the current public website from scratch. The existing Astro/Cloudflare/SEO/content engine remains the acquisition layer. We add an authenticated SaaS application, recurring billing, workspaces, AI generation, publishing, analytics, and later agency/partner capabilities.

### 60-day North Star

**Goal:** reach **1,000 monthly paying users within 60 days**.

This is an aggressive operating target, not a guaranteed outcome. The execution model is designed to maximize speed of learning, paid conversion, and recurring revenue.

### OPC operating model

Travel4You operates as an **OPC — One Person Company amplified by AI and automation**.

- **Victor — Founder / Chairman**
  - Sets vision, strategic direction, brand standards, capital constraints, and partner priorities.
  - Reviews high-impact decisions involving legal obligations, real money, contracts, brand risk, or irreversible commitments.
- **Lucky — AI CEO / Co-founder**
  - Owns product architecture, technical architecture, prioritization, pricing experiments, growth system design, execution sequencing, automation, and operating cadence.
  - May make day-to-day product/technical decisions without waiting for approval when they remain inside the approved strategic direction.
- **Dev Team / AI Dev Agents**
  - Execute against this file and the current Technical Architecture baseline.
  - Must not invent product scope that conflicts with this document.

### Core execution doctrine

**Sell → Learn → Build → Automate → Scale.**

Do not optimize for feature count. Optimize for:

1. Activation.
2. Paid conversion.
3. MRR.
4. Retention.
5. Low operational load.
6. Low AI cost per active paid user.
7. Distribution loops that create the next user.

---

# 1. CURRENT SYSTEM — KEEP THE ADVANTAGE

The current project already provides a strong acquisition foundation:

- Astro 5.x static-first website.
- TailwindCSS visual system.
- Cloudflare Pages global delivery.
- Cloudflare Pages Functions for outbound affiliate redirect/tracking.
- Structured JSON content engine for destinations, articles, and i18n.
- Google Sheets API used as an editorial/command surface.
- 12-language SEO/localization foundation.
- Existing affiliate commerce path to GetYourGuide.
- Existing automated build/deploy workflow through Git/GitHub/Cloudflare.

### Decision: public website remains the acquisition engine

The following must remain fast, crawlable, indexable, and static-first:

- Destination hubs.
- Experience pages.
- SEO articles.
- Public landing pages.
- Pricing page.
- Template gallery.
- Free tools that are intentionally indexable.

Do **not** convert the full public site into a heavyweight SPA.

### New platform split

```text
travel4you.app
├── Public SEO / Luxury Discovery Engine
├── Pricing
├── Templates
├── Free Tools
└── Login / Start CTA

app.travel4you.app
└── Authenticated SaaS Workspace

api.travel4you.app OR /api/*
└── Application API / webhooks / AI jobs

Future:
partners.travel4you.app
└── Partner / supplier portal
```

## Public VIP lead capture

The public acquisition layer includes a localized footer concierge CTA that
posts to `/api/leads`. The Cloudflare Pages Function validates bounded contact
fields, rejects the honeypot, applies an optional `RATE_LIMITER` binding (with
a best-effort isolate fallback), and writes through Supabase service role only.
`public.leads` is protected by RLS: anonymous clients cannot read or insert
lead data, while authenticated workspace members can read only leads assigned
to their workspace. Telegram notifications are intentionally not part of this
flow until a reviewed helper exists.

For the first 60 days, deployment may remain in the same repository and Cloudflare project if this reduces operational complexity.

---

# 2. PRODUCT POSITIONING

## 2.1 Category

**Travel4You = Luxury Travel AI OS.**

External short positioning:

> **Turn a destination idea into a premium travel product, itinerary and publishable client experience with AI.**

The platform is built around three engines:

```text
DISCOVERY ENGINE
SEO + destinations + luxury experiences

INTELLIGENCE ENGINE
AI generation + personalization + trip context

COMMERCE ENGINE
Subscriptions + affiliate + partners + future marketplace
```

## 2.2 Customer order for the first 60 days

### Primary paying ICP

1. Travel creators.
2. Independent travel advisors.
3. Small travel agencies.
4. DMC / local travel operators.

### Secondary ICP

5. Premium travelers.

### Why this order

B2B/prosumer users have:

- Higher willingness to pay.
- Recurring workflows.
- Repeat content and itinerary creation.
- Natural need for client-facing output.
- Better expansion revenue through seats, white-label, usage, and agency tiers.

B2C remains strategically important for traffic, affiliate revenue, data, and later subscription expansion, but B2C subscription is not the only MRR engine.

---

# 3. THE WEDGE PRODUCT — WHAT WE SELL FIRST

## 3.1 Core object: Travel Project

The first paid product centers on one core object:

**Travel Project**

A Travel Project can represent:

- A creator's destination product.
- A travel advisor's itinerary for a client.
- An agency's reusable travel package.
- A premium traveler's personal trip.

## 3.2 First value flow

```text
Sign up
  ↓
Create Workspace
  ↓
Create Travel Project
  ↓
Enter destination + audience + preferences
  ↓
AI generates structured project
  ↓
User edits
  ↓
Publish / Share
  ↓
Affiliate / booking CTA
  ↓
Analytics
  ↓
Upgrade / continue using
```

## 3.3 Minimum valuable AI output

A generated project should be capable of producing:

- Project title and positioning.
- Destination summary.
- Day-by-day itinerary.
- Recommended experiences.
- Dining / activity recommendations when the content source supports them.
- Practical notes.
- Client-facing share page.
- SEO/landing-page copy where applicable.
- Social copy variants later.
- Localization later through controlled language generation.

The user must be able to edit all generated content before publication.

---

# 4. 60-DAY PRODUCT SCOPE

## P0 — Must exist to charge money

- Authentication.
- User profile.
- Workspace.
- Workspace membership.
- Travel Project CRUD.
- AI generation workflow.
- AI usage metering.
- Draft/edit state.
- Public/shareable project page.
- Plan catalog.
- Entitlement engine.
- Checkout.
- Subscription status sync.
- Usage limits.
- Basic product analytics.
- Basic transactional email.
- Error monitoring.
- Audit trail for billing/plan changes.

## P1 — Needed to improve paid conversion and retention

- Project templates.
- Duplicate project.
- Export/print-friendly output.
- Branded share page.
- Custom logo for Pro/Agency.
- Multi-language generation.
- Project collaboration.
- Client view mode.
- Affiliate CTA instrumentation.
- Referral link.
- Onboarding checklist.
- Upgrade prompts tied to actual entitlements.

## P2 — After paid traction

- Full CRM.
- Supplier marketplace.
- Inventory management.
- Native mobile apps.
- Complex booking engine.
- Financial ERP.
- Deep enterprise permissions.
- Massive partner portal.
- Commission accounting system.

P2 features must not delay first revenue.

---

# 5. PRICING HYPOTHESES FOR TESTING

These prices are **test hypotheses**. They may change based on conversion, churn, usage cost, and customer interviews.

| Plan | Initial test price | Core audience | Purpose |
|---|---:|---|---|
| Free | $0 | New users | Acquisition + activation |
| Creator | $29/month | Creator / solo user | Volume paid conversion |
| Pro | $99/month | Advisor / power creator | Higher usage + professional outputs |
| Agency | $299/month | Small agency / DMC | Team + clients + branding |
| Enterprise | Custom | Larger organizations | Not a 60-day priority |

Possible future monetization:

- Annual plans.
- AI usage packs.
- Additional seats.
- White-label fee.
- Premium templates.
- Affiliate revenue.
- Referral/revenue share.
- Partner placement.
- API access.

### Important billing rule

Never hard-code logic such as:

```text
if plan == premium
```

Use **entitlements** instead.

Example:

```text
projects_monthly = 10
ai_generations_monthly = 50
languages = 3
team_members = 1
custom_branding = false
export_pdf = false
public_publish = true
api_access = false
```

Plans are bundles of entitlements. Product logic checks entitlements, not marketing plan names.

---

# 6. TECHNICAL ARCHITECTURE V3

## 6.1 Architecture principles

1. Keep public pages static-first.
2. Keep application state server-authoritative.
3. Use PostgreSQL as SaaS transactional source of truth.
4. Keep Google Sheets as an editorial/admin surface only where useful.
5. Multi-tenant by workspace from day one.
6. Meter AI usage from day one.
7. Billing provider must be abstracted.
8. Every webhook must be idempotent.
9. Every background AI task must be retry-safe.
10. Do not expose provider keys or privileged service credentials to the browser.
11. Every public share resource must have an explicit visibility model.
12. Production operations must require minimal manual intervention.

## 6.2 Recommended 60-day stack

### Public web

- Existing Astro 5.x.
- Existing TailwindCSS.
- Existing Cloudflare Pages deployment.

### SaaS UI

Fastest path:

- Keep the same repository.
- Use Astro shell + React islands/components for interactive application areas.
- SaaS routes live under the authenticated app surface.
- If subdomain routing creates unnecessary launch delay, `/app` is acceptable for V1; subdomain separation can follow without rewriting domain logic.

### Runtime/API

- Cloudflare Pages Functions / Workers.
- API routes under `/api/*` or dedicated API subdomain.
- Webhooks run server-side only.

### Transactional database

- PostgreSQL managed service.
- Recommended operating profile: hosted PostgreSQL with connection pooling and backups.
- Database is the source of truth for users, workspaces, projects, subscriptions, entitlements, usage, publications and events.

### Authentication

- Managed auth preferred over building auth from scratch.
- Must support:
  - Email login.
  - Passwordless or secure credential flow.
  - Session management.
  - Email verification.
  - Password reset if passwords are used.
  - OAuth can be added after core flow.

### Storage

- Cloudflare R2 for generated assets/media where object storage is required.
- Existing static media can remain in current public structure until migration is justified.

### AI layer

Implement provider abstraction:

```text
AIProvider
├── generateStructuredProject()
├── generateSection()
├── translateProject()
├── estimateUsage()
└── healthCheck()
```

AI output that feeds product state must use structured validation before persistence.

Never make business-critical behavior depend on free-form text parsing if a structured schema can be used.

### Background jobs

Use queue-backed jobs for long-running generation when needed.

Job requirements:

- Unique job id.
- Workspace id.
- User id.
- Project id.
- Job type.
- Requested model/provider class.
- Status.
- Retry count.
- Input token/usage estimate if available.
- Actual usage/cost metadata if available.
- Created/started/completed timestamps.
- Error summary.

### Analytics

Track product events server-side and/or through a dedicated analytics service.

Minimum events are defined later in this document.

### Billing

Implement a `BillingProvider` adapter so the codebase is not structurally coupled to one vendor.

The production provider must be one that the operating legal entity can lawfully use for recurring global SaaS payments.

Required billing capabilities:

- Checkout.
- Recurring subscriptions.
- Upgrade/downgrade.
- Cancellation.
- Payment status.
- Webhooks.
- Customer portal or equivalent account management.
- Invoice/receipt support.

Do not enable real-money production billing until legal/business account requirements are verified by Victor.

---

# 7. TARGET SYSTEM MAP

```text
                         TRAFFIC
                            │
          ┌─────────────────┴─────────────────┐
          │                                   │
   PUBLIC TRAVEL4YOU                   REFERRAL / DIRECT
   Astro SSG / SEO                            │
          │                                   │
          └─────────────────┬─────────────────┘
                            │
                         SIGN UP
                            │
                     AUTHENTICATED APP
                            │
                    ┌───────┴────────┐
                    │                │
                WORKSPACE        BILLING
                    │                │
                PROJECTS        ENTITLEMENTS
                    │                │
                    └───────┬────────┘
                            │
                       AI ORCHESTRATOR
                            │
                  ┌─────────┴─────────┐
                  │                   │
             JOB / QUEUE          KNOWLEDGE
                  │                   │
                  └─────────┬─────────┘
                            │
                        POSTGRESQL
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
   PUBLICATION          ANALYTICS           COMMERCE
        │                   │                   │
   Share pages          Funnel/MRR         Affiliate CTA
```

---

# 8. MULTI-TENANT DATA MODEL

## 8.1 Ownership rule

**Business data belongs to a Workspace, not directly to a User.**

A user may be a member of one or more workspaces.

```text
User
  ↓ membership
Workspace
  ↓ owns
Projects / Clients / Assets / Billing context
```

## 8.2 Core entities — Sprint 001

### `users`

- id
- auth_subject / auth provider reference
- email
- display_name
- avatar_url
- status
- created_at
- updated_at

### `workspaces`

- id
- name
- slug
- type (`personal`, `creator`, `agency`, future values)
- owner_user_id
- status
- created_at
- updated_at

### `workspace_members`

- id
- workspace_id
- user_id
- role (`owner`, `admin`, `member`, `viewer`)
- status
- invited_at
- joined_at

### `projects`

- id
- workspace_id
- created_by_user_id
- project_type
- title
- destination
- audience
- locale
- status (`draft`, `generating`, `ready`, `published`, `archived`)
- visibility (`private`, `unlisted`, `public`)
- created_at
- updated_at

### `project_versions`

- id
- project_id
- version_number
- structured_content_json
- source (`user`, `ai`, `import`)
- created_by_user_id
- created_at

### `ai_jobs`

- id
- workspace_id
- project_id
- user_id
- job_type
- status
- provider_key
- model_class
- input_metadata_json
- output_metadata_json
- usage_json
- retry_count
- error_code
- created_at
- started_at
- completed_at

### `plans`

- id
- code
- name
- active
- billing_period
- price_reference

### `entitlements`

- id
- code
- description
- value_type

### `plan_entitlements`

- plan_id
- entitlement_id
- value_json

### `subscriptions`

- id
- workspace_id
- billing_provider
- external_customer_id
- external_subscription_id
- plan_id
- status
- current_period_start
- current_period_end
- cancel_at_period_end
- created_at
- updated_at

### `usage_counters`

- id
- workspace_id
- entitlement_code
- period_key
- quantity
- updated_at

### `publications`

- id
- project_id
- workspace_id
- slug
- visibility
- published_version_id
- published_at
- updated_at

### `events`

- id
- user_id nullable
- workspace_id nullable
- session_id nullable
- event_name
- entity_type nullable
- entity_id nullable
- properties_json
- created_at

### `audit_logs`

- id
- workspace_id nullable
- actor_user_id nullable
- actor_type
- action
- entity_type
- entity_id
- metadata_json
- created_at

---

# 9. SECURITY / TENANCY RULES

These are non-negotiable.

1. Every workspace-owned query must be scoped by `workspace_id`.
2. User membership must be validated server-side.
3. Browser-supplied workspace ownership is never trusted without server validation.
4. Admin/service credentials never appear in client bundles.
5. Public project routes expose only explicitly published versions.
6. Unlisted links must not be discoverable through sequential IDs.
7. Private projects must never be returned from public endpoints.
8. Billing webhooks require signature verification.
9. Webhook processing must be idempotent.
10. AI prompt input must not automatically include unrelated workspace data.
11. Audit plan changes, billing events, workspace role changes, and publication changes.
12. Secrets belong in platform secret storage, never source control.

---

# 10. AI PRODUCT RULES

## 10.1 AI is a system component, not the database

Persist structured project state in the database.

AI may propose or generate content. The application owns the final stored state.

## 10.2 Human-editable by default

Generated content is a draft until saved/published by the user, except for explicitly automated actions later approved by product design.

## 10.3 Usage must be measurable

For every billable generation, record enough metadata to support:

- Usage totals.
- Entitlement enforcement.
- Cost analysis.
- Failure rate.
- Latency analysis.
- Abuse detection.

## 10.4 Provider abstraction

Business domain code must not spread provider-specific request syntax throughout the app.

Use one AI orchestration layer.

## 10.5 Structured generation

For core project generation, target structured output such as:

```json
{
  "project": {},
  "summary": {},
  "days": [],
  "experiences": [],
  "practical_notes": [],
  "cta": {}
}
```

Validate before persistence. Reject or repair invalid structures in the AI orchestration layer.

---

# 11. GOOGLE SHEETS ROLE AFTER V3

Google Sheets remains useful for:

- Editorial review.
- Destination/content batch management.
- Operations dashboards when convenient.
- Bulk import/export.
- Human-readable command/control workflows.

Google Sheets must **not** be the transactional source of truth for:

- Authentication.
- Workspace membership.
- Subscriptions.
- Entitlements.
- Usage metering.
- Projects.
- Billing state.
- Audit logs.

The source-of-truth direction becomes:

```text
Editorial Sheet / Admin Tool
          ↓ controlled sync/import
      Application Database
          ↓
       SaaS Product
```

---

# 12. ACQUISITION → ACTIVATION → REVENUE FUNNEL

```text
SEO / Social / Referral / Outreach
              ↓
         Landing Page
              ↓
            Signup
              ↓
      Create first project
              ↓
     Generate useful output
              ↓
         Share / Publish
              ↓
   Hit useful paid entitlement
              ↓
           Checkout
              ↓
         Paid Workspace
              ↓
 Repeat project creation / collaboration
```

## Activation definition

A user is **Activated** when all are true:

1. Signup completed.
2. Workspace created.
3. First project created.
4. At least one complete AI generation succeeded.
5. User viewed or edited the generated result.

Later, activation may be tightened to include publish/share if data proves that predicts retention better.

---

# 13. MINIMUM ANALYTICS EVENTS

Implement these before broad acquisition.

## Acquisition

- `landing_view`
- `pricing_view`
- `signup_started`
- `signup_completed`

## Activation

- `workspace_created`
- `project_created`
- `generation_started`
- `generation_completed`
- `generation_failed`
- `project_edited`
- `project_published`
- `project_shared`

## Revenue

- `paywall_viewed`
- `checkout_started`
- `checkout_completed`
- `subscription_activated`
- `subscription_upgraded`
- `subscription_downgraded`
- `subscription_cancelled`
- `payment_failed`

## Retention

- `login_returned`
- `second_project_created`
- `third_project_created`
- `template_reused`

## Commerce

- `affiliate_cta_viewed`
- `affiliate_cta_clicked`

Every event should include only the context needed for analysis. Do not place secrets or unnecessary personal data in analytics properties.

---

# 14. NORTH-STAR DASHBOARD

Lucky/CEO dashboard must prioritize seven numbers:

1. Visitors.
2. Signup rate.
3. Activation rate.
4. Paid conversion rate.
5. MRR.
6. Churn.
7. CAC payback.

Operational supporting metrics:

- AI generation success rate.
- Median generation latency.
- AI cost per activated user.
- AI cost per paid workspace.
- Projects created per active paid workspace.
- Publish/share rate.
- Affiliate outbound CTR.
- Trial/free-to-paid time.

Do not drown the OPC operation in vanity metrics.

---

# 15. 60-DAY WAR PLAN

## Days 1–7 — SaaS Foundation

Objective: a user can sign in and create a valid tenant-scoped project.

Deliver:

- Auth.
- Database connection/migrations.
- Users/workspaces/memberships.
- Basic dashboard shell.
- Travel Project CRUD.
- AI provider interface.
- First structured project generation.
- Usage recording.
- Error monitoring.

Exit criteria:

- New user completes onboarding without developer intervention.
- A workspace is always created or selected.
- A project cannot leak across workspaces.
- First AI generation is persisted as a version.

## Days 8–14 — Paid MVP

Objective: charge the first production customer.

Deliver:

- Plan/entitlement schema.
- Free / Creator / Pro / Agency catalog.
- Billing provider adapter.
- Checkout.
- Billing webhook processing.
- Subscription state synchronization.
- Entitlement enforcement.
- Paywall/upgrade UI.
- Public/shareable project page.
- Pricing page wired to checkout.

Exit criteria:

> A stranger can visit Travel4You, sign up, create a valuable result, hit a meaningful paid boundary, pay, and continue without Victor performing a manual operational step.

## Days 15–30 — Acquisition Engine

Objective: create repeatable user acquisition and first meaningful paid cohort.

Deliver:

- Template gallery.
- Free travel-product generator entry point.
- Public pages that can create a branded distribution loop.
- Referral identifiers.
- Lifecycle email basics.
- Creator/advisor outreach workflow.
- Landing pages by ICP/use case.
- Conversion dashboard.

Targets:

- Day 21 operating target: 100 paying users.
- Day 30 operating target: 250 paying users.

## Days 31–45 — Professional / Agency Layer

Objective: increase ARPU and retention.

Deliver based on usage evidence:

- Branded output.
- Client view.
- Export/print/PDF-friendly output.
- Team member support.
- Duplicate/reuse template.
- Higher plan entitlements.
- Project/client organization if validated by demand.

Day 45 operating target: 550 paying users.

## Days 46–60 — Scale and Retention

Objective: push toward 1,000 monthly paying users while reducing founder/manual workload.

Deliver:

- Improved onboarding from funnel data.
- Churn/cancel feedback.
- Failed payment recovery flow.
- Referral growth loop.
- Annual plan experiment.
- Agency outbound workflow.
- AI support knowledge base.
- Automation for repetitive operational work.
- Usage-based optimization for gross margin.

Day 60 operating target: **1,000 monthly paying users**.

---

# 16. SPRINT 001 — START HERE

## Sprint name

**SAAS CORE — First Paid Loop**

## Sprint objective

Build the smallest production path from anonymous visitor to paying user.

## Required user journey

```text
Anonymous visitor
  → Signup
  → Workspace
  → New Travel Project
  → AI generation
  → Edit result
  → Publish/share preview
  → Upgrade prompt
  → Checkout
  → Paid entitlement unlocked
```

## Sprint 001 task order

### S001-01 — Runtime configuration

- Document development/staging/production environments.
- Add environment variable validation.
- Add secret handling rules.
- Preserve existing public deployment.

### S001-02 — Database foundation

- Create migration framework.
- Create core Sprint 001 tables.
- Add indexes for workspace/project/subscription lookups.
- Add created/updated timestamp convention.

### S001-03 — Authentication

- Sign up.
- Sign in.
- Sign out.
- Verification/recovery according to selected auth provider.
- Protected app route.

### S001-04 — Workspace onboarding

- Automatically create personal workspace for first-time user or guide user through workspace creation.
- Set owner membership.
- Store active workspace selection.

### S001-05 — App shell

Minimum navigation:

```text
Dashboard
Projects
Templates
Billing
Settings
```

Do not add empty enterprise navigation.

### S001-06 — Travel Project CRUD

- Create.
- View.
- Rename/edit metadata.
- Archive.
- Duplicate later if time allows.
- Enforce workspace access server-side.

### S001-07 — AI generation

First generation form:

- Destination.
- Audience/traveler type.
- Trip duration or product duration.
- Travel style/preferences.
- Primary objective.
- Output language.

Persist:

- Job.
- Generated structured output.
- Project version.
- Usage metadata.

### S001-08 — Project editor/viewer

User can:

- View generated result.
- Edit main sections.
- Save a new version or update draft according to implementation choice.
- Preview share page.

### S001-09 — Publication

- Generate public/unlisted slug.
- Publish an explicit version.
- Allow unpublish.
- Public route never renders a private draft.

### S001-10 — Entitlements

Create central functions such as:

```text
getWorkspaceEntitlements(workspaceId)
canUse(workspaceId, entitlementCode)
consumeUsage(workspaceId, entitlementCode, quantity)
```

Do not scatter plan checks across UI components.

### S001-11 — Billing

- Checkout start endpoint.
- Billing webhook.
- Idempotency tracking.
- Subscription sync.
- Billing settings page.
- Upgrade success/cancel return flows.

### S001-12 — Analytics

Implement the minimum acquisition, activation and revenue events.

### S001-13 — Reliability

- Central server error format.
- AI error states.
- Retry strategy.
- Empty state.
- Loading/progress state.
- Basic rate limiting / abuse safeguards.

### S001-14 — Release gate

Production release requires passing the acceptance tests in Section 17.

---

# 17. SPRINT 001 ACCEPTANCE TESTS

## AUTH-01

New anonymous user can create an account and reach onboarding.

## AUTH-02

Logged-out user cannot access protected workspace data.

## TENANT-01

User A cannot fetch User B's workspace project by changing an ID in a request.

## TENANT-02

Workspace membership is validated server-side.

## PROJECT-01

User can create a project and reload it after browser refresh.

## PROJECT-02

Project remains scoped to the active workspace.

## AI-01

Valid project input produces validated structured output.

## AI-02

Failed generation shows recoverable error state and does not corrupt the project.

## AI-03

Generation creates usage metadata.

## VERSION-01

Published content references an explicit saved project version.

## PUBLIC-01

Private drafts cannot be fetched by the public publication endpoint.

## PUBLIC-02

Published/unlisted page renders without authentication according to visibility rules.

## ENT-01

Free workspace cannot exceed a configured restricted entitlement.

## ENT-02

Upgrading unlocks the entitlement after verified billing state is received.

## BILL-01

Duplicate billing webhook delivery does not duplicate subscription records or usage changes.

## BILL-02

Cancelled/expired subscription eventually removes paid entitlements according to billing policy.

## ANALYTICS-01

Signup, activation, AI generation, checkout and subscription events can be queried in the analytics system.

## OPS-01

Victor is not required to manually modify database rows to activate a normal paying customer.

---

# 18. REPOSITORY IMPLEMENTATION GUIDANCE

The existing repository is the baseline. Avoid unnecessary migration before revenue.

Recommended additive structure:

```text
travel4you.app/
├── functions/
│   ├── go/
│   └── api/
│       ├── auth-or-session/
│       ├── projects/
│       ├── ai/
│       ├── billing/
│       └── webhooks/
├── src/
│   ├── components/
│   ├── data/
│   ├── layouts/
│   ├── pages/
│   │   ├── ... existing public pages
│   │   └── app/
│   ├── lib/
│   │   ├── auth/
│   │   ├── db/
│   │   ├── ai/
│   │   ├── billing/
│   │   ├── entitlements/
│   │   ├── analytics/
│   │   └── security/
│   └── types/
├── migrations/
├── scripts/
├── TECHNICAL_ARCHITECTURE.md
└── TRAVEL4YOU_SAAS_EXECUTION_MASTER.md
```

Exact folders may be adjusted to match the repository build/runtime conventions, but domain boundaries must remain clear.

---

# 19. SOURCE-OF-TRUTH PRIORITY

When implementation instructions conflict, use this priority:

1. Explicit later written decision by Victor + Lucky.
2. `TRAVEL4YOU_SAAS_EXECUTION_MASTER.md` — SaaS product/execution direction.
3. `TECHNICAL_ARCHITECTURE.md` — existing system baseline and public architecture.
4. Existing code behavior.
5. Developer assumptions.

Existing code is evidence of the current implementation, not automatic authority over the approved product direction.

Any contradiction that affects payments, tenancy, data integrity, security, or public brand must be escalated before release.

---

# 20. DEFINITION OF DONE

A feature is not done because code exists.

A SaaS feature is done when applicable criteria are satisfied:

- User journey works in production-like environment.
- Permissions are enforced server-side.
- Error state exists.
- Loading state exists.
- Analytics event exists when relevant.
- Entitlements are enforced when relevant.
- AI usage is measured when relevant.
- Secrets are not exposed.
- Regression test or acceptance test exists for critical behavior.
- Operational handling does not require routine direct database editing.
- User-facing copy is clear and contains no internal technical jargon.

---

# 21. WHAT THE DEV TEAM MUST NOT DO

Do not:

- Rebuild the public website just to introduce SaaS.
- Replace the working SEO stack without a measurable reason.
- Build a Booking.com/GetYourGuide clone in the 60-day window.
- Build a giant CRM before paid validation.
- Hard-code plan names throughout the product.
- Store subscription truth only in frontend state.
- Use Google Sheets as the SaaS transactional database.
- Put provider secrets in browser code.
- Allow workspace data access without server-side membership checks.
- Let AI write directly to published content without an explicit product rule.
- Ship AI generation without usage/cost observability.
- Add modules that do not improve activation, conversion, retention, MRR, or distribution during the 60-day mission.
- Create manual processes that the OPC owner must repeat for every customer if they can be automated.

---

# 22. DECISION LOG — INITIAL LOCK

## DEC-001 — Product category

**Decision:** Travel4You evolves into **Luxury Travel AI OS / SaaS Hub**.  
**Status:** APPROVED.

## DEC-002 — Existing site

**Decision:** Existing Astro/Cloudflare public site remains the acquisition/SEO engine.  
**Status:** APPROVED.

## DEC-003 — First paid ICP

**Decision:** Prioritize creators, advisors, small agencies and DMCs before depending on B2C subscription for MRR.  
**Status:** APPROVED.

## DEC-004 — Core SaaS object

**Decision:** `Travel Project` is the primary V1 domain object.  
**Status:** APPROVED.

## DEC-005 — Tenancy

**Decision:** Workspace owns business data; users access data through membership.  
**Status:** APPROVED.

## DEC-006 — Database

**Decision:** SaaS transactional state moves to PostgreSQL; Google Sheets is not the SaaS transactional source of truth.  
**Status:** APPROVED.

## DEC-007 — Plans

**Decision:** Enforce capabilities through entitlements, not hard-coded marketing plan names.  
**Status:** APPROVED.

## DEC-008 — AI

**Decision:** AI providers are accessed through an internal provider/orchestration abstraction with structured validation and usage metering.  
**Status:** APPROVED.

## DEC-009 — Billing

**Decision:** Billing integration uses a provider adapter; final production provider must match the legal entity's supported payment setup.  
**Status:** APPROVED.

## DEC-010 — 60-day constraint

**Decision:** Features that do not materially support activation, paid conversion, retention, MRR or distribution are deprioritized.  
**Status:** APPROVED.

---

# 23. CEO RELEASE CHECKPOINTS

## Gate A — Foundation

Pass when:

- Auth works.
- Workspace isolation works.
- Project persistence works.

## Gate B — AI Value

Pass when:

- First generation creates a useful, editable structured project.
- Usage is measurable.
- Failure is recoverable.

## Gate C — Monetization

Pass when:

- Entitlements work.
- Checkout works.
- Billing state safely updates product access.

## Gate D — Self-Serve

Pass when:

- New paying customer can complete the entire flow without Victor.

## Gate E — Scale

Pass when:

- Funnel metrics are visible.
- Onboarding bottleneck is measurable.
- Repetitive support/operations begin moving to automation.

---

# 24. TEAM COMMAND

Until superseded by a newer approved decision, the dev team should begin with:

> **Sprint 001 — SAAS CORE: Auth → Workspace → Travel Project → AI Generation → Edit → Publish → Entitlements → Checkout → Paid Unlock.**

The first production milestone is not “dashboard complete” or “architecture complete.”

The first production milestone is:

> **A new customer can discover Travel4You, sign up, create a valuable AI travel product, pay, and continue using the unlocked capability without a manual intervention from Victor.**

That loop is the machine. Everything else supports or scales it.

---

# 25. CHANGE CONTROL

Any major change to the following should be added to the Decision Log section before implementation:

- Target customer.
- Core product object.
- Pricing architecture.
- Tenant/ownership model.
- Billing model.
- Database source of truth.
- Public/private data rules.
- AI provider abstraction.
- 60-day primary KPI.

Small UI/implementation details do not require executive approval unless they introduce security, billing, data integrity or brand risk.

# 26. SESSION HANDOVER — 2026-09-19 14:10 ICT

> This section is the continuation checkpoint for the next development session. Read it before making further SaaS changes.

## 26.1 Current implementation status

The public Astro/Cloudflare SEO website remains additive and buildable. The SaaS foundation has been added under `/app/`, `functions/api/`, `src/lib/`, and `supabase/` without refactoring the existing public content routes.

Completed in the repository:

- Supabase browser/server configuration and environment contract.
- Supabase migration for profiles, workspaces, memberships, projects, versions, AI jobs, plans, entitlements, subscriptions, usage, publications, payments, webhook idempotency, events, and audit logs.
- RLS policies and workspace membership helpers in the migration.
- Supabase bearer-token authentication helpers for Pages Functions.
- Login/sign-up page and initial authenticated app dashboard.
- Workspace creation and tenant-scoped project CRUD.
- Local 9router/OpenAI-compatible AI generation boundary.
- Structured AI output validation and persistence to `ai_jobs` and `project_versions`.
- Project publication/unpublication APIs and public publication lookup foundation.
- Entitlement lookup API and plan seed data.
- SePay/VietQR checkout ledger foundation.
- PayPal provider abstraction boundary.
- Environment template and validation script.

Validation already completed:

```text
npm run build        PASS
npx tsc --noEmit    PASS
git diff --check     PASS
npm run validate:env PASS
```

## 26.2 Not production-ready yet

The following items are still open and must not be marked complete until verified against real services:

1. Install/login/link the Supabase CLI and push the migration to project `pceoqkinwsmsqmvqteiv`.
2. Run real Supabase auth and verify profile bootstrap, workspace creation, and RLS tenant isolation.
3. Resolve the public publication RLS path so anonymous users can read only published public/unlisted content without opening private projects or drafts.
4. Remove duplicated 9router request logic by using one runtime-compatible client implementation.
5. Run a local 9router instance and test valid output, malformed output, timeout, HTTP failure, and persistence recovery.
6. Add publish/unpublish controls and a public share/preview page to the app UI.
7. Enforce project, generation, member, and publication limits atomically on the server.
8. Implement `POST /api/webhooks/sepay` with signature/secret validation, amount/order matching, idempotency, payment state updates, subscription updates, entitlements, and audit logs.
9. Implement PayPal sandbox order/subscription creation and official webhook verification.
10. Add browser/API acceptance tests for Sprint 001 and run the complete release gate.
11. Add protected SSR/session handling, rate limiting, operational error reporting, and billing/webhook alerts.
12. Perform the security review before any real-money production release.

## 26.3 Credentials and environment safety

- Real secrets must remain outside Git and outside Markdown.
- `.env.example` contains names/placeholders only; local `.env` is ignored.
- Supabase secret and payment secrets were previously exposed in conversation. Rotation remains strongly recommended before production, even if development continues with the current values.
- Public browser variables may include only the Supabase URL and publishable key.
- Server-only variables include Supabase secret, 9router key, PayPal secret, SePay API/webhook secrets, and database credentials.

## 26.4 Next session execution order

Run this sequence without changing public SEO routes:

```powershell
Set-Location D:\n8n-selfhost\travel4you.app
supabase login
supabase link --project-ref pceoqkinwsmsqmvqteiv
supabase db push
npm run build
npx tsc --noEmit
```

Then verify:

```text
1. Create a test account at /app/login/.
2. Create a workspace and project.
3. Confirm a second user cannot read or mutate the first workspace.
4. Start local 9router and generate one structured project.
5. Confirm the generated version is editable and not auto-published.
6. Publish, read the public share response, then unpublish.
7. Create a SePay test checkout and verify only a validated webhook can unlock access.
8. Configure PayPal sandbox only after the SePay and entitlement paths are testable.
```

## 26.5 Known pre-existing public-site issues

These are outside the SaaS foundation and should not be mixed into Sprint 001 unless explicitly prioritized:

- Affiliate cloaker mappings may drift from canonical destination links.
- Some legacy Footer routes are hard-coded and invalid.
- Locale declarations and schema values are inconsistent in older content.
- Google Sheets synchronization still contains synthetic/default values.
- Dependency audit reported vulnerabilities; do not run a breaking `npm audit fix --force` without a separate upgrade plan.

## 26.6 Source-of-truth files

- Public architecture: [TECHNICAL_ARCHITECTURE.md](./TECHNICAL_ARCHITECTURE.md)
- Supabase setup: [supabase/README.md](./supabase/README.md)
- Environment contract: [.env.example](./.env.example)
- Database migration: [supabase/migrations/20260919135000_saas_core.sql](./supabase/migrations/20260919135000_saas_core.sql)

## 26.7 Progress added on 2026-09-19 14:20 ICT

Completed without changing public SEO routes:

- Added `get_publication_by_slug(text)` as a `SECURITY DEFINER` Supabase RPC. It returns only a published public/unlisted publication, its project summary, and the selected version; it does not expose private drafts through nested client queries.
- Updated the public publication API to use the RPC instead of relying on nested-table RLS behavior.
- Added `plan_code` metadata to SePay checkout payment records.
- Added `POST /api/webhooks/sepay`.
- SePay webhook now validates the configured secret, requires event/reference/amount fields, ignores outgoing transfers, matches an existing pending VND payment, records idempotent webhook events, marks the payment paid, creates/updates the active SePay subscription, and writes a system audit log.
- Added a server-only Supabase service client helper for trusted webhook processing.

Validation after these changes:

```text
npm run build       PASS
npx tsc --noEmit   PASS
node --check Pages Functions PASS
```

Remaining verification for this slice:

- Verify the RPC grants for `anon` and `authenticated` after the Dashboard migration run.
- Confirm the exact SePay production webhook payload/signature contract and adapt field mapping or HMAC verification if required by SePay.
- Replay the same event twice and confirm the second request is idempotent.
- Test payment amount mismatch, unknown order reference, invalid secret, and outgoing-transfer rejection.
- Confirm the subscription entitlement API returns the paid plan after a validated webhook.

## 26.8 Supabase Dashboard checkpoint — 2026-09-19 14:26 ICT

The Supabase project `pceoqkinwsmsqmvqteiv` was opened in the authenticated browser session and the SaaS migration was executed from SQL Editor. Table Editor now confirms these SaaS tables exist in the live project:

```text
billing_webhook_events
payments
profiles
projects
publications
workspaces
```

The migration execution returned success with no SQL error. The remaining live checks are functional checks, not schema installation:

1. Query `public.get_publication_by_slug(text)` with an unpublished slug and confirm no row is returned.
2. Create a test Auth user and confirm the profile trigger.
3. Create a workspace/project through the app and verify RLS.
4. Configure a temporary test SePay secret and replay a controlled webhook.

## 26.9 PayPal sandbox checkpoint — 2026-09-19 14:34 ICT

PayPal Developer sandbox configuration completed in the authenticated browser:

- Created a dedicated merchant REST app named `Travel4You SaaS`.
- Registered the sandbox webhook URL:
  `https://travel4you.app/api/webhooks/paypal`
- Enabled the checkout/order and payment-capture event families used by the
  implementation.
- Stored the non-secret PayPal webhook ID in the ignored local `.env` as
  `PAYPAL_WEBHOOK_ID`.

Required manual secret step:

1. In the PayPal Developer app, copy the **Client ID** into local
   `PAYPAL_CLIENT_ID`.
2. Copy **Secret key 1** into local `PAYPAL_CLIENT_SECRET`.
3. Never paste either value into chat, Markdown, Git, or browser output.
4. Keep `PAYPAL_ENVIRONMENT=sandbox` until a complete sandbox order/capture/
   webhook test passes.

The code endpoints are now:

```text
POST /api/billing/checkout
POST /api/webhooks/paypal
```

The production deployment must contain the new Functions code before a real
PayPal event can be delivered successfully. The webhook is registered in
PayPal, but live payment testing remains pending credential injection and
deployment verification.

## 26.10 PayPal credential injection checkpoint — 2026-09-19 14:49 ICT

The PayPal Developer app visibly contains the sandbox `Client ID` and
`Secret key 1` fields. The secret was intentionally not read from browser
automation or copied into chat.

Use the local secure prompt from the project root:

```powershell
Set-Location D:\n8n-selfhost\travel4you.app
npm run configure:paypal
```

The script writes `PAYPAL_CLIENT_ID`, `PAYPAL_CLIENT_SECRET`,
`PAYPAL_ENVIRONMENT=sandbox`, and the already registered
`PAYPAL_WEBHOOK_ID` into the ignored local `.env` without printing the
secret. After that, deploy the same variables as Cloudflare Pages secrets;
local `.env` is not available to production Functions.

## 26.11 Local environment contract checkpoint — 2026-09-19 14:49 ICT

The ignored local `.env` was audited without printing values. All keys from
`.env.example` now exist in the local file, while existing values were
preserved. Safe defaults were filled for the Supabase URL, JWKS URL, local
9router URL, timeout, PayPal sandbox mode, PayPal webhook ID, and BIDV bank
code.

The following intentionally remain empty until the owner supplies them
locally: PayPal Client ID/Secret, Supabase publishable key if not already
present, 9router key/model if required, SePay API/webhook/account values, and
database URL/password.

The safe template is viewable at [.env.example](./.env.example). Never open
or paste the real `.env` into a browser, Markdown file, Git, or chat.

---

# 27. STRATEGIC PIVOT & MULTI-TEAM DEV WAR CHARTER — 2026-09-19 ICT

> **Executive Order:** Chairman Victor & AI CEO Lucky  
> **Strategic Evolution:** Dual-Engine SaaS (GetYourGuide VIP Tours + Expedia Group Luxury Stays)  
> **Multi-Team Dev Setup:** 3 Teams operating simultaneously without boundary collision.

## 27.1 DEC-011 — Dual-Engine Monetization & Strategic Domain Pivot

**Decision:** Evolve Travel4You SaaS from a single-affiliate tour app into a **Dual-Engine Luxury Travel OS**:
1. **Engine 1 (Experiences):** `travel4you.app` — Powered by GetYourGuide (Partner `D5OEC57` - 8% Commission). Focuses on VIP Skip-the-line tickets, private yachts, helicopter tours, cultural immersions.
2. **Engine 2 (Stays & Flights):** `travel4u.us` (Apex Domain) — Migrates to Cloudflare Pages Edge (Astro 5 SSG), powered by **Expedia Group** (via Travelpayouts Marker 770720 / EPS Direct). Focuses on 5-Star Luxury Hotels, Resorts, First/Business Flights, and Packages.
3. **Editorial Engine:** `blog.travel4u.us` — Inherits the WordPress codebase and 78+ Grade A articles from `travel4u.us`. Acts as the central high-volume content and storytelling engine feeding organic traffic to both Edge engines.
4. **SaaS Value Multiplier (10x ARPU):** The core SaaS object (`Travel Project`) now generates complete, monetizable itineraries containing **both** Expedia Luxury Hotel recommendations and GetYourGuide VIP Experience recommendations, tagged with the creator's/advisor's affiliate IDs.

**Status:** APPROVED FOR EXECUTION.

## 27.2 The 3-Team Dev Responsibility Matrix

```text
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│                               3-TEAM PARALLEL DEV WORKSTREAMS                                   │
├───────────────────────────────┬─────────────────────────────────┬───────────────────────────────┤
│ TEAM 1: SAAS CORE & PLATFORM  │ TEAM 2: EDGE & ATTRIBUTION      │ TEAM 3: CONTENT & COMMERCE    │
├───────────────────────────────┼─────────────────────────────────┼───────────────────────────────┤
│ • Lead: Backend / Fullstack   │ • Lead: Edge Architect / DevOps │ • Lead: CCO / Data Architect  │
│ • Scope:                      │ • Scope:                        │ • Scope:                      │
│   - /app authenticated UI     │   - travel4u.us (Expedia Edge)  │   - D:\blog-travel (3 Tiers)  │
│   - functions/api/**          │   - travel4you.app (GYG Edge)   │   - 1000 Luxury Stays Catalog │
│   - src/lib/**                │   - functions/go/** & /m/**     │   - 1000 GYG Experiences      │
│   - supabase/**               │   - public/scripts/team_attrib  │   - src/data/articles.json    │
│ • Focus:                      │ • Focus:                        │ • Focus:                      │
│   - Supabase Auth & RLS       │   - Sub-50ms Edge Performance   │   - High-ticket Hotel Curation│
│   - SePay (VietQR) + PayPal   │   - Multi-Tenant Link Cloaking  │   - 12-Locale Transcreation   │
│   - 9Router AI Orchestrator   │   - 30-day Member Ref Cookies   │   - Google Sheet Sync (Tab 1k)│
│   - Entitlement Engine        │   - Self-Serve Team Tools UI    │   - Telegram Shift Reports    │
└───────────────────────────────┴─────────────────────────────────┴───────────────────────────────┘
```

## 27.3 Git Branching & Collision Prevention Protocol

1. **Independent File Ownership:** No team edits files outside their designated folder scope.
2. **Pre-commit Quality Gate:**
   - `npm run build` must produce clean static outputs (132+ pages).
   - `npx tsc --noEmit` must return 0 TypeScript errors.
   - `node scripts/validate-env.cjs` must pass environment integrity checks.
3. **Zero Secrets in Code:** Credentials for Supabase, SePay, PayPal, and Expedia remain strictly in local `.env` and Cloudflare Pages Environment Variables.

## 26.12 SePay HMAC webhook checkpoint — 2026-09-19

SePay webhook đã được tạo thành công trong Test mode:

- Tên: `Travel4You SaaS Payments`
- URL: `https://travel4you.app/api/webhooks/sepay`
- Sự kiện: tiền vào
- Định dạng: JSON
- Tài khoản nguồn: BIDV `6700067179` / `BIDV - Tncshare`
- Tài khoản VA dùng trong QR checkout: `96247688688`; đây là tài khoản ảo định tuyến về tài khoản nguồn, không phải tài khoản ngân hàng thứ hai.
- Bảo mật: HMAC-SHA256
- Header chữ ký theo SePay: `X-SePay-Signature`

Đã cập nhật [functions/api/webhooks/sepay.js](functions/api/webhooks/sepay.js) để:

- đọc raw request body trước khi parse JSON;
- xác minh HMAC-SHA256 bằng Web Crypto;
- xác minh chuỗi ký chính thức `{timestamp}.{raw_body}` bằng HMAC-SHA256, kiểm tra `X-SePay-Timestamp` trong cửa sổ 5 phút và chấp nhận chữ ký hex có tiền tố `sha256=`;
- trả `{"success": true}` cho webhook đã xử lý/đã nhận diện để SePay không retry không cần thiết;
- từ chối request thiếu chữ ký hoặc sai chữ ký bằng HTTP 401;
- giữ nguyên kiểm tra idempotency, amount/reference matching và entitlement activation.

Đã thêm script nhập secret local:

```powershell
Set-Location D:\n8n-selfhost\travel4you.app
npm run configure:sepay
```

Secret HMAC chỉ được nhập tại terminal local, không ghi vào Markdown/chat. `SEPAY_API_KEY` chưa cần cho webhook inbound nhưng vẫn cần nếu sau này gọi SePay API chủ động.

Trạng thái còn lại:

- [ ] Nhập secret HMAC từ SePay vào local `.env` bằng `npm run configure:sepay`.
- [x] Đã xác định chênh lệch là mô hình VA → tài khoản nguồn hợp lệ; QR dùng VA `96247688688`, webhook theo dõi tài khoản BIDV thật `6700067179`.
- [ ] Deploy Pages Functions mới trước khi replay webhook.
- [ ] Gửi một giao dịch test và xác minh payment/subscription/entitlement.
- [ ] Xác nhận payload thực tế của SePay qua test webhook; nếu tên field khác, cập nhật mapping `eventId`, `amount`, `orderReference`, `transferType`.

## 26.13 Tiến độ tổng hợp — 2026-09-19 17:19 ICT

### Đã hoàn thành

- Public Astro/Cloudflare SEO site vẫn được giữ nguyên theo hướng additive.
- Supabase Auth/Postgres/RLS migration đã chạy trên project `pceoqkinwsmsqmvqteiv`.
- Đã có workspace, project, version, AI job, publication, entitlement và payment foundation.
- Đã có local 9router structured generation boundary.
- PayPal sandbox app `Travel4You SaaS` đã tạo; webhook đã đăng ký và local `.env` đã có Client ID/Secret cùng Webhook ID.
- SePay webhook Test mode đã tạo, theo dõi tài khoản thật BIDV `6700067179`, trong khi QR checkout dùng VA `96247688688`.
- SePay handler đã khớp HMAC chính thức: `HMAC-SHA256(secret, timestamp + "." + raw_body)`, kiểm tra timestamp và trả `{"success": true}`.
- Syntax và TypeScript validation hiện tại đã pass.

### Chưa đủ điều kiện production

1. Nhập `SEPAY_WEBHOOK_SECRET` local; `SEPAY_API_KEY` chỉ cần khi gọi SePay API chủ động.
2. Deploy Pages Functions và secrets lên Cloudflare; local `.env` không tự đi theo production.
3. Gửi thử webhook SePay từ Dashboard, sau đó thực hiện giao dịch Test mode và kiểm tra payload thực tế.
4. Chạy PayPal sandbox order → approval → capture/webhook và kiểm tra payment/subscription/entitlement.
5. Chạy kiểm thử Auth/RLS với hai user khác nhau.
6. Bổ sung acceptance tests, rate limiting, SSR/session hardening, alerting và security review.
7. Xác nhận giới hạn plan/usage được enforce atomic ở server trước khi mở bán.
8. Rotate các secret từng xuất hiện trong hội thoại trước khi chuyển production.

### Ghi chú validation

`npx tsc --noEmit` và syntax checks pass. `npm run build` đã từng pass trước đó; lần chạy lại lúc 17:14 bị Windows thiếu native memory trong Astro/esbuild, không có lỗi compile được báo từ code SePay. Cần chạy lại trên máy có đủ RAM hoặc CI sạch trước release gate.

## 26.14 Production deployment probe — 2026-09-19 17:23 ICT

`https://travel4you.app` đang phục vụ public Astro site bình thường.

Đã probe các production API bằng POST:

- `/api/webhooks/sepay` → HTTP `405 Method Not Allowed`
- `/api/webhooks/paypal` → HTTP `405 Method Not Allowed`
- `/api/billing/checkout` → HTTP `405 Method Not Allowed`

Đây chưa phải kết quả xác nhận Functions đã chạy. Với source hiện tại, webhook thiếu signature phải trả HTTP `401`, còn billing thiếu bearer token phải trả HTTP `401`; HTTP `405` cho thấy cần kiểm tra lại Cloudflare Pages deployment có include thư mục `functions/` hay đang chỉ deploy static `dist/`.

Release gate mới:

1. Xác nhận deployment method là Pages Git deployment hoặc `wrangler pages deploy` có Functions.
2. Kiểm tra Cloudflare deployment logs/build settings.
3. Redeploy có `functions/` và production secrets.
4. Lặp lại POST probe; kết quả mong đợi:
   - SePay không signature: `401`
   - PayPal không signature: `401`
   - Checkout không bearer token: `401`
5. Chỉ sau khi probe đúng mới gửi test webhook/tiền thật trong Test mode.

## 26.15 UX/UI polish checkpoint — 2026-09-19 17:29 ICT

Đã xử lý phản hồi giao diện trên homepage và toàn bộ locale homepage:

- Giảm chiều cao Hero từ `85vh` xuống `68vh` để loại bỏ khoảng trống quá lớn trước collection.
- Giảm padding section collection và khoảng cách heading/grid để nhịp nội dung gọn, chuyên nghiệp hơn.
- Giảm khoảng cách giữa search bar và category pills.
- Category pills giờ dùng `role="tab"`, `aria-selected`, `aria-pressed`.
- Filter đang chọn luôn có dấu `✓`, màu gold, border gold và trạng thái accessibility rõ ràng.
- Khi đổi tab, tab cũ được reset đầy đủ cả visual state và aria state.

Đã áp dụng cho:

- `src/pages/index.astro`
- `src/pages/[locale]/index.astro`
- `src/components/SearchBar.astro`

Validation sau thay đổi UI:

- `npx tsc --noEmit` — PASS
- `npm run build` — PASS

## 26.16 Cloudflare production env audit — 2026-09-19 17:43 ICT

Cloudflare Pages project `travel4you-app` production settings were audited at:

`https://dash.cloudflare.com/f089da986b216692047f5132563c523d/pages/view/travel4you-app/settings/production`

Confirmed production build configuration:

- Build command: `npm run build`
- Output directory: `dist`
- Production branch: `main`
- Automatic deployments: enabled
- Compatibility date: `2026-09-19`

Saved as encrypted production secrets through the Cloudflare dashboard:

- `SUPABASE_SECRET_KEY`
- `PAYPAL_CLIENT_ID`
- `PAYPAL_CLIENT_SECRET`
- `PAYPAL_WEBHOOK_ID`

The dashboard already contains the non-secret `wrangler.toml` values:

- `SITE_URL`
- `GETYOURGUIDE_PARTNER_ID`
- `TRAVELPAYOUTS_MARKER`
- `TRAVELPAYOUTS_SOURCE`

Still not configured in Cloudflare production:

- `SEPAY_WEBHOOK_SECRET` — missing locally because the HMAC secret was generated in SePay and was never copied into local `.env`.
- `SEPAY_API_KEY` — optional for inbound-only webhook flow.
- Supabase browser/runtime variables from `.env.example` are not currently present in the dashboard variable list; they must be added as encrypted variables or committed to `wrangler.toml` and redeployed:
  `PUBLIC_SUPABASE_URL`, `PUBLIC_SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_JWKS_URL`.
- `AI_ROUTER_BASE_URL` must not remain `http://127.0.0.1:8787` in production; it needs a reachable VPS/Cloudflare endpoint before AI generation can work remotely.

Important deployment note: local project changes remain uncommitted in the working tree. Cloudflare Git deployments only receive changes pushed to the connected repository. The production domain was serving the public static site, but API probes returned HTTP 405; Pages Functions deployment still needs confirmation after the SaaS code is pushed/deployed.

## 26.17 Cloudflare Functions deployment verified — 2026-09-19 17:54 ICT

Production secrets now include the SePay HMAC secret, saved encrypted through the
Cloudflare Pages dashboard. The public Supabase runtime values were added to
`wrangler.toml`, and commit `7b01983` was pushed to `main`.

Cloudflare automatic deployment completed and the production handlers are now
active:

- `POST /api/webhooks/sepay` with no signature → HTTP `401`
  (`Invalid webhook signature.`)
- `POST /api/webhooks/paypal` with an empty invalid event → HTTP `400`
  (`Invalid PayPal webhook.`), proving the handler is active.
- `POST /api/billing/checkout` without bearer auth → HTTP `401`
  (`Authentication required.`)

The previous static-route `405` condition is resolved. The next gate is a
controlled SePay test webhook and PayPal sandbox checkout, not another deploy.

## 26.18 SePay send-test result — 2026-09-19 18:02 ICT

The SePay Dashboard **Gửi thử** action was executed twice for webhook `58141`.
Both attempts reported:

`HTTP 0 - 22: The requested URL returned error: 404 Not Found`

Direct probes from outside SePay reached the deployed Pages Function and
returned `401 Invalid webhook signature` without the required headers. A
diagnostic request signed with the local HMAC secret reached the same handler
and returned `404 Payment reference not found`. This proves the route and
timestamped HMAC contract are working; the dashboard test payload simply does
not match a pending application payment.

## 26.19 SePay test sender acknowledgement fix

`functions/api/webhooks/sepay.js` now acknowledges unknown payment references
with HTTP 200 and `{"success":true,"ignored":true}`. The handler does not mark
anything paid, create a subscription, or activate entitlements in this case;
it only records a warning for operational investigation. This makes unrelated
SePay test events safe to acknowledge while preserving rejection for invalid
signatures, malformed JSON, amount mismatches, unsupported currencies, and
inactive plans.

SePay Dashboard **Gửi thử** was rerun after deployment and completed
successfully with HTTP 200. The response preview was
`{"success":true,"ignored":true,"reason":"payment_reference_not_found"}`.
No money was transferred and no entitlement was unlocked during this test.

The next payment gate is a controlled checkout whose order reference and amount
are known to the application. That test must verify payment status, subscription
activation, entitlement activation, and duplicate-event idempotency.

Production release status remains:

- Cloudflare deployment: verified.
- SePay secret: stored locally and encrypted in Cloudflare.
- SePay dashboard test sender: verified HTTP 200 after the acknowledgement fix.
- PayPal sandbox checkout: pending.

## 26.20 Telegram payment-success notification

- Added a shared Telegram Bot API notifier for successful SePay and PayPal
  payments.
- Notification is sent only after the payment row and webhook event have been
  committed successfully.
- A Telegram delivery failure is logged but does not roll back a valid payment
  or cause the provider to retry it.
- The message includes provider event ID, order reference, amount, currency,
  plan code, and Vietnam-local payment time; bot tokens are never logged.
- Required Cloudflare encrypted secret: `TELEGRAM_BOT_TOKEN`.
- Cloudflare variable: `TELEGRAM_CHAT_ID=-1001828947537`.
- The Telegram bot must be an administrator/member able to post in the target
  group/channel. The token must be entered through Cloudflare Secrets and must
  not be committed or pasted into chat.

## 26.21 Session handover — 2026-09-19 18:55 ICT

### Verified production configuration

- Cloudflare Production now contains `TELEGRAM_BOT_TOKEN` as an encrypted
  Secret. The token value was never printed or committed.
- Cloudflare Production contains `TELEGRAM_CHAT_ID` with value
  `-1001828947537`.
- Latest active deployment is commit `cdfc8f6`
  (`feat: notify Telegram on successful payments`).
- Production deployment status is active on `travel4you.app`.
- The Telegram notification implementation is deployed for both SePay and
  PayPal successful-payment handlers.

### SePay account cleanup and limits

- SePay account plan: **Free**, active.
- Webhook transaction limit shown by SePay: **50**.
- Usage shown by SePay: **0/50**.
- Only `Travel4You SaaS Payments` remains enabled.
- Disabled demo webhooks: `go-breaths-live`, `OPC TRAVEL ALL-IN-ONE`,
  `tnc.io.vn`, and `eduvictorchuyen`.
- Telegram alert channel `OPC TRAVEL` remains enabled for webhook failure and
  recovery alerts; it is separate from the application payment-success
  notification.

### Next session — do not mark payment release complete yet

1. Create one controlled pending SePay checkout with a known order reference
   and amount.
2. Send a matching signed payment event and verify payment status becomes
   `paid`, subscription/entitlement activation succeeds, and Telegram receives
   the success message.
3. Replay the same event and verify idempotency (no duplicate entitlement or
   duplicate notification).
4. Run the equivalent PayPal sandbox order/capture/webhook test.
5. Verify the Telegram bot has permission to post in chat
   `-1001828947537`; rotate the BotFather token if it was exposed anywhere.
6. Complete Auth/RLS isolation, rate limiting, production AI endpoint, and
   security review before enabling real-money production.

## 26.22 GetYourGuide attribution migration — 2026-09-19 21:00 ICT

- Domain and Cloudflare Pages project remain unchanged:
  `https://travel4you.app/`.
- The project-wide GetYourGuide Partner ID is now consistently `D5OEC57`.
- Updated runtime redirect logic, header/mobile CTAs, destination/catalog
  links, localized static data, team attribution data, QA/sync scripts, and
  project documentation.
- New affiliate account contact supplied by Chairman Victor:
  `getyourguidemedia@gmail.com`.
- `wrangler.toml` now exposes `GETYOURGUIDE_PARTNER_ID="D5OEC57"` for the
  Cloudflare Function fallback.
- `npm run build` completed successfully after the migration.
- Before the next release, verify one live GetYourGuide click and confirm the
  partner dashboard attributes the click to `D5OEC57`.
- Official partner resources supplied for operational reference:
  - `https://partner.getyourguide.com/en-us/solutions/city`
  - `https://partner.getyourguide.com/en-us/solutions/availability`
  - `https://partner.getyourguide.com/en-us/solutions/activities`

## 26.23 Travelpayouts Drive installation — 2026-09-19 22:58 ICT

- Added the official Travelpayouts Drive installation snippet to the shared
  Astro document head in `src/layouts/Layout.astro`.
- The script is loaded once globally from
  `https://emrldtp.com/NTc1Njk4.js?t=575698`.
- The loader was changed to a static `<script src="...">` tag so external
  Drive verification can detect the source directly without depending on
  client-side script execution.
- This is a Drive verification/attribution script; it does not replace the
  GetYourGuide Partner ID `D5OEC57`.
- Travelpayouts Marker `770720` remains a separate legacy attribution value
  until the account-owner migration decision is completed.
- Required validation: build, inspect rendered head output, and use the
  Travelpayouts dashboard “Check Drive connection” action after deployment.

## 26.24 VIP LAN progress update — 2026-09-19 23:14 ICT

### Executive status

Travel4You is a live Astro + Cloudflare Pages luxury travel platform at
`https://travel4you.app/`. The public experience remains static, fast,
SEO-friendly, and localized, while the SaaS layer is being added behind
authenticated Cloudflare Pages Functions and Supabase APIs.

The current release is ready for continued product development and controlled
affiliate testing. Real-money payment release, full Auth/RLS acceptance
testing, and production AI endpoint hardening remain follow-up items and must
not be presented as completed production guarantees.

### Affiliate identities and benefits

| Platform | Current identity | Why it is used | Status |
|---|---|---|---|
| GetYourGuide | Partner ID `D5OEC57` | Main VIP experiences, tours, activities, and direct attribution | Unified across redirects, CTAs, catalog, search data, and generated links |
| GetYourGuide | `getyourguidemedia@gmail.com` | Partner account contact | Recorded for operations and partner communication |
| Travelpayouts Drive | Source `575698` | Cross-program monetization, widgets, and Drive attribution | Website ownership confirmed; Drive active in the dashboard |
| Travelpayouts legacy marker | Marker `770720` / source `567182` | Existing Travelpayouts/Booking attribution from a separate account context | Preserved until an explicit migration decision |

The two affiliate systems are deliberately separated. `D5OEC57` must not be
used as a Travelpayouts marker, and `770720` must not be presented as the
GetYourGuide identity. This preserves attribution history and prevents
commission reporting from being mixed.

### Completed product and technical work

1. Astro static rendering, responsive luxury UI, Cloudflare Pages deployment,
   localized routes, sitemap generation, and SEO metadata/hreflang foundations.
2. 1,000+ destination/experience catalog, client search index, category
   filters, localized navigation, experience detail pages, related content,
   and booking CTAs.
3. Project-wide GetYourGuide migration to `D5OEC57`; former `4G5BPIE` removed
   from active project data and runtime surfaces.
4. Official Travelpayouts Drive script installed as a static script in the
   shared document head. Travelpayouts confirmed website ownership and the
   dashboard shows Drive active with maximum monetization boost.
5. Supabase Auth/Postgres/RLS structure, workspace/project API boundaries,
   publication API, entitlement model, and AI generation boundaries.
6. PayPal webhook foundation, SePay checkout/webhook flow, HMAC validation,
   payment idempotency path, and subscription/entitlement activation path.
7. Telegram payment-success notification after successful persistence to chat
   `-1001828947537`; Telegram failure does not roll back a recorded payment.
8. Technical architecture, deployment, affiliate, payment, security, and
   handover documentation.

### Content volume now

- `src/data/articles.json`: **120 article/experience records** currently
  present in the app repository.
- Destination and experience catalog: **1,000+ searchable records**.
- The 120 records are not the same as the 1,000 catalog entries: catalog
  entries may be discovery/booking records without a long-form article.
- New content must pass demand validation, quality scoring, affiliate
  disclosure, and drip-feed scheduling rather than bulk publication.

### Ten-day execution plan for VIP LAN

| Day | Delivery target | Acceptance check |
|---:|---|---|
| 1 | Production baseline, deployment, environment, and affiliate audit | Live pages return 200; `D5OEC57`, Drive source `575698`, and no old GetYourGuide ID |
| 2 | Controlled GetYourGuide click/redirect test | Redirect preserves `partner_id=D5OEC57`; evidence recorded without exposing secrets |
| 3 | First demand-validated VIP content batch | Every article has intent, quality score, CTA, disclosure, and canonical URL |
| 4 | Travelpayouts widgets for hotel/experience comparison surfaces | Widget renders in production and remains compatible with Drive |
| 5 | Controlled SePay payment lifecycle test | Pending → paid → entitlement → Telegram; replay creates no duplicate result |
| 6 | PayPal sandbox capture/webhook test | Verified webhook updates the correct order and is idempotent |
| 7 | Supabase Auth/RLS two-user isolation test | User A cannot read or mutate User B workspace, project, or publication |
| 8 | SaaS operating hardening | Rate-limit review, structured error logging, and reachable production AI endpoint plan |
| 9 | Drip-feed the next editorial batch | QA confirms links, schema, hreflang, alt text, disclosure, and live status |
| 10 | Release review and KPI handover | Confirm dashboard metrics, update the master sheet, and create the next backlog |

### Immediate priorities

1. Keep `D5OEC57` and `770720` separate; do not replace one with the other.
2. Remove Marker `770720` only after a measured migration plan and owner
   approval, because it may represent historical attribution.
3. Do not call payment release complete until matching SePay, PayPal sandbox,
   and replay/idempotency checks pass.
4. Report only dashboard-confirmed clicks, leads, payments, and commissions;
   catalog size is not revenue.

## 26.25 Session handover for next day — 2026-09-19 23:31 ICT

### Message for VIP LAN

Travel4You is live at `https://travel4you.app/`. The current app contains
**120 article/experience records** and a searchable catalog of **1,000+
destinations and experiences**. The public site includes search, filters,
localized pages, experience details, booking CTAs, SEO/hreflang, and the
initial SaaS account/content/payment foundation.

The selected affiliate platforms are:

- **GetYourGuide — Partner ID `D5OEC57`:** the primary identity for VIP tours,
  activities, and experiences.
- **Travelpayouts Drive — Source `575698`:** website ownership confirmed and
  Drive active for widgets and multi-program travel monetization.
- **Travelpayouts legacy — Marker `770720` / Source `567182`:** retained
  separately for historical attribution and account continuity; it is not the
  GetYourGuide ID.

### Continue tomorrow

1. Verify one live GetYourGuide redirect and record attribution evidence.
2. Add and validate the first Travelpayouts widget placement.
3. Prepare the next demand-validated VIP article batch.
4. Run controlled SePay payment, entitlement, Telegram, and replay tests.
5. Run PayPal sandbox capture/webhook and idempotency tests.
6. Complete Supabase Auth/RLS two-user isolation checks.
7. Review rate limiting, error logging, and the production AI endpoint.
8. Confirm drip-feed publication and affiliate disclosure QA.
9. Prepare the VIP LAN demo and package comparison.
10. Update live KPI results and propose the final service package for handover.

### Handover guardrails

- Do not merge `D5OEC57` with `770720`; they belong to different affiliate
  systems.
- Do not report catalog records as long-form articles or report clicks as
  commissions.
- Do not mark paid production release complete until payment and replay tests
  pass.
- Record only verified dashboard, deployment, payment, and attribution data.

## 26.26 Luxury Rova character profile — 2026-09-20 07:41 ICT

The team attribution registry now includes the active member ID `rova`,
available through `/m/rova`. The member keeps the project-wide GetYourGuide
Partner ID `D5OEC57` and the existing Travelpayouts attribution boundary.

**Display identity:** Luxury Rova Travel4U Lifestyle
**Badge:** Luxury Lifestyle Curator
**Tier:** Pro
**Positioning:** a strong, elegant, discovery-led luxury lifestyle voice.

The editorial style combines:

- confident and distinctive luxury;
- discovery of rare and lesser-known places;
- romantic journeys and couple experiences;
- refined local cuisine and signature dishes;
- living local culture with respect and modern perspective;
- practical, honest guidance behind the glamour.

**Voice standard:** seductive, sharp, visual, confident, and inspirational
without exaggerating prices, guarantees, reviews, cancellation terms, or
local claims.

**Audience:** discerning luxury travelers, couples planning romantic journeys,
and readers who want sophisticated access to local food and culture.

**Signature rule:** every Rova story should connect destination, emotion,
romance, cuisine, and local culture into one memorable travel experience.

The full structured profile is duplicated in
`src/data/team_members.json` and `public/data/team_members.json` so both the
edge router and client attribution banner use the same identity.

## 26.27 Production hardening audit — 2026-09-20 07:46 ICT

Before starting the next 90-day content phase, a production hardening pass
was completed on the customer-facing app.

### Fixed immediately

- Fixed a duplicate closing block in the SearchBar client script that stopped
  search/filter event handlers from running.
- Fixed the `All (1,000)` category behavior: it now loads the full search
  index instead of restoring only the initial 10 curated cards.
- Added a guarded array check when loading
  `public/data/destinations_search_index.json`.
- Removed hard-coded schema values (`$42.00`, rating `4.8`, review count
  `12,500`) from English and localized experience pages.
- Experience schema now emits `AggregateRating` and `Offer` only when the
  corresponding record contains parseable source data.
- Replaced global unconditional cancellation claims with a clear instruction
  to verify the live provider terms for each experience.

### Validation evidence

- `npm run build`: passed.
- `git diff --check`: passed after the final documentation cleanup.
- Local production preview interaction:
  - initial curated set: 10 cards;
  - Europe filter: 24 matching cards rendered;
  - Kyoto search: 1 matching result;
  - All filter: counter shows 1,000 and Load More is available.
- Live critical routes previously returned HTTP 200, and `/m/rova` returns
  the expected 302 with `t4u_member_ref=rova`.

### Remaining hardening backlog before scaling content

1. Complete end-to-end affiliate click attribution checks for
   `D5OEC57` and Travelpayouts Drive `575698`.
2. Replace any remaining locale copy that makes universal cancellation or
   review-count claims with record-specific verified terms.
3. Complete payment webhook, Auth/RLS isolation, and production AI endpoint
   acceptance tests.
4. Add automated route/link and structured-data regression checks to the
   release process.
5. Only after these checks pass, resume the 90-day content expansion and
   revenue plan.

## 26.28 Live search verification — 2026-09-20 07:59 ICT

The customer-facing search and category tabs were verified on the deployed
site after the SearchBar fix. With the search field cleared, the live
category results were:

| Tab | Results |
|---|---:|
| Europe | 318 |
| Asia | 117 |
| Islands | 107 |
| Safari | 107 |
| Middle East | 2 |
| Wellness Spas | 100 |
| 5-Star Sanctuaries | 400 |

The All tab loads the full 1,000-record index with pagination. A search for
`Kyoto` returns the matching result and updates the live counter. A previous
zero-result observation occurred while the `Kyoto` query remained active when
switching to unrelated tabs; it was expected query-plus-filter behavior, not
a broken category handler.

The Travelpayouts Drive script reports a browser-side CORS/configuration
warning from the external `emrldtp.com` endpoint during local/production
browser inspection. Travelpayouts ownership and Drive activation remain
confirmed, and the warning does not block search, navigation, or booking CTA
interaction. Continue monitoring Drive attribution separately.

## 26.29 Responsive spacing QA — 2026-09-20 08:03 ICT

The mobile screenshot showed unnecessary vertical space between the search
counter and the collection heading. Root cause: both home templates forced
the hero to `min-h-[68vh]` even when the mobile search controls wrapped into
multiple rows.

The responsive spacing was tightened in both
`src/pages/index.astro` and `src/pages/[locale]/index.astro`:

- mobile hero: content-driven height with compact vertical padding;
- tablet: intermediate padding;
- desktop: retains the larger luxury hero rhythm and `68vh` minimum;
- experience section: reduced mobile/tablet padding while preserving desktop
  breathing room.

The preview QA measured zero artificial gap between hero and experience
sections at iPhone width after the change. The page remains responsive for
Android phones, tablets, and desktop breakpoints, and the content flow stays
semantic for SEO.

## 26.30 Vietnamese localization refinement — 2026-09-20 08:10 ICT

The Vietnamese homepage copy was reviewed for meaning and natural usage rather
than literal word-for-word translation. The following corrections were made:

- `Giám Tuyển` was replaced with `Tuyển chọn đặc biệt`, which is clearer in a
  luxury travel context.
- `Được 12.500+ Du Khách Tin Tưởng` was removed because it incorrectly implied
  a review-count endorsement. It now states the actual relationship:
  `Đối tác trải nghiệm chính thức của GetYourGuide`.
- The cancellation badge now tells visitors to check the terms for each
  experience instead of making a universal cancellation promise.
- Hero, search, category, empty-state, card CTA, bookmark/share, price, header,
  and footer labels now use natural Vietnamese wording.
- Vietnamese card descriptions now distinguish editorial selection from the
  provider's live cancellation policy.

## 26.31 Responsive attribution banner QA — 2026-09-20 09:56 ICT

The Rova member attribution banner was tightened for narrow screens. The
previous mobile layout displayed three inline messages and reached roughly
69px, pushing the header and hero below the fold and making the message read
like narrow columns.

The banner now uses:

- one compact, truncated identity line on phones;
- the full curator context only from the small-screen breakpoint upward;
- factual wording (`Explore curated experiences`) instead of the unsupported
  `Exclusive VIP Access Guaranteed` claim;
- smaller, consistent padding and an animated status dot that does not affect
  layout width;
- a versioned `team_attribution.js` asset so deployed browsers cannot retain
  the previous banner indefinitely.
- `role="status"` plus an accessible attribution label for screen readers.

Production QA at 390px, 412px, 768px, and 1440px found no horizontal overflow.
The deployed mobile banner is approximately 25px high, versus approximately
69px previously; tablet is approximately 38px. The production build passed.
The responsive change was committed as `d441d7f`; the accessibility follow-up
is queued as the next deployment.

The change keeps affiliate and trust claims factual while making the
Vietnamese experience readable for native users on mobile and desktop.

## 26.34 Footer SaaS CTA audit — 2026-09-20 10:04 ICT

The footer previously had four responsive content columns, language links,
trust information, and affiliate disclosure, but no conversion CTA. On
mobile this meant the visitor reached the end of the page without a clear
path into the SaaS workspace.

Added a responsive CTA panel before the footer columns:

- primary CTA: `Bắt đầu workspace` / `Start your workspace` → `/app/login/`;
- secondary CTA: return to the localized experience collection;
- mobile buttons stack full-width with a minimum 44px touch height;
- tablet and desktop use a two-part horizontal layout;
- the CTA is excluded from `/app/*` routes so the authenticated workspace
  does not advertise a redundant sign-in action;
- copy describes workspace/project functionality without promising a
  subscription, free tier, or guaranteed outcome.

The footer remains four-column and SEO-readable, while the new CTA supplies
the missing SaaS conversion step on mobile.

## 26.31 Detail-page and catalog hardening — 2026-09-20 08:55 ICT

The Vietnamese detail route was audited and corrected:

- localized the detail-page title suffix, breadcrumb home label, booking CTA,
  and cancellation notice;
- localized ActionBar feedback text after clicking Like;
- softened the Vietnamese video trust copy so it does not imply a provider
  guarantee;
- corrected the remaining Vietnamese article claim that universally promised
  free cancellation and localized the review wording where it was still in
  English.

The 1,000-record search index contained 17 duplicate `k` values across 615
unique keys. Duplicate keys are now assigned deterministic ID suffixes for
the second and later records, preserving all 1,000 catalog entries while
making detail/bookmark identity unique. The catalog sync script now applies
the same rule on future regeneration.

Validation completed:

- `npm run build`: PASS;
- search index: 1,000 records, 1,000 unique keys;
- affiliate audit: 1,850 GetYourGuide links checked, all use `D5OEC57`;
- legacy GetYourGuide ID `4G5BPIE`: 0 occurrences;
- working tree clean and changes pushed to `main`.

## 26.32 Affiliate conversion QA — 2026-09-20 09:07 ICT

Production route checks completed:

- `/`, `/vi/`: HTTP 200;
- `/m/rova`: HTTP 302, `t4u_member_ref=rova`, redirect includes `ref=rova`;
- `/go/gyg_paris_001?ref=rova`: HTTP 302 to GetYourGuide with
  `partner_id=D5OEC57` and `cmp=team_rova_vn_gyg_paris_001`;
- `/go/gyg_paris_001` with cookie `t4u_member_ref=rova`: same attribution,
  confirming cookie-based persistence.

The browser QA found that existing card URLs such as
`cmp=blog_de_gyg_paris_001` were not rewritten for a team member because the
client attribution helper only recognized the older `app_1000` and `t4u_app`
prefixes. The helper now preserves the content context while prepending the
member prefix, for example:
`cmp=team_rova_blog_de_gyg_paris_001`.

The attribution script cache key was versioned in the shared layout so the
production browser does not retain the previous rewrite logic after deploy.
Travelpayouts Drive remains loaded with source `575698`; its external
`emrldtp.com` CORS warning is still provider-side and does not block the
GetYourGuide CTA or `/go/` redirect.

## 26.33 SaaS billing hardening — 2026-09-20 09:36 ICT

Billing code was hardened before sandbox acceptance:

- checkout now requires an active `plan_code`;
- PayPal checkout amount/currency must match the selected plan's
  `price_reference`;
- SePay checkout requires server-side `SEPAY_PLAN_PRICES_JSON`, so the client
  cannot choose an arbitrary low amount and still activate a paid plan;
- PayPal `CHECKOUT.ORDER.COMPLETED` events now read amounts from
  `purchase_units[0].amount`;
- PayPal payment webhooks now activate or renew the corresponding workspace
  subscription, matching SePay behavior;
- both providers can resume an event whose webhook row exists but has no
  `processed_at`, instead of permanently treating it as a duplicate.

Static validation and `npm run build` passed. Real payment acceptance remains
blocked until the owner supplies/sets the real SePay VND price map and runs
provider sandbox tests.

Safe production webhook smoke tests completed on 2026-09-20 10:24 ICT:

- `POST /api/webhooks/sepay` with an invalid signature: HTTP `401`;
- `POST /api/webhooks/paypal` with an empty unsigned body: HTTP `400`;
- no payment, subscription, or database mutation was attempted by these
  probes.

The base SaaS schema is present in the remote Supabase project, but the
corrective membership RLS migration remains a separate deployment gate. The
next acceptance sequence is: apply the corrective migration, run two-user
workspace isolation tests, configure an approved SePay price map, then run
provider sandbox replay/idempotency tests.

The Auth/RLS review also found and corrected a membership escalation path in
the original migration: a signed-in user could insert a membership for
themselves into an arbitrary workspace or update their own role/status. The
membership policies now require the workspace owner/admin for membership
creation and updates; the owner bootstrap path remains allowed only when the
new row matches the workspace owner.

The corrective migration is committed as
`supabase/migrations/20260920094000_harden_membership_rls.sql` and was applied
through the authenticated Supabase SQL Editor on 2026-09-20 10:41 ICT. The
live verification query returned all three expected policies:

- `workspaces_member_select` (`SELECT`);
- `workspace_members_admin_insert` (`INSERT`);
- `workspace_members_admin_update` (`UPDATE`).

The live policy definitions also confirm that membership updates require
`is_workspace_admin(workspace_id)` in both `USING` and `WITH CHECK`, while the
insert policy permits only workspace admins or the constrained owner bootstrap
condition. Two-user authenticated isolation testing remains the next gate.

## 26.35 VIP affiliate commission policy — 2026-09-20 10:46 ICT

The commercial rule is now versioned in the SaaS entitlement layer:

| VIP package | Existing plan mapping | Commission on qualifying sales |
| --- | --- | ---: |
| Gói 1 | `creator` | 10% |
| Gói 2 | `pro` | 20%; may sell any eligible package |
| Gói 3 | `agency` | 30%; may sell any eligible package |
| Free | `free` | 0% |

The new `affiliate_commission_rate` entitlement is seeded by
`supabase/migrations/20260920104500_vip_affiliate_commission_policy.sql`.
This makes the policy queryable through the existing entitlement API without
hard-coding percentages in the frontend. It does not issue payouts by itself:
future commission settlement must verify active subscription, qualifying
order, refunds/chargebacks, and webhook idempotency. The seller's own VIP
package determines the commission rate; the package purchased by the customer
does not change it. Therefore Gói 2 earns 20% on any eligible package sale,
and Gói 3 earns 30% on any eligible package sale.

## 26.36 Ten-day VIP LAN handover plan — 2026-09-20 11:30 ICT

### Current handover truth

The public site is live at `https://travel4you.app/` and the following
production checks pass:

- public homepage and Vietnamese homepage return HTTP 200;
- GetYourGuide attribution uses partner ID `D5OEC57`;
- Rova attribution persists through the member route/cookie;
- responsive footer CTA is live;
- VIP consultation lead form is implemented in source and writes through
  `POST /api/leads` using the server-side Supabase service key;
- production unauthenticated SaaS endpoints remain protected with HTTP 401;
- live Supabase RLS corrective policies and VIP commission entitlements are
  applied and verified.
- the VIP lead migration is applied and a controlled QA submission using the
  owner-provided contact returned HTTP `201`; a repeated submission is now
  rejected within a ten-minute email idempotency window.

### Important non-claim

The AI writing team is **not running as a background production scheduler**.
The current `/api/ai/generate` route is an authenticated, on-demand project
generation path that calls `AI_ROUTER_BASE_URL`/9router when configured.
No cron, queue worker, GitHub Actions workflow, or autonomous writer process
was found in the `travel4you.app` repository. The legacy autonomous writer
scripts under `credentials/travel4you/` belong to the wider WordPress
operations system; they are not proof that this SaaS app is currently
publishing in the background.

### Delivery sequence for the next 10 days

| Day | Delivery gate | Acceptance evidence |
| --- | --- | --- |
| 1 | Apply and verify `public.leads` plus commission ledger migrations | Table existence, RLS query, no public lead read |
| 2 | Submit one marked QA VIP lead using the owner-provided contact | HTTP 201, one `new` row; repeated email is rejected for ten minutes |
| 3 | Create two dedicated test Auth users | Separate accounts, profiles and workspaces created |
| 4 | Execute two-user RLS isolation suite | Cross-workspace reads/writes rejected |
| 5 | Configure approved SePay plan prices | Server secret present; checkout rejects mismatched amounts |
| 6 | Run SePay sandbox signature, amount, reference and replay tests | Valid event activates once; replay is idempotent |
| 7 | Run PayPal sandbox order/webhook tests | Verified event activates the selected subscription |
| 8 | Add server-side commission settlement | Seller plan determines 10/20/30%; refunds void, replay does not duplicate |
| 9 | Configure the 9router production endpoint and run controlled generation | Authenticated project reaches `completed`; failed jobs are visible |
| 10 | VIP LAN handover and operating report | URLs, handoff checklist, dashboards, test evidence and blockers |

## 26.37 Local AI routing audit — 2026-09-20 11:46 ICT

The local environment audit found:

- `AI_ROUTER_BASE_URL` exists as `http://127.0.0.1:8787`;
- `AI_ROUTER_API_KEY` is empty;
- `AI_ROUTER_DEFAULT_MODEL` is empty;
- no 9router variables exist in the shared WordPress operations `.env`;
- no confirmed public/remote 9router endpoint is configured;
- Ollama is listening on `127.0.0.1:11434`;
- Ollama exposes `qwen2.5:0.5b`, and a direct JSON chat smoke test passed.

The authenticated AI generation route now prefers 9router and falls back to
Ollama on timeout, network failure, or upstream error. The fallback is
configured locally with `OLLAMA_BASE_URL`, `OLLAMA_DEFAULT_MODEL`, and
`OLLAMA_TIMEOUT_MS`. This is not an autonomous writer scheduler: generation
still requires an authenticated project request. Cloudflare Pages cannot
reach local `127.0.0.1`, so production requires a network-reachable 9router
or Ollama endpoint before remote AI generation can be claimed live.

The only owner inputs that cannot be safely invented are approved SePay
prices, the production 9router endpoint/API key, and two test-user
credentials or permission to create them. Until those are supplied, the
system must remain in protected/test mode and must not claim autonomous AI
publishing or live commission payouts.

---

**END OF MASTER EXECUTION FILE**

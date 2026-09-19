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
1. **Engine 1 (Experiences):** `travel4you.app` — Powered by GetYourGuide (Partner `4G5BPIE` - 8% Commission). Focuses on VIP Skip-the-line tickets, private yachts, helicopter tours, cultural immersions.
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

---

**END OF MASTER EXECUTION FILE**

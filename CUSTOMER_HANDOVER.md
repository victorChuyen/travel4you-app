# Travel4You.app — Customer Handover Guide

**Product:** Travel4You Luxury Concierge & VIP Experience Engine  
**Production URL:** <https://travel4you.app>  
**Repository:** <https://github.com/victorChuyen/travel4you-app>  
**Handover status:** Customer-ready documentation; owner credentials and billing inputs remain customer-controlled.

## 1. What the customer receives

Travel4You.app is an Astro website deployed on Cloudflare Pages with an
authenticated SaaS foundation. It combines:

- multilingual luxury travel discovery pages;
- GetYourGuide and Travelpayouts attribution;
- responsive desktop, tablet, and mobile conversion UX;
- VIP consultation lead capture;
- Supabase Auth, workspaces, projects, jobs, subscriptions, payments, and RLS;
- authenticated AI project generation;
- a local-first AI routing design with 9router primary and Ollama fallback;
- a 1,000-record searchable destination/experience catalog.

The public website is an acquisition and conversion layer. Supabase remains
the source of truth for authenticated application data. Cloudflare Pages is the
public edge and Functions runtime.

## 2. System map

| Layer | Service | Customer responsibility |
| --- | --- | --- |
| Public web | Astro + Tailwind | Review content, branding, locales, and releases |
| Edge | Cloudflare Pages + Functions | Maintain deployment, secrets, domains, and logs |
| Data/auth | Supabase | Maintain project, Auth, RLS, migrations, backups |
| AI | 9router-compatible API + local Ollama fallback | Supply approved model endpoint and quotas |
| Affiliate | GetYourGuide + Travelpayouts | Maintain partner accounts and attribution policy |
| Handover data | Standalone Google Sheet | Own access, review catalog, and record acceptance |

## 3. Production URLs and critical routes

| Route | Purpose |
| --- | --- |
| `/` | English public homepage |
| `/vi/` | Vietnamese public homepage |
| `/app/login/` | SaaS login |
| `/app/` | Authenticated workspace application |
| `/api/me` | Current authenticated user |
| `/api/entitlements` | Current plan and entitlements |
| `/api/projects` | Workspace projects |
| `/api/ai/generate` | Authenticated project generation |
| `/api/leads` | Public VIP consultation lead capture |
| `/go/[slug]` | Affiliate redirect/attribution boundary |

## 4. Environment and secret transfer

Never place passwords, private keys, webhook secrets, service-role keys, or AI
provider keys in this document or the handover spreadsheet.

Transfer secrets through the customer's password manager or an encrypted
secret channel. Configure production values in Cloudflare encrypted secrets
and Supabase project settings, not in browser code.

Required groups:

1. Supabase public URL and publishable key.
2. Supabase server secret/service-role key where required by Functions.
3. Cloudflare Pages project and custom domain access.
4. AI router endpoint/key and an approved model.
5. Payment webhook secrets and approved plan prices.
6. Affiliate partner credentials and campaign rules.
7. Google service-account or OAuth access for the standalone handover sheet.

The local development environment uses Ollama when available. Cloudflare
Pages cannot reach a developer's `127.0.0.1`; remote AI requires a reachable,
authenticated endpoint.

## 5. Operational runbook

### Local validation

```powershell
cd D:\n8n-selfhost\travel4you.app
npm install
npm run build
```

### AI routing

The authenticated AI route tries 9router first. On timeout, network failure,
or upstream error, it tries Ollama. Both providers must return the required
JSON structure. Invalid output is rejected and is not saved as a successful
project version.

### Content release

1. Confirm destination, search intent, and canonical slug.
2. Generate or edit the article.
3. Run schema, affiliate, duplication, and quality checks.
4. Confirm image rights, attribution, and alt text.
5. Build and inspect the relevant locale pages.
6. Publish only after acceptance evidence is recorded.

### Lead operations

The VIP form submits to `POST /api/leads`. The endpoint validates bounded
fields, rejects honeypot submissions, applies duplicate-email protection, and
writes through the server-side Supabase client. Leads are not publicly
readable.

## 6. AI and 1,000-article target

The 1,000-record catalog and the 1,000-article production target are not the
same measurement. The current local audit on 2026-09-20 found:

- `public/data/destinations_search_index.json`: **1,000 records**;
- `src/data/articles.json`: **120 records**;
- `credentials/travel4you/data/ready_articles/`: **1,015 JSON files** across
  the satellite folders.

These counts must not be merged into one success number. The next acceptance
step is to reconcile slugs, locales, quality status, and publication status
before producing more content. The 1,015 ready files are an inventory signal,
not proof that 1,000 unique customer-ready articles are live.

For Phase 2, use bounded batches:

- approve the keyword and intent list before generation;
- generate articles in small batches;
- enforce Grade-A quality and duplicate checks;
- prioritize high-intent commercial destinations;
- generate video only for approved articles;
- record model, prompt hash, media source, status, and estimated cost;
- stop on quota, quality, budget, or duplicate-content thresholds.

No background AI publishing scheduler is currently claimed as live.

## 7. Billing and affiliate status

Billing remains protected until the customer supplies approved official prices
and production webhook credentials. Do not invent prices or mark a payment as
successful without a verified provider event.

VIP seller commission policy:

- Free: 0%.
- Package 1 seller: 10% on any eligible package sold.
- Package 2 seller: 20% on any eligible package sold.
- Package 3 seller: 30% on any eligible package sold.

The seller's owned package determines the rate; the buyer's purchased package
does not change the seller's rate. Settlement still requires verified orders,
refund handling, and idempotent webhook processing.

## 8. Acceptance checklist

- [ ] Customer has access to the standalone handover spreadsheet.
- [ ] Customer has Cloudflare Pages and domain ownership.
- [ ] Customer has Supabase project access.
- [ ] Customer has rotated all development credentials.
- [ ] Homepage and Vietnamese homepage return HTTP 200.
- [ ] Mobile, tablet, and desktop layouts have no horizontal overflow.
- [ ] Affiliate redirects preserve campaign attribution.
- [ ] Valid VIP lead returns HTTP 201.
- [ ] Duplicate lead submission is rejected within the protection window.
- [ ] Unauthenticated SaaS APIs return HTTP 401.
- [ ] AI endpoint has a reachable approved provider before production use.
- [ ] Payment prices and webhook credentials are approved before activation.
- [ ] Article inventory has been reconciled by unique slug, locale, quality,
  and live/pending status against the 1,000 target.

## 9. Handover workbook

The standalone workbook is created by:

```powershell
cd D:\n8n-selfhost\travel4you.app
node scripts/create_customer_handover_sheet.cjs
```

For the owner OAuth path, configure `GOOGLE_OAUTH_REFRESH_TOKEN` only in the
local secret environment together with the existing Google OAuth client
credentials. Never paste the refresh token into this document or a Sheet.

It creates these customer-facing tabs without writing to the old internal
master workbook:

- `00_README`
- `01_ARCHITECTURE`
- `02_ENVIRONMENT`
- `03_DEPLOYMENT`
- `04_SECURITY`
- `05_ACCEPTANCE`
- `06_CONTENT_CATALOG`

The workbook can be created with either:

1. a user OAuth refresh token for the Drive owner; or
2. a service-account key with access to the source workbook and sufficient
   Drive quota.

The new Google Cloud project currently blocks service-account key creation via
the organization policy `iam.disableServiceAccountKeyCreation`. Do not disable
that security policy merely to create a downloadable key. Use user OAuth or
Workload Identity Federation instead. Credential files and refresh tokens are
intentionally not included in Git.

## 10. Known handover blockers

1. A standalone Google Sheet has not been created until the new service-account
   key is available locally and Google Drive accepts the create/copy request.
2. Production remote AI endpoint is not configured; local Ollama works only on
   the host where it is running.
3. Official SePay prices are pending customer approval.
4. Two dedicated Auth test users and the full two-user RLS isolation test are
   pending.
5. No 24/7 GPU video VPS has been provisioned.

These are explicit handover gates, not hidden assumptions.

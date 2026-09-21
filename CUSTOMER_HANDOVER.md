# Travel4You.app — Customer Handover Guide

**Product:** Travel4You Luxury Travel Affiliate & Guide Publisher
**Production URL:** <https://travel4you.app>  
**Repository:** <https://github.com/victorChuyen/travel4you-app>  
**Handover status:** Customer-ready documentation; owner credentials and billing inputs remain customer-controlled.

**Closure status (2026-09-21 10:09 ICT):** Code, build, production homepage,
affiliate catalog, AI routing, Supabase newsletter migration, deployment, and
handover documentation are ready for customer review. The production
subscription endpoint has passed HTTP 201 persistence QA. Final email closure
is blocked because the Resend sender/API configuration still returns
`emailSent:false`; the production Pages secret now exists, but sender-domain
verification/delivery must be completed in Resend.

## 1. What the customer receives

Travel4You.app is an Astro website deployed on Cloudflare Pages with an
authenticated SaaS foundation. It combines:

- multilingual luxury travel discovery pages;
- GetYourGuide and Travelpayouts attribution;
- responsive desktop, tablet, and mobile conversion UX;
- guide-update newsletter capture;
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
| `/api/leads` | Public guide-update subscription capture |
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

The public guide-update form submits to `POST /api/leads` with
`request_type=newsletter`. The endpoint validates bounded fields, rejects
honeypot submissions, applies duplicate-email protection, and writes through
the server-side Supabase client. Subscriber records are not publicly readable.

### Transactional email configuration

Production email uses Resend with the verified sender
`support@travel4you.app`. Cloudflare Email Sending is not required.

1. Verify `travel4you.app` in Resend.
2. Publish the exact SPF, DKIM, and DMARC records supplied by Resend.
3. Create a restricted Resend API key for the Pages project.
4. Store the key only as a Cloudflare Pages production secret:

   ```powershell
   npx wrangler pages secret put RESEND_API_KEY --project-name travel4you-app
   ```

5. Confirm that `SUPABASE_SECRET_KEY` (or the approved service-role secret)
   is present in the same production environment.
6. Submit one real test lead and verify:
   - the lead is present in `public.leads`;
   - the owner notification reaches `getyourguidemedia@gmail.com`;
   - the owner message replies to the customer's email;
   - the customer confirmation is delivered;
   - the API response contains `emailSent: true`.

Never put either secret in `src/`, `public/`, `wrangler.toml`, a spreadsheet,
or this handover document. Rotate the Resend key immediately if it is exposed.

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

### Content expansion plan for customer handover

The next content phase is a controlled expansion from the current 120 app
article records. It is not a promise to publish 1,000 pages automatically.
Each new article must have a unique canonical slug and pass the following
workflow:

| Phase | Deliverable | Acceptance gate |
| --- | --- | --- |
| 1. Demand research | Keyword, country, language, intent, seasonality, and source URL | Evidence recorded; no invented volume |
| 2. Editorial brief | Search intent, reader profile, angle, outline, affiliate opportunities | Owner approves topic and primary keyword |
| 3. Draft | Original luxury guide with practical details and first-hand editorial voice | Factual review and no copied source text |
| 4. Monetization | GYG contextual links, disclosure, cancellation wording, and related internal links | Partner ID and `rel="nofollow sponsored noopener"` verified |
| 5. Localization | Native-quality title, metadata, body, CTA, and hreflang mapping | No English fallback in a localized page |
| 6. Media | Rights-cleared hero/body media, alt text, attribution, and stable paths | Duplicate/hash and license checks pass |
| 7. QA and release | Build, schema, links, mobile layout, performance, and status update | Quality gate passes; publish status recorded |

Recommended 90-day sequence:

| Sprint | Scope | Output target |
| --- | --- | --- |
| Days 1–14 | Reconcile the 120 records and fix missing locale, media, affiliate, and SEO fields | A clean baseline inventory |
| Days 15–35 | Paris, Rome, Lake Como, Kyoto, Maldives, and Santorini commercial clusters | 24–36 canonical articles |
| Days 36–56 | Safari, Swiss Alps, Amalfi, Bali, Dubai, and Portugal clusters | 24–36 canonical articles |
| Days 57–77 | Comparison, itinerary, seasonal, accessibility, family, and honeymoon intent | 24–36 canonical articles |
| Days 78–90 | Refresh winners, complete approved translations, link hubs, and retire weak topics | Acceptance-ready release set |

The initial publishing cadence should be no more than two approved articles
per day per site, with localization scheduled only after the source article
passes QA. The team should prioritize commercial and high-intent queries, but
must use measured Search Console, Keyword Planner, or another documented
keyword source before assigning an intent tier.

For every article, record at minimum: `hub_folder`, `locale`, canonical
`slug`, primary keyword, evidence source and date, intent tier, quality score,
affiliate link status, media hash/license status, article status
(`draft`, `review`, `approved`, `published`, or `retired`), published URL,
and last refresh date. Do not mark a record live until the URL has been
verified in production.

The handover owner should approve the first batch of 12 source articles
(two per priority cluster) before the team localizes or scales the next batch.
This creates a reviewable style baseline and prevents low-quality translation
or duplicate destination pages from being multiplied.

The workbook keeps these inventories separate:

- `06_CONTENT_CATALOG`: the 120 existing localized editorial records;
- `07_AFFILIATE_CATALOG_1000`: all 1,000 catalog points with their GYG
  partner link, campaign, image, and editorial-availability status.

The first 12 pilot drafts generated from catalog points are stored locally in
`src/data/article_pilot_batch_12.json` with status `draft`. They are not yet
merged into `src/data/articles.json` or published. Approval must happen after
fact-checking, media licensing, affiliate-link review, and a production build.

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
- [ ] Valid newsletter subscription returns HTTP 201.
- [ ] Duplicate newsletter subscription is rejected within the protection window.
- [ ] Unauthenticated SaaS APIs return HTTP 401.
- [ ] AI endpoint has a reachable approved provider before production use.
- [ ] Payment prices and webhook credentials are approved before activation.
- [ ] Article inventory has been reconciled by unique slug, locale, quality,
  and live/pending status against the 1,000 target.
- [ ] Resend domain is verified and DNS authentication is passing.
- [ ] `RESEND_API_KEY` is present as a production-only Pages secret.
- [ ] A real newsletter test returns `emailSent: true` and both messages are
      received.
- [ ] The first 12-article editorial batch has owner approval before scale-up.
- [ ] Every published article has evidence-backed demand metadata and a
      verified production URL.

### Final closure actions requiring customer-controlled access

1. Verify `travel4you.app` in Resend and publish the exact SPF, DKIM, and
   return-path records supplied by Resend. The current public SPF record only
   contains Cloudflare Email Routing.
2. Submit one controlled newsletter test using an approved owner email.
3. Verify one Supabase row, owner notification, subscriber confirmation, and
   duplicate protection; require `emailSent:true`.
4. Rotate any development credentials that were used during implementation.

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

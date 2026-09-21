# Supabase project setup

This directory contains database migrations for the SaaS layer. The existing
Astro public SEO site remains independent of these tables.

Run from the project directory after installing the Supabase CLI and logging in:

```powershell
supabase login
supabase link --project-ref pceoqkinwsmsqmvqteiv
supabase db push
```

Never commit `.env`, database passwords, service/secret keys, or access tokens.

## SaaS verification notes

The migration includes the public publication RPC
`public.get_publication_by_slug(text)`. The public API uses this function so
anonymous readers receive only published public/unlisted content and never
direct access to private project drafts.

The SePay callback is:

```text
POST /api/webhooks/sepay
```

It requires the server-only `SEPAY_WEBHOOK_SECRET` and
`SEPAY_PLAN_PRICES_JSON` (for example `{"creator":750000,"pro":2500000}`),
matches the payment reference and configured VND amount, records webhook
idempotency, marks the payment as paid, and activates the plan stored in the
checkout metadata. Verify the payload and signature contract against the live
SePay account before enabling production payments.

PayPal checkout validates the amount against the selected plan's USD
`price_reference`. Both webhook handlers are retry-safe: a fully processed
event is ignored, while an event recorded before an interrupted activation can
resume processing.

The workspace membership policies intentionally do not allow self-joining by
workspace ID or self-editing a membership role/status. Only the workspace
owner or an active admin can create or change memberships.

## VIP affiliate commission policy

The active VIP seller commission is represented by the
`affiliate_commission_rate` entitlement. The current mapping is:

| Commercial package | SaaS plan code | Commission |
| --- | --- | ---: |
| VIP package 1 | `creator` | 10% |
| VIP package 2 | `pro` | 20% |
| VIP package 3 | `agency` | 30% |
| Free | `free` | 0% |

Package 2 may sell any eligible package and earns 20%. Package 3 may also sell
any eligible package and earns 30%. The seller's own package determines the
rate; the package purchased by the customer does not change that rate.
The entitlement is a policy value only; payout calculation must still validate
the seller's active subscription, qualifying order, refund/chargeback status,
and idempotency before recording a commission.

The commission ledger migration adds `public.affiliate_commissions` with a
unique `(seller_workspace_id, qualifying_sale_reference)` key. Only service
role/server-side settlement code should insert, approve, void, or pay ledger
rows; workspace members have read-only access to their own workspace rows.

## Public guide-update subscriptions

`20260920113000_vip_leads.sql` creates `public.leads` for public lead capture.
The follow-up migration `20260921090000_newsletter_leads.sql` permits
`request_type=newsletter` for the public guide-update CTA. `POST /api/leads`
validates and inserts with the server-side Supabase secret. RLS intentionally
has no anonymous `SELECT` or `INSERT` policy. If a record is assigned a
`workspace_id`, active members of that workspace can read it; the server role
remains the only public-form writer.

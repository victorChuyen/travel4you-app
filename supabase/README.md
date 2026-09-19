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

It requires the server-only `SEPAY_WEBHOOK_SECRET`, matches the payment
reference and VND amount, records webhook idempotency, marks the payment as
paid, and activates the plan stored in the checkout metadata. Verify the
payload and signature contract against the live SePay account before enabling
production payments.

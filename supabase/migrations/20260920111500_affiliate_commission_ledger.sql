create table if not exists public.affiliate_commissions (
  id uuid primary key default gen_random_uuid(),
  seller_workspace_id uuid not null references public.workspaces(id) on delete cascade,
  seller_user_id uuid not null references auth.users(id) on delete restrict,
  source_payment_id uuid references public.payments(id) on delete set null,
  qualifying_sale_reference text not null,
  seller_plan_code text not null,
  commission_rate numeric(5, 2) not null check (commission_rate >= 0 and commission_rate <= 100),
  sale_amount numeric(12, 2) not null check (sale_amount >= 0),
  commission_amount numeric(12, 2) not null check (commission_amount >= 0),
  currency text not null default 'USD',
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'paid', 'void')),
  metadata_json jsonb not null default '{}'::jsonb,
  approved_at timestamptz,
  paid_at timestamptz,
  voided_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (seller_workspace_id, qualifying_sale_reference)
);

create index if not exists affiliate_commissions_seller_idx
  on public.affiliate_commissions(seller_workspace_id, status, created_at desc);

create index if not exists affiliate_commissions_payment_idx
  on public.affiliate_commissions(source_payment_id);

drop trigger if exists affiliate_commissions_updated_at on public.affiliate_commissions;
create trigger affiliate_commissions_updated_at
before update on public.affiliate_commissions
for each row execute function public.set_updated_at();

alter table public.affiliate_commissions enable row level security;

drop policy if exists affiliate_commissions_member_select on public.affiliate_commissions;
create policy affiliate_commissions_member_select on public.affiliate_commissions
for select using (public.is_workspace_member(seller_workspace_id));

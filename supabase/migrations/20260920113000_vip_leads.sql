create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid references public.workspaces(id) on delete set null,
  name text not null check (char_length(trim(name)) between 1 and 120),
  email text not null check (
    char_length(trim(email)) between 3 and 254
    and trim(email) ~* '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'
  ),
  phone text check (phone is null or char_length(trim(phone)) between 7 and 32),
  request_type text not null check (request_type in ('private_itinerary', 'vip_experience', 'hotel_villa', 'other')),
  destination text check (destination is null or char_length(trim(destination)) between 1 and 160),
  budget text check (budget is null or char_length(trim(budget)) between 1 and 80),
  message text check (message is null or char_length(trim(message)) <= 2000),
  source text not null default 'vip-footer' check (char_length(trim(source)) between 1 and 80),
  status text not null default 'new' check (status in ('new', 'contacted', 'qualified', 'converted', 'archived')),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists leads_created_at_idx on public.leads(created_at desc);
create index if not exists leads_workspace_status_idx on public.leads(workspace_id, status, created_at desc);

drop trigger if exists leads_updated_at on public.leads;
create trigger leads_updated_at
before update on public.leads
for each row execute function public.set_updated_at();

alter table public.leads enable row level security;

-- Public submissions are written by the server-side Pages Function with the
-- service role. There is deliberately no anon INSERT policy or public SELECT.
drop policy if exists leads_workspace_member_select on public.leads;
create policy leads_workspace_member_select on public.leads
for select using (
  workspace_id is not null
  and public.is_workspace_member(workspace_id)
);

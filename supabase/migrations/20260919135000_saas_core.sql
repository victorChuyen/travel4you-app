create extension if not exists "pgcrypto";

create type public.workspace_type as enum ('personal', 'creator', 'agency');
create type public.workspace_member_role as enum ('owner', 'admin', 'member', 'viewer');
create type public.workspace_member_status as enum ('invited', 'active', 'suspended');
create type public.project_status as enum ('draft', 'generating', 'ready', 'published', 'archived');
create type public.project_visibility as enum ('private', 'unlisted', 'public');
create type public.project_version_source as enum ('user', 'ai', 'import');
create type public.ai_job_status as enum ('queued', 'running', 'completed', 'failed', 'cancelled');
create type public.subscription_status as enum ('trialing', 'active', 'past_due', 'cancelled', 'expired');

create or replace function public.set_updated_at()
returns trigger
language plpgsql
security invoker
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, display_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data ->> 'full_name', new.email))
  on conflict (id) do update
    set email = excluded.email,
        updated_at = timezone('utc', now());
  return new;
end;
$$;

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  display_name text,
  avatar_url text,
  status text not null default 'active',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

create table public.workspaces (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) between 1 and 120),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  type public.workspace_type not null default 'personal',
  owner_user_id uuid not null references auth.users(id) on delete restrict,
  status text not null default 'active',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.workspace_members (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.workspace_member_role not null default 'member',
  status public.workspace_member_status not null default 'active',
  invited_at timestamptz,
  joined_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (workspace_id, user_id)
);

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  created_by_user_id uuid not null references auth.users(id) on delete restrict,
  project_type text not null default 'travel_project',
  title text not null check (char_length(trim(title)) between 1 and 200),
  destination text,
  audience text,
  locale text not null default 'en',
  status public.project_status not null default 'draft',
  visibility public.project_visibility not null default 'private',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.project_versions (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  version_number integer not null check (version_number > 0),
  structured_content_json jsonb not null default '{}'::jsonb,
  source public.project_version_source not null,
  created_by_user_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default timezone('utc', now()),
  unique (project_id, version_number)
);

create table public.ai_jobs (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  project_id uuid not null references public.projects(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete restrict,
  job_type text not null,
  status public.ai_job_status not null default 'queued',
  provider_key text not null default '9router-local',
  model_class text,
  input_metadata_json jsonb not null default '{}'::jsonb,
  output_metadata_json jsonb not null default '{}'::jsonb,
  usage_json jsonb not null default '{}'::jsonb,
  retry_count integer not null default 0 check (retry_count >= 0),
  error_code text,
  created_at timestamptz not null default timezone('utc', now()),
  started_at timestamptz,
  completed_at timestamptz
);

create table public.plans (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  active boolean not null default true,
  billing_period text not null check (billing_period in ('monthly', 'yearly', 'custom')),
  price_reference jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.entitlements (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  description text not null,
  value_type text not null check (value_type in ('boolean', 'integer', 'string', 'json')),
  created_at timestamptz not null default timezone('utc', now())
);

create table public.plan_entitlements (
  plan_id uuid not null references public.plans(id) on delete cascade,
  entitlement_id uuid not null references public.entitlements(id) on delete cascade,
  value_json jsonb not null,
  primary key (plan_id, entitlement_id)
);

create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  billing_provider text not null check (billing_provider in ('paypal', 'sepay')),
  external_customer_id text,
  external_subscription_id text,
  plan_id uuid references public.plans(id) on delete restrict,
  status public.subscription_status not null,
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancel_at_period_end boolean not null default false,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (billing_provider, external_subscription_id)
);

create table public.usage_counters (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  entitlement_code text not null,
  period_key text not null,
  quantity bigint not null default 0 check (quantity >= 0),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (workspace_id, entitlement_code, period_key)
);

create table public.publications (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null unique references public.projects(id) on delete cascade,
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  visibility public.project_visibility not null,
  published_version_id uuid references public.project_versions(id) on delete restrict,
  published_at timestamptz,
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  workspace_id uuid references public.workspaces(id) on delete set null,
  session_id text,
  event_name text not null,
  entity_type text,
  entity_id uuid,
  properties_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now())
);

create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid references public.workspaces(id) on delete set null,
  actor_user_id uuid references auth.users(id) on delete set null,
  actor_type text not null default 'user',
  action text not null,
  entity_type text,
  entity_id uuid,
  metadata_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now())
);

create table public.billing_webhook_events (
  id uuid primary key default gen_random_uuid(),
  provider text not null check (provider in ('paypal', 'sepay')),
  external_event_id text not null,
  event_type text not null,
  payload_hash text not null,
  processed_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  unique (provider, external_event_id)
);

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  provider text not null check (provider in ('paypal', 'sepay')),
  external_payment_id text,
  order_reference text not null unique,
  amount numeric(12, 2) not null check (amount >= 0),
  currency text not null default 'USD',
  status text not null check (status in ('pending', 'paid', 'failed', 'refunded')),
  raw_metadata_json jsonb not null default '{}'::jsonb,
  paid_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index workspace_members_user_idx on public.workspace_members(user_id);
create index projects_workspace_idx on public.projects(workspace_id, updated_at desc);
create index project_versions_project_idx on public.project_versions(project_id, version_number desc);
create index ai_jobs_workspace_status_idx on public.ai_jobs(workspace_id, status, created_at desc);
create index subscriptions_workspace_idx on public.subscriptions(workspace_id, status);
create index publications_workspace_idx on public.publications(workspace_id);
create index events_workspace_idx on public.events(workspace_id, created_at desc);
create index audit_logs_workspace_idx on public.audit_logs(workspace_id, created_at desc);
create index payments_workspace_idx on public.payments(workspace_id, created_at desc);

create trigger profiles_updated_at before update on public.profiles
for each row execute function public.set_updated_at();
create trigger workspaces_updated_at before update on public.workspaces
for each row execute function public.set_updated_at();
create trigger workspace_members_updated_at before update on public.workspace_members
for each row execute function public.set_updated_at();
create trigger projects_updated_at before update on public.projects
for each row execute function public.set_updated_at();
create trigger plans_updated_at before update on public.plans
for each row execute function public.set_updated_at();
create trigger subscriptions_updated_at before update on public.subscriptions
for each row execute function public.set_updated_at();
create trigger publications_updated_at before update on public.publications
for each row execute function public.set_updated_at();
create trigger payments_updated_at before update on public.payments
for each row execute function public.set_updated_at();

create or replace function public.is_workspace_member(target_workspace_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.workspace_members
    where workspace_id = target_workspace_id
      and user_id = auth.uid()
      and status = 'active'
  );
$$;

create or replace function public.is_workspace_admin(target_workspace_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.workspace_members
    where workspace_id = target_workspace_id
      and user_id = auth.uid()
      and role in ('owner', 'admin')
      and status = 'active'
  );
$$;

alter table public.profiles enable row level security;
alter table public.workspaces enable row level security;
alter table public.workspace_members enable row level security;
alter table public.projects enable row level security;
alter table public.project_versions enable row level security;
alter table public.ai_jobs enable row level security;
alter table public.plans enable row level security;
alter table public.entitlements enable row level security;
alter table public.plan_entitlements enable row level security;
alter table public.subscriptions enable row level security;
alter table public.usage_counters enable row level security;
alter table public.publications enable row level security;
alter table public.events enable row level security;
alter table public.audit_logs enable row level security;
alter table public.billing_webhook_events enable row level security;
alter table public.payments enable row level security;

create policy profiles_self_select on public.profiles for select using (id = auth.uid());
create policy profiles_self_insert on public.profiles for insert with check (id = auth.uid());
create policy profiles_self_update on public.profiles for update using (id = auth.uid()) with check (id = auth.uid());

create policy workspaces_member_select on public.workspaces for select using (public.is_workspace_member(id));
create policy workspaces_owner_insert on public.workspaces for insert with check (owner_user_id = auth.uid());
create policy workspaces_admin_update on public.workspaces for update using (public.is_workspace_admin(id)) with check (public.is_workspace_admin(id));

create policy workspace_members_member_select on public.workspace_members
for select using (public.is_workspace_member(workspace_id));
create policy workspace_members_admin_insert on public.workspace_members
for insert with check (public.is_workspace_admin(workspace_id) or user_id = auth.uid());
create policy workspace_members_admin_update on public.workspace_members
for update using (public.is_workspace_admin(workspace_id) or user_id = auth.uid())
with check (public.is_workspace_admin(workspace_id) or user_id = auth.uid());

create policy projects_member_select on public.projects for select using (public.is_workspace_member(workspace_id));
create policy projects_member_insert on public.projects
for insert with check (public.is_workspace_member(workspace_id) and created_by_user_id = auth.uid());
create policy projects_member_update on public.projects
for update using (public.is_workspace_member(workspace_id)) with check (public.is_workspace_member(workspace_id));
create policy projects_member_delete on public.projects for delete using (public.is_workspace_member(workspace_id));

create policy project_versions_member_select on public.project_versions
for select using (exists (
  select 1 from public.projects p
  where p.id = project_versions.project_id and public.is_workspace_member(p.workspace_id)
));
create policy project_versions_member_insert on public.project_versions
for insert with check (exists (
  select 1 from public.projects p
  where p.id = project_versions.project_id and public.is_workspace_member(p.workspace_id)
));

create policy ai_jobs_member_select on public.ai_jobs for select using (public.is_workspace_member(workspace_id));
create policy ai_jobs_member_insert on public.ai_jobs
for insert with check (public.is_workspace_member(workspace_id) and user_id = auth.uid());

create policy plans_active_select on public.plans for select using (active = true);
create policy entitlements_select on public.entitlements for select using (true);
create policy plan_entitlements_select on public.plan_entitlements for select using (true);

create policy subscriptions_member_select on public.subscriptions
for select using (public.is_workspace_member(workspace_id));
create policy usage_counters_member_select on public.usage_counters
for select using (public.is_workspace_member(workspace_id));
create policy publications_member_select on public.publications
for select using (public.is_workspace_member(workspace_id));
create policy publications_public_select on public.publications
for select using (
  visibility in ('public', 'unlisted')
  and published_version_id is not null
  and published_at is not null
);
create policy publications_member_insert on public.publications
for insert with check (public.is_workspace_member(workspace_id));
create policy publications_member_update on public.publications
for update using (public.is_workspace_member(workspace_id)) with check (public.is_workspace_member(workspace_id));

create policy events_member_insert on public.events
for insert with check (user_id = auth.uid() and (workspace_id is null or public.is_workspace_member(workspace_id)));
create policy events_member_select on public.events
for select using (workspace_id is null or public.is_workspace_member(workspace_id));

create policy audit_logs_member_select on public.audit_logs
for select using (workspace_id is null or public.is_workspace_member(workspace_id));

create policy payments_member_select on public.payments
for select using (public.is_workspace_member(workspace_id));

create or replace function public.get_publication_by_slug(target_slug text)
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  select jsonb_build_object(
    'slug', publication.slug,
    'visibility', publication.visibility,
    'published_at', publication.published_at,
    'published_version_id', publication.published_version_id,
    'project', jsonb_build_object(
      'id', project.id,
      'title', project.title,
      'destination', project.destination,
      'audience', project.audience,
      'locale', project.locale
    ),
    'version', jsonb_build_object(
      'id', version.id,
      'version_number', version.version_number,
      'structured_content_json', version.structured_content_json
    )
  )
  from public.publications publication
  join public.projects project on project.id = publication.project_id
  join public.project_versions version on version.id = publication.published_version_id
  where publication.slug = target_slug
    and publication.visibility in ('public', 'unlisted')
    and publication.published_version_id is not null
    and publication.published_at is not null;
$$;

revoke all on function public.get_publication_by_slug(text) from public;
grant execute on function public.get_publication_by_slug(text) to anon, authenticated;

insert into public.plans (code, name, billing_period, price_reference)
values
  ('free', 'Free', 'monthly', '{"amount": 0, "currency": "USD"}'),
  ('creator', 'Creator', 'monthly', '{"amount": 29, "currency": "USD"}'),
  ('pro', 'Pro', 'monthly', '{"amount": 99, "currency": "USD"}'),
  ('agency', 'Agency', 'monthly', '{"amount": 299, "currency": "USD"}')
on conflict (code) do nothing;

insert into public.entitlements (code, description, value_type)
values
  ('projects_monthly', 'Maximum projects created per billing period', 'integer'),
  ('ai_generations_monthly', 'Maximum AI generations per billing period', 'integer'),
  ('languages', 'Number of generation languages', 'integer'),
  ('team_members', 'Maximum active workspace members', 'integer'),
  ('custom_branding', 'Custom workspace branding', 'boolean'),
  ('public_publish', 'Publish shareable project pages', 'boolean')
on conflict (code) do nothing;

insert into public.plan_entitlements (plan_id, entitlement_id, value_json)
select p.id, e.id, values.value_json::jsonb
from (values
  ('free', 'projects_monthly', '3'),
  ('free', 'ai_generations_monthly', '5'),
  ('free', 'languages', '1'),
  ('free', 'team_members', '1'),
  ('free', 'custom_branding', 'false'),
  ('free', 'public_publish', 'true'),
  ('creator', 'projects_monthly', '10'),
  ('creator', 'ai_generations_monthly', '50'),
  ('creator', 'languages', '3'),
  ('creator', 'team_members', '1'),
  ('creator', 'custom_branding', 'false'),
  ('creator', 'public_publish', 'true'),
  ('pro', 'projects_monthly', '50'),
  ('pro', 'ai_generations_monthly', '250'),
  ('pro', 'languages', '12'),
  ('pro', 'team_members', '5'),
  ('pro', 'custom_branding', 'true'),
  ('pro', 'public_publish', 'true'),
  ('agency', 'projects_monthly', '500'),
  ('agency', 'ai_generations_monthly', '2000'),
  ('agency', 'languages', '12'),
  ('agency', 'team_members', '25'),
  ('agency', 'custom_branding', 'true'),
  ('agency', 'public_publish', 'true')
) as values(plan_code, entitlement_code, value_json)
join public.plans p on p.code = values.plan_code
join public.entitlements e on e.code = values.entitlement_code
on conflict (plan_id, entitlement_id) do update set value_json = excluded.value_json;

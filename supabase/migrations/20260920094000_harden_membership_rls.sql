drop policy if exists workspaces_member_select on public.workspaces;
create policy workspaces_member_select on public.workspaces
for select using (owner_user_id = auth.uid() or public.is_workspace_member(id));

drop policy if exists workspace_members_admin_insert on public.workspace_members;
create policy workspace_members_admin_insert on public.workspace_members
for insert with check (
  public.is_workspace_admin(workspace_id)
  or exists (
    select 1
    from public.workspaces w
    where w.id = workspace_members.workspace_id
      and w.owner_user_id = auth.uid()
      and workspace_members.user_id = auth.uid()
      and workspace_members.role = 'owner'
      and workspace_members.status = 'active'
  )
);

drop policy if exists workspace_members_admin_update on public.workspace_members;
create policy workspace_members_admin_update on public.workspace_members
for update using (public.is_workspace_admin(workspace_id))
with check (public.is_workspace_admin(workspace_id));

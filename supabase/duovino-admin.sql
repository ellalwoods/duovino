-- Duovino analytics: lets chosen cellars (just Ella's) see everyone's progress.
-- Run AFTER duovino.sql. Safe in a shared project: only duovino_ objects.
--
-- Who counts as an admin is decided here, in the database, not in the app,
-- so nobody can give themselves access by editing the app.

create table if not exists public.duovino_admins (
  id text primary key references public.duovino_cellars(id) on delete cascade
);
alter table public.duovino_admins enable row level security;
revoke all on public.duovino_admins from anon, authenticated;

-- Everyone's cellars, but only if the caller's cellar is an admin. Anyone else gets null.
create or replace function public.duovino_admin_list(p_id text)
returns jsonb
language sql
security definer
set search_path = public
as $$
  select case when exists (select 1 from public.duovino_admins where id = p_id) then
    coalesce((select jsonb_agg(jsonb_build_object('name', name, 'state', state, 'created_at', created_at,
                                                  'updated_at', updated_at, 'me', id = p_id) order by updated_at desc)
              from public.duovino_cellars), '[]'::jsonb)
  end;
$$;

revoke all on function public.duovino_admin_list(text) from public;
grant execute on function public.duovino_admin_list(text) to anon;

-- Make Ella an admin. First check there's exactly one cellar called Ella:
--   select name, created_at from public.duovino_cellars order by created_at;
-- then:
insert into public.duovino_admins (id)
select id from public.duovino_cellars where lower(name) = 'ella'
on conflict do nothing;

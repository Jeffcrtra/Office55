-- Activa Authentication > Sign In / Providers > Anonymous Sign-Ins.
create table if not exists public.office_state (
 user_id uuid primary key references auth.users(id) on delete cascade,
 data jsonb not null,
 updated_at timestamptz not null default now()
);
alter table public.office_state enable row level security;
create policy "Read own office state" on public.office_state for select to authenticated using ((select auth.uid()) = user_id);
create policy "Insert own office state" on public.office_state for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "Update own office state" on public.office_state for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
grant select, insert, update on public.office_state to authenticated;

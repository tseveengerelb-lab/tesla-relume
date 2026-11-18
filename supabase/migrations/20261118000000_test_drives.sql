-- Test drive requests from the "Туршиж жолоодох" form. Free: no payment involved.
-- Run in the Supabase dashboard: SQL Editor → New query → paste → Run.
--
-- Rows are written only by the server with the secret key (app/test-drive-actions.ts).
-- The public key has no rights here; signed-in admins may only read.

create table if not exists public.test_drives (
  id             uuid        primary key default gen_random_uuid(),
  model          text        not null,              -- "Model 3"
  full_name      text        not null,
  phone          text        not null,              -- 8 digits
  preferred_date date        not null,
  preferred_time text        not null,              -- "10:00–12:00"
  status         text        not null default 'new'
                 check (status in ('new', 'contacted', 'done', 'cancelled')),
  created_at     timestamptz not null default now()
);

create index if not exists test_drives_created_at_idx on public.test_drives (created_at desc);

alter table public.test_drives enable row level security;

revoke all on public.test_drives from anon;
grant select on public.test_drives to authenticated;
grant all on public.test_drives to service_role;

drop policy if exists "Admins can read test drives" on public.test_drives;
create policy "Admins can read test drives"
  on public.test_drives for select
  to authenticated
  using (exists (select 1 from public.admins where user_id = (select auth.uid())));

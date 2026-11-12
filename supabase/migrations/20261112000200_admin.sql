-- Admin editing for the home page cards.
-- Run in the Supabase dashboard: SQL Editor → New query → paste → Run.
-- Then add yourself as an admin with the statement at the bottom of this file.

-- Who may edit. A row here, plus a signed-in Supabase Auth user, makes an admin.
create table if not exists public.admins (
  user_id    uuid        primary key references auth.users (id) on delete cascade,
  email      text        not null,
  created_at timestamptz not null default now()
);

alter table public.admins enable row level security;

-- A signed-in user can see only their own row, which is all the app needs to
-- tell whether they are an admin. Nobody can add rows through the API.
drop policy if exists "Users can read their own admin row" on public.admins;
create policy "Users can read their own admin row"
  on public.admins for select
  to authenticated
  using (user_id = (select auth.uid()));

-- Admins may edit the cards (the public can still only read them).
drop policy if exists "Admins can update models" on public.models;
create policy "Admins can update models"
  on public.models for update
  to authenticated
  using (exists (select 1 from public.admins where user_id = (select auth.uid())))
  with check (exists (select 1 from public.admins where user_id = (select auth.uid())));

-- Admins may upload new card images to the public `images` bucket.
-- Every upload gets a new file name, so no update or delete rights are needed.
drop policy if exists "Admins can upload images" on storage.objects;
create policy "Admins can upload images"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'images'
    and exists (select 1 from public.admins where user_id = (select auth.uid()))
  );

-- ── Add an admin ─────────────────────────────────────────────────────────────
-- 1. Authentication → Users → Add user → Create new user
--    (e-mail + password, tick "Auto Confirm User").
-- 2. Put that e-mail below, then run just this statement:
--
-- insert into public.admins (user_id, email)
-- select id, email from auth.users where email = 'you@example.com'
-- on conflict (user_id) do nothing;

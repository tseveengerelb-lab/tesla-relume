-- Orders placed through the site's order form and paid with Byl.
-- Run in the Supabase dashboard: SQL Editor → New query → paste → Run.
--
-- Rows are written only by the server with the secret key (SUPABASE_SECRET_KEY):
--   app/order-actions.ts       inserts the order before sending the buyer to Byl
--   app/api/byl/webhook        marks it paid when Byl sends checkout.completed
-- The public key has no rights here; signed-in admins may only read.

create table if not exists public.orders (
  id              text        primary key,       -- our order id, sent to Byl as client_reference_id
  model           text,                          -- "Model 3"
  full_name       text,
  email           text        not null,
  postal_code     text,
  phone           text,                          -- collected on Byl's checkout page
  amount          numeric(14, 2) not null,       -- deposit asked, ₮
  amount_paid     numeric(14, 2),                -- from the webhook
  status          text        not null default 'pending'
                  check (status in ('pending', 'awaiting_verification', 'paid')),
  byl_checkout_id bigint      unique,
  created_at      timestamptz not null default now(),
  paid_at         timestamptz,
  updated_at      timestamptz not null default now()
);

create index if not exists orders_created_at_idx on public.orders (created_at desc);

alter table public.orders enable row level security;

grant select on public.orders to authenticated;
grant all on public.orders to service_role;

drop policy if exists "Admins can read orders" on public.orders;
create policy "Admins can read orders"
  on public.orders for select
  to authenticated
  using (exists (select 1 from public.admins where user_id = (select auth.uid())));

-- public.touch_updated_at() comes from 20261112000000_create_models.sql.
drop trigger if exists orders_touch_updated_at on public.orders;
create trigger orders_touch_updated_at
  before update on public.orders
  for each row execute function public.touch_updated_at();

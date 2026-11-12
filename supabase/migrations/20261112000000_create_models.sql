-- Vehicle models shown as product cards on the home page.
-- Run once in the Supabase dashboard: SQL Editor → New query → paste → Run.

create table if not exists public.models (
  slug             text primary key,              -- matches the page URL: /model-3
  name             text        not null,
  card_description text        not null,
  card_price       text        not null,          -- display text, e.g. "$36,990-с эхэлнэ"
  image_url        text        not null,          -- "/images/..." or a Supabase Storage URL
  image_alt        text        not null default '',
  sort_order       integer     not null default 0,
  updated_at       timestamptz not null default now()
);

-- Anyone may read the cards; nobody may write through the public key.
-- Writes will come later from the signed-in admin.
alter table public.models enable row level security;

drop policy if exists "Models are readable by everyone" on public.models;
create policy "Models are readable by everyone"
  on public.models for select
  to anon, authenticated
  using (true);

-- Keep updated_at current on every edit.
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists models_touch_updated_at on public.models;
create trigger models_touch_updated_at
  before update on public.models
  for each row execute function public.touch_updated_at();

-- Starting data, copied from data/models.ts. Re-running updates the rows.
insert into public.models (slug, name, card_description, card_price, image_url, image_alt, sort_order) values
  ('model-3',    'Model 3',    'Спорт седан · 0–97 км/цаг 2.9 секундэд (Performance)',      '$36,990-с эхэлнэ',     '/images/model-3.jpg',    'Цөлийн замд зогсож буй улаан Model 3',                     1),
  ('model-y',    'Model Y',    'Гэр бүлийн SUV · Сонголтоор 7 суудал (Premium AWD)',          '$39,990-с эхэлнэ',     '/images/model-y.jpg',    'Усны эрэг дээр зогсож буй мөнгөлөг Model Y',               2),
  ('cybertruck', 'Cybertruck', 'Зэвэрдэггүй ган пикап · 523 км хүртэл явах зай',              '$69,990-с эхэлнэ',     '/images/cybertruck.jpg', 'Цөлийн хадны дунд зогсож буй зэвэрдэггүй ган Cybertruck', 3),
  ('roadster',   'Roadster',   'Цахилгаан гиперкар · 2028 онд үйлдвэрлэхээр төлөвлөсөн',      'Урьдчилгаа: $50,000',  '/images/roadster.jpg',   'Уулс дундуур давхиж буй улаан Roadster',                   4)
on conflict (slug) do update set
  name             = excluded.name,
  card_description = excluded.card_description,
  card_price       = excluded.card_price,
  image_url        = excluded.image_url,
  image_alt        = excluded.image_alt,
  sort_order       = excluded.sort_order;

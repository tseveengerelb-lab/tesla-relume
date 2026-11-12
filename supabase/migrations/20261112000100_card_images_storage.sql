-- Card images in Supabase Storage.
-- Order:
--   1. Run 20261112000000_create_models.sql.
--   2. Storage → New bucket → name `images`, Public ON.
--   3. Upload model-3.jpg, model-y.jpg, cybertruck.jpg, roadster.jpg from public/images/.
--   4. Run this file. It pins the bucket settings and switches the cards to Storage URLs;
--      running it before step 3 would leave the cards with broken images.

-- Public bucket: anyone can view a file by URL; uploads need the dashboard or a secret key.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('images', 'images', true, 5242880, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update set
  public             = excluded.public,
  file_size_limit    = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- Point each card at its Storage file: images/<slug>.jpg
update public.models
set image_url = 'https://xgbxuuzmqrisdnmcqzou.supabase.co/storage/v1/object/public/images/' || slug || '.jpg'
where image_url like '/images/%';

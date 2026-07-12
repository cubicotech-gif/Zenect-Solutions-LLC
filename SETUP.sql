-- ════════════════════════════════════════════════════════════════════
--  ZENECT SOLUTIONS — Supabase provisioning
--  Paste this whole file into the Supabase SQL Editor and run it once.
--  It is idempotent: safe to re-run. Every policy/trigger is dropped and
--  recreated, and the storage bucket is upserted.
-- ════════════════════════════════════════════════════════════════════

create extension if not exists pgcrypto;

-- ─────────────────────────────────────────────────────────────
--  1. TABLES
-- ─────────────────────────────────────────────────────────────

-- Contact-form messages
create table if not exists public.inquiries (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  full_name   text not null,
  email       text not null,
  phone       text,
  subject     text,
  body        text not null,
  status      text not null default 'new'
    check (status in ('new','read','replied','archived'))
);

-- Equipment quote requests
create table if not exists public.quote_requests (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  full_name   text not null,
  email       text not null,
  phone       text,
  division    text,
  quantity    integer not null default 1,
  notes       text,
  status      text not null default 'new'
    check (status in ('new','read','replied','archived'))
);

-- Newsletter subscribers
create table if not exists public.newsletter_signups (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  email       text not null unique,
  source      text
);

-- Key/value settings store
create table if not exists public.site_settings (
  key         text primary key,
  value       jsonb,
  updated_at  timestamptz not null default now()
);

-- Keep site_settings.updated_at fresh
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_site_settings_touch on public.site_settings;
create trigger trg_site_settings_touch
  before update on public.site_settings
  for each row execute function public.touch_updated_at();

-- ─────────────────────────────────────────────────────────────
--  2. ROW LEVEL SECURITY
--
--  This site runs entirely from the browser with the anon key, so the
--  policies below grant the anon role what the pages need:
--    • anyone may INSERT form rows (contact / quote / newsletter)
--    • the /console (passphrase-gated in the client) reads + updates
--      submissions using the same anon key
--  NOTE: the console is protected only by the client-side passphrase.
--  For stronger isolation of submissions, add Supabase Auth and scope
--  the SELECT/UPDATE policies below to authenticated staff.
-- ─────────────────────────────────────────────────────────────

alter table public.inquiries          enable row level security;
alter table public.quote_requests     enable row level security;
alter table public.newsletter_signups enable row level security;
alter table public.site_settings      enable row level security;

-- inquiries
drop policy if exists inquiries_insert on public.inquiries;
create policy inquiries_insert on public.inquiries
  for insert to anon, authenticated with check (true);

drop policy if exists inquiries_select on public.inquiries;
create policy inquiries_select on public.inquiries
  for select to anon, authenticated using (true);

drop policy if exists inquiries_update on public.inquiries;
create policy inquiries_update on public.inquiries
  for update to anon, authenticated using (true) with check (true);

-- quote_requests
drop policy if exists quotes_insert on public.quote_requests;
create policy quotes_insert on public.quote_requests
  for insert to anon, authenticated with check (true);

drop policy if exists quotes_select on public.quote_requests;
create policy quotes_select on public.quote_requests
  for select to anon, authenticated using (true);

drop policy if exists quotes_update on public.quote_requests;
create policy quotes_update on public.quote_requests
  for update to anon, authenticated using (true) with check (true);

-- newsletter_signups
drop policy if exists newsletter_insert on public.newsletter_signups;
create policy newsletter_insert on public.newsletter_signups
  for insert to anon, authenticated with check (true);

drop policy if exists newsletter_select on public.newsletter_signups;
create policy newsletter_select on public.newsletter_signups
  for select to anon, authenticated using (true);

-- site_settings
drop policy if exists settings_select on public.site_settings;
create policy settings_select on public.site_settings
  for select to anon, authenticated using (true);

drop policy if exists settings_upsert on public.site_settings;
create policy settings_upsert on public.site_settings
  for insert to anon, authenticated with check (true);

drop policy if exists settings_update on public.site_settings;
create policy settings_update on public.site_settings
  for update to anon, authenticated using (true) with check (true);

-- ─────────────────────────────────────────────────────────────
--  3. STORAGE BUCKET  (brand-media — public, 5 MB, images only)
-- ─────────────────────────────────────────────────────────────

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'brand-media',
  'brand-media',
  true,
  5242880,
  array['image/png','image/jpeg','image/webp','image/svg+xml','image/x-icon']
)
on conflict (id) do update set
  public             = excluded.public,
  file_size_limit    = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- Public read for every image in the bucket
drop policy if exists brand_media_read on storage.objects;
create policy brand_media_read on storage.objects
  for select to anon, authenticated
  using (bucket_id = 'brand-media');

-- Console (anon key) may add / replace / remove images
drop policy if exists brand_media_insert on storage.objects;
create policy brand_media_insert on storage.objects
  for insert to anon, authenticated
  with check (bucket_id = 'brand-media');

drop policy if exists brand_media_update on storage.objects;
create policy brand_media_update on storage.objects
  for update to anon, authenticated
  using (bucket_id = 'brand-media')
  with check (bucket_id = 'brand-media');

drop policy if exists brand_media_delete on storage.objects;
create policy brand_media_delete on storage.objects
  for delete to anon, authenticated
  using (bucket_id = 'brand-media');

-- ════════════════════════════════════════════════════════════════════
--  Done. Set the env vars in Vercel, redeploy, open /console, upload art.
-- ════════════════════════════════════════════════════════════════════

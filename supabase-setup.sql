-- Run this in your Supabase SQL Editor

create table volunteer_registrations (
  id          uuid        default gen_random_uuid() primary key,
  full_name   text        not null,
  age         integer     not null check (age >= 16 and age <= 100),
  city        text        not null,
  phone       text        not null,
  email       text        not null unique,
  skills      text[]      not null,
  availability text[]     not null,
  motivation  text        not null,
  created_at  timestamptz default now() not null
);

-- Optional: disable public read access (data is only written, never read from the browser)
alter table volunteer_registrations enable row level security;

-- Allow inserts from the service role key only (used by the server action)
-- No SELECT/UPDATE/DELETE policy needed — the service role bypasses RLS

-- -------------------------------------------------------
-- Sapling registration (Green Bengaluru popup)
-- -------------------------------------------------------

create table sapling_registrations (
  id         uuid        default gen_random_uuid() primary key,
  full_name  text        not null,
  address    text        not null,
  pin_code   text        not null,
  mobile     text        not null,
  created_at timestamptz default now() not null
);

alter table sapling_registrations enable row level security;

-- -------------------------------------------------------
-- Plantation status map
-- -------------------------------------------------------

create table plantation_sites (
  id            uuid        default gen_random_uuid() primary key,
  year          integer     not null,
  district      text        not null,
  place_name    text        not null,
  sapling_count integer     not null check (sapling_count > 0),
  latitude      numeric(9,6),
  longitude     numeric(9,6),
  planted_date  date,
  created_at    timestamptz default now() not null
);

create table plantation_media (
  id            uuid        default gen_random_uuid() primary key,
  site_id       uuid        not null references plantation_sites(id) on delete cascade,
  storage_path  text        not null,
  file_type     text        not null check (file_type in ('photo', 'video')),
  caption       text,
  sort_order    integer     not null default 0,
  created_at    timestamptz default now() not null
);

-- Index for common query patterns
create index plantation_sites_year_idx      on plantation_sites(year);
create index plantation_sites_district_idx  on plantation_sites(district);
create index plantation_media_site_id_idx   on plantation_media(site_id);

-- RLS: public read (plantation data is shown publicly on the website)
alter table plantation_sites  enable row level security;
alter table plantation_media  enable row level security;

create policy "public read plantation_sites"
  on plantation_sites for select using (true);

create policy "public read plantation_media"
  on plantation_media for select using (true);

-- Storage bucket: run this once to create the bucket (or create it in the Supabase dashboard)
-- insert into storage.buckets (id, name, public) values ('plantation-media', 'plantation-media', true);

-- Storage RLS: allow public read of plantation media files
-- create policy "public read plantation-media bucket"
--   on storage.objects for select
--   using (bucket_id = 'plantation-media');

-- -------------------------------------------------------
-- Site settings: saplings planted counter
-- -------------------------------------------------------
-- Run this to add the saplings_planted column to the existing site_settings table:
-- alter table site_settings add column saplings_planted integer default 40000;
-- update site_settings set saplings_planted = 40000 where id = true;

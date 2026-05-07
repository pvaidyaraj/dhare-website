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

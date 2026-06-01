-- Run this in the Supabase SQL Editor (Dashboard → SQL → New query)

create table if not exists public.keys (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  status text not null default 'unused' check (status in ('unused', 'used', 'expired')),
  key_type text not null default 'free' check (key_type in ('free', 'paid')),
  expires_at timestamptz not null,
  hwid text,
  banned boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists keys_key_idx on public.keys (key);
create index if not exists keys_status_idx on public.keys (status);
create index if not exists keys_banned_idx on public.keys (banned);

alter table public.keys enable row level security;

-- No anon/authenticated policies on keys.
-- All access via Next.js API routes using SUPABASE_SERVICE_ROLE_KEY.
-- Browser users cannot list or read keys from Supabase directly.

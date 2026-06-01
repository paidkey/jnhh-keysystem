-- Run in Supabase SQL Editor after initial schema (if already deployed)

drop policy if exists "Allow anon select keys" on public.keys;
drop policy if exists "Allow anon insert free keys" on public.keys;

alter table public.keys
  add column if not exists banned boolean not null default false;

create index if not exists keys_banned_idx on public.keys (banned);

revoke select on public.keys from anon, authenticated;
revoke update on public.keys from anon, authenticated;

alter table public.keys enable row level security;

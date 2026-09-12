-- Run in Supabase SQL Editor after initial schema (if already deployed)

drop policy if exists "Allow anon select keys" on public.keys;
drop policy if exists "Allow anon insert free keys" on public.keys;

-- hwid to track per-device issuance, banned flag, issued_at for the rolling window
alter table public.keys
  add column if not exists hwid text,
  add column if not exists banned boolean not null default false,
  add column if not exists issued_at timestamptz not null default now();

create index if not exists keys_banned_idx on public.keys (banned);
create index if not exists keys_hwid_idx on public.keys (hwid);
create index if not exists keys_hwid_issued_at_idx on public.keys (hwid, issued_at desc);

-- Lock the table down completely for anon/authenticated.
revoke select, insert, update, delete on public.keys from anon, authenticated;

alter table public.keys enable row level security;
-- No policies added on purpose: with RLS on and zero policies,
-- anon/authenticated get zero direct access, full stop.
-- All access happens through the SECURITY DEFINER function below,
-- which runs as the table owner and therefore bypasses RLS.

-- pgcrypto for random key generation
create extension if not exists pgcrypto;

create or replace function public.generate_daily_key(p_hwid text)
returns table(key text, already_issued boolean, retry_after timestamptz)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_existing_key   text;
  v_last_issued_at timestamptz;
  v_new_key        text;
  v_is_banned      boolean;
  v_window         interval := interval '10 hours';
begin
  if p_hwid is null or length(trim(p_hwid)) = 0 then
    raise exception 'hwid is required';
  end if;

  -- Serialize concurrent calls for the same hwid so two simultaneous
  -- requests can't both slip past the check-and-insert below.
  perform pg_advisory_xact_lock(hashtextextended(p_hwid, 0));

  -- Optional: block hwids that have ever been banned.
  select exists (
    select 1 from public.keys where hwid = p_hwid and banned = true
  ) into v_is_banned;

  if v_is_banned then
    raise exception 'this device is banned';
  end if;

  -- Most recent key for this hwid, if any.
  select k.key, k.issued_at
    into v_existing_key, v_last_issued_at
  from public.keys k
  where k.hwid = p_hwid
  order by k.issued_at desc
  limit 1;

  if v_last_issued_at is not null and v_last_issued_at > now() - v_window then
    -- Still within the 10h window: hand back the existing key.
    return query select v_existing_key, true, v_last_issued_at + v_window;
    return;
  end if;

  -- Window has passed (or no key ever issued): generate a new one.
  v_new_key := encode(gen_random_bytes(16), 'hex');

  insert into public.keys (key, hwid, issued_at)
  values (v_new_key, p_hwid, now());

  return query select v_new_key, false, now() + v_window;
end;
$$;

-- Anyone (even unauthenticated clients) can call this function,
-- but they still can't touch the table directly.
grant execute on function public.generate_daily_key(text) to anon, authenticated;

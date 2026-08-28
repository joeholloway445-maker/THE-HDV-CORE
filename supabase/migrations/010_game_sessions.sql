-- Game sessions: one session per active run. A character can only have one
-- ACTIVE session at a time. On death the session transitions to DEAD; the
-- character can respawn (new session) or it can be COMPLETED on a clean clear.

create table if not exists public.game_sessions (
  id uuid primary key default gen_random_uuid(),
  character_id uuid not null references public.characters(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  status text not null default 'ACTIVE' check (status in ('ACTIVE', 'DEAD', 'COMPLETED')),
  waves_cleared int not null default 0,
  loot_gained jsonb not null default '[]'::jsonb,
  started_at timestamptz not null default now(),
  ended_at timestamptz
);

-- Only one ACTIVE session per character at a time.
create unique index if not exists game_sessions_one_active_per_character
  on public.game_sessions (character_id)
  where (status = 'ACTIVE');

create index if not exists game_sessions_character_idx on public.game_sessions (character_id);
create index if not exists game_sessions_user_idx on public.game_sessions (user_id);

alter table public.game_sessions enable row level security;

-- Users can read their own sessions.
drop policy if exists "users read own sessions" on public.game_sessions;
create policy "users read own sessions" on public.game_sessions
  for select using (auth.uid() = user_id);

-- Users can insert their own sessions (start_session function validates one-active limit).
drop policy if exists "users insert own sessions" on public.game_sessions;
create policy "users insert own sessions" on public.game_sessions
  for insert with check (auth.uid() = user_id);

-- Users can update their own sessions (for wave progression and status changes).
drop policy if exists "users update own sessions" on public.game_sessions;
create policy "users update own sessions" on public.game_sessions
  for update using (auth.uid() = user_id);

-- ── RPC helpers ─────────────────────────────────────────────────────────────

-- start_session: validates character ownership, enforces one-active limit,
-- returns the new session row.
create or replace function public.start_session(p_character_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user uuid := auth.uid();
  v_session_id uuid;
begin
  -- Verify character belongs to caller.
  if not exists (
    select 1 from public.characters
    where id = p_character_id and user_id = v_user
  ) then
    raise exception 'character not found' using errcode = 'P0002';
  end if;

  -- Unique index on (character_id) where status='ACTIVE' enforces this, but
  -- a friendly message is better than a constraint violation.
  if exists (
    select 1 from public.game_sessions
    where character_id = p_character_id and status = 'ACTIVE'
  ) then
    raise exception 'session already active' using errcode = 'P0001';
  end if;

  insert into public.game_sessions (character_id, user_id)
  values (p_character_id, v_user)
  returning id into v_session_id;

  return (
    select row_to_json(s)::jsonb
    from public.game_sessions s
    where s.id = v_session_id
  );
end;
$$;

-- resolve_encounter: increments waves_cleared, appends any loot. Returns
-- updated session. If the encounter kills the character (died=true), marks
-- the session DEAD and sets ended_at.
create or replace function public.resolve_encounter(
  p_session_id uuid,
  p_died boolean,
  p_loot jsonb default '[]'::jsonb
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user uuid := auth.uid();
  v_session game_sessions%rowtype;
begin
  select * into v_session
  from public.game_sessions
  where id = p_session_id and user_id = v_user
  for update;

  if not found then
    raise exception 'session not found' using errcode = 'P0002';
  end if;

  if v_session.status <> 'ACTIVE' then
    raise exception 'session is not active' using errcode = 'P0001';
  end if;

  if p_died then
    update public.game_sessions
    set
      status = 'DEAD',
      loot_gained = loot_gained || p_loot,
      ended_at = now()
    where id = p_session_id;
  else
    update public.game_sessions
    set
      waves_cleared = waves_cleared + 1,
      loot_gained = loot_gained || p_loot
    where id = p_session_id;
  end if;

  return (
    select row_to_json(s)::jsonb
    from public.game_sessions s
    where s.id = p_session_id
  );
end;
$$;

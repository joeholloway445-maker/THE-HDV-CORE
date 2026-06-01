-- Periliminal.Space — Initial Schema
-- Run this in your Supabase SQL editor or apply via Supabase CLI

create extension if not exists "pgcrypto";

-- ── PROFILES ────────────────────────────────────────────────────────────────
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  created_at timestamptz default now()
);

-- ── CHARACTERS ──────────────────────────────────────────────────────────────
create table public.characters (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  faction text not null check (faction in ('veiled_current', 'sovereign_crown', 'wildlands_ascendants')),
  race text not null,
  frame text not null,
  physical_mod text not null,
  prestige_level int not null default 1,
  xp int not null default 0,
  created_at timestamptz default now(),
  unique (user_id)
);

-- ── CURRENCIES ──────────────────────────────────────────────────────────────
create table public.player_currencies (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  coin bigint not null default 0,
  chip bigint not null default 0,
  fragments bigint not null default 0,
  tokens bigint not null default 0,
  charges bigint not null default 0,
  renown bigint not null default 0,
  updated_at timestamptz default now(),
  unique (user_id)
);

-- ── COLLECTED ENTITIES ───────────────────────────────────────────────────────
create table public.player_entities (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  entity_id text not null,
  faction text not null check (faction in ('veiled_current', 'sovereign_crown', 'wildlands_ascendants')),
  entity_type text not null check (entity_type in ('warrior', 'guardian', 'trickster')),
  count int not null default 1,
  first_encountered_at timestamptz default now(),
  unique (user_id, entity_id)
);

-- ── EXPLORED TILES (fog of war) ──────────────────────────────────────────────
create table public.explored_tiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  zone text not null check (zone in ('supraliminal', 'liminal', 'periliminal', 'subliminal', 'hyperliminal')),
  tile_x int not null,
  tile_y int not null,
  explored_at timestamptz default now(),
  unique (user_id, zone, tile_x, tile_y)
);

-- ── ROW LEVEL SECURITY ───────────────────────────────────────────────────────
alter table public.profiles enable row level security;
alter table public.characters enable row level security;
alter table public.player_currencies enable row level security;
alter table public.player_entities enable row level security;
alter table public.explored_tiles enable row level security;

create policy "own profile" on public.profiles
  for all using (auth.uid() = id);

create policy "own character" on public.characters
  for all using (auth.uid() = user_id);

create policy "own currencies" on public.player_currencies
  for all using (auth.uid() = user_id);

create policy "own entities" on public.player_entities
  for all using (auth.uid() = user_id);

create policy "own tiles" on public.explored_tiles
  for all using (auth.uid() = user_id);

-- ── AUTO-BOOTSTRAP ON SIGNUP ─────────────────────────────────────────────────
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, username)
  values (new.id, split_part(new.email, '@', 1))
  on conflict (id) do nothing;

  insert into public.player_currencies (user_id)
  values (new.id)
  on conflict (user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

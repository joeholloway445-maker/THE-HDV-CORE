-- KNOLL Security Dashboard Schema
-- Private backend operations layer. Owner-only access via RLS.

create table if not exists knoll_agents (
  id text primary key,
  name text not null,
  class text not null check (class in ('root','persistent','ephemeral','child')),
  status text not null default 'idle',
  version text,
  uptime_pct numeric(5,2),
  config jsonb default '{}',
  capabilities text[] default '{}',
  owner_id uuid references auth.users(id) on delete cascade,
  updated_at timestamptz default now()
);

create table if not exists knoll_nodes (
  id text primary key,
  parent_id text references knoll_agents(id) on delete cascade,
  name text not null,
  role text not null,
  description text,
  status text not null default 'idle',
  memory_type text default 'none',
  capabilities text[] default '{}',
  tools jsonb default '[]',
  owner_id uuid references auth.users(id) on delete cascade,
  updated_at timestamptz default now()
);

create table if not exists knoll_activity_log (
  id uuid primary key default gen_random_uuid(),
  agent_id text not null,
  agent_name text not null,
  action text not null,
  target text,
  status text not null default 'pending' check (status in ('success','error','pending','blocked')),
  latency_ms integer default 0,
  details jsonb default '{}',
  owner_id uuid references auth.users(id) on delete cascade,
  created_at timestamptz default now()
);

create table if not exists knoll_personas (
  id text primary key,
  name text not null,
  agent_id text not null,
  traits text[] default '{}',
  voice_style text,
  context_rules text[] default '{}',
  active boolean default false,
  owner_id uuid references auth.users(id) on delete cascade,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists knoll_goals (
  id text primary key,
  title text not null,
  description text,
  status text default 'active' check (status in ('active','achieved','blocked','abandoned')),
  priority text default 'medium' check (priority in ('critical','high','medium','low')),
  agent_ids text[] default '{}',
  progress integer default 0 check (progress between 0 and 100),
  owner_id uuid references auth.users(id) on delete cascade,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists knoll_plans (
  id text primary key,
  title text not null,
  description text,
  status text default 'active' check (status in ('active','completed','paused','cancelled')),
  agent_ids text[] default '{}',
  progress integer default 0 check (progress between 0 and 100),
  steps jsonb default '[]',
  owner_id uuid references auth.users(id) on delete cascade,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists knoll_documents (
  id text primary key,
  title text not null,
  type text default 'note' check (type in ('spec','guide','schema','log','artifact','note')),
  agent_ids text[] default '{}',
  summary text,
  content text,
  owner_id uuid references auth.users(id) on delete cascade,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists knoll_repos (
  id text primary key,
  name text not null,
  url text,
  primary_agent text,
  status text default 'active' check (status in ('active','archived','consolidating')),
  description text,
  owner_id uuid references auth.users(id) on delete cascade,
  updated_at timestamptz default now()
);

create table if not exists knoll_sessions (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references auth.users(id) on delete cascade,
  started_at timestamptz default now(),
  last_active_at timestamptz default now(),
  permissions text[] default '{}',
  metadata jsonb default '{}'
);

-- RLS: owner-only
alter table knoll_agents enable row level security;
alter table knoll_nodes enable row level security;
alter table knoll_activity_log enable row level security;
alter table knoll_personas enable row level security;
alter table knoll_goals enable row level security;
alter table knoll_plans enable row level security;
alter table knoll_documents enable row level security;
alter table knoll_repos enable row level security;
alter table knoll_sessions enable row level security;

create policy "Owner only" on knoll_agents for all using (auth.uid() = owner_id);
create policy "Owner only" on knoll_nodes for all using (auth.uid() = owner_id);
create policy "Owner only" on knoll_activity_log for all using (auth.uid() = owner_id);
create policy "Owner only" on knoll_personas for all using (auth.uid() = owner_id);
create policy "Owner only" on knoll_goals for all using (auth.uid() = owner_id);
create policy "Owner only" on knoll_plans for all using (auth.uid() = owner_id);
create policy "Owner only" on knoll_documents for all using (auth.uid() = owner_id);
create policy "Owner only" on knoll_repos for all using (auth.uid() = owner_id);
create policy "Owner only" on knoll_sessions for all using (auth.uid() = owner_id);

-- Index for fast activity log queries
create index if not exists knoll_activity_log_created_at_idx on knoll_activity_log(created_at desc);
create index if not exists knoll_activity_log_agent_id_idx on knoll_activity_log(agent_id);

-- Realtime for activity log
alter publication supabase_realtime add table knoll_activity_log;

-- AI Trust Gap: schema, policies and aggregate functions.
-- Run this in the Supabase SQL editor (or ask Lovable to run it).
--
-- The design principle: individual team responses are NEVER readable through
-- the API, by anyone, including us. There is no SELECT policy on the responses
-- table. The only way to see anything is through trust_gap_report(), which
-- returns aggregates and refuses to return them below the response threshold.
-- That means the anonymity promise and the five response gate are enforced by
-- the database, not by client code that could be bypassed.

-- ─── Tables ──────────────────────────────────────────────────────────────────

create table if not exists public.trust_gap_sessions (
  id                 uuid primary key default gen_random_uuid(),
  code               text not null unique check (char_length(code) = 10),
  -- Leader answers
  d1_usage_estimate  integer not null check (d1_usage_estimate between 0 and 100),
  d2_concealment     text    not null check (d2_concealment in ('none','few','half','most','unknown')),
  d3_reasons         text[]  not null default '{}',
  d4_clarity         integer not null check (d4_clarity between 1 and 5),
  d5_timesaving      text    not null check (d5_timesaving in ('recognition','more_work','questions','unsure')),
  d6_comfort         integer not null check (d6_comfort between 1 and 5),
  -- Captured at the share step, used only to notify when the report is ready
  leader_email       text,
  notified_at        timestamptz,
  created_at         timestamptz not null default now()
);

create table if not exists public.trust_gap_responses (
  id             uuid primary key default gen_random_uuid(),
  session_code   text not null references public.trust_gap_sessions(code) on delete cascade,
  d1_frequency   text    not null check (d1_frequency in ('daily','weekly','occasionally','never')),
  d2_concealed   text    not null check (d2_concealed in ('yes','no')),
  d3_reasons     text[]  not null default '{}',
  d4_clarity     integer not null check (d4_clarity between 1 and 5),
  d5_timesaving  text    not null check (d5_timesaving in ('tell_manager','quiet_other_work','quiet_same_pace')),
  d6_comfort     integer not null check (d6_comfort between 1 and 5),
  created_at     timestamptz not null default now()
);

create index if not exists trust_gap_responses_code_idx on public.trust_gap_responses (session_code);

-- ─── Row level security ──────────────────────────────────────────────────────

alter table public.trust_gap_sessions  enable row level security;
alter table public.trust_gap_responses enable row level security;

-- A leader can create a session. Nobody can read the table directly.
drop policy if exists "trust_gap_sessions insert" on public.trust_gap_sessions;
create policy "trust_gap_sessions insert" on public.trust_gap_sessions
  for insert with check (true);

-- A team member can submit one response. There is deliberately NO select policy.
drop policy if exists "trust_gap_responses insert" on public.trust_gap_responses;
create policy "trust_gap_responses insert" on public.trust_gap_responses
  for insert with check (true);

-- ─── Functions ───────────────────────────────────────────────────────────────

-- Attach the leader's email at the share step. Scoped to the email column only,
-- which RLS alone cannot express, hence a function.
create or replace function public.trust_gap_set_email(p_code text, p_email text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.trust_gap_sessions
     set leader_email = p_email
   where code = p_code;
end;
$$;

-- Does this code exist, and how many responses so far? Used by the team survey
-- and the waiting page. Returns no answer data at all.
create or replace function public.trust_gap_status(p_code text)
returns table (session_exists boolean, response_count integer)
language sql
security definer
set search_path = public
as $$
  select
    exists(select 1 from public.trust_gap_sessions s where s.code = p_code),
    (select count(*)::integer from public.trust_gap_responses r where r.session_code = p_code);
$$;

-- The report. Returns the leader's own answers plus AGGREGATED team data.
-- Aggregates are returned only once the threshold is met. Below it, the caller
-- gets the count and nothing else.
create or replace function public.trust_gap_report(p_code text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_session public.trust_gap_sessions%rowtype;
  v_count   integer;
  v_min     integer := 5;
  v_reasons jsonb;
begin
  select * into v_session from public.trust_gap_sessions where code = p_code;
  if not found then
    return jsonb_build_object('found', false);
  end if;

  select count(*) into v_count from public.trust_gap_responses where session_code = p_code;

  if v_count < v_min then
    return jsonb_build_object(
      'found', true,
      'unlocked', false,
      'response_count', v_count,
      'required', v_min
    );
  end if;

  -- Reason tallies across everyone who concealed.
  select coalesce(jsonb_object_agg(reason, n), '{}'::jsonb) into v_reasons
  from (
    select unnest(d3_reasons) as reason, count(*)::int as n
    from public.trust_gap_responses
    where session_code = p_code and d2_concealed = 'yes'
    group by 1
  ) t;

  return jsonb_build_object(
    'found', true,
    'unlocked', true,
    'response_count', v_count,
    'leader', jsonb_build_object(
      'd1_usage_estimate', v_session.d1_usage_estimate,
      'd2_concealment',    v_session.d2_concealment,
      'd3_reasons',        to_jsonb(v_session.d3_reasons),
      'd4_clarity',        v_session.d4_clarity,
      'd5_timesaving',     v_session.d5_timesaving,
      'd6_comfort',        v_session.d6_comfort
    ),
    'team', (
      select jsonb_build_object(
        'count',             count(*)::int,
        'd1_regular_pct',    round(100.0 * count(*) filter (where d1_frequency in ('daily','weekly')) / count(*), 1),
        'd2_concealed_pct',  round(100.0 * count(*) filter (where d2_concealed = 'yes') / count(*), 1),
        'd3_reason_counts',  v_reasons,
        'd4_clarity_mean',   round(avg(d4_clarity), 2),
        'd5_quiet_pct',      round(100.0 * count(*) filter (where d5_timesaving in ('quiet_other_work','quiet_same_pace')) / count(*), 1),
        'd6_comfort_mean',   round(avg(d6_comfort), 2)
      )
      from public.trust_gap_responses
      where session_code = p_code
    )
  );
end;
$$;

-- Anonymous callers may run the functions, but not read the tables.
grant execute on function public.trust_gap_set_email(text, text) to anon, authenticated;
grant execute on function public.trust_gap_status(text)          to anon, authenticated;
grant execute on function public.trust_gap_report(text)          to anon, authenticated;

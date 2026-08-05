-- The Impact Gap: schema, policies and report function.
-- Run this in the Supabase SQL editor. It is safe to re-run.
--
-- Same design principle as trust_gap.sql, for the same reason: individual team
-- responses are never readable through the API, by anyone, including us. There
-- is no SELECT policy on the responses table. Everything a browser can see
-- comes back through impact_gap_report(), which refuses to return anything at
-- all below the response threshold. The anonymity promise and the five response
-- minimum are enforced by the database rather than by client code that could
-- be bypassed by anyone who opens the network tab.
--
-- The one place this goes further than trust_gap: the report returns the D4
-- free text answers verbatim, because reading your team's own words in their
-- own phrasing does more than any chart. They come back shuffled and with no
-- timestamps, so nobody can line an answer up against who replied when.

-- ─── Tables ──────────────────────────────────────────────────────────────────

create table if not exists public.impact_gap_sessions (
  id                     uuid primary key default gen_random_uuid(),
  code                   text not null unique check (char_length(code) = 10),

  -- D1 Adoption
  d1_adoption_estimate   integer not null check (d1_adoption_estimate between 0 and 100),
  -- D2 Time freed
  d2_time_freed          text not null check (d2_time_freed in ('none','under1','1to3','3to5','over5')),
  -- D3 Where the time went, plus the mechanism pair (stored, never scored)
  d3_time_went           text not null check (d3_time_went in ('new_work','more_same','nothing','dont_know')),
  d3_mechanism           text not null check (d3_mechanism in ('recognition','more_work','role_questions','not_sure')),
  -- D4 New capability
  d4_capability_text     text check (char_length(d4_capability_text) <= 200),
  d4_cannot_name         boolean not null default false,
  d4_genuinely_new       text check (d4_genuinely_new in ('new','faster')),
  -- D5 Deliberate reallocation
  d5_reallocation        text not null check (d5_reallocation in ('explicit','somewhat','no')),
  -- D6 Human work
  d6_human_work          text not null check (d6_human_work in ('more','same','less')),

  -- Captured at the share step only, never during the survey. Used to send the
  -- report and the personal follow-up, and for nothing else.
  leader_name            text,
  leader_email           text,
  organisation           text,
  leader_role            text,

  -- Notification bookkeeping. Both are set once and checked before sending, so
  -- a leader is never emailed twice about the same report.
  notified_at            timestamptz,
  internal_notified_at   timestamptz,

  -- Lead management. Only ever written through the service role key, from the
  -- admin routes. No browser holds a key that can touch these.
  status                 text not null default 'awaiting'
                           check (status in ('awaiting','ready','emailed','conversation','closed')),
  notes                  text,
  personal_email_sent_at timestamptz,
  last_touched_at        timestamptz,

  created_at             timestamptz not null default now()
);

create table if not exists public.impact_gap_responses (
  id                   uuid primary key default gen_random_uuid(),
  session_code         text not null references public.impact_gap_sessions(code) on delete cascade,

  d1_frequency         text not null check (d1_frequency in ('daily','weekly','occasionally','never')),
  d2_time_saved        text not null check (d2_time_saved in ('none','under1','1to3','3to5','over5')),
  d3_time_use          text not null check (d3_time_use in ('new_work','more_same','breathing_room','fill_time')),
  d3_mechanism         text not null check (d3_mechanism in ('tell_manager','quiet_other_work','quiet_same_pace')),
  d4_capability_text   text check (char_length(d4_capability_text) <= 200),
  d4_cannot_name       boolean not null default false,
  d4_genuinely_new     text check (d4_genuinely_new in ('new','faster')),
  d5_told              text not null check (d5_told in ('yes','somewhat','no')),
  d6_human_work        text not null check (d6_human_work in ('more','same','less')),

  created_at           timestamptz not null default now()
);

create index if not exists impact_gap_responses_code_idx on public.impact_gap_responses (session_code);

-- ─── Row level security ──────────────────────────────────────────────────────

alter table public.impact_gap_sessions  enable row level security;
alter table public.impact_gap_responses enable row level security;

-- A leader can create a session. Nobody can read the table directly, which is
-- what keeps leader_email and the admin columns away from the browser.
drop policy if exists "impact_gap_sessions insert" on public.impact_gap_sessions;
create policy "impact_gap_sessions insert" on public.impact_gap_sessions
  for insert with check (true);

-- A team member can submit a response. There is deliberately no select policy.
drop policy if exists "impact_gap_responses insert" on public.impact_gap_responses;
create policy "impact_gap_responses insert" on public.impact_gap_responses
  for insert with check (true);

-- ─── Functions ───────────────────────────────────────────────────────────────

-- Attach the leader's contact details at the share step. Scoped to those four
-- columns, which RLS alone cannot express, hence a function.
create or replace function public.impact_gap_set_contact(
  p_code         text,
  p_name         text,
  p_email        text,
  p_organisation text,
  p_role         text
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.impact_gap_sessions
     set leader_name   = p_name,
         leader_email  = p_email,
         organisation  = p_organisation,
         leader_role   = p_role
   where code = p_code;
end;
$$;

-- Does this code exist, and how many responses so far? Used by the team survey
-- and the waiting page. Returns no answer data at all.
create or replace function public.impact_gap_status(p_code text)
returns table (session_exists boolean, response_count integer)
language sql
security definer
set search_path = public
as $$
  select
    exists(select 1 from public.impact_gap_sessions s where s.code = p_code),
    (select count(*)::integer from public.impact_gap_responses r where r.session_code = p_code);
$$;

-- The report. Leader answers plus aggregated team data plus the D4 verbatims.
-- Below the threshold the caller gets a count and nothing else.
create or replace function public.impact_gap_report(p_code text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_session public.impact_gap_sessions%rowtype;
  v_count   integer;
  v_min     integer := 5;
begin
  select * into v_session from public.impact_gap_sessions where code = p_code;
  if not found then
    return jsonb_build_object('found', false);
  end if;

  select count(*) into v_count from public.impact_gap_responses where session_code = p_code;

  if v_count < v_min then
    return jsonb_build_object(
      'found', true,
      'unlocked', false,
      'response_count', v_count,
      'required', v_min
    );
  end if;

  return jsonb_build_object(
    'found', true,
    'unlocked', true,
    'response_count', v_count,
    'leader', jsonb_build_object(
      'd1_adoption_estimate', v_session.d1_adoption_estimate,
      'd2_time_freed',        v_session.d2_time_freed,
      'd3_time_went',         v_session.d3_time_went,
      'd3_mechanism',         v_session.d3_mechanism,
      'd4_capability_text',   v_session.d4_capability_text,
      'd4_cannot_name',       v_session.d4_cannot_name,
      'd4_genuinely_new',     v_session.d4_genuinely_new,
      'd5_reallocation',      v_session.d5_reallocation,
      'd6_human_work',        v_session.d6_human_work
    ),
    'team', (
      select jsonb_build_object(
        'count', count(*)::int,
        -- D1: share using AI daily or a few times a week.
        'd1_regular_pct', round(100.0 * count(*) filter (where d1_frequency in ('daily','weekly')) / count(*), 1),
        -- D2: mean of the bucket midpoints, in hours per week.
        'd2_hours_mean', round(avg(
          case d2_time_saved
            when 'none'   then 0
            when 'under1' then 0.5
            when '1to3'   then 2
            when '3to5'   then 4
            when 'over5'  then 6
          end), 2),
        'd3_time_use_counts', jsonb_build_object(
          'new_work',       count(*) filter (where d3_time_use = 'new_work'),
          'more_same',      count(*) filter (where d3_time_use = 'more_same'),
          'breathing_room', count(*) filter (where d3_time_use = 'breathing_room'),
          'fill_time',      count(*) filter (where d3_time_use = 'fill_time')
        ),
        'd3_mechanism_counts', jsonb_build_object(
          'tell_manager',      count(*) filter (where d3_mechanism = 'tell_manager'),
          'quiet_other_work',  count(*) filter (where d3_mechanism = 'quiet_other_work'),
          'quiet_same_pace',   count(*) filter (where d3_mechanism = 'quiet_same_pace')
        ),
        -- D4: the headline number. Could not name one, or named one and called
        -- it the same work done faster.
        'd4_no_new_pct', round(100.0 * count(*) filter (
          where d4_cannot_name or d4_genuinely_new = 'faster') / count(*), 1),
        'd4_cannot_name_count', count(*) filter (where d4_cannot_name),
        'd4_faster_count',      count(*) filter (where not d4_cannot_name and d4_genuinely_new = 'faster'),
        'd4_new_count',         count(*) filter (where not d4_cannot_name and d4_genuinely_new = 'new'),
        -- D5 and D6 on a 0 to 100 scale so they compare directly to the leader.
        'd5_mean', round(avg(case d5_told when 'yes' then 100 when 'somewhat' then 50 else 0 end), 1),
        'd6_mean', round(avg(case d6_human_work when 'more' then 100 when 'same' then 50 else 0 end), 1)
      )
      from public.impact_gap_responses
      where session_code = p_code
    ),
    -- Shuffled, and without created_at, so an answer cannot be matched to the
    -- order people replied in.
    'verbatims', (
      select coalesce(jsonb_agg(jsonb_build_object(
               'text',          d4_capability_text,
               'cannot_name',   d4_cannot_name,
               'genuinely_new', d4_genuinely_new
             )), '[]'::jsonb)
      from (
        select d4_capability_text, d4_cannot_name, d4_genuinely_new
        from public.impact_gap_responses
        where session_code = p_code
        order by random()
      ) shuffled
    )
  );
end;
$$;

-- Anonymous callers may run the functions, but never read the tables.
grant execute on function public.impact_gap_set_contact(text, text, text, text, text) to anon, authenticated;
grant execute on function public.impact_gap_status(text)                              to anon, authenticated;
grant execute on function public.impact_gap_report(text)                              to anon, authenticated;

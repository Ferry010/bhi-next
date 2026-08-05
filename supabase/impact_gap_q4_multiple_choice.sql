-- Q4 becomes a multiple choice question, so both sides can be compared
-- automatically instead of a human reading free text.
--
-- Run this AFTER impact_gap.sql. Safe to re-run.
--
-- The old free text columns are left in place on purpose. They are no longer
-- written to and no longer read, but dropping them would make this decision
-- expensive to reverse, and reversing it only needs the survey to start asking
-- for words again.

-- ─── New column on both sides ────────────────────────────────────────────────
-- Nullable, because rows written before this migration have no value for it and
-- a not-null column would have rejected them.

alter table public.impact_gap_sessions
  add column if not exists d4_capability text
    check (d4_capability in ('new','higher_standard','faster','nothing'));

alter table public.impact_gap_responses
  add column if not exists d4_capability text
    check (d4_capability in ('new','higher_standard','faster','nothing'));

-- Carry across anything already collected, so an early report does not lose its
-- D4 answer. "Could not name one" becomes "nothing", and the old new/faster
-- follow-up maps straight over.
update public.impact_gap_sessions
   set d4_capability = case
         when d4_cannot_name then 'nothing'
         when d4_genuinely_new = 'new' then 'new'
         when d4_genuinely_new = 'faster' then 'faster'
       end
 where d4_capability is null;

update public.impact_gap_responses
   set d4_capability = case
         when d4_cannot_name then 'nothing'
         when d4_genuinely_new = 'new' then 'new'
         when d4_genuinely_new = 'faster' then 'faster'
       end
 where d4_capability is null;

-- ─── The report ──────────────────────────────────────────────────────────────
-- Same shape as before minus the verbatims, plus a breakdown of the four
-- answers so the report can show the distribution rather than quotations.

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
      'd4_capability',        v_session.d4_capability,
      'd5_reallocation',      v_session.d5_reallocation,
      'd6_human_work',        v_session.d6_human_work
    ),
    'team', (
      select jsonb_build_object(
        'count', count(*)::int,
        'd1_regular_pct', round(100.0 * count(*) filter (where d1_frequency in ('daily','weekly')) / count(*), 1),
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
        -- The headline number: everyone whose answer was not "something
        -- genuinely new". Faster and higher standard are both worth having and
        -- neither is a new capability.
        'd4_no_new_pct', round(100.0 * count(*) filter (
          where d4_capability is distinct from 'new') / count(*), 1),
        'd4_counts', jsonb_build_object(
          'new',             count(*) filter (where d4_capability = 'new'),
          'higher_standard', count(*) filter (where d4_capability = 'higher_standard'),
          'faster',          count(*) filter (where d4_capability = 'faster'),
          'nothing',         count(*) filter (where d4_capability = 'nothing')
        ),
        'd5_mean', round(avg(case d5_told when 'yes' then 100 when 'somewhat' then 50 else 0 end), 1),
        'd6_mean', round(avg(case d6_human_work when 'more' then 100 when 'same' then 50 else 0 end), 1)
      )
      from public.impact_gap_responses
      where session_code = p_code
    )
  );
end;
$$;

grant execute on function public.impact_gap_report(text) to anon, authenticated;

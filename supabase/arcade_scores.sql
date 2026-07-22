-- Global leaderboard for the 404 arcade game.
-- Run this in the Supabase SQL editor to turn the per-browser board into a
-- shared, promotable one. The frontend needs no changes: it detects the table
-- and switches from localStorage to Supabase automatically.

create table if not exists public.arcade_scores (
  id         uuid primary key default gen_random_uuid(),
  name       text not null check (char_length(name) between 1 and 10),
  score      integer not null check (score >= 0 and score < 1000000),
  created_at timestamptz not null default now()
);

create index if not exists arcade_scores_score_idx on public.arcade_scores (score desc);

alter table public.arcade_scores enable row level security;

-- Anyone can read the leaderboard.
create policy "arcade_scores read" on public.arcade_scores
  for select using (true);

-- Anyone can submit a score (anon key). Values are bounded by the check
-- constraints above; consider a rate limit / edge function if abuse appears.
create policy "arcade_scores insert" on public.arcade_scores
  for insert with check (true);

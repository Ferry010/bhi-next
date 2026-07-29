-- Migration: add `game` column to arcade_scores so each game has its own board.
-- Run after the initial arcade_scores.sql has been applied.
--
-- Existing rows (all Breakout) get game = 'breakout' automatically.

alter table public.arcade_scores
  add column if not exists game text not null default 'breakout'
    check (char_length(game) between 1 and 32);

create index if not exists arcade_scores_game_score_idx
  on public.arcade_scores (game, score desc);

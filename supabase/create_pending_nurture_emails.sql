-- Run this in the Supabase SQL editor to enable assessment email nurture sequences.

create table if not exists pending_nurture_emails (
  id               uuid primary key default gen_random_uuid(),
  assessment_submission_id uuid references assessment_submissions(id) on delete cascade,
  email            text not null,
  template_name    text not null,
  template_data    jsonb not null default '{}',
  send_at          timestamptz not null,
  sent_at          timestamptz,
  status           text not null default 'pending',
  created_at       timestamptz not null default now(),

  constraint status_values check (status in ('pending', 'sent', 'failed', 'suppressed'))
);

create index if not exists pending_nurture_emails_due
  on pending_nurture_emails (status, send_at)
  where status = 'pending';

-- 002_counts_triggers.sql
-- Reconciles count-maintenance triggers with how the app actually mutates data.
--
-- Findings from live introspection:
--   * sync_event_rsvp_count() already exists and fires on rsvps INSERT/DELETE only.
--     The app toggles an RSVP off via UPDATE (status -> 'cancelled'), which the
--     existing trigger ignores, so rsvp_count never decremented on cancel.
--   * There is NO save_count maintenance at all.
--   * follower_count triggers already exist and are correct (left untouched).
--
-- This migration: (1) upgrades sync_event_rsvp_count to be status-aware and handle
-- UPDATE transitions, re-points its trigger to also fire on UPDATE; (2) adds a
-- save_count trigger. Incremental +/- style preserves the seeded demo baselines.
-- Idempotent.

-- ---------- RSVP COUNT (status-aware, handles cancel via UPDATE) ----------
create or replace function public.sync_event_rsvp_count()
returns trigger
language plpgsql
set search_path to 'public'
as $$
begin
  if (tg_op = 'INSERT') then
    if (new.status is distinct from 'cancelled') then
      update events set rsvp_count = rsvp_count + 1 where id = new.event_id;
    end if;

  elsif (tg_op = 'DELETE') then
    if (old.status is distinct from 'cancelled') then
      update events set rsvp_count = greatest(0, rsvp_count - 1) where id = old.event_id;
    end if;

  elsif (tg_op = 'UPDATE') then
    -- active -> cancelled : decrement
    if (old.status is distinct from 'cancelled' and new.status is not distinct from 'cancelled') then
      update events set rsvp_count = greatest(0, rsvp_count - 1) where id = new.event_id;
    -- cancelled -> active : increment
    elsif (old.status is not distinct from 'cancelled' and new.status is distinct from 'cancelled') then
      update events set rsvp_count = rsvp_count + 1 where id = new.event_id;
    end if;
  end if;
  return null;
end;
$$;

-- Re-create the trigger so it also fires on UPDATE.
drop trigger if exists trg_event_rsvp_count on public.rsvps;
create trigger trg_event_rsvp_count
  after insert or update or delete on public.rsvps
  for each row execute function public.sync_event_rsvp_count();

-- ---------- SAVE COUNT (new) ----------
create or replace function public.sync_event_save_count()
returns trigger
language plpgsql
set search_path to 'public'
as $$
begin
  if (tg_op = 'INSERT') then
    update events set save_count = save_count + 1 where id = new.event_id;
  elsif (tg_op = 'DELETE') then
    update events set save_count = greatest(0, save_count - 1) where id = old.event_id;
  end if;
  return null;
end;
$$;

drop trigger if exists trg_event_save_count on public.saved_events;
create trigger trg_event_save_count
  after insert or delete on public.saved_events
  for each row execute function public.sync_event_save_count();

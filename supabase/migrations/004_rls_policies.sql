-- 004_rls_policies.sql
-- Adds ONLY the RLS policies that live introspection (pg_policies) showed are
-- missing. Everything else (user_profiles, rsvps, saved_events, follows,
-- flag_reports, events insert/update/select, public reads) already exists and is
-- correct, so it is intentionally NOT re-created here.
--
-- Gaps found:
--   1. `organizers` has only a public SELECT policy — no INSERT/UPDATE. This
--      blocks the create-event flow (getOrCreateOrganizerForUser inserts a row),
--      so a first-time organizer could never be created. <-- real bug.
--   2. `events` has INSERT/UPDATE/SELECT for owners but no DELETE policy, so an
--      organizer cannot hard-delete their own event (archive-via-update works).
--
-- Idempotent (drop-if-exists then create).

-- ---------- organizers: owner can create & edit their organizer ----------
drop policy if exists "Users can create own organizer" on public.organizers;
create policy "Users can create own organizer" on public.organizers
  for insert with check (auth.uid() = user_id);

drop policy if exists "Users can update own organizer" on public.organizers;
create policy "Users can update own organizer" on public.organizers
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ---------- events: owner can delete their own event ----------
drop policy if exists "Organizers can delete own events" on public.events;
create policy "Organizers can delete own events" on public.events
  for delete using (
    exists (select 1 from public.organizers o
            where o.id = events.organizer_id and o.user_id = auth.uid())
  );

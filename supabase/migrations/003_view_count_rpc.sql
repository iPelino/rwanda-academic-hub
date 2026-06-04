-- 003_view_count_rpc.sql
-- Atomic, race-free view-count increment callable by anon/auth clients.
--
-- Why: getEventBySlug() previously did a client-side read-modify-write UPDATE on
-- events.view_count, which (a) is racy and (b) is blocked by RLS for the anon role.
-- A SECURITY DEFINER RPC increments atomically and only for published events.
--
-- Frontend usage: supabase.rpc('increment_event_view', { event_slug: slug })
--
-- Idempotent: CREATE OR REPLACE.

create or replace function public.increment_event_view(event_slug text)
returns void
language sql
security definer
set search_path = public
as $$
  update public.events
  set view_count = coalesce(view_count, 0) + 1
  where slug = event_slug and status = 'published';
$$;

grant execute on function public.increment_event_view(text) to anon, authenticated;

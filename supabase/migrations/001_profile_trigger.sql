-- 001_profile_trigger.sql
-- Auto-create a public.user_profiles row whenever a new auth.users row is created.
--
-- Why: the client signs up with supabase.auth.signUp(). When email confirmation
-- is required there is no session yet, so a client-side INSERT into user_profiles
-- runs as the `anon` role and is blocked by RLS. Creating the profile in a
-- SECURITY DEFINER trigger guarantees the row exists regardless of confirmation
-- timing, for both email/password and OAuth sign-ups.
--
-- Idempotent: safe to run multiple times.

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.user_profiles (id, full_name, academic_role, university_id, avatar_url, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    coalesce(new.raw_user_meta_data ->> 'academic_role', 'student'),
    nullif(new.raw_user_meta_data ->> 'university_id', '')::uuid,
    new.raw_user_meta_data ->> 'avatar_url',
    'attendee'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

-- This is a trigger-only function; it must NOT be exposed as a callable RPC.
revoke execute on function public.handle_new_user() from anon, authenticated, public;

-- Backfill: create profiles for any existing auth users that are missing one.
insert into public.user_profiles (id, full_name, academic_role, role)
select
  u.id,
  coalesce(u.raw_user_meta_data ->> 'full_name', ''),
  coalesce(u.raw_user_meta_data ->> 'academic_role', 'student'),
  'attendee'
from auth.users u
left join public.user_profiles p on p.id = u.id
where p.id is null
on conflict (id) do nothing;

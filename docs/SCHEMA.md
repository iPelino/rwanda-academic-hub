# Rwanda Academic Hub — Database Schema (authoritative)

> This reflects the **live Supabase schema** (project `hiknnwnnccqzmcdvxoql`) as used by the
> frontend code in `assets/js/`. It supersedes the informal schema notes in
> `prompts.md`/`PROMPT-TEMPLATE.md`, which are outdated (they reference `bookmarks` and a
> single `follows` table — those do **not** exist).

## Tables

| Table | Purpose | Key columns |
|---|---|---|
| `user_profiles` | 1:1 with `auth.users` | `id` (=auth uid), `full_name`, `academic_role` (text), `role` (enum `user_role`: attendee/organizer/institutional_approver/admin), `university_id`, `organizer_id`, `avatar_url`, `notification_prefs` |
| `universities` | Institution directory | `id`, `name`, `slug`, `short_name`, `city_id`, `logo_url`, `verification_status`, `follower_count`, `established_year`, `website_url`, `description` |
| `organizers` | Event hosts (clubs, faculties, etc.) | `id`, `user_id`, `university_id`, `name`, `slug`, `organizer_type` (enum), `logo_url`, `is_verified`, `follower_count` |
| `cities` | Location taxonomy | `id`, `name`, `province`, `is_featured` |
| `venues` | Physical venues | `id`, `name`, `address`, `city_id`, `university_id` |
| `event_categories` | Category taxonomy | `id`, `name`, `slug`, `icon`, `color_hex` |
| `events` | Core event records | `id`, `organizer_id`, `university_id`, `category_id`, `venue_id`, `city_id`, `title`, `slug`, `summary`, `description` (HTML), `banner_url`, `tags` (text[]), `start_datetime`, `end_datetime`, `event_format` (enum), `audience_eligibility` (enum), `is_free`, `price_rwf`, `registration_type` (enum), `registration_link`, `capacity`, `rsvp_count`, `view_count`, `save_count`, `status` (enum: draft/published/cancelled/past/archived), `is_featured` |
| `event_speakers` | Speakers per event | `id`, `event_id`, `name`, `title`, `bio`, `avatar_url`, `sort_order` |
| `event_agenda_items` | Agenda per event | `id`, `event_id`, `title`, `description`, `start_time`, `end_time`, `speaker_id`, `sort_order` |
| `rsvps` | Attendance intent | `id`, `event_id`, `user_id`, `status` (enum: interested/confirmed/waitlisted/cancelled/attended), **`rsvped_at`** |
| `saved_events` | Bookmarks | `id`, `event_id`, `user_id`, `saved_at` |
| `organizer_follows` | Follows (composite PK) | `user_id`, `organizer_id`, `followed_at` |
| `university_follows` | Follows (composite PK) | `user_id`, `university_id`, `followed_at` |
| `user_interests` | Interest categories | `user_id`, `category_id` |
| `flag_reports` | Moderation reports | `id`, `event_id`, `reporter_id`, `reason` (enum), `details`, `status` |
| `verification_requests` | Org/uni verification | `id`, `entity_type`, `organizer_id`/`university_id`, `submitted_by`, `status` |
| `notifications` | User notifications | `id`, `user_id`, `type` (enum), `title`, `body`, `link`, `event_id`, `is_read` |
| `event_views`, `organizer_analytics`, `audit_logs`, `featured_collections`, `featured_collection_events` | Analytics / moderation / curation (not yet surfaced in UI) | — |

Notes:
- `rsvps.user_id` and `user_profiles.id` both reference `auth.users` — there is **no direct FK
  between them**, so PostgREST cannot embed `rsvps → user_profiles`. Fetch attendee profiles in a
  second query (`user_profiles.id in (...)`). See `getEventAttendees()` in `events-api.js`.
- PostgREST does not row-filter on embedded resources without `!inner`. Filter discovery by the FK
  columns (`category_id`, `city_id`, `organizer_id`), not `event_categories.slug`. See
  `getPublishedEvents()`.

## Custom DB objects added by `supabase/migrations/`

| Object | File | What it does |
|---|---|---|
| `handle_new_user()` + trigger `on_auth_user_created` on `auth.users` | `001` | Auto-creates a `user_profiles` row on sign-up (works even when email confirmation defers the session). Execute revoked from anon/authenticated (trigger-only). |
| `sync_event_rsvp_count()` (upgraded) + trigger on `rsvps` | `002` | Existing INSERT/DELETE counter extended to handle **UPDATE** (RSVP cancel/uncancel) so `events.rsvp_count` stays correct. |
| `sync_event_save_count()` + trigger on `saved_events` | `002` | Maintains `events.save_count` (was previously unmaintained). |
| `increment_event_view(event_slug text)` RPC | `003` | Atomic, anon-safe `view_count` bump for published events. Called by `getEventBySlug()`. |
| RLS policies: organizers INSERT/UPDATE (own), events DELETE (own) | `004` | Fills the only gaps found — pre-existing policies cover everything else. Organizers INSERT was missing and blocked the create-event flow. |

## RLS model (already enforced on all tables)
- Public can **read** published events + all taxonomy (universities, cities, categories, venues, speakers/agenda of published events, organizers).
- Users manage **their own** rsvps / saved_events / follows / interests / profile.
- Organizers manage **their own** events (incl. drafts) and read their events' rsvps (attendee list).
- Authenticated users can file `flag_reports` and `verification_requests`.

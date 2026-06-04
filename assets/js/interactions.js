/**
 * Rwanda Academic Hub — User Interactions API
 *
 * Handles:
 *   - RSVP (toggle interested / cancel)
 *   - Bookmarks (save / unsave events)
 *   - Follow / Unfollow organizers and universities
 *   - Fetch user's saved events and RSVPs
 *
 * All write operations require an authenticated session.
 */

import { supabase } from './supabase-client.js';
import { getCurrentUser } from './auth.js';

/* ------------------------------------------------------------------ */
/*  RSVP                                                                */
/* ------------------------------------------------------------------ */

/**
 * Get the current user's RSVP for an event.
 * @returns {Promise<Object|null>} rsvp row or null
 */
export async function getRsvp(eventId) {
  const user = await getCurrentUser();
  if (!user) return null;

  const { data } = await supabase
    .from('rsvps')
    .select('id, status')
    .eq('event_id', eventId)
    .eq('user_id', user.id)
    .maybeSingle();

  return data;
}

/**
 * Toggle RSVP for an event.
 * If no RSVP exists → insert 'interested'.
 * If RSVP exists and is 'cancelled' → set 'interested'.
 * If RSVP is active → set 'cancelled'.
 *
 * @returns {Promise<{status: string|null, error: Object}>}
 */
export async function toggleRsvp(eventId) {
  const user = await getCurrentUser();
  if (!user) return { status: null, error: { message: 'Not logged in' } };

  const existing = await getRsvp(eventId);

  if (!existing) {
    const { data, error } = await supabase
      .from('rsvps')
      .insert({ event_id: eventId, user_id: user.id, status: 'interested' })
      .select('status')
      .single();
    return { status: data?.status ?? null, error };
  }

  const newStatus = existing.status === 'cancelled' ? 'interested' : 'cancelled';
  const { data, error } = await supabase
    .from('rsvps')
    .update({ status: newStatus })
    .eq('id', existing.id)
    .select('status')
    .single();

  return { status: data?.status ?? null, error };
}

/**
 * Fetch all upcoming events the user has RSVP'd to.
 */
export async function getUserRsvps() {
  const user = await getCurrentUser();
  if (!user) return [];

  const { data } = await supabase
    .from('rsvps')
    .select(`
      status,
      events (
        id, title, slug, banner_url, start_datetime,
        cities ( name ),
        organizers ( name )
      )
    `)
    .eq('user_id', user.id)
    .neq('status', 'cancelled')
    .order('rsvped_at', { ascending: false });

  return data ?? [];
}

/* ------------------------------------------------------------------ */
/*  BOOKMARKS (Saved Events)                                            */
/* ------------------------------------------------------------------ */

export async function isEventSaved(eventId) {
  const user = await getCurrentUser();
  if (!user) return false;

  const { data } = await supabase
    .from('saved_events')
    .select('id')
    .eq('event_id', eventId)
    .eq('user_id', user.id)
    .maybeSingle();

  return !!data;
}

/**
 * Toggle bookmark for an event.
 * @returns {Promise<{saved: boolean, error: Object}>}
 */
export async function toggleBookmark(eventId) {
  const user = await getCurrentUser();
  if (!user) return { saved: false, error: { message: 'Not logged in' } };

  const alreadySaved = await isEventSaved(eventId);

  if (alreadySaved) {
    const { error } = await supabase
      .from('saved_events')
      .delete()
      .eq('event_id', eventId)
      .eq('user_id', user.id);
    return { saved: false, error };
  } else {
    const { error } = await supabase
      .from('saved_events')
      .insert({ event_id: eventId, user_id: user.id });
    return { saved: true, error };
  }
}

/**
 * Fetch all events the user has bookmarked.
 */
export async function getSavedEvents() {
  const user = await getCurrentUser();
  if (!user) return [];

  const { data } = await supabase
    .from('saved_events')
    .select(`
      saved_at,
      events (
        id, title, slug, banner_url, start_datetime, is_free, price_rwf,
        cities ( name ),
        organizers ( name, logo_url ),
        event_categories ( name )
      )
    `)
    .eq('user_id', user.id)
    .order('saved_at', { ascending: false });

  return data ?? [];
}

/* ------------------------------------------------------------------ */
/*  ORGANIZER FOLLOWS                                                   */
/* ------------------------------------------------------------------ */

export async function isFollowingOrganizer(organizerId) {
  const user = await getCurrentUser();
  if (!user) return false;

  const { data } = await supabase
    .from('organizer_follows')
    .select('organizer_id')
    .eq('organizer_id', organizerId)
    .eq('user_id', user.id)
    .maybeSingle();

  return !!data;
}

export async function toggleFollowOrganizer(organizerId) {
  const user = await getCurrentUser();
  if (!user) return { following: false, error: { message: 'Not logged in' } };

  const following = await isFollowingOrganizer(organizerId);

  if (following) {
    const { error } = await supabase
      .from('organizer_follows')
      .delete()
      .eq('organizer_id', organizerId)
      .eq('user_id', user.id);
    return { following: false, error };
  } else {
    const { error } = await supabase
      .from('organizer_follows')
      .insert({ organizer_id: organizerId, user_id: user.id });
    return { following: true, error };
  }
}

/**
 * Fetch the organizers the current user follows (with basic profile fields).
 */
export async function getFollowedOrganizers() {
  const user = await getCurrentUser();
  if (!user) return [];

  const { data } = await supabase
    .from('organizer_follows')
    .select(`
      followed_at,
      organizers ( id, name, slug, logo_url, is_verified, organizer_type,
                   universities ( name, short_name ) )
    `)
    .eq('user_id', user.id)
    .order('followed_at', { ascending: false });

  return data ?? [];
}

/* ------------------------------------------------------------------ */
/*  UNIVERSITY FOLLOWS                                                  */
/* ------------------------------------------------------------------ */

export async function isFollowingUniversity(universityId) {
  const user = await getCurrentUser();
  if (!user) return false;

  const { data } = await supabase
    .from('university_follows')
    .select('university_id')
    .eq('university_id', universityId)
    .eq('user_id', user.id)
    .maybeSingle();

  return !!data;
}

/**
 * Fetch the universities the current user follows.
 */
export async function getFollowedUniversities() {
  const user = await getCurrentUser();
  if (!user) return [];

  const { data } = await supabase
    .from('university_follows')
    .select(`
      followed_at,
      universities ( id, name, slug, short_name, logo_url, is_verified )
    `)
    .eq('user_id', user.id)
    .order('followed_at', { ascending: false });

  return data ?? [];
}

export async function toggleFollowUniversity(universityId) {
  const user = await getCurrentUser();
  if (!user) return { following: false, error: { message: 'Not logged in' } };

  const following = await isFollowingUniversity(universityId);

  if (following) {
    const { error } = await supabase
      .from('university_follows')
      .delete()
      .eq('university_id', universityId)
      .eq('user_id', user.id);
    return { following: false, error };
  } else {
    const { error } = await supabase
      .from('university_follows')
      .insert({ university_id: universityId, user_id: user.id });
    return { following: true, error };
  }
}

/* ------------------------------------------------------------------ */
/*  FLAG REPORTS                                                        */
/* ------------------------------------------------------------------ */

export async function flagEvent(eventId, reason, details = '') {
  const user = await getCurrentUser();
  if (!user) return { error: { message: 'Not logged in' } };

  const { error } = await supabase.from('flag_reports').insert({
    event_id:    eventId,
    reporter_id: user.id,
    reason,
    details,
  });

  return { error };
}

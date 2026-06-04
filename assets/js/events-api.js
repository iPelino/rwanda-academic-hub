/**
 * Rwanda Academic Hub — Events API Module
 *
 * All read/write interactions with the `events` table.
 * Provides clean async functions that pages call directly.
 *
 * Usage:
 *   import { getPublishedEvents, getEventBySlug } from '/assets/js/events-api.js';
 */

import { supabase } from './supabase-client.js';

/* ------------------------------------------------------------------ */
/*  TYPES (JSDoc for IDE support)                                       */
/* ------------------------------------------------------------------ */

/**
 * @typedef {Object} EventFilters
 * @property {string}  [categorySlug]
 * @property {string}  [cityName]
 * @property {string}  [format]         - 'in_person' | 'online' | 'hybrid'
 * @property {boolean} [isFeatured]
 * @property {string}  [search]         - full-text query
 * @property {number}  [limit]
 * @property {number}  [offset]
 */

/* ------------------------------------------------------------------ */
/*  EVENT SELECTS (standard columns to always fetch)                    */
/* ------------------------------------------------------------------ */

const EVENT_CARD_COLUMNS = `
  id, title, slug, summary, banner_url, start_datetime, end_datetime,
  event_format, is_free, price_rwf, audience_eligibility,
  rsvp_count, view_count, is_featured, status, tags,
  organizers ( id, name, slug, logo_url, is_verified ),
  cities ( name ),
  event_categories ( name, slug, icon )
`;

const EVENT_DETAIL_COLUMNS = `
  *,
  organizers ( id, name, slug, logo_url, is_verified, contact_email, university_id,
               universities ( name, short_name, slug ) ),
  cities ( name, province ),
  venues ( name, address ),
  event_categories ( name, slug, icon, color_hex ),
  event_speakers ( id, name, title, bio, avatar_url, sort_order ),
  event_agenda_items ( id, title, description, start_time, end_time, sort_order,
                       event_speakers ( name ) )
`;

/* ------------------------------------------------------------------ */
/*  READ — Discovery Feed                                               */
/* ------------------------------------------------------------------ */

/**
 * Fetch published events with optional filters.
 * @param {EventFilters} filters
 * @returns {Promise<{data: Array, count: number, error: Object}>}
 */
export async function getPublishedEvents(filters = {}) {
  const {
    categorySlug,
    cityName,
    format,
    isFeatured,
    search,
    limit = 12,
    offset = 0,
  } = filters;

  // Resolve slug/name → foreign-key id BEFORE building the query.
  // NOTE: PostgREST does NOT filter parent rows when you do
  // `.eq('event_categories.slug', x)` on an embedded resource (without an
  // `!inner` hint it silently returns ALL rows). Filtering on the FK column
  // (category_id / city_id) is the correct, reliable approach.
  let categoryId = null;
  if (categorySlug) {
    const { data: cat } = await supabase
      .from('event_categories')
      .select('id')
      .eq('slug', categorySlug)
      .maybeSingle();
    // If the slug doesn't resolve, return an empty result instead of all rows.
    if (!cat) return { data: [], count: 0, error: null };
    categoryId = cat.id;
  }

  let cityId = null;
  if (cityName) {
    const { data: city } = await supabase
      .from('cities')
      .select('id')
      .eq('name', cityName)
      .maybeSingle();
    if (!city) return { data: [], count: 0, error: null };
    cityId = city.id;
  }

  let query = supabase
    .from('events')
    .select(EVENT_CARD_COLUMNS, { count: 'exact' })
    .eq('status', 'published')
    .gte('start_datetime', new Date().toISOString()) // only upcoming
    .order('is_featured', { ascending: false })
    .order('start_datetime', { ascending: true })
    .range(offset, offset + limit - 1);

  if (categoryId) {
    query = query.eq('category_id', categoryId);
  }
  if (cityId) {
    query = query.eq('city_id', cityId);
  }
  if (format) {
    query = query.eq('event_format', format);
  }
  if (isFeatured === true) {
    query = query.eq('is_featured', true);
  }
  if (search) {
    // Full-text search across the title.
    query = query.textSearch('title', search, { type: 'websearch', config: 'english' });
  }

  const { data, count, error } = await query;
  return { data: data ?? [], count: count ?? 0, error };
}

/**
 * Fetch a single event by slug.
 * Also increments view_count (fire-and-forget).
 */
export async function getEventBySlug(slug) {
  const { data, error } = await supabase
    .from('events')
    .select(EVENT_DETAIL_COLUMNS)
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  // Increment view count atomically via RPC (anon-safe, race-free).
  // Fire-and-forget — a failed view bump must never block rendering.
  if (data) {
    supabase.rpc('increment_event_view', { event_slug: slug }).then(() => {});
  }

  return { data, error };
}

/**
 * Fetch featured events for the homepage hero/carousel.
 */
export async function getFeaturedEvents(limit = 4) {
  return getPublishedEvents({ isFeatured: true, limit });
}

/**
 * Fetch events for a specific organizer (by slug).
 * @param {string} organizerSlug
 * @param {string|null} status - filter by status, or null for ALL statuses
 *                               (draft/published/etc.) for the organizer dashboard.
 */
export async function getEventsByOrganizer(organizerSlug, status = 'published') {
  const { data: org } = await supabase
    .from('organizers')
    .select('id')
    .eq('slug', organizerSlug)
    .maybeSingle();

  if (!org) return { data: [], error: { message: 'Organizer not found' } };

  return getEventsByOrganizerId(org.id, status);
}

/**
 * Fetch events for an organizer by id (avoids a slug lookup when you already
 * have the id — used by the organizer dashboard).
 */
export async function getEventsByOrganizerId(organizerId, status = 'published') {
  let query = supabase
    .from('events')
    .select(EVENT_CARD_COLUMNS)
    .eq('organizer_id', organizerId)
    .order('start_datetime', { ascending: false });

  if (status) query = query.eq('status', status);

  const { data, error } = await query;
  return { data: data ?? [], error };
}

/**
 * Update an organizer's own event (RLS enforces ownership).
 */
export async function updateEvent(eventId, patch) {
  return supabase.from('events').update(patch).eq('id', eventId).select('id').single();
}

/**
 * Archive an event (soft delete — keeps the row, hides from discovery).
 */
export async function archiveEvent(eventId) {
  return supabase.from('events').update({ status: 'archived' }).eq('id', eventId);
}

/**
 * Permanently delete an organizer's own event (RLS enforces ownership).
 */
export async function deleteEvent(eventId) {
  return supabase.from('events').delete().eq('id', eventId);
}

/**
 * Fetch the attendee (RSVP) list for an event — organizer-only via RLS.
 * Done in two steps because rsvps.user_id and user_profiles.id both reference
 * auth.users (no direct FK between them for PostgREST to embed).
 * Returns: [{ id, status, rsvped_at, profile: {...} }]
 */
export async function getEventAttendees(eventId) {
  const { data: rows, error } = await supabase
    .from('rsvps')
    .select('id, status, rsvped_at, user_id')
    .eq('event_id', eventId)
    .neq('status', 'cancelled')
    .order('rsvped_at', { ascending: false });

  if (error) return { data: [], error };
  if (!rows.length) return { data: [], error: null };

  const userIds = [...new Set(rows.map((r) => r.user_id))];
  const { data: profiles } = await supabase
    .from('user_profiles')
    .select('id, full_name, academic_role, avatar_url, universities ( name, short_name )')
    .in('id', userIds);

  const byId = Object.fromEntries((profiles ?? []).map((p) => [p.id, p]));
  const data = rows.map((r) => ({ ...r, profile: byId[r.user_id] ?? null }));
  return { data, error: null };
}

/**
 * Fetch events for a specific university.
 */
export async function getEventsByUniversity(universitySlug) {
  const { data: uni } = await supabase
    .from('universities')
    .select('id')
    .eq('slug', universitySlug)
    .single();

  if (!uni) return { data: [], error: { message: 'University not found' } };

  const { data, error } = await supabase
    .from('events')
    .select(EVENT_CARD_COLUMNS)
    .eq('university_id', uni.id)
    .eq('status', 'published')
    .gte('start_datetime', new Date().toISOString())
    .order('start_datetime', { ascending: true });

  return { data: data ?? [], error };
}

/* ------------------------------------------------------------------ */
/*  READ — Categories & Cities (for filter UI)                         */
/* ------------------------------------------------------------------ */

export async function getCategories() {
  const { data, error } = await supabase
    .from('event_categories')
    .select('id, name, slug, icon')
    .order('name');
  return { data: data ?? [], error };
}

export async function getCities() {
  const { data, error } = await supabase
    .from('cities')
    .select('id, name, province')
    .order('is_featured', { ascending: false })
    .order('name');
  return { data: data ?? [], error };
}

/* ------------------------------------------------------------------ */
/*  WRITE — Create / Update Events (organizers only)                   */
/* ------------------------------------------------------------------ */

/**
 * Save step-1 event data to localStorage draft + Supabase draft row.
 * Returns the draft event id.
 */
export async function saveDraftStep1(formData, organizerId) {
  const startDatetime = new Date(
    `${formData.startDate}T${formData.startTime}:00`,
  ).toISOString();

  // Look up category UUID from slug
  const { data: category } = await supabase
    .from('event_categories')
    .select('id')
    .eq('slug', formData.category)
    .maybeSingle();

  const payload = {
    organizer_id:         organizerId,
    title:                formData.eventTitle,
    summary:              formData.description?.slice(0, 200) ?? '',
    description:          formData.description,
    category_id:          category?.id ?? null,
    start_datetime:       startDatetime,
    event_format:         formData.eventFormat,
    audience_eligibility: formData.audience ?? 'open_to_all',
    capacity:             formData.maxCapacity ? parseInt(formData.maxCapacity) : null,
    status:               'draft',
    // Slug generated from title + timestamp
    slug: slugify(formData.eventTitle) + '-' + Date.now(),
  };

  // Upsert — if draft id in localStorage, update it
  const draftId = localStorage.getItem('rah_draft_event_id');

  let result;
  if (draftId) {
    result = await supabase
      .from('events')
      .update(payload)
      .eq('id', draftId)
      .select('id')
      .single();
  } else {
    result = await supabase
      .from('events')
      .insert(payload)
      .select('id')
      .single();
  }

  if (result.data?.id) {
    localStorage.setItem('rah_draft_event_id', result.data.id);
  }

  return result;
}

/**
 * Save step-2 media (banner URL) to the current draft.
 */
export async function saveDraftStep2(bannerUrl) {
  const draftId = localStorage.getItem('rah_draft_event_id');
  if (!draftId) return { error: { message: 'No draft event in progress.' } };

  return supabase
    .from('events')
    .update({ banner_url: bannerUrl })
    .eq('id', draftId);
}

/**
 * Publish the current draft (step-3).
 */
export async function publishEvent(extraData = {}) {
  const draftId = localStorage.getItem('rah_draft_event_id');
  if (!draftId) return { error: { message: 'No draft event in progress.' } };

  const { data, error } = await supabase
    .from('events')
    .update({ ...extraData, status: 'published' })
    .eq('id', draftId)
    .select('id, slug')
    .single();

  if (!error) {
    localStorage.removeItem('rah_draft_event_id');
  }

  return { data, error };
}

/* ------------------------------------------------------------------ */
/*  UPLOAD — Banner image to Supabase Storage                          */
/* ------------------------------------------------------------------ */

export async function uploadEventBanner(file, eventId) {
  const ext  = file.name.split('.').pop();
  const path = `banners/${eventId}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from('event-media')
    .upload(path, file, { upsert: true, contentType: file.type });

  if (uploadError) return { url: null, error: uploadError };

  const { data } = supabase.storage.from('event-media').getPublicUrl(path);
  return { url: data.publicUrl, error: null };
}

/* ------------------------------------------------------------------ */
/*  UTILITY                                                             */
/* ------------------------------------------------------------------ */

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}

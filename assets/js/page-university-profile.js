/**
 * Rwanda Academic Hub — University Profile Script
 *
 * Reads ?slug= (university slug), renders the institution header + tabs:
 *   - Upcoming Events / Past Events (from events.university_id)
 *   - About (description, website)
 * Wires Follow / Unfollow (requires auth).
 */

import { supabase } from './supabase-client.js';
import { isFollowingUniversity, toggleFollowUniversity } from './interactions.js';

const $ = (id) => document.getElementById(id);
const EVENT_BASE = '/pages/events/event-detail.html?slug=';

let university = null;

function fmtDate(iso) {
  return new Date(iso).toLocaleDateString('en-RW', { month: 'short', day: 'numeric', year: 'numeric' });
}

function eventCard(e, accent = 'bg-forest-mid') {
  const cat = e.event_categories?.name ?? 'Event';
  return `
  <a href="${EVENT_BASE}${e.slug}" class="bg-surface rounded-xl border border-border-sage card-shadow overflow-hidden hover-lift flex flex-col h-full cursor-pointer relative group">
    <div class="h-3 ${accent} w-full"></div>
    <div class="p-card-padding flex-grow flex flex-col">
      <div class="flex justify-between items-start mb-3">
        <span class="bg-sage-elevated text-forest-dark px-2 py-1 rounded text-xs font-semibold uppercase tracking-wider">${cat}</span>
      </div>
      <h3 class="font-headline-sm text-headline-sm text-text-primary mb-2 line-clamp-2">${e.title}</h3>
      <div class="flex items-center gap-2 mb-4 mt-auto pt-4">
        <span class="font-body-sm text-body-sm text-text-secondary">${e.organizers?.name ?? ''}</span>
        ${e.organizers?.is_verified ? '<span class="material-symbols-outlined text-accent-amber text-[14px]" style="font-variation-settings:\'FILL\' 1">verified</span>' : ''}
      </div>
      <div class="border-t border-sage-dim pt-3 flex items-center justify-between font-body-sm text-body-sm text-text-secondary">
        <div class="flex items-center gap-1"><span class="material-symbols-outlined text-[16px]">calendar_today</span> ${fmtDate(e.start_datetime)}</div>
        <div class="flex items-center gap-1"><span class="material-symbols-outlined text-[16px]">location_on</span> ${e.cities?.name ?? (e.event_format === 'online' ? 'Online' : '—')}</div>
      </div>
    </div>
  </a>`;
}

const CARD_COLS = `
  id, title, slug, start_datetime, event_format, status,
  organizers ( name, is_verified ),
  cities ( name ),
  event_categories ( name )
`;

function renderHeader(uni) {
  document.title = `${uni.name} — Academia Rwanda`;
  $('up-name').textContent = uni.name;
  $('up-verified').classList.toggle('hidden', uni.verification_status !== 'verified' && !uni.is_verified);
  $('up-followers').textContent = Number(uni.follower_count ?? 0).toLocaleString();
  if (uni.cities?.name) {
    $('up-campus').textContent = uni.cities.name;
    $('up-campus').classList.remove('hidden');
  }
  if (uni.established_year) {
    $('up-est-text').textContent = `Est. ${uni.established_year}`;
    $('up-est').classList.remove('hidden');
  }
  if (uni.logo_url) {
    $('up-logo').style.backgroundImage = `url('${uni.logo_url}')`;
  } else {
    $('up-logo').textContent = (uni.short_name ?? uni.name).slice(0, 2).toUpperCase();
  }
  $('up-about').textContent = uni.description
    || 'University details, mission, and accreditation information will appear here once provided by the institution.';
  if (uni.website_url) {
    $('up-website').href = uni.website_url;
    $('up-website').classList.remove('hidden');
  }
}

function renderEvents(upcoming, past) {
  $('up-event-count').textContent = upcoming.length;
  $('up-upcoming').innerHTML = upcoming.length
    ? upcoming.map((e) => eventCard(e)).join('')
    : '<div class="col-span-full text-text-secondary py-8">No upcoming events from this institution yet.</div>';
  $('up-past').innerHTML = past.length
    ? past.map((e) => eventCard(e, 'bg-outline-variant')).join('')
    : '<p class="text-text-secondary font-body-base text-body-base col-span-full">No past events to display yet.</p>';
}

async function setFollow(btnState) {
  $('up-follow-label').textContent = btnState ? 'Following' : 'Follow';
  $('up-follow-btn').classList.toggle('bg-forest-mid', btnState);
  $('up-follow-btn').classList.toggle('text-on-primary', btnState);
}

document.addEventListener('DOMContentLoaded', async () => {
  const slug = new URLSearchParams(window.location.search).get('slug');
  if (!slug) { $('up-name').textContent = 'University not found'; return; }

  const { data: uni } = await supabase
    .from('universities')
    .select('id, name, short_name, slug, logo_url, banner_url, website_url, description, established_year, is_verified, verification_status, follower_count, cities ( name )')
    .eq('slug', slug)
    .maybeSingle();

  if (!uni) { $('up-name').textContent = 'University not found'; return; }
  university = uni;
  renderHeader(uni);

  const nowIso = new Date().toISOString();
  const [{ data: upcoming }, { data: past }] = await Promise.all([
    supabase.from('events').select(CARD_COLS)
      .eq('university_id', uni.id).eq('status', 'published')
      .gte('start_datetime', nowIso).order('start_datetime', { ascending: true }),
    supabase.from('events').select(CARD_COLS)
      .eq('university_id', uni.id).lt('start_datetime', nowIso)
      .in('status', ['published', 'past']).order('start_datetime', { ascending: false }).limit(12),
  ]);
  renderEvents(upcoming ?? [], past ?? []);

  // Follow state (only if logged in)
  const { data: { session } } = await supabase.auth.getSession();
  if (session) setFollow(await isFollowingUniversity(uni.id));

  $('up-follow-btn').addEventListener('click', async () => {
    const { following, error } = await toggleFollowUniversity(uni.id);
    if (error?.message === 'Not logged in') {
      const next = encodeURIComponent(window.location.pathname + window.location.search);
      window.location.href = `/pages/auth/sign-in.html?next=${next}`;
      return;
    }
    if (error) return alert('Could not update follow: ' + error.message);
    setFollow(following);
  });
});

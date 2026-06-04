/**
 * Rwanda Academic Hub — Organizer Dashboard Script
 *
 * Guards auth, resolves the signed-in user's organizer profile, then renders
 * their stats and a management table of ALL their events (draft/published/past)
 * with View / Attendees / Delete actions.
 */

import { supabase } from './supabase-client.js';
import { requireAuth, signOut } from './auth.js';
import { getEventsByOrganizerId, deleteEvent } from './events-api.js';

const $ = (id) => document.getElementById(id);
const ATTENDEES_BASE = '/pages/attendee-rsvp.html?event=';
const EVENT_BASE = '/pages/events/event-detail.html?slug=';

let organizer = null;

const STATUS_BADGE = {
  published: 'bg-primary-fixed text-on-primary-fixed-variant border border-primary-fixed-dim',
  draft:     'bg-surface-variant text-on-surface-variant border border-outline-variant',
  past:      'bg-surface-container text-secondary border border-outline-variant opacity-80',
  cancelled: 'bg-error-container text-on-error-container border border-error/30',
  archived:  'bg-surface-container text-secondary border border-outline-variant opacity-70',
};

async function resolveOrganizer(userId) {
  const { data } = await supabase
    .from('organizers')
    .select('id, name, slug, logo_url, follower_count')
    .eq('user_id', userId)
    .maybeSingle();
  return data;
}

function renderHeader(org) {
  $('od-name').textContent = org.name;
  const logo = $('od-logo');
  if (org.logo_url) {
    logo.style.backgroundImage = `url('${org.logo_url}')`;
  } else {
    logo.textContent = (org.name?.[0] ?? '?').toUpperCase();
  }
  $('od-stat-followers').textContent = Number(org.follower_count ?? 0).toLocaleString();
}

function renderStats(events) {
  $('od-stat-events').textContent = events.length;
  const totalRsvps = events.reduce((sum, e) => sum + (e.rsvp_count ?? 0), 0);
  $('od-stat-rsvps').textContent = totalRsvps.toLocaleString();
}

function rowHtml(e) {
  const date = new Date(e.start_datetime).toLocaleDateString('en-RW', { month: 'short', day: 'numeric', year: 'numeric' });
  const place = e.cities?.name ?? (e.event_format === 'online' ? 'Online' : '—');
  const badge = STATUS_BADGE[e.status] ?? STATUS_BADGE.draft;
  const rsvpCell = e.capacity ? `${e.rsvp_count ?? 0} / ${e.capacity}` : `${e.rsvp_count ?? 0}`;
  const thumb = e.banner_url
    ? `<div class="w-12 h-12 rounded bg-cover bg-center shrink-0" style="background-image:url('${e.banner_url}')"></div>`
    : `<div class="w-12 h-12 rounded bg-sage-dim overflow-hidden shrink-0 flex items-center justify-center text-outline"><span class="material-symbols-outlined">image</span></div>`;
  return `
  <tr class="hover:bg-surface-bright transition-colors group" data-event-id="${e.id}">
    <td class="p-4">
      <div class="flex items-center gap-4">
        ${thumb}
        <div>
          <p class="font-headline-sm text-headline-sm text-primary mb-1">${e.title}</p>
          <p class="font-body-sm text-body-sm text-secondary">${place}</p>
        </div>
      </div>
    </td>
    <td class="p-4 text-secondary">${date}</td>
    <td class="p-4"><span class="inline-flex items-center px-2.5 py-0.5 rounded-full font-body-sm text-body-sm ${badge} capitalize">${e.status}</span></td>
    <td class="p-4 text-right font-medium text-primary">${rsvpCell}</td>
    <td class="p-4 text-right whitespace-nowrap">
      <a href="${ATTENDEES_BASE}${e.id}" title="View attendees" class="inline-flex p-2 text-secondary hover:text-primary transition-colors"><span class="material-symbols-outlined">groups</span></a>
      ${e.status === 'published' ? `<a href="${EVENT_BASE}${e.slug}" title="View event" class="inline-flex p-2 text-secondary hover:text-primary transition-colors"><span class="material-symbols-outlined">visibility</span></a>` : ''}
      <button data-delete title="Delete event" class="inline-flex p-2 text-secondary hover:text-error transition-colors"><span class="material-symbols-outlined">delete</span></button>
    </td>
  </tr>`;
}

function renderTable(events) {
  const tbody = $('od-events-tbody');
  if (!events.length) {
    tbody.innerHTML = `<tr><td colspan="5" class="p-8 text-center text-secondary">You haven't created any events yet. <a class="text-forest-mid underline" href="/pages/events/create/step-1.html">Create your first event</a>.</td></tr>`;
    return;
  }
  tbody.innerHTML = events.map(rowHtml).join('');

  tbody.querySelectorAll('[data-delete]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const tr = btn.closest('tr');
      const id = tr.dataset.eventId;
      if (!confirm('Delete this event permanently? This cannot be undone.')) return;
      const { error } = await deleteEvent(id);
      if (error) return alert('Could not delete: ' + error.message);
      tr.remove();
    });
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  const session = await requireAuth();
  if (!session) return;

  document.querySelectorAll('[data-signout]').forEach((b) =>
    b.addEventListener('click', (e) => { e.preventDefault(); signOut(); }));

  organizer = await resolveOrganizer(session.user.id);
  if (!organizer) {
    $('od-events-tbody').innerHTML =
      `<tr><td colspan="5" class="p-8 text-center text-secondary">You don't have an organizer profile yet. <a class="text-forest-mid underline" href="/pages/events/create/step-1.html">Create an event</a> to get started.</td></tr>`;
    return;
  }

  renderHeader(organizer);
  const { data: events } = await getEventsByOrganizerId(organizer.id, null);
  renderStats(events);
  renderTable(events);
});

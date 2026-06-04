/**
 * Rwanda Academic Hub — Attendee List (Organizer-only) Script
 *
 * Reads ?event=<uuid>, verifies the signed-in user owns the event's organizer,
 * then lists the event's RSVPs (joined to attendee profiles) with search,
 * role filter, and CSV export.
 */

import { supabase } from './supabase-client.js';
import { requireAuth, signOut } from './auth.js';
import { getEventAttendees } from './events-api.js';

const $ = (id) => document.getElementById(id);

const STATUS_BADGE = {
  confirmed: 'badge-confirmed shadow-sm',
  interested: 'bg-surface-container-high text-text-secondary',
  attended: 'badge-confirmed shadow-sm',
  waitlisted: 'bg-surface-container-high text-text-secondary',
};
const STATUS_ICON = {
  confirmed: 'check_circle', attended: 'check_circle',
  interested: 'schedule', waitlisted: 'schedule',
};

let attendees = [];

function initials(name) {
  return (name || '?').split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase();
}
function fmtDate(iso) {
  return new Date(iso).toLocaleDateString('en-RW', { month: 'short', day: 'numeric', year: 'numeric' });
}

function rowHtml(a) {
  const p = a.profile ?? {};
  const name = p.full_name || 'Unknown attendee';
  const uni = p.universities?.name ?? '—';
  const role = p.academic_role ?? '—';
  const badge = STATUS_BADGE[a.status] ?? STATUS_BADGE.interested;
  const icon = STATUS_ICON[a.status] ?? 'schedule';
  const avatar = p.avatar_url
    ? `<div class="w-10 h-10 rounded-full bg-cover bg-center" style="background-image:url('${p.avatar_url}')"></div>`
    : `<div class="w-10 h-10 rounded-full bg-forest-mid text-white flex items-center justify-center font-headline-sm text-headline-sm">${initials(name)}</div>`;
  return `
  <tr class="border-b border-border-sage hover:bg-sage-elevated/50 transition-colors group" data-role="${role}" data-search="${(name + ' ' + uni).toLowerCase()}">
    <td class="py-4 px-6"><div class="flex items-center gap-3">${avatar}<span class="font-headline-sm text-headline-sm text-primary">${name}</span></div></td>
    <td class="py-4 px-6">${uni}</td>
    <td class="py-4 px-6 capitalize">${role}</td>
    <td class="py-4 px-6">${fmtDate(a.rsvped_at)}</td>
    <td class="py-4 px-6"><span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${badge} font-headline-sm text-body-sm capitalize"><span class="material-symbols-outlined text-[16px]">${icon}</span> ${a.status}</span></td>
    <td class="py-4 px-6 text-right"><span class="text-text-secondary font-body-sm text-body-sm">${fmtDate(a.rsvped_at)}</span></td>
  </tr>`;
}

function renderTable(list) {
  const tbody = $('ar-tbody');
  if (!list.length) {
    tbody.innerHTML = `<tr><td colspan="6" class="py-8 px-6 text-center text-text-secondary">No RSVPs yet for this event.</td></tr>`;
    return;
  }
  tbody.innerHTML = list.map(rowHtml).join('');
}

function applyFilters() {
  const q = ($('ar-search')?.value ?? '').trim().toLowerCase();
  const role = $('roleFilter')?.value ?? 'All Roles';
  $('ar-tbody').querySelectorAll('tr[data-search]').forEach((tr) => {
    const matchesSearch = !q || tr.dataset.search.includes(q);
    const matchesRole = role === 'All Roles' ||
      (tr.dataset.role ?? '').toLowerCase() === role.toLowerCase();
    tr.hidden = !(matchesSearch && matchesRole);
  });
}

function exportCsv(eventTitle) {
  const header = ['Name', 'University', 'Role', 'Status', 'RSVP Date'];
  const rows = attendees.map((a) => {
    const p = a.profile ?? {};
    return [
      p.full_name ?? '', p.universities?.name ?? '', p.academic_role ?? '',
      a.status, fmtDate(a.rsvped_at),
    ].map((v) => `"${String(v).replace(/"/g, '""')}"`).join(',');
  });
  const csv = [header.join(','), ...rows].join('\r\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `${(eventTitle || 'attendees').replace(/\s+/g, '-').toLowerCase()}-attendees.csv`;
  a.click();
  URL.revokeObjectURL(a.href);
}

function showError(msg) {
  $('ar-event-title').textContent = msg;
  $('ar-tbody').innerHTML = `<tr><td colspan="6" class="py-8 px-6 text-center text-text-secondary">${msg}</td></tr>`;
}

document.addEventListener('DOMContentLoaded', async () => {
  const session = await requireAuth();
  if (!session) return;

  document.querySelectorAll('[data-signout]').forEach((b) =>
    b.addEventListener('click', (e) => { e.preventDefault(); signOut(); }));

  const eventId = new URLSearchParams(window.location.search).get('event');
  if (!eventId) return showError('No event specified.');

  // Load event + verify ownership
  const { data: ev } = await supabase
    .from('events')
    .select('id, title, capacity, rsvp_count, organizer_id, organizers ( user_id )')
    .eq('id', eventId)
    .maybeSingle();

  if (!ev) return showError('Event not found.');
  if (ev.organizers?.user_id !== session.user.id) {
    return showError('You are not authorized to view this event’s attendees.');
  }

  $('ar-event-title').textContent = ev.title;
  $('ar-total').textContent = ev.rsvp_count ?? 0;
  if (ev.capacity) $('ar-capacity').textContent = ` / ${ev.capacity}`;

  const { data, error } = await getEventAttendees(eventId);
  if (error) return showError('Could not load attendees: ' + error.message);
  attendees = data;
  renderTable(attendees);

  $('ar-search')?.addEventListener('input', applyFilters);
  $('roleFilter')?.addEventListener('change', applyFilters);
  $('ar-export')?.addEventListener('click', () => exportCsv(ev.title));
});

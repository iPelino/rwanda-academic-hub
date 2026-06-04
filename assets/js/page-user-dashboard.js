/**
 * Rwanda Academic Hub — User Dashboard Script
 *
 * Guards auth, then renders the signed-in user's:
 *   - profile header (name + university + avatar)
 *   - upcoming RSVPs
 *   - saved events
 *   - followed organizers
 */

import { requireAuth, getCurrentProfile, signOut } from './auth.js';
import { getUserRsvps, getSavedEvents, getFollowedOrganizers } from './interactions.js';

const $ = (id) => document.getElementById(id);
const EVENT_BASE = '/pages/events/event-detail.html?slug=';
const UNI_BASE   = '/pages/university-profile.html?slug=';

function fmtShortDate(iso) {
  return new Date(iso).toLocaleDateString('en-RW', { month: 'short', day: 'numeric', year: 'numeric' });
}
function fmtTime(iso) {
  return new Date(iso).toLocaleTimeString('en-RW', { hour: '2-digit', minute: '2-digit' });
}
function empty(msg) {
  return `<div class="text-text-secondary py-8 col-span-full">${msg}</div>`;
}

/* ---------- profile ---------- */
function renderProfile(profile, user) {
  const name = profile?.full_name || user.user_metadata?.full_name || user.email;
  $('ud-welcome').textContent = `Welcome back, ${name.split(' ')[0]}`;
  $('ud-profile-name').textContent = name;
  $('ud-profile-sub').textContent = profile?.universities?.name ?? profile?.academic_role ?? '';
  const avatar = $('ud-profile-avatar');
  if (profile?.avatar_url) {
    avatar.style.backgroundImage = `url('${profile.avatar_url}')`;
    avatar.textContent = '';
  } else {
    avatar.textContent = (name[0] ?? '?').toUpperCase();
  }
}

/* ---------- RSVPs (compact rows) ---------- */
function renderRsvps(rows) {
  const el = $('ud-rsvps');
  // Only future events, soonest first
  const upcoming = rows
    .filter((r) => r.events && new Date(r.events.start_datetime) >= new Date())
    .sort((a, b) => new Date(a.events.start_datetime) - new Date(b.events.start_datetime));

  if (!upcoming.length) {
    el.innerHTML = empty('You have no upcoming RSVPs yet. <a class="text-forest-mid underline" href="/index.html">Discover events</a>.');
    return;
  }

  el.innerHTML = upcoming.map((r) => {
    const e = r.events;
    const d = new Date(e.start_datetime);
    return `
    <div class="bg-surface rounded-lg border border-border-sage p-4 flex items-center justify-between card-shadow hover-shadow transition-shadow">
      <div class="flex items-center gap-6">
        <div class="bg-sage-elevated rounded p-3 text-center min-w-[70px]">
          <span class="block font-headline-sm text-headline-sm text-forest-dark">${d.toLocaleDateString('en-RW', { month: 'short' })}</span>
          <span class="block font-headline-lg text-headline-lg text-forest-dark">${d.getDate()}</span>
        </div>
        <div>
          <h3 class="font-headline-md text-headline-md text-text-primary mb-1">${e.title}</h3>
          <p class="font-body-sm text-body-sm text-text-secondary flex items-center gap-2">
            <span class="material-symbols-outlined text-[16px]">schedule</span> ${fmtTime(e.start_datetime)}
            ${e.cities?.name ? `· ${e.cities.name}` : ''}
          </p>
        </div>
      </div>
      <a href="${EVENT_BASE}${e.slug}" class="px-6 py-2 border border-forest-mid text-forest-mid font-headline-sm text-headline-sm rounded hover:bg-sage-elevated transition-colors">View Details</a>
    </div>`;
  }).join('');
}

/* ---------- Saved events (cards) ---------- */
function renderSaved(rows) {
  const el = $('ud-saved');
  const items = rows.filter((r) => r.events);
  if (!items.length) {
    el.innerHTML = empty('No saved events yet. Tap the bookmark on any event to save it here.');
    return;
  }
  el.innerHTML = items.map((r) => {
    const e = r.events;
    const banner = e.banner_url
      ? `background-image:url('${e.banner_url}');background-size:cover;background-position:center;`
      : 'background-color:#E4EAD8;';
    return `
    <a href="${EVENT_BASE}${e.slug}" class="bg-surface rounded-lg border border-border-sage overflow-hidden flex flex-col card-shadow hover-shadow transition-all group">
      <div class="h-40" style="${banner}"></div>
      <div class="p-card-padding flex flex-col flex-1">
        <h3 class="font-headline-md text-headline-md text-text-primary mb-2 line-clamp-2">${e.title}</h3>
        <p class="font-body-sm text-body-sm text-text-secondary mb-4 flex items-center gap-1">
          <span class="material-symbols-outlined text-[16px]">location_on</span> ${e.cities?.name ?? e.organizers?.name ?? ''}
        </p>
        <div class="mt-auto flex items-center justify-between border-t border-border-sage/50 pt-4">
          <span class="font-body-sm text-body-sm text-forest-mid font-semibold">${fmtShortDate(e.start_datetime)}</span>
          <span class="font-body-sm text-body-sm text-text-secondary">${e.is_free ? 'Free' : 'RWF ' + Number(e.price_rwf ?? 0).toLocaleString()}</span>
        </div>
      </div>
    </a>`;
  }).join('');
}

/* ---------- Following (organizer cards) ---------- */
function renderFollowing(rows) {
  const el = $('ud-following');
  const items = rows.filter((r) => r.organizers);
  if (!items.length) {
    el.innerHTML = empty('You are not following any organizers yet.');
    return;
  }
  el.innerHTML = items.map((r) => {
    const o = r.organizers;
    const avatar = o.logo_url
      ? `<div class="w-20 h-20 rounded-full bg-cover bg-center mb-4 border border-sage-dim" style="background-image:url('${o.logo_url}')"></div>`
      : `<div class="w-20 h-20 rounded-full bg-sage-elevated flex items-center justify-center mb-4 border border-border-sage"><span class="material-symbols-outlined text-3xl text-forest-light">groups</span></div>`;
    return `
    <a href="${UNI_BASE}${o.slug}" class="min-w-[280px] bg-surface rounded-lg border border-border-sage p-card-padding flex flex-col items-center text-center card-shadow hover:-translate-y-1 transition-transform cursor-pointer">
      ${avatar}
      <h3 class="font-headline-md text-headline-md text-text-primary flex items-center gap-1">${o.name}
        ${o.is_verified ? '<span class="material-symbols-outlined text-accent-amber text-[18px]" style="font-variation-settings:\'FILL\' 1">verified</span>' : ''}
      </h3>
      <p class="font-body-sm text-body-sm text-text-secondary mb-4">${o.universities?.name ?? (o.organizer_type ?? '').replace('_', ' ')}</p>
    </a>`;
  }).join('');
}

/* ---------- init ---------- */
document.addEventListener('DOMContentLoaded', async () => {
  const session = await requireAuth();
  if (!session) return;

  document.querySelectorAll('[data-signout]').forEach((b) =>
    b.addEventListener('click', (e) => { e.preventDefault(); signOut(); }));

  const [profile, rsvps, saved, following] = await Promise.all([
    getCurrentProfile(),
    getUserRsvps(),
    getSavedEvents(),
    getFollowedOrganizers(),
  ]);

  renderProfile(profile, session.user);
  renderRsvps(rsvps);
  renderSaved(saved);
  renderFollowing(following);
});

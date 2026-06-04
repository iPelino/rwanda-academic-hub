/**
 * Rwanda Academic Hub — Event Detail Page Script
 *
 * Reads ?slug= from the URL, loads the full event from Supabase, and renders:
 *   - hero (banner, tags, title, date/location)
 *   - organizer attribution + follow
 *   - description, schedule, eligibility, venue
 *   - speakers + agenda
 *   - sidebar: price, RSVP toggle, save/bookmark, share, add-to-calendar, report
 *
 * All write actions (RSVP, save, follow, flag) require auth; unauthenticated
 * users are redirected to sign-in with a ?next back to this page.
 */

import { supabase } from './supabase-client.js';
import { getEventBySlug } from './events-api.js';
import {
  toggleRsvp, getRsvp,
  toggleBookmark, isEventSaved,
  toggleFollowOrganizer, isFollowingOrganizer,
  flagEvent,
} from './interactions.js';

const $ = (id) => document.getElementById(id);

function getSlug() {
  return new URLSearchParams(window.location.search).get('slug');
}

function requireAuthRedirect() {
  const next = encodeURIComponent(window.location.pathname + window.location.search);
  window.location.href = `/pages/auth/sign-in.html?next=${next}`;
}

function fmtDateRange(startIso, endIso) {
  const opts = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
  const start = new Date(startIso);
  const startStr = start.toLocaleDateString('en-RW', opts);
  const timeStr = start.toLocaleTimeString('en-RW', { hour: '2-digit', minute: '2-digit' });
  if (!endIso) return `${startStr} · ${timeStr}`;
  const end = new Date(endIso);
  const sameDay = start.toDateString() === end.toDateString();
  if (sameDay) {
    const endTime = end.toLocaleTimeString('en-RW', { hour: '2-digit', minute: '2-digit' });
    return `${startStr} · ${timeStr} – ${endTime}`;
  }
  return `${startStr} – ${end.toLocaleDateString('en-RW', opts)}`;
}

const ELIGIBILITY_LABELS = {
  open_to_all: 'Open to All',
  academic_community: 'Academic Community',
  institution_specific: 'Institution Specific',
  invite_only: 'Invite Only',
  application_based: 'Application Based',
};

const FORMAT_ICON = { in_person: 'location_on', online: 'videocam', hybrid: 'hub' };

let currentEvent = null;

/* ------------------------------------------------------------------ */
/*  RENDER                                                             */
/* ------------------------------------------------------------------ */

function renderEvent(ev) {
  document.title = `${ev.title} — Academia Rwanda`;

  // Hero banner
  if (ev.banner_url) {
    const hero = $('ed-hero');
    hero.style.backgroundImage =
      `linear-gradient(rgba(15,30,23,0.55),rgba(15,30,23,0.55)), url('${ev.banner_url}')`;
  }

  // Tags
  const cat = ev.event_categories;
  const tags = $('ed-tags');
  tags.innerHTML = '';
  if (cat) {
    tags.insertAdjacentHTML('beforeend',
      `<span class="bg-primary-fixed text-on-primary-fixed px-3 py-1 rounded-full text-body-sm font-headline-sm flex items-center gap-1">
         <span class="material-symbols-outlined text-[16px]">${cat.icon ?? 'event'}</span> ${cat.name}
       </span>`);
  }
  tags.insertAdjacentHTML('beforeend',
    `<span class="bg-tertiary-fixed text-on-tertiary-fixed px-3 py-1 rounded-full text-body-sm font-headline-sm flex items-center gap-1">
       <span class="material-symbols-outlined text-[16px]">${FORMAT_ICON[ev.event_format] ?? 'event'}</span>
       ${(ev.event_format ?? '').replace('_', ' ')}
     </span>`);
  (ev.tags ?? []).forEach((t) => {
    tags.insertAdjacentHTML('beforeend',
      `<span class="bg-sage-dim text-forest-mid px-3 py-1 rounded-full text-body-sm font-headline-sm">#${t}</span>`);
  });

  // Title + meta
  $('ed-title').textContent = ev.title;
  const city = ev.cities?.name ?? '';
  const venue = ev.venues?.name ?? '';
  const place = [venue, city].filter(Boolean).join(', ') || (ev.event_format === 'online' ? 'Online' : '');
  $('ed-meta').innerHTML =
    `<span class="material-symbols-outlined">event</span> ${fmtDateRange(ev.start_datetime, ev.end_datetime)}
     <span class="mx-2 text-border-sage">|</span>
     <span class="material-symbols-outlined">location_on</span> ${place}`;

  // Organizer
  const org = ev.organizers;
  if (org) {
    $('ed-organizer-name').textContent = org.name;
    $('ed-organizer-sub').textContent = org.universities?.name ?? 'Host';
    // Link to the host university profile when the organizer is tied to one.
    if (org.universities?.slug) {
      $('ed-organizer-link').href = `/pages/university-profile.html?slug=${org.universities.slug}`;
    } else {
      $('ed-organizer-link').removeAttribute('href');
      $('ed-organizer-link').classList.remove('hover:border-forest-mid');
    }
    $('ed-organizer-verified').classList.toggle('hidden', !org.is_verified);
    $('ed-mini-name').textContent = org.universities?.short_name ?? org.name;
    if (org.logo_url) {
      $('ed-organizer-avatar').style.backgroundImage = `url('${org.logo_url}')`;
      $('ed-organizer-avatar').textContent = '';
      $('ed-mini-avatar').style.backgroundImage = `url('${org.logo_url}')`;
      $('ed-mini-avatar').textContent = '';
    } else {
      const initials = org.name.slice(0, 2).toUpperCase();
      $('ed-organizer-avatar').textContent = initials;
      $('ed-mini-avatar').textContent = initials;
    }
  }

  // Description (description is HTML in the DB)
  $('ed-description').innerHTML = ev.description
    ? ev.description
    : `<p>${ev.summary ?? 'No description provided.'}</p>`;

  // Logistics
  $('ed-schedule').innerHTML = fmtDateRange(ev.start_datetime, ev.end_datetime)
    + (ev.timezone ? `<br/>${ev.timezone}` : '');
  $('ed-eligibility').textContent = ELIGIBILITY_LABELS[ev.audience_eligibility] ?? 'Open to All';
  const venueLine = ev.event_format === 'online'
    ? 'Online event'
    : [venue, ev.venues?.address, city].filter(Boolean).join('<br/>') || city || 'TBA';
  $('ed-venue').innerHTML = venueLine;

  // Speakers
  const speakers = (ev.event_speakers ?? []).sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
  if (speakers.length) {
    $('ed-speakers-section').classList.remove('hidden');
    $('ed-speakers').innerHTML = speakers.map((s) => `
      <div class="flex items-center gap-3">
        <div class="w-12 h-12 rounded-full bg-surface-variant bg-cover bg-center flex items-center justify-center text-primary font-headline-sm"
             style="${s.avatar_url ? `background-image:url('${s.avatar_url}')` : ''}">
          ${s.avatar_url ? '' : (s.name?.[0] ?? '?')}
        </div>
        <div>
          <p class="font-headline-sm text-headline-sm text-primary">${s.name}</p>
          <p class="font-body-sm text-body-sm text-text-secondary">${s.title ?? ''}</p>
        </div>
      </div>`).join('');
  }

  // Agenda
  const agenda = (ev.event_agenda_items ?? []).sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
  if (agenda.length) {
    $('ed-agenda-section').classList.remove('hidden');
    $('ed-agenda').innerHTML = agenda.map((a) => {
      const t = a.start_time
        ? new Date(a.start_time).toLocaleTimeString('en-RW', { hour: '2-digit', minute: '2-digit' })
        : '';
      return `
      <div class="flex gap-4 border-l-2 border-forest-mid pl-4">
        <div class="font-headline-sm text-headline-sm text-forest-mid w-20 shrink-0">${t}</div>
        <div>
          <p class="font-headline-sm text-headline-sm text-primary">${a.title}</p>
          ${a.description ? `<p class="font-body-sm text-body-sm text-text-secondary">${a.description}</p>` : ''}
          ${a.event_speakers?.name ? `<p class="font-body-sm text-body-sm text-forest-mid mt-1">${a.event_speakers.name}</p>` : ''}
        </div>
      </div>`;
    }).join('');
  }

  // Price + capacity
  $('ed-price').textContent = ev.is_free
    ? 'Free'
    : `RWF ${Number(ev.price_rwf ?? 0).toLocaleString()}`;
  if (ev.capacity) {
    const remaining = Math.max(0, ev.capacity - (ev.rsvp_count ?? 0));
    $('ed-seats-text').textContent = `${remaining} of ${ev.capacity} seats remaining`;
  } else {
    $('ed-seats-text').textContent = `${ev.rsvp_count ?? 0} attending`;
  }
  if (ev.registration_deadline) {
    $('ed-reg-note').textContent =
      `Registration closes ${new Date(ev.registration_deadline).toLocaleDateString('en-RW', { month: 'short', day: 'numeric' })}`;
  }

  // External registration link mode
  if (ev.registration_type === 'external_link' && ev.registration_link) {
    $('ed-external-link').href = ev.registration_link;
    $('ed-external-link').classList.remove('hidden');
  }
}

/* ------------------------------------------------------------------ */
/*  INTERACTIONS                                                       */
/* ------------------------------------------------------------------ */

function setRsvpButton(active) {
  const btn = $('ed-rsvp-btn');
  const label = $('ed-rsvp-label');
  if (active) {
    label.textContent = 'Going — Cancel RSVP';
    btn.classList.remove('bg-accent-amber');
    btn.classList.add('bg-forest-mid', 'text-on-primary');
  } else {
    label.textContent = 'Register for Event';
    btn.classList.add('bg-accent-amber');
    btn.classList.remove('bg-forest-mid', 'text-on-primary');
  }
}

function setSaveButton(saved) {
  const icon = $('ed-save-btn').querySelector('.material-symbols-outlined');
  icon.textContent = saved ? 'bookmark' : 'bookmark_border';
  icon.style.fontVariationSettings = saved ? "'FILL' 1" : "'FILL' 0";
  $('ed-save-btn').classList.toggle('text-accent-amber', saved);
}

function setFollowButton(following) {
  const btn = $('ed-follow-btn');
  btn.textContent = following ? 'Following' : 'Follow';
  btn.classList.toggle('bg-forest-mid', following);
  btn.classList.toggle('text-on-primary', following);
}

async function hydrateInteractionState() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return; // guest: buttons prompt sign-in on click

  const [rsvp, saved, following] = await Promise.all([
    getRsvp(currentEvent.id),
    isEventSaved(currentEvent.id),
    currentEvent.organizers ? isFollowingOrganizer(currentEvent.organizers.id) : Promise.resolve(false),
  ]);
  setRsvpButton(rsvp && rsvp.status !== 'cancelled');
  setSaveButton(saved);
  setFollowButton(following);
}

function downloadIcs(ev) {
  const fmt = (d) => new Date(d).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const lines = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Academia Rwanda//EN', 'BEGIN:VEVENT',
    `UID:${ev.id}@academia-rwanda`,
    `DTSTAMP:${fmt(new Date())}`,
    `DTSTART:${fmt(ev.start_datetime)}`,
    ev.end_datetime ? `DTEND:${fmt(ev.end_datetime)}` : '',
    `SUMMARY:${ev.title}`,
    `DESCRIPTION:${(ev.summary ?? '').replace(/\n/g, ' ')}`,
    `LOCATION:${[ev.venues?.name, ev.cities?.name].filter(Boolean).join(', ')}`,
    'END:VEVENT', 'END:VCALENDAR',
  ].filter(Boolean);
  const blob = new Blob([lines.join('\r\n')], { type: 'text/calendar' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `${ev.slug}.ics`;
  a.click();
  URL.revokeObjectURL(a.href);
}

function wireActions() {
  $('ed-rsvp-btn').addEventListener('click', async () => {
    const { status, error } = await toggleRsvp(currentEvent.id);
    if (error?.message === 'Not logged in') return requireAuthRedirect();
    if (error) return alert('Could not update RSVP: ' + error.message);
    setRsvpButton(status && status !== 'cancelled');
  });

  $('ed-save-btn').addEventListener('click', async () => {
    const { saved, error } = await toggleBookmark(currentEvent.id);
    if (error?.message === 'Not logged in') return requireAuthRedirect();
    if (error) return alert('Could not save event: ' + error.message);
    setSaveButton(saved);
  });

  $('ed-follow-btn').addEventListener('click', async () => {
    if (!currentEvent.organizers) return;
    const { following, error } = await toggleFollowOrganizer(currentEvent.organizers.id);
    if (error?.message === 'Not logged in') return requireAuthRedirect();
    if (error) return alert('Could not follow: ' + error.message);
    setFollowButton(following);
  });

  $('ed-share-btn').addEventListener('click', async () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: currentEvent.title, url }).catch(() => {});
    } else {
      await navigator.clipboard.writeText(url);
      alert('Link copied to clipboard');
    }
  });

  $('ed-calendar-btn').addEventListener('click', () => downloadIcs(currentEvent));

  $('ed-flag-btn').addEventListener('click', async () => {
    const reason = prompt('Why are you reporting this event?\n(misleading, spam, duplicate, inappropriate, cancelled_not_updated, other)', 'other');
    if (!reason) return;
    const { error } = await flagEvent(currentEvent.id, reason.trim());
    if (error?.message === 'Not logged in') return requireAuthRedirect();
    if (error) return alert('Could not submit report: ' + error.message);
    alert('Thank you — your report has been submitted.');
  });
}

/* ------------------------------------------------------------------ */
/*  INIT                                                               */
/* ------------------------------------------------------------------ */

document.addEventListener('DOMContentLoaded', async () => {
  setupNav();

  const slug = getSlug();
  if (!slug) return showNotFound();

  const { data, error } = await getEventBySlug(slug);
  if (error || !data) return showNotFound();

  currentEvent = data;
  renderEvent(data);
  wireActions();
  hydrateInteractionState();
});

async function setupNav() {
  const { data: { session } } = await supabase.auth.getSession();
  const guest = $('nav-guest-actions');
  const user = $('nav-user-actions');
  const avatar = $('nav-user-avatar');
  if (session) {
    guest?.classList.add('hidden');
    user?.classList.remove('hidden');
    user?.classList.add('flex');
    if (avatar) {
      const name = session.user.user_metadata?.full_name ?? session.user.email;
      avatar.textContent = (name?.[0] ?? '?').toUpperCase();
    }
  } else {
    guest?.classList.remove('hidden');
    user?.classList.add('hidden');
    user?.classList.remove('flex');
  }
  document.querySelectorAll('[data-signout]').forEach((b) =>
    b.addEventListener('click', async (e) => {
      e.preventDefault();
      await supabase.auth.signOut();
      window.location.href = '/index.html';
    }));
}

function showNotFound() {
  $('ed-hero')?.classList.add('hidden');
  document.querySelector('main')?.classList.add('hidden');
  $('ed-notfound')?.classList.remove('hidden');
}

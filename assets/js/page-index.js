/**
 * Rwanda Academic Hub — Homepage (index.html) Script
 *
 * Loads live data from Supabase into:
 *   - Featured events carousel / hero cards
 *   - Discovery feed event cards (with category + city filters)
 *   - Category filter chips
 *   - "Happening in Kigali" section
 *   - Auth-aware nav (sign-in / avatar)
 */

import { supabase } from './supabase-client.js';
import {
  getPublishedEvents,
  getFeaturedEvents,
  getCategories,
  getCities,
} from './events-api.js';
import { toggleBookmark, isEventSaved } from './interactions.js';

/* ------------------------------------------------------------------ */
/*  STATE                                                               */
/* ------------------------------------------------------------------ */

let currentFilters = { categorySlug: null, cityName: null, offset: 0, limit: 9 };
let totalCount = 0;

/* ------------------------------------------------------------------ */
/*  EVENT CARD RENDERER                                                 */
/* ------------------------------------------------------------------ */

function formatDate(isoString) {
  const d = new Date(isoString);
  return d.toLocaleDateString('en-RW', {
    weekday: 'short',
    month:   'short',
    day:     'numeric',
    hour:    '2-digit',
    minute:  '2-digit',
  });
}

function buildEventCard(event, saved = false) {
  const category = event.event_categories;
  const org      = event.organizers;
  const city     = event.cities;

  const categoryBadge = category
    ? `<span class="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide
                    bg-sage-dim text-forest-mid px-2 py-0.5 rounded-full">
         <span class="material-symbols-outlined text-[12px]">${category.icon ?? 'event'}</span>
         ${category.name}
       </span>`
    : '';

  const verifiedBadge = org?.is_verified
    ? `<span class="material-symbols-outlined text-accent-amber text-[14px]"
            style="font-variation-settings:'FILL' 1" title="Verified organizer">verified</span>`
    : '';

  const priceTag = event.is_free
    ? `<span class="text-forest-mid font-semibold text-[13px]">Free</span>`
    : `<span class="text-text-primary font-semibold text-[13px]">RWF ${Number(event.price_rwf).toLocaleString()}</span>`;

  const bannerStyle = event.banner_url
    ? `background-image:url('${event.banner_url}');background-size:cover;background-position:center;`
    : 'background-color:#E4EAD8;';

  const bookmarkFill = saved ? "'FILL' 1" : "'FILL' 0";
  const bookmarkClass = saved ? 'is-bookmarked text-accent-amber' : 'text-text-secondary';
  const bookmarkIcon  = saved ? 'bookmark' : 'bookmark_border';

  return `
<article class="event-card bg-surface-container-lowest border border-border-sage rounded-xl overflow-hidden
                hover-shadow transition-all duration-200 cursor-pointer group"
         data-event-id="${event.id}"
         data-event-slug="${event.slug}"
         onclick="window.location.href='pages/events/event-detail.html?slug=${event.slug}'">

  <!-- Banner -->
  <div class="relative h-44 overflow-hidden" style="${bannerStyle}">
    ${event.is_featured ? `<div class="absolute top-3 left-3 bg-accent-amber text-[#3B2800] text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">Featured</div>` : ''}
    <!-- Bookmark -->
    <button class="bookmark-btn absolute top-3 right-3 p-1.5 bg-surface-container-lowest/80 backdrop-blur-sm
                   rounded-full ${bookmarkClass} hover:text-accent-amber transition-colors"
            data-bookmark data-event-id="${event.id}"
            aria-label="${saved ? 'Remove bookmark' : 'Bookmark event'}"
            onclick="event.stopPropagation()">
      <span class="material-symbols-outlined text-[20px]"
            style="font-variation-settings:${bookmarkFill}">${bookmarkIcon}</span>
    </button>
  </div>

  <!-- Content -->
  <div class="p-4 space-y-3">
    <div class="flex items-start justify-between gap-2">
      ${categoryBadge}
      ${priceTag}
    </div>

    <h3 class="font-headline-sm text-headline-sm text-text-primary line-clamp-2 group-hover:text-forest-mid transition-colors">
      ${event.title}
    </h3>

    <div class="flex items-center gap-2 font-body-sm text-body-sm text-text-secondary">
      <span class="material-symbols-outlined text-[15px]">calendar_today</span>
      <span>${formatDate(event.start_datetime)}</span>
    </div>

    ${city ? `<div class="flex items-center gap-2 font-body-sm text-body-sm text-text-secondary">
      <span class="material-symbols-outlined text-[15px]">location_on</span>
      <span>${city.name}</span>
    </div>` : ''}

    <div class="flex items-center justify-between pt-2 border-t border-border-sage">
      <div class="flex items-center gap-2">
        <div class="w-6 h-6 rounded-full bg-sage-dim flex items-center justify-center overflow-hidden">
          ${org?.logo_url
            ? `<img src="${org.logo_url}" alt="${org.name}" class="w-full h-full object-cover"/>`
            : `<span class="material-symbols-outlined text-[14px] text-forest-mid">group</span>`}
        </div>
        <span class="font-body-sm text-body-sm text-text-secondary max-w-[140px] truncate">
          ${org?.name ?? ''}
        </span>
        ${verifiedBadge}
      </div>
      <div class="flex items-center gap-1 text-text-secondary font-body-sm text-body-sm">
        <span class="material-symbols-outlined text-[14px]">people</span>
        <span>${event.rsvp_count}</span>
      </div>
    </div>
  </div>
</article>`;
}

/* ------------------------------------------------------------------ */
/*  RENDER FUNCTIONS                                                    */
/* ------------------------------------------------------------------ */

async function renderFeaturedEvents() {
  const container = document.getElementById('featured-events-grid');
  if (!container) return;

  container.innerHTML = '<div class="col-span-full text-center py-12 text-text-secondary">Loading…</div>';

  const { data, error } = await getFeaturedEvents(3);

  if (error || !data.length) {
    container.innerHTML = '<div class="col-span-full text-center py-8 text-text-secondary">No featured events right now.</div>';
    return;
  }

  container.innerHTML = data.map((e) => buildEventCard(e)).join('');
  wireBookmarkButtons(container);
}

async function renderEventFeed(reset = false) {
  const container = document.getElementById('events-feed-grid');
  const loadMoreBtn = document.getElementById('load-more-btn');
  if (!container) return;

  if (reset) {
    currentFilters.offset = 0;
    container.innerHTML = '<div class="col-span-full text-center py-12 text-text-secondary">Loading…</div>';
  }

  const { data, count, error } = await getPublishedEvents(currentFilters);

  if (error) {
    container.innerHTML = '<div class="col-span-full text-center py-8 text-error">Failed to load events.</div>';
    return;
  }

  totalCount = count;

  if (!data.length && reset) {
    container.innerHTML = '<div class="col-span-full text-center py-12 text-text-secondary">No events found.</div>';
    if (loadMoreBtn) loadMoreBtn.classList.add('hidden');
    return;
  }

  const cards = data.map((e) => buildEventCard(e)).join('');

  if (reset) {
    container.innerHTML = cards;
  } else {
    container.insertAdjacentHTML('beforeend', cards);
  }

  wireBookmarkButtons(container);

  // Load More button
  const nextOffset = currentFilters.offset + data.length;
  currentFilters.offset = nextOffset;
  if (loadMoreBtn) {
    if (nextOffset >= totalCount) {
      loadMoreBtn.classList.add('hidden');
    } else {
      loadMoreBtn.classList.remove('hidden');
      loadMoreBtn.textContent = `Load More (${totalCount - nextOffset} remaining)`;
    }
  }
}

/* ------------------------------------------------------------------ */
/*  CATEGORY FILTER CHIPS                                               */
/* ------------------------------------------------------------------ */

async function renderCategoryFilters() {
  const container = document.getElementById('category-filters');
  if (!container) return;

  const { data: categories } = await getCategories();
  if (!categories.length) return;

  // Prepend "All" chip
  const allChip = `
    <button class="category-chip active flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-forest-mid
                   bg-forest-mid text-on-primary font-body-sm text-body-sm transition-all"
            data-category="">
      All
    </button>`;

  const chips = categories.map((cat) => `
    <button class="category-chip flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-border-sage
                   bg-surface text-text-secondary font-body-sm text-body-sm hover:bg-sage-elevated transition-all"
            data-category="${cat.slug}">
      <span class="material-symbols-outlined text-[14px]">${cat.icon ?? 'event'}</span>
      ${cat.name}
    </button>`).join('');

  container.innerHTML = allChip + chips;

  container.querySelectorAll('.category-chip').forEach((btn) => {
    btn.addEventListener('click', () => {
      // Update active state
      container.querySelectorAll('.category-chip').forEach((b) => {
        b.classList.remove('active', 'bg-forest-mid', 'text-on-primary', 'border-forest-mid');
        b.classList.add('bg-surface', 'text-text-secondary', 'border-border-sage');
      });
      btn.classList.add('active', 'bg-forest-mid', 'text-on-primary', 'border-forest-mid');
      btn.classList.remove('bg-surface', 'text-text-secondary', 'border-border-sage');

      currentFilters.categorySlug = btn.dataset.category || null;
      renderEventFeed(true);
    });
  });
}

/* ------------------------------------------------------------------ */
/*  BOOKMARK INTERACTIVITY                                              */
/* ------------------------------------------------------------------ */

function wireBookmarkButtons(container) {
  container.querySelectorAll('.bookmark-btn').forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const eventId = btn.dataset.eventId;
      const { saved, error } = await toggleBookmark(eventId);

      if (error?.message === 'Not logged in') {
        window.location.href = '/pages/auth/sign-in.html';
        return;
      }

      const icon = btn.querySelector('.material-symbols-outlined');
      if (saved) {
        icon.textContent = 'bookmark';
        icon.style.fontVariationSettings = "'FILL' 1";
        btn.classList.add('is-bookmarked', 'text-accent-amber');
        btn.classList.remove('text-text-secondary');
      } else {
        icon.textContent = 'bookmark_border';
        icon.style.fontVariationSettings = "'FILL' 0";
        btn.classList.remove('is-bookmarked', 'text-accent-amber');
        btn.classList.add('text-text-secondary');
      }
    });
  });
}

/* ------------------------------------------------------------------ */
/*  NAV AUTH STATE                                                      */
/* ------------------------------------------------------------------ */

async function setupNav() {
  const { data: { session } } = await supabase.auth.getSession();
  const guestNav = document.getElementById('nav-guest-actions');
  const userNav  = document.getElementById('nav-user-actions');
  const avatar   = document.getElementById('nav-user-avatar');

  if (session) {
    guestNav?.classList.add('hidden');
    userNav?.classList.remove('hidden');
    userNav?.classList.add('flex');
    if (avatar) {
      const name = session.user.user_metadata?.full_name ?? session.user.email;
      avatar.textContent = name[0].toUpperCase();
    }
  } else {
    guestNav?.classList.remove('hidden');
    userNav?.classList.add('hidden');
    userNav?.classList.remove('flex');
  }

  // Wire sign-out (no dependency on auth.js side effects)
  document.querySelectorAll('[data-signout]').forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      await supabase.auth.signOut();
      window.location.href = '/index.html';
    });
  });
}

/* ------------------------------------------------------------------ */
/*  INIT                                                                */
/* ------------------------------------------------------------------ */

document.addEventListener('DOMContentLoaded', async () => {
  await setupNav();
  await renderCategoryFilters();

  // Render sections in parallel
  await Promise.all([
    renderFeaturedEvents(),
    renderEventFeed(true),
  ]);

  // Load More button
  document.getElementById('load-more-btn')?.addEventListener('click', () => {
    renderEventFeed(false);
  });

  // Search bar
  const searchInput = document.getElementById('event-search');
  if (searchInput) {
    let debounceTimer;
    searchInput.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        currentFilters.search = searchInput.value.trim() || undefined;
        renderEventFeed(true);
      }, 400);
    });
  }
});

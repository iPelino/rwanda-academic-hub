/**
 * Rwanda Academic Hub — Create Event Step 1 Script
 *
 * - Requires authenticated session (redirects if not logged in)
 * - Populates Category <select> from Supabase event_categories
 * - Saves form data to Supabase as a draft on "Continue"
 * - Persists draft ID in localStorage for steps 2 and 3
 */

import { requireAuth } from '../../assets/js/auth.js';
import { getCategories, saveDraftStep1 } from '../../assets/js/events-api.js';
import { supabase } from '../../assets/js/supabase-client.js';

/* ------------------------------------------------------------------ */
/*  HELPERS                                                             */
/* ------------------------------------------------------------------ */

function showFormError(message) {
  let banner = document.getElementById('step1-error-banner');
  if (!banner) {
    banner = document.createElement('div');
    banner.id = 'step1-error-banner';
    banner.className =
      'flex items-center gap-3 bg-error-container text-on-error-container ' +
      'border border-[#93000a]/30 rounded-lg px-4 py-3 mb-6 font-body-sm text-body-sm';
    const form = document.getElementById('createEventForm');
    form?.prepend(banner);
  }
  banner.innerHTML = `<span class="material-symbols-outlined text-[18px] shrink-0">error</span><span>${message}</span>`;
  banner.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/* ------------------------------------------------------------------ */
/*  POPULATE CATEGORY DROPDOWN                                          */
/* ------------------------------------------------------------------ */

async function populateCategories() {
  const select = document.getElementById('category');
  if (!select) return;

  const { data: categories } = await getCategories();
  if (!categories.length) return;

  const placeholder = select.querySelector('option[disabled]');
  select.innerHTML = '';
  if (placeholder) select.appendChild(placeholder);

  categories.forEach((cat) => {
    const opt = document.createElement('option');
    opt.value = cat.slug;
    opt.textContent = cat.name;
    select.appendChild(opt);
  });
}

/* ------------------------------------------------------------------ */
/*  GET ORGANIZER ID for current user                                   */
/* ------------------------------------------------------------------ */

async function getOrCreateOrganizerForUser(userId) {
  // Check if user already has an organizer profile
  const { data: existing } = await supabase
    .from('organizers')
    .select('id')
    .eq('user_id', userId)
    .maybeSingle();

  if (existing) return existing.id;

  // Create a basic organizer record — user can complete profile later
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('full_name, university_id')
    .eq('id', userId)
    .single();

  const { data: newOrg, error } = await supabase
    .from('organizers')
    .insert({
      user_id:       userId,
      name:          profile?.full_name ?? 'My Organization',
      slug:          `organizer-${userId.slice(0, 8)}`,
      organizer_type: 'club',
      university_id: profile?.university_id ?? null,
    })
    .select('id')
    .single();

  if (error) {
    console.error('[CreateEvent] Could not create organizer:', error.message);
    return null;
  }

  // Also update user_profiles with organizer_id
  await supabase
    .from('user_profiles')
    .update({ organizer_id: newOrg.id, role: 'organizer' })
    .eq('id', userId);

  return newOrg.id;
}

/* ------------------------------------------------------------------ */
/*  FORM SUBMISSION → Save Draft → Next Step                           */
/* ------------------------------------------------------------------ */

async function handleStep1Submit(e, session) {
  e.preventDefault();
  const form = e.target;
  const btn  = document.getElementById('continue-btn');

  const formData = {
    eventTitle:  form.eventTitle?.value.trim(),
    category:    form.category?.value,
    description: form.description?.value.trim(),
    startDate:   form.startDate?.value,
    startTime:   form.startTime?.value,
    eventFormat: form.eventFormat?.value,
    audience:    form.audience?.value,
    maxCapacity: form.maxCapacity?.value,
    location:    form.location?.value,
  };

  if (!formData.eventTitle) return showFormError('Please enter an event title.');
  if (!formData.category)    return showFormError('Please select a category.');
  if (!formData.description) return showFormError('Please add a description.');
  if (!formData.startDate || !formData.startTime)
    return showFormError('Please set the event start date and time.');

  if (btn) { btn.disabled = true; btn.textContent = 'Saving…'; }

  const organizerId = await getOrCreateOrganizerForUser(session.user.id);
  if (!organizerId) {
    showFormError('Could not create your organizer profile. Please try again.');
    if (btn) { btn.disabled = false; btn.textContent = 'Continue to Media'; }
    return;
  }

  const { data, error } = await saveDraftStep1(formData, organizerId);

  if (error) {
    showFormError(error.message ?? 'Failed to save draft. Please try again.');
    if (btn) { btn.disabled = false; btn.textContent = 'Continue to Media'; }
    return;
  }

  // Navigate to Step 2
  window.location.href = 'step-2-media.html';
}

/* ------------------------------------------------------------------ */
/*  INIT                                                                */
/* ------------------------------------------------------------------ */

document.addEventListener('DOMContentLoaded', async () => {
  // Guard: must be logged in to create events
  const session = await requireAuth();
  if (!session) return;

  await populateCategories();

  const form = document.getElementById('createEventForm');
  if (form) {
    // Wire the "Continue" link as form submit trigger
    const continueBtn = document.querySelector('a[href="step-2-media.html"]');
    if (continueBtn) {
      continueBtn.id = 'continue-btn';
      continueBtn.removeAttribute('href');
      continueBtn.tagName !== 'BUTTON' && continueBtn.setAttribute('role', 'button');
      continueBtn.addEventListener('click', (e) => {
        e.preventDefault();
        form.requestSubmit();
      });
    }

    form.addEventListener('submit', (e) => handleStep1Submit(e, session));
  }
});

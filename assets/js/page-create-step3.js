/**
 * Rwanda Academic Hub — Create Event Step 3 (Publish) Script
 *
 * - Guards auth + draft continuity
 * - Collects tags (from the existing tag-input widget in main.js)
 * - Publishes the event (status → 'published')
 * - Redirects to the new event's detail page on success
 */

import { requireAuth } from '../../assets/js/auth.js';
import { publishEvent } from '../../assets/js/events-api.js';

document.addEventListener('DOMContentLoaded', async () => {
  const session = await requireAuth();
  if (!session) return;

  const draftId = localStorage.getItem('rah_draft_event_id');
  if (!draftId) {
    window.location.href = 'step-1.html';
    return;
  }

  // Wire the Publish button
  const publishBtn = document.getElementById('publish-btn');
  const saveDraftBtn = document.getElementById('save-draft-btn');

  if (publishBtn) {
    publishBtn.addEventListener('click', async (e) => {
      e.preventDefault();

      // Collect tags from the chip list built by main.js
      const tags = Array.from(
        document.querySelectorAll('#tagList [data-tag]')
      ).map((el) => el.getAttribute('data-tag'));

      publishBtn.disabled = true;
      publishBtn.textContent = 'Publishing…';

      const { data, error } = await publishEvent({ tags });

      if (error) {
        showError('Failed to publish: ' + error.message);
        publishBtn.disabled = false;
        publishBtn.textContent = 'Publish Event';
        return;
      }

      // Redirect to the newly published event detail page
      window.location.href = `../event-detail.html?slug=${data.slug}`;
    });
  }

  if (saveDraftBtn) {
    saveDraftBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      // Draft is already saved — just navigate away
      saveDraftBtn.textContent = 'Saved ✓';
      setTimeout(() => {
        window.location.href = '../../dashboards/organizer.html';
      }, 800);
    });
  }
});

function showError(msg) {
  let el = document.getElementById('step3-error');
  if (!el) {
    el = document.createElement('div');
    el.id = 'step3-error';
    el.className =
      'flex items-center gap-2 bg-error-container text-on-error-container ' +
      'rounded-lg px-4 py-3 my-4 font-body-sm text-body-sm';
    document.querySelector('main')?.prepend(el);
  }
  el.innerHTML = `<span class="material-symbols-outlined text-[18px]">error</span>${msg}`;
}

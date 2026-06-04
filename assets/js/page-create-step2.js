/**
 * Rwanda Academic Hub — Create Event Step 2 (Media) Script
 *
 * - Guards: requires auth + draft event ID from Step 1
 * - Uploads banner image to Supabase Storage when user picks/drops a file
 * - Saves banner URL to the draft event row
 * - "Continue" navigates to Step 3
 */

import { requireAuth } from '../../assets/js/auth.js';
import { uploadEventBanner, saveDraftStep2 } from '../../assets/js/events-api.js';

document.addEventListener('DOMContentLoaded', async () => {
  const session = await requireAuth();
  if (!session) return;

  const draftId = localStorage.getItem('rah_draft_event_id');
  if (!draftId) {
    // No draft — send user back to step 1
    window.location.href = 'step-1.html';
    return;
  }

  let uploadedBannerUrl = null;

  // Hook into the existing drag-and-drop zone (wired by main.js)
  // After main.js previews the image, we also upload to Storage.
  const bannerZone = document.querySelector('[data-upload-zone="banner"]');
  if (bannerZone) {
    const fileInput = bannerZone.querySelector('input[type=file]');
    if (fileInput) {
      fileInput.addEventListener('change', async () => {
        const file = fileInput.files[0];
        if (!file) return;

        showUploadStatus('Uploading…');
        const { url, error } = await uploadEventBanner(file, draftId);

        if (error) {
          showUploadStatus('Upload failed: ' + error.message, true);
          return;
        }

        uploadedBannerUrl = url;

        // Save URL to draft
        await saveDraftStep2(url);
        showUploadStatus('Image uploaded ✓');
      });
    }
  }

  // Wire "Continue" button → save (if any) then navigate to step 3
  const continueLink = document.querySelector('a[href="step-3-publish.html"]');
  if (continueLink) {
    continueLink.addEventListener('click', async (e) => {
      e.preventDefault();
      // Banner is optional — continue regardless
      window.location.href = 'step-3-publish.html';
    });
  }
});

function showUploadStatus(msg, isError = false) {
  let el = document.getElementById('upload-status');
  if (!el) {
    el = document.createElement('p');
    el.id = 'upload-status';
    el.className = 'mt-2 font-body-sm text-body-sm';
    const zone = document.querySelector('[data-upload-zone="banner"]');
    zone?.parentElement?.appendChild(el);
  }
  el.textContent = msg;
  el.className = `mt-2 font-body-sm text-body-sm ${isError ? 'text-error' : 'text-forest-mid'}`;
}

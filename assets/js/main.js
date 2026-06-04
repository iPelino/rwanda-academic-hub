/**
 * Rwanda Academic Hub — main.js
 *
 * Modules:
 *  1. Password visibility toggle
 *  2. Mobile nav menu
 *  3. Profile tab switching
 *  4. Tag input (step-3)
 *  5. Drag-and-drop upload zones (step-2)
 *  6. Attendee role filter
 *  7. Bookmark toggle
 *  8. Scroll fade-in (IntersectionObserver)
 */

(function () {
  'use strict';

  /* ============================================================
     1. PASSWORD TOGGLE
     Wire: <button data-toggle-password="<inputId>">
           <span class="material-symbols-outlined">visibility_off</span>
        </button>
     ============================================================ */
  document.querySelectorAll('[data-toggle-password]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var inputId = btn.getAttribute('data-toggle-password');
      var input = document.getElementById(inputId);
      var icon = btn.querySelector('.material-symbols-outlined');
      if (!input || !icon) return;

      if (input.type === 'password') {
        input.type = 'text';
        icon.textContent = 'visibility';
      } else {
        input.type = 'password';
        icon.textContent = 'visibility_off';
      }
    });
  });

  /* ============================================================
     2. MOBILE MENU
     Wire: <button id="mobile-menu-toggle"> (hamburger)
           <div id="mobile-menu"> (overlay)
           <button data-close-menu> (close / nav links inside)
     ============================================================ */
  var menuToggle = document.getElementById('mobile-menu-toggle');
  var mobileMenu = document.getElementById('mobile-menu');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function () {
      mobileMenu.classList.toggle('is-open');
      var isOpen = mobileMenu.classList.contains('is-open');
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on backdrop click (clicking the menu bg itself)
    mobileMenu.addEventListener('click', function (e) {
      if (e.target === mobileMenu) {
        mobileMenu.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });

    // Close when a nav link or close button is clicked
    mobileMenu.querySelectorAll('[data-close-menu]').forEach(function (el) {
      el.addEventListener('click', function () {
        mobileMenu.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ============================================================
     3. TAB SWITCHING — University Profile
     Wire: <button data-tab="<panelId suffix>"> e.g. data-tab="upcoming"
           <div id="tab-panel-upcoming">   (panel)
           <div id="tab-panel-past" hidden>
           <div id="tab-panel-about" hidden>
     ============================================================ */
  var tabButtons = Array.from(document.querySelectorAll('[data-tab]'));

  if (tabButtons.length) {
    // Active tab classes derived from the first (already-active) button
    var ACTIVE_CLASSES = [
      'border-forest-mid',
      'text-text-primary',
      'font-headline-sm',
      'text-headline-sm',
    ];
    var INACTIVE_CLASSES = [
      'border-transparent',
      'text-text-secondary',
      'font-body-base',
      'text-body-base',
    ];

    function activateTab(btn) {
      // Reset all buttons
      tabButtons.forEach(function (b) {
        ACTIVE_CLASSES.forEach(function (c) {
          b.classList.remove(c);
        });
        INACTIVE_CLASSES.forEach(function (c) {
          b.classList.add(c);
        });
      });

      // Hide all panels
      document.querySelectorAll('[id^="tab-panel-"]').forEach(function (panel) {
        panel.hidden = true;
      });

      // Activate clicked button
      INACTIVE_CLASSES.forEach(function (c) {
        btn.classList.remove(c);
      });
      ACTIVE_CLASSES.forEach(function (c) {
        btn.classList.add(c);
      });

      // Show matching panel
      var panelId = 'tab-panel-' + btn.getAttribute('data-tab');
      var panel = document.getElementById(panelId);
      if (panel) panel.hidden = false;
    }

    tabButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        activateTab(btn);
      });
    });
  }

  /* ============================================================
     4. TAG INPUT — Step 3 Publish
     Wire: <div id="tagList">   (existing tag chips)
           <input id="tagInput" ...>
     Max 5 tags. Press Enter or comma to add.
     ============================================================ */
  var tagInput = document.getElementById('tagInput');
  var tagList = document.getElementById('tagList');

  if (tagInput && tagList) {
    var MAX_TAGS = 5;

    function countTags() {
      return tagList.querySelectorAll('[data-tag]').length;
    }

    function addTag(value) {
      var val = value.trim().replace(/,$/, '');
      if (!val || countTags() >= MAX_TAGS) return;

      // Prevent duplicates
      var existing = Array.from(tagList.querySelectorAll('[data-tag]')).map(
        function (el) {
          return el.getAttribute('data-tag').toLowerCase();
        },
      );
      if (existing.includes(val.toLowerCase())) return;

      var chip = document.createElement('span');
      chip.setAttribute('data-tag', val);
      chip.className =
        'inline-flex items-center gap-1 px-3 py-1 bg-sage-dim text-forest-mid rounded-full font-body-sm text-body-sm';
      chip.innerHTML =
        val +
        ' <button type="button" class="text-forest-mid hover:text-primary">' +
        '<span class="material-symbols-outlined text-[16px]">close</span>' +
        '</button>';
      chip.querySelector('button').addEventListener('click', function () {
        chip.remove();
      });
      tagList.appendChild(chip);
    }

    tagInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ',') {
        e.preventDefault();
        addTag(tagInput.value);
        tagInput.value = '';
      }
    });

    // Wire existing pre-rendered remove buttons
    tagList.querySelectorAll('button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var chip = btn.closest('[data-tag]') || btn.closest('span');
        if (chip) chip.remove();
      });
    });
  }

  /* ============================================================
     5. DRAG-AND-DROP UPLOAD ZONES — Step 2 Media
     Wire: <div data-upload-zone="banner"> (or "thumbnail")
     Clicking the zone opens a file picker.
     Dropping an image previews it inline.
     ============================================================ */
  document.querySelectorAll('[data-upload-zone]').forEach(function (zone) {
    // Create hidden file input
    var input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.className = 'sr-only';
    input.setAttribute(
      'aria-label',
      'Upload ' + zone.getAttribute('data-upload-zone') + ' image',
    );
    zone.appendChild(input);

    // Click → open picker
    zone.addEventListener('click', function (e) {
      if (e.target !== input) input.click();
    });

    // Drag over
    zone.addEventListener('dragover', function (e) {
      e.preventDefault();
      zone.classList.add('drag-over');
    });

    zone.addEventListener('dragleave', function (e) {
      if (!zone.contains(e.relatedTarget)) {
        zone.classList.remove('drag-over');
      }
    });

    zone.addEventListener('drop', function (e) {
      e.preventDefault();
      zone.classList.remove('drag-over');
      var file = e.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) {
        previewUpload(zone, file);
      }
    });

    input.addEventListener('change', function () {
      if (input.files[0]) previewUpload(zone, input.files[0]);
    });
  });

  function previewUpload(zone, file) {
    var reader = new FileReader();
    reader.onload = function (e) {
      // Show image as background
      zone.style.backgroundImage = 'url(' + e.target.result + ')';
      zone.style.backgroundSize = 'cover';
      zone.style.backgroundPosition = 'center';
      // Hide upload prompt content
      var prompt = zone.querySelector('.upload-prompt');
      if (prompt) prompt.style.display = 'none';
      // Show file name
      var nameEl = zone.querySelector('.upload-filename');
      if (!nameEl) {
        nameEl = document.createElement('span');
        nameEl.className =
          'upload-filename absolute bottom-2 left-2 text-xs text-white bg-black/50 rounded px-2 py-0.5';
        zone.style.position = 'relative';
        zone.appendChild(nameEl);
      }
      nameEl.textContent = file.name;
    };
    reader.readAsDataURL(file);
  }

  /* ============================================================
     6. ATTENDEE ROLE FILTER
     Wire: <select id="roleFilter">
           <tr data-role="Faculty"> (and Student, Alumni)
     ============================================================ */
  var roleFilter = document.getElementById('roleFilter');

  if (roleFilter) {
    roleFilter.addEventListener('change', function () {
      var selected = roleFilter.value;
      document.querySelectorAll('tr[data-role]').forEach(function (row) {
        row.hidden =
          selected !== 'All Roles' &&
          row.getAttribute('data-role') !== selected;
      });
    });
  }

  /* ============================================================
     7. BOOKMARK TOGGLE — intentionally removed.
     Bookmarks are now persisted to Supabase by the per-page scripts
     (see interactions.js `toggleBookmark` + page-index/page-event-detail).
     A purely-visual toggle here would shadow those real handlers and
     mislead users into thinking a save succeeded when it did not.
     ============================================================ */

  /* ============================================================
     8. SCROLL FADE-IN (IntersectionObserver)
     Wire: add class="fade-in-up" to any element to animate
     it once it enters the viewport.
     ============================================================ */
  if ('IntersectionObserver' in window) {
    var fadeObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            fadeObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    document.querySelectorAll('.fade-in-up').forEach(function (el) {
      fadeObserver.observe(el);
    });
  }
})();

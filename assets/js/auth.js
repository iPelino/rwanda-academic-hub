/**
 * Rwanda Academic Hub — Auth Module
 *
 * Handles:
 *   - Email/password sign-up (with profile creation)
 *   - Email/password sign-in
 *   - Google OAuth
 *   - Sign-out
 *   - Session guard (redirect unauthenticated users)
 *   - Auth state listener (updates nav UI)
 *
 * Usage: <script type="module" src="/assets/js/auth.js"></script>
 */

import { supabase } from './supabase-client.js';

/* ------------------------------------------------------------------ */
/*  UI HELPERS                                                          */
/* ------------------------------------------------------------------ */

/**
 * Show an error banner above a form.
 * @param {string} containerId - The element id of the form container.
 * @param {string} message     - Human-readable error text.
 */
function showError(containerId, message) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Remove any existing banner
  container.querySelector('.auth-error-banner')?.remove();

  const banner = document.createElement('div');
  banner.className =
    'auth-error-banner flex items-center gap-3 bg-error-container text-on-error-container ' +
    'border border-[#93000a]/30 rounded-lg px-4 py-3 mb-6 font-body-sm text-body-sm';
  banner.innerHTML = `
    <span class="material-symbols-outlined text-[18px] shrink-0">error</span>
    <span>${message}</span>`;
  container.prepend(banner);
}

/**
 * Show a success/info banner above a form.
 */
function showSuccess(containerId, message) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.querySelector('.auth-error-banner')?.remove();
  container.querySelector('.auth-success-banner')?.remove();

  const banner = document.createElement('div');
  banner.className =
    'auth-success-banner flex items-center gap-3 bg-sage-dim text-forest-mid ' +
    'border border-forest-mid/30 rounded-lg px-4 py-3 mb-6 font-body-sm text-body-sm';
  banner.innerHTML = `
    <span class="material-symbols-outlined text-[18px] shrink-0">check_circle</span>
    <span>${message}</span>`;
  container.prepend(banner);
}

function setLoading(btn, loading) {
  if (!btn) return;
  btn.disabled = loading;
  btn.dataset.originalText = btn.dataset.originalText ?? btn.textContent.trim();
  btn.textContent = loading ? 'Please wait…' : btn.dataset.originalText;
}

/* ------------------------------------------------------------------ */
/*  SIGN-UP                                                             */
/* ------------------------------------------------------------------ */

async function handleSignUp(e) {
  e.preventDefault();
  const form   = e.target;
  const btn    = form.querySelector('[type=submit]');
  const formId = 'signup-form-container';

  const fullName    = form.fullName?.value.trim();
  const email       = form.email?.value.trim();
  const password    = form.password?.value;
  const university  = form.university?.value;
  const academicRole = form.role?.value ?? 'student';

  // Basic client-side validation
  if (!fullName || !email || !password || !university) {
    showError(formId, 'Please fill in all required fields.');
    return;
  }
  if (password.length < 8) {
    showError(formId, 'Password must be at least 8 characters.');
    return;
  }

  setLoading(btn, true);

  // 1. Look up university by slug/id to get the uuid
  const { data: uniRow } = await supabase
    .from('universities')
    .select('id')
    .eq('slug', university)
    .maybeSingle();

  // 2. Create auth user
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        academic_role: academicRole,
        university_id: uniRow?.id ?? null,
      },
    },
  });

  if (error) {
    showError(formId, error.message);
    setLoading(btn, false);
    return;
  }

  // 3. If the user was created (email confirm may or may not be required),
  //    insert/upsert the public profile row.
  if (data.user) {
    await supabase.from('user_profiles').upsert({
      id:            data.user.id,
      full_name:     fullName,
      university_id: uniRow?.id ?? null,
      academic_role: academicRole,
      role:          'attendee',
    }, { onConflict: 'id' });
  }

  const needsConfirm = !data.session; // email confirmation required
  if (needsConfirm) {
    showSuccess(
      formId,
      'Account created! Please check your email and click the confirmation link.',
    );
    form.reset();
  } else {
    // Auto-confirmed — go straight to dashboard
    window.location.href = '/index.html';
  }

  setLoading(btn, false);
}

/* ------------------------------------------------------------------ */
/*  SIGN-IN                                                             */
/* ------------------------------------------------------------------ */

async function handleSignIn(e) {
  e.preventDefault();
  const form   = e.target;
  const btn    = form.querySelector('[type=submit]');
  const formId = 'signin-form-container';

  const email    = form.email?.value.trim();
  const password = form.password?.value;

  if (!email || !password) {
    showError(formId, 'Please enter your email and password.');
    return;
  }

  setLoading(btn, true);

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    showError(formId, error.message);
    setLoading(btn, false);
    return;
  }

  // Successful — redirect to homepage / dashboard
  const next = new URLSearchParams(window.location.search).get('next');
  window.location.href = next ?? '/index.html';
}

/* ------------------------------------------------------------------ */
/*  GOOGLE OAUTH                                                        */
/* ------------------------------------------------------------------ */

async function handleGoogleSignIn() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/pages/auth/oauth-callback.html`,
      queryParams: { prompt: 'select_account' },
    },
  });
  if (error) console.error('[Auth] Google OAuth error:', error.message);
}

/* ------------------------------------------------------------------ */
/*  SIGN-OUT                                                            */
/* ------------------------------------------------------------------ */

export async function signOut() {
  await supabase.auth.signOut();
  window.location.href = '/pages/auth/sign-in.html';
}

/* ------------------------------------------------------------------ */
/*  SESSION GUARD — call on protected pages                            */
/*  Redirects unauthenticated users to sign-in.                        */
/* ------------------------------------------------------------------ */

export async function requireAuth() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    const current = encodeURIComponent(window.location.pathname);
    window.location.href = `/pages/auth/sign-in.html?next=${current}`;
    return null;
  }
  return session;
}

/* ------------------------------------------------------------------ */
/*  CURRENT USER helper                                                 */
/* ------------------------------------------------------------------ */

export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export async function getCurrentProfile() {
  const user = await getCurrentUser();
  if (!user) return null;

  const { data } = await supabase
    .from('user_profiles')
    .select('*, universities(name, short_name, slug)')
    .eq('id', user.id)
    .single();

  return data;
}

/* ------------------------------------------------------------------ */
/*  NAV UI — update sign-in / avatar based on session                 */
/* ------------------------------------------------------------------ */

function updateNavUI(session) {
  const guestEl  = document.getElementById('nav-guest-actions');
  const userEl   = document.getElementById('nav-user-actions');
  const avatarEl = document.getElementById('nav-user-avatar');

  if (!guestEl && !userEl) return;

  if (session) {
    guestEl?.classList.add('hidden');
    userEl?.classList.remove('hidden');
    if (avatarEl) {
      const meta = session.user.user_metadata;
      avatarEl.textContent = meta?.full_name?.[0]?.toUpperCase() ?? '?';
    }
  } else {
    guestEl?.classList.remove('hidden');
    userEl?.classList.add('hidden');
  }
}

/* ------------------------------------------------------------------ */
/*  WIRE FORMS on DOMContentLoaded                                     */
/* ------------------------------------------------------------------ */

document.addEventListener('DOMContentLoaded', async () => {
  // Listen for auth changes and update nav
  supabase.auth.onAuthStateChange((_event, session) => {
    updateNavUI(session);
  });

  // Also run once on load (cached session)
  const { data: { session } } = await supabase.auth.getSession();
  updateNavUI(session);

  // --- SIGN-IN FORM ---
  const signInForm = document.getElementById('sign-in-form');
  if (signInForm) {
    signInForm.addEventListener('submit', handleSignIn);
  }

  // --- SIGN-UP FORM ---
  const signUpForm = document.getElementById('sign-up-form');
  if (signUpForm) {
    // Populate university dropdown from DB
    await populateUniversityDropdown('university');
    signUpForm.addEventListener('submit', handleSignUp);
  }

  // --- GOOGLE BUTTONS ---
  document.querySelectorAll('[data-google-signin]').forEach((btn) => {
    btn.addEventListener('click', handleGoogleSignIn);
  });

  // --- SIGN-OUT BUTTONS ---
  document.querySelectorAll('[data-signout]').forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      await signOut();
    });
  });
});

/* ------------------------------------------------------------------ */
/*  UTILITY — Populate a <select> with all universities from DB        */
/* ------------------------------------------------------------------ */

export async function populateUniversityDropdown(selectId) {
  const select = document.getElementById(selectId);
  if (!select) return;

  const { data: universities, error } = await supabase
    .from('universities')
    .select('id, name, short_name, slug')
    .eq('verification_status', 'verified')
    .order('name');

  if (error || !universities) return;

  // Clear existing static options (keep the placeholder)
  const placeholder = select.querySelector('option[disabled]');
  select.innerHTML = '';
  if (placeholder) select.appendChild(placeholder);

  universities.forEach((uni) => {
    const opt = document.createElement('option');
    opt.value = uni.slug;
    opt.textContent = uni.short_name
      ? `${uni.name} (${uni.short_name})`
      : uni.name;
    select.appendChild(opt);
  });
}

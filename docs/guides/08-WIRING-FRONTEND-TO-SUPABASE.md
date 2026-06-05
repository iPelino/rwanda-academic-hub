# Phase 8 — Wiring Frontend to Backend
## Connecting Your Pages to Your Live Supabase Database

> **Phase goal:** Connect your static HTML frontend to your Supabase backend — implementing real authentication, fetching live data from the database, and enabling users to create, save, and interact with content.
>
> **Why this matters:** This is the phase where your app becomes real. Until now, your pages showed hardcoded, fake data. After this phase, users can sign up, sign in, see real content, and save their own data. This is the most technically complex phase — but with AI and Supabase MCP, you'll do it systematically and safely.

---

## The Architecture You're Building

```
Your Browser (HTML/JS)
       │
       │  Supabase JS SDK (loaded via CDN)
       ▼
Supabase Backend
   ├── Auth (manages user sessions)
   ├── PostgREST API (auto-generated queries)
   └── PostgreSQL DB (your tables)
```

**How it works:**
1. Your HTML pages load JavaScript files
2. Those JS files use the Supabase SDK to talk to your database
3. The SDK sends HTTP requests to Supabase's auto-generated API
4. Supabase applies your Row Level Security rules and returns data
5. Your JavaScript puts the data into the HTML for users to see

---

## Understanding Key Concepts Before You Start

### The Anon Key vs Service Role Key

**Anon Key (public):** Safe to use in frontend JavaScript. Supabase's Row Level Security policies control what this key can access. It's designed to be public.

**Service Role Key (secret):** Bypasses all RLS policies. Never use this in frontend code. It belongs only on servers (never in a browser).

**Rule:** Only ever use the anon key in your frontend JavaScript.

### Row Level Security (RLS)

RLS is a PostgreSQL feature that controls who can read or write data at the database level. Think of it as database-level permissions:

- "Anyone can read published events" → public reads events table
- "Only the organizer who created an event can edit it" → organizer writes their own events
- "Only authenticated users can RSVP" → auth required for rsvps table

Your schema from Phase 7 already has RLS policies defined. Your frontend code automatically respects them when it uses the anon key.

### The Supabase JS SDK

The Supabase JavaScript SDK is a library that makes it easy to talk to your Supabase backend from browser JavaScript. You load it via CDN (no installation needed).

---

## Step 1 — Set Up the Supabase Client

The first thing to create is a shared Supabase client — a single connection object used by all your pages.

### Create `assets/js/supabase-client.js`

Ask your AI to create this file using the Supabase MCP:

```
[T]ask: Create assets/js/supabase-client.js — a singleton Supabase client for [APP NAME].
You are a Senior Full-Stack Engineer specializing in Supabase and modular Vanilla JS.
Output: ES module, one named export, no other exports.

[C]ontext: Frontend is static HTML with vanilla JS, no build tools.
Supabase SDK loaded via CDN: https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm
Project URL: [YOUR-SUPABASE-URL]. Anon key: [YOUR-ANON-KEY].
Never hardcode the service role key — anon key only.

[R]eferences:
- export const supabase = createClient(URL, KEY, options)
- Auth options: persistSession: true, autoRefreshToken: true, detectSessionInUrl: true
- Sessions must persist in localStorage so users stay logged in across page navigations
```

**The file should look like this:**

```javascript
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL  = 'https://your-project-ref.supabase.co';
const SUPABASE_ANON = 'your-anon-key-here';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
```

---

## Step 2 — Implement Authentication

This is the most important step — get auth working before anything else. Every other feature depends on knowing whether a user is logged in.

### Create `assets/js/auth.js`

```
[T]ask: Create assets/js/auth.js — the authentication module for [APP NAME].
You are a Senior Full-Stack Engineer specializing in Supabase Auth and vanilla JS.
Output: ES module, guards every DOM selector with a null check.

[C]ontext: Frontend is static HTML/vanilla JS. Supabase Auth handles all user management.
Wire sign-in.html form (id="sign-in-form", errors in id="sign-in-error") and
sign-up.html form (id="sign-up-form", errors in id="sign-up-error").
Redirect to / on successful sign-in or sign-up.

[R]eferences:
- signIn(email, password): supabase.auth.signInWithPassword() → redirect / on success
- signUp(data): supabase.auth.signUp() with email, password, options.data for metadata
- signOut(): supabase.auth.signOut() → redirect /
- getSession(): returns current session or null
- onAuthStateChange listener: id="nav-sign-in" (show if logged out), id="nav-user-menu"
  (show if logged in), id="nav-user-name" (set to display name or email)
- Google OAuth: supabase.auth.signInWithOAuth({ provider: 'google',
  options: { redirectTo: window.location.origin } })
- Import supabase from ./supabase-client.js
```

### Add the Auth Script to Your Pages

At the bottom of your sign-in.html, add:

```html
<script type="module" src="/assets/js/auth.js"></script>
```

At the bottom of your sign-up.html, add the same line.

### Test Authentication

1. Open your sign-up page in the browser
2. Create a test account with a real email you have access to
3. Check your Supabase dashboard: **Authentication → Users** — your user should appear
4. Try signing in with that account
5. Try signing out

If any step fails, check the browser console (F12 → Console tab) for error messages.

---

## Step 3 — Enable Google OAuth (Optional but Recommended)

Supabase makes Google login easy. This gives users a one-click sign-in option.

### Configure Google OAuth in Supabase

1. Go to your Supabase project → **Authentication → Providers**
2. Find **Google** in the list and click to expand
3. Enable the Google provider
4. You'll need Google OAuth credentials:
   - Go to [console.cloud.google.com](https://console.cloud.google.com)
   - Create a new project (or use an existing one)
   - Go to **APIs & Services → OAuth consent screen** → configure as External
   - Go to **APIs & Services → Credentials → Create Credentials → OAuth Client ID**
   - Application type: Web application
   - Authorized redirect URIs: add `https://your-project-ref.supabase.co/auth/v1/callback`
   - Copy the Client ID and Client Secret
5. Back in Supabase, paste your Google Client ID and Secret
6. Save

### Create an OAuth Callback Page

Create `pages/auth/oauth-callback.html` — this handles the redirect after Google login:

```html
<!DOCTYPE html>
<html>
<head><title>Signing in...</title></head>
<body>
  <p>Completing sign in...</p>
  <script type="module">
    import { supabase } from '/assets/js/supabase-client.js';
    const { data, error } = await supabase.auth.exchangeCodeForSession(
      window.location.search
    );
    window.location.href = error ? '/pages/auth/sign-in.html' : '/';
  </script>
</body>
</html>
```

In Supabase: **Authentication → URL Configuration**, add your site URL and this redirect URL.

---

## Step 4 — Create the Data API Layer

Now create JavaScript modules that fetch data from your database.

### Create `assets/js/[content]-api.js`

Name this file after your main content type (e.g., `events-api.js`, `jobs-api.js`, `listings-api.js`).

```
[T]ask: Create assets/js/[CONTENT]-api.js — the data module for [APP NAME]'s
[CONTENT TYPE] table. You are a Senior Full-Stack Engineer specializing in
Supabase and RLS-aware data fetching in vanilla JS.
Output: ES module, all functions async returning { data, error }.

[C]ontext: Frontend is static HTML/vanilla JS. Supabase SDK loaded via CDN.
Table: [TABLE NAME] with columns: [LIST KEY COLUMNS].
RLS active: public reads published rows; authenticated users create their own.
Filter by status = 'published' in all public list queries. Never use service role key.

[R]eferences:
- fetch[ContentList]({ category, city, limit = 20, offset = 0 }):
  .from('[TABLE]').select('[COLUMNS]').eq('status','published') + filters
- fetch[ContentItem](id_or_slug): single item with related data
  e.g. .select('*, organizers(*), categories(*)')
- create[Content](data): insert new row (auth required)
- update[Content](id, data): update row user owns
- delete[Content](id): delete row user owns
- Support pagination via limit and offset on list queries
- Import supabase from ./supabase-client.js
```

### Rwanda Academic Hub Example — events-api.js structure

For reference, the Rwanda Academic Hub `events-api.js` exports these functions:

- `getPublishedEvents({ categoryId, cityId, limit, offset })` — homepage feed
- `getEventBySlug(slug)` — event detail page (also increments view count)
- `getEventsByOrganizer(organizerId)` — organizer's event list
- `createEvent(data)` — create a new event (auth required)
- `updateEvent(id, data)` — edit an event (organizer only)
- `getEventAttendees(eventId)` — attendee list (organizer only)
- `rsvpToEvent(eventId, status)` — RSVP/bookmark an event

---

## Step 5 — Wire the Homepage

With the API module ready, connect the homepage to show real events:

```
[T]ask: Create assets/js/page-index.js — the homepage script for [APP NAME]
that fetches and renders real [CONTENT] from Supabase into the page.
You are a Senior Full-Stack Engineer specializing in Supabase and DOM rendering.
Output: ES module linked via <script type="module"> in index.html.

[C]ontext: index.html has id="[CONTENT]-grid" (card container),
data-filter="[category]" chips, and id="search-input".
Handle 3 states: loading (skeleton cards), empty ("No [content] found"), and error (friendly message).

[R]eferences:
- On load: call fetch[Content]() → render cards; show 3 skeleton cards while fetching
- Each card: [LIST CARD FIELDS WITH DATA COLUMN NAMES]
- Filter chip click: re-fetch with selected category
- Search (300ms debounce via setTimeout): re-fetch with search term
- Skeleton cards removed before real cards inserted
- Import fetch[Content] from ./[content]-api.js
- Import supabase from ./supabase-client.js
```

Add the script to `index.html`:
```html
<script type="module" src="/assets/js/page-index.js"></script>
```

---

## Step 6 — Wire Authentication Pages

Add the auth module to your sign-in and sign-up pages. Check that:

1. The form `id` in your HTML matches what `auth.js` is selecting
2. The error div `id` in your HTML matches what `auth.js` writes to
3. The redirect URL after login goes to a real page

**Common issue:** Your Stitch-generated HTML may have different IDs than what auth.js expects. Either update the HTML or update auth.js — either is fine.

---

## Step 7 — Wire User-Specific Features

Once auth is working, enable features that require a logged-in user:

### Bookmarks / Save Feature

```
Add bookmark functionality to index.html and [CONTENT-DETAIL].html.

When a user clicks a bookmark button (data-bookmark attribute on a button
near a [CONTENT] card or detail page):
1. If the user is not logged in: redirect them to pages/auth/sign-in.html
2. If the user is logged in:
   - Check if this [CONTENT] is already saved
   - If saved: remove the save (unsave) and update the icon to outlined
   - If not saved: insert the save and update the icon to filled
3. Update the save_count display if one exists on the page

Use the saved_[content] table in Supabase.
Handle errors gracefully (show a brief toast notification on failure).
```

### RSVP Feature

```
Add RSVP functionality to [CONTENT-DETAIL].html.

The RSVP button (data-rsvp attribute) should:
1. If not logged in: redirect to sign-in
2. If logged in and no existing RSVP: insert a new RSVP with status 'interested'
3. If logged in with existing RSVP: cycle through states
   (interested → confirmed → cancelled) or show a dropdown with options
4. Update the RSVP count display on the page
5. Update the button label to reflect current RSVP state
```

---

## Step 8 — Wire Content Creation Forms

If your app has a form for creating content (posting an event, listing a job, etc.):

```
[T]ask: Wire [pages/events/create/step-1.html] to Supabase so authenticated
[organizers | employers | users] can create new [CONTENT].
You are a Senior Full-Stack Engineer handling multi-step form submission with Supabase.
Output: ES module; final submit calls create[Content](data) and redirects to detail page.

[C]ontext: Form has [X] steps (or single form). Fields: [LIST FIELDS AND INPUT IDs].
On success: redirect to /pages/[content]/[new-item-slug].html.
On failure: show Supabase error message inline in the form.

[R]eferences:
- Each step validates required fields before advancing to "Next"
- Draft data stored in sessionStorage between steps (preserves if user navigates back)
- Final step collects all draft data and calls create[Content](data)
- Submit button: show loading spinner while pending; disable to prevent double-submission
- Import create[Content] from ./[content]-api.js
```

---

## Step 9 — Iterate and Test Thoroughly

Work through each feature methodically:

1. **Test as a logged-out user** — what can they see and do?
2. **Test as a logged-in user** — can they do everything they should?
3. **Test error cases** — wrong password, empty search, etc.
4. **Test with real data** — does the page look right with actual content?

**Checking the browser console is essential.** Press F12 → Console tab. Any red errors need to be fixed.

**Common issues and fixes:**

| Issue | Likely Cause | Fix |
|-------|-------------|-----|
| "Failed to fetch" | Supabase URL wrong | Check supabase-client.js URL |
| "Invalid API key" | Anon key wrong or expired | Copy fresh anon key from Supabase |
| Data loads but nothing shows | Card rendering bug | Check the grid container ID matches |
| User stays logged in after sign out | signOut not called | Check auth.js signOut function |
| RLS policy error | Policy blocks the query | Check Supabase → Authentication → Policies |

---

## Step 10 — Commit Frequently

After each working feature, commit:

```bash
git add .
git commit -m "feat: wire homepage to Supabase event feed"
git push
```

```bash
git add .
git commit -m "feat: implement sign-in, sign-up, and auth state"
git push
```

```bash
git add .
git commit -m "feat: add bookmark and RSVP functionality"
git push
```

---

## Checklist — You Are Ready to Move to Phase 9 When:

- [ ] Users can sign up and receive a verification email
- [ ] Users can sign in and the navbar updates to show their name
- [ ] Users can sign out and the navbar reverts to showing "Sign In"
- [ ] The homepage shows real data from your Supabase database
- [ ] At least one content detail page shows real data
- [ ] At least one user action (bookmark, RSVP, save) persists to the database
- [ ] The app doesn't show raw JavaScript errors in the browser console
- [ ] All progress is committed to Git and pushed to GitHub

---

*Next: [Phase 9 — Deploying with Netlify MCP](09-DEPLOYING-WITH-NETLIFY.md)*

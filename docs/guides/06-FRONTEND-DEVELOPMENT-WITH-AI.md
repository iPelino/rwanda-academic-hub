# Phase 6 — Frontend Development with AI
## Building Your App's Pages and Interactivity with AI Assistance

> **Phase goal:** Use AI to build all the HTML pages and JavaScript interactivity your app needs — working systematically from the design prototype toward production-ready frontend code.
>
> **Why this matters:** The Stitch export from Phase 3 gave you a visual prototype. Now you turn that into a real, complete frontend — proper pages with consistent structure, navigation, forms, and interactive behaviors. This is where your app starts to feel real.

---

## How Frontend Development with AI Works

The workflow is:

1. **Plan** — decide which page you're building and what it needs
2. **Prompt** — write a TCREI prompt describing the page precisely
3. **Generate** — let the AI build the page
4. **Review** — open it in a browser and check it against your design
5. **Iterate** — refine with follow-up prompts until it's right
6. **Commit** — save your progress to Git

You repeat this cycle for every page and feature. The key discipline is **one page at a time, one TCREI prompt at a time**.

---

## Understanding the Frontend Tech Stack

Your app's frontend uses these technologies:

### HTML (HyperText Markup Language)
The structure of your pages. It defines what elements exist on the page — headings, paragraphs, buttons, images, forms.

```html
<button class="btn-primary" data-rsvp>Save This Event</button>
```

### Tailwind CSS
A utility-first CSS framework that you apply directly in your HTML using class names. Instead of writing separate CSS rules, you style elements by adding classes.

```html
<!-- Without Tailwind -->
<button style="background: green; padding: 12px 24px; border-radius: 8px;">Save</button>

<!-- With Tailwind -->
<button class="bg-green-700 px-6 py-3 rounded-lg text-white">Save</button>
```

Tailwind is loaded via CDN in your HTML files:
```html
<script src="https://cdn.tailwindcss.com"></script>
```

### Vanilla JavaScript
JavaScript without any frameworks. It adds interactivity — clicking buttons, filtering lists, toggling menus, etc.

```javascript
document.querySelector('[data-bookmark]').addEventListener('click', () => {
  // Save the event when the bookmark button is clicked
});
```

---

## Step 1 — Audit What You Have From Stitch

Before building anything new, understand what Stitch already gave you.

Open each HTML file from your Stitch export and note:
- Which pages already exist
- What looks correct vs what needs improvement
- What pages are missing

Create a simple checklist:

```
Pages exported from Stitch:
✅ index.html — exists, looks mostly right, needs real event cards
✅ pages/auth/sign-in.html — exists, needs error states
❌ pages/events/event-detail.html — missing, need to build
❌ pages/dashboards/organizer.html — missing, need to build
✅ pages/auth/sign-up.html — exists, needs university dropdown
```

This becomes your build list for this phase.

---

## Step 2 — Build the Homepage First

The homepage is your most important page. Build it first, get it right, and use it as your reference for all other pages.

### TCREI Prompt for the Homepage

Fill in the brackets with your project details:

```
[T]ask: Build index.html — the homepage and primary discovery feed for
[YOUR APP NAME] as a standalone, fully-styled HTML file using Tailwind CSS via CDN.
You are a Senior Frontend Engineer with strong UI/UX instincts building
production-quality HTML/Tailwind pages.
Output: complete HTML file, Tailwind via CDN, no JavaScript, mobile-first.

[C]ontext: This is the platform's highest-traffic page — it must communicate
platform identity instantly. Primary color: [HEX]. Accent: [HEX]. Background: [HEX].
Font: [HEADING FONT] for display headings, [BODY FONT] for body (both from Google Fonts).
Use design tokens from docs/design.md. Icons: Material Symbols Outlined (Google Fonts CDN).
No JavaScript in this file — markup only.

[R]eferences:
- Hero section: platform name + tagline + [SEARCH BAR / CTA / FEATURED ITEM]
- Filter bar: [LIST YOUR CATEGORIES] as clickable pill chips with data-filter="[category]"
- [CONTENT] cards showing: [LIST CARD FIELDS — title, image, author, date, etc.]
- Featured section above the main grid
- Sticky nav with logo + links + [CTA BUTTON]; mobile menu button
  id="mobile-menu-toggle" opens div id="mobile-menu"
- Footer with links
- All bookmark/save icons have data-bookmark attribute
- Responsive: sm, md, lg breakpoints
```

### Rwanda Academic Hub Example (for reference)

```
[T]ask: Build index.html — the Rwanda Academic Hub homepage and primary
event discovery feed as a standalone, fully-styled HTML file using Tailwind CSS via CDN.
You are a Senior Frontend Engineer with strong UI/UX instincts.
Output: complete HTML, Tailwind via CDN, no JavaScript, mobile-first.

[C]ontext: Rwanda Academic Hub is a cross-university event discovery platform for Rwanda.
Primary #1A3D2B (forest green), accent #E8A020 (amber), background #F5F7F2 (sage-white).
DM Serif Display for display headings, Plus Jakarta Sans for body (both Google Fonts).
Icons: Material Symbols Outlined. Tailwind config in docs/design.md.
No JavaScript in this file — markup only.

[R]eferences:
- Hero: "Rwanda Academic Hub" wordmark, tagline "Discover academic events
  across Rwanda", prominent search bar, secondary filter pill row
- Filter bar: All | Workshop | Seminar | Hackathon | Career Fair | Research
  as pill chips with data-filter="[category]" attributes
- Event cards: banner thumbnail, color-coded category badge, event title,
  organizer name + verified checkmark icon, date + location,
  bookmark icon with data-bookmark attribute
- "Featured This Week" section above the main grid
- "Browse by University" quick-link row with university logos
- Mobile menu: button id="mobile-menu-toggle", menu div id="mobile-menu"
- Responsive: sm / md / lg breakpoints
```

---

## Step 3 — Build Authentication Pages

### Sign In Page

```
[T]ask: Build pages/auth/sign-in.html — the sign-in page for [APP NAME].
You are a Frontend Engineer specializing in accessible, conversion-optimized forms.
Output: standalone HTML file, Tailwind via CDN, no JavaScript.

[C]ontext: First identity interaction with the platform. Brand: [PRIMARY COLOR],
[ACCENT] hover, [BG COLOR] background. Links to pages/auth/sign-up.html.
No JavaScript in this file — structure only.

[R]eferences:
- Centered card (max 420px) on page background with app logo/wordmark at top
- Fields: Email + Password; Password has eye-icon toggle with data-toggle-password attribute
- Primary "Sign In" button in primary color
- Secondary "Continue with Google" outlined button
- Link: "Don't have an account? Sign up" → pages/auth/sign-up.html
- Error state: red left border + error message div below field
- All inputs must have matching <label> elements
- Password toggle: data-toggle-password="passwordInputId"
- Error containers: aria-describedby on input, role="alert" on error div
```

### Sign Up Page

```
[T]ask: Build pages/auth/sign-up.html — the registration page for [APP NAME].
You are a Frontend Engineer specializing in accessible, conversion-optimized forms.
Output: standalone HTML file, Tailwind via CDN, no JavaScript.

[C]ontext: Same brand as sign-in page. Collects:
[LIST YOUR FIELDS — e.g., Full Name, Email, Password, Confirm Password,
University Affiliation dropdown]. No JavaScript — structure only.

[R]eferences:
- Same centered card layout as sign-in for visual consistency
- Fields: [LIST YOUR FIELDS]
- [UNIVERSITY/CATEGORY] field: select dropdown with your options
- Primary "Create Account" button
- Link: "Already have an account? Sign in" → pages/auth/sign-in.html
- Same error state and accessibility requirements as sign-in page
- Confirm password field: data-confirm-password attribute for JS hookup
```

---

## Step 4 — Build Core Feature Pages

These are the pages that deliver your app's main value. The specific pages depend on your project.

**Common core feature pages:**

| App Type | Core Pages to Build |
|----------|-------------------|
| Event discovery | Event detail, organizer profile, create event form |
| Job board | Job detail, employer profile, post a job form |
| Marketplace | Item detail, seller profile, create listing form |
| Community | Post detail, user profile, create post form |

### TCREI Template for a Detail Page

```
[T]ask: Build [FILENAME] — the [ITEM TYPE] detail page for [APP NAME].
You are a Frontend Engineer designing editorial-quality detail pages.
Output: standalone HTML file, Tailwind via CDN, fully responsive.

[C]ontext: Users land here after clicking a [ITEM TYPE] card.
Must show: [LIST 4-5 KEY PIECES OF INFO]. This is the main SEO entry point
for each [ITEM TYPE]. Same brand and design tokens as other pages.
Sidebar collapses below main content on mobile.

[R]eferences:
- Full-width [BANNER IMAGE / COVER PHOTO] at top with [BADGE / OVERLAY]
- Two-column layout (desktop, 2fr 1fr): main content ([WHAT GOES HERE])
  + sticky sidebar ([ACTION BUTTON, KEY INFO, SHARE BUTTONS])
- [AUTHOR / HOST] card below main content: profile info + follow button
- "Related [ITEMS]" section at bottom (3 cards matching homepage card style)
- Primary CTA button ("[YOUR CTA TEXT]") in accent color with data-[action] attribute
- All interactive elements have data-* attributes for JS hookup
```

---

## Step 5 — Build Dashboard Pages

If your app has users who create or manage content (organizers, employers, sellers), they need a dashboard.

```
[T]ask: Build [FILENAME] — the [ROLE] dashboard for [APP NAME].
You are a Senior Frontend Engineer designing data-rich management interfaces.
Output: standalone HTML file, Tailwind via CDN, no JavaScript.

[C]ontext: Management center for [USER ROLE — organizers / employers / etc.].
They [DESCRIBE WHAT THEY DO: manage listings, view stats, etc.].
Same brand and design tokens as other pages.
Sidebar: persistent on desktop, collapsible on mobile.
No JavaScript — markup only.

[R]eferences:
- Sidebar nav on dark [PRIMARY COLOR] background with menu items:
  [LIST YOUR MENU ITEMS — Overview, My [Content], Create New, Analytics]
- Stats row: [LIST 3-4 KPI CARDS — Total Published, Total Views, Pending Drafts, Followers]
- Content table columns: [ITEM NAME], [STATUS BADGE], [DATE],
  Edit | Delete | View action buttons with data-edit, data-delete, data-view attributes
- Status badges: amber for draft, green for published, grey for past/archived
  (semantic colors — not random)
```

---

## Step 6 — Add JavaScript Interactivity

Once your HTML pages are built, you add the interactive behaviors. All your HTML already has `data-*` attributes on elements — now you write the JavaScript that reads those attributes and adds behavior.

**The golden rule for JavaScript in this project:** Write JavaScript in separate `.js` files, never inside the HTML. Link the JS file at the bottom of each HTML page.

### TCREI Prompt for the Main JS Module

```
[T]ask: Write assets/js/main.js — a single, well-commented vanilla JavaScript
IIFE that implements all interactive UI behaviors across [APP NAME]'s pages.
You are a Senior Vanilla JavaScript Engineer writing clean, modular,
accessible browser-native JavaScript.
Output: plain JS file, no frameworks, must work via <script> tag at bottom of <body>.

[C]ontext: All pages use static HTML with data-* attributes as hooks.
No frameworks — vanilla JS only. The file is linked at the bottom of each <body>.
Behaviors needed: [LIST ALL BEHAVIORS YOUR APP NEEDS]
Wrap everything in (function() { 'use strict'; ... })().
No jQuery, no ES modules syntax. Always null-check elements before using them.

[R]eferences:
- Mobile menu: button id="mobile-menu-toggle" adds class "is-open" to
  div id="mobile-menu" and sets body.style.overflow = "hidden"
- Filter chips: data-filter="[category]" buttons add class "active";
  hide cards whose data-category doesn't match the active filter
- Bookmark toggle: data-bookmark button toggles "bookmarked" CSS class
  and swaps icon between filled/outlined state
- Password toggle: data-toggle-password="inputId" button toggles input
  type between "password" and "text", swaps eye icon
- Tab switching: data-tab="[name]" buttons show/hide sections
  with matching data-tab-content="[name]"
- Each behavior in its own clearly-labelled comment block
- Update aria-pressed/aria-expanded on toggle buttons for accessibility
- Use document.querySelectorAll with data-* selectors — never class names
```

### Rwanda Academic Hub JavaScript Behaviors List

For reference, here are all the behaviors built for the Rwanda Academic Hub:

1. **Password visibility toggle** — eye icon on password fields
2. **Mobile menu** — hamburger button opens/closes mobile navigation
3. **Category filter chips** — filter event cards by category
4. **Bookmark toggle** — save/unsave events with visual feedback
5. **Tab switching** — switch between tabs on dashboard pages
6. **Tag chip input** — type tags in create-event form, press Enter to add as a chip
7. **Drag-and-drop upload zone** — visual feedback for file upload areas
8. **Attendee role filter** — filter attendee list by RSVP status
9. **Scroll fade-in animation** — cards animate in as they enter the viewport (IntersectionObserver)
10. **RSVP state toggle** — switch between "Going / Interested / Not Going"

---

## Step 7 — Iterate and Refine with Follow-Up Prompts

The first AI output is rarely perfect. After generating a page, review it in the browser and note what needs changing. Use targeted follow-up prompts:

**Fixing a specific issue:**
```
The event cards on index.html don't show the organizer's verified badge.
Add a small verified checkmark icon (Material Symbol: verified) in forest green
next to the organizer name on each event card. Use data-verified attribute
to mark which organizers are verified.
```

**Improving responsiveness:**
```
The two-column layout on event-detail.html breaks at tablet widths.
The sidebar overlaps the main content at medium screen sizes.
Fix the grid to be single-column below the lg breakpoint and
two-column (2fr 1fr) at lg and above.
```

**Improving accessibility:**
```
The filter chips on index.html are not keyboard-navigable.
Add role="tab" and aria-selected="true/false" to each filter chip.
Ensure each chip can be activated with Enter and Space keys.
Add role="tabpanel" and appropriate aria attributes to the filtered content area.
```

---

## Step 8 — Validate Your Pages

Before moving to backend development, do a quick check on each page:

### Visual Check
- [ ] Open in a browser at 1280px wide (desktop) — does it look right?
- [ ] Resize to 375px wide (mobile) — is it usable on mobile?
- [ ] Check all pages for consistent navbar and footer
- [ ] Check that colors match your design system

### Functional Check
- [ ] Click every link — do all page links work?
- [ ] Check the mobile menu opens and closes
- [ ] Check filter chips highlight when clicked
- [ ] Check bookmark icons toggle state
- [ ] Check password field eye icon works

### Code Quality Check
- [ ] Do all interactive elements have `data-*` attributes?
- [ ] Is JavaScript in separate `.js` files, not inline in HTML?
- [ ] Does `assets/js/main.js` load without console errors?

---

## Step 9 — Commit Your Progress

After completing each meaningful group of pages, commit to Git:

```bash
git add .
git commit -m "feat: add homepage, auth pages, and event detail page"
git push
```

Do this frequently — at minimum after completing each page.

---

## Pro Tips for Working with AI on Frontend Code

**Be specific about what's wrong.** Don't say "the design looks off." Say "the card grid has too much spacing between cards on mobile — reduce the gap to 12px on screens below 768px."

**Reference your design system.** Always mention your colors by hex code and fonts by name. The AI can't see your design.md file unless you remind it.

**Ask for explanations when you don't understand.** After AI generates code, ask: "Explain what the `flex-shrink-0` class on the badge is doing." Understanding your code makes you a better developer.

**Don't try to fix everything at once.** If three things are wrong, fix them one at a time with three separate prompts. Large, multi-problem prompts produce messy outputs.

**Test after every change.** Save the file and refresh the browser after every significant edit. Don't make 10 changes and then discover something broke halfway through.

---

## Checklist — You Are Ready to Move to Phase 7 When:

- [ ] Your homepage is complete and looks correct on desktop and mobile
- [ ] Sign-in and sign-up pages are complete
- [ ] At least one core feature page (detail, dashboard, etc.) is complete
- [ ] JavaScript interactivity (mobile menu, filters, bookmarks) is working
- [ ] All pages have consistent navbar and footer
- [ ] All HTML links between pages work
- [ ] All progress is committed to Git and pushed to GitHub

---

*Next: [Phase 6b — localStorage & Why You Need a Real Database](06b-LOCALSTORAGE-VS-DATABASE.md)*

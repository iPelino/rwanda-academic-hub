# TCREI Prompt Template for Web Projects
### Beginner-Friendly Edition — Ready to Use on Your Own Project

> **How to use this file:**
> 1. Read the framework explanation below (it takes 3 minutes).
> 2. Pick the template that matches what you need to build.
> 3. Replace every `[PLACEHOLDER]` with your own project details.
> 4. The **FoodieSpot Example** shows you what a filled-in version looks like — it's there to guide you, not to copy.
> 5. Check your prompt against the checklist at the bottom before you send it.

---

## The TCREI Framework — Plain English

Every great AI prompt answers five questions. Miss one and you get a worse result:

| Letter | Question it answers | If you skip it... |
|--------|--------------------|--------------------|
| **T** — Task | *What exactly do you want the AI to produce?* | AI guesses the scope and may build the wrong thing |
| **C** — Context | *What does the AI need to know about your project?* | AI makes generic assumptions that don't fit your project |
| **R** — Role | *Who should the AI pretend to be?* | AI gives you a generic answer instead of expert-level output |
| **E** — Examples | *What does a good result look like?* | AI invents its own format, which you then have to rewrite |
| **I** — Instructions | *What rules must it follow?* | AI skips important steps or makes decisions you didn't want |

**The short version:** A vague prompt gets a vague answer. A specific prompt gets a specific answer.

---

## Templates

- [Template 1 — Product Concept & Documentation](#template-1--product-concept--documentation)
- [Template 2 — Design System](#template-2--design-system)
- [Template 3 — Homepage / Main Page](#template-3--homepage--main-page)
- [Template 4 — Authentication Pages (Sign In / Sign Up)](#template-4--authentication-pages)
- [Template 5 — A Core Feature Page](#template-5--a-core-feature-page)
- [Template 6 — Database Schema](#template-6--database-schema)
- [Template 7 — JavaScript Interactivity](#template-7--javascript-interactivity)
- [Template 8 — Connecting Frontend to a Backend / API](#template-8--connecting-frontend-to-a-backend--api)

---

## Template 1 — Product Concept & Documentation

Use this when you're starting a new project and want the AI to help you plan it properly before writing any code.

### Your Template (fill in the `[...]` parts)

```
[T]ask: Produce a complete product definition for [YOUR APP NAME].
Write these documents: a README.md, a FEATURES.md, and a PROJECT-PLAN.md
with a staged implementation roadmap.

[C]ontext: The app is called "[YOUR APP NAME]". It solves [THE PROBLEM IT SOLVES].
The main users are [WHO WILL USE IT — e.g., students, restaurant owners, shoppers].
The platform should [WHAT IT DOES AT A HIGH LEVEL — one sentence].

[R]ole: You are a Senior Product Manager with experience in [RELEVANT DOMAIN — e.g., food tech, EdTech, e-commerce] products.

[E]xamples:
- FEATURES.md should cover: the problem statement, user personas
  (list [2-4 types of users]), core features ([LIST 3-5 KEY FEATURES]),
  and a trust/verification model if relevant.
- PROJECT-PLAN.md should have [4-6] numbered stages from
  foundations to launch, each with: Goal, What to Build, and
  how you'll know it's done (Acceptance Criteria).

[I]nstructions: Write all documents in clear markdown. Prioritize
[MOST IMPORTANT FEATURE] before anything else. Stage 1 must define
the core data model. Do not include any code — these are planning docs only.
Every feature must be justified by a user need.
```

### FoodieSpot Example (pre-filled)

```
[T]ask: Produce a complete product definition for FoodieSpot.
Write these documents: a README.md, a FEATURES.md, and a PROJECT-PLAN.md
with a staged implementation roadmap.

[C]ontext: The app is called "FoodieSpot". It solves the problem of people
not knowing which local restaurants are worth visiting — reviews are scattered
across WhatsApp groups, Facebook pages, and word-of-mouth.
The main users are food lovers looking for restaurant recommendations
and restaurant owners who want more visibility.
The platform should aggregate restaurant listings with crowd-sourced reviews
in one discoverable place.

[R]ole: You are a Senior Product Manager with experience in local discovery
and marketplace products like Yelp or TripAdvisor.

[E]xamples:
- FEATURES.md should cover: the problem statement, user personas
  (Hungry Visitor, Regular Local, Restaurant Owner, Admin),
  core features (search/filter, rating system, photo uploads, owner profiles,
  bookmark lists), and a content moderation model.
- PROJECT-PLAN.md should have 5 numbered stages from foundations to growth,
  each with: Goal, What to Build, and Acceptance Criteria.

[I]nstructions: Write all documents in clear markdown. Prioritize the
discovery and search experience before the review submission flow.
Stage 1 must define the core data model (restaurants, users, reviews, tags).
Do not include any code — these are planning docs only.
Every feature must be justified by a user need from one of the four personas.
```

> **Beginner Tip:** If you're unsure what your "user personas" are, just ask the AI first: *"I'm building [your app]. What are the different types of users I should design for?"* — then use those personas in this prompt.

---

## Template 2 — Design System

Use this when you need a consistent visual identity (colors, fonts, spacing) for your project.

### Your Template

```
[T]ask: Design a complete design system for [YOUR APP NAME] and save it as
docs/design.md. Include all colors, fonts, spacing, and a Tailwind CSS
config block ready to paste.

[C]ontext: The platform should feel [ADJECTIVE — e.g., friendly, professional,
minimal, bold]. The main color palette should be [COLOR DIRECTION — e.g.,
cool blues and whites, warm earthy tones, bright and energetic].
Follow the 60-30-10 rule: [60% COLOR] for backgrounds, [30% COLOR] for
structure, and [10% COLOR] for call-to-action buttons and highlights.

[R]ole: You are a Senior UI/UX Designer specializing in
[FRAMEWORK — e.g., Tailwind CSS, Material Design] and
[APP TYPE — e.g., consumer apps, SaaS dashboards].

[E]xamples:
- Primary color: [HEX or description] — used for [WHAT — e.g., navbars, buttons].
- Accent color: [HEX or description] — used for [WHAT — e.g., highlights, badges].
- Font for headings: [FONT NAME or "a serif/sans-serif that feels X"].
- Font for body text: [FONT NAME or "something clean and easy to read"].

[I]nstructions: Include: full color palette with semantic names and hex values
(background, surface, primary, accent, text, status colors); typography scale
(h1 through body text); spacing tokens; and Tailwind config.
Explain why you chose each color in one sentence inline.
```

### FoodieSpot Example

```
[T]ask: Design a complete design system for FoodieSpot and save it as
docs/design.md. Include all colors, fonts, spacing, and a Tailwind CSS
config block ready to paste.

[C]ontext: The platform should feel warm, appetizing, and trustworthy —
like a friendly local guide, not a corporate directory.
Follow the 60-30-10 rule: warm off-white (60%) for backgrounds,
deep tomato red (30%) for structure and brand identity,
and golden yellow (10%) for CTAs and star ratings.

[R]ole: You are a Senior UI/UX Designer specializing in Tailwind CSS
and consumer food/lifestyle apps.

[E]xamples:
- Primary: #C0392B (deep tomato red) — navbars, headers, brand anchors.
- Accent: #F39C12 (golden yellow) — star ratings, CTA buttons, badges.
- Font for headings: Playfair Display (editorial, appetizing weight).
- Font for body: Inter (clean, legible at small sizes).
- Category badges should each have a distinct color
  (mint for Vegetarian, orange for Fast Food, blue for Seafood, etc.).

[I]nstructions: Include: full color palette with semantic names and hex values;
typography scale; spacing tokens; component tone descriptions (cards, buttons,
badges, inputs); and a Tailwind config block. Annotate every color with its
intended use case inline. Include a dark mode variant for surface colors.
```

> **Beginner Tip:** Not sure which colors to pick? Just describe the *feeling* you want: *"warm and friendly like a café"* or *"clean and professional like a bank app"*. That's enough for the AI to suggest a palette.

---

## Template 3 — Homepage / Main Page

Use this for the first page visitors see — your discovery feed, landing page, or dashboard home.

### Your Template

```
[T]ask: Build [FILENAME — e.g., index.html] — the homepage for [YOUR APP NAME] —
as a standalone HTML file using Tailwind CSS via CDN.

[C]ontext: This is the most important page — it must communicate what the app
does instantly and show [THE MAIN CONTENT — e.g., listings, posts, products]
in a scannable layout. Colors: [PRIMARY COLOR], accent: [ACCENT COLOR].
Font: [HEADING FONT] for headings, [BODY FONT] for body text.

[R]ole: You are a Senior Frontend Engineer with strong UI/UX instincts,
building production-quality HTML/Tailwind pages.

[E]xamples:
- Hero section with the app name, tagline ("[YOUR TAGLINE]"),
  and a [SEARCH BAR / FEATURED CONTENT / CTA BUTTON].
- Filter bar: [LIST YOUR CATEGORIES — e.g., All | Italian | Asian | Fast Food]
  styled as clickable pill chips.
- [CONTENT TYPE] cards showing: [LIST WHAT EACH CARD SHOWS —
  e.g., photo, name, rating, location, price range].
- A "[FEATURED SECTION NAME]" section above the main content grid.

[I]nstructions: Use the Tailwind design tokens from docs/design.md.
The page must be fully responsive (mobile-first).
All interactive elements must have data attributes for JS hookup
(e.g., data-filter, data-bookmark).
Include a navbar and footer. No JavaScript in this file — markup only.
```

### FoodieSpot Example

```
[T]ask: Build index.html — the homepage for FoodieSpot —
as a standalone HTML file using Tailwind CSS via CDN.

[C]ontext: This is the most important page — it must communicate
"discover great local restaurants" instantly and show restaurant listings
in a scannable card grid. Primary: #C0392B (tomato red), accent: #F39C12
(golden yellow), background: warm off-white #FDF6EC.
Font: Playfair Display for headings, Inter for body.

[R]ole: You are a Senior Frontend Engineer with strong UI/UX instincts,
building production-quality HTML/Tailwind pages.

[E]xamples:
- Hero section with "FoodieSpot" logo, tagline
  ("Find the best local eats, reviewed by your community"),
  and a prominent search bar.
- Filter bar: All | Fast Food | Italian | Asian | Vegetarian | Seafood
  styled as clickable pill chips.
- Restaurant cards showing: cover photo, cuisine badge,
  restaurant name, average star rating (1–5 with count),
  neighborhood, price range ($ to $$$$), and a bookmark icon.
- A "Trending This Week" section showing 3 featured cards above the main grid.

[I]nstructions: Use the Tailwind config from docs/design.md.
The page must be fully responsive (mobile-first, breakpoints: sm, md, lg).
Filter chips must have data-filter="[category]" attributes.
Bookmark icons must have data-bookmark attributes.
Include a sticky navbar and a footer with links. No JavaScript — markup only.
```

> **Beginner Tip:** Struggle with the tagline? Ask the AI to write one first: *"Give me 5 taglines for [your app]."* Then pick your favourite and paste it into the template.

---

## Template 4 — Authentication Pages

Use this to build sign-in and sign-up pages that look and feel like your app.

### Your Template

```
[T]ask: Build pages/auth/sign-in.html and pages/auth/sign-up.html —
two branded authentication pages for [YOUR APP NAME].

[C]ontext: These are the first pages a new user sees when they create an account.
They must use the app's brand colors ([PRIMARY COLOR], [ACCENT COLOR])
and feel trustworthy. Sign-up collects: [LIST FIELDS — e.g., full name, email,
password, confirm password, and one extra field specific to your app].
Sign-in collects: email and password.

[R]ole: You are a Frontend Engineer who prioritizes accessible,
conversion-optimized forms.

[E]xamples:
- Centered card layout on a [LIGHT BACKGROUND COLOR] background
  with the app logo at the top.
- Primary CTA button in [PRIMARY COLOR] with a hover effect.
- Password field with an eye icon toggle (data-toggle-password attribute).
- A link between the two pages
  ("Don't have an account? Sign up" / "Already have an account? Sign in").
- Form error states: red border + error message below the field.

[I]nstructions: Use the app's Tailwind design tokens. All form inputs must have
proper <label> elements (required for accessibility). Include
aria-describedby on error message elements. The password eye toggle icon
must use data-toggle-password="[inputId]" attribute.
No JavaScript logic in this file — structure only.
```

### FoodieSpot Example

```
[T]ask: Build pages/auth/sign-in.html and pages/auth/sign-up.html —
two branded authentication pages for FoodieSpot.

[C]ontext: These are the first pages a new user sees when they create an account.
They must use FoodieSpot's brand (primary: #C0392B tomato red,
accent: #F39C12 golden yellow) and feel welcoming and trustworthy.
Sign-up collects: full name, email, password, confirm password, and
"I am a" (dropdown: Food Lover / Restaurant Owner).
Sign-in collects: email and password with a "Forgot password?" link.

[R]ole: You are a Frontend Engineer who prioritizes accessible,
conversion-optimized forms.

[E]xamples:
- Centered card layout on warm off-white (#FDF6EC) with FoodieSpot
  logo + wordmark centered at the top.
- "Create Account" button in #C0392B with golden hover (#F39C12).
- Password field with an eye icon toggle using data-toggle-password attribute.
- "Continue with Google" secondary button (outlined, not filled).
- A link between the two pages: "Already have an account? Sign in".
- Form error states: red left border + small error message text below the field.

[I]nstructions: Use FoodieSpot's Tailwind design tokens. All <input> elements
must have proper <label> elements. Error message containers must include
aria-describedby for screen reader support. Password eye-toggle button uses
data-toggle-password="passwordInputId". No JavaScript — structure only.
```

> **Beginner Tip:** The "I am a" dropdown (or similar role selector) is really useful if you have two types of users with different permissions. If you only have one type of user, just skip it.

---

## Template 5 — A Core Feature Page

Use this for the main feature page of your app — the page that delivers the core value (a listing detail, a post, a product page, etc.).

### Your Template

```
[T]ask: Build [FILENAME] — the [NAME] detail page for [YOUR APP NAME].

[C]ontext: This is the page users land on when they click on a
[ITEM TYPE — e.g., restaurant, event, product, post].
It must give the full picture: [LIST 3-5 KEY PIECES OF INFO — e.g., what it is,
who made it, how much it costs, how to take action on it, related items].
It also serves as the main SEO entry point for the platform.

[R]ole: You are a Frontend Engineer designing
[DESCRIBE THE STYLE — e.g., editorial-quality detail pages / clean product pages / information-dense listing pages].

[E]xamples:
- Full-width header [IMAGE / BANNER] at the top.
- Two-column layout (desktop): main content ([LIST WHAT GOES HERE]) +
  sticky sidebar ([LIST WHAT GOES IN SIDEBAR — e.g., action button, location, price]).
- [AUTHOR / OWNER] card below the description with their profile info.
- [RELATED ITEMS] section at the bottom.
- Primary action button ("[BUTTON LABEL]") in [ACCENT COLOR].

[I]nstructions: The primary action button must have a data-[action] attribute
for JS hookup. The page must be fully responsive — the sidebar collapses to
the bottom on mobile. Use the Tailwind design tokens from docs/design.md.
```

### FoodieSpot Example

```
[T]ask: Build pages/restaurant-detail.html —
the restaurant detail page for FoodieSpot.

[C]ontext: This is the page users land on after clicking a restaurant card.
It must give the full picture: what the restaurant is, who runs it,
where it is, what the menu categories are, and how to leave a review.
It serves as the main SEO entry point for each listing.

[R]ole: You are a Frontend Engineer designing editorial-quality
restaurant listing pages similar to TripAdvisor or Google Maps.

[E]xamples:
- Full-width cover photo at the top with cuisine badge overlay.
- Two-column layout (desktop): main content (name, overall rating,
  review summary, photo gallery, menu section headers, recent reviews)
  + sticky sidebar (address, opening hours, price range, "Get Directions"
  button, "Save to List" bookmark icon, share buttons).
- Restaurant owner card below: business name, verified badge, member since date,
  total reviews count, "Follow" button.
- "You Might Also Like" card carousel at the bottom (3 similar restaurants).
- "Write a Review" CTA button in #F39C12 (golden yellow).

[I]nstructions: Bookmark button needs data-bookmark attribute.
Review CTA needs data-open-review-modal attribute.
Fully responsive — sidebar collapses below main content on mobile.
Use Tailwind design tokens from docs/design.md throughout.
Star rating display must use proper aria-label for accessibility.
```

> **Beginner Tip:** The "sticky sidebar" pattern means the sidebar stays visible as you scroll past the content. If that sounds complex, just remove the word "sticky" — it'll still look good.

---

## Template 6 — Database Schema

Use this when you're ready to design the database for your app. This is a big step — read through it carefully before sending.

### Your Template

```
[T]ask: Design a relational database schema for [YOUR APP NAME]
and show it to me BEFORE creating anything.

[C]ontext: The app has these main entities: [LIST YOUR MAIN DATA OBJECTS —
e.g., users, restaurants, reviews, photos, bookmarks].
Users are managed via [YOUR AUTH PROVIDER — e.g., Supabase Auth, Firebase Auth].
The database is [YOUR DATABASE — e.g., PostgreSQL on Supabase].
[IF USING SUPABASE] Row Level Security (RLS) is required on all tables.

[R]ole: You are a Senior Database Architect experienced with
[YOUR DATABASE PLATFORM — e.g., PostgreSQL / Supabase / Firebase].

[E]xamples:
- [TABLE NAME].[COLUMN] should be an ENUM with values:
  [VALUE 1], [VALUE 2], [VALUE 3].
- [USER TABLE] links to [AUTH TABLE] via id.
- All primary keys use UUID.
- All timestamps: created_at as a timezone-aware datetime.

[I]nstructions: First, show me the full schema as a table summary
(table name, column names, types, and relationships).
Wait for my approval before creating anything.
Only after I say "approved", create the tables.
Use snake_case for all names.
[IF USING SUPABASE] RLS policies must ensure: users can only edit
their own data; public content is readable by everyone;
private content is only readable by the owner.
```

### FoodieSpot Example

```
[T]ask: Design a relational database schema for FoodieSpot
and show it to me BEFORE creating anything.

[C]ontext: The app has these main entities:
users, user_profiles, restaurants, reviews, photos, bookmarks,
cuisine_categories, restaurant_hours.
Users are managed via Supabase Auth.
The database is PostgreSQL on Supabase.
Row Level Security (RLS) is required on all tables.

[R]ole: You are a Senior Database Architect experienced with PostgreSQL
and Supabase with knowledge of RLS policy design.

[E]xamples:
- restaurants.status should be an ENUM: draft, published, flagged, closed.
- reviews.rating should be an INTEGER with a CHECK constraint (1-5).
- user_profiles links to auth.users via id UUID REFERENCES auth.users(id).
- All PKs use UUID DEFAULT gen_random_uuid().
- All timestamps use TIMESTAMPTZ DEFAULT NOW().

[I]nstructions: First, show me the full schema as a markdown table
(table name, columns, types, foreign keys).
Also show a simple ER diagram using Mermaid syntax.
Wait for my approval before creating anything.
Only after I say "approved", use apply_migration to create all tables.
Use snake_case for all names.
RLS policies must ensure: anyone can read published restaurants;
only the restaurant owner can edit their own listing;
only authenticated users can submit reviews;
users can only edit or delete their own reviews.
```

> **Beginner Tip:** The most important instruction here is "Wait for my approval." Always review the schema before letting the AI create tables — it's much harder to fix a bad schema after data is in it.

---

## Template 7 — JavaScript Interactivity

Use this when your HTML is done and you want to add interactions (menus, toggles, filters, animations).

### Your Template

```
[T]ask: Write assets/js/main.js — a single, well-commented vanilla JavaScript
file that adds all interactive behaviors to [YOUR APP NAME]'s HTML pages.

[C]ontext: All pages use static HTML with data- attributes as hooks.
No frameworks or build tools are used. This file is linked at the bottom
of each page's <body>. Behaviors needed:
[LIST EACH BEHAVIOR — e.g., mobile menu open/close, tab switching,
form validation, dark mode toggle, search filtering].

[R]ole: You are a Senior Vanilla JavaScript Engineer who writes clean,
accessible browser-native JavaScript without libraries.

[E]xamples:
[For each behavior, show one line of how it should work]:
- Mobile menu: button with id="mobile-menu-toggle" opens div with
  id="mobile-menu" by adding class "is-open".
- Tab switching: buttons with data-tab="[name]" show/hide matching
  sections with data-tab-content="[name]".
- [ADD YOUR OWN EXAMPLES based on your app's needs]

[I]nstructions: Wrap everything in a self-executing function
(function() { 'use strict'; ... })() so it doesn't leak globals.
Use data- attribute selectors — never hardcoded class names.
Each behavior must have its own clearly labelled comment block.
No jQuery or external libraries. Must work via a plain <script> tag.
Always check that an element exists before trying to use it
(null check) — not every behavior exists on every page.
```

### FoodieSpot Example

```
[T]ask: Write assets/js/main.js — a single, well-commented vanilla JavaScript
file that adds all interactive behaviors to FoodieSpot's HTML pages.

[C]ontext: All pages use static HTML with data- attributes as hooks.
No frameworks or build tools are used. This file is linked at the bottom
of each page's <body>. Behaviors needed:
mobile menu open/close, cuisine filter chip selection, bookmark toggle,
star rating selector, photo gallery lightbox, tab switching on
detail pages, and scroll fade-in animation for cards.

[R]ole: You are a Senior Vanilla JavaScript Engineer who writes clean,
accessible browser-native JavaScript without libraries.

[E]xamples:
- Mobile menu: <button id="mobile-menu-toggle"> opens <div id="mobile-menu">
  by adding class "is-open" and setting body overflow to hidden.
- Cuisine filter: buttons with data-filter="[cuisine]" add class "active"
  to themselves and hide cards that don't match data-cuisine="[value]".
- Bookmark toggle: <button data-bookmark> toggles a "bookmarked" CSS class
  and swaps the icon between filled and outlined.
- Star rating: buttons with data-rating="[1-5]" inside data-star-selector
  highlight stars on hover and set a value on click.
- Scroll animation: cards with class "fade-in-card" become visible as they
  enter the viewport (IntersectionObserver).

[I]nstructions: Wrap everything in (function() { 'use strict'; ... })().
Use data- attribute selectors — never hardcoded class names.
Each module must have its own clearly labelled comment block.
No jQuery. Must work via a plain <script> tag.
Always check the element exists before using it (null check).
Update aria-pressed="true/false" on toggle buttons for accessibility.
```

> **Beginner Tip:** If you're not sure what "data attributes" are, they look like this: `<button data-filter="italian">`. You write them in your HTML and your JavaScript finds them without needing IDs or class names. This keeps your HTML and JS separate and clean.

---

## Template 8 — Connecting Frontend to a Backend / API

Use this when you're ready to make your HTML pages fetch real data (from Supabase, Firebase, a REST API, etc.).

### Your Template

```
[T]ask: Implement the data integration layer for [YOUR APP NAME] —
starting with user authentication, then fetching [MAIN CONTENT TYPE]
on the [MAIN PAGE — e.g., homepage].

[C]ontext: The frontend is static HTML with vanilla JS.
[YOUR BACKEND — e.g., Supabase JS SDK] is loaded via CDN.
[IF APPLICABLE] Security policies are active — all queries run in
the context of the authenticated user.
Do not use a bundler or framework.

[R]ole: You are a Senior Full-Stack Engineer specializing in
[YOUR BACKEND PLATFORM] and modular Vanilla JS architecture.

[E]xamples:
- Create assets/js/[platform]-client.js: exports a singleton
  client initialized with your project URL and public key.
- Create assets/js/auth.js: signIn(email, password), signUp(data),
  signOut(), getSession(), and a listener that updates the nav UI.
- Create assets/js/[content]-api.js: fetch[ContentType]({ filter1, filter2 })
  that reads from your database and returns an array of objects.

[I]nstructions: Never hardcode credentials in HTML — use a config.js file
that exports your URL and public key (NOT your secret/service key).
Wire the sign-in and sign-up pages to auth.js first.
Then wire the homepage to the content API.
Show a loading skeleton while data is fetching.
Show a graceful empty state if no results are returned.
[IF APPLICABLE] Never use the admin/service role key on the frontend.
```

### FoodieSpot Example

```
[T]ask: Implement the data integration layer for FoodieSpot —
starting with user authentication, then fetching restaurants
on the homepage (index.html).

[C]ontext: The frontend is static HTML with vanilla JS.
Supabase JS SDK is loaded via CDN
(https://cdn.jsdelivr.net/npm/@supabase/supabase-js).
RLS policies are active — public restaurants are readable by all,
but bookmarks and reviews require an authenticated user.
Do not use a bundler or framework.

[R]ole: You are a Senior Full-Stack Engineer specializing in Supabase,
modular Vanilla JS architecture, and RLS-aware data fetching.

[E]xamples:
- Create assets/js/supabase-client.js: exports a singleton supabase
  client initialized with SUPABASE_URL and SUPABASE_ANON_KEY.
- Create assets/js/auth.js: signIn(email, password), signUp(data),
  signOut(), getSession(), and an onAuthStateChange listener
  that shows/hides the "Sign In" button in the nav.
- Create assets/js/restaurants-api.js: fetchPublishedRestaurants({
  cuisine, city, limit }) using .from('restaurants')
  .select('*, reviews(rating), cuisine_categories(name)')
  filtered by status = 'published'.

[I]nstructions: Store SUPABASE_URL and SUPABASE_ANON_KEY in
assets/js/config.js — never in HTML. Never use the service role key
on the frontend. Wire sign-in.html and sign-up.html to auth.js first.
Then wire index.html to restaurants-api.js.
Show a loading skeleton (3 grey placeholder cards) while data fetches.
Show a "No restaurants found" message with a "Clear filters" button
if the query returns empty. Respect RLS — unauthenticated users
can browse but cannot bookmark or review.
```

> **Beginner Tip:** Your **anon key** (public key) is safe to put in frontend code — it's designed to be public. Your **service role key** (secret key) is dangerous to expose and must never go in frontend code. When in doubt, only use the anon key on the frontend.

---

## Prompt Quality Checklist

Before you send any prompt, run through this list. It takes 30 seconds and saves a lot of back-and-forth:

- [ ] **Is the Task specific?** Did I name an exact file or page to build? (Not "make the app look nice" — instead "build `pages/profile.html`")
- [ ] **Does the Context include my design?** Did I mention my colors and fonts? (The AI can't guess your brand)
- [ ] **Did I assign a Role?** Does the AI know who to be? (Senior Frontend Engineer, Database Architect, etc.)
- [ ] **Are my Examples concrete?** Did I give at least one real field name, color code, or file path? (Not "something like a search bar" — instead "a search input with `data-search` attribute")
- [ ] **Did I set a review gate for risky actions?** For anything that creates/deletes data: did I say "show me first, wait for my approval"?
- [ ] **Is the scope clear?** Did I say which specific files or pages this prompt covers? (Not "the frontend" — instead "only `index.html`")
- [ ] **Did I mention data attributes?** For JS prompts: did I specify how JavaScript will find the elements?
- [ ] **Are credentials handled safely?** Did I remind the AI to use environment variables or config files, not hardcoded secrets?

**Score yourself:** 8/8 = great prompt. Below 6 = rewrite before sending.

---

## Quick Reference — Beginner-Friendly TCREI Cheat Sheet

```
[T] What do you want? → Name the file, page, or document. Be specific.
[C] What does AI need to know? → Your colors, your stack, your existing files.
[R] Who is the AI? → "You are a Senior [X] Engineer who..."
[E] What does good look like? → Show one example of a field name, color, or layout.
[I] What are the rules? → List steps in order. Say "wait for approval" before big actions.
```

---

*Template version: 1.0*
*Framework: TCREI (Task · Context · Role · Examples · Instructions)*
*Based on the Rwanda Academic Hub case study — see `docs/prompts.md` for real project examples.*

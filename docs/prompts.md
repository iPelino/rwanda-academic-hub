# Rwanda Academic Hub — Prompt Engineering Log

> **📚 For Learners:** This is a real-world case study showing how prompts were written and improved during an actual software project. Use it to understand *why* better-structured prompts produce better AI outputs — then apply the same TCREI framework to your own projects. A blank, reusable version of this template is available in `docs/PROMPT-TEMPLATE.md`.
>
> **Note:** All prompts shown are educational reconstructions. No API keys, credentials, or private data are included in this document.

This document catalogs every prompt used during the development of the Rwanda Academic Hub project, provides a critical analysis of each, and offers an improved version structured using the **TCREI Prompting Framework**.

---

## About the TCREI Framework

TCREI is a structured prompt-engineering pattern that reduces ambiguity and improves AI output quality. Each component serves a distinct purpose:

| Component | Meaning | Purpose |
|-----------|---------|---------|
| **T** | **Task** | The exact deliverable — what the AI must produce |
| **C** | **Context** | Domain, constraints, existing state, project background |
| **R** | **Role** | The expert persona the AI should adopt |
| **E** | **Examples** | Concrete illustrations of desired format, tone, or structure |
| **I** | **Instructions** | Step-by-step rules, priorities, and guardrails |

**Why TCREI matters:** Vague prompts produce generic outputs. Each missing component has a predictable failure mode: no Task → scope creep; no Context → wrong assumptions; no Role → inconsistent voice; no Examples → unpredictable format; no Instructions → critical steps skipped.

---

## Prompt Index

| # | Area | Status |
|---|------|--------|
| P01 | Product Concept & Documentation | Refined |
| P02 | Design System Creation | Refined |
| P03 | Homepage Discovery Feed | Refined |
| P04 | Authentication Pages | Refined |
| P05 | Event Creation Wizard (3-Step) | Refined |
| P06 | Event Detail Page | Refined |
| P07 | Organizer & User Dashboards | Refined |
| P08 | Supporting Pages (RSVP List, University Profile) | Refined |
| P09 | JavaScript Interactivity Modules | Refined |
| P10 | Database Schema Design | Refined |
| P11 | Seed Data Population | Refined |
| P12 | Frontend–Backend Integration | Refined |
| P13 | Implementation Roadmap & Test Data Plan | Refined |
| P14 | Infrastructure Diagnostics (Supabase MCP) | New — This Session |
| P15 | Prompt Engineering Documentation | New — This Session |

---

## P01 — Product Concept & Documentation

### Original Prompt
> "help me build a platform for university event discovery in Rwanda, let's start with the planning and documentation"

### Analysis
- **Strengths:** Clear domain and geographic scope.
- **Weaknesses:** No role assigned; "help me build" is ambiguous about what deliverable is expected right now; no structure requested for the output docs; no constraints on scope or prioritization.
- **Risk:** AI may produce a shallow one-page summary instead of a full product specification, or jump straight to code.

### Improved Prompt (TCREI)

**[T]ask:** Produce a complete product definition package for an academic event discovery platform: a `README.md`, a `CONCEPTS-AND-FEATURES.md`, and a `RWANDA-ACADEMIC-HUB-PLAN.md` with a staged implementation roadmap.

**[C]ontext:** The platform is called "Rwanda Academic Hub." It solves an event-visibility gap in Rwanda's academic ecosystem — events stay siloed in institution-specific WhatsApp groups and internal channels. Target users are students, lecturers, club organizers, and partner communities primarily in Kigali, with national expansion designed in from the start. The platform should aggregate events across institutions, not replace internal systems.

**[R]ole:** You are a Senior Product Manager with experience in EdTech platforms and two-sided marketplace design.

**[E]xamples:**
- `CONCEPTS-AND-FEATURES.md` should cover: problem statement, user personas (Student, Lecturer, Club Organizer, University, External Partner), event types, core features (discovery feed, search/filter, RSVP, organizer profile), and trust/verification model.
- `RWANDA-ACADEMIC-HUB-PLAN.md` should have 8 numbered stages from foundations to ecosystem growth, each with: Goal, Build Scope, and Acceptance Criteria.

**[I]nstructions:** Write all docs in clear markdown. Prioritize discoverability before publishing workflows. Stage 1 must define the core data model. Do not include implementation code — these are product definition docs only. Each feature must be justified by a user need.

---

## P02 — Design System Creation

### Original Prompt
> "create a design system for this platform, use a clean academic aesthetic with Rwanda colours"

### Analysis
- **Strengths:** Aesthetic direction is clear ("academic," "Rwanda colours").
- **Weaknesses:** "Rwanda colours" is under-specified (green/gold from the flag? earth tones?); no output format specified (YAML? CSS variables? Tailwind config?); no typography, spacing, or component-level guidance requested; no mention of dark-mode requirements.
- **Risk:** AI generates a generic color palette with no semantic meaning, making it hard to apply consistently across pages.

### Improved Prompt (TCREI)

**[T]ask:** Design a complete design system for Rwanda Academic Hub and save it as `docs/design.md` in YAML front-matter format compatible with Google Stitch, with inline commentary explaining every decision.

**[C]ontext:** The platform is academic and pan-institutional. It must feel trustworthy, clean, and welcoming — not corporate. Primary palette should draw from Rwanda's deep forest greens (national imagery, nature, prestige) with an amber-gold accent (energy, action, warmth). The 60-30-10 color rule applies: soft sage-white canvas (60%), forest green structure (30%), amber-gold accents (10%).

**[R]ole:** You are a Senior UI/UX Designer specializing in Material Design 3 and academic SaaS products.

**[E]xamples:**
- Primary: `#1A3D2B` (deep Rwanda forest green) — navbars, headers, structural anchors.
- Accent: `#E8A020` (warm academic amber-gold) — CTAs, verified badges, active states.
- Typography: `DM Serif Display` for headings (editorial weight), `Plus Jakarta Sans` for body (legible, modern).
- Category tags should each have a distinct pastel wash (mint for workshops, sky blue for seminars, warm yellow for career fairs, etc.).

**[I]nstructions:** Include: full color palette with semantic names and hex values (background, surface, primary, accent, text tiers, status colors, category colors); typography scale; spacing tokens; component tone descriptions (cards, buttons, badges, inputs); and a Tailwind config block ready to paste. Annotate every color with its intended use case inline.

---

## P03 — Homepage Discovery Feed

### Original Prompt
> "build the homepage for this platform, it should show events"

### Analysis
- **Strengths:** Target page is clear.
- **Weaknesses:** No visual structure specified (hero? filters? featured? grid?); no reference to the design system; "show events" gives no guidance on card anatomy, empty states, or pagination; no nav/footer requirements stated.
- **Risk:** AI produces a generic event list with no hierarchy, no filtering affordances, and no identity.

### Improved Prompt (TCREI)

**[T]ask:** Build `index.html` — the Rwanda Academic Hub homepage and primary event discovery feed — as a standalone, fully-styled HTML file using Tailwind CSS via CDN.

**[C]ontext:** This is the platform's highest-traffic page. It must communicate platform identity instantly, show upcoming events in a scannable card grid, and give users filtering controls. The design system is defined in `docs/design.md` — forest green primary (`#1A3D2B`), amber accent (`#E8A020`), sage-white backgrounds. Typography: DM Serif Display for display headings, Plus Jakarta Sans for body.

**[R]ole:** You are a Senior Frontend Engineer with strong UI/UX instincts, building production-quality HTML/Tailwind pages.

**[E]xamples:**
- Hero section with platform name, tagline ("Discover academic events across Rwanda"), and a search bar.
- Horizontal filter bar: All | Workshop | Seminar | Hackathon | Career Fair | Research — styled as pill chips.
- Event cards showing: banner thumbnail, category badge, event title, organizer name + verified badge, date + location, a "Save" bookmark icon.
- Featured events section and a "Browse by University" quick-link row above the main feed.

**[I]nstructions:** Use the Tailwind config from the design system. Use `Material Symbols Outlined` for icons. The page must be fully responsive (mobile-first). All interactive elements (bookmark, filter pills) must have data attributes for JS hookup. Include nav, footer, and a mobile menu. No JavaScript logic in this file — only markup.

---

## P04 — Authentication Pages

### Original Prompt
> "build the sign in and sign up pages"

### Analysis
- **Strengths:** Minimal, clear deliverable.
- **Weaknesses:** No brand context; no field requirements (what fields on sign-up?); no mention of social auth; no error state design guidance; password strength or visibility toggles not mentioned.
- **Risk:** Generic login form with no brand identity and missing accessibility/UX patterns (password toggle, form validation states, accessible labels).

### Improved Prompt (TCREI)

**[T]ask:** Build `pages/auth/sign-in.html` and `pages/auth/sign-up.html` — two standalone branded authentication pages.

**[C]ontext:** These pages are the user's first identity interaction with Rwanda Academic Hub. They must reinforce trust and use the platform's forest-green/amber-gold brand. Sign-up collects: full name, email, password, confirm password, and university affiliation (select dropdown). Sign-in collects: email and password with a "forgot password" link.

**[R]ole:** You are a Frontend Engineer who prioritizes accessible, conversion-optimized forms.

**[E]xamples:**
- Centered card layout on a sage-white background with the platform logo/wordmark at top.
- Primary CTA button in forest green (`#1A3D2B`) with amber hover.
- Password field with an eye icon toggle (using `data-toggle-password` attribute for JS wiring).
- Google OAuth "Continue with Google" secondary button.
- Form validation states: red border + error message below field.
- Visible link between the two pages ("Don't have an account? Sign up").

**[I]nstructions:** Use the platform's Tailwind design tokens. All `<input>` elements must have proper `<label>` elements for accessibility. Include `aria-describedby` on error message containers. The password toggle icon should use `Material Symbols Outlined` with `data-toggle-password="<inputId>"` data attribute. No embedded JavaScript — only structure.

---

## P05 — Event Creation Wizard (3-Step)

### Original Prompt
> "build the create event flow as a multi-step form"

### Analysis
- **Strengths:** Multi-step intent is clear.
- **Weaknesses:** No field inventory for each step; no step labels or progress indicator specified; no media upload requirements; no mention of draft vs publish states; no back-navigation handling.
- **Risk:** AI may produce a single-page form broken arbitrarily into sections rather than a properly designed wizard with clear information architecture.

### Improved Prompt (TCREI)

**[T]ask:** Build a 3-page event creation wizard: `pages/events/create/step-1.html` (Event Details), `pages/events/create/step-2-media.html` (Media & Location), and `pages/events/create/step-3-publish.html` (Review & Publish).

**[C]ontext:** Only verified organizers reach this flow. The wizard reduces cognitive load by grouping related inputs. The final step allows organizers to set a publish state (Draft vs Published) and add tags. The platform uses Tailwind + design tokens (forest green, amber).

**[R]ole:** You are a UX-focused Frontend Engineer experienced in multi-step form design patterns.

**[E]xamples:**
- **Step 1 fields:** Event title, description (rich textarea), category (select), event format (In-Person/Online/Hybrid), start/end datetime, audience eligibility (All/Academic/Institution-only), university affiliation.
- **Step 2 fields:** Banner image upload zone (drag-and-drop), venue name, city (select), address, Google Maps URL, optional speaker list (repeater).
- **Step 3:** Preview card of entered data, tag input (comma-separated chips with `data-tag-input`), publish status toggle (Draft/Published), Submit button.
- A sticky progress indicator at top of each page: "Step 1 of 3 — Event Details" with visual step dots.

**[I]nstructions:** Each page links to the next/previous step with Next/Back buttons. The drag-and-drop upload zone must use `data-upload-zone` attribute for JS hookup. Tag input must use `data-tag-input` attribute. Use the Tailwind design system. No JavaScript logic — markup only. Ensure the progress bar is consistent across all three pages.

---

## P06 — Event Detail Page

### Original Prompt
> "build the event detail page"

### Analysis
- **Strengths:** Single page, clear target.
- **Weaknesses:** No content sections specified; no RSVP/bookmark action placement; no share functionality mentioned; no organizer profile card context; no related events section.
- **Risk:** A flat page with just title and description — missing the rich editorial layout needed for event marketing.

### Improved Prompt (TCREI)

**[T]ask:** Build `pages/events/event-detail.html` — the full-detail page for a single academic event.

**[C]ontext:** This is the page users land on after clicking an event card. It must give the full picture: what the event is, who's hosting it, where and when, how to register, and related events. It also serves as an SEO entry point for the platform.

**[R]ole:** You are a Frontend Engineer designing editorial-quality event marketing pages.

**[E]xamples:**
- Full-width banner image at top with category badge overlay.
- Two-column layout (desktop): main content column (title, description, agenda/schedule, speakers list) + sticky sidebar (date/time, location with map embed, RSVP button, bookmark icon, share buttons).
- Organizer card below the description: name, verified badge, institution, follower count, "Follow" button.
- "About the University" expandable section.
- "More Events by This Organizer" card carousel at bottom.
- RSVP button in amber (`#E8A020`) with "Going / Interested / Not Going" states.

**[I]nstructions:** Bookmark and RSVP buttons must have data attributes (`data-bookmark`, `data-rsvp`) for JS hookup. The page must be fully responsive — sidebar collapses to bottom section on mobile. Use the platform's Tailwind design tokens throughout.

---

## P07 — Organizer & User Dashboards

### Original Prompt
> "build the dashboards for organizers and regular users"

### Analysis
- **Strengths:** Two clear pages specified.
- **Weaknesses:** No distinction between what each dashboard shows; no KPI metrics specified for the organizer; no tab structure for the user dashboard; no mention of the action items (edit event, view analytics, manage RSVPs).
- **Risk:** Both dashboards look the same — a generic table with no functional differentiation between roles.

### Improved Prompt (TCREI)

**[T]ask:** Build two dashboard pages: `pages/dashboards/organizer.html` (event management center) and `pages/dashboards/user.html` (personal discovery hub).

**[C]ontext:** The organizer dashboard is the control center for verified organizers — they manage their events, view attendee lists, and see engagement stats. The user dashboard is a personal space showing saved events, followed organizers, and upcoming RSVPs. Both share the same nav and brand identity.

**[R]ole:** You are a Senior Frontend Engineer designing data-rich admin interfaces with a clean consumer product feel.

**[E]xamples:**
- **Organizer Dashboard:** Sidebar nav (Overview, My Events, Create Event, Attendees, Analytics, Settings). Top stats row: Total Events, Total RSVPs, Upcoming Events, Followers. Events table with Status badge (Published/Draft/Past), Edit/Delete actions, View Attendees link.
- **User Dashboard:** Tab nav (Saved Events, RSVPs, Following, Notifications). Saved events grid matching the homepage card style. Following section as an organizer card list with Unfollow action. Upcoming RSVP timeline list.

**[I]nstructions:** Use the forest-green sidebar (`#1A3D2B`) with white text for the organizer dashboard. Use white/sage surface layout for the user dashboard. Status badges must use semantic colors (amber for Draft, green for Published, grey for Past). All interactive controls must have appropriate `data-` attributes. Keep JS-free — markup only.

---

## P08 — Supporting Pages (RSVP List, University Profile)

### Original Prompt
> "build the attendee list page and a university profile page"

### Analysis
- **Strengths:** Two specific pages.
- **Weaknesses:** No content hierarchy for the university profile (what data does it show?); no filtering or search on the attendee list; no export/share actions mentioned; no connection to the organizer dashboard context.
- **Risk:** Static placeholder pages with no functional value.

### Improved Prompt (TCREI)

**[T]ask:** Build `pages/attendee-rsvp.html` (organizer view of attendees for a specific event) and `pages/university-profile.html` (public profile page for a university on the platform).

**[C]ontext:** The attendee page is accessed by organizers from their dashboard — it shows who has RSVPed/expressed interest for a specific event with status filters. The university profile is a public-facing page discoverable by any user, showing the university's identity and all their events.

**[R]ole:** You are a Frontend Engineer building data management and public directory pages.

**[E]xamples:**
- **Attendee Page:** Event title header, filter tabs (All / Going / Interested / Not Going), search input by name, attendee table (avatar, name, affiliation, status badge, date registered), total count, CSV export button.
- **University Profile:** Hero banner with university logo and cover, name + verified badge + city, bio paragraph, stats row (Total Events, Followers, Members), tabbed content (Upcoming Events, Past Events, About), event cards matching the discovery feed style.

**[I]nstructions:** The attendee table must use proper `<table>` markup with accessible `<th>` headers. Search input and filter tabs must use `data-` attributes. University profile must be fully responsive. Use the platform design tokens throughout.

---

## P09 — JavaScript Interactivity Modules

### Original Prompt
> "add the interactive javascript features to the pages"

### Analysis
- **Strengths:** Broad coverage intent.
- **Weaknesses:** "Interactive features" is fully vague — no feature inventory; no pattern requested (vanilla JS? modules? jQuery?); no data-attribute contract specified (how does JS find elements?); no mention of accessibility (ARIA updates); no instructions about file structure.
- **Risk:** Inline scripts scattered across HTML files, inconsistent event handling, no reuse, and hard-to-maintain code.

### Improved Prompt (TCREI)

**[T]ask:** Write `assets/js/main.js` — a single, well-commented vanilla JavaScript IIFE module that implements all interactive UI behaviors across the platform's static pages.

**[C]ontext:** All pages use static HTML with `data-` attributes as hooks. No frameworks or build tools. The JS file is linked at the bottom of each page's `<body>`. Behaviors needed: password visibility toggle, mobile menu open/close, profile tab switching, tag chip input, drag-and-drop upload zone, attendee role filter, bookmark toggle, and scroll fade-in animation via IntersectionObserver.

**[R]ole:** You are a Senior Vanilla JS Engineer who writes clean, modular, accessible browser-native JavaScript.

**[E]xamples:**
- Password toggle: `<button data-toggle-password="passwordInputId">` — toggles `input.type` between `password` and `text`, swaps icon between `visibility` / `visibility_off`.
- Mobile menu: `<button id="mobile-menu-toggle">` opens `<div id="mobile-menu">` which adds class `is-open` and sets `body.overflow = hidden`.
- Tag input: `<input data-tag-input>` — pressing Enter or comma creates a styled chip tag that can be removed.
- Bookmark toggle: `<button data-bookmark>` — toggles `FILL` class on the icon and a `bookmarked` CSS class.

**[I]nstructions:** Wrap everything in a self-executing function `(function() { 'use strict'; ... })()`. Use `document.querySelectorAll` with `data-` selectors — never hardcoded class names. Each module must be separated by a clearly labelled comment block. No jQuery. No ES modules syntax — must work via plain `<script>` tag. Handle null checks gracefully (element may not exist on every page).

---

## P10 — Database Schema Design

### Original Prompt
> "Analyze the current project and help me design a database schema for this entier application data. then use supabase mcp to create that schema"

### Analysis
- **Strengths:** Clear end goal (design schema, create via Supabase MCP).
- **Weaknesses:** Lacks specific context about the project's domain; doesn't assign a role; missing instructions on constraints (like RLS policies or naming conventions); no examples of expected output format; no review gate before execution; typo "entier" reduces clarity.
- **Risk:** Schema executed without review; missing RLS policies make data publicly writable; inconsistent naming conventions.

### Improved Prompt (TCREI)

**[T]ask:** Design a comprehensive relational database schema for Rwanda Academic Hub and implement it via Supabase MCP using `apply_migration`.

**[C]ontext:** The platform has: users (via Supabase Auth), user profiles (attendee/organizer roles), universities, organizers linked to universities, events with status ENUMs, venues, event categories, RSVPs, bookmarks, and organizer follows. Row Level Security (RLS) is mandatory on all tables. PostgreSQL on Supabase.

**[R]ole:** You are a Staff Data Architect and Supabase expert.

**[E]xamples:**
- `events.status` should be an ENUM: `draft`, `published`, `archived`, `cancelled`.
- `user_profiles` links to `auth.users` via `id UUID REFERENCES auth.users(id)`.
- `organizers` links to `universities` via `university_id`.
- All PKs use `UUID DEFAULT gen_random_uuid()`.
- All timestamps: `created_at TIMESTAMPTZ DEFAULT NOW()`.

**[I]nstructions:** First, present the full schema as a Mermaid ER diagram and a markdown table summary (table name, columns, types, relationships). Wait for approval. Only after explicit approval, use `apply_migration` to create all tables, ENUMs, triggers, indexes, and RLS policies. Use `snake_case` naming. Policies must enforce: users can only read/write their own profile; only organizers can insert/update events; published events are publicly readable.

---

## P11 — Seed Data Population

### Original Prompt
> "use supabase mcp to populate the universities table with all the known universities in Rwanda"

### Analysis
- **Strengths:** Very specific action and target data.
- **Weaknesses:** "All known" is open-ended and risks hallucinated entries; doesn't specify required fields from the schema; no conflict-handling strategy if run twice.
- **Risk:** Fabricated universities, missing required fields causing constraint violations, duplicate entries on re-run.

### Improved Prompt (TCREI)

**[T]ask:** Generate and execute a SQL seed migration via Supabase MCP `apply_migration` to populate the `universities` table with verified Rwandan universities.

**[C]ontext:** The `universities` table has columns: `id` (UUID), `name` (TEXT NOT NULL), `slug` (TEXT UNIQUE), `city` (TEXT), `website` (TEXT), `logo_url` (TEXT), `is_verified` (BOOLEAN DEFAULT false), `created_at`. Seed data must be accurate — this is displayed to end users on organizer profiles.

**[R]ole:** You are a meticulous Database Administrator with knowledge of Rwanda's higher education landscape.

**[E]xamples:**
- `{ name: "African Leadership University", slug: "alu-rwanda", city: "Kigali", is_verified: true }`
- `{ name: "University of Rwanda", slug: "ur", city: "Kigali", is_verified: true }`
- `{ name: "Carnegie Mellon University Africa", slug: "cmu-africa", city: "Kigali", is_verified: true }`

**[I]nstructions:** Include at least 12 real universities — prioritize Kigali institutions, then include national campuses. Generate slugs as lowercase kebab-case from the name. Set `is_verified = true` for established public universities. Use a single `INSERT ... ON CONFLICT (slug) DO NOTHING` statement to make the migration idempotent. Migration name: `seed_universities`.

---

## P12 — Frontend–Backend Integration

### Original Prompt
> "As an experienced backend developer, wire the current frontend to the supabase backend database that we have. use the best practices and industry standards for both supabase, frontend and backend apps."

### Analysis
- **Strengths:** Role assigned; quality bar set ("best practices and industry standards").
- **Weaknesses:** "Wire the current frontend" is an enormous scope — authentication, data reads, writes, real-time, and RSVP all in one prompt; no module structure specified; no mention of which pages to wire first; risks producing a monolithic unreadable file.
- **Risk:** Incomplete implementation, mixed concerns, and JS that doesn't respect RLS policies.

### Improved Prompt (TCREI)

**[T]ask:** Implement the Supabase JS SDK integration layer for Rwanda Academic Hub — starting with authentication, then event fetching on the homepage.

**[C]ontext:** The frontend is static HTML/Tailwind with vanilla JS. Supabase JS SDK loaded via CDN (`https://cdn.jsdelivr.net/npm/@supabase/supabase-js`). We have a live Supabase project. RLS policies are active — all queries run in the context of the authenticated user. Do not use a bundler or framework.

**[R]ole:** You are a Senior Full-Stack Engineer specializing in Supabase, modular Vanilla JS architecture, and RLS-aware data fetching.

**[E]xamples:**
- Create `assets/js/supabase-client.js`: exports a singleton `supabase` client initialized with the project URL and anon key.
- Create `assets/js/auth.js`: `signIn(email, password)`, `signUp(data)`, `signOut()`, `getSession()`, and an `onAuthStateChange` listener that updates the nav UI.
- Create `assets/js/events-api.js`: `fetchPublishedEvents({ category, city, limit })` using `.from('events').select('*, organizers(*), venues(*)')`.

**[I]nstructions:** Never hardcode credentials in HTML — use a `config.js` file that exports `SUPABASE_URL` and `SUPABASE_ANON_KEY`. Wire `pages/auth/sign-in.html` and `pages/auth/sign-up.html` to `auth.js` first. Then wire `index.html` event cards to `events-api.js`. Show a loading skeleton while data fetches. Show a graceful empty state if no events are returned. Respect RLS — never use the service role key on the frontend.

---

## P13 — Implementation Roadmap & Test Data Plan

### Original Prompt
> "elaborate a plan to implement the remaining next steps. it would be nice as well to include some dummy data or seed data i can use for testing this application."

### Analysis
- **Strengths:** Good pivot to planning; explicitly requests test data.
- **Weaknesses:** "Remaining next steps" relies entirely on AI's context memory — risky in long sessions; no format specified for the plan; "some dummy data" is under-specified (how many records? which tables?).
- **Risk:** AI produces a vague list rather than an actionable checklist; test data doesn't match the schema constraints.

### Improved Prompt (TCREI)

**[T]ask:** Write a sprint-ready implementation plan for all remaining un-wired pages and generate a SQL seed migration for comprehensive test data.

**[C]ontext:** Completed so far: Auth (sign-in, sign-up), Event Creation Wizard (step-1, step-2, step-3), and Event Detail page. Remaining un-wired: `index.html` (discovery feed), `pages/dashboards/organizer.html`, `pages/dashboards/user.html`, `pages/attendee-rsvp.html`, `pages/university-profile.html`. The Supabase schema has: `events`, `organizers`, `universities`, `venues`, `event_categories`, `rsvps`, `bookmarks`, `follows`.

**[R]ole:** You are a Technical Lead organizing a focused implementation sprint for a web product.

**[E]xamples:**
- Plan format: each page as a checklist (`- [ ] Wire event feed`, `- [ ] Implement category filter`, etc.).
- Test data: 5 realistic tech/academic events spanning different categories, 3 organizers (university club, faculty, external NGO), 2 venues, seeded RSVPs and bookmarks for a test user account.

**[I]nstructions:** Output the plan as a prioritized markdown checklist grouped by page. Include the SQL seed script as a code block within the plan. Seed data must respect all foreign key constraints (reference real `university_id`s from the universities seed). After the plan is written, execute the test data seed migration via Supabase MCP `apply_migration` with name `seed_test_data`. Do not execute any page wiring until the plan is approved.

---

## P14 — Infrastructure Diagnostics: Supabase MCP

*Added in current session*

### Original Prompt
> "analyze the issue with supabase mcp and suggest me a plan to resolve it."

### Analysis
- **Strengths:** Clear intent (diagnose then plan); doesn't ask for a fix to be applied immediately — just analysis and a plan.
- **Weaknesses:** No context about what symptoms are being observed; no pointer to where the config lives; "the issue" assumes the AI already knows there is one — it requires investigation first; no success criteria for what "resolved" means.
- **Risk:** AI guesses the wrong problem (e.g., assumes a network issue when the actual problem is missing auth headers), wastes turns on wrong diagnosis.

### Improved Prompt (TCREI)

**[T]ask:** Diagnose the Supabase MCP server configuration issue in this VS Code workspace and produce a step-by-step remediation plan with the exact config changes needed.

**[C]ontext:** The Supabase MCP entry is defined in the VS Code user config file (`mcp.json`, typically found in the VS Code User folder on your OS). The MCP server type is `http` pointing to `https://mcp.supabase.com/mcp`. VS Code Copilot is failing to connect to it. No authentication headers are configured. The Supabase remote MCP server requires a Bearer token (Personal Access Token) for all requests.

**[R]ole:** You are a Senior DevOps Engineer experienced with VS Code MCP server configuration and Supabase authentication.

**[E]xamples:**
- The correct config structure adds a `headers` object with `Authorization: Bearer <token>`.
- To avoid storing the token in plaintext, use VS Code's `inputs` mechanism with `type: promptString` and `password: true`.

**[I]nstructions:** First, read and quote the current broken config entry. Identify the root cause with a one-line diagnosis. Then provide: (1) the exact corrected JSON block to replace the broken entry, (2) the `inputs` array addition needed, (3) steps to obtain a Supabase PAT from the dashboard, and (4) how to restart the MCP server in VS Code after the fix. Do not apply the fix automatically — present it for review first.

---

## P15 — Prompt Engineering Documentation

*Added in current session*

### Original Prompt
> "analyze all the prompts and all the tasks you have implemented in this session for this project, help me document the prompts used and improve them for better output. and generate a prompt document as .md file in the docs folder. Use TCREI prompting framework."

### Analysis
- **Strengths:** Clear deliverable (a `.md` file in `docs/`); names the framework (TCREI); combines analysis + documentation + improvement in one request; explicitly requests the output location.
- **Weaknesses:** "All the prompts and tasks from this session" relies on session memory — if the store is empty, the AI must reconstruct from workspace artifacts; no structure specified for the document (index? sections by area? chronological?); "improve them" is undefined — improve for what outcome?
- **Risk:** AI produces a shallow list of prompts without critical analysis; framework is applied inconsistently; document is not maintainable (no index, no versioning, no ownership of what "improved" means in context).

### Improved Prompt (TCREI)

**[T]ask:** Audit every prompt used across all development phases of the Rwanda Academic Hub project, document each with an analysis, and write an improved TCREI version. Save the result as `docs/prompts.md`.

**[C]ontext:** The project is a static HTML/Tailwind + Supabase platform. The workspace contains artifact evidence of ~15 distinct prompt types: product planning docs, a design system, 10+ HTML pages, a JS interactivity module, a Supabase schema migration, seed data, a frontend-backend integration layer, an implementation roadmap, and infrastructure diagnostics. The session store may be empty — reconstruct prompts from workspace file evidence where needed.

**[R]ole:** You are a Prompt Engineer and Technical Writer documenting AI-assisted development workflows for a software team.

**[E]xamples:**
- For each prompt: show the Original (verbatim or reconstructed), an Analysis (strengths, weaknesses, failure risks), and an Improved version structured as `[T]`, `[C]`, `[R]`, `[E]`, `[I]` blocks.
- Include a Prompt Index table at the top with: prompt number, area, and status (Refined / New).
- Group prompts by domain: Product, Design, Frontend, Data, DevOps.

**[I]nstructions:** Use TCREI where T=Task, C=Context, R=Role, E=Examples, I=Instructions. Every prompt must have all five components filled. Improvements should be reusable — written so another developer could copy-paste and get a high-quality output without modification. Add a framework legend at the top of the document. Do not omit any prompt area that has a corresponding artifact in the workspace.

---

## Prompt Quality Checklist

Use this checklist before submitting any prompt on this project:

- [ ] **Task is atomic** — one deliverable per prompt, not "build everything"
- [ ] **Context references the design system** — colors, fonts, and tokens are named
- [ ] **Role is assigned** — the AI has an expert persona to maintain
- [ ] **Examples are concrete** — at least one field name, color hex, or file path given
- [ ] **Instructions include a review gate** — "present X for approval before executing Y" for destructive or irreversible actions
- [ ] **Scope is bounded** — the prompt names specific files or pages, not "the frontend"
- [ ] **Data attributes are specified** — for JS hookup prompts, `data-*` contracts are declared upfront
- [ ] **Security is addressed** — credentials, RLS policies, and API keys are handled explicitly

---

*Document version: 2.0*  
*Framework: TCREI (Task · Context · Role · Examples · Instructions)*



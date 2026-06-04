---
name: Rwanda Academic Hub Design System
version: "1.0"
platform: web-first, mobile-responsive
stitch-target: true

# ─────────────────────────────────────────────
# 60-30-10 COLOR SYSTEM
# ─────────────────────────────────────────────
# 60% — Dominant: soft sage-white discovery canvas
# 30% — Secondary: deep Rwanda forest green (structural authority)
# 10% — Accent: warm academic amber-gold (action, trust, energy)

colors:
  # ── 60% Dominant: The Canvas ──────────────
  background:           '#F5F7F2'    # pale moss-white — every page background
  surface:              '#FFFFFF'    # pure white — card faces, modals, panels
  surface-elevated:     '#EEF2E8'    # light sage — input fills, hover washes, chip backgrounds
  surface-dim:          '#E4EAD8'    # medium sage — disabled states, skeleton loaders

  # ── 30% Secondary: The Structure ──────────
  primary:              '#1A3D2B'    # deep Rwanda forest green — nav, headers, footers, section anchors
  primary-dark:         '#0F2318'    # near-black forest — pressed states, deep text on light
  primary-mid:          '#2D6645'    # mid forest green — sidebar panels, tab bars, organizer badges
  primary-light:        '#4A8C63'    # bright forest — hover states, icon fills, secondary buttons

  # ── 10% Accent: The Energy ─────────────────
  accent:               '#E8A020'    # warm academic amber-gold — CTAs, verified badges, active tags
  accent-hover:         '#C98A18'    # deepened amber — button hover/pressed
  accent-light:         '#FDF3DC'    # pale amber wash — tag backgrounds, notification fills
  accent-on:            '#3B2800'    # dark brown — text placed on accent backgrounds

  # ── Semantic & Text ────────────────────────
  text-primary:         '#0F1E17'    # near-black forest — headings, body, primary labels
  text-secondary:       '#3D5A47'    # muted forest — supporting text, metadata, captions
  text-muted:           '#7A9383'    # soft sage-grey — placeholder text, timestamps, secondary labels
  text-on-dark:         '#EEF5EA'    # off-white — text placed on dark primary backgrounds
  text-on-accent:       '#3B2800'    # warm dark — text placed on amber accent

  # ── UI Structure ───────────────────────────
  border:               '#C8D9BE'    # sage outline — card borders, input strokes, dividers
  border-focus:         '#1A3D2B'    # primary green — focused input ring
  border-subtle:        '#E2EAD6'    # faint sage — inner dividers, row separators

  # ── Status Colors ──────────────────────────
  success:              '#2D7A4F'    # verified green — success messages, confirmed RSVPs
  success-bg:           '#D4F0E0'    # pale success wash — success banners
  warning:              '#D97706'    # amber warning — event conflicts, pending states
  warning-bg:           '#FEF3C7'    # pale warning wash
  error:                '#C53030'    # deep red — form errors, cancellations
  error-bg:             '#FEE2E2'    # pale red wash — error banners
  info:                 '#1D6FA8'    # clear blue — informational callouts, links
  info-bg:              '#DBEAFE'    # pale blue wash

  # ── Category Tag Colors (10 canonical categories) ──
  tag-workshop:         '#D1FAE5'    # mint — workshop events
  tag-seminar:          '#DBEAFE'    # sky blue — seminars, talks
  tag-career:           '#FDE68A'    # warm yellow — career fairs, job events
  tag-hackathon:        '#FCE7F3'    # soft pink — hackathons, competitions
  tag-research:         '#EDE9FE'    # lavender — research events
  tag-culture:          '#FFEDD5'    # peach — cultural and social events
  tag-sports:           '#D1FAE5'    # mint-green — sports
  tag-conference:       '#E0F2FE'    # light blue — conferences
  tag-scholarship:      '#FEF9C3'    # light gold — scholarship and exchange info
  tag-club:             '#F3E8FF'    # soft purple — club and association events

typography:
  # Display — reserved for event names and hero moments
  display-xl:
    fontFamily: DM Serif Display
    fontSize: 48px
    fontWeight: '400'       # serifs carry weight at this size
    lineHeight: '1.15'
    letterSpacing: -0.02em
    color: text-primary
  display-lg:
    fontFamily: DM Serif Display
    fontSize: 36px
    fontWeight: '400'
    lineHeight: '1.2'
    letterSpacing: -0.015em

  # Headlines — section titles, card titles, page headers
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: '1.25'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: '1.35'

  # Body — descriptions, paragraphs, detail text
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 17px
    fontWeight: '400'
    lineHeight: '1.65'
  body-base:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: '1.6'
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: '1.55'

  # Labels — metadata, tags, UI labels, filters
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: 0.02em
    textTransform: uppercase
  label-base:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.4'
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '500'
    lineHeight: '1.3'
    letterSpacing: 0.03em

  # Mobile overrides
  display-xl-mobile:
    fontSize: 32px
  headline-lg-mobile:
    fontSize: 22px

rounded:
  none: 0
  xs:   2px      # inner elements, icon chips
  sm:   6px      # tags, filter pills, small badges
  md:   10px     # cards, input fields, dropdowns
  lg:   16px     # elevated panels, modals, bottom sheets
  xl:   24px     # featured cards, hero panels
  full: 9999px   # buttons, avatar chips, circular badges

spacing:
  base:                   8px
  container-max:          1200px
  container-padding-sm:   16px    # mobile
  container-padding-md:   24px    # tablet
  container-padding-lg:   40px    # desktop
  gutter:                 20px
  card-padding:           20px
  section-gap-sm:         32px
  section-gap-md:         56px
  section-gap-lg:         80px
  stack-xs:               8px
  stack-sm:               12px
  stack-md:               20px
  stack-lg:               32px
  stack-xl:               48px

shadows:
  card:     '0 1px 3px rgba(15,30,23,0.08), 0 1px 2px rgba(15,30,23,0.06)'
  elevated: '0 4px 12px rgba(15,30,23,0.10), 0 2px 4px rgba(15,30,23,0.06)'
  modal:    '0 20px 48px rgba(15,30,23,0.18), 0 8px 16px rgba(15,30,23,0.10)'
  nav:      '0 2px 8px rgba(15,30,23,0.10)'
  badge:    '0 2px 4px rgba(232,160,32,0.35)'    # amber glow for verified badges

breakpoints:
  mobile:   375px
  tablet:   768px
  desktop:  1024px
  wide:     1280px
---

# Design Specification: Rwanda Academic Hub

---

## 1. Brand Personality

Rwanda Academic Hub feels like **the shared academic public square of Rwanda** — authoritative enough to be trusted by universities, open enough to welcome every student, and vibrant enough that discovering events feels exciting rather than administrative.

The visual language draws from three ideas:

1. **The Thousand Hills.** Rwanda's landscape — deep, layered, lush — gives us our dominant color story. The 30% structural color is a deep Rwanda forest green that anchors every screen with quiet institutional confidence.
2. **Academic warmth.** The 10% amber-gold accent carries the warmth of a seminar poster, a scholarship announcement printed on cream paper, or a faculty notice board. It signals "this matters — pay attention."
3. **Clarity for discovery.** The 60% background is a barely-tinted sage-white — spacious, calm, letting events and cards do the talking. It reads cleanly in bright Kigali sunlight on a phone screen.

The overall mood is: **trustworthy, cross-institutional, discoverable, and proudly Rwandan without being decorative.**

---

## 2. The 60-30-10 Color System Applied

### 60% — The Canvas
Every screen opens on `#F5F7F2`, a pale moss-white. This is the resting state. Card faces sit on pure white `#FFFFFF`, lifted just slightly off the background. Input fields use the light sage wash `#EEF2E8`. The eye never tires. The canvas never competes.

### 30% — The Structure
The deep Rwanda forest green `#1A3D2B` owns every structural surface: the top navigation bar, the sidebar, the footer, section anchor lines, the organizer profile header, and the verification badge rim. When you see deep green, you know you are looking at the platform's skeleton — not content, not accent, but structure. It communicates: *this is a serious, trustworthy institution.*

Supporting greens (`#2D6645` for panels, `#4A8C63` for secondary interactive states) create depth within the 30% tier without fragmenting the structure.

### 10% — The Energy
Warm amber `#E8A020` fires at moments of action and significance: the primary CTA button, the verified organizer badge, the "Featured" label on curated events, active filter chips, notification dots, and the RSVP confirmation state. It appears sparingly. When it appears, it means something. The pale amber wash `#FDF3DC` extends the accent into tag backgrounds and highlight panels without overwhelming the canvas.

---

## 3. Typography System

Two fonts drive the entire system:

**DM Serif Display** — reserved exclusively for event names in hero positions and large feature headers. Its contrast between thick and thin strokes carries a sense of occasion. An event named in DM Serif says: *this is worth your time.*

**Plus Jakarta Sans** — does everything else. Headlines, body copy, metadata, labels, buttons, navigation. It is a humanist geometric sans with slight warmth, reads beautifully at small sizes on screens, and has enough character to feel branded without being distracting.

**No third font.** The combination of one serif for display and one clean humanist sans for everything else is intentional. More fonts in an information-dense platform introduce noise.

---

## 4. Component Design Language

### Navigation Bar
A deep Rwanda green `#1A3D2B` bar spanning the full width. Left: the Rwanda Academic Hub wordmark in off-white with a small shield/hills icon. Center (desktop): five navigation links in `#EEF5EA` at 14px medium weight — Discover, Universities, Categories, Map, For Organizers. Right: search icon, notification bell with amber dot when active, and the user avatar or "Sign In" ghost button. On mobile: collapses to logo + hamburger. The nav casts a subtle shadow onto the background below, signaling it floats above content.

### Event Card
The core unit of the platform. White surface `#FFFFFF` with a 10px border radius, a 1px border in `#C8D9BE`, and the card shadow. Structure from top to bottom:

- **Banner strip** (optional): a 160px-tall image with a dark gradient scrim at the bottom. If no image, a solid swatch in the category's canonical color fills the space with the category name centered in white.
- **Category tag**: a small pill below the banner in the category background color (e.g., mint for workshops) with 12px semibold text.
- **Event title**: Plus Jakarta Sans 18px semibold, two-line clamp, `#0F1E17`.
- **Organizer line**: organizer name in 13px medium `#3D5A47`, with a small verified check in amber `#E8A020` if verified.
- **Date and location row**: calendar icon + date string, map pin icon + location — 13px regular `#7A9383`, inline.
- **Audience badge**: a subtle pill — "Open to All" in success green wash, or "UR Students Only" in info-blue wash.
- **Footer row**: save/bookmark icon (outline → filled on save, turns amber), and a "View Event" ghost button that becomes the primary amber CTA on hover.

Cards in grid layouts sit in three columns on desktop, two on tablet, one on mobile. Featured cards span two columns.

### Event Detail Page
Full-width hero: either a banner image with a bottom gradient scrim, or a clean deep-green hero panel with the event title in DM Serif Display white. Below the hero, two-column layout on desktop (content left 65%, sidebar right 35%). On mobile: stacked single column.

Left column: event title (DM Serif, 36px), organizer name with verified badge, description in body-lg, date/time block, location block (with embedded map tile), and tags row.

Right sidebar: a white elevated panel (`box-shadow: modal`) containing the RSVP or "Register" CTA (full-width amber button), capacity indicator if capped, organizer card with follow button, and a "Share Event" row with copy-link and social icons.

### Search Bar
Full-width on desktop, prominent in the hero zone of the discovery page. Pill-shaped (border-radius full), 52px tall, white surface with a 1.5px border in `#C8D9BE`. A search icon left-aligned inside, placeholder text "Search events, universities, topics..." in `#7A9383`. On focus, the border switches to primary green `#1A3D2B`. A "Search" amber-filled button sits attached at the right end.

### Filter Bar
A horizontally scrollable row of filter chips below the search bar. Each chip is a pill: `#EEF2E8` background, 1px `#C8D9BE` border, 13px medium text in `#3D5A47`. When active: `#1A3D2B` background, white text. A small "×" appears inside the active chip for removal. Categories shown as chips: All, Workshops, Seminars, Career, Hackathons, Research, Culture, Conferences, Clubs. An additional "More Filters" chip opens a slide-down filter panel.

### Organizer Profile Card
Compact card used in sidebars and search results. A left-aligned avatar (64px circle) showing the organizer's logo or initials monogram on a primary-light green background. Name in headline-sm, sub-label in label-base. A small amber shield-check icon and "Verified" label if verified. Institution name in body-sm muted. Followed count in muted text. A "Follow" button (outline style → filled on follow).

### University Badge
A compact branded tile: 80×80px rounded-xl square showing the university's crest or initial block in primary-mid green. University short name below in label-base. Used in the "Browse by University" horizontal scroll strip.

### Verified Badge
An amber `#E8A020` shield with a white checkmark, 16×16px, always appearing directly after the organizer name. A tooltip on hover reads "Verified by Rwanda Academic Hub." This badge is the platform's trust signal — it must never appear without the moderation layer approving it.

### CTA Button — Primary
Full rounded pill shape (border-radius: 9999px). Background: `#E8A020` amber. Text: 15px semibold `#3B2800` dark brown. Padding: 14px 28px. On hover: background deepens to `#C98A18`, transform translateY(-1px), shadow lifts. On press: background `#A87015`, translateY(0). Minimum width: 140px. Never white text on amber — always dark brown for contrast compliance (WCAG AA).

### CTA Button — Secondary
Pill shape. Transparent background. 1.5px border in `#1A3D2B`. Text: 15px semibold `#1A3D2B`. On hover: background fills to `#EEF2E8`, border remains. Used for "Save Event", "Follow", "View All" actions.

### CTA Button — Ghost (on dark)
Used inside the dark navigation and dark hero banners. Transparent background with a 1.5px off-white border. Text: off-white `#EEF5EA`. On hover: background fills to `rgba(238,245,234,0.15)`.

### Input Field
Height: 48px. Border: 1px `#C8D9BE`. Background: `#FFFFFF`. Border-radius: 10px. Label above in label-base muted. On focus: border becomes 2px `#1A3D2B`, subtle box-shadow `0 0 0 3px rgba(26,61,43,0.12)`. Helper text and error text below at body-sm.

### Category Tag Pill
Used on event cards and detail pages. Border-radius: sm (6px). Padding: 4px 10px. Background: the canonical category color (e.g., `#D1FAE5` for Workshop). Text: label-sm in a darker shade of the same hue. No border.

### Empty State
Centered illustration placeholder (120px svg illustration in primary-light green tones), headline-sm text in `#0F1E17`, body-sm text in muted, and a ghost CTA button. Used when no events match filters, a university has no upcoming events, or a user has no saved events.

### Toast Notification
Small pill with border-radius full, bottom-center positioned on mobile, bottom-right on desktop. White background, card shadow. Left: a colored dot (green for success, amber for warning, red for error). Text: body-sm in `#0F1E17`. Auto-dismisses after 4 seconds. Dismiss X on hover.

---

## 5. Page Layouts

### Discovery / Homepage
The landing experience for an anonymous visitor or a signed-in user browsing events.

**Hero Zone:** Full-width deep green `#1A3D2B` panel, 320px tall on desktop, 240px on mobile. Contains the search bar centered, the platform tagline in DM Serif Display off-white above it, and the filter chip row below it. A subtle pattern of thin overlapping circle arcs in `rgba(255,255,255,0.04)` gives texture without noise.

**Featured Kigali Strip:** Below the hero, a section title "Happening in Kigali" in headline-md with an amber accent underline. A 3-card horizontal scroll (or 3-column grid desktop) showing featured events. Featured cards are wider, display a full banner image, and have the amber "Featured" label.

**All Upcoming Events:** A 3-column card grid on desktop, 2-column on tablet, 1-column on mobile. Sorted by date ascending. Paginates at 18 cards. "Load More" button at bottom (secondary style).

**Browse by University:** A horizontal scrollable row of University Badge tiles below the first event grid. Title "Browse by University" in headline-sm.

**Browse by Category:** A 2×5 grid of category tiles on desktop. Each tile is a tall card with the category color as background, white category icon centered, and category name in headline-sm white. Clicking filters the discovery feed.

### Event Detail Page
Two-zone layout: hero banner (full-bleed) + content body (constrained to container-max 1200px).

Left content column: title, metadata strip (date, time, location, format, audience), organizer attribution, full description with rich text support, tags row.

Right sidebar (sticky on scroll): RSVP panel, capacity bar if capped, organizer mini-card, share tools.

Below the main content: "More Events by This Organizer" — a 3-card horizontal scroll. Then "Events You Might Like" — another 3-card horizontal scroll based on category match.

### Sign In / Sign Up
Centered split layout on desktop: left half is a full-height deep green panel with a large DM Serif Display headline, a short tagline, and a row of animated university logos floating in. Right half is the white form panel. On mobile: full-screen white with the green header shrinking to a branded top strip.

Sign Up form collects: full name, email, password, university affiliation (searchable dropdown), role (student / staff / organizer / visitor). A "Continue with Google" OAuth button sits above the form divider.

### User Dashboard (Signed-in)
Left sidebar (desktop only, 240px): user avatar, name, university, navigation links — My Saved Events, My RSVPs, Following, Settings. Collapses on tablet/mobile into a bottom tab bar.

Main content: "Your Upcoming Events" section showing RSVPed/saved events in a compact list view (date on left, event info right). "Recommended for You" card grid below. "New from Followed Organizers" card grid below that.

### Organizer Dashboard
Exclusive to verified organizers. Top stats bar: total events published, total RSVPs, total followers — each in a stat chip on a deep green band. Below: "My Events" table — event name, date, status (Draft / Published / Past), RSVP count, view count, actions (Edit, Archive). "Create New Event" is a prominent amber CTA fixed in the top-right of the dashboard.

### Create / Edit Event Form
Full-page form with a step indicator (Step 1 of 3) in the top bar. Step 1: Basic Info (title, category, description, date/time, location, event format, audience eligibility, max capacity). Step 2: Media (banner upload with crop tool, thumbnail, optional additional images). Step 3: Settings & Publish (visibility — draft / publish immediately / schedule, RSVP settings, external registration link, tags). Navigation: back/continue as ghost/primary button pair at the bottom.

### Organizer Profile Page
Full-width header panel in deep green, 200px tall. Organizer logo (80px circle, white border) floating half-over the panel bottom edge. Organizer name in DM Serif Display off-white. Institution tag and verified badge. Follow button (amber on dark header). Stats row: events count, followers count, established date.

Below header: tab bar — Upcoming Events / Past Events / About. Upcoming Events tab shows a 3-column card grid of the organizer's published upcoming events.

---

## 6. Animation & Interaction Principles

**Speed:** Micro-interactions are fast — 150ms for hover state transitions, 200ms for button presses. Larger transitions (panel open, modal appear) use 280ms with `cubic-bezier(0.4, 0, 0.2, 1)` (Material ease). Nothing drags.

**Card hover:** Cards lift — `transform: translateY(-2px)` + shadow deepens from card to elevated. Transition 200ms ease-out. The effect says *this is clickable* without shouting.

**Filter chips:** Active state flips background and text with a 150ms cross-fade. No jump, no bounce. Clean and immediate.

**Page transitions (SPA):** A thin 2px amber `#E8A020` progress bar sweeps across the top of the screen on route change. Arrives in under 400ms. This is the only amber element not in a specific component — its job is navigation feedback.

**RSVP confirmation:** When a user RSVPs, the button morphs from "RSVP" to a green checkmark + "Registered" state. A success toast appears bottom-center. The button width stays identical to prevent layout shift.

**Skeleton loading:** Cards render as skeleton placeholders (animated shimmer from `#EEF2E8` to `#E4EAD8` and back) before data loads. Shimmer direction is left-to-right. Duration: 1.4s loop.

**Empty state entrance:** The illustration and text fade in with a subtle `translateY(8px)` → `translateY(0)` at 300ms. Makes empty states feel intentional, not broken.

---

## 7. Responsive Behaviour

**Mobile-first philosophy.** All components are designed for 375px first, then expanded. The event card is single-column, full-width on mobile. Navigation collapses to a green bottom tab bar (5 tabs: Home, Search, Universities, Saved, Profile). The filter bar is horizontally scrollable, no wrap. The hero search bar shrinks to full-width, button becomes an icon.

**Tablet (768px+):** Two-column card grid. Top navigation replaces the bottom tab bar. Sidebar on the organizer dashboard collapses to icons-only.

**Desktop (1024px+):** Three-column card grid. Full navigation bar with labels. Two-column layout on event detail page. Sidebar expands to full labels on dashboard.

**Touch targets:** All interactive elements minimum 44×44px, per Apple HIG and Material guidance. Filter chips have a minimum 36px touch height with invisible padding. The RSVP button is always full-width on mobile.

---

## 8. Accessibility Standards

- All color pairs meet WCAG 2.1 AA contrast (4.5:1 for body text, 3:1 for large text).
- Primary green `#1A3D2B` on white `#FFFFFF` → 13.4:1 (AAA).
- Amber `#E8A020` with dark brown text `#3B2800` → 5.2:1 (AA).
- Off-white `#EEF5EA` text on primary green `#1A3D2B` → 10.8:1 (AAA).
- Focus rings: 2px solid `#1A3D2B` with 3px offset — always visible, never hidden.
- All icons carry aria-label. Category tags are not the sole indicator of category — text labels always present alongside color.
- Form inputs have visible labels above, never placeholder-only.
- Interactive elements are keyboard-navigable in logical DOM order.

---

## 9. Stitch Prompt Guidance

When using Google Stitch to generate screens for this project, use the following voice and phrasing conventions:

**For the discovery page:**
"A clean event discovery landing page for a cross-university academic platform in Rwanda. Deep forest green navigation bar, warm sage-white background, amber accent buttons. A prominent search bar in the hero zone. Horizontally scrollable category filter chips. Three-column card grid of upcoming events. Each card shows a category color banner, event title, organizer name with a verified amber badge, date, and a bookmark icon. The overall mood is trustworthy, open, and modern."

**For an event detail page:**
"An event detail page with a full-width deep green hero banner showing the event name in large serif white text. Below: a two-column layout — left side has description, organizer name with verified badge, date, location, and category tags. Right sidebar is a white elevated panel with a bold amber RSVP button, capacity indicator, and organizer mini-card. The page feels authoritative yet welcoming."

**For the sign-up page:**
"A split-screen sign-up page. Left half: a tall deep forest green panel with a large serif display headline in off-white and a subtle pattern of overlapping circles. Right half: a clean white form panel with input fields for name, email, password, university affiliation dropdown, and a 'Continue with Google' OAuth button. Soft, trustworthy, institutional."

**For an organizer profile:**
"An organizer profile page with a deep green full-width header. A circular logo floats half-over the bottom edge of the header. Below: a tab bar showing Upcoming Events, Past Events, About. Upcoming events display in a three-column card grid. The amber verified badge appears next to the organizer's name. Feels like a credible academic organization's public presence."

---

## 10. Design Do's and Don'ts

### Do
- Use DM Serif Display only for event names in hero positions and display headings.
- Pair the amber accent exclusively with primary action moments — CTAs, badges, active states.
- Let the deep green structure anchor every page with authority before introducing any accent.
- Keep cards uncluttered: title, organizer, date, one tag. Add more only on the detail page.
- Use the pale amber wash `#FDF3DC` for tag backgrounds and highlight panels, never the full amber.
- Maintain generous white space between card rows — the grid should breathe.

### Don't
- Do not use the amber accent on decorative or non-interactive elements.
- Do not use DM Serif Display for body text, labels, or navigation.
- Do not add more than two category tags on a single event card.
- Do not use more than three font weights on a single screen.
- Do not use colored backgrounds (other than sage-white) for full page backgrounds.
- Do not place white text on amber — always use the dark brown `#3B2800`.
- Do not use more than five category filter chips visible without scrolling on mobile.
- Do not add borders to buttons that already have a solid fill.

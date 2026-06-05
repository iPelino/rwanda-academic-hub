# Phase 3 — UI Design with Google Stitch
## Generating Professional App Designs from Text Descriptions

> **Phase goal:** Use AI to generate a complete visual design for your application — including color system, typography, and screen layouts — and export the HTML/CSS files ready to develop.
>
> **Why this matters:** Before writing a single line of production code, professional teams design how the app looks and feels. This phase ensures your app has a consistent visual identity and that you can see what you're building before you build it. With AI design tools, you can do in hours what used to take designers days.

---

## What Is Google Stitch?

Google Stitch ([stitch.withgoogle.com](https://stitch.withgoogle.com)) is an AI-powered UI design tool that generates complete, multi-screen application mockups from text descriptions. Unlike Figma or other design tools where you drag elements around manually, Stitch generates entire design systems and screen layouts from natural language.

> **URL note:** You may also see Stitch referenced as `labs.google/stitch` — that link still works but redirects to `stitch.withgoogle.com`, which is the current address.

**What Stitch produces:**
- A complete design system (colors, typography, spacing, shadows)
- Multiple screen layouts for your app
- Exportable HTML/CSS code you can open directly in a code editor
- A `DESIGN.md` file capturing all your design decisions

**Why use Stitch before coding?**
- You can see your app before spending hours coding it
- It generates consistent, professional design from the start
- The exported files give you a real HTML/CSS foundation to build on
- You can iterate on the visual design in minutes before committing to code

---

## Step 1 — Prepare Your Design Brief Using TCREI

Before going to Stitch, you need to write a design brief. This is a structured description of what your app should look and feel like.

You will use an AI assistant (Claude, ChatGPT, or Gemini) to generate a `design.md` file from your description. This file is then fed into Stitch.

### The Design Brief Prompt (TCREI format)

Use this exact prompt structure, filling in your project details:

```
[T]ask: Design a complete design system for [YOUR APP NAME] and generate it
as a docs/design.md file in YAML front-matter format compatible with
Google Stitch. Include all colors, fonts, spacing, and a Tailwind CSS
config block ready to paste. Add inline comments explaining every design decision.

[C]ontext: The platform is called "[YOUR APP NAME]". It should feel
[DESCRIBE THE MOOD — e.g., trustworthy and academic / friendly and modern /
bold and energetic]. The main color palette should use [DESCRIBE COLORS —
e.g., deep greens and warm amber / cool blues and whites / earth tones].
Follow the 60-30-10 color rule: [60% BACKGROUND COLOR] for backgrounds,
[30% STRUCTURE COLOR] for navbars and structure, [10% ACCENT COLOR] for
buttons and highlights.

[R]ole: You are a Senior UI/UX Designer specializing in Tailwind CSS and
consumer web applications.

[E]xamples:
- Primary color: [HEX or description] — used for navbars, buttons, brand elements
- Accent color: [HEX or description] — used for CTAs, badges, active states
- Font for headings: [FONT NAME or "a serif font that feels editorial and trustworthy"]
- Font for body: [FONT NAME or "a clean, modern sans-serif"]
- Background: light and airy, not pure white

[I]nstructions: Include: full color palette with semantic names and hex values
(background, surface, primary, accent, text tiers, status colors);
typography scale (display through body); spacing tokens; shadow tokens;
and a rounded corners scale. Use YAML front-matter format.
Annotate every color with its intended use case inline.
Match the format exactly to a Google Stitch design.md file.
```

### Example — Rwanda Academic Hub Design Brief

Here is what the filled-in prompt looked like for the Rwanda Academic Hub project:

```
[T]ask: Design a complete design system for Rwanda Academic Hub and save it
as docs/design.md in YAML front-matter format compatible with Google Stitch,
with inline commentary explaining every decision.

[C]ontext: The platform is academic and pan-institutional. It must feel
trustworthy, clean, and welcoming — not corporate. Primary palette draws
from Rwanda's deep forest greens (national imagery, nature, prestige) with
an amber-gold accent (energy, action, warmth). The 60-30-10 color rule:
soft sage-white canvas (60%), forest green structure (30%),
amber-gold accents (10%).

[R]ole: You are a Senior UI/UX Designer specializing in Material Design 3
and academic SaaS products.

[E]xamples:
- Primary: #1A3D2B (deep Rwanda forest green) — navbars, headers, anchors
- Accent: #E8A020 (warm academic amber-gold) — CTAs, verified badges, active states
- Typography: DM Serif Display for headings (editorial), Plus Jakarta Sans for body
- Category tags: each with distinct pastel wash (mint, sky blue, warm yellow)

[I]nstructions: Include full color palette with semantic names and hex values;
typography scale; spacing tokens; component tone descriptions; Tailwind config block.
Annotate every color with its intended use case inline.
```

---

## Step 2 — Generate Your Design System File

1. Open your AI assistant (Claude at claude.ai, ChatGPT, or Gemini)
2. Paste your filled-in TCREI design brief prompt
3. The AI will generate a `design.md` file with YAML front-matter

**What to look for in the output:**
- A `colors:` section with semantic color names and hex values
- A `typography:` section with font families and size scales
- A `spacing:` section with spacing tokens
- A `shadows:` section
- A `rounded:` section for border radius values

**Save this file** as `docs/design.md` in your project folder (create the folder if it doesn't exist).

---

## Step 3 — Open Google Stitch

1. Go to [stitch.withgoogle.com](https://stitch.withgoogle.com) in your browser
2. Sign in with your Google account
3. Click **"New Project"**
4. You will see a text input asking you to describe your app

---

## Step 4 — Upload Your Design File to Stitch

The most important thing about working with Stitch is to **feed it your design.md file** so it uses your exact colors and fonts, not random ones.

**How to do this:**

**Option A — Paste the design.md content directly:**
1. Open your `docs/design.md` file in a text editor
2. Copy all the content
3. In the Stitch project description box, first paste your design.md content, then add your app description below it

**Option B — Describe your design in the Stitch prompt:**
If the direct paste doesn't work, describe your design system explicitly:

```
App name: [YOUR APP NAME]

Design system:
- Primary color: [HEX] (used for navigation, buttons, brand elements)
- Accent color: [HEX] (used for CTAs and highlights)
- Background: [HEX] (soft light background)
- Heading font: [FONT NAME]
- Body font: [FONT NAME]
- Corner radius: [e.g., 8px for cards, 24px for buttons]

App description:
[PASTE YOUR ONE-SENTENCE APP DESCRIPTION FROM PHASE 1]

Screens to generate:
1. [SCREEN 1 NAME — e.g., Homepage / Discovery Feed]
2. [SCREEN 2 NAME — e.g., Sign In Page]
3. [SCREEN 3 NAME — e.g., Item Detail Page]
4. [SCREEN 4 NAME — e.g., User Dashboard]
```

---

## Step 5 — Describe Your Screens

Tell Stitch which screens to generate. Here are the recommended screens for most apps:

**For an event/listing discovery app:**
1. Homepage / Discovery Feed (main browsing page)
2. Sign In page
3. Sign Up page
4. Item/Event Detail page
5. User Dashboard
6. Create/Submit form

**For a jobs board:**
1. Homepage with job listings
2. Job Detail page
3. Sign In / Sign Up
4. Employer Dashboard

**For a community app:**
1. Feed/Homepage
2. Profile page
3. Create Post page
4. Sign In / Sign Up

**Example Stitch prompt for Rwanda Academic Hub:**
```
Create an academic event discovery platform called "Rwanda Academic Hub"
with a forest green (#1A3D2B) primary color and amber gold (#E8A020) accent.
Background should be a soft sage white. Use DM Serif Display for headings
and Plus Jakarta Sans for body text.

Generate these screens:
1. Discovery homepage with event cards in a grid, filter chips at top,
   hero section, and a sticky navigation bar
2. Sign in page — centered card, email/password form
3. Event detail page — banner image, two-column layout with sidebar for RSVP
4. Organizer dashboard — sidebar navigation, events table, stats row
```

---

## Step 6 — Iterate on the Design

Stitch allows you to refine generated screens with follow-up prompts. Use this to:

- Change a color that doesn't look right: "Make the navbar darker green"
- Adjust a layout: "Move the filters above the hero section"
- Add a missing element: "Add a search bar to the homepage"
- Change the style: "Make the cards more rounded and add a subtle shadow"

**Tip:** Don't try to get everything perfect in Stitch. The goal is a good starting point, not a pixel-perfect design. You will refine in code.

---

## Step 7 — Export Your Design Files

When you are happy with your screens, export the project:

### Option A — Export as ZIP (Recommended for most learners)

1. Click the **Export** button in the top right of Stitch
2. Select **"Download ZIP"**
3. This downloads a `.zip` file containing:
   - An `index.html` file for each screen
   - A `styles.css` or Tailwind-based styling file
   - Any assets (images, icons) used in the design

**This ZIP file is what you open in your code editor in Phase 4.**

### Option B — Export to Google AI Studio (Advanced)

This option is for learners who want to generate React/TypeScript (TSX) components instead of plain HTML.

1. In Stitch, click **Export to AI Studio**
2. This opens Google AI Studio with your designs as context
3. In AI Studio, you can prompt Gemini to generate React TSX components from the design
4. Use this if you are comfortable with React and want component-based code

**When to use this option:**
- You already know React basics
- You want to continue the project as a React application
- You want more sophisticated component-based code

**Stick with the ZIP export** if you are new to web development — plain HTML is easier to understand, modify, and debug.

---

## Step 8 — Inspect Your Exported Files

Before moving on, open your ZIP file and check what's inside:

1. Open the ZIP file on your computer
2. You should see HTML files (one per screen), a CSS or styles file, and possibly an assets folder
3. Open the `index.html` in a browser (just double-click it) to confirm it looks like your design

**What you'll notice:**
- The HTML uses class names and structure from Tailwind CSS
- The colors match what you specified in Stitch
- The layout and typography reflect your design brief

---

## Understanding What Was Generated

The exported HTML from Stitch is a **static UI prototype** — it looks correct but doesn't have real data or real interactions yet. Think of it as:

- A house that looks complete from the outside but has no electricity or plumbing yet
- The walls, windows, and rooms are all in the right place
- In later phases, you will add the wiring (JavaScript), the plumbing (database), and the power (backend)

---

## Design Tips for Your Project

**Colors:** Stick to 2–3 main colors max. Use one for structure (navbars, headers), one as an accent for buttons and highlights, and a neutral for backgrounds.

**Typography:** Use one serif or display font for headings (it gives personality) and one clean sans-serif for body text. Google Fonts has excellent free options: Inter, Plus Jakarta Sans, DM Sans, Nunito for body; DM Serif Display, Playfair Display, Merriweather for headings.

**Spacing:** More whitespace almost always looks better. If your design feels crowded, add more padding.

**Cards:** Cards work great for displaying a list of things. Keep card content consistent — if one card has an image, all cards should have an image.

**Mobile first:** Design thinking about how it looks on a phone. A good mobile design scales up well to desktop; a desktop-only design usually breaks on mobile.

---

## Checklist — You Are Ready to Move to Phase 4 When:

- [ ] You have generated a `docs/design.md` file with your design system
- [ ] You have created a Stitch project with at least 3 screens
- [ ] You have exported your project as a ZIP file
- [ ] You have opened the exported HTML in a browser and it looks like your design
- [ ] You understand that this is a visual prototype, not yet functional code

---

## Common Mistakes to Avoid

**Skipping the design.md file.** If you don't feed Stitch your colors and fonts, it will invent random ones. Always specify your design system.

**Trying to make Stitch produce pixel-perfect code.** Stitch is for design exploration, not production code. Expect to modify the output significantly.

**Exporting too early.** Spend time iterating in Stitch with follow-up prompts before exporting. Changes in Stitch take seconds; changes in code take much longer.

**Generating too many screens.** Focus on your 3–5 core screens. You can always generate more later. The homepage, auth pages, and one core feature page are enough to start.

---

*Next: [Phase 4 — Opening Your Project in an IDE](04-OPENING-PROJECT-IN-IDE.md)*

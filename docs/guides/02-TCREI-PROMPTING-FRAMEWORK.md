# Phase 2 — The TCREI Prompting Framework
## Google's 5-Step Method for Getting Professional Results from AI

> **Phase goal:** Learn and apply the TCREI prompting framework — the structured, iterative approach developed by Google that you will use in every phase of this course.
>
> **Why this matters:** The quality of what an AI produces depends almost entirely on the quality of your prompt and how you respond to the output. TCREI gives you a repeatable system for both — writing better prompts AND refining them until the result is right.

---

## Where TCREI Comes From

TCREI is a prompting framework developed by **Google**, taught as part of the Google Career Certificates Prompting Essentials curriculum. It stands for:

**Task · Context · References · Evaluate · Iterate**

It is sometimes described as "Thoughtfully Create Really Excellent Inputs" — a reminder that good prompting is deliberate, not rushed.

---

## Why Most People Get Bad AI Results

Here is what happens when you give AI a vague, unstructured prompt:

**Vague prompt:**
> "build me a homepage for my events app"

**What AI does:**
- Guesses what "homepage" means to you
- Invents colors, fonts, and layout from its training data
- Misses features you care about
- Produces something you have to spend hours rewriting

**TCREI prompt for the same task:**
> "Build `index.html` for Rwanda Academic Hub. It must show a discovery feed of upcoming academic events in a card grid, with filter chips (All / Workshop / Seminar / Hackathon), a hero section with a search bar, and a sticky navbar. Output a standalone HTML file using Tailwind CSS via CDN. No JavaScript in this file. Use forest green #1A3D2B as primary color, amber #E8A020 for CTAs. Event cards should show: banner image, category badge, title, organizer name, date, and location. Mobile-first. All clickable elements need `data-*` attributes for JS hookup. Reference the design system in docs/design.md for exact tokens."

**The result:** A professional, on-brand page that matches your vision in the first attempt.

The difference is TCREI.

---

## How TCREI Works

TCREI is a **two-part system**:

```
┌──────────────────────────────────────────────────┐
│              PART 1: THE PROMPT                  │
│                                                  │
│  [T]  Task       — What you want + format        │
│  [C]  Context    — Background + constraints      │
│  [R]  References — Examples, role, tone          │
│                                                  │
└──────────────────────────────────────────────────┘
                       ↓ Send prompt
                       ↓ AI responds
┌──────────────────────────────────────────────────┐
│           PART 2: THE FEEDBACK LOOP              │
│                                                  │
│  [E]  Evaluate   — Judge the output              │
│  [I]  Iterate    — Refine and re-prompt          │
│                                                  │
└──────────────────────────────────────────────────┘
```

The first three letters (T, C, R) go **into your prompt**. The last two (E, I) are what you do **after you get a response**. TCREI is not a one-shot process — it is a loop.

---

## Component 1 — Task (T)

The Task is the most important component. It tells the AI **exactly what to produce**.

A good Task includes:
- **The specific deliverable** — name the exact file, page, or document
- **The persona** — what expertise should the AI draw from?
- **The output format** — file type, length, structure

**Weak Task:**
> "Help me with the frontend"

**Strong Task:**
> "Build `pages/auth/sign-in.html` — a branded sign-in page for Rwanda Academic Hub as a standalone HTML file using Tailwind CSS via CDN. You are a Senior Frontend Engineer who prioritizes accessible, conversion-optimized forms. Output a complete, production-ready HTML file."

Notice that the **persona** ("Senior Frontend Engineer") goes in the Task — it is part of describing what kind of output you expect, not a separate element.

---

## Component 2 — Context (C)

Context is the background information the AI needs to avoid making wrong assumptions. It answers: *"What does the AI need to know so it doesn't invent things I haven't decided?"*

Good Context includes:
- Your app's name and what it does
- Design decisions already made (colors, fonts, design tokens)
- What already exists in the project
- Your tech stack and any constraints

**Weak Context:**
> "It's a web app"

**Strong Context:**
> "The platform is Rwanda Academic Hub — a cross-university event discovery platform. It uses Tailwind CSS via CDN (no build tools). Primary color: forest green #1A3D2B. Accent: amber #E8A020. Background: sage-white #F5F7F2. Typography: DM Serif Display for headings, Plus Jakarta Sans for body (both loaded from Google Fonts). The design system is already defined in docs/design.md."

---

## Component 3 — References (R)

References are anything you give the AI to guide the style, structure, and quality of its output. This is the most flexible component — use it for:

- **Concrete examples** of what the output should contain or look like
- **Role/persona specifics** — what a professional in this field would do
- **Tone guides** — how formal, how technical, what vocabulary to use
- **Format benchmarks** — existing code, past designs, or real-world examples to emulate

**Weak References:**
> "Something like a search bar and some cards"

**Strong References:**
> "Event cards should show: a banner image thumbnail, a color-coded category badge (green for Workshop, amber for Career Fair, blue for Research), the event title in headline-sm, the organizer name with a verified checkmark icon (Material Symbol `verified`) next to it, the date/time in body-sm, and a bookmark icon with `data-bookmark` attribute in the top-right corner of the card.
> For reference: look at how Eventbrite.com shows event cards — the same information hierarchy, but using our forest green and amber palette instead."

---

## Component 4 — Evaluate (E)

After the AI responds, you **evaluate the output** before using it. This is where your expertise matters most. The AI produces a first draft; you decide if it's right.

Ask yourself:
- Does this actually match what I described in T, C, R?
- Is the design consistent with my other pages?
- Are there any missing features I specified?
- Are there errors or things that don't make sense?
- Would a real user find this acceptable?

**What to look for specifically:**

| Check | What to look for |
|-------|-----------------|
| Visual | Open in browser. Does it look right on desktop and mobile? |
| Completeness | Are all required elements present? |
| Correctness | Do links work? Are class names real Tailwind classes? |
| Consistency | Does it match the style of your other pages? |
| Security | Are any credentials, API keys, or secrets visible in the code? |

**The review gate** — for database changes or irreversible actions, always build evaluation into your prompt itself:
> "Show me the full schema first and wait for my explicit approval before creating anything."

---

## Component 5 — Iterate (I)

If the output is 70-80% right, don't start over. **Build on it with a follow-up prompt.** Prompting is a conversation, not a one-shot transaction.

Iteration is most effective when you:
- Target one specific problem at a time
- Reference exactly what's wrong ("the card grid has too much gap on mobile — reduce to gap-3 below md breakpoint")
- Approve what's working ("the navbar looks great — keep that and only change the card layout")

**Examples of iterative follow-up prompts:**

*Fixing a layout issue:*
> "The event cards overlap when the screen width is between 640px and 768px. Fix the grid so it stays at 1 column below md breakpoint and switches to 2 columns at md."

*Adding something missing:*
> "The sign-up page is missing the university affiliation dropdown. Add a `<select>` field after the password fields with options: [list]. Give it id="university" and a matching label."

*Refining the style:*
> "The category badges need to be more visually distinct. Use these colors instead: Workshop = bg-emerald-100 text-emerald-800, Career Fair = bg-amber-100 text-amber-800, Research = bg-blue-100 text-blue-800."

**The 70% Rule:** If the output is less than 70% right, your original prompt probably lacked important Task, Context, or References. Rewrite the prompt from scratch rather than trying to patch a fundamentally misaligned result.

---

## Putting It All Together — A Full TCREI Example

Here is a complete TCREI prompt for a sign-up page, showing how T, C, R work together, followed by the E and I steps after the response.

### The Prompt (T + C + R)

```
[T]ask:
Build pages/auth/sign-up.html — a branded registration page for Rwanda Academic Hub
as a standalone HTML file using Tailwind CSS via CDN.
You are a Senior Frontend Engineer who prioritizes accessible,
conversion-optimized registration forms.
Output format: complete, production-ready HTML file with Tailwind CDN linked.

[C]ontext:
Platform: Rwanda Academic Hub (cross-university event discovery for Rwanda).
Colors: forest green #1A3D2B (primary), amber #E8A020 (hover/accent),
sage-white #F5F7F2 (page background).
Font: DM Serif Display (headings, from Google Fonts), Plus Jakarta Sans (body, from Google Fonts).
This page links to pages/auth/sign-in.html for existing users.
No JavaScript logic in this file — structure only.

[R]eferences:
Fields to collect: Full Name, Email, Password, Confirm Password,
University Affiliation (select dropdown — pre-populate with 10 major Rwandan universities).
Layout reference: centered card (max-width 420px) on the page background,
with the platform wordmark at the top.
Primary "Create Account" button: forest green with amber hover.
"Continue with Google" secondary button: outlined, no fill.
Error state: red left border + small error message below the field.
Password field: eye-icon toggle button with data-toggle-password="passwordInputId".
All inputs must have matching <label> elements.
Error containers need aria-describedby on the input for accessibility.
At the bottom: "Already have an account? Sign in" linking to sign-in.html.
```

### After the Response — Evaluate (E)

Run through these checks on the generated page:

- [ ] Open in browser — does the card layout center correctly?
- [ ] Does it use forest green and amber, not random colors?
- [ ] Are all 5 fields present (Name, Email, Password, Confirm Password, University)?
- [ ] Does the university dropdown have real Rwandan universities?
- [ ] Is the Google OAuth button clearly secondary (outlined)?
- [ ] Does the password eye toggle have the `data-toggle-password` attribute?
- [ ] Do all inputs have `<label>` elements?
- [ ] Is there a link to sign-in.html?

### Iterate (I) — Example Follow-Up

Suppose the university dropdown only has 3 options instead of 10:

> "The university dropdown only has 3 options. Add all of these: University of Rwanda, African Leadership University, Carnegie Mellon University Africa, Kigali Independent University, University of Tourism, Technology and Business Studies, INES-Ruhengeri, Mount Kenya University Rwanda, Adventist University of Central Africa, University of Kigali, AUCA. Keep everything else the same."

---

## TCREI Quick Reference Card

```
┌──────────────────────────────────────────────────────────────┐
│                   TCREI Quick Reference                       │
├──────┬────────────────────────────────────────────────────── │
│  T   │ TASK — What to build + persona + output format        │
│  C   │ CONTEXT — Background, constraints, existing files     │
│  R   │ REFERENCES — Examples, role, tone, format guides      │
├──────┴────────────────────────────────────────────────────── │
│         ↓  Send the prompt  ↓  Get the response              │
├──────┬────────────────────────────────────────────────────── │
│  E   │ EVALUATE — Does the output match what you needed?     │
│  I   │ ITERATE — Follow up to fix and refine specifics       │
└──────┴──────────────────────────────────────────────────────┘
```

---

## Prompt Quality Checklist

Before sending any prompt (takes 30 seconds):

- [ ] **Task is atomic** — one deliverable per prompt, not "build everything"
- [ ] **Persona is specified** — what kind of expert should the AI be?
- [ ] **Context includes your design** — colors, fonts, and tech stack named
- [ ] **References are concrete** — at least one real field name, hex code, or file path
- [ ] **Review gate included** — for database or irreversible actions: "show me first, wait for approval"
- [ ] **Scope is bounded** — specific file names, not "the frontend"
- [ ] **Data attributes specified** — for JS prompts: how does JavaScript find elements?
- [ ] **No secrets** — credentials go in config files, never in HTML

**Score:** 8/8 = strong prompt. Below 6 = rewrite before sending.

---

## Practice Exercises

### Exercise 1 — Diagnose These Prompts

For each prompt below, identify which TCREI components are missing or weak:

1. `"Build me a dashboard"` — Missing: ___
2. `"You are a database expert. Create my schema."` — Missing: ___
3. `"Build index.html for FoodieSpot using Tailwind CSS via CDN, no frameworks. Mobile-first. Include search bar, filter chips, and restaurant cards showing photo, name, rating, neighborhood."` — Missing: ___

**Answers:**
1. Missing T (no file name, no persona, no format), C (no design), R (no examples of what the dashboard shows), no review gate for data operations
2. Missing T specifics (no file, no format preference), C (no app context, no data model), R (no examples of tables/columns expected), no review gate — dangerous!
3. Missing C (no color/font context), R (no persona, no reference examples of card content, no format spec for icons or links)

### Exercise 2 — Write Your First TCREI Prompt

Fill in the blanks for your project's homepage:

```
[T]ask: Build [FILENAME] — the [PAGE NAME] for [YOUR APP NAME] as a
standalone HTML file using Tailwind CSS via CDN.
You are a [EXPERT ROLE — e.g., Senior Frontend Engineer with strong UI/UX instincts].
Output: [FORMAT — complete HTML file, Tailwind via CDN, no JavaScript].

[C]ontext: [YOUR APP NAME] is [ONE SENTENCE DESCRIPTION].
Primary color: [HEX]. Accent: [HEX]. Background: [HEX].
Font: [HEADING FONT] for headings, [BODY FONT] for body.
[ANY OTHER CONSTRAINTS — no build tools, mobile-first, etc.]

[R]eferences:
- [DESCRIBE YOUR HERO SECTION in 1 sentence]
- [DESCRIBE YOUR MAIN CONTENT AREA — what each card/item shows]
- [DESCRIBE ONE INTERACTIVE ELEMENT — what attribute it should have]
- [NAME A REAL-WORLD APP with similar layout to reference]
```

After generating: run your Evaluate checklist. Then Iterate on anything that doesn't match.

---

## How You Will Use TCREI in the Rest of This Course

Every time you ask AI to build something — a page, a database schema, a JavaScript module, a deployment — you will use T, C, R to write the prompt, then E and I to refine the output. By Phase 9, you will have used this loop 15–20 times and it will feel natural.

The templates in each guide are pre-structured with [T], [C], and [R] blocks. Fill them in, send them, evaluate the result, and iterate.

---

*Next: [Phase 3 — UI Design with Google Stitch](03-UI-DESIGN-WITH-STITCH.md)*

# Phase 1 — Ideation & Planning
## Defining Your App: What It Is, Who It's For, and What It Does

> **Phase goal:** By the end of this phase, you will have a clear, written definition of your app — its purpose, its users, and its core features — ready to feed into every tool you use in the rest of the course.
>
> **Why this matters:** Every decision you make later — the design, the database, the pages you build — flows from this foundation. A vague idea produces a vague app. A well-defined concept produces focused, coherent work.

---

## Why Planning Before Coding Is Essential

One of the most common mistakes new developers make is jumping straight into building before they understand what they are building. This leads to:

- Pages that don't connect logically
- Features that conflict with each other
- Databases that need to be redesigned halfway through
- An app that no one wants to use because it doesn't solve a real problem

Professional product teams spend significant time on planning before writing a single line of code. In this phase, you will do the same — but you will use AI to help you think it through, not just to generate documents.

---

## Step 1 — Start With a Real Problem

The best apps solve a real problem that real people have. Start by answering this question:

> **"What frustrates people in my community that a web app could help with?"**

Examples of problems that became real apps:
- "Events at our university never reach students at other universities" → Rwanda Academic Hub
- "I can't find good local restaurants unless I ask on WhatsApp" → A restaurant discovery app
- "Job listings are scattered across Facebook groups and websites" → A local jobs board
- "Students waste time looking for study group partners" → A study-group matching app

**Exercise:** Write down 3 problems you have noticed in your school, community, or daily life. Then pick the one that feels most important or interesting to you.

---

## Step 2 — Define Your App in One Sentence

Once you have your problem, write one sentence that describes your solution:

**Template:**
> "[App Name] is a [type of platform] that helps [who] to [do what] instead of [current painful way].

**Example (Rwanda Academic Hub):**
> "Rwanda Academic Hub is a shared event discovery platform that helps students, lecturers, and clubs discover and publish academic events across Rwandan universities instead of relying on isolated WhatsApp groups and campus notice boards."

**Your turn:** Write your one-sentence description here before moving on.

---

## Step 3 — Identify Your Users

Every app has different types of users who need different things. These are called **user personas**.

Ask yourself: "Who are the different types of people who will use my app, and what does each type need?"

**Example — Rwanda Academic Hub personas:**

| Persona | Who They Are | What They Need |
|---------|-------------|----------------|
| Student | University student in Rwanda | Discover events, RSVP, save events |
| Lecturer | Academic staff member | Promote events, reach wider audience |
| Club Organizer | Student club leader | Publish events, track attendance |
| University Admin | Institution representative | Manage institutional profile |
| External Partner | NGO, startup, community org | Reach academic audiences |

**Exercise:** List 2–4 types of users for your app. For each, write one sentence about what they need.

---

## Step 4 — List Your Core Features

Now list the specific features your app needs. Keep it focused — a feature is something specific a user can *do*:

**Template for each feature:**
> "As a [user type], I can [do something specific]."

**Example (Rwanda Academic Hub):**
- As a student, I can browse a feed of upcoming academic events
- As a student, I can filter events by university, city, or category
- As a club organizer, I can create and publish an event with a banner image
- As any user, I can save events to my personal list
- As a club organizer, I can see how many people RSVP'd to my event

**Exercise:** Write at least 5–8 features for your app. These become your build checklist.

---

## Step 5 — Define Your MVP (Minimum Viable Product)

You cannot build everything at once. An **MVP** is the smallest version of your app that still delivers real value to users.

**Rule of thumb:** If you had one week, what 3–5 features would make the app actually useful?

**Example — Rwanda Academic Hub MVP:**
1. Browse and search published events
2. Event detail page with full information
3. User accounts (sign up / sign in)
4. Organizer can create and publish an event
5. Save / bookmark an event

Everything else (notifications, analytics, moderation dashboards) is Phase 2.

**Exercise:** Circle the 3–5 features from your list that form your MVP.

---

## Step 6 — Use AI to Sharpen Your Plan

Now that you have a rough plan, use an AI tool (Claude, ChatGPT, or Gemini) to help you develop it further. Here is an exact prompt you can use:

```
I am building a web application called "[YOUR APP NAME]".

It solves this problem: [DESCRIBE THE PROBLEM IN 1-2 SENTENCES].

My main users are: [LIST YOUR 2-4 USER TYPES].

My planned core features are:
[PASTE YOUR FEATURE LIST]

Please help me:
1. Identify any user needs I might have missed
2. Suggest 2-3 features I should prioritize for the MVP
3. Identify any logical conflicts or gaps in my feature list
4. Write a one-paragraph product positioning statement for this app

Keep your response practical and focused on what a small team could build in a short sprint.
```

**What to do with the AI's response:**
- Read it critically — don't just accept everything it says
- Add any good suggestions to your feature list
- Refine your one-sentence description if the positioning statement is better
- Write down any gaps it identified and decide whether they matter for your MVP

---

## Step 7 — Create Your Planning Documents

Now turn your notes into actual documents. Use this AI prompt to generate three planning documents:

```
[T]ask: Produce a complete product definition for [YOUR APP NAME].
Write these documents: a README.md, a FEATURES.md, and a PROJECT-PLAN.md
with a staged implementation roadmap.

[C]ontext: The app is called "[YOUR APP NAME]". It solves [THE PROBLEM IT SOLVES].
The main users are [WHO WILL USE IT].
The platform should [WHAT IT DOES AT A HIGH LEVEL — one sentence].

[R]ole: You are a Senior Product Manager with experience in [RELEVANT DOMAIN] products.

[E]xamples:
- FEATURES.md should cover: the problem statement, user personas
  (list your [X] types of users), core features (list your 5-8 key features),
  and a trust/verification model if relevant.
- PROJECT-PLAN.md should have 5-6 numbered stages from
  foundations to launch, each with: Goal, What to Build, and
  Acceptance Criteria (how you know it's done).

[I]nstructions: Write all documents in clear markdown. Prioritize
[MOST IMPORTANT FEATURE] before anything else. Stage 1 must define
the core data model. Do not include any code — these are planning docs only.
Every feature must be justified by a user need.
```

Save the output as files in a `docs/` folder in your project:
- `docs/README.md`
- `docs/FEATURES.md`
- `docs/PROJECT-PLAN.md`

---

## What Good Planning Documents Look Like

Here is a summary of what Rwanda Academic Hub's planning documents contained:

**README.md** — One paragraph explaining the product, who it's for, and the core problem it solves.

**FEATURES.md (CONCEPTS-AND-FEATURES.md)** — Covered:
- The problem statement (event visibility is siloed in individual campus channels)
- 5 user personas (Student, Lecturer, Club Organizer, University, External Partner)
- 16 event types the platform supports
- 12 core features with sub-items
- MVP vs Phase 2 breakdown
- Strategic categories and differentiation

**PROJECT-PLAN.md** — Had 8 numbered implementation stages, from database foundations to ecosystem growth, each with a goal, build scope, and acceptance criteria.

These documents then fed into every subsequent phase — the design system, the database schema, and the AI prompts used to build each page.

---

## Checklist — You Are Ready to Move to Phase 2 When:

- [ ] You have written a one-sentence description of your app
- [ ] You have identified 2–4 user personas with their core needs
- [ ] You have listed at least 5–8 features
- [ ] You have defined your MVP (3–5 features)
- [ ] You have a `docs/` folder with at least a README.md
- [ ] You can explain to someone else in one minute what your app does and who it helps

---

## Common Mistakes to Avoid

**"My app does everything."** — Apps that try to do everything do nothing well. Keep your MVP small and focused.

**"I'll figure out the users later."** — Every design decision depends on who your users are. Don't skip this step.

**"I don't need to write this down."** — You will forget. More importantly, your AI assistant cannot help you effectively if it doesn't know your plan. These documents become the context you feed into every prompt.

**"The AI's plan is perfect, I'll just use it."** — The AI doesn't know your community the way you do. Use the AI to sharpen your thinking, not replace it.

---

*Next: [Phase 2 — The TCREI Prompting Framework](02-TCREI-PROMPTING-FRAMEWORK.md)*

# Rwanda Academic Hub: Comprehensive Product Plan

## Purpose

This document defines a practical product roadmap for Rwanda Academic Hub, a shared event management and discovery platform for universities and academic communities in Rwanda.

The product should begin with a strong Kigali-centered launch strategy while supporting the broader national ecosystem from the start.

The goal is not to reproduce isolated university event boards. The goal is to create a visibility network that helps users discover relevant events across institutions.

## Product Outcome

By the end of the first major implementation cycle, the platform should be able to:

- list upcoming events from multiple universities and academic communities
- allow verified organizers to publish events
- help users discover events across institutions, especially in Kigali
- support filtering by university, category, city, and audience eligibility
- allow users to save, follow, and track relevant events
- create trust through organizer verification and moderation

## Guiding Principles

1. Prioritize discoverability before advanced event operations.
2. Design for cross-university access, not single-campus ownership.
3. Start with a Kigali-first experience without excluding national expansion.
4. Make organizer trust and event legitimacy visible.
5. Support both academic-only and public-facing participation models.
6. Prefer a complete MVP journey over scattered advanced features.

## Recommended Build Sequence

## Stage 1: Product Foundations

### Stage 1 Goal

Define the platform structure, data model, and initial taxonomies.

### Stage 1 Build Scope

- event data model
- organizer data model
- university directory
- category taxonomy
- city and campus taxonomy
- audience eligibility model

### Stage 1 Deliverables

- structured event schema
- structured organizer schema
- seed list of universities in Rwanda
- Kigali-focused starter data set
- platform category definitions

### Stage 1 Rationale

Without a clean discovery model, later search, filtering, and organizer workflows will become inconsistent.

## Stage 2: Public Event Discovery

### Stage 2 Goal

Let any user browse and discover events without friction.

### Stage 2 Build Scope

- homepage or discovery landing page
- upcoming event feed
- featured Kigali collections
- event cards
- event detail page
- browse by category and university

### Stage 2 Acceptance Criteria

- users can view all published upcoming events
- users can open event detail pages
- users can browse at least by category and university
- empty states are handled clearly when no events match

## Stage 3: Search and Filtering

### Stage 3 Goal

Help users quickly find the right event from many institutions.

### Stage 3 Build Scope

- keyword search
- date filters
- city filters
- university filters
- audience eligibility filters
- event format filters
- organizer type filters

### Stage 3 Acceptance Criteria

- users can narrow results to a meaningful subset
- applied filters are visible and removable
- no-results states guide the user back to discovery

## Stage 4: User Accounts and Personalization

### Stage 4 Goal

Allow users to build a personal event discovery experience.

### Stage 4 Build Scope

- sign-up and sign-in
- profile with university affiliation
- interest selection
- bookmarks or saved events
- followed organizers
- personalized recommended events section

### Stage 4 Acceptance Criteria

- logged-in users can save events
- users can follow organizers
- the system can show a basic personalized event list

## Stage 5: Organizer Publishing Workflow

### Stage 5 Goal

Enable trusted organizers to publish and manage events.

### Stage 5 Build Scope

- organizer onboarding
- organizer verification request flow
- create event form
- draft and publish states
- edit and archive event actions
- banner upload and media support

### Stage 5 Acceptance Criteria

- approved organizers can create and publish an event
- event details appear correctly in discovery after publishing
- draft events are not publicly visible

## Stage 6: Moderation and Trust Layer

### Stage 6 Goal

Protect platform quality and make legitimacy visible to users.

### Stage 6 Build Scope

- admin review queue
- organizer verification management
- event reporting flow
- featured event controls
- audit log for event edits

### Stage 6 Acceptance Criteria

- admins can verify or reject organizer requests
- admins can unpublish problematic events
- verified badges appear consistently on organizer profiles and event pages

## Stage 7: RSVP, Reminders, and Attendance Intent

### Stage 7 Goal

Move from discovery into lightweight participation management.

### Stage 7 Build Scope

- RSVP or interested state
- external registration link support
- waitlist support for capped events
- reminder notifications
- saved calendar export

### Stage 7 Acceptance Criteria

- users can express attendance intent
- organizers can see interest levels
- reminders can be sent for saved or RSVPed events

## Stage 8: Insights and Ecosystem Growth

### Stage 8 Goal

Strengthen the product as a national academic visibility network.

### Stage 8 Build Scope

- organizer analytics dashboard
- city-level and category-level discovery collections
- institutional partner dashboards
- event recommendation improvements
- API or calendar integration opportunities

### Stage 8 Rationale

Once the core discovery and publishing loop works, growth features can strengthen cross-university collaboration and platform utility.

## Suggested Information Architecture

Core public pages:

- home or discover
- event detail
- categories
- universities
- organizer profile
- Kigali hub
- saved events

Core authenticated user pages:

- sign in
- sign up
- profile
- saved events
- followed organizers
- notification settings

Core organizer pages:

- organizer dashboard
- create event
- manage events
- analytics

Core admin pages:

- moderation queue
- verification management
- taxonomy management
- featured collections management

## Suggested Core Data Objects

### Event

- title
- slug
- description
- category
- tags
- organizer id
- university affiliation
- city
- venue
- latitude and longitude optional
- event format
- start datetime
- end datetime
- audience eligibility
- registration type
- registration link
- capacity optional
- status
- featured flag

### Organizer

- name
- organizer type
- institution affiliation
- verification status
- profile image
- bio
- contact channels
- social links

### User

- name
- email
- institution affiliation
- role type
- interests
- followed organizers
- saved events
- notification preferences

## MVP Recommendation

The MVP should focus on the minimum complete loop:

1. users discover events
2. users filter and open event details
3. users save events and follow organizers
4. verified organizers publish events
5. admins moderate event quality

This is the smallest coherent version of the product that proves the visibility-hub thesis.

## Launch Strategy

Suggested launch order:

1. Kigali-based universities and communities first
2. include a Rwanda-wide directory from day one
3. recruit a first cohort of verified organizers
4. feature high-interest categories such as technology, research, careers, and leadership

## Risks to Plan For

- low organizer adoption at launch
- inconsistent event quality or incomplete event data
- duplicate events across channels
- unclear distinction between public and restricted events
- moderation overhead as listings grow

## Product Success Signals

- at least several universities represented early
- recurring publishing from clubs and associations
- measurable cross-university traffic and saves
- repeat user discovery behavior week over week
- strong engagement with Kigali hub collections

## Recommended Next Planning Documents

If you want to continue this package, the next useful documents would be:

- a Rwanda Academic Hub PRD
- a page-by-page wireframe outline
- a database schema proposal
- a role and permissions model
- a launch operations plan for organizer onboarding

## Guiding Principles

1. Optimize first for visibility and discovery, not administrative complexity.
2. Let users discover events beyond their home university from day one.
3. Treat Kigali as a high-density discovery zone without excluding the rest of Rwanda.
4. Support both official institutional organizers and community-led organizers.
5. Make trust visible through verification and organizer identity.
6. Keep the first release simple enough to achieve adoption quickly.

## Product Scope

### In Scope For The First Major Version

- public event browsing
- organizer accounts
- university and community profiles
- event creation and publishing
- search and filter tools
- save and RSVP behavior
- trust and verification labels
- moderation basics

### Out Of Scope For The First Major Version

- full ticket payments inside the platform
- complex conference management workflows
- deep social networking features
- advanced attendee messaging automation
- custom white-label portals for every university

## Primary User Journeys

### Journey 1: Cross-University Discovery

An ALU student opens the platform, filters for Kigali workshops and research talks, and finds an event hosted by the University of Rwanda that is open to the public.

### Journey 2: Organizer Publishing

A university club leader creates an organizer profile, submits verification details, publishes a new event, and shares one public event page across campuses.

### Journey 3: Lecturer Outreach

A lecturer creates a seminar event, tags it under research and public talk, and reaches audiences beyond their own institution.

### Journey 4: Institutional Visibility

A university communication office uses its profile page to showcase upcoming public events and strengthen its ecosystem presence.

## Suggested Core Data Model

### Entities

- `User`
- `Organizer`
- `University`
- `Community`
- `Event`
- `EventCategory`
- `Venue`
- `RSVP`
- `SavedEvent`
- `VerificationRequest`
- `FlagReport`

### Key Event Fields

- title
- summary
- full description
- category
- tags
- host university
- organizer name
- organizer type
- event format
- city
- district
- venue details
- virtual link
- event start and end datetime
- registration deadline
- public or restricted attendance
- capacity
- image or banner
- registration link
- contact email or phone
- verification status

## Recommended Build Sequence

## Stage 1: Product Foundations And Taxonomy

### Stage Goal

Define the information architecture that makes cross-university discovery possible.

### Build Scope

- event categories
- organizer types
- university directory
- city and venue structure
- public versus restricted event rules
- verification statuses

### Deliverables

- agreed event taxonomy
- Rwanda university list seed data
- Kigali-first location structure
- initial data model

### Acceptance Criteria

- every event can be classified consistently
- the system can distinguish organizers clearly
- location and access labels are unambiguous

## Stage 2: Event Publishing And Organizer Profiles

### Stage Goal

Enable trusted communities to publish events into the platform.

### Build Scope

- organizer registration
- organizer profile creation
- event create and edit flow
- event draft and publish states
- event banner upload
- basic validation

### Acceptance Criteria

- an organizer can create a valid event
- invalid submissions are blocked with clear feedback
- published events become visible in discovery views

## Stage 3: Discovery Experience

### Stage Goal

Make the platform useful for people who just want to find relevant events.

### Build Scope

- event listing page
- keyword search
- category filters
- city and university filters
- date range filters
- public-only filter
- featured Kigali events section

### Acceptance Criteria

- users can find events by category, city, and institution
- search returns relevant results
- empty states guide the user when no events match

## Stage 4: Event Detail And RSVP Flow

### Stage Goal

Convert discovery into attendance intent.

### Build Scope

- event detail page
- save event feature
- RSVP feature
- add to calendar action
- organizer contact block
- related events suggestions

### Acceptance Criteria

- users can view complete event details
- users can save or RSVP to an event
- the event page provides enough information to act confidently

## Stage 5: University And Community Hubs

### Stage Goal

Turn each institution and community into a visible node inside the larger network.

### Build Scope

- university profile pages
- club and association pages
- official badge presentation
- archives of past events
- upcoming events by organizer

### Acceptance Criteria

- each university can have a public profile
- users can browse events by institution or community
- organizer credibility is visible on profile pages

## Stage 6: Verification, Moderation, And Trust

### Stage Goal

Ensure the hub stays credible as more organizers join.

### Build Scope

- verification request flow
- official and community organizer badges
- event reporting and flagging
- moderation queue
- event duplicate review support

### Acceptance Criteria

- trusted organizers are visibly differentiated
- flagged events can be reviewed by admins
- moderation actions are traceable

## Stage 7: Personalization And Notifications

### Stage Goal

Increase repeat usage by making discovery more relevant.

### Build Scope

- follow universities and organizers
- save interest categories
- recommended events
- reminders for saved or RSVP'd events
- weekly digest concept

### Acceptance Criteria

- users can express preferences
- the system can surface relevant events based on interest data
- reminders are delivered for upcoming events

## Stage 8: Analytics And Ecosystem Reporting

### Stage Goal

Provide insight into event visibility and ecosystem activity.

### Build Scope

- active organizer metrics
- category trends
- city-level event activity
- Kigali spotlight metrics
- organizer dashboard insights
- institutional participation reporting

### Acceptance Criteria

- organizers can understand event visibility
- admins can monitor platform usage across institutions
- reporting supports future partnerships and growth

## Suggested Page Structure

- home
- browse events
- event details
- saved events
- calendar view
- map view
- university profile
- organizer profile
- organizer dashboard
- create event
- edit event
- verification request page
- moderation dashboard
- admin analytics page

## MVP Recommendation

The MVP should focus on one complete visibility loop:

1. organizers publish events
2. users discover events across universities
3. users save or RSVP
4. trusted profiles improve confidence

If resources are limited, do not start with advanced analytics or complex payment features.

## Suggested Non-Functional Requirements

- mobile-first interface
- fast loading on low-bandwidth connections
- accessible form and navigation design
- clear status labels for event openness and verification
- scalable category and organizer architecture
- secure role-based access for organizers and admins

## Kigali-Focused Discovery Recommendations

- a featured Kigali section on the homepage
- location chips for major Kigali campuses and venues
- map-based browsing for Kigali users
- trend blocks for this week in Kigali
- quick filters for talks, workshops, and networking events in Kigali

## Partnership Strategy Recommendations

- onboard a small set of pilot universities first
- onboard visible clubs and student associations early
- recruit lecturers and research groups as anchor organizers
- prioritize public and semi-public events to create immediate value

## Success Metrics

- number of active organizers
- number of participating universities
- number of published events per month
- percentage of public events discovered across institutions
- saves and RSVP conversions
- repeat discovery usage by returning users

## Recommended Initial Rollout

### Phase 1 Pilot

- Kigali-focused pilot
- a few universities and recognized communities
- public event discovery only plus basic organizer publishing

### Phase 2 Expansion

- more Rwanda campuses
- verification workflow
- university profile pages
- personalized event feeds

### Phase 3 Ecosystem Maturity

- analytics dashboards
- stronger moderation workflows
- external integration support
- partnership reporting for institutions

## Final Product Definition

This platform should be built as a shared academic visibility infrastructure for Rwanda.

Its value is not just in storing events. Its real value is in making the right events visible to the right people across institutional boundaries.

That is the difference between an isolated university event board and a national academic hub.
---
name: travel4you-app-ai-dev-update
version: 1.0.0
project: travel4you.app
owner: Victor Chuyen
type: AI Dev implementation prompt
---

# MASTER PROMPT — UPDATE TRAVEL4YOU.APP

## ROLE

Act as a Senior Consumer Travel App Engineer, AI Trip Planning Architect, Voice UX Designer, Personalization Engineer, Security Engineer and QA Release Manager.

Upgrade the existing `travel4you.app` product into a personal AI travel companion. Inspect and extend the current codebase. Do not rebuild from scratch, change framework, replace working UI, or discard current user flows without evidence and owner approval.

## PRODUCT PROMISE

Help a traveler turn a vague desire into a usable, editable trip plan through text or voice, then guide them toward relevant and transparently disclosed travel offers.

Core transformation:

`“I want to travel” → clear destination → personalized itinerary → confident next action.`

Unlike `app.travel.us`, this product is assistant-first and global. The primary value is personalization, continuity and trip management; affiliate monetization supports the experience rather than dominating it.

## USERS

- Global English-first travelers; architecture must support localization.
- Users who do not know where to go yet.
- Mobile users planning through conversational text or voice.
- Solo travelers, couples and families.
- Returning users managing several trip ideas.

## NON-NEGOTIABLE RULES

1. Audit before editing. Reuse existing routes, components, APIs and design tokens.
2. Do not deploy publicly or enable production integrations without approval.
3. All AI and affiliate integrations are server-side and controlled by feature flags.
4. Do not collect passport, payment card or sensitive identity information.
5. Do not represent AI output as professional immigration, visa, medical, legal or safety advice.
6. Never fabricate live prices, availability, weather, visa rules, reviews or opening hours.
7. Current/time-sensitive facts require a verified source and timestamp.
8. Always allow the user to edit, reject or delete AI-generated trip data.
9. Voice recording is opt-in, visibly active and not stored by default.
10. Booking, payment, cancellation and refund require deterministic provider flows and human/user confirmation.

## FEATURE FLAGS

```text
FEATURE_AI_CONCIERGE=false
FEATURE_LIVE_VOICE=false
FEATURE_TRIP_MEMORY=false
FEATURE_SMART_ITINERARY=false
FEATURE_CONTEXTUAL_OFFERS=false
FEATURE_TRIP_EXPORT=false
FEATURE_PREMIUM_PLAN=false
AFFILIATE_TRACKING_ENABLED=false
```

## PHASE 0 — PRODUCT AND CODE AUDIT

Before implementation, document:

- Framework, build/deploy method and package manager.
- Current authentication and user data model.
- Current home, discovery, destination and trip flows.
- Existing AI, map, weather, travel and affiliate integrations.
- Design tokens and reusable components.
- Localization readiness.
- Analytics events and consent mechanism.
- Security, privacy, mobile, performance and accessibility gaps.
- Minimal migration plan.

If the actual codebase conflicts with this prompt, preserve working behavior and report the conflict before a destructive change.

## PHASE 1 — CONVERSATIONAL TRIP INTAKE

Create a text-first AI concierge that converts natural-language requests into a reviewable trip brief.

Examples:

- “Plan a calm 6-day Japan trip for two under $3,000.”
- “Where can my family go in December with beaches and easy transport?”
- “Turn my saved Paris idea into a 4-day food and art itinerary.”

The assistant may ask no more than three high-value clarification questions before producing a useful first draft.

### Trip brief schema

```json
{
  "trip_id": "string",
  "title": "string",
  "destinations": [{"name": "string", "country": "string", "place_id": "string|null"}],
  "origin": "string|null",
  "start_date": "YYYY-MM-DD|null",
  "end_date": "YYYY-MM-DD|null",
  "duration_days": 0,
  "travelers": {"adults": 1, "children": 0},
  "trip_style": ["culture", "food"],
  "pace": "slow|balanced|fast",
  "budget": {"currency": "USD", "amount": 0, "level": "value|balanced|premium"},
  "constraints": ["string"],
  "status": "draft|planned|saved|archived"
}
```

Validate all model output. Display the extracted brief for confirmation before saving.

## PHASE 2 — SMART ITINERARY ENGINE

Generate an editable itinerary grounded in destination records and verified sources.

### Required output

- Daily theme and geographic grouping.
- Morning, afternoon and evening suggestions.
- Estimated activity duration—not invented ticket prices.
- Travel-time estimates only when supported by a map/provider API.
- Rest buffers appropriate to pace and traveler type.
- Alternatives for weather or closure risk.
- Clear `Needs verification` label on time-sensitive facts.
- Sources and last-checked time.

### Itinerary schema

```json
{
  "trip_id": "string",
  "summary": "string",
  "days": [{
    "day": 1,
    "date": "YYYY-MM-DD|null",
    "theme": "string",
    "items": [{
      "period": "morning|afternoon|evening",
      "title": "string",
      "place_id": "string|null",
      "duration_minutes": 120,
      "notes": "string",
      "verification_status": "verified|needs_verification"
    }]
  }],
  "sources": [{"title": "string", "url": "string", "checked_at": "ISO-8601"}]
}
```

### Editing UX

- Drag/reorder itinerary items.
- Replace an activity with an alternative.
- Change pace, budget or interests and regenerate only affected sections.
- Undo the latest AI revision.
- Preserve user edits; never overwrite them silently.

## PHASE 3 — LIVE VOICE CONCIERGE

Implement behind `FEATURE_LIVE_VOICE` using Gemini Live or a compatible adapter.

### Jobs

- Discover preferences conversationally.
- Read and revise a trip plan.
- Answer grounded questions about the active trip.
- Convert voice input to the shared trip brief.
- Confirm changes before writing them.

### Voice UX

- Explicit start, pause and stop.
- Visible listening/thinking/speaking states.
- Transcript preview.
- Interruptible playback.
- One-tap switch to text.
- Language selector prepared for future locales.

### Safety and privacy

- No ambient/background listening.
- No raw audio retention by default.
- Do not accept payment details.
- Do not autonomously call booking or cancellation endpoints.
- Ask confirmation for dates, traveler count, budget and any saved changes.

## PHASE 4 — TRIP MEMORY

Implement explicit, user-controlled memory—not unrestricted conversational memory.

Store only useful structured preferences:

- Preferred pace.
- Budget level and currency.
- Interests.
- Accessibility preferences voluntarily provided.
- Saved destinations.
- Past trip plans.

### User controls

- View what is remembered.
- Edit individual fields.
- Disable personalization.
- Delete a trip.
- Delete all memory.

Do not infer or store sensitive traits. Separate anonymous/session mode from authenticated persistence.

## PHASE 5 — CONTEXTUAL AFFILIATE OFFERS

Offer recommendations appear only when they help complete the active plan.

### Placement examples

- Accommodation after neighborhood selection.
- Activities beside the relevant itinerary day.
- Airport transfer after arrival details exist.
- Insurance after trip dates and destination exist.
- Car rental only when route/context supports it.

### Requirements

- Label affiliate relationships clearly.
- Distinguish editorial recommendation from sponsored placement.
- Use verified provider data or clearly marked placeholders.
- Do not claim “best,” “cheapest” or live availability without evidence.
- Record outbound click with trip context but no sensitive data.

### Ranking

Use traveler relevance and itinerary fit ahead of commission:

```text
trip fit 35%
traveler preference fit 25%
timing/context 20%
data confidence 10%
commercial value 10%
```

## PHASE 6 — EXPORT, SHARE AND PREMIUM VALUE

### Free features

- Saved trip brief.
- Basic itinerary.
- Limited AI revisions.
- Affiliate-ready offers.

### Premium-ready features

- Detailed day-by-day plan.
- PDF/shareable itinerary.
- Multiple trip variants.
- Voice revisions.
- Priority regeneration.
- Human review add-on.

Build entitlement hooks but do not enable real payments. A future Whop Checkout integration may sell a premium plan or Victor's Implementation/Concierge service.

## ANALYTICS CONTRACT

Implement consent-aware events:

```text
concierge_opened
trip_prompt_submitted
clarification_answered
trip_brief_confirmed
itinerary_generated
itinerary_item_edited
itinerary_regenerated
voice_session_started
voice_session_completed
trip_saved
trip_exported
offer_impression
offer_clicked
premium_intent
```

Primary funnel:

`Visit → Trip Prompt → Confirmed Brief → Generated Itinerary → Saved Trip → Contextual Offer Click`

Primary KPI: `saved useful itineraries / qualified trip prompts`.

Revenue KPI: `affiliate revenue or premium intent / saved trip`.

AI efficiency KPI: `AI cost / saved itinerary`, not cost per message.

## TECHNICAL ARCHITECTURE

Keep provider adapters separate from application logic:

```text
AIProvider
VoiceProvider
PlacesProvider
TravelOfferProvider
AnalyticsProvider
TripRepository
```

Suggested routes:

```text
POST /api/trips/intake
POST /api/trips/:id/itinerary
PATCH /api/trips/:id
POST /api/trips/:id/voice-session
GET /api/trips/:id/offers
POST /api/events
DELETE /api/trips/:id
DELETE /api/users/me/travel-memory
```

### Reliability

- Runtime schemas for every provider response.
- Abortable requests and timeouts.
- One repair attempt for malformed AI JSON.
- Idempotency for trip saves and paid/provider actions.
- Structured logs with correlation IDs.
- Rate and daily cost limits.
- Safe fallback to manual forms and static destination data.

### Environment example

```dotenv
GEMINI_API_KEY=
GEMINI_MODEL=
DATABASE_URL=
GOOGLE_MAPS_API_KEY=
ANALYTICS_MEASUREMENT_ID=
FEATURE_AI_CONCIERGE=false
FEATURE_LIVE_VOICE=false
FEATURE_TRIP_MEMORY=false
FEATURE_SMART_ITINERARY=false
FEATURE_CONTEXTUAL_OFFERS=false
FEATURE_TRIP_EXPORT=false
FEATURE_PREMIUM_PLAN=false
AFFILIATE_TRACKING_ENABLED=false
```

Never put secrets in client-prefixed environment variables.

## DESIGN REQUIREMENTS

- Mobile-first conversational interface.
- Calm, trustworthy travel aesthetic.
- Answer first, controls second, monetization third.
- Clear distinction between user input, AI suggestion and verified external fact.
- Skeleton/loading states without layout shift.
- Empty and error states with recovery action.
- WCAG-aware contrast, keyboard navigation and screen-reader labels.
- Reduced-motion support.

## QA MATRIX

Verify:

- New anonymous trip and authenticated saved trip.
- Vague prompt and complete prompt.
- Single and multi-destination trips.
- No dates, fixed dates and conflicting dates.
- Budget missing or invalid.
- AI timeout, invalid JSON and rate limit.
- Voice allowed, denied, interrupted and unavailable.
- User edits preserved after partial regeneration.
- Memory view/edit/delete.
- Offer unavailable and placeholder modes.
- Affiliate disclosure on mobile and desktop.
- Analytics events fire once.
- No secret or personal trip data leaks.
- Existing features and routes do not regress.

Test responsive widths at 360, 390, 430, 768, 1024 and 1440px.

## PHASE GATES

### Gate A — Useful without AI

Existing destination discovery and manual trip intake remain usable when all AI flags are off.

### Gate B — Text planner

Ten representative prompts produce schema-valid, editable trip briefs and itineraries with no fabricated live claims.

### Gate C — Voice beta

Ten simulated voice sessions complete required fields, preserve user control and fall back to text.

### Gate D — Monetization

Contextual offer placement is relevant, disclosed and measurable before tracking is activated.

### Gate E — Release

Type-check, lint, automated tests, production build, accessibility checks and private staging QA pass.

## DEFINITION OF DONE

The update is done only when:

1. The current app is preserved and regression-tested.
2. AI features are server-secured and feature-flagged.
3. Users can create, edit, save and delete a trip plan.
4. Voice is optional and falls back cleanly.
5. Trip memory is visible and user-controlled.
6. Offers are contextual and clearly disclosed.
7. No unverified dynamic facts are presented as confirmed.
8. Funnel and cost metrics are instrumented.
9. A private staging URL and QA evidence are delivered.
10. Production and real affiliate tracking remain disabled pending owner approval.

## REQUIRED HANDOFF

Return:

- Current-state audit.
- Architecture and data model decisions.
- Changed file list.
- Database migrations, if any.
- Feature flag and environment setup.
- Test results and QA screenshots.
- Private staging URL.
- Remaining blockers and costs.
- Rollback procedure.
- Owner approval checklist for production release.

Begin with Phase 0 and implement the smallest end-to-end vertical slice first:

`Trip prompt → confirmed brief → editable itinerary → saved trip → contextual offer placeholder`.

Do not claim success until this flow works in the private staging environment.


# Requirements v0 — MVP Scope

**Purpose:** Define the minimum viable product that delivers core value while maintaining epistemic discipline.

**Success Criterion:** A strategic thinker (PM, investor, analyst) can use this tool to understand AI ecosystem evolution across stack and time in 10-15 minutes.

---

## MVP Scope: Must-Have Features

These features are **required** for the product to be useful. Without them, the core value proposition fails.

### 1. Core Visualization: Stack × Time Grid

**Description:**
- Horizontal axis: Time (2023-2025), divided by quarters (Q1, Q2, Q3, Q4)
- Vertical axis: Stack layers (6 layers as defined in PROJECT_CONTEXT.md)
- Event dots positioned on the grid by stack layer and date

**Must Include:**
- ✅ Year markers (2023, 2024, 2025) with quarter subdivisions
- ✅ Stack layer labels (left column, fixed width ~180px)
- ✅ Event dots color-coded by entity class (4 colors: Big Tech, Startup, Frontier Lab, Open Source)
- ✅ Event dots sized by impact (3 sizes: small 8px, medium 12px, large 18px)
- ✅ Vertical grid lines for quarters (subtle, dashed)
- ✅ Horizontal separators between stack layers

**Decisions:**
- Horizontal scroll enabled (12 quarters will exceed most viewports)
- Events positioned within quarters based on actual date (if known) or centered (if only quarter is known)
- Events impacting multiple stack layers appear in **primary layer only** (tooltip notes other affected layers)

---

### 2. Event Tooltips (Hover)

**Description:**
- Hovering over an event dot shows a tooltip with basic info
- Tooltip appears above the dot, arrow pointing down

**Must Include:**
- ✅ Event title (bold)
- ✅ Entity name
- ✅ Date (formatted as "Q1 2023" or "Jan 15, 2023" if exact)
- ✅ Impact level (e.g., "High Impact")

**Does NOT Include:**
- ❌ Full description (that's in the detail drawer)
- ❌ Evidence sources (detail drawer only)

**Design:**
- Dark background (#171717), white text
- Max width ~200px, wraps if needed
- Appears on hover, no click required

---

### 3. Event Detail Drawer (Click)

**Description:**
- Clicking an event dot opens a side panel (drawer) from the right
- Shows full event details, strategic significance, evidence sources

**Must Include:**
- ✅ Event title (large, prominent)
- ✅ Entity name and logo (if available)
- ✅ Date (formatted for readability)
- ✅ Stack layer tag(s)
- ✅ Action type tag (e.g., "Launch", "Acquisition")
- ✅ Entity class tag (e.g., "Frontier Lab")
- ✅ Event description (2-3 sentences, evidence layer)
- ✅ Strategic significance section (interpretation layer, visually distinguished)
- ✅ Evidence sources (list with links, publication dates, source types)
- ✅ Related events (if applicable, show 2-3 in a mini timeline)
- ✅ Close button (X in top-right)

**Interaction:**
- Opens on event dot click
- Slides in from right (~380-420px wide)
- Closes on X click or ESC key
- Scrollable if content exceeds viewport height

**Epistemic Discipline:**
- Strategic significance section must be **visually separated** (border, different background)
- Evidence sources must be **clickable links** (open in new tab)
- Related events should link to other event detail views (optional for v0, can be static text)

---

### 4. Filters (Top Bar)

**Description:**
- Three primary filters: Entity Class, Impact, Action Type
- Filters narrow visible events without removing them from the grid

**Must Include:**

**Entity Class Filter:**
- ✅ Multi-select checkbox dropdown
- ✅ Options: Big Tech, Startup, Frontier Lab, Open Source
- ✅ Default: All selected
- ✅ Visual indicator when filter is active (colored dot in button, checkmark icon)

**Impact Filter:**
- ✅ Multi-select dropdown
- ✅ Options: High, Medium, Low
- ✅ Default: All selected

**Action Type Filter:**
- ✅ Multi-select dropdown
- ✅ Options: Launch, Acquisition, Acquihire, Investment, Partnership, Open Source Release, Platform Shift, Organizational Change
- ✅ Default: All selected

**Behavior:**
- Filtered-out events are **hidden** (not grayed out)
- Filter state is preserved when opening/closing detail drawer
- Filters apply to both main grid and pattern cards (pattern cards update match counts)

**Deferred:**
- ❌ Search by company name (defer to post-MVP)
- ❌ Date range slider (defer to post-MVP)
- ❌ Filter by specific stack layer (defer to post-MVP — users can visually scan rows)

---

### 5. Pattern Cards (Bottom Section)

**Description:**
- Below the main grid, a section titled "Strategic Patterns & Derived Insights"
- Shows 3-5 pattern cards in a horizontal layout
- Each card is a derived hypothesis (interpretation layer)

**Must Include Per Card:**
- ✅ Pattern type badge (top-left, color-coded: Consolidation Motif, Strategic Pivot, Tech Stack Shift, etc.)
- ✅ Title (1-2 lines, bold)
- ✅ Thesis (2-3 sentences, hypothesis language: "appears to", "suggests", etc.)
- ✅ Event count link (e.g., "Show 3 matching events")
- ✅ Confidence indicator (optional but recommended: gold border for High, dashed border for Low)

**Interaction:**
- Clicking "Show 3 matching events" link **highlights matching events** on the main grid
  - Matching events: scale up slightly, add a subtle ring/border
  - Non-matching events: reduce opacity to 30%
  - This is the **"Explore Overlay Mode"** from the reference screen (RESOLVED)
  - A "Clear highlights" button appears in the top bar to reset
- Clicking elsewhere on the card opens a **pattern detail view** (can be modal or right drawer)

**Pattern Detail View (Expanded):**
- Full thesis
- Supporting signals list (linked to events)
- Counter-signals list (if any, collapsible)
- Confidence level + reasoning
- Last updated date

**Epistemic Discipline:**
- Pattern section is **visually separated** from event grid (border, different background color: gray-50)
- Pattern cards must never appear on the main timeline (avoid conflating evidence with interpretation)

---

### 6. Static Content (No User Accounts)

**Decision:** MVP is a static, public site. No authentication required.

**Implications:**
- All events and patterns are pre-published (editorial workflow happens offline or in a CMS, output is static JSON)
- No user comments, annotations, or contributions
- No personalization or saved views

**Rationale:**
- Simplifies MVP development
- Maintains editorial control and quality
- Avoids moderation/spam issues
- Can add accounts post-MVP if needed

---

### 7. Responsive Design Scope

**Decision:** Desktop-optimized for MVP, mobile-friendly but not mobile-optimized.

**Requirements:**
- ✅ Works on desktop (1280px+ width)
- ✅ Works on laptop (1024px+ width, horizontal scroll for timeline)
- ⚠️ Works on tablet (768px+ width, but may be cramped)
- ❌ Not optimized for mobile (<768px) — show a "best viewed on desktop" message or basic degraded view

**Rationale:**
- Complex data visualization is inherently desktop-friendly
- Mobile optimization would require significant design rethinking (stacked cards, separate timeline, etc.)
- Defer to post-MVP if demand exists

---

### 8. Minimum Viable Content

To validate the product, MVP must include:

**Events:**
- ✅ Minimum 40 events (spread across 6 stack layers, 2023-2025)
- ✅ Coverage: At least 5 events per stack layer
- ✅ Diversity: At least 10 events from each entity class (Big Tech, Startup, Frontier Lab, Open Source)
- ✅ All events must have ≥1 evidence source (primary or credible-secondary)

**Patterns:**
- ✅ Minimum 3 patterns (one Consolidation Motif, one Strategic Pivot, one Tech Stack Shift)
- ✅ Each pattern must reference ≥3 events
- ✅ At least one pattern must have counter-signals (to demonstrate epistemic discipline)

**Stack Layers:**
- ✅ All 6 layers from PROJECT_CONTEXT.md:
  - Applications: Horizontal AI, Departmental AI, Vertical AI
  - Infrastructure: Model APIs, Training & Compute, Data/Orch./Obs.

---

### 9. Data Format and Management

**Decision:** Data stored as structured JSON, loaded client-side.

**Structure:**
```
/data
  events.json          # Array of Event objects
  entities.json        # Array of Entity objects
  patterns.json        # Array of Pattern objects
  stack_layers.json    # Array of StackLayer objects
  action_types.json    # Array of ActionType objects
  entity_classes.json  # Array of EntityClass objects
```

**Implications:**
- No backend database for MVP
- Editorial workflow: Update JSON files, commit to git, redeploy
- Fast loading, no server-side rendering needed
- Can migrate to API/CMS post-MVP

**Validation:**
- JSON files must conform to DATA_MODEL_DRAFT.yaml schemas
- Automated schema validation in CI/CD (optional for v0 but recommended)

---

### 10. Performance and Technical Constraints

**Requirements:**
- ✅ Page load time <3 seconds on desktop broadband
- ✅ Event hover tooltips respond <100ms
- ✅ Detail drawer opens <200ms
- ✅ Filter changes render <300ms
- ✅ Supports 100+ events without performance degradation

**Technical Stack (Suggested, not prescriptive):**
- HTML5 + CSS3 (Grid, Flexbox)
- Vanilla JS or lightweight framework (React, Vue, Svelte)
- No heavy dependencies (avoid large charting libraries unless necessary)
- Static hosting (Netlify, Vercel, GitHub Pages)

---

## Near-Term Extensions (Post-MVP, Within 6 Months)

These features would enhance the product but are **not required** for initial launch.

### 1. Enhanced Pattern Interaction

- **Pattern → Event highlighting** with visual connections (lines, arcs)
- **Pattern detail pages** with full supporting/counter evidence
- **Pattern confidence evolution** (show how confidence changed over time as new events emerged)

### 2. Company-Centric Views

- **Filter by specific company** (e.g., "Show all OpenAI events")
- **Company detail pages** with event timeline and strategic summary
- **Company comparison mode** (side-by-side timelines for 2 entities)

### 3. Spend Data Overlay

- **Show Spend toggle** activates inline annotations (per reference_code.html)
- **Spend chart** (optional): Bar chart or line graph showing total spend per layer over time
- **Data source:** Menlo Ventures report or similar

### 4. Advanced Filters

- **Date range slider** (e.g., "Show only Q1 2024 - Q2 2024")
- **Stack layer filter** (e.g., "Show only Model APIs and Training & Compute")
- **Confidence filter** (for events: confirmed/likely/rumored; for patterns: high/medium/low)

### 5. Sharing and Export

- **Shareable URLs** with filter state encoded (e.g., `?entity=openai&impact=high`)
- **Export as image** (screenshot of current view)
- **Export as report** (PDF with selected events and patterns)

### 6. Search

- **Full-text search** across event titles, descriptions, entities
- **Search highlights** matching events on the grid

### 7. Time-Scrubbing / Animation

- **Play button** that animates events appearing over time
- **Scrubber bar** to manually seek to a specific date
- **Speed controls** (1x, 2x, 4x)

### 8. Mobile Optimization

- **Dedicated mobile layout** with:
  - Vertical timeline (stack layers as tabs or accordion)
  - Card-based event list (replaces dots)
  - Simplified filters

---

## Explicit Non-Goals (Will NOT Do, Even Post-MVP)

These are intentional boundaries. They may seem valuable but violate core principles or are out of scope.

### ❌ Predictive Analytics

**Why not:** The product shows what happened, not what will happen. Predictions would:
- Violate epistemic discipline (patterns are hypotheses, not forecasts)
- Require a fundamentally different data model and ML infrastructure
- Risk reputation damage if predictions are wrong

**Alternative:** Users can form their own hypotheses based on patterns, but the product does not forecast.

---

### ❌ Sentiment Analysis or Automated Event Extraction

**Why not:**
- High risk of "AI slop" (low-quality auto-generated content)
- Requires extensive fact-checking and quality control, negating automation benefits
- Manual curation ensures evidence quality

**Alternative:** Editorial team curates events with primary sources.

---

### ❌ User-Generated Content (Comments, Annotations, Event Submissions)

**Why not:**
- Requires moderation infrastructure
- Risk of spam, misinformation, or low-quality contributions
- Dilutes editorial voice and quality standards

**Alternative:** Users can share the tool and discuss externally (Twitter, LinkedIn, etc.). If community contribution is desired later, implement a gated submission process with editorial review.

---

### ❌ Real-Time Event Tracking / News Feed

**Why not:**
- This is not a news aggregator (see PROJECT_CONTEXT.md)
- Real-time updates would blur the line between "event" and "noise"
- Requires continuous monitoring and fact-checking infrastructure

**Alternative:** Update events on a **monthly cadence** (or quarterly) with editorial review.

---

### ❌ Company Scoring or Rankings

**Why not:**
- Reductive and risks oversimplification
- "Most strategic company" or "best positioned" claims are subjective and would undermine epistemic discipline
- Creates perverse incentives (lobbying for higher scores)

**Alternative:** Show event density and pattern membership, let users form their own assessments.

---

### ❌ Monetization via Paywalls or Subscriptions (For Now)

**Decision:** MVP is free and public.

**Rationale:**
- Maximize reach and impact in early phase
- Build credibility and audience before monetization
- Paywalls would limit strategic value (can't share insights as easily)

**Future consideration:** Could add premium features (API access, custom reports, enterprise licenses) but core visualization remains free.

---

## MVP Development Phases

### Phase 0: Foundation (Current)
- ✅ Document product context, data model, patterns framework
- ✅ Define MVP scope and requirements
- ✅ Resolve critical open questions

### Phase 1: Data Preparation (Estimated: 2-3 weeks)
- Curate 40+ events with evidence sources
- Define 3-5 patterns with supporting/counter signals
- Structure data as JSON per DATA_MODEL_DRAFT.yaml
- Validate data quality (all events have sources, patterns have ≥3 events, etc.)

### Phase 2: UI Implementation (Estimated: 4-6 weeks)
- Build stack × time grid with event dots
- Implement hover tooltips
- Build event detail drawer
- Add filters (entity class, impact, action type)
- Implement pattern cards with highlight interaction
- Responsive design (desktop + laptop)

### Phase 3: Testing and Refinement (Estimated: 1-2 weeks)
- User testing with 5-10 target users (PMs, investors, analysts)
- Performance optimization (ensure <3s load time)
- Accessibility review (keyboard navigation, screen readers)
- Copy editing and visual polish

### Phase 4: Launch (Estimated: 1 week)
- Deploy to static hosting (Netlify, Vercel, GitHub Pages)
- Create launch assets (landing page, social media posts, demo video)
- Seed with target audience (AI PM communities, investor networks, Twitter)

**Total Estimated Timeline:** 8-12 weeks from Phase 1 start to launch

---

## Success Metrics (Post-Launch)

How will we know if the MVP is successful?

### Usage Metrics
- **Monthly active users:** 500+ in first month (indicating product-market fit)
- **Average session duration:** 8-12 minutes (indicates engagement, not bounce)
- **Events viewed per session:** 10+ (indicates exploration, not passive browsing)
- **Pattern interactions:** 30%+ of users click on a pattern card

### Qualitative Metrics
- **User feedback:** "This helped me understand X" (strategic insight, not just data)
- **Shares:** Users share the tool with colleagues (viral coefficient >1.2)
- **Backlinks:** Referenced in blog posts, investment memos, strategy docs

### Content Validation
- **No fact corrections:** Zero factual errors reported (evidence quality holds)
- **Pattern debates:** Users engage with patterns (agree/disagree) but don't dispute the evidence layer

---

## Open Questions Still Requiring Resolution

These were flagged in DECISIONS_AND_ASSUMPTIONS.md as critical. Here are the resolutions:

### ✅ RESOLVED: What does "Explore Overlay Mode" do?

**Answer:** Clicking "Show X matching events" on a pattern card **highlights matching events** on the main grid (scale + ring for matches, reduce opacity for non-matches). A "Clear highlights" button appears to reset.

**Implementation note:** Use CSS transforms and opacity transitions for smooth visual feedback.

---

### ✅ RESOLVED: How should related events be visualized?

**Answer:**
- **Primary:** In the event detail drawer, show a mini vertical timeline (2-3 related events, like in reference_code.html)
- **Optional for v0:** Clicking a related event opens its detail drawer (replaces current drawer content)
- **Deferred:** Visual connections on the main grid (lines/arcs) are post-MVP

---

### ✅ RESOLVED: Are all filters multi-select or single-select?

**Answer:** All three filters (Entity Class, Impact, Action Type) are **multi-select**.

**Rationale:** More flexible for exploration (e.g., "Show Big Tech + Frontier Lab events with High impact")

---

### ✅ RESOLVED: How are events with multiple stack layers displayed?

**Answer:** Events appear in their **primary stack layer only**. Tooltip and detail drawer note other affected layers (e.g., "Also impacts: Training & Compute").

**Rationale:** Avoids visual clutter and duplication. If a layer is truly important, it should be split into a separate event.

---

### ✅ RESOLVED: Do we show future/projected events?

**Answer:**
- **Q1-Q3 2025:** Show confirmed and likely events (past or near-present)
- **Q4 2025:** May include "rumored" events if well-sourced, but visually distinguished (dashed border or different opacity)
- **No projections:** Do not show events beyond Q4 2025 in MVP

**Rationale:** Maintains evidence-based approach while allowing near-term visibility.

---

## Next Steps

1. **Validate MVP scope** with stakeholders (product owner, potential users)
2. **Begin data curation** (Phase 1)
3. **Create wireframes/mockups** based on reference_screen.png (if not already sufficient)
4. **Set up development environment** (choose tech stack, initialize repo)
5. **Implement Phase 2** (UI build)

---

**Related Documents:**
- [PROJECT_CONTEXT.md](PROJECT_CONTEXT.md) — Why this product exists
- [DATA_MODEL_DRAFT.yaml](DATA_MODEL_DRAFT.yaml) — Entity schemas
- [PATTERNS_AS_HYPOTHESES.md](PATTERNS_AS_HYPOTHESES.md) — Pattern framework
- [DECISIONS_AND_ASSUMPTIONS.md](DECISIONS_AND_ASSUMPTIONS.md) — What we know vs. assume

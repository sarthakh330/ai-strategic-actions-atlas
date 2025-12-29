# Decisions and Assumptions — Epistemic Status Document

This document separates **what we know** from **what we assume** from **what we don't know yet**.

---

## Tier 1: High-Confidence Decisions

These are settled. They appear clearly in the reference screen or are fundamental to the product concept.

### Product Structure

✅ **Primary coordinate system is Stack × Time**
- Horizontal axis: Time (2023–2025, divided by quarters)
- Vertical axis: Stack layers (Applications, Infrastructure)
- Companies appear as dots on this coordinate system

**Evidence:** Clearly visible in [reference_screen.png](../ui/reference_screen.png)

---

✅ **Time range for MVP: 2023–2025**
- Covers recent strategic evolution in AI
- Ends at present/near-future (Q4 2025)

**Evidence:** Reference screen shows 2023, 2024, 2025 year markers

---

✅ **Two-layer stack hierarchy: Applications + Infrastructure**

**Applications:**
- Horizontal AI (Assistants, Search)
- Departmental AI (Sales, Dev, Legal)
- Vertical AI (Bio, Material, Fin)

**Infrastructure:**
- Model APIs (Inference, Fine-tuning)
- Training & Compute (GPUs, Custom Silicon)
- Data / Orch. / Obs. (Vector DBs, Eval)

**Evidence:** Directly visible in reference screen

**Source justification:** Informed by Menlo Ventures AI spend analysis (mentioned in design archaeology)

---

✅ **Entity classes are color-coded**

- Big Tech → Slate/gray (#334155)
- Startup → Indigo/blue (#4f46e5)
- Frontier Lab → Emerald/green (#059669)
- Open Source → Amber/orange (#d97706)

**Evidence:** Legend visible in reference screen top bar

---

✅ **Event dots vary by size (impact level)**
- Small dot (8px) → Low impact
- Medium dot (12px) → Medium impact
- Large dot (18px) → High impact

**Evidence:** Visible variation in dot sizes on reference screen

---

✅ **Patterns are visually separated from events**
- Events → Top section (stack × time grid)
- Patterns → Bottom section ("Strategic Patterns & Derived Insights")

**Rationale:** Maintains epistemic separation between evidence and interpretation layers

**Evidence:** Clear visual boundary in reference screen

---

✅ **Three filters are primary: Entity Class, Impact, Action Type**

**Evidence:** Filter buttons visible in top bar of reference screen

---

✅ **Event detail drawer slides in from right**

**Evidence:** Aside element with right-positioned drawer in reference_code.html, visible in screenshot

---

### Epistemic Discipline

✅ **Patterns must be represented as hypotheses, not facts**

**Rationale:** Core principle from design archaeology and PROJECT_CONTEXT.md

---

✅ **All events must have evidence sources**

**Rationale:** Required for credibility and to avoid "beautiful misinformation"

---

✅ **Stack layers must "earn their place" through action density**

**Rationale:** Principle from design archaeology — no speculative or thin categories

---

## Tier 2: Medium-Confidence Assumptions

These are working hypotheses. They appear reasonable but are **not** definitively confirmed by the reference materials.

### UI Interactions

⚠️ **Assumption:** Clicking an event dot opens the detail drawer on the right

**Basis:** Detail drawer visible in reference screen; standard pattern for event-detail UIs

**Risk:** Unclear if drawer opens on click, hover, or another trigger

**Resolution needed:** Specify interaction trigger in requirements

---

⚠️ **Assumption:** Pattern cards are clickable and show related events

**Basis:** Reference screen shows "Show 3 matching events" link on pattern cards

**Risk:** Unclear if this highlights dots in the main view, opens a filtered view, or does something else

**Resolution needed:** Define pattern → event navigation behavior

---

⚠️ **Assumption:** Timeline is scrollable horizontally

**Basis:** reference_code.html shows overflow-x-auto classes; 3 years × 4 quarters = 12 columns likely exceed viewport

**Risk:** Not explicitly visible in reference screen (static image)

**Resolution needed:** Confirm scroll behavior vs. responsive zoom

---

⚠️ **Assumption:** "Explore Overlay Mode" toggles pattern highlighting on the main grid

**Basis:** Reference screen shows this label near pattern section

**Risk:** Completely unclear what this does — could be:
  - Highlighting matching events when pattern is selected
  - Dimming non-matching events (grayscale filter exists in reference_code.html)
  - Overlaying pattern boundaries on the timeline
  - Something else entirely

**Resolution needed:** HIGH PRIORITY — define what overlay mode means

---

⚠️ **Assumption:** "Show Spend" toggle reveals market spend data per stack layer

**Basis:** Reference screen shows toggle in top right; reference_code.html shows inline spend annotations (e.g., "'25 est: $4B")

**Risk:** Unclear if this is:
  - Inline text annotations (as in code)
  - Separate spend visualization
  - Chart overlay
  - Deferred to post-MVP

**Resolution needed:** Define spend visualization approach or defer explicitly

---

### Data and Content

⚠️ **Assumption:** Initial event data will be manually curated, not scraped

**Basis:** High evidence standards (primary sources required) suggest manual curation

**Risk:** May limit scale but ensures quality

**Resolution needed:** Confirm data sourcing strategy for MVP

---

⚠️ **Assumption:** "Rumored" events are included but visually distinguished

**Basis:** DATA_MODEL_DRAFT.yaml includes confidence levels (confirmed / likely / rumored)

**Risk:** May reduce credibility if rumors are prominent

**Resolution needed:** Decide whether to include rumors in MVP or defer

---

⚠️ **Assumption:** Patterns will be author-created, not algorithmically detected

**Basis:** Emphasis on editorial quality and epistemic discipline

**Risk:** Scalability limitation

**Resolution needed:** Confirm pattern creation workflow

---

### Stack Model

⚠️ **Assumption:** "Data / Orch. / Obs." is a single merged layer, not three separate layers

**Basis:** Appears as one row in reference screen

**Risk:** These are conceptually distinct; merging may obscure important dynamics

**Justification from archaeology:** "Stack layers must earn their place" — if action density is low for each individually, merging is correct

**Resolution needed:** Validate against actual event data when available

---

⚠️ **Assumption:** Stack order is Applications (top) → Infrastructure (bottom)

**Basis:** Reference screen layout

**Justification:** Aligns with typical stack visualization (user-facing on top, primitives below)

**Alternative:** Could be reversed (primitives on top, applications below) — but reference screen is clear

---

## Tier 3: Explicit Open Questions

These are **known unknowns** — things we cannot determine from the reference materials and design archaeology.

### Critical (Must Resolve for MVP)

❓ **What does "Explore Overlay Mode" do?**

- Most ambiguous element of the reference screen
- Could fundamentally change interaction model
- Needs explicit definition before implementation

**Possible interpretations:**
1. Clicking a pattern highlights its matching events on the main grid
2. Toggling overlay mode grays out non-matching events (reference_code.html has `.grayscale-dots` class)
3. Overlay mode shows pattern "zones" or "regions" on the timeline (e.g., consolidation periods)
4. It's a placeholder concept not yet designed

**Decision needed:** Choose interpretation or defer feature

---

❓ **How should related events be visualized?**

- Detail drawer shows "Related Motif Sequence" with a vertical timeline
- Main grid could show connections (lines, highlighting, etc.)
- Unclear which is primary or if both exist

**Decision needed:** Define relationship visualization approach

---

❓ **Are all filters multi-select or single-select?**

- Reference screen shows dropdowns for "Impact" and "Action Type"
- "Entity Class" shows a checkmark, suggesting it might be active
- Unclear if you can filter by "Big Tech + Startup" simultaneously or just one

**Decision needed:** Define filter interaction model

---

❓ **How are events with multiple stack layers displayed?**

- DATA_MODEL says events can impact multiple stack layers
- Reference screen only shows events in single rows

**Possible resolutions:**
1. Event appears in multiple rows (duplicate dots)
2. Event appears in primary layer only
3. Event appears in one row but tooltip lists all affected layers

**Decision needed:** Choose multi-layer visualization strategy

---

❓ **Do we show future/projected events (e.g., "2025 Q4") or only past/present?**

- Reference screen extends to Q4 2025, which may be future at time of viewing
- Some events in reference_code.html tooltips say "(Rumor)"

**Decision needed:** Define temporal boundary and confidence handling

---

### Important (Should Resolve for MVP, but could defer)

❓ **Is there a URL structure for sharing specific views?**

- Detail drawer has a "share" button
- Unclear if this creates a shareable link, exports an image, etc.

**Decision needed:** Define sharing mechanism or remove button

---

❓ **Are there keyboard shortcuts for navigation?**

- No evidence in reference materials
- Common for data-heavy UIs (e.g., arrow keys to move between events)

**Decision needed:** Define keyboard interactions or explicitly skip for MVP

---

❓ **How are events positioned within a quarter?**

- Events in reference screen appear at various horizontal positions within quarters
- Unclear if these represent:
  - Actual date within quarter (e.g., Jan 15 → left side of Q1)
  - Random jitter to avoid overlap
  - Manual positioning for aesthetics

**Decision needed:** Define horizontal positioning logic

---

❓ **Are there user accounts or is this a static public site?**

- No login UI visible in reference screen
- Pattern metadata includes "author" and "reviewers" fields, suggesting editorial workflow

**Possible models:**
1. Static public site (all content pre-published)
2. Authenticated site (login required)
3. Hybrid (public view + admin CMS)

**Decision needed:** Define user model and deployment strategy

---

❓ **Is there a search or filter-by-company feature?**

- No search box visible in reference screen
- Filters are category-based (entity class, impact, action type), not entity-specific

**Decision needed:** Include search in MVP or defer?

---

❓ **How many events and patterns should be in the MVP?**

- Unknown scale
- Reference screen shows ~30-40 event dots visible
- 3 pattern cards visible

**Decision needed:** Define minimum viable content (e.g., "50 events across 6 layers, 5 patterns")

---

### Nice-to-Have (Defer or Decide Post-MVP)

❓ **Is there a time-scrubbing/animation feature?**

- Could show "replay" of events over time
- Not visible in reference screen but common in temporal visualizations

**Decision:** Likely defer to post-MVP

---

❓ **Are there user-generated annotations or comments?**

- Not visible in reference materials
- Could enable community contribution

**Decision:** Likely defer to post-MVP (requires moderation infrastructure)

---

❓ **Is there a "Compare Companies" feature?**

- Could show side-by-side event timelines for two entities
- Not visible but potentially valuable

**Decision:** Likely defer to post-MVP

---

❓ **Is spend data a first-class feature or an optional overlay?**

- Reference screen shows "Show Spend" toggle (OFF state)
- reference_code.html shows inline spend annotations
- But no separate spend visualization is visible

**Possible models:**
1. Inline annotations only (low complexity)
2. Separate spend chart/overlay (high complexity)
3. Defer entirely to post-MVP

**Decision:** Define spend MVP scope or explicitly defer

---

❓ **Do we support mobile/tablet layouts?**

- Reference screen appears desktop-optimized
- Complex data visualization may not translate well to small screens

**Decision:** Define responsive design requirements or desktop-only for MVP

---

## Resolution Process

For open questions:

1. **Critical questions** → Must resolve before implementation starts
2. **Important questions** → Resolve during MVP scoping (REQUIREMENTS_v0.md)
3. **Nice-to-have questions** → Document as "post-MVP" or "future consideration"

When making decisions:

- **Prefer simplicity** for MVP (defer complex features)
- **Maintain epistemic discipline** (don't add features that blur evidence/interpretation)
- **Follow the reference screen** when it's clear (don't invent unnecessarily)
- **Document assumptions explicitly** when extrapolating

---

## Summary Table

| Certainty Level | Count | Status |
|----------------|-------|--------|
| **High-Confidence Decisions** | 11 | Settled, proceed with confidence |
| **Medium-Confidence Assumptions** | 9 | Working hypotheses, validate during development |
| **Critical Open Questions** | 5 | MUST resolve before MVP implementation |
| **Important Open Questions** | 6 | SHOULD resolve during MVP scoping |
| **Nice-to-Have Open Questions** | 5 | Defer or decide post-MVP |

---

**Next Steps:**

1. Resolve **5 critical open questions** before moving to implementation
2. Make explicit decisions for **important questions** in REQUIREMENTS_v0.md
3. Document **deferred questions** in a "Future Features" backlog

**Related Documents:**
- [PROJECT_CONTEXT.md](PROJECT_CONTEXT.md) — Core principles
- [REQUIREMENTS_v0.md](REQUIREMENTS_v0.md) — MVP scope (will resolve many open questions)
- [DATA_MODEL_DRAFT.yaml](DATA_MODEL_DRAFT.yaml) — Entity schemas

# UI Implementation Roadmap — Phase 2

**Status:** Ready to begin
**Prerequisites:** ✅ Data contract frozen, golden dataset validated (42 events, 5 patterns)

**Estimated Timeline:** 4-6 weeks

---

## Overview

With the data contract stabilized and golden dataset validated, we're ready to build the UI. The implementation follows the reference design ([reference_screen.png](../ui/reference_screen.png), [reference_code.html](../ui/reference_code.html)) and requirements in [REQUIREMENTS_v0.md](REQUIREMENTS_v0.md).

---

## Tech Stack Recommendation

### Frontend Framework
**React** + **Tailwind CSS** + **Vite**

**Rationale:**
- Reference code already uses Tailwind utility classes
- React provides component structure for complex interactions (tooltips, drawer, filters)
- Vite offers fast development experience with static build output
- Large ecosystem for data visualization (if needed later)

**Alternative:** Vue 3 + Vite or Svelte + SvelteKit (all viable, choose based on team preference)

### Data Loading
- Client-side JSON/JSONL loading (simple `fetch()`)
- No backend required (static hosting)
- Data lives in `/data` folder, loaded on page mount

### Styling
- Tailwind CSS (utility-first, matches reference design)
- Custom CSS for animations and hover effects
- Responsive grid using CSS Grid and Flexbox

---

## Implementation Phases

### **Phase 2.1: Project Setup & Core Grid** (Week 1)

**Goal:** Get the basic timeline grid rendering with static data

**Tasks:**
1. **Initialize project**
   ```bash
   npm create vite@latest app -- --template react
   cd app
   npm install tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

2. **Load canonical data**
   - Create `src/hooks/useData.js` to fetch:
     - `data/canonical/stack_layers.json`
     - `data/canonical/entity_classes.json`
     - `data/events/v0_seed_40.jsonl`
     - `data/patterns/v0_seed_5.jsonl`
   - Parse JSONL (one JSON object per line)

3. **Build Stack × Time Grid**
   - Create `<TimelineGrid>` component
   - Horizontal axis: 2023-2025, divided by quarters (Q1, Q2, Q3, Q4)
   - Vertical axis: 6 stack layers (from `stack_layers.json`, sorted by `sort_order`)
   - CSS Grid layout with fixed layer labels (~180px width) and scrollable timeline
   - Add subtle grid lines (dashed, gray-300)

4. **Render Event Dots**
   - Create `<EventDot>` component
   - Position dots by date (quarter bucket) and stack layer
   - Size based on `impact_level` (8px / 12px / 18px for low/medium/high)
   - Color based on `entity_class` (use hex codes from `entity_classes.json`)

**Acceptance Criteria:**
- Grid renders with 6 rows (stack layers) and 12 columns (quarters)
- 42 event dots appear in correct positions
- Horizontal scroll works for timeline

---

### **Phase 2.2: Hover Tooltips** (Week 1)

**Goal:** Show basic event info on hover

**Tasks:**
1. **Create `<Tooltip>` component**
   - Dark background (#171717), white text
   - Arrow pointing down to event dot
   - Max width ~200px, wraps if needed

2. **Show tooltip on hover**
   - Trigger: `onMouseEnter` / `onMouseLeave` on `<EventDot>`
   - Content:
     - Event title (bold)
     - Entity name
     - Date (formatted: "Q1 2023" or "Jan 15, 2023")
     - Impact level (e.g., "High Impact")

3. **Positioning logic**
   - Tooltip appears above dot by default
   - If near top edge, flip below
   - Center-aligned with dot

**Acceptance Criteria:**
- Hovering any event dot shows tooltip with 4 fields
- Tooltip disappears when mouse leaves
- No layout shift or flicker

---

### **Phase 2.3: Event Detail Drawer** (Week 2)

**Goal:** Open full event details in side panel

**Tasks:**
1. **Create `<EventDrawer>` component**
   - Slides in from right (380-420px wide)
   - Dark mode styling to match reference
   - Scrollable if content exceeds viewport

2. **Trigger drawer on click**
   - Click event dot → open drawer
   - Close button (X in top-right) or ESC key → close drawer
   - Only one drawer open at a time

3. **Drawer content sections**
   - **Header:**
     - Event title (large, bold)
     - Entity logo (if available) + name
     - Date (formatted)
     - Tags: Stack layer(s), Action type, Entity class
   - **Description:**
     - Event description (2-3 sentences, evidence layer)
   - **Strategic Significance:** (visually distinguished)
     - Border or different background (gray-100)
     - Label: "Strategic Significance"
     - Content: `strategic_significance` field
   - **Evidence Sources:**
     - List with links (open in new tab)
     - Show publisher, date, source type
     - Clickable URLs
   - **Related Events:** (if applicable)
     - Mini vertical timeline (2-3 events)
     - Clickable to open their detail drawers

**Acceptance Criteria:**
- Clicking any event opens drawer with full details
- All fields render correctly (title, description, evidence, etc.)
- Strategic significance section is visually separated
- Evidence links open in new tab
- Drawer closes on X or ESC

---

### **Phase 2.4: Filters** (Week 2-3)

**Goal:** Let users narrow visible events

**Tasks:**
1. **Create top filter bar**
   - Three dropdown filters: Entity Class, Impact, Action Type
   - Each filter is **multi-select** (checkboxes in dropdown)
   - Default: All options selected

2. **Entity Class Filter**
   - Options: Big Tech, Startup, Frontier Lab, Open Source
   - Visual indicator when active (colored dot or checkmark)

3. **Impact Filter**
   - Options: High, Medium, Low

4. **Action Type Filter**
   - Options: Launch, Acquisition, Acquihire, Investment, Partnership, Open Source Release, Platform Shift, Organizational Change

5. **Filter logic**
   - Filtered-out events are **hidden** (not grayed out)
   - Filter state preserved when opening/closing drawer
   - "Clear All Filters" button to reset

**Acceptance Criteria:**
- All three filters work independently
- Multi-select works (e.g., "Big Tech + Startup" shows both)
- Filtered events disappear from grid
- Drawer still opens for visible events
- Clear button resets all filters

---

### **Phase 2.5: Pattern Cards** (Week 3-4)

**Goal:** Display strategic patterns with event highlighting

**Tasks:**
1. **Create bottom pattern section**
   - Title: "Strategic Patterns & Derived Insights"
   - Visual separator from main grid (border, gray-50 background)
   - Horizontal card layout (3-5 cards, scrollable if needed)

2. **Create `<PatternCard>` component**
   - Pattern type badge (top-left, color-coded):
     - Consolidation Motif → Indigo
     - Strategic Pivot → Gray
     - Tech Stack Shift → Teal
     - Pressure Field → Amber
   - Title (bold, 1-2 lines)
   - Thesis (2-3 sentences, hypothesis language)
   - Event count link: "Show N matching events"
   - Confidence indicator (optional):
     - High → Gold border
     - Medium → No special indicator
     - Low → Dashed border

3. **Implement "Explore Overlay Mode"**
   - Clicking "Show N matching events" link:
     - **Highlights matching events** on main grid:
       - Matching events: scale up slightly (1.2x), add ring/border
       - Non-matching events: reduce opacity to 30%
     - **"Clear highlights" button** appears in top bar to reset
   - Clicking elsewhere on card opens **pattern detail view** (can be modal or right drawer)

4. **Create `<PatternDetailView>` component**
   - Full thesis
   - Supporting signals list (linked to events)
   - Counter-signals list (collapsible section)
   - Confidence level + reasoning
   - Last updated date

**Acceptance Criteria:**
- 5 pattern cards display at bottom
- Clicking "Show N events" highlights matching dots on grid
- Non-matching dots fade to 30% opacity
- "Clear highlights" button resets view
- Pattern detail view shows full info

---

### **Phase 2.6: Responsive Design & Polish** (Week 4)

**Goal:** Ensure usability and polish

**Tasks:**
1. **Responsive breakpoints**
   - Desktop (1280px+): Full experience
   - Laptop (1024px+): Horizontal scroll for timeline
   - Tablet (768px+): Cramped but functional
   - Mobile (<768px): Show "best viewed on desktop" message

2. **Performance**
   - Ensure page load <3s
   - Event hover response <100ms
   - Drawer open <200ms
   - Filter changes <300ms

3. **Visual polish**
   - Smooth animations (drawer slide-in, dot scale, opacity transitions)
   - Hover states for all interactive elements
   - Consistent color palette (use entity class colors + grays)

4. **Accessibility**
   - Keyboard navigation:
     - Tab through event dots
     - Enter to open drawer
     - ESC to close drawer
     - Arrow keys to navigate between events (optional)
   - ARIA labels for screen readers
   - Sufficient color contrast (WCAG AA)

**Acceptance Criteria:**
- Works on desktop and laptop
- Page loads in <3s
- All interactions feel smooth
- Keyboard navigation works for core interactions

---

### **Phase 2.7: Final Testing & Bug Fixes** (Week 4-5)

**Goal:** Validate with real users and fix issues

**Tasks:**
1. **Internal testing**
   - Test all interactions (hover, click, filter, highlight)
   - Cross-browser testing (Chrome, Firefox, Safari)
   - Test with different viewport sizes

2. **User testing** (5-10 target users)
   - PMs, investors, analysts
   - Tasks:
     - Find events in a specific quarter and stack layer
     - Understand a strategic pattern (model API consolidation)
     - Filter events by entity class and impact
   - Collect feedback: What's confusing? What's missing? What's surprising?

3. **Iteration**
   - Fix bugs from testing
   - Adjust copy if users are confused
   - Tweak visual hierarchy if needed

**Acceptance Criteria:**
- No critical bugs
- Users can complete all core tasks
- Feedback is positive or constructive (not "this is broken")

---

## Data Contract Interface

The UI will consume these files:

```
/data
  /canonical
    entities.json           # Array of Entity objects
    stack_layers.json       # Array of StackLayer objects (sorted by sort_order)
    action_types.json       # Array of ActionType objects
    entity_classes.json     # Array of EntityClass objects (with colors)
  /events
    v0_seed_40.jsonl        # 42 events (newline-delimited JSON)
  /patterns
    v0_seed_5.jsonl         # 5 patterns (newline-delimited JSON)
```

### Key Fields to Use

**Event (from JSONL):**
```json
{
  "id": "string",
  "title": "string",
  "entity_id": "string (reference)",
  "date": "YYYY-MM-DD",
  "date_precision": "exact | month | quarter | year",
  "action_type": "string (reference)",
  "stack_layers": ["string (reference)"],
  "impact_level": "high | medium | low",
  "description": "string (tooltip + drawer)",
  "strategic_significance": "string (drawer only)",
  "evidence_sources": [
    {
      "url": "string",
      "title": "string",
      "publisher": "string",
      "date": "string",
      "source_type": "string",
      "credibility": "primary | credible-secondary | unverified"
    }
  ],
  "confidence": "confirmed | likely | rumored"
}
```

**Pattern (from JSONL):**
```json
{
  "id": "string",
  "title": "string",
  "pattern_type": "consolidation-motif | strategic-pivot | tech-stack-shift | pressure-field | other",
  "thesis": "string (hypothesis language)",
  "supporting_events": ["event_id_1", "event_id_2", ...],
  "counter_signals": ["event_id_1", ...],
  "confidence": "high | medium | low",
  "confidence_reasoning": "string",
  "time_range": {"start": "YYYY-MM-DD", "end": "YYYY-MM-DD"}
}
```

---

## Deployment (Week 5-6)

Once UI is complete:

1. **Build static site**
   ```bash
   npm run build
   ```

2. **Deploy to hosting**
   - **Netlify** (recommended): Drag-and-drop `dist/` folder
   - **Vercel**: Connect GitHub repo, auto-deploy
   - **GitHub Pages**: `npm run build && gh-pages -d dist`

3. **Custom domain** (optional)
   - E.g., `aistrategicactions.com` or `atlas.yourdomain.com`

4. **Analytics** (optional)
   - Add Plausible or Google Analytics to track:
     - Page views
     - Event clicks
     - Pattern interactions
     - Session duration

---

## Success Metrics (Post-Launch)

Track these to validate product-market fit:

### Usage Metrics
- **Monthly active users:** 500+ in first month
- **Average session duration:** 8-12 minutes (indicates engagement)
- **Events viewed per session:** 10+ (exploration behavior)
- **Pattern interactions:** 30%+ of users click on a pattern card

### Qualitative Metrics
- **User feedback:** "This helped me understand [specific strategic insight]"
- **Shares:** Users share the tool with colleagues (viral coefficient >1.2)
- **Backlinks:** Referenced in blog posts, investment memos, strategy docs

### Content Validation
- **No fact corrections:** Zero factual errors reported (evidence quality holds)
- **Pattern debates:** Users engage with patterns but don't dispute evidence layer

---

## Open Questions for UI Implementation

These can be resolved during development:

### High Priority
1. **Date positioning within quarters:** How do we handle events that have exact dates vs. just quarters?
   - **Recommendation:** If exact date known, position proportionally within quarter. If only quarter known, center in quarter.

2. **Event overlap:** What if multiple events happen on the same date in the same layer?
   - **Recommendation:** Offset dots slightly (jitter) to prevent overlap. Use deterministic jitter (based on event ID) so it's consistent.

3. **Pattern highlight interaction:** Should highlights persist when scrolling timeline?
   - **Recommendation:** Yes, highlights should scroll with grid. Add "Clear highlights" button in sticky top bar.

### Medium Priority
4. **Related events in drawer:** Should clicking a related event open its drawer (replacing current) or stack drawers?
   - **Recommendation:** Replace current drawer content (simpler UX, avoids stacking complexity).

5. **Mobile experience:** Show degraded view or "best viewed on desktop" message?
   - **Recommendation:** Show message for <768px, attempt basic stacked layout for 768-1024px.

6. **Performance with 100+ events:** Current dataset is 42 events. Will grid handle 100+ dots?
   - **Recommendation:** Test with 100 events. If slow, add virtualization or pagination (show 1 year at a time).

---

## Development Checklist

Before starting each phase, verify:

- [ ] Phase 2.1: Data contract is frozen (no schema changes)
- [ ] Phase 2.2: Event dots are clickable and hoverable
- [ ] Phase 2.3: Drawer has all required sections from REQUIREMENTS_v0.md
- [ ] Phase 2.4: Filters are multi-select (not single-select)
- [ ] Phase 2.5: Pattern section is visually separated from events (epistemic discipline)
- [ ] Phase 2.6: Page loads in <3s, interactions feel smooth
- [ ] Phase 2.7: All 5-10 test users can complete core tasks

---

## Next Steps

**Immediate actions:**

1. **Choose tech stack** (React + Tailwind + Vite recommended)
2. **Set up project** (`npm create vite@latest app`)
3. **Start Phase 2.1:** Load data and render basic grid
4. **Iterate weekly:** Get 1 phase done per week, demo internally

**When to loop back:**

- If users request features not in MVP scope → Add to [REQUIREMENTS_v0.md](REQUIREMENTS_v0.md) "Post-MVP" section
- If data quality issues arise → Fix in `/data` and re-run `node scripts/validate_data.js`
- If new events or patterns are needed → Add to JSONL files and validate

---

## Related Documents

- [PROJECT_CONTEXT.md](PROJECT_CONTEXT.md) — Core principles
- [REQUIREMENTS_v0.md](REQUIREMENTS_v0.md) — Full MVP spec
- [DATA_MODEL_DRAFT.yaml](../data/schema/DATA_MODEL_DRAFT.yaml) — Data schemas
- [SOURCES.md](SOURCES.md) — Evidence quality standards
- [EVAL_RUBRIC.md](EVAL_RUBRIC.md) — Quality assessment rubric
- [reference_screen.png](../ui/reference_screen.png) — Visual reference
- [reference_code.html](../ui/reference_code.html) — HTML/CSS reference

---

**Status:** ✅ Ready to begin UI implementation
**Data Validation:** ✅ Passed (27 events high-quality, 15 acceptable, 0 rejected)
**Estimated Completion:** 4-6 weeks from start

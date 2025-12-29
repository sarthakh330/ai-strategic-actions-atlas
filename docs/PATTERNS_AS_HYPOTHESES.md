# Patterns as Hypotheses — Framework

## Core Principle

**Patterns are derived interpretations, not empirical facts.**

They are hypotheses about strategic trends, tested against event evidence and subject to revision. They must never be presented as causal claims or definitive conclusions.

---

## Pattern Representation Structure

Every pattern must include the following components:

### 1. **Hypothesis Statement**

A clear, testable claim about what is happening.

**Language discipline:**
- ✅ "Model API providers **appear to be** consolidating..."
- ✅ "Evidence **suggests** a shift toward..."
- ✅ "Multiple signals **indicate** a possible..."
- ❌ "Model API providers **are** consolidating..." (too definitive)
- ❌ "This **proves** a shift..." (causal overreach)

### 2. **Supporting Signals**

A list of specific events (≥3) that support this pattern. Each signal must:

- Be a confirmed or likely event (not rumored)
- Be dated and stack-positioned
- Have a clear link to the pattern claim
- Include brief reasoning for why it supports the hypothesis

**Example:**
```yaml
supporting_signals:
  - event_id: "openai-assistants-api-2023q4"
    reasoning: "OpenAI moved up-stack into orchestration, bypassing middleware"

  - event_id: "anthropic-tool-use-2024q1"
    reasoning: "Anthropic added native function calling, reducing reliance on frameworks"

  - event_id: "google-agent-space-2024q2"
    reasoning: "Google introduced Agent Space, competing directly with LangChain"
```

### 3. **Counter-Signals**

Events or observations that **complicate, contradict, or limit** the pattern. This is critical for epistemic honesty.

**Why this matters:**
- Shows intellectual rigor
- Prevents overconfidence
- Helps users form their own judgments
- Makes the product defensible against criticism

**Example:**
```yaml
counter_signals:
  - event_id: "langchain-series-b-2024q3"
    reasoning: "LangChain raised $50M despite vertical integration, suggesting continued market demand"

  - observation: "Middleware startups report strong enterprise adoption despite model provider moves"
    source: "The Information, Sep 2024"
```

### 4. **Confidence Level**

An explicit assessment of how strong the pattern is:

| Level | Definition | Criteria |
|-------|------------|----------|
| **High** | Strong evidence, minimal counter-signals, multiple independent data points | ≥5 supporting events, <2 counter-signals, corroborated by market data |
| **Medium** | Moderate evidence, some counter-signals or gaps, emerging consensus | 3-4 supporting events, 2-3 counter-signals, or limited time range |
| **Low** | Early-stage pattern, significant uncertainty or contradictions | 3 supporting events, ≥3 counter-signals, or very recent emergence |

**Consequence:** Low-confidence patterns may still be valuable (they flag emerging trends) but must be clearly labeled in the UI.

### 5. **Confidence Reasoning**

A brief explanation of **why** this confidence level was assigned. This should reference:

- Evidence strength (number and quality of supporting signals)
- Counter-signal weight (how significant are the contradictions?)
- Time span (is this sustained or a short-term cluster?)
- Independent corroboration (do market reports, expert commentary, or financial data support this?)

**Example:**
```
Confidence: Medium

Reasoning: Five model providers launched orchestration features in 2024,
suggesting upward integration. However, LangChain's continued funding and
Databricks' acquisition of MosaicML complicate the narrative. The pattern
is real but not universal. Confidence may increase if more providers exit
partnerships with middleware vendors.
```

---

## Pattern Types (Initial Taxonomy)

Based on the reference screen and design discussion archaeology, we identify these pattern categories:

### 1. **Consolidation Motif**

**Definition:** A reduction in the number of independent players in a stack layer, often through acquisitions or exits.

**Example from reference screen:**
- **Title:** "Model API Consolidation"
- **Thesis:** "Independent inference providers saw a 40% reduction in share as foundational labs verticalized serving stacks in early 2025."
- **Confidence:** Medium (depends on supporting market data)

### 2. **Strategic Pivot**

**Definition:** A significant shift in a company's or category's strategic direction.

**Example from reference screen:**
- **Title:** "The 'Agentic' Shift"
- **Thesis:** "Infrastructure providers (OpenAI, Anthropic) moved up-stack to offer orchestration layers, creating conflict with middleware startups."
- **Confidence:** High (if backed by multiple launches and partnership terminations)

### 3. **Tech Stack Shift**

**Definition:** A change in the dominant technical approach or architecture within a layer.

**Example from reference screen:**
- **Title:** "Reasoning over Retrieval"
- **Thesis:** "Context window wars ceased as 'Chain of Thought' became the primary differentiator for complex enterprise tasks."
- **Confidence:** Medium (requires evidence of adoption shifts, not just launches)

### 4. **Pressure Field** (Proposed)

**Definition:** A region of the stack where competitive intensity or strategic tension is unusually high.

**Example (hypothetical):**
- **Title:** "Middleware Under Pressure"
- **Thesis:** "Orchestration startups face dual pressure: vertical integration from model providers above and custom tooling from enterprises below."
- **Confidence:** Low-Medium (emerging, needs more longitudinal data)

### 5. **Other / Emergent**

Catch-all for patterns that don't fit existing categories. These should be rare and may suggest the taxonomy needs expansion.

---

## Pattern Lifecycle

Patterns are not static. They evolve as new evidence emerges:

### States

1. **Draft** — Pattern hypothesis under review, not yet published
2. **Published** — Pattern is live in the UI, visible to users
3. **Under Review** — New evidence suggests the pattern needs revision
4. **Deprecated** — Pattern no longer supported by evidence or superseded by a better model

### Versioning

When significant new evidence changes a pattern:

- **Minor update** (new supporting/counter signals added) → Update in place
- **Major revision** (confidence level changes, thesis rewording) → Create new version, archive old
- **Deprecation** (pattern no longer holds) → Mark as deprecated with explanation

**Example workflow:**
```
v1.0: "Model API Consolidation" (Medium confidence, 5 supporting events)
  ↓
v1.1: Add 2 new supporting events (raise to High confidence)
  ↓
v2.0: Add 4 counter-signals (lower to Medium confidence, revise thesis)
  ↓
deprecated: New market data shows consolidation reversed (archive with explanation)
```

---

## UI Representation Guidelines

### Pattern Cards (Bottom Panel)

Each pattern card should display:

1. **Pattern Type Badge** (top-left, color-coded)
   - Consolidation Motif → Indigo
   - Strategic Pivot → Neutral gray
   - Tech Stack → Teal
   - Pressure Field → Amber

2. **Title** (bold, concise)

3. **Thesis** (2-3 sentences, written as hypothesis)

4. **Confidence Indicator** (optional, subtle)
   - High → Gold badge or solid border
   - Medium → No special indicator
   - Low → Dashed border or "Emerging" label

5. **Event Count** (interactive link)
   - "Show 3 matching events" (supporting)
   - Optional: "2 counter-signals" (on hover or in expanded view)

6. **Last Updated** (small timestamp, for transparency)

### Pattern Detail View (When Expanded or Clicked)

Should include:

- Full thesis
- **Supporting Evidence** section with event list
- **Counter-Signals** section (collapsible, but always accessible)
- **Confidence Reasoning** (why this level?)
- **Timeline visualization** (when did these events cluster?)
- **Related Patterns** (if applicable)

### Visual Distinction from Events

Patterns must be **visually separated** from the evidence layer:

- Events → Top panel (stack × time grid)
- Patterns → Bottom panel or overlay mode

**Never mix them on the same visual plane** (this would conflate evidence with interpretation).

---

## Editorial Process (For Internal Use)

### Creating a Pattern

1. **Identify a cluster** of ≥3 related events across time and/or stack layers
2. **Draft a hypothesis** that explains the cluster
3. **Collect supporting signals** (link to specific events)
4. **Search for counter-signals** (actively look for contradictions)
5. **Assess confidence** using the criteria above
6. **Write reasoning** for the confidence level
7. **Submit for review** (if multi-person team) or self-review after 24 hours

### Reviewing a Pattern

Checklist for reviewers:

- [ ] Is the thesis written as a hypothesis (not a fact)?
- [ ] Are there ≥3 supporting events?
- [ ] Have counter-signals been actively sought?
- [ ] Is the confidence level justified by the reasoning?
- [ ] Does the pattern provide strategic insight (not just event summarization)?
- [ ] Is it time-bound (not claimed as eternal truth)?

### Maintaining Patterns

- **Monthly review:** Check if new events support or contradict existing patterns
- **Quarterly audit:** Assess whether low-confidence patterns should be promoted, revised, or deprecated
- **Version control:** Track major changes to pattern definitions over time

---

## Anti-Patterns (What NOT to Do)

### ❌ Causal Claims

**Bad:** "OpenAI's move caused LangChain to pivot."

**Why:** Time sequence ≠ causation. We observe sequences, not causes.

**Good:** "Following OpenAI's orchestration launch, LangChain announced a platform pivot, suggesting possible market repositioning."

### ❌ Cherry-Picking Evidence

**Bad:** Only listing supporting events, ignoring contradictions.

**Why:** This is intellectually dishonest and makes the product untrustworthy.

**Good:** List both supporting and counter-signals, letting users form their own conclusions.

### ❌ Eternal Patterns

**Bad:** "The middleware layer is dying."

**Why:** Patterns are time-bound observations, not permanent truths.

**Good:** "Between Q4 2024 and Q1 2025, middleware startups faced increased pressure from vertical integration, though enterprise adoption remained strong."

### ❌ Beautiful Misinformation

**Bad:** Stunning visualization of a weakly-supported pattern with no confidence indicator.

**Why:** Visual polish can mask epistemic weakness.

**Good:** High-quality design that makes confidence levels and counter-signals legible.

---

## Example Pattern: Full Specification

```yaml
pattern:
  id: "model-api-consolidation-2024-2025"
  title: "Model API Consolidation"
  pattern_type: "consolidation-motif"

  thesis: |
    Between Q4 2024 and Q1 2025, independent inference providers experienced
    a significant reduction in market share as foundational model labs
    (OpenAI, Anthropic, Google) verticalized their serving stacks and
    offered competitive pricing. This suggests a consolidation toward
    first-party APIs, though specialized providers (e.g., high-throughput,
    regional compliance) may retain niche positions.

  time_range:
    start: "2024-10-01"
    end: "2025-03-31"

  affected_layers:
    - "model-apis"

  supporting_signals:
    - event_id: "openai-batch-api-2024q4"
      reasoning: "OpenAI undercut third-party pricing with Batch API"

    - event_id: "anthropic-claude-3-pricing-2024q4"
      reasoning: "Anthropic reduced API pricing by 30%, competing with resellers"

    - event_id: "google-vertex-ai-expansion-2025q1"
      reasoning: "Google expanded Vertex AI to more regions, reducing need for intermediaries"

    - event_id: "together-ai-pivot-2025q1"
      reasoning: "Together.ai shifted from generic inference to specialized fine-tuning"

    - market_data: "Menlo Ventures report Q1 2025: Foundational labs now 70% of inference spend (up from 55% in Q4 2024)"

  counter_signals:
    - event_id: "replicate-series-b-2025q1"
      reasoning: "Replicate raised $40M, suggesting investor confidence in independent providers"

    - observation: "High-throughput use cases (e.g., AI-native apps) still prefer specialized providers"
      source: "Andreessen Horowitz infrastructure survey, Feb 2025"

    - event_id: "fireworks-ai-enterprise-deals-2025q1"
      reasoning: "Fireworks.ai signed 10+ enterprise contracts for regional compliance"

  confidence: "medium"

  confidence_reasoning: |
    Strong evidence of pricing pressure and market share shifts, corroborated
    by Menlo Ventures data. However, continued funding for independent providers
    and sustained enterprise demand for specialized services complicate the
    narrative. Consolidation is real but not total. Confidence may rise to High
    if more providers exit or pivot by Q2 2025.

  status: "published"

  metadata:
    created_at: "2025-03-15"
    updated_at: "2025-03-20"
    author: "strategic-analysis-team"
```

---

## Summary: Epistemic Discipline

Patterns are the **interpretation layer** of the Atlas. They provide strategic insight but must always:

1. Be written as hypotheses, not facts
2. Include both supporting and counter-signals
3. Have explicit confidence levels
4. Be time-bound and revisable
5. Be visually distinguished from the evidence layer

This discipline is what separates the Atlas from "AI slop" and makes it a defensible strategic intelligence tool.

---

**Related Documents:**
- [PROJECT_CONTEXT.md](PROJECT_CONTEXT.md) — Core principles
- [DATA_MODEL_DRAFT.yaml](DATA_MODEL_DRAFT.yaml) — Pattern entity schema
- [DECISIONS_AND_ASSUMPTIONS.md](DECISIONS_AND_ASSUMPTIONS.md) — What we know vs. assume

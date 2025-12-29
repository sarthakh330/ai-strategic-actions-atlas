# AI Strategic Actions Atlas — Project Context

## What This Product Is

The **AI Strategic Actions Atlas** is a strategic intelligence surface for understanding AI ecosystem evolution across **stack layers** and **time horizons** (2023–2025).

### Core Value Proposition

This is **not** another market map or news aggregator. It is a system for:

1. **Mapping strategic actions** (launches, acquisitions, investments, platform moves) across a defined AI stack
2. **Deriving strategic patterns** (consolidation, pivots, pressure fields) from empirical evidence
3. **Providing time-aware context** for understanding how company strategies and ecosystem dynamics evolve

### Primary Coordinate System

**Stack × Time**, not Company × Category.

- The fundamental view is **stack layers** (horizontal axis: time; vertical axis: stack position)
- **Companies** appear as colored dots/annotations on this coordinate system
- This inverts the typical "company-centric" approach used in most market intelligence tools

### Canonical Unit of Analysis

The **Strategic Action** (or "Strategic Move") — a dated, stack-positioned corporate event with:

- **Type**: Launch, Acquisition, Acquihire, Investment, Partnership, Open Source Release, Platform Shift
- **Stack layer(s)**: Where the action lands in the AI stack (e.g., Model APIs, Training & Compute, Orchestration)
- **Entity**: Who took the action (categorized: Big Tech, Startup, Frontier Lab, Open Source)
- **Impact**: Inferred significance (High / Medium / Low)
- **Evidence**: Primary sources (announcements, filings, credible reporting)
- **Strategic interpretation**: Why this matters (derived, not asserted)

---

## What This Product Is NOT

### Explicit Non-Goals

1. **Not a news feed**
   Actions are curated and structured, not scraped headlines.

2. **Not causal claims**
   The tool shows **sequences** and **patterns**, not causality. "X happened after Y" ≠ "Y caused X."

3. **Not company-centric intelligence**
   Companies are **signals**, not the organizing principle. The stack and time are primary.

4. **Not neutral or comprehensive**
   The stack model is **opinionated**. Layers are included only if they have sufficient action density. Not every possible category is represented.

5. **Not "AI slop" or beautiful misinformation**
   Patterns are derived from evidence with clear confidence levels. Visual polish serves structural clarity, not persuasion.

6. **Not predictive**
   This tool surfaces what has happened and ongoing trends. It does not forecast future actions (though users may form hypotheses).

---

## Core Design Principles

### 1. **Three Epistemic Layers (Never Mix Them)**

The product maintains strict separation between:

| Layer | Description | Examples |
|-------|-------------|----------|
| **Evidence** | Discrete, dated corporate actions with primary sources | "OpenAI launched GPT-4 in Q1 2023" |
| **Market Reality** | Aggregated spend, adoption data, and category mass | "Model API spend reached $X in 2024" (per Menlo Ventures) |
| **Interpretation** | Derived patterns and strategic motifs | "Model API consolidation reduced independent providers by 40%" |

**Why this matters:** Mixing these layers creates "beautiful misinformation" — visually compelling but epistemically unsound claims.

### 2. **Time ≠ Causality**

- The timeline shows **sequences**, not **causes**.
- A vertical slice (e.g., "Q1 2024") shows **co-occurrence**, not coordination.
- Patterns are **correlations** and **temporal clusters**, not explanations.

**Language discipline:**
- ✅ "Following X, we observed Y"
- ✅ "This aligns with trend Z"
- ❌ "X caused Y"
- ❌ "This proves Z"

### 3. **Stack Layers Must Earn Their Place**

A layer exists in the visualization only if:

1. **Sufficient action density**: Multiple strategic actions over the time horizon
2. **Meaningful differentiation**: Distinct from adjacent layers in economic/strategic terms
3. **Evidence-backed**: Supported by credible industry references (e.g., Menlo Ventures AI spend report)

**Consequence:** Thin or speculative categories (e.g., "Agent Memory" in 2023) may be merged or excluded until action density justifies separation.

### 4. **Patterns Are Hypotheses, Not Facts**

- Patterns like "Model API Consolidation" or "Agentic Shift" are **interpretations** derived from multiple signals.
- Each pattern must include:
  - **Supporting evidence** (specific actions that suggest this pattern)
  - **Counter-signals** (actions that complicate or contradict the pattern)
  - **Confidence level** (High / Medium / Low based on evidence strength)

**Consequence:** Pattern cards are interactive. Users can drill into the evidence, not just accept the narrative.

### 5. **Opinionated Stack Model (Not Neutral)**

The product declares a specific AI stack structure and sticks to it. This is **intentional**.

**Current stack model** (subject to refinement):

```
APPLICATIONS
├── Horizontal AI (Assistants, Search)
├── Departmental AI (Sales, Dev, Legal)
└── Vertical AI (Bio, Material, Finance)

INFRASTRUCTURE
├── Model APIs (Inference, Fine-tuning)
├── Training & Compute (GPUs, Custom Silicon)
└── Data / Orch. / Obs. (Vector DBs, Eval, Orchestration)
```

This model is informed by Menlo Ventures' AI spend analysis and industry adoption patterns.

**Why opinionated?** Neutrality obscures strategic reasoning. An opinionated model lets users understand:
- Why Google emphasizes talent absorption and platform leverage
- Why Microsoft focuses on distribution
- Why Meta invests in open leverage
- Why OpenAI tightens vertical integration

### 6. **Visual Quality Serves Structural Clarity**

- High-quality design is **not decoration**. It makes epistemic distinctions legible.
- Dot size → Impact level
- Dot color → Entity class
- Vertical position → Stack layer
- Horizontal position → Time
- Pattern cards → Interpretation layer (visually separated from evidence)

**Consequence:** "Beautiful but wrong" is worse than "plain but correct."

---

## Strategic Context: Why This Matters

### The Problem This Solves

The AI ecosystem is evolving rapidly, but existing tools provide either:

1. **News aggregation** (high volume, low structure)
2. **Static market maps** (snapshot-in-time, no temporal context)
3. **Company-centric databases** (miss cross-stack patterns)

None of these help strategic thinkers answer:

- "How is the middleware layer evolving relative to model providers?"
- "Which stack positions saw the most action in Q4 2024?"
- "Is there evidence of vertical integration by model providers?"
- "What does Google's acquihire pattern suggest about their orchestration strategy?"

### The User Mental Model

Users should be able to:

1. **Scan the stack × time surface** to spot density clusters
2. **Hover/click events** to see evidence and strategic context
3. **Explore pattern overlays** to understand derived insights
4. **Question patterns** by reviewing supporting/counter evidence
5. **Export insights** for strategic memos or investment theses

This is **Perplexity for AI strategy** — a dedicated surface optimized for strategic reasoning about AI ecosystem evolution.

---

## Version and Status

- **Version**: v0 (Conceptual stabilization phase)
- **Status**: Pre-implementation. Establishing data model and reasoning framework before building UI.
- **Next Phase**: MVP implementation with constrained scope (see REQUIREMENTS_v0.md)

---

## Related Documents

- [DATA_MODEL_DRAFT.yaml](DATA_MODEL_DRAFT.yaml) — Entity schemas and relationships
- [PATTERNS_AS_HYPOTHESES.md](PATTERNS_AS_HYPOTHESES.md) — Pattern representation framework
- [DECISIONS_AND_ASSUMPTIONS.md](DECISIONS_AND_ASSUMPTIONS.md) — What we know vs. what we assume
- [REQUIREMENTS_v0.md](REQUIREMENTS_v0.md) — MVP scope and feature set

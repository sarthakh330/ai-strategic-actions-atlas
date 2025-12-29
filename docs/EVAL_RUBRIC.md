# Event & Pattern Quality Rubric

**Purpose:** Provide a versioned, systematic framework for evaluating the quality of events and patterns before they ship into the canonical dataset.

**Version:** 0.1 (Initial)
**Last Updated:** 2025-12-28

---

## Philosophy

The rubric exists to prevent "AI slop" — content that looks polished but lacks epistemic rigor. Every event and pattern must clear a **minimum quality bar** before it enters `data/events/v0_seed_40.jsonl` or `data/patterns/v0_seed_5.jsonl`.

**Scoring Principle:**
- Each dimension is scored **0–N** (varies by dimension)
- Total score determines disposition: **Ship**, **Revise**, or **Reject**
- Thresholds are set per content type (events vs. patterns)

---

## Event Quality Rubric (v0.1)

**Max Score:** 10 points
**Minimum to Ship:** 7/10

### Dimension 1: Evidence Quality (0–3 points)

Assesses the strength and credibility of sources.

| Score | Criteria |
|-------|----------|
| **3** | ≥2 sources, at least one is `primary` (official announcement, press release, filing) |
| **2** | 1 `primary` source OR ≥2 `credible-secondary` sources |
| **1** | 1 `credible-secondary` source only |
| **0** | Only `unverified` sources OR no sources cited |

**Rationale:** Events with primary sources are inherently more trustworthy. Multiple sources provide corroboration.

---

### Dimension 2: Timestamp Correctness (0–2 points)

Assesses date precision and accuracy.

| Score | Criteria |
|-------|----------|
| **2** | Exact date (YYYY-MM-DD) confirmed by source, `date_precision: "exact"` |
| **1** | Month or quarter known, `date_precision: "month"` or `"quarter"` |
| **0** | Date is uncertain, inconsistent across sources, or outside project range (2023-2025) |

**Rationale:** Temporal accuracy is critical for timeline visualization. Vague dates reduce utility.

---

### Dimension 3: Classification Correctness (0–2 points)

Assesses whether the event is correctly categorized by stack layer, action type, and entity class.

| Score | Criteria |
|-------|----------|
| **2** | Stack layer, action type, and entity class are all accurate and unambiguous |
| **1** | Classification is mostly correct but one field is debatable (e.g., event could fit two layers) |
| **0** | Misclassified (e.g., a product launch tagged as "acquisition") |

**Rationale:** Incorrect classification breaks filters and undermines trust in the data model.

---

### Dimension 4: Strategic Relevance (0–2 points)

Assesses whether the event is significant enough to include.

| Score | Criteria |
|-------|----------|
| **2** | High strategic significance: major product launch, acquisition, market shift, or platform move |
| **1** | Medium relevance: notable but not transformative (e.g., incremental feature, partnership) |
| **0** | Low relevance: trivial update, minor bug fix, or not strategic (e.g., "Company X hires intern") |

**Rationale:** The Atlas is not a news feed. Only strategic actions should be included.

**Examples of high relevance:**
- OpenAI launches GPT-4
- Google acquires DeepMind
- LangChain raises $25M Series A
- Anthropic announces Claude 3.5 Sonnet

**Examples of low relevance:**
- OpenAI updates pricing page design
- Employee promotion announcements
- Minor API parameter changes

---

### Dimension 5: Clarity and Usability (0–1 point)

Assesses whether the event description is clear, concise, and UI-ready.

| Score | Criteria |
|-------|----------|
| **1** | Description is 1-3 sentences, factual, jargon-free, and ready for tooltip/drawer display |
| **0** | Description is too long, too technical, uses marketing speak, or is unclear |

**Rationale:** The Atlas is for strategic thinkers, not insiders. Clarity matters.

**Good example:**
> "OpenAI launched GPT-4, a multimodal language model with improved reasoning and broader knowledge than GPT-3.5."

**Bad example:**
> "OpenAI released the next iteration of their LLM stack, featuring RLHF-tuned transformer architecture with expanded context windows and multimodal input capabilities via CLIP-inspired vision encoding."

---

### Event Score Interpretation

| Total Score | Disposition | Action |
|-------------|-------------|--------|
| **7–10** | ✅ **Ship** | Event is ready for `v0_seed_40.jsonl` |
| **5–6** | ⚠️ **Revise** | Fixable issues (improve sources, clarify description, correct classification) |
| **0–4** | ❌ **Reject** | Event is not strategic, poorly sourced, or fundamentally flawed |

**Workflow:**
- Rejected events → Move to `research/extracts/needs_review.md` with notes
- Revise events → Fix issues and re-score
- Shipped events → Commit to `data/events/v0_seed_40.jsonl`

---

## Pattern Quality Rubric (v0.1)

**Max Score:** 12 points
**Minimum to Ship:** 9/12

Patterns are **interpretations**, not facts. They require stricter epistemic discipline.

### Dimension 1: Hypothesis Language (0–3 points)

Assesses whether the pattern is written as a hypothesis (not a fact).

| Score | Criteria |
|-------|----------|
| **3** | Uses hypothesis language throughout: "appears to," "suggests," "may indicate," "evidence shows" |
| **2** | Mostly hypothesis language, but 1-2 definitive statements slip through |
| **1** | Mixed: Some hypothesis language, but also causal claims ("X caused Y") or definitive statements |
| **0** | Stated as fact: "X is consolidating," "Y has shifted," with no hedging |

**Rationale:** Patterns are **not facts**. They are interpretations that must be open to revision.

**Good example:**
> "Between Q4 2024 and Q1 2025, independent inference providers **appear to have experienced** a significant reduction in market share as foundational model labs verticalized their serving stacks."

**Bad example:**
> "Independent inference providers **lost** market share because foundational model labs verticalized their serving stacks."

---

### Dimension 2: Supporting Evidence Strength (0–3 points)

Assesses the quantity and quality of events backing the pattern.

| Score | Criteria |
|-------|----------|
| **3** | ≥5 supporting events, all confirmed or likely, spanning ≥2 quarters |
| **2** | 4 supporting events, confirmed or likely |
| **1** | 3 supporting events (minimum threshold) |
| **0** | <3 events OR most events are "rumored" |

**Rationale:** Patterns require multiple data points. A pattern with only 2 events is not a pattern—it's an anecdote.

---

### Dimension 3: Counter-Signals Included (0–2 points)

Assesses epistemic honesty: Are contradictions acknowledged?

| Score | Criteria |
|-------|----------|
| **2** | ≥2 counter-signals explicitly listed, with reasoning for why they complicate the pattern |
| **1** | 1 counter-signal listed, or acknowledgment of uncertainty |
| **0** | No counter-signals, cherry-picked evidence only |

**Rationale:** Intellectual honesty is critical. Patterns without counter-signals are propaganda.

---

### Dimension 4: Confidence Justification (0–2 points)

Assesses whether the confidence level (High/Medium/Low) is justified.

| Score | Criteria |
|-------|----------|
| **2** | Confidence level matches evidence strength, reasoning is explicit and credible |
| **1** | Confidence level is reasonable but reasoning is vague or incomplete |
| **0** | Confidence is unjustified (e.g., "High" with only 3 events and strong counter-signals) |

**Rationale:** Confidence must be earned. Overconfidence undermines credibility.

**Confidence criteria (from PATTERNS_AS_HYPOTHESES.md):**
- **High:** ≥5 supporting events, <2 counter-signals, corroborated by market data
- **Medium:** 3-4 supporting events, 2-3 counter-signals, or limited time range
- **Low:** 3 supporting events, ≥3 counter-signals, or very recent emergence

---

### Dimension 5: Time-Boundedness (0–1 point)

Assesses whether the pattern is clearly scoped to a time range.

| Score | Criteria |
|-------|----------|
| **1** | Pattern has explicit `time_range` (start/end dates) and description references this range |
| **0** | Pattern is stated as eternal truth with no time boundaries |

**Rationale:** Patterns are **not permanent**. They describe a specific period and may reverse.

---

### Dimension 6: Strategic Insight (0–1 point)

Assesses whether the pattern provides non-obvious insight.

| Score | Criteria |
|-------|----------|
| **1** | Pattern reveals a non-obvious trend, connection, or market dynamic |
| **0** | Pattern is trivial ("Companies launched products in 2024") or just summarizes events without insight |

**Rationale:** Patterns should be **interpretive**, not just descriptive. "Several companies launched agents" is not a pattern. "Vertical integration pressured middleware startups" is.

---

### Pattern Score Interpretation

| Total Score | Disposition | Action |
|-------------|-------------|--------|
| **9–12** | ✅ **Ship** | Pattern is ready for `v0_seed_5.jsonl` |
| **6–8** | ⚠️ **Revise** | Fixable issues (add counter-signals, improve language, strengthen evidence) |
| **0–5** | ❌ **Reject** | Pattern is poorly evidenced, stated as fact, or lacks insight |

---

## Review Workflow

### For Events:

1. **Score the event** using the 5 dimensions (max 10 points)
2. **If 7+:** Approve for `data/events/v0_seed_40.jsonl`
3. **If 5-6:** Flag for revision, note specific issues
4. **If 0-4:** Reject, move to `research/extracts/needs_review.md`

### For Patterns:

1. **Score the pattern** using the 6 dimensions (max 12 points)
2. **If 9+:** Approve for `data/patterns/v0_seed_5.jsonl`
3. **If 6-8:** Flag for revision, note specific issues
4. **If 0-5:** Reject or defer (may revisit when more evidence emerges)

---

## Example Evaluation: Event

**Event:** "OpenAI launches GPT-4"

| Dimension | Score | Reasoning |
|-----------|-------|-----------|
| Evidence Quality | 3/3 | Primary source (OpenAI blog) + TechCrunch coverage |
| Timestamp Correctness | 2/2 | Exact date: 2023-03-14 |
| Classification Correctness | 2/2 | Stack: Model APIs, Action: Product Launch, Entity: Frontier Lab |
| Strategic Relevance | 2/2 | Major model launch, high market impact |
| Clarity | 1/1 | Description is concise and jargon-free |
| **Total** | **10/10** | ✅ **Ship immediately** |

---

## Example Evaluation: Pattern

**Pattern:** "Model API Consolidation (2024-2025)"

| Dimension | Score | Reasoning |
|-----------|-------|-----------|
| Hypothesis Language | 3/3 | Uses "appears to," "suggests," "may indicate" |
| Supporting Evidence | 3/3 | 5 events (OpenAI pricing, Anthropic expansion, Google Vertex, etc.) |
| Counter-Signals | 2/2 | Notes LangChain funding, Replicate growth |
| Confidence Justification | 2/2 | Medium confidence, justified by evidence |
| Time-Boundedness | 1/1 | Explicit range: Q4 2024 - Q1 2025 |
| Strategic Insight | 1/1 | Reveals vertical integration pressure on middleware |
| **Total** | **12/12** | ✅ **Ship immediately** |

---

## Versioning and Evolution

This rubric is **versioned** and will evolve:

- **v0.1** (Current): Initial criteria for MVP dataset (40 events, 5 patterns)
- **v0.2** (Future): May add dimensions (e.g., "Market Data Corroboration" for patterns)
- **v1.0** (Post-MVP): May adjust thresholds based on user feedback

**Backwards compatibility:**
- Events scored under v0.1 do not need re-scoring unless evidence changes
- New versions apply to new content only

---

## Related Documents

- [SOURCES.md](SOURCES.md) — Evidence quality standards
- [PATTERNS_AS_HYPOTHESES.md](PATTERNS_AS_HYPOTHESES.md) — Pattern framework
- [DATA_MODEL_DRAFT.yaml](../data/schema/DATA_MODEL_DRAFT.yaml) — Entity schemas

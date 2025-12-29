# Evidence Sources — Quality Standards and Citation Rules

**Purpose:** Define what qualifies as evidence for events in the Atlas and how to cite sources appropriately.

**Version:** 0.1 (Initial)

---

## Core Principle: Evidence Over Inference

Every event in the Atlas must be **backed by at least one credible source**. This is non-negotiable. The product's credibility depends on maintaining a high evidence bar.

**What counts as "backed by evidence":**
- Primary source (official announcement, press release, SEC filing, company blog)
- Credible secondary source (reputable journalism: NYT, WSJ, The Information, Bloomberg, TechCrunch, etc.)
- Market research report from established firms (Menlo Ventures, Gartner, a16z, Sequoia)

**What does NOT count:**
- Social media speculation (unless from official company account)
- Unverified blog posts
- Anonymous forum posts
- "People familiar with the matter" without credible publication
- AI-generated content aggregators

---

## Source Quality Tiers

### **Tier 1: Primary Sources** (Credibility: `primary`)

These are the gold standard. Use these whenever available.

**Qualifies as primary:**
- Official company blog post or press release
- SEC filings (10-K, 8-K, S-1)
- Official product documentation or announcement
- Company-published case studies or whitepapers
- Direct quotes from executives in official channels

**Examples:**
- `https://openai.com/blog/gpt-4` (OpenAI blog)
- `https://www.sec.gov/edgar/` (SEC filings)
- `https://www.anthropic.com/news/claude-3-5-sonnet` (Anthropic announcement)

---

### **Tier 2: Credible Secondary Sources** (Credibility: `credible-secondary`)

These are reputable publications with editorial standards and fact-checking.

**Qualifies as credible-secondary:**
- Major news outlets: NYT, WSJ, Bloomberg, Reuters, Financial Times
- Tech journalism: TechCrunch, The Information (paywalled), The Verge, Ars Technica
- Industry analysis: a16z, Sequoia, Menlo Ventures, Gartner, CB Insights
- Academic institutions or research labs (MIT, Stanford AI Lab)

**Requirements:**
- Named journalist or researcher
- Publication date clearly stated
- Editorial oversight (not user-generated content)

**Examples:**
- `https://www.theinformation.com/articles/...` (The Information)
- `https://techcrunch.com/2024/03/15/...` (TechCrunch)
- `https://menlovc.com/perspective/2025-the-state-of-generative-ai-in-the-enterprise/` (Menlo Ventures)

---

### **Tier 3: Unverified Sources** (Credibility: `unverified`)

These may be directionally useful but **should not be the sole evidence** for an event.

**Examples:**
- Twitter/X posts (even from executives, unless official announcement)
- Reddit threads or Hacker News comments
- LinkedIn posts
- Podcast statements (unless transcribed and verified)
- Anonymous reports ("sources say...")

**Use case:**
- These can be used as **supplementary evidence** alongside a Tier 1 or Tier 2 source
- They can be used for "rumored" events (which must be visually distinguished in UI)
- Never use as the only source for a "confirmed" event

---

## Citation Format

Every evidence source must include:

1. **URL** (required) — Direct link to the source
2. **Title** (required) — Headline or document title
3. **Publisher** (required) — Organization or publication name
4. **Date** (required) — Publication date (YYYY-MM-DD or "Q1 2024" if only quarter known)
5. **Source Type** (required) — One of:
   - `official-announcement`
   - `press-release`
   - `news-article`
   - `filing` (SEC, regulatory)
   - `blog-post` (company or credible analyst)
   - `social-media` (Twitter, LinkedIn)
6. **Credibility** (required) — `primary`, `credible-secondary`, or `unverified`

**Example JSON:**
```json
{
  "id": "source-001",
  "url": "https://openai.com/blog/gpt-4",
  "title": "GPT-4 Launch Announcement",
  "publisher": "OpenAI Blog",
  "date": "2023-03-14",
  "source_type": "official-announcement",
  "credibility": "primary"
}
```

---

## Handling Uncertainty

### Dates

If the exact date is unknown:
- Use the **announced date** (when the company made it public) rather than the effective date
- If only a month is known, use the first day of that month (e.g., "Jan 2024" → `2024-01-01`)
- If only a quarter is known, use the first day of that quarter (e.g., "Q1 2024" → `2024-01-01`)
- Mark `date_precision` field accordingly (`exact`, `month`, `quarter`, `year`)

### Rumored Events

If an event is widely reported but not officially confirmed:
- Set `confidence: "rumored"`
- Include the unverified source(s)
- Add a note in the description: "(Reported by X, not yet confirmed)"
- These events **must be visually distinguished** in the UI (dashed border, reduced opacity)

**Example:**
```json
{
  "id": "meta-ai-chip-rumor-2024q4",
  "title": "Meta Developing Custom AI Chip (Rumored)",
  "confidence": "rumored",
  "description": "Meta is reportedly designing a custom AI inference chip. (Reported by The Information, not yet confirmed.)",
  "evidence_sources": [
    {
      "url": "https://www.theinformation.com/...",
      "credibility": "credible-secondary",
      "note": "Unconfirmed by Meta"
    }
  ]
}
```

### Multiple Conflicting Sources

If sources disagree (e.g., on date, details):
- Use the **most authoritative source** (Tier 1 > Tier 2 > Tier 3)
- If both are equally authoritative, use the **earlier publication** (likely closer to the event)
- Note the discrepancy in `impact_reasoning` or internal notes

---

## Archiving and Link Rot

**Problem:** URLs go dead over time (company blog redesigns, paywall changes, etc.)

**Solution:**
- Whenever possible, include an `archived_url` pointing to Archive.org snapshot
- For critical sources (Tier 1), create an archive snapshot when adding the event

**Recommended workflow:**
1. Add the live URL
2. Visit `https://web.archive.org/save/[URL]`
3. Add the archived snapshot to `archived_url` field

**Example:**
```json
{
  "url": "https://openai.com/blog/gpt-4",
  "archived_url": "https://web.archive.org/web/20230314120000/https://openai.com/blog/gpt-4"
}
```

---

## Research Workflow

When curating events:

1. **Start with high-confidence sources** (company blogs, press releases, major news)
2. **Cross-reference with secondary sources** when possible (corroboration increases confidence)
3. **Cite the most authoritative source** as the primary evidence
4. **Add supplementary sources** if they provide additional context or validation
5. **Mark uncertainty explicitly** (rumored, date precision, conflicting reports)

---

## Quality Checklist for Event Curation

Before adding an event to the dataset, verify:

- [ ] At least one Tier 1 or Tier 2 source is cited
- [ ] Source URL is live (or archived)
- [ ] Publication date is within project time range (2023-2025)
- [ ] Event is **strategic** (not trivia or minor feature updates)
- [ ] Description is evidence-based (not interpretive language)
- [ ] If "rumored," it's clearly marked and visually distinguishable

---

## Examples of Good vs. Bad Evidence

### ✅ Good: High-Confidence Event

**Event:** OpenAI launches GPT-4
**Date:** 2023-03-14
**Evidence:** Official OpenAI blog post + TechCrunch coverage
**Confidence:** Confirmed
**Why it's good:** Primary source (company blog) + secondary confirmation from credible publication

---

### ❌ Bad: Low-Evidence Event

**Event:** "Startup X is pivoting to agents"
**Date:** 2024-Q2
**Evidence:** Single tweet from CEO
**Confidence:** Rumored
**Why it's bad:** Only Tier 3 source (social media), no official confirmation, too vague to be strategic

---

### ⚠️ Acceptable: Medium-Confidence Event

**Event:** LangChain raises $25M Series A
**Date:** 2023-04-19
**Evidence:** TechCrunch article citing "people familiar with the matter"
**Confidence:** Likely
**Why it's acceptable:** Credible publication (Tier 2), but not officially confirmed by company. Mark as "likely" until official announcement.

---

## Updating Evidence Standards

This document is **versioned** and may evolve:
- **v0.1** (Current): Initial standards for MVP
- Future versions may refine tiers, add new source types, or adjust credibility thresholds

When standards change, **do not retroactively downgrade events** unless evidence is proven false. Instead, apply new standards to new events and note the version in metadata.

---

## Related Documents

- [DATA_MODEL_DRAFT.yaml](../data/schema/DATA_MODEL_DRAFT.yaml) — Field definitions for EvidenceSource entity
- [EVAL_RUBRIC.md](EVAL_RUBRIC.md) — Quality assessment rubric for events and patterns
- [PROJECT_CONTEXT.md](PROJECT_CONTEXT.md) — Core principles (epistemic discipline)

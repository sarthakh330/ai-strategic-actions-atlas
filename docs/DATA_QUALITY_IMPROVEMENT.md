# Data Quality Improvement Methodology

**Status:** Active Framework
**Version:** v1.0
**Last Updated:** 2025-12-28

---

## Problem Statement

The current dataset contains two types of content with different epistemic standards:

1. **Events Layer** (v0_seed_40.jsonl): Facts about specific strategic actions
   - **Current State**: Mostly assertive language ("GPT-4 set a new benchmark")
   - **Issue**: Some strategic significance statements lack quantitative evidence

2. **Patterns Layer** (v0_seed_5.jsonl): Derived insights and hypotheses
   - **Current State**: Appropriate hypothesis language ("appears to", "suggests")
   - **Issue**: User wants to upgrade hypothesis → confirmed facts where possible

**Goal**: Incrementally upgrade data quality from hypothesis → high-confidence facts while maintaining epistemic discipline.

---

## Epistemic Hierarchy

### Level 1: Hypothesis (Current State for Patterns)
- **Language**: "appears to", "suggests", "may indicate", "possibly"
- **Evidence**: 1-2 secondary sources, limited quantitative data
- **Confidence**: Low-Medium
- **Example**: "Independent inference providers appear to have experienced a reduction in market share"

### Level 2: Supported Claim
- **Language**: "data shows", "multiple sources confirm", "analysis indicates"
- **Evidence**: 3+ credible sources, some quantitative data
- **Confidence**: Medium-High
- **Example**: "According to Menlo Ventures AI Report Q1 2025, inference spend shifted 15% toward foundational labs"

### Level 3: Confirmed Fact
- **Language**: Assertive ("X announced", "Y launched", "Z acquired")
- **Evidence**: Primary sources (company blog, SEC filing, press release)
- **Confidence**: High
- **Example**: "OpenAI announced GPT-4 on March 14, 2023 (company blog post)"

### Level 4: Quantified Fact
- **Language**: Assertive with metrics
- **Evidence**: Primary quantitative data (financial reports, usage stats, surveys)
- **Confidence**: Very High
- **Example**: "GitHub Copilot reached 1.3M paid subscribers by Q3 2023 (GitHub earnings call)"

---

## Upgrade Methodology

### Phase 1: Audit Current State
For each event and pattern, identify:
- Current epistemic level (1-4)
- Missing evidence that would upgrade it
- Feasibility of upgrade (easy/medium/hard/impossible)

### Phase 2: Prioritize Upgrades
Focus on:
1. **High-impact events**: Events with `impact_level: "high"`
2. **Pattern foundation events**: Events cited as `supporting_events` in patterns
3. **Quantifiable claims**: Statements that could have metrics ("became leading", "significant adoption")

### Phase 3: Research & Upgrade
For each prioritized item:
1. **Search for primary sources**:
   - Company blogs, press releases, SEC filings (8-K, 10-Q)
   - Official product launch pages
   - GitHub repos (for OSS releases)
   - Conference presentations (with video/transcript)

2. **Search for quantitative data**:
   - Earnings calls transcripts (Seeking Alpha, company IR sites)
   - Industry reports (Gartner, IDC, Menlo Ventures, a16z)
   - Academic papers (arXiv, ICML, NeurIPS proceedings)
   - Developer surveys (Stack Overflow, JetBrains, GitHub)

3. **Update event fields**:
   ```json
   {
     "description": "[More specific with metrics if found]",
     "strategic_significance": "[Upgrade from 'appears to' → 'data shows' if supported]",
     "evidence_sources": [
       {
         "url": "[Primary source URL]",
         "credibility": "primary",
         "excerpt": "[Relevant quote with metrics]"
       }
     ],
     "confidence": "[Upgrade from 'likely' → 'confirmed' if primary source]"
   }
   ```

4. **Update pattern fields**:
   ```json
   {
     "thesis": "[Upgrade language: 'appears to' → 'data shows' where supported]",
     "confidence": "[Upgrade from 'medium' → 'high' with 3+ sources]",
     "confidence_reasoning": "[Cite specific sources and data points]",
     "counter_signals": "[Add if found during research]"
   }
   ```

### Phase 4: Document & Validate
- Run `node scripts/validate_data.js` after each upgrade
- Commit incremental improvements with detailed commit messages
- Track progress in [RESEARCH_BACKLOG.md](RESEARCH_BACKLOG.md)

---

## Evidence Quality Standards

### Primary Sources (credibility: "primary")
- **Company official channels**: Blog posts, press releases, product pages, SEC filings
- **Verified announcements**: CEO/founder tweets from verified accounts
- **Official documentation**: API docs, GitHub repos (with commit history)
- **First-hand presentations**: Conference talks (video/transcript), earnings calls

### Credible Secondary Sources (credibility: "credible-secondary")
- **Tech journalism**: TechCrunch, The Verge, Protocol (with direct quotes)
- **Industry analysts**: Gartner, IDC, Forrester reports (dated within 6 months)
- **Venture capital research**: a16z, Menlo Ventures, Sequoia reports (with methodology)
- **Academic papers**: Peer-reviewed or preprints from reputable labs (arXiv)

### Unverified Sources (credibility: "unverified")
- **Social media**: Twitter threads, Reddit posts (unless from official accounts)
- **Blogs**: Personal blogs, Medium posts (unless from domain experts with citations)
- **Aggregators**: Hacker News, Lobsters (useful for discovery, not as evidence)

**Upgrade Rule**: To move from Level 1 → Level 2, you need at least ONE primary source OR THREE credible-secondary sources.

---

## Incremental Improvement Process

### Weekly Cycle (Recommended)
1. **Monday**: Select 3-5 events to upgrade (prioritize high-impact)
2. **Tuesday-Thursday**: Research primary sources and quantitative data
3. **Friday**: Update events, run validation, commit changes
4. **Ongoing**: Track new findings in RESEARCH_BACKLOG.md as you discover them

### Example Workflow
```bash
# 1. Select an event to upgrade
jq 'select(.id == "gpt-4-launch-2023") | .strategic_significance' data/events/v0_seed_40.jsonl

# 2. Research primary sources
# - Visit OpenAI blog (https://openai.com/blog/gpt-4)
# - Check if there are usage metrics in earnings calls or reports
# - Search for "GPT-4 adoption" in Menlo Ventures AI Report

# 3. Update event with new evidence
# Edit the event in v0_seed_40.jsonl, add new evidence_sources, upgrade confidence

# 4. Validate
node scripts/validate_data.js

# 5. Commit
git add data/events/v0_seed_40.jsonl
git commit -m "Upgrade GPT-4 launch event with primary source and adoption metrics"
```

---

## Pending Research Tracking System

### RESEARCH_BACKLOG.md Structure
For each pending finding, document:
- **Event/Pattern ID**: Which data point needs improvement
- **Current Epistemic Level**: 1-4
- **Target Level**: What level could it reach with more research
- **Missing Evidence**: Specifically what's needed (e.g., "Anthropic Claude revenue Q1 2024")
- **Research Leads**: URLs, keywords, contacts
- **Priority**: High/Medium/Low
- **Status**: Not Started / In Progress / Blocked / Completed

See [RESEARCH_BACKLOG.md](../research/RESEARCH_BACKLOG.md) for active list.

---

## Quality Metrics (Post-Upgrade)

Track these metrics after each upgrade cycle:

### Event Quality Distribution
- **Level 4 (Quantified)**: Target 30%+ of high-impact events
- **Level 3 (Confirmed)**: Target 60%+ of all events
- **Level 2 (Supported)**: Acceptable for recent events (<6 months old)
- **Level 1 (Hypothesis)**: Minimize to <10% of events

### Pattern Quality Distribution
- **High Confidence**: 60%+ (with 3+ primary sources)
- **Medium Confidence**: 30% (with 2-3 credible sources)
- **Low Confidence**: <10% (flag for research or removal)

### Evidence Source Distribution
- **Primary Sources**: Target 50%+ of evidence_sources across all events
- **Credible Secondary**: 40%
- **Unverified**: <10% (acceptable only for discovery/rumors with clear labeling)

---

## Common Research Sources

### Company Data
- **OpenAI**: openai.com/blog, openai.com/research
- **Anthropic**: anthropic.com/news, anthropic.com/research
- **Google DeepMind**: deepmind.google/discover/blog
- **Meta AI**: ai.meta.com/blog
- **Microsoft**: blogs.microsoft.com/ai

### Industry Reports
- **Menlo Ventures**: menlovc.com (State of AI reports)
- **a16z**: a16z.com/category/artificial-intelligence
- **Sequoia**: sequoiacap.com/article/ais-600b-question
- **Gartner**: gartner.com (requires subscription)
- **IDC**: idc.com (requires subscription)

### Developer Surveys
- **Stack Overflow**: survey.stackoverflow.co
- **JetBrains**: jetbrains.com/lp/devecosystem
- **GitHub**: github.blog/category/octoverse

### Financial Data
- **SEC EDGAR**: sec.gov/edgar/searchedgar/companysearch.html (for public companies)
- **Crunchbase**: crunchbase.com (for funding/valuations)
- **PitchBook**: pitchbook.com (requires subscription)

### Academic Research
- **arXiv**: arxiv.org/list/cs.AI/recent
- **Papers With Code**: paperswithcode.com
- **Semantic Scholar**: semanticscholar.org

---

## Anti-Patterns to Avoid

### ❌ Don't: Upgrade without evidence
- **Bad**: Change "appears to" → "confirms" just to sound more confident
- **Good**: Keep hypothesis language until you have 3+ credible sources

### ❌ Don't: Cite unverified sources as primary
- **Bad**: Using a Twitter rumor as evidence for a pattern
- **Good**: Mark rumor as `confidence: "rumored"`, seek primary confirmation

### ❌ Don't: Overstate significance
- **Bad**: "GitHub Copilot revolutionized coding" (subjective, unmeasurable)
- **Good**: "GitHub Copilot reached 1.3M paid subscribers by Q3 2023, becoming the largest commercial AI coding tool by user count"

### ❌ Don't: Remove hypothesis language from genuinely uncertain patterns
- **Bad**: Stating "middleware is dying" when evidence is mixed
- **Good**: "Middleware startups face increased competition from foundation lab orchestration features, though LangChain's $50M Series B suggests enterprise demand for multi-model flexibility"

---

## Success Criteria

You'll know the data quality is improving when:

1. **External validation**: Domain experts (PMs, investors, analysts) cite your data as authoritative
2. **Zero corrections**: No one reports factual errors in events layer (Level 3-4 facts)
3. **Productive debates**: Users debate pattern interpretations (Level 2) but don't dispute underlying events
4. **Quantitative richness**: >50% of high-impact events have specific metrics
5. **Source diversity**: Evidence comes from multiple independent sources (not circular reporting)

---

## Related Documents

- [RESEARCH_BACKLOG.md](../research/RESEARCH_BACKLOG.md) — Active list of pending upgrades
- [EVAL_RUBRIC.md](EVAL_RUBRIC.md) — Quality scoring framework
- [SOURCES.md](SOURCES.md) — Evidence standards and sourcing guidelines
- [PATTERNS_AS_HYPOTHESES.md](PATTERNS_AS_HYPOTHESES.md) — Pattern methodology

---

**Next Steps**: Create [RESEARCH_BACKLOG.md](../research/RESEARCH_BACKLOG.md) and populate with initial audit of events/patterns needing upgrades.

# Research Backlog — Pending Data Quality Upgrades

**Purpose**: Track specific events and patterns that need research to upgrade from hypothesis → confirmed facts.
**Status**: Active tracking system
**Last Updated**: 2025-12-28

---

## How to Use This File

For each entry:
1. **Priority**: High (foundation events/patterns) / Medium (supporting) / Low (nice-to-have)
2. **Current Level**: 1 (Hypothesis) / 2 (Supported) / 3 (Confirmed) / 4 (Quantified)
3. **Target Level**: What level we can realistically reach
4. **Missing Evidence**: Specifically what data we need
5. **Research Leads**: URLs, keywords, or contacts to pursue
6. **Status**: 🔴 Not Started / 🟡 In Progress / 🟢 Completed / 🚫 Blocked

---

## High Priority (Foundation Events)

### 1. GPT-4 Launch — Adoption Metrics ✅ COMPLETED
- **Event ID**: `openai-gpt4-launch-2023q1`
- **Original Level**: 3 (Confirmed launch, strategic significance lacked metrics)
- **Final Level**: 4 (Quantified Fact)
- **Upgraded Strategic Significance**: "GPT-4 achieved adoption by 92% of Fortune 500 companies by end of 2023. ChatGPT Enterprise reached 150,000 users from 260 organizations by January 2024. Enterprises reported 40% improvement in work quality, 75% faster code debugging, and 25% faster task completion, establishing GPT-4 as the foundational model for enterprise AI adoption."
- **Evidence Added**:
  - 92% Fortune 500 adoption by end of 2023
  - 150,000 ChatGPT Enterprise users from 260 organizations (Jan 2024)
  - 40% work quality improvement, 75% faster debugging, 25% faster tasks
  - Source: DemandSage industry report (credible-secondary)
- **Completion Date**: 2025-12-28 (Cycle 1)
- **Validation Score**: 10/10
- **Status**: 🟢 Completed

### 2. Claude Launch — Constitutional AI Impact
- **Event ID**: `claude-launch-2023`
- **Current Level**: 3 (Confirmed launch, "constitutional AI" mentioned)
- **Target Level**: 4 (Quantified differentiation)
- **Current Strategic Significance**: "Introduced constitutional AI as a differentiation strategy and offered longer context than competitors."
- **Missing Evidence**:
  - Quantitative comparison: Claude vs GPT-3.5 context (claimed 100K vs 4K/8K)
  - Early adoption metrics (if disclosed)
  - Customer testimonials about constitutional AI value prop
- **Research Leads**:
  - Anthropic blog: https://www.anthropic.com/news
  - Constitutional AI paper: arXiv or Anthropic research page
  - Interviews with Dario Amodei
- **Priority**: High
- **Status**: 🔴 Not Started

### 3. GitHub Copilot — Usage Metrics ✅ COMPLETED
- **Event ID**: `copilot-launch-2021`
- **Original Level**: 3 (Confirmed launch)
- **Final Level**: 4 (Quantified Fact)
- **Upgraded Strategic Significance**: "GitHub Copilot reached 1 million paid subscribers by early 2023, establishing code completion as AI's first killer use case with measurable market traction. Created the category template for AI developer tools that would be replicated across the industry."
- **Evidence Added**:
  - 1M paid subscribers by early 2023
  - Source: TechCrunch industry reporting (credible-secondary)
- **Completion Date**: 2025-12-28 (Cycle 1)
- **Validation Score**: 7/10
- **Status**: 🟢 Completed

---

## High Priority (Pattern Foundation)

### 4. Model API Consolidation Pattern — Market Share Data
- **Pattern ID**: `model-api-consolidation-2024-2025`
- **Current Level**: 1 (Hypothesis with weak quantification)
- **Target Level**: 2 (Supported with industry report data)
- **Current Thesis**: "...foundational labs increased their share of enterprise inference spend from 55% (Q4 2024) to 70% (Q1 2025)..."
- **Missing Evidence**:
  - Source for "55% → 70%" claim (not currently cited in confidence_reasoning)
  - Independent inference provider revenue decline (Together AI, Replicate, etc.)
  - Foundational lab pricing changes (OpenAI, Anthropic rate reductions)
- **Research Leads**:
  - Menlo Ventures AI Report Q1 2025: https://menlovc.com
  - a16z AI infrastructure report
  - Replicate/Together AI blog posts about pricing/usage
- **Priority**: High
- **Status**: 🔴 Not Started

### 5. Vertical Integration Pattern — LangChain Series B Details
- **Pattern ID**: `vertical-integration-orchestration-2023-2024`
- **Current Level**: 2 (Supported, but LangChain funding not verified)
- **Target Level**: 3 (Confirmed with primary source)
- **Current Thesis**: "...LangChain's $50M Series B (Q3 2024) and continued enterprise adoption suggest middleware retains value..."
- **Missing Evidence**:
  - Primary source for LangChain Series B (SEC filing, press release, or Crunchbase)
  - Exact date of funding announcement
  - Lead investor and valuation (if disclosed)
- **Research Leads**:
  - Crunchbase: https://www.crunchbase.com/organization/langchain
  - LangChain blog: https://blog.langchain.dev
  - TechCrunch funding announcements
- **Priority**: High
- **Status**: 🔴 Not Started

---

## Medium Priority (Supporting Events)

### 6. OpenAI Assistants API — Enterprise Adoption
- **Event ID**: `assistants-api-launch-2023`
- **Current Level**: 3 (Confirmed launch)
- **Target Level**: 4 (Quantified with usage metrics)
- **Missing Evidence**:
  - Number of applications built on Assistants API
  - Enterprise customer case studies
  - Comparison: Assistants API adoption vs plain Chat Completions API
- **Research Leads**:
  - OpenAI blog: https://openai.com/blog
  - OpenAI DevDay presentations (Nov 2023)
  - Customer case studies on OpenAI site
- **Priority**: Medium
- **Status**: 🔴 Not Started

### 7. Anthropic Tool Use Launch — Timing and Impact
- **Event ID**: `claude-tool-use-2024`
- **Current Level**: 2 (Claimed Q2 2024, but needs verification)
- **Target Level**: 3 (Confirmed with exact date and announcement)
- **Missing Evidence**:
  - Exact launch date (month/day)
  - Official announcement URL
  - Early customer feedback or benchmarks
- **Research Leads**:
  - Anthropic API changelog: https://docs.anthropic.com/claude/docs
  - Anthropic blog: https://www.anthropic.com/news
  - GitHub: anthropics/anthropic-sdk-python releases
- **Priority**: Medium
- **Status**: 🔴 Not Started

---

## Medium Priority (Pattern Supporting Evidence)

### 8. Coding as Killer Use Case Pattern — Quantified Metrics
- **Pattern ID**: `coding-killer-use-case-2021-2023`
- **Current Level**: 2 (Supported with anecdotal evidence)
- **Target Level**: 3 (Confirmed with survey data)
- **Missing Evidence**:
  - Developer adoption rate (% of devs using AI coding tools)
  - Productivity gains (quantified: 20% faster? 30%?)
  - Revenue data for Copilot, Cursor, Codeium
- **Research Leads**:
  - Stack Overflow Developer Survey 2023: https://survey.stackoverflow.co
  - JetBrains Developer Ecosystem Survey 2023
  - GitHub Copilot research paper (if published)
- **Priority**: Medium
- **Status**: 🔴 Not Started

---

## Low Priority (Nice-to-Have)

### 9. Inference Provider Pricing Wars — Historical Data
- **Event ID**: Multiple (pricing reduction events 2024-2025)
- **Current Level**: 2 (Mentioned in patterns, but no event-level data)
- **Target Level**: 3 (Confirmed with dated price changes)
- **Missing Evidence**:
  - OpenAI pricing history (GPT-4, GPT-3.5 rate reductions)
  - Anthropic pricing history (Claude 2, Claude 3)
  - Google Gemini pricing changes
- **Research Leads**:
  - OpenAI pricing page: https://openai.com/pricing
  - Anthropic pricing: https://www.anthropic.com/pricing
  - Wayback Machine for historical pricing pages
- **Priority**: Low
- **Status**: 🔴 Not Started

---

## Blocked / Impossible

### 10. Private Company Revenue Data
- **Examples**: Anthropic revenue, Together AI revenue, Replicate revenue
- **Why Blocked**: Private companies don't disclose financials
- **Workarounds**:
  - Use funding announcements as proxy (valuation, implied ARR multiples)
  - Cite industry analyst estimates (Gartner, IDC) if available
  - Interview-based data (CEO statements in press, with attribution)
- **Status**: 🚫 Blocked (unless leaked or acquired)

### 11. Unreleased Product Roadmaps
- **Examples**: Future OpenAI features, Google Gemini roadmap
- **Why Blocked**: Not publicly announced, only rumors
- **Workarounds**:
  - Mark as `confidence: "rumored"` if credible leaker
  - Wait for official announcement before adding to event layer
- **Status**: 🚫 Blocked (intentionally, maintains quality standards)

---

## Completed Upgrades

### Cycle 1 (2025-12-28) — 2 Events Upgraded with Metrics
- **GPT-4 Launch** (`openai-gpt4-launch-2023q1`): Level 3 → Level 4
- **GitHub Copilot Launch** (`copilot-launch-2021`): Level 3 → Level 4
- **Commit**: f83cad1
- **Time Invested**: ~5 minutes

### Cycle 2 (2025-12-28) — 4 New 2025 Events Added
- **DeepSeek-R1 Launch** (`deepseek-r1-launch-2025q1`): New Level 4 event with quantified economic impact
- **Claude Opus 4.5 Launch** (`anthropic-claude-opus-45-launch-2025q2`): New Level 3 event
- **GPT-5 Launch** (`openai-gpt5-launch-2025q3`): New Level 4 event with revenue metrics
- **Gemini 3 Pro Launch** (`google-gemini-3-launch-2025q4`): New Level 3 event
- **Commit**: 5c4691d
- **Time Invested**: ~5 minutes

---

## Research Process Checklist

For each backlog item, follow these steps:

- [ ] **Search primary sources** (company blogs, press releases, SEC filings)
- [ ] **Search industry reports** (Menlo, a16z, Sequoia, Gartner)
- [ ] **Search developer surveys** (Stack Overflow, JetBrains, GitHub Octoverse)
- [ ] **Search academic papers** (arXiv, Papers With Code, Semantic Scholar)
- [ ] **Verify dates** (use Wayback Machine for historical claims)
- [ ] **Update event/pattern** in JSONL file with new evidence
- [ ] **Run validation** (`node scripts/validate_data.js`)
- [ ] **Commit with detailed message** (cite sources, explain upgrade)
- [ ] **Update this backlog** (move to "Completed Upgrades" section)

---

## Weekly Progress Tracking

| Week | Events Upgraded | Patterns Upgraded | Total Sources Added | Notes |
|------|----------------|-------------------|---------------------|-------|
| 2025-W52 | 6 (2 upgraded, 4 new) | 0 | 8 | Cycle 1 & 2: GPT-4, Copilot metrics + 4 new 2025 events |

---

## Related Documents

- [DATA_QUALITY_IMPROVEMENT.md](../docs/DATA_QUALITY_IMPROVEMENT.md) — Methodology and standards
- [EVAL_RUBRIC.md](../docs/EVAL_RUBRIC.md) — Quality scoring framework
- [SOURCES.md](../docs/SOURCES.md) — Evidence standards

---

**Next Actions**: Start with High Priority items 1-5. Allocate 3-5 hours per week for research. Update this backlog after each completed upgrade.

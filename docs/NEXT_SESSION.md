# POE2 SEO Platform — NEXT SESSION CHECKPOINT

Date: 2026-05-13
Project: POE2 Forge
Stack: Next.js App Router + TypeScript + Markdown CMS

---

# Current Project State

The project has evolved from a basic SEO site into a scalable AI-aware programmatic SEO platform.

Core architecture is now built around:

```txt
Markdown Content
 → Parsing
 → Validation
 → Metrics
 → Quality Scoring
 → Freshness Intelligence
 → Structured Data
 → Sitemap Generation
 → Semantic Recommendations
 → Content Operations Dashboard
```

---

# Completed Systems

## 1. URL Architecture

Unified scalable SEO routes:

```txt
/builds/[slug]
/bosses/[slug]
/skills/[slug]
/guides/[type]/[slug]
```

Benefits:

- scalable routing
- clean canonical URLs
- future multilingual support
- AI programmatic SEO compatibility
- topic clustering compatibility

---

# 2. Markdown CMS System

Location:

```txt
src/content/guides/
```

Structure:

```txt
builds/
bosses/
skills/
```

Guide parsing handled by:

```txt
src/lib/markdown.ts
```

Capabilities:

- frontmatter parsing
- FAQ extraction
- metrics calculation
- freshness scoring
- quality scoring
- semantic processing

---

# 3. SEO Metadata Pipeline

Implemented:

- canonical URLs
- OpenGraph metadata
- Twitter metadata
- article metadata
- dynamic metadata generation

Core file:

```txt
src/lib/seo.ts
```

---

# 4. Structured Data

Implemented:

## Breadcrumb JSON-LD

## Article JSON-LD

## FAQPage JSON-LD

FAQ extraction is automatic from markdown:

```md
## FAQ

### Question
Answer
```

---

# 5. Programmatic Sitemap

File:

```txt
src/app/sitemap.ts
```

Automatically includes:

- builds
- bosses
- skills
- markdown guides

---

# 6. Validation Layer

Script:

```txt
scripts/validate-guides.ts
```

Checks:

- duplicate paths
- duplicate slugs
- missing title
- missing slug
- missing SEO description
- short SEO description
- missing patch version
- missing lastUpdated
- missing related links
- broken related slugs
- short content
- weak FAQ count
- duplicate FAQ questions
- short FAQ answers

Command:

```bash
npm run validate:guides
```

---

# 7. Content Metrics System

Metrics implemented:

- word count
- reading time
- quality score
- days since update
- stale detection
- outdated patch detection

Displayed in guide UI:

- reading time
- SEO score
- stale badge
- outdated patch badge

---

# 8. Quality Scoring System

Quality score factors:

- content length
- SEO title
- SEO description
- patch version
- last updated
- FAQ count
- related links

Purpose:

- AI content QA
- refresh prioritization
- low-quality detection
- future AI publishing gates

---

# 9. Freshness Intelligence

Implemented:

- daysSinceUpdate
- stale detection
- outdated patch detection

Current patch constant:

```txt
CURRENT_PATCH_VERSION = "0.2.0"
```

Pages automatically detect:

- outdated content
- stale content
- old patch versions

---

# 10. Content Health Dashboard

Route:

```txt
/admin/content-health
```

Capabilities:

- total guide count
- stale content count
- outdated patch count
- low quality count
- weak FAQ count
- missing related links
- refresh priority queue

This is now the operational center of the SEO platform.

---

# 11. Auto Refresh Queue

Refresh queue automatically prioritizes pages based on:

- stale status
- outdated patch status
- low quality score
- weak FAQ coverage
- missing related links

This is the foundation for future:

```txt
AI auto-refresh pipelines
```

---

# 12. Semantic Relationship Intelligence

Script:

```txt
scripts/recommend-related-guides.ts
```

Capabilities:

- tokenization
- semantic similarity scoring
- related content recommendations
- topical relationship discovery

Command:

```bash
npx tsx scripts/recommend-related-guides.ts
```

Purpose:

- automatic internal linking
- semantic clustering
- authority graph construction
- AI recommendation engine

---

# Important Current Files

## Core SEO

```txt
src/lib/seo.ts
```

## Markdown Engine

```txt
src/lib/markdown.ts
```

## Dashboard

```txt
src/app/admin/content-health/page.tsx
```

## Validation

```txt
scripts/validate-guides.ts
```

## Semantic Recommendations

```txt
scripts/recommend-related-guides.ts
```

---

# Current NPM Commands

## Lint

```bash
npm run lint
```

## Validate Guides

```bash
npm run validate:guides
```

## Semantic Recommendations

```bash
npx tsx scripts/recommend-related-guides.ts
```

---

# Current SEO Architecture Level

The project is no longer a simple blog or markdown site.

It is now:

```txt
AI-aware Programmatic SEO Platform
```

with:

- content intelligence
- operational monitoring
- validation pipelines
- freshness scoring
- semantic relationships
- structured SEO entities
- maintenance automation

---

# Recommended Next Phase

## Auto Suggested Related Links UI

Goal:

Automatically display semantic recommendations directly on guide pages.

Future capabilities:

- AI internal linking
- topical authority graph
- cluster page generation
- semantic navigation
- automated authority sculpting

Potential implementation:

```txt
Recommended Related Guides
```

based on semantic recommendation engine.

---

# Recommended Future Roadmap

## Phase 1 — Internal Authority Graph

- automatic related links
- semantic clustering
- topic relationships
- cluster scoring

## Phase 2 — AI Content Generation

- AI markdown generation
- template pipelines
- AI validation gates
- auto publishing queue

## Phase 3 — Autonomous SEO Operations

- auto refresh
- patch-aware updating
- stale content rewriting
- AI FAQ enhancement
- automatic internal link generation

## Phase 4 — Advanced SEO Intelligence

- search intent mapping
- SERP targeting
- topical coverage analysis
- keyword gap detection
- semantic graph visualization

---

# Git Progression

Recent commits:

```txt
Add markdown guide sitemap generation
Add markdown guide validation script
Validate markdown guide related links
Add FAQ structured data generation
Add FAQ quality validation
Add markdown content metrics
Add markdown content quality scoring
Add markdown freshness metrics
Add content health dashboard
Add automated content refresh queue
Add patch version intelligence
Add semantic related content recommendations
```

---

# Important Notes

## CRLF warnings

These warnings are normal on Windows and can currently be ignored.

## npm audit warnings

Do NOT run:

```bash
npm audit fix --force
```

without careful review.

---

# Current Strategic Direction

The project direction is now:

```txt
Scalable AI-driven SEO Operations Platform
```

NOT a simple content site.

Core emphasis:

- automation
- scalability
- semantic intelligence
- SEO operations
- AI maintenance pipelines
- content lifecycle management


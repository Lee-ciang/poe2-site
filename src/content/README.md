# POE2 Forge Content Operations

This folder is the editorial system for creating scalable, AI-assisted POE2 content. It is documentation and templates only; site data still lives in `src/data`.

## Generate New SEO Pages

Use the generator to create a Markdown guide draft:

```bash
npm run generate-guide build lightning-ranger "Lightning Ranger Build Guide"
```

Valid guide types are `build`, `boss`, and `skill`. The script writes to:

- `build` -> `src/content/guides/builds/{slug}.md`
- `boss` -> `src/content/guides/bosses/{slug}.md`
- `skill` -> `src/content/guides/skills/{slug}.md`

The generator will not overwrite existing files. If a file already exists, choose a new slug or edit the existing Markdown file directly.

Generated files include `contentStatus: draft` by default. Treat generated Markdown as a starting scaffold, not publish-ready content.

## How Markdown Routing Works

Markdown guide files live under `src/content/guides`. The route `src/app/guides/[type]/[slug]/page.tsx` reads frontmatter and body content with `src/lib/markdown.ts`, then statically generates pages like:

- `/guides/builds/lightning-ranger`
- `/guides/bosses/count-geonor`
- `/guides/skills/lightning-arrow`

The frontmatter `type` value should use the plural route folder: `builds`, `bosses`, or `skills`.

## Scale Content Generation

1. Generate a draft with `npm run generate-guide`.
2. Use the prompt templates in `src/content/prompts` to fill the placeholders with practical POE2 advice.
3. Update related guide arrays in frontmatter so internal links render.
4. Check the draft with `src/content/quality-checklist.md`.
5. Run `npm run lint` and `npm run build` before publishing.

For larger batches, generate drafts first, then review and enrich them one page at a time. Avoid publishing untouched generated drafts; they are scaffolds, not final SEO content.

## Content Status Workflow

Markdown guides use this frontmatter field:

- `draft`: Generated or early human draft. Do not treat game facts as verified.
- `needs-review`: Filled out, but waiting for gameplay, patch, or editorial review.
- `verified`: Reviewed against current POE2 patch data and ready for publication.
- `outdated`: Previously published or reviewed, but likely stale after patch changes.

Move a page from `draft` to `needs-review` when all placeholder sections have been replaced with specific advice, useful FAQs, and internal links. Move from `needs-review` to `verified` only after checking patch version, mechanics, rewards, scaling claims, and recommendations against current gameplay or reliable sources.

## Avoid Publishing Unverified Game Facts

Do not mark a page as `verified` if it includes:

- Exact drop rates, damage numbers, or breakpoints that have not been tested.
- Boss phase names, rewards, or mechanics copied from memory without confirmation.
- Skill support interactions that have not been checked against the current patch.
- Build recommendations with no explanation tied to mechanics, gear, or player goals.

When unsure, keep the page in `needs-review` and add an uncertainty note in `Content Notes`. Clear uncertainty is better than confident but wrong SEO content.

## Add A New Build

1. Draft the guide with `src/content/prompts/build-prompt.md`.
2. Check the draft against `src/content/templates/build-template.ts`.
3. Add the structured entry to `src/data/builds.ts`.
4. Include a stable `slug`, concise `summary`, real strengths, real weaknesses, and practical leveling/endgame notes.
5. Link core skills to existing skill pages when available.
6. Run `npm run lint` and `npm run build`.

## Add A New Boss Guide

1. Draft with `src/content/prompts/boss-prompt.md`.
2. Confirm boss name, location, phases, damage types, and rewards from a reliable source or mark uncertain details clearly.
3. Add the structured entry to `src/data/bosses.ts`.
4. Recommend builds only when the recommendation follows from mechanics, damage uptime, defenses, or weaknesses.
5. Run lint and build to confirm the dynamic route and sitemap update.

## Add A New Skill Page

1. Draft with `src/content/prompts/skill-prompt.md`.
2. Confirm category, damage type, and weapon requirement before publishing.
3. Add the structured entry to `src/data/skills.ts`.
4. Explain scaling and supports as practical guidance, not unverifiable formulas.
5. Link to builds that actually use the skill.

## Writing High-Quality POE2 SEO Content

Good POE2 content answers a player's immediate decision: should I use this build, how do I beat this boss, or how does this skill fit my character? Use clear headings, short practical paragraphs, and direct recommendations.

Every page should include:

- A specific opening summary.
- Clear tradeoffs.
- Practical next actions.
- Patch-sensitive uncertainty notes when needed.
- Internal links that help the player continue their task.
- FAQs based on real search intent, not filler.

## Avoid Thin AI Content

Thin content usually sounds confident but gives no player advantage. Avoid:

- Generic phrases like "optimize your gear" without naming priorities.
- Repeating the same idea across every section.
- Inventing exact values, drop rates, or undocumented interactions.
- Adding FAQs that restate the page title.
- Publishing without weaknesses or limitations.

Add original insight by explaining why a recommendation matters, when it changes, and what mistake it prevents.

## Updating After Patch Notes

1. Record the patch version and date in your working notes.
2. Identify affected builds, bosses, and skills.
3. Update summaries first if the page's core recommendation changed.
4. Review strengths, weaknesses, scaling stats, supports, and endgame notes.
5. Add uncertainty language when patch behavior is not fully tested.
6. Rebuild the site so static pages and sitemap output are refreshed.

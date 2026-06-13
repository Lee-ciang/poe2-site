# POE2 Forge Content Trust Cleanup Report

Generated: 2026-06-13

Repository: `D:/poe2-site`

## Scope

This cleanup removed low-trust signals only from public frontend rendering. It did not delete pages, change routes, change URLs, alter sitemap generation, alter robots generation, or modify SEO pipeline scripts.

## Files Modified

- `src/app/bosses/[slug]/page.tsx`
- `src/app/builds/[slug]/page.tsx`
- `src/app/skills/[slug]/page.tsx`
- `src/app/guides/[type]/[slug]/page.tsx`
- `src/lib/markdown.ts`
- `docs/CONTENT_TRUST_CLEANUP_REPORT.md`

Pre-existing unrelated modified files under `data/ai-seo/` were left untouched.

## Frontend Trust Signals Removed

The public boss, build, and skill detail pages no longer render:

- `Content Notes` sections
- AI-assisted placeholder note text stored in `contentNotes`
- `Early Access` patch values in the visible overview grids

The public guide detail route no longer renders:

- Markdown `## Content Notes` sections
- Markdown `## Verification Notes` sections
- `Early Access` patch badges
- `Outdated patch` badges
- `content verification notes` phrases in visible descriptions
- AI-related labels in rendered guide/card/meta title text while preserving the source title/frontmatter

The Markdown FAQ parser now stops at the next `##` heading, preventing non-FAQ sections such as `Content Notes` from leaking into FAQ JSON-LD.

## Metadata Preserved

The cleanup preserved source data and CMS/admin-facing metadata:

- `patchVersion` fields remain in `src/data/bosses.ts`, `src/data/builds.ts`, `src/data/skills.ts`, and Markdown frontmatter.
- `contentNotes` fields remain in TS data sources.
- Markdown frontmatter, titles, slugs, related links, status fields, and update dates were not removed.
- Admin pages and internal SEO/data files were not cleaned or rewritten.
- Existing URLs and slugs, including `example-ai-generated-guide`, were preserved as required.

## Pages Affected

- Boss detail pages: 6
- Build detail pages: 6
- Skill detail pages: 20 generated skill routes
- Guide detail pages: 69 generated guide routes, including Markdown and programmatic guides

Total generated route count remained unchanged at 121 static pages.

## Verification

Command run:

```text
npm run build
```

Build result:

```text
PASS: Compiled successfully
PASS: Generated static pages using 15 workers (121/121)
```

Route count:

```text
Before cleanup baseline: 121 generated static pages
After cleanup: 121 generated static pages
```

No deleted files or deleted routes were detected in the cleanup diff.

## Residual Notes

Generated public HTML can still contain trust-risk text inside preserved URLs such as `/guides/skills/example-ai-generated-guide`. Those URL strings were not changed because URL and routing changes were explicitly out of scope.

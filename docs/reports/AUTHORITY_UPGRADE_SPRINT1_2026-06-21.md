# Authority Upgrade Sprint 1

Generated: 2026-06-21

Reference: `docs/reports/TOP20_AUTHORITY_PAGES_2026-06-21.md`

## Summary

Upgraded the top five authority targets into deeper pillar-style pages while preserving URLs, slugs, routing, sitemap behavior, robots behavior, schema behavior, and existing page purpose.

## Files Modified

- `src/content/guides/skills/ice-spear.md`
- `src/data/skills.ts`
- `src/content/guides/skills/flame-wall.md`
- `src/content/guides/skills/poison-arrow.md`
- `src/content/guides/skills/ice-nova.md`
- `docs/reports/AUTHORITY_UPGRADE_SPRINT1_2026-06-21.md`

## Page Metrics

| Page | File | Before Word Count | After Word Count | FAQ Count | Internal Link Count |
| --- | --- | --- | --- | --- | --- |
| `/guides/skills/ice-spear` | `src/content/guides/skills/ice-spear.md` | 853 | 1524 | 7 | 16 |
| `/skills/lightning-arrow` | `src/data/skills.ts` | 323 | 1204 | 6 | 11 |
| `/guides/skills/flame-wall` | `src/content/guides/skills/flame-wall.md` | 823 | 1322 | 7 | 14 |
| `/guides/skills/poison-arrow` | `src/content/guides/skills/poison-arrow.md` | 801 | 1241 | 7 | 12 |
| `/guides/skills/ice-nova` | `src/content/guides/skills/ice-nova.md` | 783 | 1245 | 7 | 15 |

## Content Added

Each upgraded page now includes:

- Skill overview
- Mechanics explanation
- Best support gems
- Strengths
- Weaknesses
- Leveling advice
- Endgame usage
- Common mistakes
- Expanded FAQ section
- Expanded internal links to related skills, builds, and bosses

## Verification

Threshold check:

```text
/guides/skills/ice-spear: 1524 words, 7 FAQs, 16 internal links
/skills/lightning-arrow: 1204 words, 6 FAQs, 11 internal links
/guides/skills/flame-wall: 1322 words, 7 FAQs, 14 internal links
/guides/skills/poison-arrow: 1241 words, 7 FAQs, 12 internal links
/guides/skills/ice-nova: 1245 words, 7 FAQs, 15 internal links
```

Build result:

```text
npm run build
PASS: Compiled successfully
PASS: Generated static pages using 15 workers (121/121)
```

## Success Criteria

- All 5 pages have 1200+ words: PASS
- All 5 pages have 6+ FAQs: PASS
- All 5 pages have 8+ internal links: PASS
- Build passed: PASS

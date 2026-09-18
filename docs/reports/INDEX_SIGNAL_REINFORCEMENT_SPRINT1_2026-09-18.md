# POE2 Forge Index Signal Reinforcement Sprint #1

- Report created: 2026-09-18 11:18 +03:00 (Asia/Beirut).
- Repository: `D:\poe2-site`.
- Stage: Core Index Test / KAPF Feedback Loop.
- Result: local implementation and verification complete. Deployment and new GSC measurements are not included.

## Baseline

User-supplied GSC data dated 2026-09-13: 8 clicks, 234 impressions, 3.4% CTR, average position 10.3, 3 indexed pages, and 29 not indexed. Sitemap submitted August 30, last read September 6, with 32 discovered URLs and Success status. These figures were not independently fetched from GSC.

The three target routes are `/`, `/bosses/executioner`, and `/builds/poison-assassin`. Performance impressions indicate Google is testing visibility; they do not establish that these are exactly the three indexed URLs.

## Files Changed

| File | Change |
| --- | --- |
| `src/data/builds.ts` | Expanded Poison Assassin content, replaced its generic FAQs, corrected unsupported build assumptions, updated its existing date field and related-boss entries. The shared mapper now respects entry-specific FAQs and dates. |
| `src/app/builds/[slug]/page.tsx` | Added a Poison Assassin-only overview and contextual comparison links; reused the existing related-card component for planning resources. Route generation and metadata architecture are unchanged. |
| `src/data/bosses.ts` | Light Executioner introduction edit, one poison strategy tip, one related build link, and its existing update date. |
| `src/app/page.tsx` | Small contextual copy changes; removed indexing jargon and an unsupported latest-patch claim. No section or link was added. |
| `docs/reports/INDEX_SIGNAL_REINFORCEMENT_SPRINT1_2026-09-18.md` | This report. |

## Content Results

| Page | Before words | After words | FAQs before / after | Internal links before / after | Unique destinations before / after |
| --- | ---: | ---: | ---: | ---: | ---: |
| `/builds/poison-assassin` | 311 | 1,600 | 3 / 6 | 5 / 9 | 4 / 8 |
| `/bosses/executioner` | 1,222 | 1,289 | 6 / 6 | 13 / 14 | 13 / 14 |
| `/` | 922 | 952 | 0 / 0 | 36 / 36 | 18 / 18 |

Method: word counts use the rendered main element, remove scripts, replace tags and HTML entities with spaces, and count word tokens, keeping internal apostrophes and hyphens. Counts include section headings, labels, FAQs and related-card labels, but exclude global navigation/footer, structured data and hydration payloads. Before measurements used the existing production-build HTML snapshot present at sprint start; after measurements used this sprint's successful build. Homepage word changes also include the shared build and boss card summaries. Root-relative link counts exclude its two same-page hero anchors.

Poison Assassin now covers when to play it, its damage routine, scaling decisions, strengths and weaknesses, bow gearing, survivability, mana sustain, support-selection logic, leveling, bossing, mapping and mistakes. Six specific FAQs replace the three generic ones. The title and URL remain intact.

The previous Shadow/S Tier presentation and mixed skill list lacked support for the described setup. The guide now explicitly describes a Ranger-based ranged poison playstyle under the existing Poison Assassin name; it does not present Assassin as a required character-creation choice. Its tier value now describes specialization rather than making a ranking claim. These are content-value corrections, not metadata-structure changes.

## Internal Links

The Poison Assassin page has eight unique useful destinations, with nine link occurrences:

| Destination | Purpose |
| --- | --- |
| `/builds` | Return to and compare build choices; appears twice. |
| `/guides/skills/poison-arrow` | Related ranged poison planning. |
| `/skills/lightning-arrow` | Explicit direct-damage bow comparison. |
| `/builds/lightning-ranger` | Alternative build comparison. |
| `/bosses/executioner` | Short application windows and dodge practice. |
| `/bosses/count-geonor` | Further boss preparation. |
| `/skills` | Browse skill mechanics. |
| `/guides` | Progression and skill resources. |

Executioner gained a related card linking to `/builds/poison-assassin` and a contextual tip explaining why poison application fits short attack windows. Its other links remain intact. The homepage already linked Poison Assassin twice and Executioner three times, with clear build and boss anchor context; adding more copies was unnecessary.

Poison Assassin's prior links to Poisonous Concoction (including a duplicated related-card destination), Chimera Abomination and King in the Mists were replaced with the focused planning and campaign-boss links above. No destination page was deleted. The recommended Fire Warden and Ice Spear links were not forced into this poison build where they added less direct value.

## Accuracy and Publishing Quality

Official Grinding Gear Games [0.3.0 patch notes](https://www.pathofexile.com/forum/view-thread/3826682) document the Poisonous Concoction rename to Acidic Concoction, its poison consumption, and its inability to apply poison. They also name Poisonburst Arrow. The revised build distinguishes poison application from consumption and removes the old recommendation to use Poisonous Concoction as its applicator.

Official [0.4.0 patch notes](https://www.pathofexile.com/forum/view-thread/3883495/filter-account-type/staff) also document Acidic Concoction interactions. These references support the specific correction; they are not a claim that the page has been tested against every subsequent balance change. No exact DPS, stack cap, gem percentage, guaranteed clear result, or current-patch ranking was added.

Existing internal `contentNotes` and `patchVersion` values remain unchanged and are not rendered to visitors. No new data fields or metadata architecture were introduced. Existing generated SEO title/description values naturally reflect corrected source content. Canonicals remain absolute and point to the same public URLs; the build and boss pages retain valid BreadcrumbList and Article JSON-LD.

## Verification

- Final `npm run build`: PASS, exit code 0, **121/121** static pages.
- Targeted ESLint on all four changed source files: PASS, exit code 0. An initial JSX apostrophe error was corrected before the final build and lint pass.
- Local production server: Next.js on `http://127.0.0.1:3015` for verification.
- Browser and HTTP checks: **24 unique internal destinations**, all **HTTP 200**, **0 redirects**, **0 broken destinations** across the main content of the three target pages. This includes every added or changed internal link; it is not a fresh sitewide broken-link audit.
- Rendered trust-wording scan: none of the requested AI, draft, placeholder, generation, early-access, verification or programmatic labels in the three main content regions.
- Related links: descriptive clickable anchors and existing cards; no raw URL link labels or raw URL bullet lists.
- Browser checks at 1440 x 1000 and 390 x 844: no horizontal overflow and no JavaScript page errors. Build/boss content text remains 16px with separate heading sizing. Poison Assassin desktop/mobile screenshots inspected.
- Served sitemap: **32 URLs**. Final built sitemap: **32 unique URLs**, no duplicates.
- `src/app/sitemap.ts`, `src/app/robots.ts`, and `public/robots.txt`: unchanged against HEAD.
- Other build and boss records: normalized export comparison against HEAD found **0 unrelated entry changes**, with identical slug lists and preserved internal metadata.
- No route-generation, slug, sitemap, robots, SEO pipeline, or public-page additions/deletions.

Final build output excerpt:

```text
> poe2-site@0.1.0 build
> next build
Next.js 16.2.6 (Turbopack)
Compiled successfully in 4.9s
Finished TypeScript in 2.3s
Generating static pages using 15 workers (121/121) in 3.7s
Finalizing page optimization ...
```

## Remaining Risks and Next Action

1. Local completion does not establish a production deployment or any change in Google indexing. Deploy the reviewed changes through the existing release process, then verify these three production pages.
2. The retained Poison Arrow guide and other existing destination pages were checked for route health, not comprehensively revalidated for game accuracy. The old Poisonous Concoction destination still exists elsewhere in the site. Related-content factual review remains worthwhile before further promotion.
3. Executioner's older location/phase assertions and other boss pages were not fact-checked in full during this deliberately small edit. No new phase, reward, damage value, or boss mechanic was invented for this sprint.
4. This is a practical playstyle guide, not a gameplay-benchmarked passive tree or equipment export. Ascendancy choices, support compatibility and balance-dependent details should be assessed in the game before presenting exact performance claims.
5. Observe the three target URLs over the next 7 and 14 days after deployment: last crawl, indexing state, impressions, non-brand queries and clicks. Compare equivalent date windows. Retain the repaired 32-URL sitemap during this observation; this sprint supplies no evidence that another sitemap change or broad content expansion is needed.

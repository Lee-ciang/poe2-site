# Publishing Quality Repair and Three-Page Index Expansion Test

Generated: 2026-09-26 21:23 +03:00 (Asia/Beirut)

Repository: `D:\poe2-site`

Status: implementation and local production-build verification complete. Not committed or deployed; no GSC indexing request was submitted.

## Executive Summary

Repaired the player-facing Guides hub, restored Lightning Arrow's membership in the Skills hub, and edited three connected existing detail pages. The goal is a controlled publishing-quality test, not a claim that additional words guarantee indexing.

- Five pages received direct editorial/presentation changes.
- Three additional pages inherit updated summaries through existing data-driven cards: homepage, Bosses hub, Builds hub. Their layout and route code were not edited.
- All 121 prerendered route keys match the baseline exactly; 111 public HTML pages remain after excluding administrative/system/metadata endpoints.
- Sitemap remains the same 32 URLs with the same ordering, priorities, and frequencies.
- Robots output is byte-for-byte unchanged.
- 53 distinct local URLs checked: all 200, zero redirects, zero broken URLs.
- 169 internal anchor occurrences from the five directly changed pages, including shared navigation/footer, were resolved and checked. Zero invalid fragment targets.
- Forbidden public wording: zero matches on the five direct pages and three propagated-summary pages.
- Production build: PASS, 121/121. Scoped ESLint and Markdown validation: PASS.

## Baseline and Limits

User-supplied GSC baseline, 2026-09-26:

| Metric | Baseline |
| --- | --- |
| Clicks | 8 |
| Impressions | 289 |
| CTR | 2.8% |
| Average position | 9.6 |
| Indexed / not indexed | 3 / 29 |
| Sitemap discovered URLs | 32 |
| Sitemap submitted | 2026-08-30 |
| Sitemap last read | 2026-09-25 |
| Sitemap status | Success |

Apparently indexed: `/`, `/bosses/executioner`, `/builds/poison-assassin`.

Reference: `docs/reports/CORE_INDEX_EXPANSION_AUDIT_2026-09-26.md`.

No authenticated GSC inspection was available during this implementation. Exact exclusion reasons, crawl dates, and Google-selected canonicals still need per-URL confirmation. The observed publishing defects are reasons to improve these pages, not proof of Google's causal indexing decision.

## Files Modified

| File | Change |
| --- | --- |
| `src/app/guides/page.tsx` | Player-facing introduction, clean metadata values, explicit hub selection, descriptive summaries, build/boss entry links |
| `src/app/skills/page.tsx` | Add Lightning Arrow to the Lightning group and give its link a descriptive label |
| `src/components/home/SkillCard.tsx` | Optional link label; existing default remains unchanged |
| `src/data/skills.ts` | Lightning Arrow reference content, six FAQs, related-content selection, distinct metadata and actual editorial date |
| `src/app/skills/[slug]/page.tsx` | Lightning Arrow-only reference heading, support heading, practical example, contextual links and sources |
| `src/data/bosses.ts` | Typed Count Geonor-specific override; all other exported boss records unchanged |
| `src/app/bosses/[slug]/page.tsx` | Geonor-only defensive labels and contextual encounter-planning section |
| `src/data/builds.ts` | Lightning Ranger plan, six FAQs, concise description, editorial date, Executioner link |
| `src/app/builds/[slug]/page.tsx` | Ranger-only context and sources, useful resource links, hide unsupported tier claim on this detail page |
| `docs/reports/PUBLISHING_QUALITY_REPAIR_INDEX_TEST_2026-09-26.md` | This report |

No modifications to sitemap code, robots code, homepage source/layout, route generation, slugs, Markdown content files, programmatic content, shared SEO helpers, or pipeline scripts. No public pages added or deleted. No automatic commit.

## Exact Page Changes

### /guides

- Replaced the production-workflow introduction and the SEO/Markdown-oriented metadata with a player-facing guide hub description.
- Stopped rendering raw patch labels and generic metadata descriptions on cards.
- Cards now use concise, topic-specific summaries; source metadata remains intact.
- Retained 17 selected Markdown guides, ordered with Lightning Arrow first, followed by Flame Wall and Ice Nova.
- Added a compact planning paragraph linking to the full Lightning Ranger build, Poison Assassin comparison, and Count Geonor encounter.
- Six routes are no longer promoted by this hub: `/guides/builds/frost-monk`, `/guides/bosses/trialmaster`, `/guides/skills/cold-snap-ai`, `/guides/skills/frostbolt-ai`, `/guides/skills/lightning-arrow-ai`, `/guides/skills/example-ai-generated-guide`.
- Those six files and routes still exist. No noindex or sitemap action was taken.
- Selection is editorial, not a blanket filter on CMS status: the example page was marked verified while several substantial guides retained draft status. Neither flag was changed or treated as proof of factual review.
- Hub body: 618 to 430 words; 23 to 20 unique internal destinations.

This is a hub presentation repair, not a certification of every linked guide's accuracy. Remaining detail-template badges and old guide wording are recorded below.

### /skills

- Added the existing `lightning-arrow` record to the Lightning group.
- Its link reads "Lightning Arrow reference" and is accompanied by the skill's updated summary.
- No extra groups or broad link expansion.
- Optional SkillCard label leaves every other consumer's default label unchanged.
- Hub body: 516 to 553 words; 14 to 15 unique destinations.
- Browser click test followed the new link to `/skills/lightning-arrow` successfully.

### /skills/lightning-arrow

- Changed the visible purpose to a skill reference, distinct from the longer Markdown progression guide.
- Explained the arrow/beam distinction, attack versus spell support compatibility, and why clearing coverage is not evidence of isolated-boss damage.
- Replaced unconditional support recommendations with explicit damage, coverage, resistance, resource, and opportunity-cost decisions.
- Added a controlled pack-versus-durable-enemy test: hold the bow constant, change one support, compare resources and safe attack windows.
- Connected the reference to Lightning Ranger, Poison Assassin, the long Lightning Arrow guide, Spark as a spell comparison, Geonor, and Executioner.
- Replaced unrelated comparison links in the target record with a tighter set; no destination route was deleted.
- Added skill-data references. No exact DPS, gem-level breakpoint, patch compatibility promise, or claimed playtest result.
- Title is now "Lightning Arrow Reference - POE2 Mechanics and Support Choices" before the site suffix. Both title and description differ from `/guides/skills/lightning-arrow`.

### /bosses/count-geonor

- A typed entry-specific override replaces all rendered shared expansion for summary, phases, mechanics, recommendations, rewards, tips, FAQs, and description.
- Added sword sequence/lunge decisions, transformation context, cold/ground pressure, mist distractions and charge awareness, and recovery after a mistake.
- Separate practical advice for ranged, deliberate melee, close-range control, and persistent-damage playstyles.
- Replaced the misleading treatment of player defenses as boss elemental weaknesses with "Defensive Priorities" on this page only.
- Kept all previous related-build, skill, boss, and guide arrays unchanged. Added three contextual destinations: Poison Assassin, Ice Nova guide, Flame Wall guide.
- Removed fixed timing assumptions and guaranteed loot implications from this encounter's rendered advice.
- Other five bosses' exported data is exactly unchanged.

### /builds/lightning-ranger

- Expanded the outline into a practical bow progression plan: audience, limitations, main attack, optional Lightning Rod setup, support trade-offs, equipment checks, leveling, clearing, bossing, defenses, and mistakes.
- Added six specific FAQs.
- Added contextual links to the reference, long guide, two encounter guides, and Poison Assassin as a different damage plan.
- Replaced the duplicate related-skill block with useful build-planning resources, reusing the existing Poison Assassin presentation pattern.
- Preserved the internal tier value but stopped displaying the unsubstantiated S-tier label on this detail page and omitted it from this page's metadata keywords.
- Kept schema keywords concise rather than inserting the new paragraph-length core-skill explanations.
- No unique-item requirement, precise DPS claim, or assertion that this is an in-game validated complete endgame loadout.
- Other five builds, including Poison Assassin, are unchanged at the exported-data level.

### Propagated Changes

Comparing rendered main text across all 111 public HTML pages found exactly eight changed pages:

| Page | Nature |
| --- | --- |
| `/guides` | Direct hub repair |
| `/skills` | Direct membership repair |
| `/skills/lightning-arrow` | Direct editorial improvement |
| `/bosses/count-geonor` | Direct editorial improvement |
| `/builds/lightning-ranger` | Direct editorial improvement |
| `/` | Existing cards inherit updated target summaries/playstyle; homepage structure unchanged |
| `/bosses` | Existing Geonor card inherits updated summary |
| `/builds` | Existing Ranger card inherits updated summary/playstyle |

Executioner and Poison Assassin retain identical rendered main text to the baseline. No other public page's main text changed.

## Content Measurements

| Detail page | Before words | After words | Before FAQs | After FAQs | Before destinations | After destinations |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| `/skills/lightning-arrow` | 1,162 | 1,234 | 6 | 6 | 12 | 11 |
| `/bosses/count-geonor` | 1,236 | 1,395 | 6 | 6 | 13 | 16 |
| `/builds/lightning-ranger` | 314 | 1,615 | 3 | 6 | 4 | 9 |

Method: parse the production-build HTML and collect text nodes inside `main`, excluding scripts/styles. Count words with `\b[\w]+(?:['-][\w]+)*\b`; headings, FAQ answers and link labels count, while global header/footer, schema and metadata do not. FAQ count is question headings under the FAQ section. Internal destinations are unique same-origin paths from main content, excluding self-links; repeated links count once. External evidence links do not count toward internal-link targets.

Lightning Ranger's nine destinations are `/builds`, `/skills`, `/guides`, `/skills/lightning-arrow`, `/guides/skills/lightning-arrow`, `/builds/poison-assassin`, `/bosses/count-geonor`, `/bosses/executioner`, and the pre-existing `/bosses/endgame-titan`.

Word count is descriptive, not an indexing threshold. No padding was added solely to maximize the count.

## Trust and Metadata Preservation

PASS: case-insensitive checks found none of the requested trust-risk phrases in rendered main content of all eight affected pages. Hydrated browser text was also checked on all five direct pages. The scan included AI-assisted/generated variants, draft, generated, placeholder, early access, outdated patch, verification/content notes, programmatic, SEO Score, Needs update, publishing instructions, internal link opportunity, authority candidate(s), and scalable SEO workflow.

- Internal `contentNotes` and `patchVersion` strings remain unchanged in all three edited data records.
- Markdown frontmatter, internal status flags, and dates are untouched.
- The three edited detail records now show `2026-09-26`, reflecting this real editorial revision. This is not a claim of in-game testing.
- Non-target records and their dates were compared against HEAD and remain unchanged.
- Existing canonical architecture, index/follow behavior, BreadcrumbList and Article rendering are preserved.
- All five direct pages render absolute self-canonicals at the production origin, with no noindex directive.
- CMS/admin metadata has not been erased merely to pass a public-text scan.

## Route and Link Verification

| Required local endpoint | HTTP | Unexpected redirect |
| --- | ---: | --- |
| `/guides` | 200 | None |
| `/skills` | 200 | None |
| `/skills/lightning-arrow` | 200 | None |
| `/bosses/count-geonor` | 200 | None |
| `/builds/lightning-ranger` | 200 | None |
| `/bosses/executioner` | 200 | None |
| `/builds/poison-assassin` | 200 | None |
| `/` | 200 | None |
| `/sitemap.xml` | 200 | None |
| `/robots.txt` | 200 | None |

The local production server was checked with redirects disabled. The union of required endpoints, all 32 sitemap URLs, and every internal destination in the five direct pages' rendered anchors contained 53 URLs. All returned 200. Zero broken URLs, unexpected redirects, or invalid fragment targets.

Desktop 1440x900 and mobile 390x844 browser checks covered all five direct pages: one H1 each, no horizontal overflow, body paragraphs at most 18px, and no uncaught page JavaScript errors. Screenshots were inspected for the hub, detail headings, Geonor overview, practical example and Ranger FAQ. The new skill-hub link was clicked successfully.

### Sitemap and Route Invariants

- 121/121 generated static entries; before/after prerender-manifest route keys match exactly.
- Same 111 public HTML pages under the audit's public-page counting convention.
- Same 32 sitemap locations, ordering, frequencies and priorities.
- Same robots output, byte-for-byte.
- No source differences in sitemap, robots, homepage, shared SEO helpers, content directories, or pipeline scripts.

Important pre-existing behavior: `src/app/sitemap.ts` initializes `lastModified = new Date()`, so rebuilding changes all sitemap `lastmod` timestamps. The XML is therefore not byte-identical across builds even though sitemap code and membership are unchanged. Validation ignores only those existing build-time date values when comparing sitemap structure. No attempt was made to change this protected logic.

## Build and Tool Results

Final production build, exit code 0:

```text
> poe2-site@0.1.0 build
> next build
Next.js 16.2.6 (Turbopack)
Compiled successfully in 67s
Finished TypeScript in 2.4s
Generating static pages using 15 workers (121/121) in 2.9s
Finalizing page optimization ...
```

Additional verification:

- Scoped ESLint on all nine edited source files: exit 0, no errors or warnings. Two JSX apostrophe escaping errors found on the initial lint run were corrected before the final build.
- `npm run validate:guides`: exit 0; 23 Markdown guides checked, 10 pre-existing warnings. Warnings concern missing related metadata and low FAQ counts on old guides, not newly introduced build failures.
- `git diff --check`: exit 0, no whitespace errors. Git reports the repository's existing LF-to-CRLF normalization notices.
- Exported-data comparison: unchanged slug sequences; every non-target record identical to HEAD; original Geonor related-link arrays preserved.
- Temporary validation helper lived outside the repository; it did not execute any SEO generation/injection pipeline.

Evidence files are local diagnostics, not production content:

- `C:\Users\86186\AppData\Local\Temp\poe2-publishing-quality-2026-09-26-before.json`
- `C:\Users\86186\AppData\Local\Temp\poe2-publishing-quality-2026-09-26-after.json`
- Screenshots sharing the same prefix in the operating-system temporary directory.

The temporary production-validation server was stopped after verification. A local development preview is available at [the Guides hub](http://127.0.0.1:3027/guides) for review; it is not a production deployment.

## Evidence and Remaining Risks

1. Mechanics were checked against the skill and encounter data exposed by [Lightning Arrow](https://poe2db.tw/us/Lightning_Arrow), [Lightning Rod](https://poe2db.tw/us/Lightning_Rod), [Count Geonor](https://poe2db.tw/us/Count_Geonor), and [the wolf encounter's attack/audio data](https://poe2db.tw/Geonor%2C_the_Putrid_Wolf). These are third-party presentations of game data, not a claim of first-hand playtesting or official endorsement. Player advice is conservative editorial guidance. A knowledgeable player should test the proposed routine before making stronger performance claims.
2. The long Markdown Lightning Arrow guide and other older guides still contain content-quality and detail-template presentation issues outside this five-page scope, including internal SEO/status language on some detail views. Their titles, wording and overlapping intent require separate review; this sprint does not certify all linked destinations.
3. Count Geonor retains its existing Frost Monk Markdown-guide link as required. That route resolves, but its unfinished content remains a quality risk. Retained Endgame Titan and other legacy boss destinations also still need factual review. HTTP validity is not an accuracy endorsement.
4. Six unfinished/example routes are no longer listed on the Guides hub but remain publicly accessible and can still be linked elsewhere. No hidden route removal or indexing directive was introduced.
5. The existing Skills filters and duplicate underlying skill records were not redesigned. Only Lightning Arrow membership was corrected.
6. The inherited S-tier label still exists in internal data and other list-card contexts; only the edited Ranger detail page stopped asserting it. A site-wide tier methodology is outside scope.
7. Prior audit issues such as the missing shared OG image and non-existent SearchAction destination were not altered. They should be addressed separately, not conflated with a proven indexing cause.
8. Build-time sitemap freshness remains a pre-existing concern. The 32-URL membership repair is preserved; source-level editorial dates were updated only for the three reviewed details.
9. Local success does not demonstrate that production has deployed, that Google has recrawled, or that indexing will increase. No new content expansion should be inferred as the next step from word counts alone.

## GSC Observation Plan

### After Review and Deployment

1. Review the three revised pages for game accuracy and approve the source diff. Deploy through the existing workflow; no deployment or commit was performed here.
2. Confirm the five changed pages are live, the new Skills link works, and sitemap membership is still 32. Record deployment time.
3. Inspect the three detail URLs in GSC. Save the exact indexing reason, last crawl, fetch/crawl allowance, user-declared canonical and Google-selected canonical where available.
4. Run the live URL test and inspect rendered content. A successful live test does not establish indexing or predict Google's chosen canonical; compare with the indexed-data view. See [Google's URL Inspection documentation](https://support.google.com/webmasters/answer/9012289).
5. After confirming the deployment, request indexing once for each of the three revised detail URLs. Inspect the two repaired hubs too; request a recrawl if their stored version predates the repair. Do not submit all 29 excluded pages or repeatedly resubmit the same URLs. Google notes that a request does not guarantee indexing and repeated requests do not accelerate crawling. See [Google's recrawl guidance](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl).

### Day 7

Record each test URL's indexing status/reason, last crawl relative to deployment, canonical selection, and page-filtered impressions/clicks. Separate brand traffic from skill/build/boss queries. Keep the apparently indexed homepage, Executioner and Poison Assassin as reference pages; this is not a randomized causal experiment.

If no post-deployment crawl is recorded, keep the cohort and sitemap stable. Do not call that a rejection of the revised content. Check the live fetch and discovery evidence instead of adding more words.

### Day 14

- At least one newly indexed test page or emerging non-brand visibility: keep observing the remaining cohort and consolidate the working editorial pattern before broadening.
- Post-deployment crawl plus crawled/not-indexed status: review unique usefulness, factual proof and reference-versus-guide overlap on that specific URL. Do not start another blanket length sprint.
- Duplicate/canonical reason: investigate the selected canonical and intent overlap before changing content or requesting another crawl.
- Fetch, robots, noindex, server or soft-404 reason: diagnose the confirmed issue first; local 200 results do not override GSC evidence.
- No post-deployment crawl: extend observation and inspect crawl evidence. Do not shrink the repaired sitemap merely because two weeks elapsed.

### Day 28

If none of the three improves despite confirmed post-revision crawls and no technical exclusion, stop expanding content and reassess the site's distinct evidence/value proposition, older factual contradictions, and search demand. Consider a low-maintenance period rather than another broad authority-word-count sprint. These are project decision checkpoints, not Google service-level deadlines.

**Recommended next action:** review and deploy this small cohort, then collect per-URL GSC evidence. Keep routes, page count, homepage structure and the repaired sitemap stable while evaluating the result.

# POE2 Forge SEO Content Audit - June 2026

Generated: 2026-06-13
Repository: `D:/poe2-site`
Scope: audit only. No site content, routes, URLs, or source content were modified.

## Executive Summary

- Total pages audited: **101**
- Average word count: **405.0**
- Average FAQ count: **1.7**
- Average internal links: **4.5**
- AI-related signal pages: **52**
- Verification signal pages: **22**
- Outdated signal pages: **54**

## Content Sources Scanned

| Source | Status |
| --- | --- |
| src/content/guides | 23 files |
| content/programmatic/skills | 46 files |
| src/data/bosses.ts | 1 file |
| src/data/builds.ts | 1 file |
| src/data/skills.ts | 1 file |
| content/drafts | 8 files |
| content/verification-notes | 8 files |
| src/content/drafts | 5 files |
| data/ai-seo | 121 files |

Notes: `content/drafts`, `content/verification-notes`, `src/content/drafts`, and `data/ai-seo` were scanned as repository content/SEO sources, but they do not currently generate public content pages from the inspected Next.js routes. Public content pages came from `src/data/*.ts`, `src/content/guides`, and `content/programmatic/skills`.

## Major Findings

1. Most routable detail pages are below 500 words. 83 of 101 audited pages fall under 500 words, including every TS-backed boss/build/skill page.
2. AI and verification labels are rendered or present in source on many pages. All TS-backed boss/build/skill pages include `Content Notes` and `AI-assisted placeholder...`; many guide/programmatic pages also contain draft/review language.
3. Outdated/patch-risk language is widespread. TS-backed pages use `Early Access`; many Markdown guides use older patch labels or contain `Outdated patch`/review cues.
4. Internal linking is uneven. 13 pages have fewer than 3 internal links, and 54 have fewer than 5. Thin pages with weak linking are the biggest indexability risk group.
5. Programmatic pages are structurally repetitive: average word count is 376.3 and average FAQ count is 1. They contain draft/review phrasing and share near-identical outlines, which is a low-quality signal at scale.
6. Duplicate skill slugs exist in `src/data/skills.ts`: flame-wall, earthshatter. Duplicate slugs can create static-param duplication and make audits/coverage harder to trust.

### Likely Reasons Google Indexed Only `/` and `/bosses/executioner`

- Google likely sees many detail pages as low-value duplicates or placeholders because visible/source text includes `AI-assisted`, `Content Notes`, `Early Access`, and verification caveats.
- The homepage is broad, crawlable, and internally linked from navigation, so it is naturally discovered and retained.
- `/bosses/executioner` may have been crawled early from a sitemap or internal link path, but it is not materially stronger than other boss pages in this audit; it shares the same placeholder framework, 3 FAQs, 4 internal links, `Early Access`, and `Content Notes`.
- Large groups of pages have similar templates, similar FAQ text, similar update dates, and similar risk signals, giving Google little reason to index them individually.
- Several pages have fewer than 3-5 meaningful internal links, limiting crawl context and reducing cluster authority.

## Priority Recommendations

### Priority 1

- Remove visible/source quality-risk labels from public pages after editorial verification, especially `AI-assisted`, `Content Notes`, `Early Access`, `Outdated Patch`, and verification-required phrasing.
- Bring the most important public pages above 800-1200 genuinely useful words with encounter/build/skill-specific details that are not template repeats.
- Verify current patch accuracy and replace generic placeholder recommendations with tested or clearly sourced gameplay detail.

### Priority 2

- Strengthen internal linking so every content page has at least 5 contextual internal links across related guides, skills, builds, and bosses.
- Fix duplicate skill slugs in `src/data/skills.ts` after deciding canonical entries.
- Prioritize boss/build/skill hub-to-detail and detail-to-guide links so clusters look intentional rather than isolated.

### Priority 3

- Consolidate, noindex, or heavily rewrite low-quality programmatic pages before expecting broad indexation.
- Add unique FAQ coverage only where the answers are specific and not repeated boilerplate.
- Maintain an editorial status field that is not rendered publicly, plus a review workflow that keeps draft language out of indexable pages.

## All Pages Inventory

| URL | Source | Title | Words | FAQs | Internal Links | Last Updated | Score |
| --- | --- | --- | --- | --- | --- | --- | --- |
| /bosses/chimera-abomination | src/data/bosses.ts | Chimera Abomination Boss Guide | 285 | 3 | 4 | 2026-05-11 | 39 |
| /bosses/count-geonor | src/data/bosses.ts | Count Geonor Boss Guide | 287 | 3 | 4 | 2026-05-11 | 39 |
| /bosses/endgame-titan | src/data/bosses.ts | Endgame Titan Boss Guide | 280 | 3 | 4 | 2026-05-11 | 39 |
| /bosses/executioner | src/data/bosses.ts | The Executioner Boss Guide | 275 | 3 | 4 | 2026-05-11 | 39 |
| /bosses/fire-warden | src/data/bosses.ts | Fire Warden Boss Guide | 280 | 3 | 4 | 2026-05-11 | 39 |
| /bosses/king-in-the-mists | src/data/bosses.ts | King in the Mists Boss Guide | 299 | 3 | 4 | 2026-05-11 | 39 |
| /builds/earthshatter-warrior | src/data/builds.ts | Earthshatter Warrior Build | 331 | 3 | 4 | 2026-05-11 | 39 |
| /builds/frost-monk | src/data/builds.ts | Frost Monk Build | 337 | 3 | 6 | 2026-05-11 | 47 |
| /builds/grenade-mercenary | src/data/builds.ts | Grenade Mercenary Build | 342 | 3 | 4 | 2026-05-11 | 39 |
| /builds/infernal-witch | src/data/builds.ts | Infernal Witch Build | 347 | 3 | 6 | 2026-05-11 | 47 |
| /builds/lightning-ranger | src/data/builds.ts | Lightning Ranger Build | 355 | 3 | 4 | 2026-05-11 | 39 |
| /builds/poison-assassin | src/data/builds.ts | Poison Assassin Build | 353 | 3 | 4 | 2026-05-11 | 39 |
| /guides/bosses/count-geonor | src/content/guides/bosses/count-geonor.md | Count Geonor Boss Guide | 216 | 2 | 10 | Mon May 11 2026 03:00:00 GMT+0300 (东欧夏令时间) | 41 |
| /guides/bosses/trialmaster | src/content/guides/bosses/trialmaster.md | Trialmaster Boss Guide | 347 | 3 | 5 | 2026-05-11 | 35 |
| /guides/builds/frost-monk | src/content/guides/builds/frost-monk.md | Frost Monk Build Guide | 169 | 2 | 5 | 2026-05-11 | 41 |
| /guides/builds/lightning-ranger | src/content/guides/builds/lightning-ranger.md | Lightning Ranger Build Guide | 228 | 2 | 9 | Mon May 11 2026 03:00:00 GMT+0300 (东欧夏令时间) | 41 |
| /guides/skills/arc | src/content/guides/skills/arc.md | Arc Skill Guide | 543 | 1 | 8 | 2026-05-12 | 42 |
| /guides/skills/arc-build | content/programmatic/skills/arc-build.md | Arc Build Guide | 373 | 1 | 4 | n/a | 35 |
| /guides/skills/arc-leveling | content/programmatic/skills/arc-leveling.md | Arc Leveling Guide | 358 | 1 | 4 | n/a | 35 |
| /guides/skills/ball-lightning | src/content/guides/skills/ball-lightning.md | Ball Lightning Skill Guide | 752 | 1 | 8 | 2026-05-12 | 42 |
| /guides/skills/ball-lightning-build | content/programmatic/skills/ball-lightning-build.md | Ball Lightning Build Guide | 389 | 1 | 4 | n/a | 35 |
| /guides/skills/ball-lightning-leveling | content/programmatic/skills/ball-lightning-leveling.md | Ball Lightning Leveling Guide | 374 | 1 | 4 | n/a | 35 |
| /guides/skills/chain-lightning | src/content/guides/skills/chain-lightning.md | Chain Lightning Skill Guide | 684 | 1 | 8 | 2026-05-12 | 42 |
| /guides/skills/chain-lightning-build | content/programmatic/skills/chain-lightning-build.md | Chain Lightning Build Guide | 389 | 1 | 4 | n/a | 35 |
| /guides/skills/chain-lightning-leveling | content/programmatic/skills/chain-lightning-leveling.md | Chain Lightning Leveling Guide | 374 | 1 | 4 | n/a | 35 |
| /guides/skills/cold-snap-ai | src/content/guides/skills/cold-snap-ai.md | Cold Snap Skill Guide | 776 | 1 | 6 | 2026-05-11 | 42 |
| /guides/skills/earthshatter | src/content/guides/skills/earthshatter.md | Earthshatter Skill Guide | 781 | 1 | 6 | 2026-05-12 | 42 |
| /guides/skills/earthshatter-build | content/programmatic/skills/earthshatter-build.md | Earthshatter Build Guide | 378 | 1 | 5 | n/a | 43 |
| /guides/skills/earthshatter-leveling | content/programmatic/skills/earthshatter-leveling.md | Earthshatter Leveling Guide | 363 | 1 | 5 | n/a | 43 |
| /guides/skills/earthshatter-support-gems | content/programmatic/skills/earthshatter-support-gems.md | Earthshatter Best Support Gems | 353 | 1 | 5 | n/a | 43 |
| /guides/skills/ember-fusillade-build | content/programmatic/skills/ember-fusillade-build.md | Ember Fusillade Build Guide | 389 | 1 | 4 | n/a | 35 |
| /guides/skills/ember-fusillade-leveling | content/programmatic/skills/ember-fusillade-leveling.md | Ember Fusillade Leveling Guide | 374 | 1 | 4 | n/a | 35 |
| /guides/skills/example-ai-generated-guide | src/content/guides/skills/example-ai-generated-guide.md | Example AI Generated Guide | 152 | 2 | 6 | 2026-05-13 | 55 |
| /guides/skills/explosive-grenade-build | content/programmatic/skills/explosive-grenade-build.md | Explosive Grenade Build Guide | 395 | 1 | 5 | n/a | 43 |
| /guides/skills/explosive-grenade-leveling | content/programmatic/skills/explosive-grenade-leveling.md | Explosive Grenade Leveling Guide | 380 | 1 | 5 | n/a | 43 |
| /guides/skills/explosive-grenade-support-gems | content/programmatic/skills/explosive-grenade-support-gems.md | Explosive Grenade Best Support Gems | 370 | 1 | 5 | n/a | 43 |
| /guides/skills/fireball | src/content/guides/skills/fireball.md | Fireball Skill Guide | 665 | 1 | 7 | 2026-05-11 | 42 |
| /guides/skills/fireball-build | content/programmatic/skills/fireball-build.md | Fireball Build Guide | 373 | 1 | 4 | n/a | 35 |
| /guides/skills/fireball-leveling | content/programmatic/skills/fireball-leveling.md | Fireball Leveling Guide | 358 | 1 | 4 | n/a | 35 |
| /guides/skills/flame-wall | src/content/guides/skills/flame-wall.md | Flame Wall Skill Guide | 823 | 1 | 7 | 2026-05-12 | 53 |
| /guides/skills/flame-wall-build | content/programmatic/skills/flame-wall-build.md | Flame Wall Build Guide | 395 | 1 | 5 | n/a | 43 |
| /guides/skills/flame-wall-leveling | content/programmatic/skills/flame-wall-leveling.md | Flame Wall Leveling Guide | 380 | 1 | 5 | n/a | 43 |
| /guides/skills/flame-wall-support-gems | content/programmatic/skills/flame-wall-support-gems.md | Flame Wall Best Support Gems | 370 | 1 | 5 | n/a | 43 |
| /guides/skills/freezing-shards | src/content/guides/skills/freezing-shards.md | Freezing Shards Skill Guide | 728 | 1 | 9 | 2026-05-12 | 42 |
| /guides/skills/freezing-shards-build | content/programmatic/skills/freezing-shards-build.md | Freezing Shards Build Guide | 389 | 1 | 4 | n/a | 35 |
| /guides/skills/freezing-shards-leveling | content/programmatic/skills/freezing-shards-leveling.md | Freezing Shards Leveling Guide | 374 | 1 | 4 | n/a | 35 |
| /guides/skills/frostbolt | src/content/guides/skills/frostbolt.md | Frostbolt Skill Guide | 620 | 1 | 8 | 2026-05-11 | 42 |
| /guides/skills/frostbolt-ai | src/content/guides/skills/frostbolt-ai.md | Frostbolt Skill Guide | 930 | 1 | 5 | 2026-05-11 | 53 |
| /guides/skills/frostbolt-build | content/programmatic/skills/frostbolt-build.md | Frostbolt Build Guide | 373 | 1 | 4 | n/a | 35 |
| /guides/skills/frostbolt-leveling | content/programmatic/skills/frostbolt-leveling.md | Frostbolt Leveling Guide | 358 | 1 | 4 | n/a | 35 |
| /guides/skills/ice-nova | src/content/guides/skills/ice-nova.md | Ice Nova Skill Guide | 783 | 1 | 9 | 2026-05-11 | 42 |
| /guides/skills/ice-nova-build | content/programmatic/skills/ice-nova-build.md | Ice Nova Build Guide | 389 | 1 | 4 | n/a | 35 |
| /guides/skills/ice-nova-leveling | content/programmatic/skills/ice-nova-leveling.md | Ice Nova Leveling Guide | 374 | 1 | 4 | n/a | 35 |
| /guides/skills/ice-spear | src/content/guides/skills/ice-spear.md | Ice Spear Skill Guide | 853 | 1 | 8 | 2026-05-12 | 53 |
| /guides/skills/ice-spear-build | content/programmatic/skills/ice-spear-build.md | Ice Spear Build Guide | 389 | 1 | 4 | n/a | 35 |
| /guides/skills/ice-spear-leveling | content/programmatic/skills/ice-spear-leveling.md | Ice Spear Leveling Guide | 374 | 1 | 4 | n/a | 35 |
| /guides/skills/ice-strike-build | content/programmatic/skills/ice-strike-build.md | Ice Strike Build Guide | 395 | 1 | 5 | n/a | 43 |
| /guides/skills/ice-strike-leveling | content/programmatic/skills/ice-strike-leveling.md | Ice Strike Leveling Guide | 380 | 1 | 5 | n/a | 43 |
| /guides/skills/ice-strike-support-gems | content/programmatic/skills/ice-strike-support-gems.md | Ice Strike Best Support Gems | 370 | 1 | 5 | n/a | 43 |
| /guides/skills/lightning-arrow | src/content/guides/skills/lightning-arrow.md | Lightning Arrow Skill Guide | 567 | 1 | 6 | 2026-05-11 | 42 |
| /guides/skills/lightning-arrow-ai | src/content/guides/skills/lightning-arrow-ai.md | Lightning Arrow Skill Guide | 655 | 1 | 6 | 2026-05-11 | 42 |
| /guides/skills/lightning-arrow-build | content/programmatic/skills/lightning-arrow-build.md | Lightning Arrow Build Guide | 395 | 1 | 5 | n/a | 43 |
| /guides/skills/lightning-arrow-leveling | content/programmatic/skills/lightning-arrow-leveling.md | Lightning Arrow Leveling Guide | 380 | 1 | 5 | n/a | 43 |
| /guides/skills/lightning-arrow-support-gems | content/programmatic/skills/lightning-arrow-support-gems.md | Lightning Arrow Best Support Gems | 370 | 1 | 5 | n/a | 43 |
| /guides/skills/meteor | src/content/guides/skills/meteor.md | Meteor Skill Guide | 614 | 1 | 7 | 2026-05-12 | 42 |
| /guides/skills/meteor-build | content/programmatic/skills/meteor-build.md | Meteor Build Guide | 373 | 1 | 4 | n/a | 35 |
| /guides/skills/meteor-leveling | content/programmatic/skills/meteor-leveling.md | Meteor Leveling Guide | 358 | 1 | 4 | n/a | 35 |
| /guides/skills/poison-arrow | src/content/guides/skills/poison-arrow.md | Poison Arrow Skill Guide | 801 | 1 | 5 | 2026-05-12 | 53 |
| /guides/skills/poison-arrow-build | content/programmatic/skills/poison-arrow-build.md | Poison Arrow Build Guide | 389 | 1 | 4 | n/a | 35 |
| /guides/skills/poison-arrow-leveling | content/programmatic/skills/poison-arrow-leveling.md | Poison Arrow Leveling Guide | 374 | 1 | 4 | n/a | 35 |
| /guides/skills/poisonous-concoction-build | content/programmatic/skills/poisonous-concoction-build.md | Poisonous Concoction Build Guide | 395 | 1 | 5 | n/a | 43 |
| /guides/skills/poisonous-concoction-leveling | content/programmatic/skills/poisonous-concoction-leveling.md | Poisonous Concoction Leveling Guide | 380 | 1 | 5 | n/a | 43 |
| /guides/skills/poisonous-concoction-support-gems | content/programmatic/skills/poisonous-concoction-support-gems.md | Poisonous Concoction Best Support Gems | 370 | 1 | 5 | n/a | 43 |
| /guides/skills/spark | src/content/guides/skills/spark.md | Spark Skill Guide | 741 | 1 | 8 | 2026-05-11 | 42 |
| /guides/skills/spark-build | content/programmatic/skills/spark-build.md | Spark Build Guide | 373 | 1 | 4 | n/a | 35 |
| /guides/skills/spark-leveling | content/programmatic/skills/spark-leveling.md | Spark Leveling Guide | 358 | 1 | 4 | n/a | 35 |
| /guides/skills/tempest-bell-build | content/programmatic/skills/tempest-bell-build.md | Tempest Bell Build Guide | 389 | 1 | 4 | n/a | 35 |
| /guides/skills/tempest-bell-leveling | content/programmatic/skills/tempest-bell-leveling.md | Tempest Bell Leveling Guide | 374 | 1 | 4 | n/a | 35 |
| /guides/skills/whirlwind | src/content/guides/skills/whirlwind.md | Whirlwind Skill Guide | 652 | 1 | 6 | 2026-05-12 | 42 |
| /guides/skills/whirlwind-build | content/programmatic/skills/whirlwind-build.md | Whirlwind Build Guide | 373 | 1 | 4 | n/a | 35 |
| /guides/skills/whirlwind-leveling | content/programmatic/skills/whirlwind-leveling.md | Whirlwind Leveling Guide | 358 | 1 | 4 | n/a | 35 |
| /skills/arc | src/data/skills.ts | Arc Skill Guide | 275 | 3 | 0 | 2026-05-11 | 29 |
| /skills/ball-lightning | src/data/skills.ts | Ball Lightning Skill Guide | 291 | 3 | 0 | 2026-05-11 | 29 |
| /skills/chain-lightning | src/data/skills.ts | Chain Lightning Skill Guide | 262 | 3 | 0 | 2026-05-11 | 29 |
| /skills/earthshatter | src/data/skills.ts | Earthshatter Skill Guide | 299 | 3 | 6 | 2026-05-11 | 47 |
| /skills/ember-fusillade | src/data/skills.ts | Ember Fusillade Skill Guide | 303 | 3 | 2 | 2026-05-11 | 29 |
| /skills/explosive-grenade | src/data/skills.ts | Explosive Grenade Skill Guide | 292 | 3 | 3 | 2026-05-11 | 39 |
| /skills/fireball | src/data/skills.ts | Fireball Skill Guide | 248 | 3 | 0 | 2026-05-11 | 29 |
| /skills/flame-wall | src/data/skills.ts | Flame Wall Skill Guide | 311 | 3 | 6 | 2026-05-11 | 47 |
| /skills/freezing-shards | src/data/skills.ts | Freezing Shards Skill Guide | 282 | 3 | 0 | 2026-05-11 | 29 |
| /skills/frostbolt | src/data/skills.ts | Frostbolt Skill Guide | 267 | 3 | 0 | 2026-05-11 | 29 |
| /skills/ice-nova | src/data/skills.ts | Ice Nova Skill Guide | 288 | 3 | 0 | 2026-05-11 | 29 |
| /skills/ice-spear | src/data/skills.ts | Ice Spear Skill Guide | 280 | 3 | 0 | 2026-05-11 | 29 |
| /skills/ice-strike | src/data/skills.ts | Ice Strike Skill Guide | 299 | 3 | 3 | 2026-05-11 | 39 |
| /skills/lightning-arrow | src/data/skills.ts | Lightning Arrow Skill Guide | 323 | 3 | 6 | 2026-05-11 | 47 |
| /skills/meteor | src/data/skills.ts | Meteor Skill Guide | 275 | 3 | 0 | 2026-05-11 | 29 |
| /skills/poison-arrow | src/data/skills.ts | Poison Arrow Skill Guide | 280 | 3 | 0 | 2026-05-11 | 29 |
| /skills/poisonous-concoction | src/data/skills.ts | Poisonous Concoction Skill Guide | 321 | 3 | 6 | 2026-05-11 | 47 |
| /skills/spark | src/data/skills.ts | Spark Skill Guide | 267 | 3 | 0 | 2026-05-11 | 29 |
| /skills/tempest-bell | src/data/skills.ts | Tempest Bell Skill Guide | 304 | 3 | 2 | 2026-05-11 | 29 |
| /skills/whirlwind | src/data/skills.ts | Whirlwind Skill Guide | 281 | 3 | 3 | 2026-05-11 | 39 |

## Quality Risk Signals

### Pages Containing AI-Related Signals

| URL | Signals |
| --- | --- |
| /bosses/chimera-abomination | AI-assisted |
| /bosses/count-geonor | AI-assisted |
| /bosses/endgame-titan | AI-assisted |
| /bosses/executioner | AI-assisted |
| /bosses/fire-warden | AI-assisted |
| /bosses/king-in-the-mists | AI-assisted |
| /builds/earthshatter-warrior | AI-assisted |
| /builds/frost-monk | AI-assisted |
| /builds/grenade-mercenary | AI-assisted |
| /builds/infernal-witch | AI-assisted |
| /builds/lightning-ranger | AI-assisted |
| /builds/poison-assassin | AI-assisted |
| /guides/bosses/trialmaster | AI-assisted, AI-generated |
| /guides/skills/arc | AI-assisted |
| /guides/skills/ball-lightning | AI-assisted |
| /guides/skills/chain-lightning | AI-assisted |
| /guides/skills/cold-snap-ai | AI-assisted |
| /guides/skills/earthshatter | AI-assisted |
| /guides/skills/example-ai-generated-guide | AI-generated, AI generated |
| /guides/skills/fireball | AI-assisted |
| /guides/skills/flame-wall | AI-assisted |
| /guides/skills/freezing-shards | AI-assisted |
| /guides/skills/frostbolt | AI-assisted |
| /guides/skills/frostbolt-ai | AI-assisted |
| /guides/skills/ice-nova | AI-assisted |
| /guides/skills/ice-spear | AI-assisted |
| /guides/skills/lightning-arrow | AI-assisted |
| /guides/skills/lightning-arrow-ai | AI-assisted |
| /guides/skills/meteor | AI-assisted |
| /guides/skills/poison-arrow | AI-assisted |
| /guides/skills/spark | AI-assisted |
| /guides/skills/whirlwind | AI-assisted |
| /skills/arc | AI-assisted |
| /skills/ball-lightning | AI-assisted |
| /skills/chain-lightning | AI-assisted |
| /skills/earthshatter | AI-assisted |
| /skills/ember-fusillade | AI-assisted |
| /skills/explosive-grenade | AI-assisted |
| /skills/fireball | AI-assisted |
| /skills/flame-wall | AI-assisted |
| /skills/freezing-shards | AI-assisted |
| /skills/frostbolt | AI-assisted |
| /skills/ice-nova | AI-assisted |
| /skills/ice-spear | AI-assisted |
| /skills/ice-strike | AI-assisted |
| /skills/lightning-arrow | AI-assisted |
| /skills/meteor | AI-assisted |
| /skills/poison-arrow | AI-assisted |
| /skills/poisonous-concoction | AI-assisted |
| /skills/spark | AI-assisted |
| /skills/tempest-bell | AI-assisted |
| /skills/whirlwind | AI-assisted |

### Pages Containing Verification Signals

| URL | Signals |
| --- | --- |
| /guides/bosses/count-geonor | Content Notes |
| /guides/bosses/trialmaster | Verification Notes, Content Notes, Must be verified |
| /guides/builds/frost-monk | Verification Notes, Content Notes |
| /guides/builds/lightning-ranger | Content Notes |
| /guides/skills/arc | Verification Notes, Content Notes, Must be verified |
| /guides/skills/ball-lightning | Verification Notes, Content Notes, Must be verified |
| /guides/skills/chain-lightning | Verification Notes, Content Notes, Must be verified |
| /guides/skills/cold-snap-ai | Verification Notes, Content Notes, Must be verified |
| /guides/skills/earthshatter | Verification Notes, Content Notes, Must be verified |
| /guides/skills/fireball | Verification Notes, Content Notes, Must be verified |
| /guides/skills/flame-wall | Verification Notes, Content Notes, Must be verified |
| /guides/skills/freezing-shards | Verification Notes, Content Notes, Must be verified |
| /guides/skills/frostbolt | Verification Notes, Content Notes, Must be verified |
| /guides/skills/frostbolt-ai | Verification Notes, Content Notes, Must be verified |
| /guides/skills/ice-nova | Verification Notes, Content Notes, Must be verified |
| /guides/skills/ice-spear | Verification Notes, Content Notes, Must be verified |
| /guides/skills/lightning-arrow | Verification Notes, Content Notes, Must be verified |
| /guides/skills/lightning-arrow-ai | Verification Notes, Content Notes, Must be verified |
| /guides/skills/meteor | Verification Notes, Content Notes, Must be verified |
| /guides/skills/poison-arrow | Verification Notes, Content Notes, Must be verified |
| /guides/skills/spark | Verification Notes, Content Notes, Must be verified |
| /guides/skills/whirlwind | Verification Notes, Content Notes, Must be verified |

### Pages Containing Outdated Signals

| URL | Signals |
| --- | --- |
| /bosses/chimera-abomination | Early Access |
| /bosses/count-geonor | Early Access |
| /bosses/endgame-titan | Early Access |
| /bosses/executioner | Early Access |
| /bosses/fire-warden | Early Access |
| /bosses/king-in-the-mists | Early Access |
| /builds/earthshatter-warrior | Early Access |
| /builds/frost-monk | Early Access |
| /builds/grenade-mercenary | Early Access |
| /builds/infernal-witch | Early Access |
| /builds/lightning-ranger | Early Access |
| /builds/poison-assassin | Early Access |
| /guides/bosses/count-geonor | Early Access |
| /guides/bosses/trialmaster | Early Access |
| /guides/builds/frost-monk | Early Access |
| /guides/builds/lightning-ranger | Early Access |
| /guides/skills/arc | Early Access |
| /guides/skills/ball-lightning | Early Access |
| /guides/skills/chain-lightning | Early Access |
| /guides/skills/cold-snap-ai | Early Access |
| /guides/skills/earthshatter | Early Access |
| /guides/skills/fireball | Early Access |
| /guides/skills/flame-wall | Early Access |
| /guides/skills/freezing-shards | Early Access |
| /guides/skills/frostbolt | Early Access |
| /guides/skills/frostbolt-ai | Early Access |
| /guides/skills/ice-nova | Early Access |
| /guides/skills/ice-spear | Early Access |
| /guides/skills/lightning-arrow | Early Access |
| /guides/skills/lightning-arrow-ai | Early Access |
| /guides/skills/meteor | Early Access |
| /guides/skills/poison-arrow | Early Access |
| /guides/skills/spark | Early Access |
| /guides/skills/whirlwind | Early Access |
| /skills/arc | Early Access |
| /skills/ball-lightning | Early Access |
| /skills/chain-lightning | Early Access |
| /skills/earthshatter | Early Access |
| /skills/ember-fusillade | Early Access |
| /skills/explosive-grenade | Early Access |
| /skills/fireball | Early Access |
| /skills/flame-wall | Early Access |
| /skills/freezing-shards | Early Access |
| /skills/frostbolt | Early Access |
| /skills/ice-nova | Early Access |
| /skills/ice-spear | Early Access |
| /skills/ice-strike | Early Access |
| /skills/lightning-arrow | Early Access |
| /skills/meteor | Early Access |
| /skills/poison-arrow | Early Access |
| /skills/poisonous-concoction | Early Access |
| /skills/spark | Early Access |
| /skills/tempest-bell | Early Access |
| /skills/whirlwind | Early Access |

## Thin Content Analysis

- Under 500 words: **83**
- 500-800 words: **14**
- 800-1200 words: **4**
- 1200+ words: **0**

### 20 Thinnest Pages

| URL | Words | FAQs | Internal Links | Score |
| --- | --- | --- | --- | --- |
| /guides/skills/example-ai-generated-guide | 152 | 2 | 6 | 55 |
| /guides/builds/frost-monk | 169 | 2 | 5 | 41 |
| /guides/bosses/count-geonor | 216 | 2 | 10 | 41 |
| /guides/builds/lightning-ranger | 228 | 2 | 9 | 41 |
| /skills/fireball | 248 | 3 | 0 | 29 |
| /skills/chain-lightning | 262 | 3 | 0 | 29 |
| /skills/frostbolt | 267 | 3 | 0 | 29 |
| /skills/spark | 267 | 3 | 0 | 29 |
| /bosses/executioner | 275 | 3 | 4 | 39 |
| /skills/arc | 275 | 3 | 0 | 29 |
| /skills/meteor | 275 | 3 | 0 | 29 |
| /bosses/fire-warden | 280 | 3 | 4 | 39 |
| /bosses/endgame-titan | 280 | 3 | 4 | 39 |
| /skills/ice-spear | 280 | 3 | 0 | 29 |
| /skills/poison-arrow | 280 | 3 | 0 | 29 |
| /skills/whirlwind | 281 | 3 | 3 | 39 |
| /skills/freezing-shards | 282 | 3 | 0 | 29 |
| /bosses/chimera-abomination | 285 | 3 | 4 | 39 |
| /bosses/count-geonor | 287 | 3 | 4 | 39 |
| /skills/ice-nova | 288 | 3 | 0 | 29 |

## FAQ Analysis

- Pages with 0 FAQs: **0**
- Pages with 1 FAQ: **64**
- Pages with 2 FAQs: **4**
- Pages with 3+ FAQs: **33**

### 0 FAQs

| URL | Words | Internal Links |
| --- | --- | --- |

### 1 FAQ

| URL | Words | Internal Links |
| --- | --- | --- |
| /guides/skills/arc | 543 | 8 |
| /guides/skills/ball-lightning | 752 | 8 |
| /guides/skills/chain-lightning | 684 | 8 |
| /guides/skills/cold-snap-ai | 776 | 6 |
| /guides/skills/earthshatter | 781 | 6 |
| /guides/skills/fireball | 665 | 7 |
| /guides/skills/flame-wall | 823 | 7 |
| /guides/skills/freezing-shards | 728 | 9 |
| /guides/skills/frostbolt-ai | 930 | 5 |
| /guides/skills/frostbolt | 620 | 8 |
| /guides/skills/ice-nova | 783 | 9 |
| /guides/skills/ice-spear | 853 | 8 |
| /guides/skills/lightning-arrow-ai | 655 | 6 |
| /guides/skills/lightning-arrow | 567 | 6 |
| /guides/skills/meteor | 614 | 7 |
| /guides/skills/poison-arrow | 801 | 5 |
| /guides/skills/spark | 741 | 8 |
| /guides/skills/whirlwind | 652 | 6 |
| /guides/skills/arc-build | 373 | 4 |
| /guides/skills/arc-leveling | 358 | 4 |
| /guides/skills/ball-lightning-build | 389 | 4 |
| /guides/skills/ball-lightning-leveling | 374 | 4 |
| /guides/skills/chain-lightning-build | 389 | 4 |
| /guides/skills/chain-lightning-leveling | 374 | 4 |
| /guides/skills/earthshatter-build | 378 | 5 |
| /guides/skills/earthshatter-leveling | 363 | 5 |
| /guides/skills/earthshatter-support-gems | 353 | 5 |
| /guides/skills/ember-fusillade-build | 389 | 4 |
| /guides/skills/ember-fusillade-leveling | 374 | 4 |
| /guides/skills/explosive-grenade-build | 395 | 5 |
| /guides/skills/explosive-grenade-leveling | 380 | 5 |
| /guides/skills/explosive-grenade-support-gems | 370 | 5 |
| /guides/skills/fireball-build | 373 | 4 |
| /guides/skills/fireball-leveling | 358 | 4 |
| /guides/skills/flame-wall-build | 395 | 5 |
| /guides/skills/flame-wall-leveling | 380 | 5 |
| /guides/skills/flame-wall-support-gems | 370 | 5 |
| /guides/skills/freezing-shards-build | 389 | 4 |
| /guides/skills/freezing-shards-leveling | 374 | 4 |
| /guides/skills/frostbolt-build | 373 | 4 |
| /guides/skills/frostbolt-leveling | 358 | 4 |
| /guides/skills/ice-nova-build | 389 | 4 |
| /guides/skills/ice-nova-leveling | 374 | 4 |
| /guides/skills/ice-spear-build | 389 | 4 |
| /guides/skills/ice-spear-leveling | 374 | 4 |
| /guides/skills/ice-strike-build | 395 | 5 |
| /guides/skills/ice-strike-leveling | 380 | 5 |
| /guides/skills/ice-strike-support-gems | 370 | 5 |
| /guides/skills/lightning-arrow-build | 395 | 5 |
| /guides/skills/lightning-arrow-leveling | 380 | 5 |
| /guides/skills/lightning-arrow-support-gems | 370 | 5 |
| /guides/skills/meteor-build | 373 | 4 |
| /guides/skills/meteor-leveling | 358 | 4 |
| /guides/skills/poison-arrow-build | 389 | 4 |
| /guides/skills/poison-arrow-leveling | 374 | 4 |
| /guides/skills/poisonous-concoction-build | 395 | 5 |
| /guides/skills/poisonous-concoction-leveling | 380 | 5 |
| /guides/skills/poisonous-concoction-support-gems | 370 | 5 |
| /guides/skills/spark-build | 373 | 4 |
| /guides/skills/spark-leveling | 358 | 4 |
| /guides/skills/tempest-bell-build | 389 | 4 |
| /guides/skills/tempest-bell-leveling | 374 | 4 |
| /guides/skills/whirlwind-build | 373 | 4 |
| /guides/skills/whirlwind-leveling | 358 | 4 |

### 2 FAQs

| URL | Words | Internal Links |
| --- | --- | --- |
| /guides/bosses/count-geonor | 216 | 10 |
| /guides/builds/frost-monk | 169 | 5 |
| /guides/builds/lightning-ranger | 228 | 9 |
| /guides/skills/example-ai-generated-guide | 152 | 6 |

### 3+ FAQs

| URL | Words | Internal Links |
| --- | --- | --- |
| /bosses/count-geonor | 287 | 4 |
| /bosses/executioner | 275 | 4 |
| /bosses/fire-warden | 280 | 4 |
| /bosses/endgame-titan | 280 | 4 |
| /bosses/chimera-abomination | 285 | 4 |
| /bosses/king-in-the-mists | 299 | 4 |
| /builds/lightning-ranger | 355 | 4 |
| /builds/infernal-witch | 347 | 6 |
| /builds/poison-assassin | 353 | 4 |
| /builds/earthshatter-warrior | 331 | 4 |
| /builds/frost-monk | 337 | 6 |
| /builds/grenade-mercenary | 342 | 4 |
| /skills/lightning-arrow | 323 | 6 |
| /skills/flame-wall | 311 | 6 |
| /skills/poisonous-concoction | 321 | 6 |
| /skills/earthshatter | 299 | 6 |
| /skills/ice-strike | 299 | 3 |
| /skills/explosive-grenade | 292 | 3 |
| /skills/tempest-bell | 304 | 2 |
| /skills/ember-fusillade | 303 | 2 |
| /skills/frostbolt | 267 | 0 |
| /skills/fireball | 248 | 0 |
| /skills/spark | 267 | 0 |
| /skills/ice-nova | 288 | 0 |
| /skills/chain-lightning | 262 | 0 |
| /skills/arc | 275 | 0 |
| /skills/ball-lightning | 291 | 0 |
| /skills/ice-spear | 280 | 0 |
| /skills/meteor | 275 | 0 |
| /skills/freezing-shards | 282 | 0 |
| /skills/poison-arrow | 280 | 0 |
| /skills/whirlwind | 281 | 3 |
| /guides/bosses/trialmaster | 347 | 5 |

## Internal-Link Analysis

- Pages with fewer than 3 internal links: **13**
- Pages with fewer than 5 internal links: **54**

### Fewer Than 3 Internal Links

| URL | Internal Links | Words | Score |
| --- | --- | --- | --- |
| /skills/fireball | 0 | 248 | 29 |
| /skills/chain-lightning | 0 | 262 | 29 |
| /skills/frostbolt | 0 | 267 | 29 |
| /skills/spark | 0 | 267 | 29 |
| /skills/arc | 0 | 275 | 29 |
| /skills/meteor | 0 | 275 | 29 |
| /skills/ice-spear | 0 | 280 | 29 |
| /skills/poison-arrow | 0 | 280 | 29 |
| /skills/freezing-shards | 0 | 282 | 29 |
| /skills/ice-nova | 0 | 288 | 29 |
| /skills/ball-lightning | 0 | 291 | 29 |
| /skills/ember-fusillade | 2 | 303 | 29 |
| /skills/tempest-bell | 2 | 304 | 29 |

### Fewer Than 5 Internal Links

| URL | Internal Links | Words | Score |
| --- | --- | --- | --- |
| /skills/fireball | 0 | 248 | 29 |
| /skills/chain-lightning | 0 | 262 | 29 |
| /skills/frostbolt | 0 | 267 | 29 |
| /skills/spark | 0 | 267 | 29 |
| /skills/arc | 0 | 275 | 29 |
| /skills/meteor | 0 | 275 | 29 |
| /skills/ice-spear | 0 | 280 | 29 |
| /skills/poison-arrow | 0 | 280 | 29 |
| /skills/freezing-shards | 0 | 282 | 29 |
| /skills/ice-nova | 0 | 288 | 29 |
| /skills/ball-lightning | 0 | 291 | 29 |
| /skills/ember-fusillade | 2 | 303 | 29 |
| /skills/tempest-bell | 2 | 304 | 29 |
| /skills/whirlwind | 3 | 281 | 39 |
| /skills/explosive-grenade | 3 | 292 | 39 |
| /skills/ice-strike | 3 | 299 | 39 |
| /bosses/executioner | 4 | 275 | 39 |
| /bosses/fire-warden | 4 | 280 | 39 |
| /bosses/endgame-titan | 4 | 280 | 39 |
| /bosses/chimera-abomination | 4 | 285 | 39 |
| /bosses/count-geonor | 4 | 287 | 39 |
| /bosses/king-in-the-mists | 4 | 299 | 39 |
| /builds/earthshatter-warrior | 4 | 331 | 39 |
| /builds/grenade-mercenary | 4 | 342 | 39 |
| /builds/poison-assassin | 4 | 353 | 39 |
| /builds/lightning-ranger | 4 | 355 | 39 |
| /guides/skills/arc-leveling | 4 | 358 | 35 |
| /guides/skills/fireball-leveling | 4 | 358 | 35 |
| /guides/skills/frostbolt-leveling | 4 | 358 | 35 |
| /guides/skills/meteor-leveling | 4 | 358 | 35 |
| /guides/skills/spark-leveling | 4 | 358 | 35 |
| /guides/skills/whirlwind-leveling | 4 | 358 | 35 |
| /guides/skills/arc-build | 4 | 373 | 35 |
| /guides/skills/fireball-build | 4 | 373 | 35 |
| /guides/skills/frostbolt-build | 4 | 373 | 35 |
| /guides/skills/meteor-build | 4 | 373 | 35 |
| /guides/skills/spark-build | 4 | 373 | 35 |
| /guides/skills/whirlwind-build | 4 | 373 | 35 |
| /guides/skills/ball-lightning-leveling | 4 | 374 | 35 |
| /guides/skills/chain-lightning-leveling | 4 | 374 | 35 |
| /guides/skills/ember-fusillade-leveling | 4 | 374 | 35 |
| /guides/skills/freezing-shards-leveling | 4 | 374 | 35 |
| /guides/skills/ice-nova-leveling | 4 | 374 | 35 |
| /guides/skills/ice-spear-leveling | 4 | 374 | 35 |
| /guides/skills/poison-arrow-leveling | 4 | 374 | 35 |
| /guides/skills/tempest-bell-leveling | 4 | 374 | 35 |
| /guides/skills/ball-lightning-build | 4 | 389 | 35 |
| /guides/skills/chain-lightning-build | 4 | 389 | 35 |
| /guides/skills/ember-fusillade-build | 4 | 389 | 35 |
| /guides/skills/freezing-shards-build | 4 | 389 | 35 |
| /guides/skills/ice-nova-build | 4 | 389 | 35 |
| /guides/skills/ice-spear-build | 4 | 389 | 35 |
| /guides/skills/poison-arrow-build | 4 | 389 | 35 |
| /guides/skills/tempest-bell-build | 4 | 389 | 35 |

## Boss Cluster Audit

| URL | Words | FAQs | Internal Links | Schema | Updated | Score |
| --- | --- | --- | --- | --- | --- | --- |
| /bosses/count-geonor | 287 | 3 | 4 | yes | 2026-05-11 | 39 |
| /bosses/executioner | 275 | 3 | 4 | yes | 2026-05-11 | 39 |
| /bosses/fire-warden | 280 | 3 | 4 | yes | 2026-05-11 | 39 |
| /bosses/endgame-titan | 280 | 3 | 4 | yes | 2026-05-11 | 39 |
| /bosses/chimera-abomination | 285 | 3 | 4 | yes | 2026-05-11 | 39 |
| /bosses/king-in-the-mists | 299 | 3 | 4 | yes | 2026-05-11 | 39 |

### Strongest Boss Pages

| URL | Words | FAQs | Internal Links | Score |
| --- | --- | --- | --- | --- |
| /bosses/king-in-the-mists | 299 | 3 | 4 | 39 |
| /bosses/count-geonor | 287 | 3 | 4 | 39 |
| /bosses/chimera-abomination | 285 | 3 | 4 | 39 |
| /bosses/fire-warden | 280 | 3 | 4 | 39 |
| /bosses/endgame-titan | 280 | 3 | 4 | 39 |

### Weakest Boss Pages

| URL | Words | FAQs | Internal Links | Score |
| --- | --- | --- | --- | --- |
| /bosses/executioner | 275 | 3 | 4 | 39 |
| /bosses/fire-warden | 280 | 3 | 4 | 39 |
| /bosses/endgame-titan | 280 | 3 | 4 | 39 |
| /bosses/chimera-abomination | 285 | 3 | 4 | 39 |
| /bosses/count-geonor | 287 | 3 | 4 | 39 |

### Pages Most Similar to /bosses/executioner

| URL | Similarity | Words | Score |
| --- | --- | --- | --- |
| /bosses/chimera-abomination | 0.612 | 285 | 39 |
| /bosses/fire-warden | 0.598 | 280 | 39 |
| /bosses/endgame-titan | 0.588 | 280 | 39 |
| /bosses/count-geonor | 0.572 | 287 | 39 |
| /bosses/king-in-the-mists | 0.544 | 299 | 39 |

## Guide Cluster Audit

| URL | Words | FAQs | Internal Links | AI | Verification | Outdated | Score |
| --- | --- | --- | --- | --- | --- | --- | --- |
| /guides/bosses/count-geonor | 216 | 2 | 10 | no | yes | yes | 41 |
| /guides/bosses/trialmaster | 347 | 3 | 5 | yes | yes | yes | 35 |
| /guides/builds/frost-monk | 169 | 2 | 5 | no | yes | yes | 41 |
| /guides/builds/lightning-ranger | 228 | 2 | 9 | no | yes | yes | 41 |
| /guides/skills/arc | 543 | 1 | 8 | yes | yes | yes | 42 |
| /guides/skills/ball-lightning | 752 | 1 | 8 | yes | yes | yes | 42 |
| /guides/skills/chain-lightning | 684 | 1 | 8 | yes | yes | yes | 42 |
| /guides/skills/cold-snap-ai | 776 | 1 | 6 | yes | yes | yes | 42 |
| /guides/skills/earthshatter | 781 | 1 | 6 | yes | yes | yes | 42 |
| /guides/skills/example-ai-generated-guide | 152 | 2 | 6 | yes | no | no | 55 |
| /guides/skills/fireball | 665 | 1 | 7 | yes | yes | yes | 42 |
| /guides/skills/flame-wall | 823 | 1 | 7 | yes | yes | yes | 53 |
| /guides/skills/freezing-shards | 728 | 1 | 9 | yes | yes | yes | 42 |
| /guides/skills/frostbolt-ai | 930 | 1 | 5 | yes | yes | yes | 53 |
| /guides/skills/frostbolt | 620 | 1 | 8 | yes | yes | yes | 42 |
| /guides/skills/ice-nova | 783 | 1 | 9 | yes | yes | yes | 42 |
| /guides/skills/ice-spear | 853 | 1 | 8 | yes | yes | yes | 53 |
| /guides/skills/lightning-arrow-ai | 655 | 1 | 6 | yes | yes | yes | 42 |
| /guides/skills/lightning-arrow | 567 | 1 | 6 | yes | yes | yes | 42 |
| /guides/skills/meteor | 614 | 1 | 7 | yes | yes | yes | 42 |
| /guides/skills/poison-arrow | 801 | 1 | 5 | yes | yes | yes | 53 |
| /guides/skills/spark | 741 | 1 | 8 | yes | yes | yes | 42 |
| /guides/skills/whirlwind | 652 | 1 | 6 | yes | yes | yes | 42 |
| /guides/skills/arc-build | 373 | 1 | 4 | no | no | no | 35 |
| /guides/skills/arc-leveling | 358 | 1 | 4 | no | no | no | 35 |
| /guides/skills/ball-lightning-build | 389 | 1 | 4 | no | no | no | 35 |
| /guides/skills/ball-lightning-leveling | 374 | 1 | 4 | no | no | no | 35 |
| /guides/skills/chain-lightning-build | 389 | 1 | 4 | no | no | no | 35 |
| /guides/skills/chain-lightning-leveling | 374 | 1 | 4 | no | no | no | 35 |
| /guides/skills/earthshatter-build | 378 | 1 | 5 | no | no | no | 43 |
| /guides/skills/earthshatter-leveling | 363 | 1 | 5 | no | no | no | 43 |
| /guides/skills/earthshatter-support-gems | 353 | 1 | 5 | no | no | no | 43 |
| /guides/skills/ember-fusillade-build | 389 | 1 | 4 | no | no | no | 35 |
| /guides/skills/ember-fusillade-leveling | 374 | 1 | 4 | no | no | no | 35 |
| /guides/skills/explosive-grenade-build | 395 | 1 | 5 | no | no | no | 43 |
| /guides/skills/explosive-grenade-leveling | 380 | 1 | 5 | no | no | no | 43 |
| /guides/skills/explosive-grenade-support-gems | 370 | 1 | 5 | no | no | no | 43 |
| /guides/skills/fireball-build | 373 | 1 | 4 | no | no | no | 35 |
| /guides/skills/fireball-leveling | 358 | 1 | 4 | no | no | no | 35 |
| /guides/skills/flame-wall-build | 395 | 1 | 5 | no | no | no | 43 |
| /guides/skills/flame-wall-leveling | 380 | 1 | 5 | no | no | no | 43 |
| /guides/skills/flame-wall-support-gems | 370 | 1 | 5 | no | no | no | 43 |
| /guides/skills/freezing-shards-build | 389 | 1 | 4 | no | no | no | 35 |
| /guides/skills/freezing-shards-leveling | 374 | 1 | 4 | no | no | no | 35 |
| /guides/skills/frostbolt-build | 373 | 1 | 4 | no | no | no | 35 |
| /guides/skills/frostbolt-leveling | 358 | 1 | 4 | no | no | no | 35 |
| /guides/skills/ice-nova-build | 389 | 1 | 4 | no | no | no | 35 |
| /guides/skills/ice-nova-leveling | 374 | 1 | 4 | no | no | no | 35 |
| /guides/skills/ice-spear-build | 389 | 1 | 4 | no | no | no | 35 |
| /guides/skills/ice-spear-leveling | 374 | 1 | 4 | no | no | no | 35 |
| /guides/skills/ice-strike-build | 395 | 1 | 5 | no | no | no | 43 |
| /guides/skills/ice-strike-leveling | 380 | 1 | 5 | no | no | no | 43 |
| /guides/skills/ice-strike-support-gems | 370 | 1 | 5 | no | no | no | 43 |
| /guides/skills/lightning-arrow-build | 395 | 1 | 5 | no | no | no | 43 |
| /guides/skills/lightning-arrow-leveling | 380 | 1 | 5 | no | no | no | 43 |
| /guides/skills/lightning-arrow-support-gems | 370 | 1 | 5 | no | no | no | 43 |
| /guides/skills/meteor-build | 373 | 1 | 4 | no | no | no | 35 |
| /guides/skills/meteor-leveling | 358 | 1 | 4 | no | no | no | 35 |
| /guides/skills/poison-arrow-build | 389 | 1 | 4 | no | no | no | 35 |
| /guides/skills/poison-arrow-leveling | 374 | 1 | 4 | no | no | no | 35 |
| /guides/skills/poisonous-concoction-build | 395 | 1 | 5 | no | no | no | 43 |
| /guides/skills/poisonous-concoction-leveling | 380 | 1 | 5 | no | no | no | 43 |
| /guides/skills/poisonous-concoction-support-gems | 370 | 1 | 5 | no | no | no | 43 |
| /guides/skills/spark-build | 373 | 1 | 4 | no | no | no | 35 |
| /guides/skills/spark-leveling | 358 | 1 | 4 | no | no | no | 35 |
| /guides/skills/tempest-bell-build | 389 | 1 | 4 | no | no | no | 35 |
| /guides/skills/tempest-bell-leveling | 374 | 1 | 4 | no | no | no | 35 |
| /guides/skills/whirlwind-build | 373 | 1 | 4 | no | no | no | 35 |
| /guides/skills/whirlwind-leveling | 358 | 1 | 4 | no | no | no | 35 |

### Highest Quality Guides

| URL | Words | FAQs | Internal Links | Score |
| --- | --- | --- | --- | --- |
| /guides/skills/example-ai-generated-guide | 152 | 2 | 6 | 55 |
| /guides/skills/frostbolt-ai | 930 | 1 | 5 | 53 |
| /guides/skills/ice-spear | 853 | 1 | 8 | 53 |
| /guides/skills/flame-wall | 823 | 1 | 7 | 53 |
| /guides/skills/poison-arrow | 801 | 1 | 5 | 53 |
| /guides/skills/explosive-grenade-build | 395 | 1 | 5 | 43 |
| /guides/skills/flame-wall-build | 395 | 1 | 5 | 43 |
| /guides/skills/ice-strike-build | 395 | 1 | 5 | 43 |
| /guides/skills/lightning-arrow-build | 395 | 1 | 5 | 43 |
| /guides/skills/poisonous-concoction-build | 395 | 1 | 5 | 43 |
| /guides/skills/explosive-grenade-leveling | 380 | 1 | 5 | 43 |
| /guides/skills/flame-wall-leveling | 380 | 1 | 5 | 43 |
| /guides/skills/ice-strike-leveling | 380 | 1 | 5 | 43 |
| /guides/skills/lightning-arrow-leveling | 380 | 1 | 5 | 43 |
| /guides/skills/poisonous-concoction-leveling | 380 | 1 | 5 | 43 |
| /guides/skills/earthshatter-build | 378 | 1 | 5 | 43 |
| /guides/skills/explosive-grenade-support-gems | 370 | 1 | 5 | 43 |
| /guides/skills/flame-wall-support-gems | 370 | 1 | 5 | 43 |
| /guides/skills/ice-strike-support-gems | 370 | 1 | 5 | 43 |
| /guides/skills/lightning-arrow-support-gems | 370 | 1 | 5 | 43 |

### Lowest Quality Guides

| URL | Words | FAQs | Internal Links | Score |
| --- | --- | --- | --- | --- |
| /guides/bosses/trialmaster | 347 | 3 | 5 | 35 |
| /guides/skills/arc-leveling | 358 | 1 | 4 | 35 |
| /guides/skills/fireball-leveling | 358 | 1 | 4 | 35 |
| /guides/skills/frostbolt-leveling | 358 | 1 | 4 | 35 |
| /guides/skills/meteor-leveling | 358 | 1 | 4 | 35 |
| /guides/skills/spark-leveling | 358 | 1 | 4 | 35 |
| /guides/skills/whirlwind-leveling | 358 | 1 | 4 | 35 |
| /guides/skills/arc-build | 373 | 1 | 4 | 35 |
| /guides/skills/fireball-build | 373 | 1 | 4 | 35 |
| /guides/skills/frostbolt-build | 373 | 1 | 4 | 35 |
| /guides/skills/meteor-build | 373 | 1 | 4 | 35 |
| /guides/skills/spark-build | 373 | 1 | 4 | 35 |
| /guides/skills/whirlwind-build | 373 | 1 | 4 | 35 |
| /guides/skills/ball-lightning-leveling | 374 | 1 | 4 | 35 |
| /guides/skills/chain-lightning-leveling | 374 | 1 | 4 | 35 |
| /guides/skills/ember-fusillade-leveling | 374 | 1 | 4 | 35 |
| /guides/skills/freezing-shards-leveling | 374 | 1 | 4 | 35 |
| /guides/skills/ice-nova-leveling | 374 | 1 | 4 | 35 |
| /guides/skills/ice-spear-leveling | 374 | 1 | 4 | 35 |
| /guides/skills/poison-arrow-leveling | 374 | 1 | 4 | 35 |

## Programmatic Content Audit

- Total programmatic pages: **46**
- Average word count: **376.3**
- Average FAQ count: **1**
- Average internal links: **4.4**

### Programmatic Pages Most Likely to Be Considered Low Quality

| URL | Words | FAQs | Internal Links | Signals | Score |
| --- | --- | --- | --- | --- | --- |
| /guides/skills/arc-leveling | 358 | 1 | 4 | none | 35 |
| /guides/skills/fireball-leveling | 358 | 1 | 4 | none | 35 |
| /guides/skills/frostbolt-leveling | 358 | 1 | 4 | none | 35 |
| /guides/skills/meteor-leveling | 358 | 1 | 4 | none | 35 |
| /guides/skills/spark-leveling | 358 | 1 | 4 | none | 35 |
| /guides/skills/whirlwind-leveling | 358 | 1 | 4 | none | 35 |
| /guides/skills/arc-build | 373 | 1 | 4 | none | 35 |
| /guides/skills/fireball-build | 373 | 1 | 4 | none | 35 |
| /guides/skills/frostbolt-build | 373 | 1 | 4 | none | 35 |
| /guides/skills/meteor-build | 373 | 1 | 4 | none | 35 |
| /guides/skills/spark-build | 373 | 1 | 4 | none | 35 |
| /guides/skills/whirlwind-build | 373 | 1 | 4 | none | 35 |
| /guides/skills/ball-lightning-leveling | 374 | 1 | 4 | none | 35 |
| /guides/skills/chain-lightning-leveling | 374 | 1 | 4 | none | 35 |
| /guides/skills/ember-fusillade-leveling | 374 | 1 | 4 | none | 35 |
| /guides/skills/freezing-shards-leveling | 374 | 1 | 4 | none | 35 |
| /guides/skills/ice-nova-leveling | 374 | 1 | 4 | none | 35 |
| /guides/skills/ice-spear-leveling | 374 | 1 | 4 | none | 35 |
| /guides/skills/poison-arrow-leveling | 374 | 1 | 4 | none | 35 |
| /guides/skills/tempest-bell-leveling | 374 | 1 | 4 | none | 35 |

## Indexability Risk Scoring

Scoring starts at 100 and subtracts risk for thin word count, low FAQ count, fewer than 3 or 5 internal links, missing update date, AI/verification/outdated signals, and programmatic-template source. Schema presence adds a small positive adjustment.

### Top 20 Highest-Quality Pages

| URL | Type | Words | FAQs | Internal Links | Score |
| --- | --- | --- | --- | --- | --- |
| /guides/skills/example-ai-generated-guide | markdown-guide | 152 | 2 | 6 | 55 |
| /guides/skills/frostbolt-ai | markdown-guide | 930 | 1 | 5 | 53 |
| /guides/skills/ice-spear | markdown-guide | 853 | 1 | 8 | 53 |
| /guides/skills/flame-wall | markdown-guide | 823 | 1 | 7 | 53 |
| /guides/skills/poison-arrow | markdown-guide | 801 | 1 | 5 | 53 |
| /builds/infernal-witch | build | 347 | 3 | 6 | 47 |
| /builds/frost-monk | build | 337 | 3 | 6 | 47 |
| /skills/lightning-arrow | skill | 323 | 3 | 6 | 47 |
| /skills/poisonous-concoction | skill | 321 | 3 | 6 | 47 |
| /skills/flame-wall | skill | 311 | 3 | 6 | 47 |
| /skills/earthshatter | skill | 299 | 3 | 6 | 47 |
| /guides/skills/explosive-grenade-build | programmatic | 395 | 1 | 5 | 43 |
| /guides/skills/flame-wall-build | programmatic | 395 | 1 | 5 | 43 |
| /guides/skills/ice-strike-build | programmatic | 395 | 1 | 5 | 43 |
| /guides/skills/lightning-arrow-build | programmatic | 395 | 1 | 5 | 43 |
| /guides/skills/poisonous-concoction-build | programmatic | 395 | 1 | 5 | 43 |
| /guides/skills/explosive-grenade-leveling | programmatic | 380 | 1 | 5 | 43 |
| /guides/skills/flame-wall-leveling | programmatic | 380 | 1 | 5 | 43 |
| /guides/skills/ice-strike-leveling | programmatic | 380 | 1 | 5 | 43 |
| /guides/skills/lightning-arrow-leveling | programmatic | 380 | 1 | 5 | 43 |

### Top 20 Lowest-Quality Pages

| URL | Type | Words | FAQs | Internal Links | Signals | Score |
| --- | --- | --- | --- | --- | --- | --- |
| /skills/fireball | skill | 248 | 3 | 0 | AI-assisted, Early Access | 29 |
| /skills/chain-lightning | skill | 262 | 3 | 0 | AI-assisted, Early Access | 29 |
| /skills/frostbolt | skill | 267 | 3 | 0 | AI-assisted, Early Access | 29 |
| /skills/spark | skill | 267 | 3 | 0 | AI-assisted, Early Access | 29 |
| /skills/arc | skill | 275 | 3 | 0 | AI-assisted, Early Access | 29 |
| /skills/meteor | skill | 275 | 3 | 0 | AI-assisted, Early Access | 29 |
| /skills/ice-spear | skill | 280 | 3 | 0 | AI-assisted, Early Access | 29 |
| /skills/poison-arrow | skill | 280 | 3 | 0 | AI-assisted, Early Access | 29 |
| /skills/freezing-shards | skill | 282 | 3 | 0 | AI-assisted, Early Access | 29 |
| /skills/ice-nova | skill | 288 | 3 | 0 | AI-assisted, Early Access | 29 |
| /skills/ball-lightning | skill | 291 | 3 | 0 | AI-assisted, Early Access | 29 |
| /skills/ember-fusillade | skill | 303 | 3 | 2 | AI-assisted, Early Access | 29 |
| /skills/tempest-bell | skill | 304 | 3 | 2 | AI-assisted, Early Access | 29 |
| /guides/bosses/trialmaster | markdown-guide | 347 | 3 | 5 | AI-assisted, AI-generated, Verification Notes, Content Notes, Must be verified, Early Access | 35 |
| /guides/skills/arc-leveling | programmatic | 358 | 1 | 4 | none | 35 |
| /guides/skills/fireball-leveling | programmatic | 358 | 1 | 4 | none | 35 |
| /guides/skills/frostbolt-leveling | programmatic | 358 | 1 | 4 | none | 35 |
| /guides/skills/meteor-leveling | programmatic | 358 | 1 | 4 | none | 35 |
| /guides/skills/spark-leveling | programmatic | 358 | 1 | 4 | none | 35 |
| /guides/skills/whirlwind-leveling | programmatic | 358 | 1 | 4 | none | 35 |

## Audit Caveats

- Word counts are computed from source text and rendered data fields, not from a browser DOM crawl.
- Internal link counts include Markdown links, frontmatter related arrays, suggested related guide paths, and TS related arrays that render as related sections.
- The report intentionally does not edit public content, routes, URLs, or source data.
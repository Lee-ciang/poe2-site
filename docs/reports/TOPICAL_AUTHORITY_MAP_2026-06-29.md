# POE2 Forge Topical Authority Map

- Generated: 2026-06-29 21:03:06 +03:00 (Asia/Beirut)
- Repository: `D:\poe2-site`
- Scope: public boss, build, skill, editorial guide, and programmatic guide detail pages
- Unique public content pages analyzed: **101**
- Generated static pages expected: **121**
- Primary source clusters: **5**
- Thematic subclusters: **9**
- Total cluster views in this report: **14**

## Executive Summary

POE2 Forge has enough page inventory. Its authority is concentrated in 15 upgraded pages: 14 editorial skill guides and the typed `/skills/lightning-arrow` page. The remaining content graph is much thinner. The editorial Guide cluster averages 959 words, 4.5 FAQs, and 13.3 internal links, while every other primary cluster averages fewer than 400 words.

The **Guide cluster** is the strongest primary cluster. The **Skill cluster** is the weakest by composite quality because 19 of 20 pages are under 800 words and 19 have fewer than five outgoing content links. This weakness should not trigger blanket skill-page expansion: many thin `/skills/{slug}` pages overlap with already-upgraded `/guides/skills/{slug}` authority pages, creating potential intent duplication.

The best next move is a **Boss Authority Sprint** that upgrades the six existing `/bosses/{slug}` pages. The boss route family is compact, every page is thin, and `/bosses/executioner` is already one of the two URLs known to Google. No new public pages should be created until the existing boss, build, and programmatic inventory demonstrates stronger indexing.

## Methodology

Primary clusters are mutually exclusive and total 101 unique URLs:

- Boss cluster: `src/data/bosses.ts`
- Build cluster: `src/data/builds.ts`
- Skill cluster: `src/data/skills.ts`
- Guide cluster: `src/content/guides/{bosses,builds,skills}`
- Programmatic skill cluster: `content/programmatic/skills`

Thematic clusters overlap intentionally. A page may appear in Lightning, Leveling, and Build Intent, for example.

Word count uses rendered content fields or Markdown body text and excludes frontmatter and internal/admin notes. FAQ count uses the FAQ items rendered by the route. Internal-link count uses unique, valid, visible links to another audited content URL from related arrays, inline Markdown links, legacy related-guide paths, and generated guide recommendations.

Strongest and weakest pages use a relative content-readiness score weighted 60% depth, 20% FAQ coverage, and 20% internal-link coverage. This is an audit prioritization score, not a prediction of Google rankings.

Inbound orphan analysis counts links from other audited content pages. Archive/listing pages are excluded so they do not hide weak content-to-content relationships.

### Counting Caveat

`src/data/skills.ts` contains duplicate source entries for `/skills/flame-wall` and `/skills/earthshatter`. They resolve to two existing URLs, so the audit deduplicates by public route. The raw source contains 22 skill records, but the site has 20 unique typed skill URLs. No source data was modified.

## Cluster Table

| Cluster | Kind | Pages | Avg. Words | Avg. FAQs | Avg. Links | Under 800 | Under 5 Links | Avg. Readiness |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| Boss cluster | Primary | 6 | 202.2 | 3.0 | 4.0 | 6 | 6 | 30.1 |
| Build cluster | Primary | 6 | 261.5 | 3.0 | 3.3 | 6 | 6 | 31.4 |
| Skill cluster | Primary | 20 | 248.0 | 3.2 | 1.7 | 19 | 19 | 26.7 |
| Guide cluster | Primary | 23 | 959.3 | 4.5 | 13.3 | 8 | 0 | 79.0 |
| Programmatic skill cluster | Primary | 46 | 372.9 | 1.0 | 3.1 | 46 | 46 | 29.7 |
| Lightning | Thematic | 25 | 551.8 | 2.7 | 6.2 | 19 | 17 | 46.3 |
| Cold | Thematic | 26 | 495.0 | 2.5 | 5.3 | 21 | 19 | 41.7 |
| Fire | Thematic | 22 | 439.6 | 2.4 | 4.7 | 19 | 19 | 38.2 |
| Poison/Chaos | Thematic | 11 | 385.9 | 2.5 | 4.1 | 10 | 10 | 35.4 |
| Physical/Melee | Thematic | 25 | 337.5 | 2.2 | 4.2 | 24 | 22 | 33.5 |
| Bossing | Thematic | 8 | 219.6 | 2.9 | 5.0 | 8 | 6 | 32.1 |
| Leveling | Thematic | 20 | 366.9 | 1.0 | 3.1 | 20 | 20 | 29.3 |
| Support Gems | Thematic | 6 | 363.2 | 1.0 | 3.5 | 6 | 6 | 30.2 |
| Build Intent | Thematic | 28 | 342.6 | 1.5 | 3.5 | 28 | 26 | 30.5 |

## Primary Cluster Detail

### Boss Cluster

- Strongest: `/bosses/king-in-the-mists` (215 words, 3 FAQs, 4 links); `/bosses/count-geonor` (205, 3, 4); `/bosses/chimera-abomination` (204, 3, 4)
- Weakest: `/bosses/executioner` (192 words, 3 FAQs, 4 links); `/bosses/fire-warden` (197, 3, 4); `/bosses/endgame-titan` (200, 3, 4)
- Under 800 words: `/bosses/executioner`, `/bosses/fire-warden`, `/bosses/endgame-titan`, `/bosses/chimera-abomination`, `/bosses/count-geonor`, `/bosses/king-in-the-mists`
- Under 5 links: all six boss pages, each with four links
- Assessment: uniformly thin, but compact enough to repair in one sprint. This is the highest-ROI cluster because one weak page, `/bosses/executioner`, already has demonstrated indexability.

### Build Cluster

- Strongest: `/builds/infernal-witch` (264 words, 3 FAQs, 4 links); `/builds/frost-monk` (251, 3, 4); `/builds/lightning-ranger` (273, 3, 3)
- Weakest: `/builds/earthshatter-warrior` (252 words, 3 FAQs, 3 links); `/builds/grenade-mercenary` (260, 3, 3); `/builds/poison-assassin` (269, 3, 3)
- Under 800 words: all six build pages
- Under 5 links: all six build pages
- Assessment: high search and decision intent, but every page is shallow. `/builds/lightning-ranger` and `/builds/frost-monk` also overlap with editorial guide URLs, so intent ownership must be clarified before both versions are expanded.

### Skill Cluster

- Strongest: `/skills/lightning-arrow` (1,102 words, 6 FAQs, 11 links); `/skills/poisonous-concoction` (230, 3, 3); `/skills/ice-strike` (216, 3, 3)
- Weakest: `/skills/fireball` (176 words, 3 FAQs, 0 links); `/skills/chain-lightning` (186, 3, 0); `/skills/spark` (192, 3, 0)
- Under 800 words: every typed skill page except `/skills/lightning-arrow`
- Under 5 links: `/skills/arc`, `/skills/ball-lightning`, `/skills/chain-lightning`, `/skills/fireball`, `/skills/freezing-shards`, `/skills/frostbolt`, `/skills/ice-nova`, `/skills/ice-spear`, `/skills/meteor`, `/skills/poison-arrow`, `/skills/spark`, `/skills/ember-fusillade`, `/skills/tempest-bell`, `/skills/earthshatter`, `/skills/explosive-grenade`, `/skills/flame-wall`, `/skills/ice-strike`, `/skills/poisonous-concoction`, `/skills/whirlwind`
- Assessment: weakest primary cluster by readiness score. Do not bulk-expand it yet because many routes compete with stronger `/guides/skills/{slug}` pages for nearly identical intent.

### Guide Cluster

- Strongest: `/guides/skills/ball-lightning` (1,562 words, 6 FAQs, 17 links); `/guides/skills/ice-spear` (1,502, 7, 17); `/guides/skills/flame-wall` (1,306, 7, 17)
- Weakest: `/guides/builds/frost-monk` (169 words, 2 FAQs, 5 links); `/guides/skills/example-ai-generated-guide` (142, 2, 7); `/guides/bosses/count-geonor` (207, 2, 11)
- Under 800 words: `/guides/skills/example-ai-generated-guide`, `/guides/builds/frost-monk`, `/guides/bosses/count-geonor`, `/guides/builds/lightning-ranger`, `/guides/bosses/trialmaster`, `/guides/skills/lightning-arrow-ai`, `/guides/skills/cold-snap-ai`, `/guides/skills/earthshatter`
- Under 5 links: none
- Assessment: strongest cluster by a wide margin. Fourteen editorial skill guides meet pillar depth, FAQ, and link thresholds. The remaining thin editorial pages create a sharp quality split inside the same route family.

### Programmatic Skill Cluster

- Strongest: `/guides/skills/flame-wall-build` (391 words, 1 FAQ, 4 links); `/guides/skills/lightning-arrow-build` (391, 1, 4); `/guides/skills/flame-wall-leveling` (376, 1, 4)
- Weakest: `/guides/skills/tempest-bell-leveling` (371 words, 1 FAQ, 2 links); `/guides/skills/ember-fusillade-leveling` (371, 1, 2); `/guides/skills/tempest-bell-build` (386, 1, 2)
- Under 800 words: all 46 programmatic pages
- Under 5 links: all 46 programmatic pages
- Pages: `arc-build`, `arc-leveling`, `ball-lightning-build`, `ball-lightning-leveling`, `chain-lightning-build`, `chain-lightning-leveling`, `earthshatter-build`, `earthshatter-leveling`, `earthshatter-support-gems`, `ember-fusillade-build`, `ember-fusillade-leveling`, `explosive-grenade-build`, `explosive-grenade-leveling`, `explosive-grenade-support-gems`, `fireball-build`, `fireball-leveling`, `flame-wall-build`, `flame-wall-leveling`, `flame-wall-support-gems`, `freezing-shards-build`, `freezing-shards-leveling`, `frostbolt-build`, `frostbolt-leveling`, `ice-nova-build`, `ice-nova-leveling`, `ice-spear-build`, `ice-spear-leveling`, `ice-strike-build`, `ice-strike-leveling`, `ice-strike-support-gems`, `lightning-arrow-build`, `lightning-arrow-leveling`, `lightning-arrow-support-gems`, `meteor-build`, `meteor-leveling`, `poison-arrow-build`, `poison-arrow-leveling`, `poisonous-concoction-build`, `poisonous-concoction-leveling`, `poisonous-concoction-support-gems`, `spark-build`, `spark-leveling`, `tempest-bell-build`, `tempest-bell-leveling`, `whirlwind-build`, `whirlwind-leveling`
- Assessment: largest and most uniform low-depth footprint. It should be contained and selectively repaired, not expanded.

## Thematic Cluster Detail

### Lightning

- Strongest: `/guides/skills/ball-lightning`, `/guides/skills/spark`, `/guides/skills/lightning-arrow`
- Weakest: `/skills/chain-lightning`, `/skills/spark`, `/skills/arc`
- Under 800 words (19): `/skills/chain-lightning`, `/skills/spark`, `/bosses/endgame-titan`, `/skills/arc`, `/skills/ball-lightning`, `/guides/builds/lightning-ranger`, `/builds/lightning-ranger`, `/guides/skills/arc-leveling`, `/guides/skills/spark-leveling`, `/guides/skills/lightning-arrow-support-gems`, `/guides/skills/arc-build`, `/guides/skills/spark-build`, `/guides/skills/ball-lightning-leveling`, `/guides/skills/chain-lightning-leveling`, `/guides/skills/lightning-arrow-leveling`, `/guides/skills/ball-lightning-build`, `/guides/skills/chain-lightning-build`, `/guides/skills/lightning-arrow-build`, `/guides/skills/lightning-arrow-ai`
- Under 5 links (17): `/skills/arc`, `/skills/ball-lightning`, `/skills/chain-lightning`, `/skills/spark`, `/builds/lightning-ranger`, the Arc/Ball Lightning/Chain Lightning/Spark build and leveling pages, `/guides/skills/lightning-arrow-build`, `/guides/skills/lightning-arrow-leveling`, `/guides/skills/lightning-arrow-support-gems`, and `/bosses/endgame-titan`
- Assessment: strongest thematic cluster because it contains several upgraded pillars and the strongest typed skill page. Improve supporting pages only after resolving duplicate skill intent.

### Cold

- Strongest: `/guides/skills/ice-spear`, `/guides/skills/freezing-shards`, `/guides/skills/ice-nova`
- Weakest: `/skills/frostbolt`, `/skills/freezing-shards`, `/skills/ice-spear`
- Under 800 words (21): `/guides/builds/frost-monk`; typed Frostbolt, Freezing Shards, Ice Spear, Ice Nova, and Ice Strike pages; `/bosses/count-geonor`; `/bosses/king-in-the-mists`; `/builds/frost-monk`; all related programmatic build, leveling, and support-gem pages; `/guides/skills/cold-snap-ai`
- Under 5 links (19): typed Frostbolt, Freezing Shards, Ice Nova, Ice Spear, and Ice Strike pages; all related programmatic pages; `/bosses/count-geonor`; `/bosses/king-in-the-mists`; `/builds/frost-monk`
- Assessment: strong pillars but weak support. Do not add cold URLs; reinforce existing build and boss connections later.

### Fire

- Strongest: `/guides/skills/flame-wall`, `/guides/skills/fireball`, `/guides/skills/meteor`
- Weakest: `/skills/fireball`, `/skills/meteor`, `/skills/ember-fusillade`
- Under 800 words (19): typed Fireball, Meteor, Flame Wall, Explosive Grenade, and Ember Fusillade pages; `/bosses/fire-warden`; `/builds/infernal-witch`; all related programmatic build, leveling, and support-gem pages
- Under 5 links (19): the same thin typed and programmatic support set, plus `/bosses/fire-warden` and `/builds/infernal-witch`
- Assessment: three strong pillars provide a useful foundation. Expand authority through existing boss and build pages, not new fire guides.

### Poison/Chaos

- Strongest: `/guides/skills/poison-arrow`, `/builds/poison-assassin`, `/bosses/king-in-the-mists`
- Weakest: `/skills/poison-arrow`, `/skills/poisonous-concoction`, `/guides/skills/poisonous-concoction-support-gems`
- Under 800 words (10): `/skills/poison-arrow`, `/skills/poisonous-concoction`, `/bosses/chimera-abomination`, `/bosses/king-in-the-mists`, `/builds/poison-assassin`, and all five Poison Arrow/Poisonous Concoction programmatic pages
- Under 5 links (10): the same 10 pages
- Assessment: one pillar supports a small, shallow cluster. Improve `/builds/poison-assassin` and linked bosses before considering expansion.

### Physical/Melee

- Strongest: `/guides/skills/whirlwind`, `/guides/skills/earthshatter`, `/builds/frost-monk`
- Weakest: `/skills/tempest-bell`, `/guides/skills/tempest-bell-leveling`, `/skills/earthshatter`
- Under 800 words: 24 of 25 pages; only `/guides/skills/whirlwind` clears 800 words
- Under 5 links: 22 of 25 pages
- Thin set includes all six typed boss pages, `/builds/frost-monk`, `/builds/earthshatter-warrior`, typed Earthshatter/Whirlwind/Ice Strike/Tempest Bell pages, `/guides/builds/frost-monk`, `/guides/skills/earthshatter`, and associated programmatic pages
- Assessment: broad but diffuse. It will benefit indirectly from boss and build upgrades; it should not receive new pages yet.

### Bossing

- Strongest: `/guides/bosses/trialmaster` (337 words, 3 FAQs, 5 links); `/guides/bosses/count-geonor` (207, 2, 11); `/bosses/king-in-the-mists` (215, 3, 4)
- Weakest: `/bosses/executioner`, `/bosses/fire-warden`, `/bosses/endgame-titan`
- Under 800 words: all eight pages
- Under 5 links: all six `/bosses/{slug}` pages
- Assessment: thinnest intent cluster and strongest immediate opportunity because Google has already indexed one boss route.

### Leveling

- Strongest: `/guides/skills/flame-wall-leveling`, `/guides/skills/lightning-arrow-leveling`, `/guides/skills/earthshatter-leveling`
- Weakest: `/guides/skills/tempest-bell-leveling`, `/guides/skills/ember-fusillade-leveling`, `/guides/skills/whirlwind-leveling`
- Under 800 words: all 20 pages
- Under 5 links: all 20 pages
- Assessment: overrepresented relative to depth. Do not create additional leveling pages until this set has differentiated, evidence-backed value.

### Support Gems

- Strongest: `/guides/skills/flame-wall-support-gems`, `/guides/skills/lightning-arrow-support-gems`, `/guides/skills/earthshatter-support-gems`
- Weakest: `/guides/skills/poisonous-concoction-support-gems`, `/guides/skills/ice-strike-support-gems`, `/guides/skills/explosive-grenade-support-gems`
- Under 800 words: all six pages
- Under 5 links: all six pages
- Assessment: too small and thin to expand. Upgrade only where a corresponding pillar proves demand.

### Build Intent

- Strongest: `/guides/builds/lightning-ranger`, `/builds/infernal-witch`, `/guides/skills/flame-wall-build`
- Weakest: `/guides/builds/frost-monk`, `/guides/skills/tempest-bell-build`, `/guides/skills/ember-fusillade-build`
- Under 800 words: all 28 pages
- Under 5 links: 26 of 28 pages
- Assessment: high commercial and decision intent but poor content readiness. Existing typed build pages are better upgrade candidates than additional programmatic build pages.

## Strongest And Weakest Clusters

### Strongest Primary Cluster: Guide Cluster

The Guide cluster leads on every maturity signal: 959 average words, 4.5 FAQs, 13.3 links, and no pages below five links. Fourteen pages achieve the full audit readiness score. This strength is concentrated in the upgraded skill guides rather than evenly distributed across boss, build, and skill guide types.

### Strongest Thematic Cluster: Lightning

Lightning has the highest thematic readiness score (46.3), highest average depth (551.8), and highest average linking (6.2). It contains multiple mature pillars plus `/skills/lightning-arrow`, the only typed skill authority page. Its next challenge is intent overlap and weak supporting pages, not missing URLs.

### Weakest Primary Cluster: Skill Cluster

The Skill cluster has the lowest readiness score (26.7), the lowest average link count (1.7), and 19 pages under both key thresholds. The low score is not a recommendation to expand every typed skill page. Fourteen same-topic editorial guide URLs are already stronger and may compete for the same query intent.

### Weakest Operational Footprint: Programmatic Skill Cluster

The programmatic cluster has 46 pages, all below 800 words and all below five links. Its scale makes it the largest trust risk even though its average readiness score is slightly above the typed Skill cluster. Broad expansion would worsen the site's quality ratio.

## Orphan Analysis

- Strict content-to-content orphans: **0**
- Near-orphans with exactly one inbound content link: **28**
- All 28 near-orphans are programmatic build or leveling pages.

Near-orphans:

- Arc: `/guides/skills/arc-build`, `/guides/skills/arc-leveling`
- Ball Lightning: `/guides/skills/ball-lightning-build`, `/guides/skills/ball-lightning-leveling`
- Chain Lightning: `/guides/skills/chain-lightning-build`, `/guides/skills/chain-lightning-leveling`
- Ember Fusillade: `/guides/skills/ember-fusillade-build`, `/guides/skills/ember-fusillade-leveling`
- Fireball: `/guides/skills/fireball-build`, `/guides/skills/fireball-leveling`
- Freezing Shards: `/guides/skills/freezing-shards-build`, `/guides/skills/freezing-shards-leveling`
- Frostbolt: `/guides/skills/frostbolt-build`, `/guides/skills/frostbolt-leveling`
- Ice Nova: `/guides/skills/ice-nova-build`, `/guides/skills/ice-nova-leveling`
- Ice Spear: `/guides/skills/ice-spear-build`, `/guides/skills/ice-spear-leveling`
- Meteor: `/guides/skills/meteor-build`, `/guides/skills/meteor-leveling`
- Poison Arrow: `/guides/skills/poison-arrow-build`, `/guides/skills/poison-arrow-leveling`
- Spark: `/guides/skills/spark-build`, `/guides/skills/spark-leveling`
- Tempest Bell: `/guides/skills/tempest-bell-build`, `/guides/skills/tempest-bell-leveling`
- Whirlwind: `/guides/skills/whirlwind-build`, `/guides/skills/whirlwind-leveling`

Archive hubs may still link to these pages, but the content graph gives each only one endorsement. That is weak authority circulation.

## Thin Clusters

1. **Bossing:** every page is under 800 words.
2. **Build Intent:** all 28 pages are under 800 words and 26 have fewer than five links.
3. **Programmatic Skill:** all 46 pages are under 800 words and five links.
4. **Leveling:** all 20 pages are under 800 words and five links.
5. **Support Gems:** all six pages are under 800 words and five links.
6. **Physical/Melee:** 24 of 25 pages are under 800 words.

## Clusters That Should Not Be Expanded Yet

### Programmatic Skill, Leveling, And Support Gems

Do not generate more programmatic URLs. The existing 46-page footprint is uniformly thin, and 28 pages are near-orphans. Expansion would increase crawl demand and low-value similarity before current pages earn trust.

### Typed Skill Pages

Do not bulk-upgrade or add more skill URLs until query ownership between `/skills/{slug}` and `/guides/skills/{slug}` is documented. Upgrading both versions to the same intent could create cannibalization rather than authority.

### Build Intent

Do not add new build pages. First improve the six typed builds and decide how `/builds/lightning-ranger` differs from `/guides/builds/lightning-ranger`, and likewise for Frost Monk.

### Cold, Fire, And Lightning

Do not add more top-level skill guides in these themes. They already have strong pillars; the deficit is supporting build, boss, and programmatic quality.

## Highest SEO Upside

1. **Bossing:** compact six-page route family, universally thin, high problem-solving intent, and one already-indexed route.
2. **Builds:** high decision intent and natural linking value to skills and bosses; six pages can materially improve multiple thematic clusters.
3. **Selective programmatic remediation:** existing long-tail intent may be useful, but only after each selected page gains unique depth, stronger FAQs, and multiple contextual links.
4. **Lightning support:** strongest thematic foundation, but gains should come from strengthening linked builds and bosses rather than more lightning pages.

## Recommended SEO Sprints

### Sprint A: Boss Authority Upgrade

- Target cluster: Boss cluster / Bossing
- Target pages: `/bosses/executioner`, `/bosses/count-geonor`, `/bosses/fire-warden`, `/bosses/endgame-titan`, `/bosses/chimera-abomination`, `/bosses/king-in-the-mists`
- Action: upgrade existing pages only
- Reason: all six pages are approximately 192-215 words with three FAQs and four links. `/bosses/executioner` has already demonstrated indexability, making this the clearest route-family signal to reinforce.
- Expected SEO benefit: stronger answer completeness for boss-name queries, improved authority flow to builds and skills, and a higher-quality cluster surrounding an already-indexed page.
- Risk: **Low to medium**. Risk comes from inaccurate encounter details; upgrades should use verified gameplay facts and patch-aware review.
- New pages: **No**

### Sprint B: Build Authority Upgrade

- Target cluster: Build cluster / Build Intent
- First target pages: `/builds/infernal-witch`, `/builds/poison-assassin`, `/builds/earthshatter-warrior`, `/builds/grenade-mercenary`
- Conditional targets: `/builds/lightning-ranger`, `/builds/frost-monk` only after their intent is differentiated from the corresponding `/guides/builds/*` pages
- Action: upgrade existing pages only
- Reason: build queries have strong decision intent, and the six typed pages currently average only 262 words and 3.3 links.
- Expected SEO benefit: stronger build-to-skill-to-boss pathways, improved topical breadth around upgraded skill pillars, and better coverage of high-value build selection queries.
- Risk: **Medium** because two route pairs currently overlap in topic and title intent.
- New pages: **No**

### Sprint C: Programmatic Quality Containment

- Target cluster: Programmatic Skill, Leveling, and Support Gems
- Initial target pages: `/guides/skills/lightning-arrow-support-gems`, `/guides/skills/flame-wall-support-gems`, `/guides/skills/earthshatter-support-gems`, `/guides/skills/poisonous-concoction-support-gems`, plus the build and leveling pages directly supporting the strongest indexed or upgraded pillars
- Action: selectively upgrade existing pages; define distinct query intent and add unique practical value before touching the rest
- Reason: all 46 pages are thin and underlinked, but blanket upgrades would consume effort without proving demand. Support-gem pages have clearer differentiated intent than generic `{skill}-build` pages.
- Expected SEO benefit: improved long-tail usefulness, fewer weak pages adjacent to authority pillars, and stronger contextual linking into core guides.
- Risk: **Medium to high** because templated similarity and intent overlap may remain even after expansion.
- New pages: **No**

## Final Recommendation

**Do next:** upgrade the six existing boss pages as Sprint A, beginning with `/bosses/executioner` and `/bosses/count-geonor`. Use verified encounter mechanics, 6+ useful FAQs, and contextual links to relevant builds, skills, and other bosses. This reinforces the only non-home route known to be indexed while improving a complete, compact cluster.

**Do not do yet:** do not create new public pages, expand the programmatic inventory, or bulk-upgrade duplicate `/skills/{slug}` and `/guides/skills/{slug}` pairs. The current bottleneck is trust and indexing. More URLs would dilute the ratio of mature pages and increase crawl demand before existing clusters prove themselves.

## Verification

Command: `npm run build`

- Build result: **PASS**
- Compilation: **PASS** (`Compiled successfully in 2.4s`)
- TypeScript: **PASS** (`Finished TypeScript in 2.9s`)
- Static generation: **PASS** (`121/121` pages in 3.3s)

- Public content modified: **No**
- Routes modified: **No**
- Slugs modified: **No**
- Sitemap or robots modified: **No**
- Metadata structure modified: **No**
- SEO pipeline or `data/ai-seo` modified: **No**

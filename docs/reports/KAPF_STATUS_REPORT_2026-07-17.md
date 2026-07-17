# POE2 Forge KAPF Status Report

Date: 2026-07-17
Repository: `D:\poe2-site`

## Executive Summary

POE2 Forge is in an early trust-building stage. Google has discovered the sitemap and has started showing the site for brand and `/bosses/executioner`-related queries, but indexing is still narrow: 2 indexed pages, 58 discovered but not indexed, and 62 sitemap-discovered pages after the sitemap was resubmitted on 2026-07-16.

The site should not create more pages right now. The strongest move is to observe the post-sitemap and post-boss-upgrade response, then upgrade the next authority layer only if impressions, discovered URLs, and query breadth show Google is beginning to trust the existing inventory.

Current known GSC status:

| Metric | Current Value |
| --- | ---: |
| Clicks | 10 |
| Impressions | 148 |
| CTR | 6.8% |
| Average position | 8.8 |
| Indexed pages | 2 |
| Discovered, currently not indexed | 58 |
| Sitemap submitted again | 2026-07-16 |
| Sitemap discovered pages | 62 |
| Generated static pages | 121 |

Current project status:

- 15 upgraded skill authority pages
- 6 upgraded boss authority pages
- Broken internal links previously cleaned to 0
- Sitemap and robots stable
- Build passing
- No major technical SEO errors known

## K - Keyword / Knowledge Signal

### What Google Currently Seems To Understand

Google currently appears to understand three things:

1. POE2 Forge is a distinct brand/entity.
2. The homepage is eligible for branded discovery.
3. `/bosses/executioner` is a crawlable, indexable boss guide route with enough clarity to appear in visible query data.

This is a narrow but useful signal. The presence of Executioner-related visibility matters because it shows Google can parse at least one non-home content route and connect it to a game-specific boss intent.

### Visible Query Groups

Current visible query groups are mostly:

- Brand queries: `poe2 forge`, variants of the site name, and navigational discovery terms
- POE2 Forge + topic queries: branded combinations where Google is testing whether the site satisfies a known entity/query pair
- Executioner-related queries: early non-brand topical visibility tied to the boss cluster

### Missing Query Groups

The missing groups are more important than the visible ones:

- Skill intent queries: `poe2 lightning arrow`, `poe2 ice spear`, `poe2 flame wall`, `poe2 spark`, and similar upgraded skill-guide queries
- Boss intent queries beyond Executioner: Count Geonor, Fire Warden, Endgame Titan, Chimera Abomination, King in the Mists
- Build intent queries: Lightning Ranger, Infernal Witch, Poison Assassin, Earthshatter Warrior, Frost Monk, Grenade Mercenary
- Support-gem and leveling long-tail queries
- Generic informational queries that do not include the site brand

### Meaning For The Next Sprint

The next sprint should not start from keyword expansion. The site already has enough generated pages and a meaningful set of upgraded authority pages. The next sprint should be conditional:

- If Google expands impressions into non-brand skill or boss queries, reinforce the cluster that is getting traction.
- If Google keeps visibility limited to brand and Executioner terms, improve authority flow around the homepage and currently indexed routes.
- If discovered-not-indexed remains flat or worsens, stop content expansion and focus only on trust, pruning risk, and internal linking quality.

## A - Authority Page

### Current Authority Layers

The current authority stack is:

1. Homepage
2. Skill authority guides
3. Typed `/skills/lightning-arrow` authority page
4. Boss authority pages
5. Supporting build, skill, and programmatic pages

The mature layer is still concentrated in skill guides. Boss pages have now been upgraded into a second compact authority layer. Build pages remain the next major gap.

### Skill Authority Status

Skill authority is the strongest current content layer:

- 15 upgraded skill authority pages
- Sprint #1 and Sprint #2 pages meet authority targets
- Most upgraded skill guides have 1200+ words, 6+ FAQs, and strong internal links
- The Lightning cluster is the strongest thematic cluster

The main risk is duplicate intent between `/skills/{slug}` and `/guides/skills/{slug}`. The site should not bulk-upgrade typed skill pages until query ownership is clearer.

### Boss Authority Status

Boss authority has moved from weak to materially stronger:

- All 6 existing boss pages were upgraded on 2026-07-16
- Each boss page now has 1000+ words
- Each boss page has 6 FAQs
- Each boss page has 12 internal links
- The cluster now supports `/bosses/executioner`, one of the few known indexed routes

This makes bossing the best near-term test cluster. If Google responds, impressions should begin spreading from Executioner into other boss terms.

### Weak Authority Areas

Weak layers remain:

- Typed build pages: high intent, low depth
- Typed skill pages other than `/skills/lightning-arrow`: shallow and often overlapping with stronger guide URLs
- Programmatic skill pages: broad footprint, low average depth, low FAQ coverage, and weak internal-link support
- Homepage authority hub: likely functional, but not yet a strong topical bridge between upgraded skills, upgraded bosses, and build intent

### Recommended Next Authority Layer

Recommended next authority layer: **Build Authority Sprint**, but only after a short observation window.

Build pages are the next best authority layer because they connect skills, bosses, and player decision intent. However, launching immediately after the sitemap resubmission and boss upgrade may blur cause and effect. Observe for 7-14 days first unless GSC begins showing clear build-query movement earlier.

## P - Proof / Publishing Quality

### Current Trust And Publishing Quality Status

The site has moved past the most obvious low-trust cleanup stage:

- Frontend low-trust signals were previously removed from visible content
- Broken internal links were previously cleaned to 0
- Authority pages now have stronger depth, FAQs, and internal links
- Boss pages now form a complete upgraded cluster
- Build remains passing

The publishing-quality challenge is no longer basic breakage. It is whether Google has enough proof that the site is stable, useful, and worth indexing beyond the homepage and one boss page.

### Sitemap Status

Sitemap status:

- Sitemap and robots are stable
- Sitemap was resubmitted on 2026-07-16
- GSC shows 62 sitemap-discovered pages
- Generated static pages remain 121

Do not change sitemap logic right now. The sitemap was just resubmitted, so changing it again would interrupt a clean observation window.

### Broken Link Status

Broken internal links were previously cleaned from 14 to 0. Current authority upgrades were designed around existing routes and local sources.

Do not run a structural link overhaul unless GSC or a fresh crawl shows new breakage. The current problem is index trust, not link repair.

### Build Status

Build is passing and static generation remains stable at 121 generated pages.

### What Should Not Be Changed Yet

Do not change:

- Routes
- Slugs
- Sitemap generation
- Robots generation
- SEO pipeline scripts
- Metadata structure
- URL architecture
- Programmatic content architecture

Also do not create new pages yet. The current bottleneck is not page count; it is trust, indexing, and proof that the existing authority layers deserve crawl/index expansion.

## F - Feedback Loop

### Metrics To Monitor Over The Next 7 Days

Monitor daily:

- Indexed pages: does the number move above 2?
- Discovered currently not indexed: does it decrease, hold, or increase?
- Sitemap discovered pages: does it remain near 62 or expand?
- Impressions: does the total move beyond brand/Executioner terms?
- Query breadth: count unique visible queries
- Page breadth: count unique pages receiving impressions
- Boss query movement: any impressions for Count Geonor, Fire Warden, Endgame Titan, Chimera Abomination, or King in the Mists
- Skill query movement: any impressions for upgraded skill-guide terms
- Average position: whether the current 8.8 position holds as impressions expand

Seven-day interpretation:

- Good sign: impressions rise and new non-brand queries appear.
- Neutral sign: impressions rise, but mostly from brand and Executioner terms.
- Weak sign: impressions stay flat and discovered-not-indexed remains unchanged.
- Risk sign: indexed pages stay at 2 while discovered-not-indexed increases materially.

### Metrics To Monitor Over The Next 14 Days

Monitor:

- Indexed page count trend
- Pages with impressions
- Non-brand query count
- Boss cluster query spread
- Skill cluster query spread
- CTR stability as impressions grow
- Average position movement
- Any crawl/indexing warnings in GSC

Fourteen-day interpretation:

- Strong outcome: indexed pages increase, non-brand queries appear, and impressions spread into boss or skill clusters.
- Moderate outcome: impressions increase but indexing remains limited.
- Weak outcome: no new query groups and no new indexed pages.
- Negative outcome: discovered-not-indexed expands while impressions remain mostly branded.

## Decision Rules

### Continue Observation

Continue observation if:

- Indexed pages remain at 2, but impressions are rising
- New query groups appear but are still too small to identify a winning cluster
- Sitemap-discovered page count is stable after the 2026-07-16 resubmission
- Average position remains near the current 8.8 while impressions broaden

Recommended observation window: at least 7 days after the sitemap resubmission and boss authority upgrade.

### Start Build Authority Sprint

Start the Build Authority Sprint if any of the following happen:

- Non-brand impressions begin appearing for build, class, or skill-build terms
- Boss pages beyond Executioner start receiving impressions
- Upgraded skill pages receive impressions but need stronger build pathways
- Indexed pages rise above 2 and GSC shows broader content discovery

Recommended target layer:

- `/builds/infernal-witch`
- `/builds/poison-assassin`
- `/builds/earthshatter-warrior`
- `/builds/grenade-mercenary`
- Then clarify and upgrade `/builds/lightning-ranger` and `/builds/frost-monk` only if their intent is differentiated from `/guides/builds/*`.

### Start Homepage Authority Hub Upgrade

Start the Homepage Authority Hub Upgrade if:

- Google continues to index only `/` and `/bosses/executioner`
- Brand impressions rise but topical impressions do not
- GSC shows the homepage as the main discovery point, but authority does not flow into upgraded clusters
- Boss and skill authority upgrades do not create new page-level impressions after 14 days

Homepage hub goals should be:

- Surface upgraded skill authority pages
- Surface upgraded boss authority pages
- Clarify the site's strongest topical clusters
- Improve internal authority flow without changing route structure

### Stop Content Expansion

Stop content expansion if:

- Indexed pages remain at 2 after 14 days
- Discovered currently not indexed increases without new topical impressions
- Query visibility remains almost entirely brand-based
- Programmatic pages begin appearing as discovered but not indexed at a higher rate
- New content would increase the low-quality or duplicate-intent footprint

In that scenario, focus on proof and quality only: homepage authority, internal linking, clearer cluster hierarchy, and manual review of any weak or duplicated content.

## Recommended Next Action

Recommended next action: **observe for 7 days, then decide between Build Authority Sprint and Homepage Authority Hub Upgrade.**

The default next sprint should be the Build Authority Sprint because builds are the next highest-value authority layer and naturally connect skills to bosses. However, if Google remains locked on only the homepage and Executioner after the observation window, upgrade the homepage authority hub first so existing authority pages receive stronger crawl and trust signals.

Do not create new public pages in the next sprint.

## Verification

Required verification command:

```bash
npm run build
```

Result: PASS

Verification output:

```text
Compiled successfully in 2.9s
Finished TypeScript in 3.1s
Generating static pages using 15 workers (121/121) in 3.5s
```

Success criteria:

- Report created: PASS
- Build passes: PASS
- Generated static pages remain `121/121`: PASS

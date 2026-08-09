# POE2 Forge Sitemap Priority Repair

Generation date and time: 2026-08-09 10:20:05 +03:00
Repository: `D:\poe2-site`

## Summary

The sitemap priority repair is complete. The stale `public/sitemap.xml` file was deleted so `/sitemap.xml` is served by the App Router sitemap at `src/app/sitemap.ts`.

The repaired sitemap now outputs a deduplicated core indexable set focused on the homepage, primary hubs, all boss pages, all build pages, the strongest upgraded skill guides, and `/skills/lightning-arrow` as the only typed skill detail page.

No public pages were created or deleted. No routes, slugs, metadata architecture, robots logic, or SEO pipeline scripts were changed.

## Files Modified

- `src/app/sitemap.ts`
- `public/sitemap.xml` deleted
- `docs/reports/SITEMAP_PRIORITY_REPAIR_2026-08-09.md`

## Public Sitemap Conflict

Status: `public/sitemap.xml` was deleted.

Reason: the stale static file was overriding the healthier App Router sitemap route. Before repair, the served `/sitemap.xml` contained 51 URLs dominated by programmatic guide pages and included 5 local 404 URLs.

Final effective sitemap source:

- `src/app/sitemap.ts`

## Final Sitemap URL Count

- Final served sitemap URL count: 32
- Unique sitemap URLs: 32
- Duplicate URLs: 0
- Local 404 URLs: 0

## Final Sitemap URLs

1. `/`
2. `/builds`
3. `/bosses`
4. `/skills`
5. `/guides`
6. `/builds/lightning-ranger`
7. `/builds/infernal-witch`
8. `/builds/poison-assassin`
9. `/builds/earthshatter-warrior`
10. `/builds/frost-monk`
11. `/builds/grenade-mercenary`
12. `/bosses/count-geonor`
13. `/bosses/executioner`
14. `/bosses/fire-warden`
15. `/bosses/endgame-titan`
16. `/bosses/chimera-abomination`
17. `/bosses/king-in-the-mists`
18. `/skills/lightning-arrow`
19. `/guides/skills/ice-spear`
20. `/guides/skills/ball-lightning`
21. `/guides/skills/flame-wall`
22. `/guides/skills/ice-nova`
23. `/guides/skills/frostbolt`
24. `/guides/skills/lightning-arrow`
25. `/guides/skills/spark`
26. `/guides/skills/arc`
27. `/guides/skills/freezing-shards`
28. `/guides/skills/fireball`
29. `/guides/skills/chain-lightning`
30. `/guides/skills/whirlwind`
31. `/guides/skills/poison-arrow`
32. `/guides/skills/meteor`

## URLs Removed From Sitemap

### Known Dead URLs

Removed because they returned local 404 in the crawl-priority audit:

- `/guides/skills/cobra-lash`
- `/guides/skills/earthquake`
- `/guides/skills/tectonic-slam`
- `/guides/skills/toxic-rain`
- `/guides/skills/venom-gyre`

### Programmatic Guide URLs

Removed from the effective sitemap because they are low-priority, draft-like, thin, and not part of the current core indexable set:

- `/guides/skills/*-build`
- `/guides/skills/*-leveling`
- `/guides/skills/*-support-gems`

### Draft / AI Variant / Low-Trust Guide URLs

Removed from sitemap priority because they are not core indexable authority pages:

- `/guides/skills/example-ai-generated-guide`
- `/guides/skills/lightning-arrow-ai`
- `/guides/skills/frostbolt-ai`
- `/guides/skills/cold-snap-ai`

### Thin Markdown Build And Boss Guides

Removed from sitemap priority because they are thin compared with current upgraded authority pages:

- `/guides/builds/frost-monk`
- `/guides/builds/lightning-ranger`
- `/guides/bosses/count-geonor`
- `/guides/bosses/trialmaster`

### Typed Skill Pages Except Lightning Arrow

Removed from sitemap priority because most typed skill pages are thin and can duplicate intent with stronger `/guides/skills/*` authority pages. `/skills/lightning-arrow` remains included because it is materially stronger than other typed skill pages.

## Duplicate URL Check Result

Result: PASS

The repaired sitemap has 32 URLs and 32 unique URLs. Duplicate source entries for `/skills/flame-wall` and `/skills/earthshatter` can no longer create duplicate sitemap output because typed skill pages are not bulk-mapped into the sitemap and sitemap entries are deduplicated before return.

## Local HTTP Status Check Result

Result: PASS

Validation command started the production build locally and fetched `/sitemap.xml` over HTTP.

Results:

- Served `/sitemap.xml` URL count: 32
- Unique URLs: 32
- Duplicate URLs: 0
- URLs returning non-200 locally: 0
- All sitemap URLs returned HTTP 200 locally.

## Robots.txt Check Result

Result: PASS

Served robots.txt still references:

```text
Sitemap: https://poe2-site-roan.vercel.app/sitemap.xml
```

Important routes remain crawlable because robots allows `/`.

## Build Result

Command: `npm run build`

Result: PASS

Build output:

```text
Compiled successfully
Finished TypeScript
Generating static pages using 15 workers (121/121)
```

## Remaining Risks

- Google Search Console still needs to reread the repaired sitemap after deployment.
- The project still has generated public routes outside the sitemap, including programmatic guide pages. They are intentionally not being prioritized for indexing yet.
- Thin typed skill pages and low-priority guide variants still exist as public routes, but they are no longer pushed through the sitemap.
- Build pages are included in the core sitemap because they are important crawl bridges, but they remain a likely future authority-upgrade target.

## Next GSC Action

After deploying this repair:

1. Open Google Search Console.
2. Go to Sitemaps.
3. Resubmit `https://poe2-site-roan.vercel.app/sitemap.xml`.
4. Use URL Inspection on `https://poe2-site-roan.vercel.app/sitemap.xml` to request a live fetch if available.
5. Monitor for 7-14 days:
   - Sitemap last read date updates after 2026-08-09.
   - Discovered currently not indexed begins decreasing.
   - Indexed pages move above 2.
   - Non-brand queries begin appearing for upgraded skill or boss pages.

# POE2 Forge Core Index Expansion Audit

Generated: 2026-09-26 17:23:38 +03:00 (Asia/Beirut), completed against the revised full brief  
Repository: `D:\poe2-site`  
Production: https://poe2-site-roan.vercel.app  
Scope: audit/report only. No public content, routes, slugs, metadata, sitemap, robots, or pipeline changes.

## Executive Decision

Keep the repaired 32-URL sitemap stable. The next sprint should be **publishing-quality repair followed by a three-page index expansion test**, not another bulk word-count upgrade or homepage link expansion.

The strongest next test candidates are:

1. `/skills/lightning-arrow`: verify actual skill/support behavior and add a useful, evidenced example; distinguish its purpose from overlapping guide URLs.
2. `/bosses/count-geonor`: replace generic shared boss advice with an encounter-specific walkthrough and evidence.
3. `/builds/lightning-ranger`: turn the 314-word outline into a reproducible build with compatible skills/supports, progression choices and a defensive plan.

All three already receive body links from all three apparently indexed pages. Their selection reflects useful connections and achievable improvements, not measured keyword volume or a promised indexing probability. Do not submit them as improved until those improvements are real and live.

The most urgent prerequisite is the `/guides` publishing surface. It still exposes raw trust-risk labels and links visitors to unfinished, indexable pages. Removing labels alone would not resolve the unfinished advice. Also make a narrow `/skills` hub correction: its current groups omit Lightning Arrow, the sole skill reference in the core sitemap. These two hub fixes precede the three detail-page tests; no broad hub expansion is justified.

## GSC Baseline and Limits

| Metric | September 26 baseline |
| --- | ---: |
| Clicks | 8 |
| Impressions | 289 |
| CTR | 2.8% |
| Average position | 9.6 |
| Indexed | 3 |
| Not indexed | 29 |
| Sitemap discovered URLs | 32 |
| Sitemap submitted | 2026-08-30 |
| Sitemap last read | 2026-09-25 |
| Sitemap status | Success |

These are user-supplied GSC figures, not an authenticated export. The three apparently indexed routes are `/`, `/bosses/executioner`, and `/builds/poison-assassin`. Their status needs URL Inspection confirmation. Impressions or a successful live fetch do not independently establish current indexing.

The revised complete brief explicitly states that all 29 are **Discovered - currently not indexed**. This supersedes the earlier tentative answer of multiple reasons or not yet checked and is the user-reported baseline used here. It was not independently verified in authenticated GSC. Discovery does not establish that Google fetched and rejected the page. URL Inspection and crawl history are still needed to distinguish lack of crawling from a post-crawl content decision; the audit must not present the latter as proven.

Compared with the September 13 supplied snapshot, impressions are 55 higher, clicks remain 8, and position is 9.6 versus 10.3. Reporting windows were not supplied, so these are snapshot differences, not a controlled growth comparison. The CTR drop alone does not demonstrate a penalty or worsening content quality. Only eight days have passed since the September 18 reinforcement, and the latest sitemap read was yesterday; neither proves that Google recrawled the updated target pages.

## Evidence and Method

- Built the current clean working tree using `npm run build`.
- Inspected all **111 public HTML pages** in the local production output, excluding admin and framework error pages, for content and body-link relationships.
- Audited all **32 sitemap URLs** on production with direct HTTP GETs and parsed server HTML. Also checked five public non-sitemap detail pages, robots.txt, sitemap.xml, the advertised search endpoint and the shared Open Graph image: **41 distinct production URLs** checked, excluding repeat requests.
- Started the freshly built local production server on loopback port 3026 and checked all **32 core URLs locally with redirects disabled**. All returned 200. All 29 supplied excluded paths and all three comparison paths are present in both sitemaps, with no unexpected paths. The temporary server was stopped after verification.
- Production main text matched the freshly built local main text on **32/32** core pages. The September 18 Poison Assassin reinforcement is deployed.
- Word counts include text in the main element, headings, FAQs and related-card labels. They exclude scripts, schema payloads, global header/footer, and metadata. Hyphenated words count as one. These are descriptive measurements, not Google quality thresholds.
- FAQ counts count rendered question headings in the FAQ section. Link counts distinguish occurrences from unique destination paths.
- Incoming counts count distinct source pages linking from main content, excluding self-links. Depth is shortest main-content link path from `/`; global navigation would only make discovery easier.
- The full local graph has **1,011 link occurrences**, or **712 distinct source/destination pairs**, and **0 unresolved internal destination routes**. This is a static route-existence check, not an HTTP crawl of every destination.
- Production core HTTP checks are not Googlebot log analysis, Search Console URL Inspection, a backlink audit, or a gameplay test. Their success does not rule out intermittent server issues or Googlebot-specific treatment.

Build reports **121/121 generation units**. That is not a count of 121 editorial pages or 121 submitted URLs. The 111 public HTML pages include 101 content detail pages, five skill-category pages, the homepage and four hubs. Of these, 79 are outside the sitemap; absence from the sitemap does not make them unindexable.

## Technical Findings

| Check | Result |
| --- | --- |
| Production core responses | 32/32 HTTP 200; 0 redirects; 0 404/500 responses |
| Local core responses | 32/32 HTTP 200; 0 redirects; exact match to the 29 + 3 supplied paths |
| Canonicals | 32/32 absolute, same production host, self-referencing after URL normalization |
| Homepage slash | Canonical omits the final slash; URL normalization resolves it to `/`. Not an error. |
| Indexing directives | No `noindex`/`none` or blocking X-Robots-Tag observed on any core response |
| Robots | HTTP 200, wildcard Allow `/`, correct absolute sitemap reference |
| Sitemap | HTTP 200, 32 unique URLs; production set and order match local generation |
| Main content | Present in server HTML, not dependent on client-side rendering for the audit text |
| H1 | Exactly one on each core page |
| JSON-LD | No parse errors in the core responses; schema presence is not an indexing guarantee |
| Core titles | No exact duplicate title strings among the 32 |
| Core descriptions | 14 skill guides share one identical description |
| Advertised search URL | `/search?q=lightning-arrow` returns 404; referenced by WebSite SearchAction |
| Open Graph | All 32 have title, description, absolute URL, type and image metadata; the shared `/og-image.png` returns 404 locally and in production |
| FAQs and Markdown | No empty FAQ sections or raw bold/link/table/fence Markdown markers detected in the 32 core pages; hubs/home do not claim to have FAQ sections |

The duplicate description is: `Read this POE2 skill guide for practical strategy, strengths, weaknesses, FAQs, related guides.` It describes a template, not the individual answer. All 14 `/guides/skills/*` sitemap entries use it. Unique descriptions would improve presentation and differentiation, but their duplication is not proof that Google refused indexing for that reason.

`src/lib/seo.ts:104` advertises a search route that does not exist. This is a secondary structured-data accuracy issue, not a broken sitemap URL and not an observed indexing block. The missing OG image is likewise a sharing-preview defect rather than an established indexing barrier. Both are recorded for a separate, scoped repair; neither was changed.

`src/app/sitemap.ts:7` uses `new Date()` for every entry. Production currently gives all 32 URLs the identical timestamp `2026-09-18T09:06:04.252Z`, including guides whose displayed update dates remain in May. This reflects the build rather than individual content changes. Record it as a later freshness-accuracy repair, not a reason to redo the core sitemap now. Google documents that meaningful `lastmod` values should reflect real changes and that it ignores `priority` and `changefreq`. [Google sitemap guidance](https://developers.google.com/search/blog/2023/06/sitemaps-lastmod-ping)

## Template Comparison

All page families inherit `metadataBase`, the site title suffix, default index/follow directives and WebSite JSON-LD from `src/app/layout.tsx`. `src/lib/seo.ts` builds the shared metadata. Relative canonical paths in source become absolute in rendered HTML. None of the observed template families has a core-only noindex or client-only main-content problem.

| Family / renderer | Title and description | OG / JSON-LD | H1 / H2 / FAQ | Links and uniqueness |
| --- | --- | --- | --- | --- |
| Homepage: `src/app/page.tsx`, `src/app/layout.tsx` | Layout defaults; brand and site categories | website OG; WebSite | One H1, seven H2, no FAQ | 18 destinations; distinct site purpose, repeated destination cards |
| Boss: `src/app/bosses/[slug]/page.tsx`, `src/data/bosses.ts` | Name-based title and summary-based description | article OG; WebSite, BreadcrumbList, Article | One H1, 15 H2, six FAQ questions each | 13-14 destinations; most prose supplied by shared mapper |
| Build: `src/app/builds/[slug]/page.tsx`, `src/data/builds.ts` | Build/class title and summary-based description | article OG; WebSite, BreadcrumbList, Article | One H1; 10 H2 for Poison Assassin, 11 for others; six versus three FAQs | Poison has eight destinations; others four/five; repeated Related Skills/Related Skill Guides destinations on ordinary builds |
| Skill reference: `src/app/skills/[slug]/page.tsx`, `src/data/skills.ts` | Skill-specific title and summary-based description | article OG; WebSite, BreadcrumbList, Article | Lightning Arrow: one H1, 15 H2, six FAQs | 12 destinations; separate reference purpose needs sharper distinction from Markdown guide |
| Skill guide: `src/app/guides/[type]/[slug]/page.tsx`, Markdown files | Cleaned frontmatter title/description; same generic description on all 14 | article OG; WebSite and FAQPage; no Article/BreadcrumbList on this template | One H1, 11 H2 each, six/seven FAQs | 13-17 destinations and 24-41 link occurrences; editorial filler and overlapping intent persist |
| `/bosses` hub | Fixed descriptive title and database description | website OG; WebSite | One H1, zero H2; card titles are H3; no FAQ | Six named boss cards, but each actual anchor says View Guide |
| `/builds` hub | Fixed descriptive title and comparison description | website OG; WebSite | One H1, zero H2; card titles are H3; no FAQ | Six build cards; actual anchors say Read Build |
| `/guides` hub | SEO/Markdown-oriented fixed metadata | website OG; WebSite | One H1, 23 H2 card titles; no FAQ | 23 guide cards; anchors say Read Guide; exposes raw metadata and unfinished entries |
| `/skills` hub | Fixed skill-database title and description | website OG; WebSite | One H1, five category H2, card titles H3; no FAQ | 16 links to 14 skill destinations; actual anchors say View Skill; core Lightning Arrow is missing |

Typed-detail FAQs are visible text but do not emit FAQPage schema; Markdown-guide FAQs do. This schema difference does not explain indexing by itself, and adding FAQPage everywhere is not the recommended experiment. Body link density is particularly high in Markdown guides: multiple occurrences often lead to the same destination, so more links would not necessarily improve navigation.

The renderer supports headings, simple lists and inline links, not a full Markdown grammar. The core scan found no raw syntax defects; several non-core AI-suffixed guides still need manual formatting/content review. All 14 core guides display an internal `SEO Score 100/100` hero badge, two to five `SEO N` recommendation badges, and a date-driven `Needs update` badge. These were missed by the narrow legacy trust-word regex. Keep internal diagnostics internal, but do not falsify freshness by removing a warning or advancing dates without real editorial review.

## Main Quality Findings

### 1. The Public Guide Hub Still Promotes Unfinished Content

Confirmed in both local and production HTML:

- `/guides` is titled `Path of Exile 2 SEO Guides` and describes scalable SEO workflows to players.
- Its cards expose `Early Access`, content verification wording, and an `Example AI Generated Guide` title.
- It links to all 23 Markdown guides without using their publication readiness to limit the listing. See `src/app/guides/page.tsx:21` and the card fields below it.
- The existing detail-page cleanup is not applied consistently to the listing. Internal draft metadata itself is not evidence of a penalty; unfinished public advice is the substantive issue.

Additional production checks:

| Outside-sitemap page | HTTP / directive | Evidence |
| --- | --- | --- |
| `/guides/builds/frost-monk` | 200 / index, follow | Visible instructions such as `Add one specific strength with a player-facing reason.`; 158 local main words |
| `/guides/bosses/trialmaster` | 200 / index, follow | Visible `Add one mechanic with dodge advice.` and other authoring instructions; 426 words |
| `/guides/skills/lightning-arrow-ai` | 200 / index, follow | Repeated `Needs verification` in skill classification, damage, weapon and support sections; 708 words |
| `/guides/skills/example-ai-generated-guide` | 200 / index, follow | Public example page; its hub card explicitly identifies it as an example |
| `/skills/poisonous-concoction` | 200 / index, follow | Still recommends a poison-stacking skill under the old name |

These pages are not in the user's 29-URL list, but remain part of the accessible publication. Four of the five are directly promoted by `/guides`. Thus sitemap reduction alone did not isolate the core content from unfinished material. Recommended future action: editorial review of these specific pages and the listing; make an explicit publication decision while preserving internal metadata. No removal, noindex, redirect or content change was made by this audit.

### 2. Boss Length Substantially Overstates Encounter-Specific Depth

The shared mapper in `src/data/bosses.ts:291` appends advice and FAQ answers to every boss. It substitutes names, damage types and build names into the same paragraphs. It contributes four additional phase paragraphs, six mechanics paragraphs, eight tips, an extended summary and six templated FAQs.

| Boss | Original prose words | Final prose words | Words added by shared mapper | Share from mapper |
| --- | ---: | ---: | ---: | ---: |
| Count Geonor | 92 | 1,118 | 1,026 | 92% |
| Executioner | 147 | 1,173 | 1,026 | 87% |
| Fire Warden | 85 | 1,111 | 1,026 | 92% |
| Endgame Titan | 91 | 1,117 | 1,026 | 92% |
| Chimera Abomination | 93 | 1,128 | 1,035 | 92% |
| King in the Mists | 93 | 1,159 | 1,066 | 92% |

Method for this table: compare the exported boss data with its pre-mapper entries, counting summary, phases, mechanics, tips and FAQ text. It excludes UI labels, related links and other fields, so totals differ from rendered-page word counts. The percentage measures template provenance, not a Google's duplicate-content score or exact literal overlap.

The previous boss sprint met mechanical length/FAQ/link targets, but those targets did not establish six independently researched encounter guides. Count Geonor is an especially useful next test: its discovery paths are already strong, so an encounter-specific rewrite can address a real quality gap. Treat boss identities, locations, phase claims and support advice as requiring evidence; this audit does not certify every existing game claim.

### 3. Five Build Pages Are Still Outlines

Earthshatter Warrior, Frost Monk, Grenade Mercenary, Infernal Witch and Lightning Ranger contain 292-314 main words, three generic FAQs, and only four or five unique destinations. They have broad advice but lack a reproducible progression and equipment/support plan. Poison Assassin is much more detailed at 1,599 words, but still lacks a gameplay-tested build export or documented performance demonstration; its apparent indexing should not be treated as proof of optimal quality.

Lightning Ranger is the best build expansion candidate because it joins the existing poison/ranged signal to the Lightning Arrow skill and Count Geonor/Executioner boss paths. Expand it through actual build decisions and evidence, not a minimum-word padding exercise.

### 4. Long Skill Guides Still Contain Editorial and Accuracy Risks

Eight core guides contain site-strategy language about authority, internal-link value or cluster depth: Arc, Ball Lightning, Chain Lightning, Fireball, Freezing Shards, Lightning Arrow, Spark and Whirlwind. For example, `src/content/guides/skills/lightning-arrow.md:21` explains why the page is an authority candidate instead of teaching a gameplay decision.

The poison cluster also has inconsistent guidance. The September 18 Poison Assassin page correctly distinguishes Acidic Concoction from a poison applicator, while its linked Poison Arrow guide and the old skill reference still discuss Poisonous Concoction as a poison option. Official GGG notes document the rename and state that Acidic Concoction consumes poison and cannot apply it. This is a specific dated contradiction, not an assumption that every old skill name is invalid. [GGG 0.3.0 patch notes](https://www.pathofexile.com/forum/view-thread/3826682)

For Ice Spear, Meteor, Whirlwind, Chain Lightning and the generic-sounding boss routes, hold promotion until the exact POE2 entity, skill source, acquisition and mechanics are demonstrated. Failure to find an authoritative match during a limited search is not proof that an entity does not exist; avoid renaming/deleting on that basis. Several support names and damage descriptions also need a POE2-specific compatibility check rather than relying on familiar POE1 terminology.

All 27 core detail pages have no `img`/`video` elements in their main content and no external source links there. This does not establish that media or citations are mandatory for indexing, or measure CSS imagery. It does mean the pages currently provide little directly inspectable support for game-mechanics claims. An accurate annotated capture, practical test, or source citation can be more valuable than additional generic prose.

Google says it does not have a preferred word count and recommends evaluating originality, first-hand usefulness and reliable sourcing. Those are better editorial acceptance tests than the former word/FAQ/link quotas. [People-first content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)

### 5. Overlapping Intent and Internal Quality Scores Need Care

`/skills/lightning-arrow`, `/guides/skills/lightning-arrow`, and `/guides/skills/lightning-arrow-ai` each target substantially overlapping skill-guide intent and have separate self-canonicals. The latter two share the same rendered title. The first two claim reference-versus-guide separation, but both cover supports, leveling, bossing and FAQs. This is an intent-differentiation risk; Google-selected canonicals are unknown, so do not call it confirmed cannibalization or automatically change canonicals.

`src/lib/markdown.ts:193` and `:197` award quality points based on character length, not word count. The score also rewards metadata fields and FAQ count without checking game accuracy or originality. `CURRENT_PATCH_VERSION` remains `0.2.0`. These internal heuristics do not measure Google's view or verify current mechanics. They are diagnostic limitations, not public indexing directives; no score or pipeline was changed.

## Hub Audit

All four hubs are technically eligible for indexing and receive homepage links. A short navigational hub can be useful without a long essay or FAQ quota. None of these measurements proves that a hub passes a specific amount of ranking authority; they establish crawlable connections and user-facing usefulness.

| Hub | Explanation and selection value | Children / anchors | Incoming comparison-page links | Recommendation |
| --- | --- | --- | --- | --- |
| `/bosses` | Short cluster introduction; most of its 643 words are reused boss-card summaries, not a progression comparison | All six boss detail routes; repeated View Guide anchors beside named titles | Home 2, Executioner 1 | Keep navigation role; later add verified encounter grouping or concise preparation distinctions, not repeated boss prose |
| `/builds` | 263 words mostly in six summaries and labels; lacks a substantive reason to choose one build over another | All six builds; repeated Read Build anchors; unsupported tier labels remain on some entries | Home 3, Poison Assassin 2 | Later improve practical comparisons once the underlying builds are credible |
| `/guides` | 618 words mostly descriptions/cards; introduction discusses authoring/SEO machinery rather than player goals | 23 guides, of which 14 are core; unfinished Frost Monk is the first card | Home 4, Poison Assassin 1 | First-priority editorial presentation/selection repair; keep CMS data intact and address actual unfinished text |
| `/skills` | Five elemental/playstyle groups with short introductions; some comparative value, but curated selection is incomplete | 16 links to 14 non-core skill references; no link to `/skills/lightning-arrow` | Home 2, Poison Assassin 1 | First-priority narrow membership correction; add the missing relevant core skill and clarify existing groups |

The three dropdown sets on `/bosses`, `/builds` and `/skills` are inert. Source inspection shows no filtering state/handlers; browser tests selected the first non-default choice and the displayed card lists did not change on all three pages. This weakens the promised comparison workflow, but is not a crawl blocker. Recommend a later small functional repair or an honest simplified presentation, not a hub redesign in this audit.

Card names provide nearby context, but the actual link labels are generic. A future low-cost improvement can make the linked name or accessible name describe the destination. This is a usability/navigation improvement; no deterministic SEO gain is claimed.

## Indexed vs Not-Indexed Interpretation

The three comparison pages average about 1,279 main words. This does not establish a threshold: many excluded guides exceed the 950-word homepage, and Count Geonor and Executioner share essentially the same rendering and expansion template. Longer text and more FAQs did not yield universal indexing.

| Specific comparison | Observed difference | What the evidence supports / does not support |
| --- | --- | --- |
| Poison Assassin versus the other five builds | 1,599 words and six tailored FAQs versus 292-314 words and three generic FAQs; its opening explains a coherent ranged-poison plan | Better task completion is a plausible advantage. We do not know when each page was crawled or whether the September 18 revision caused its indexed status |
| Executioner versus other bosses | Revised search-intent opening and observed query history; same 15-H2 template and six-question structure; all are heavily mapper-expanded | No differential canonical/rendering blocker found. Existing query demand/history may matter, but the audit cannot prove the selection cause |
| Executioner versus `/bosses` | One concrete fight intent versus an encounter directory largely repeating summaries | Different intents warrant different quality tests. Hub non-indexing does not mean it cannot help discovery or must exceed the detail page's length |
| `/skills/lightning-arrow` versus the comparison set | Good static eligibility, 18 incoming sources and links from all three comparison pages; missing from its natural `/skills` hub, support advice still broad | Hub omission is actionable, but not enough to explain non-indexing alone; distinguish its reference answer from guide variants and inspect crawl history |
| `/guides/skills/lightning-arrow` versus home/Poison Assassin | Generic hero description, internal SEO/staleness badges, overlapping skill-guide purpose and paragraphs about site authority | Concrete editorial problems exist. They do not prove a post-crawl rejection while the supplied reason is Discovered - currently not indexed |

### Above-the-Fold Review

Inspected 11 representative routes at desktop 1440 x 900 and mobile 390 x 844: home, both comparison details, Count Geonor, Lightning Ranger, both core Lightning Arrow pages, and all four hubs. There was no horizontal overflow or JavaScript page error. Inspected screenshots of the two key hubs and the Lightning Arrow Markdown guide. Body text uses normal 14-18px sizes; no large-body-text parsing failure was found.

- Homepage: clear brand/category intent and navigation, but still promises future DPS calculators. That is an existing promise to review, not a reason to build another feature in this audit.
- Poison Assassin: a concrete application/movement routine and Ranger clarification are visible early. Desktop also exposes contextual comparison links; mobile requires scrolling for most details.
- Executioner/Count Geonor: the introductory fight promise is present, but lengthy shared advice consumes much of the mobile first screen. The distinguishing encounter mechanics arrive later.
- Lightning Ranger: the opening identifies a lightning bow style, but gives little concrete build choice before overview badges.
- Lightning Arrow reference: the initial benefit is clear, followed by category/damage/weapon fields. A concise mechanics/support decision example would add more value than repeating those labels.
- Lightning Arrow Markdown guide: the hero repeats the same generic description as 13 peers and visibly displays SEO Score and Needs update. Its skill-specific overview begins lower down; overlapping intent is not resolved by a different directory name.
- Hubs: on mobile, the three filter-driven hubs primarily show titles, introductions and dropdowns before useful cards. The guides hub immediately leads into an unfinished guide card. Their main weakness is selection/task usefulness, not merely short word count.

## Internal Discovery and Cluster Measurements

| Core group | Pages | Average main words | Average FAQs | Average unique outgoing destinations |
| --- | ---: | ---: | ---: | ---: |
| Homepage | 1 | 950 | 0.0 | 18.0 |
| Hubs | 4 | 510 | 0.0 | 12.3 |
| Bosses | 6 | 1,252 | 6.0 | 13.2 |
| Builds | 6 | 519 | 3.5 | 5.0 |
| Skill reference | 1 | 1,162 | 6.0 | 12.0 |
| Skill guides | 14 | 1,375 | 6.3 | 15.9 |

Across all 32: average 1,063 words, 4.72 FAQs and 22.09 link occurrences. Higher link counts reflect repetition; they are not evidence of stronger authority.

- Eighteen core pages are one body-link click from home, thirteen are two clicks, and home is depth zero.
- Every non-home core page has at least five distinct incoming body-link sources. None is an orphan or near-orphan under a zero/one incoming-source definition.
- The homepage has 36 root-relative link occurrences but only 18 unique destinations. Adding another large section would mostly repeat destinations already present.
- All three proposed candidates receive direct links from home, Executioner and Poison Assassin. Keep those contextual connections; do not add links just to increase a numeric count.
- Outside the core set, 51 public pages are unreachable from home in this main-content graph: 46 programmatic pages and five skill-category pages. Some form mutually linked pairs. Their out-of-sitemap status and isolation are not a reason to reconnect/promote unfinished content now. External links and global-navigation reachability were not used to declare absolute web-wide orphans.

The site has substantial publication-quality debt outside the core sitemap. It is not possible to prove from this audit that Google treats that debt as a sitewide quality problem, but it is directly observable and worth correcting.

## All 32 URL Index-State Table

State **I*** means apparently indexed according to the supplied baseline; **D*** means user-reported Discovered - currently not indexed. Neither was independently verified through authenticated GSC inspection. All paths below use the production origin and returned HTTP 200 both locally and in production.

Priority **A** = next three detail-page tests after prerequisites; **H** = hub/support repair; **B** = later existing-page improvement; **C** = promotion hold for accuracy/entity/intent review. These are editorial priorities, not indexing probabilities. Links are **unique destinations / total occurrences** in main content. H2 includes navigation/related section headings, so it is not a depth score.

| URL | State | Cluster | Template | Words | H2 | FAQs | Links U/T | Priority | Main issue / next decision |
| --- | --- | --- | --- | ---: | ---: | ---: | --- | --- | --- |
| `/` | I* | Homepage | Home | 950 | 7 | 0 | 18/36 | Observe | retain focused paths; promotion alone is not evidence of page quality |
| `/builds` | D* | builds | Hub | 263 | 0 | 0 | 6/6 | H | improve comparisons and readiness labels only when supported |
| `/bosses` | D* | bosses | Hub | 643 | 0 | 0 | 6/6 | H | useful encounter navigation; evaluate listed boss identities rather than add filler |
| `/skills` | D* | skills | Hub | 516 | 5 | 0 | 14/16 | H | retain useful navigation; verify entries and duplicated destinations |
| `/guides` | D* | guides | Hub | 618 | 23 | 0 | 23/23 | H, urgent | fix public authoring instructions/labels and editorial selection |
| `/builds/lightning-ranger` | D* | Build | Build detail | 314 | 11 | 3 | 4/5 | A | reproducible bow build; upgrade before requesting indexing |
| `/builds/infernal-witch` | D* | Build | Build detail | 308 | 11 | 3 | 5/7 | B | coherent skill combination, support choices and defensive plan |
| `/builds/poison-assassin` | I* | Build | Build detail | 1,599 | 10 | 6 | 8/9 | Observe | deployed revision is stronger, but lacks documented build testing |
| `/builds/earthshatter-warrior` | D* | Build | Build detail | 292 | 11 | 3 | 4/5 | B | skill/support compatibility and a usable progression plan |
| `/builds/frost-monk` | D* | Build | Build detail | 298 | 11 | 3 | 5/7 | B | real gear/skill choices; distinguish unfinished guide counterpart |
| `/builds/grenade-mercenary` | D* | Build | Build detail | 303 | 11 | 3 | 4/5 | B | documented rotation, resources and recovery windows |
| `/bosses/count-geonor` | D* | Boss | Boss detail | 1,236 | 15 | 6 | 13/13 | A | named encounter walkthrough, phase cues, mistakes and evidence |
| `/bosses/executioner` | I* | Boss | Boss detail | 1,289 | 15 | 6 | 14/14 | Observe | 87% of measured prose comes from shared mapper; retain contextual gateways |
| `/bosses/fire-warden` | D* | Boss | Boss detail | 1,230 | 15 | 6 | 13/13 | C | establish exact entity and location with evidence |
| `/bosses/endgame-titan` | D* | Boss | Boss detail | 1,229 | 15 | 6 | 13/13 | C | establish exact boss identity and encounter; no generic authority push |
| `/bosses/chimera-abomination` | D* | Boss | Boss detail | 1,249 | 15 | 6 | 13/13 | C | verify entity/location and replace shared advice before promotion |
| `/bosses/king-in-the-mists` | D* | Boss | Boss detail | 1,277 | 15 | 6 | 13/13 | B | identify encounter variant, route and distinct mechanics |
| `/skills/lightning-arrow` | D* | Skill | Skill detail | 1,162 | 15 | 6 | 12/12 | A | factual support matrix, acquisition/mechanics example, distinct reference purpose |
| `/guides/skills/ice-spear` | D* | Guide | Markdown | 1,592 | 11 | 7 | 17/31 | C | establish exact POE2 skill availability/source before promotion |
| `/guides/skills/ball-lightning` | D* | Guide | Markdown | 1,675 | 11 | 6 | 17/38 | B | verify overlap/timing claims and demonstrate positioning |
| `/guides/skills/flame-wall` | D* | Guide | Markdown | 1,403 | 11 | 7 | 15/29 | B | verify projectile/wall interaction and separate utility from damage claims |
| `/guides/skills/ice-nova` | D* | Guide | Markdown | 1,341 | 11 | 7 | 16/27 | B | test range/interaction advice and provide practical examples |
| `/guides/skills/frostbolt` | D* | Guide | Markdown | 1,325 | 11 | 6 | 17/40 | B | interaction examples; review overlap with frostbolt-ai |
| `/guides/skills/lightning-arrow` | D* | Guide | Markdown | 1,323 | 11 | 6 | 17/41 | C | distinguish intent from main skill reference; remove authority/cluster prose |
| `/guides/skills/spark` | D* | Guide | Markdown | 1,395 | 11 | 6 | 16/36 | B | remove editorial filler; demonstrate actual coverage/scaling |
| `/guides/skills/arc` | D* | Guide | Markdown | 1,317 | 11 | 6 | 17/40 | B | remove site-strategy prose; verify targeting and support decisions |
| `/guides/skills/freezing-shards` | D* | Guide | Markdown | 1,355 | 11 | 6 | 16/39 | B | explain skill source, acquisition and actual scaling |
| `/guides/skills/fireball` | D* | Guide | Markdown | 1,322 | 11 | 6 | 16/33 | B | concrete interactions and compatible support comparison |
| `/guides/skills/chain-lightning` | D* | Guide | Markdown | 1,311 | 11 | 6 | 16/40 | C | verify exact skill/source and differentiation from Arc |
| `/guides/skills/whirlwind` | D* | Guide | Markdown | 1,309 | 11 | 6 | 14/38 | C | verify exact POE2 entity rather than assume a familiar spin-attack model |
| `/guides/skills/poison-arrow` | D* | Guide | Markdown | 1,287 | 11 | 7 | 13/24 | B, urgent accuracy | resolve poison identity/support claims and concoction contradiction |
| `/guides/skills/meteor` | D* | Guide | Markdown | 1,294 | 11 | 6 | 15/35 | C | establish exact skill/source and supported mechanics |

Excluded-page dispositions: **A 3, H 4, B 14, C 8 = 29**. The other three rows are the comparison set. Category C does not authorize deletion, canonical changes, sitemap removal or noindex. The ranked eight-page shortlist below adds implementation order to these groups.

## Per-URL Internal Graph

Counts below are link occurrences from **Home**, **Executioner (E)** and **Poison Assassin (P)**; home is itself one of the indexed comparison pages, so do not count its links twice when summing indexed sources. **Core out** counts distinct outgoing destinations in the 32-URL set, excluding self-links. **All in** counts distinct incoming source pages across all 111 public main-content regions. Zero in these columns does not establish that Google cannot find a page. Header/footer links are excluded; this is a discovery graph, not a PageRank calculation.

| URL | Cluster | Home | E | P | Core out | All in | Home depth | Connection assessment |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| `/` | Homepage | 0 | 0 | 0 | 18 | 0 | 0 | Root; global home links excluded |
| `/builds` | builds | 3 | 0 | 2 | 6 | 7 | 1 | Connected; not isolated |
| `/bosses` | bosses | 2 | 1 | 0 | 6 | 7 | 1 | Connected; not isolated |
| `/skills` | skills | 2 | 0 | 1 | 0 | 22 | 1 | Hub omits core skill |
| `/guides` | guides | 4 | 0 | 1 | 14 | 71 | 1 | Connected; not isolated |
| `/builds/lightning-ranger` | Build | 2 | 1 | 1 | 4 | 17 | 1 | Connected; not isolated |
| `/builds/infernal-witch` | Build | 2 | 0 | 0 | 3 | 18 | 1 | Connected; not isolated |
| `/builds/poison-assassin` | Build | 2 | 1 | 0 | 8 | 8 | 1 | Connected; not isolated |
| `/builds/earthshatter-warrior` | Build | 1 | 1 | 0 | 3 | 8 | 1 | Connected; not isolated |
| `/builds/frost-monk` | Build | 0 | 0 | 0 | 3 | 11 | 2 | No direct comparison-page link; reachable in 2 clicks |
| `/builds/grenade-mercenary` | Build | 0 | 1 | 0 | 3 | 7 | 2 | Connected; not isolated |
| `/bosses/count-geonor` | Boss | 2 | 1 | 1 | 10 | 21 | 1 | Connected; not isolated |
| `/bosses/executioner` | Boss | 3 | 0 | 1 | 10 | 16 | 1 | Connected; not isolated |
| `/bosses/fire-warden` | Boss | 2 | 0 | 0 | 9 | 18 | 1 | Connected; not isolated |
| `/bosses/endgame-titan` | Boss | 1 | 1 | 0 | 9 | 18 | 1 | Connected; not isolated |
| `/bosses/chimera-abomination` | Boss | 0 | 1 | 0 | 10 | 13 | 2 | Connected; not isolated |
| `/bosses/king-in-the-mists` | Boss | 0 | 0 | 0 | 9 | 14 | 2 | No direct comparison-page link; reachable in 2 clicks |
| `/skills/lightning-arrow` | Skill | 1 | 1 | 1 | 7 | 18 | 1 | Connected; not isolated |
| `/guides/skills/ice-spear` | Guide | 2 | 0 | 0 | 12 | 19 | 1 | Connected; not isolated |
| `/guides/skills/ball-lightning` | Guide | 0 | 0 | 0 | 13 | 10 | 2 | No direct comparison-page link; reachable in 2 clicks |
| `/guides/skills/flame-wall` | Guide | 2 | 0 | 0 | 10 | 14 | 1 | Connected; not isolated |
| `/guides/skills/ice-nova` | Guide | 2 | 0 | 0 | 11 | 13 | 1 | Connected; not isolated |
| `/guides/skills/frostbolt` | Guide | 0 | 0 | 0 | 11 | 7 | 2 | No direct comparison-page link; reachable in 2 clicks |
| `/guides/skills/lightning-arrow` | Guide | 1 | 1 | 0 | 12 | 15 | 1 | Connected; not isolated |
| `/guides/skills/spark` | Guide | 0 | 0 | 0 | 12 | 18 | 2 | No direct comparison-page link; reachable in 2 clicks |
| `/guides/skills/arc` | Guide | 0 | 0 | 0 | 12 | 7 | 2 | No direct comparison-page link; reachable in 2 clicks |
| `/guides/skills/freezing-shards` | Guide | 0 | 0 | 0 | 11 | 8 | 2 | No direct comparison-page link; reachable in 2 clicks |
| `/guides/skills/fireball` | Guide | 0 | 0 | 0 | 10 | 6 | 2 | No direct comparison-page link; reachable in 2 clicks |
| `/guides/skills/chain-lightning` | Guide | 0 | 0 | 0 | 12 | 8 | 2 | No direct comparison-page link; reachable in 2 clicks |
| `/guides/skills/whirlwind` | Guide | 0 | 0 | 0 | 10 | 5 | 2 | Relatively weakest core inflow; not orphan |
| `/guides/skills/poison-arrow` | Guide | 2 | 0 | 1 | 9 | 11 | 1 | Connected; not isolated |
| `/guides/skills/meteor` | Guide | 0 | 0 | 0 | 10 | 5 | 2 | Relatively weakest core inflow; not orphan |

Weakest core inflow: Meteor and Whirlwind have five incoming source pages each. The weakest hub-to-core relationship is `/skills`: zero main-content links to the other 31 sitemap URLs because Lightning Arrow is absent from its curated groups. This does **not** make Lightning Arrow isolated: it has 18 incoming sources and links from all three comparison pages. The weakest content cluster is the five unexpanded builds; the boss cluster's principal weakness is shared prose, not lack of links.

## Indexed Comparison Set

| Apparently indexed route | Main words | FAQs | Unique outgoing destinations | Interpretation |
| --- | ---: | ---: | ---: | --- |
| `/` | 950 | 0 | 18 | Already introduces the main clusters; no broad redesign justified |
| `/bosses/executioner` | 1,289 | 6 | 14 | Useful observed boss signal, but still heavily templated; indexing is not a quality certificate |
| `/builds/poison-assassin` | 1,599 | 6 | 8 | September 18 revision is live; further proof and linked-content accuracy still matter |

Its 1,599-word count versus the previous report's 1,600 reflects HTML entity/token handling in the measurement method, not a missing content section.

## Recommended Next Sprint

### Ranked Eight-Page Shortlist

This shortlist answers the requested 5-8 URL prioritization. It does not authorize rewriting eight pages at once. The first five form the next sprint: two narrow hub corrections, followed by three substantive detail-page tests. The final three are a queued accuracy/intent/comparison pass.

| Rank | Excluded URL | Expected practical benefit | Cost / risk | Next-sprint status |
| --- | --- | --- | --- | --- |
| 1 | `/guides` | Stop the main editorial directory presenting authoring machinery and promoting unfinished entries as finished advice | Low presentation cost; editorial decisions need care | Immediate prerequisite |
| 2 | `/skills` | Restore the natural hub path to core Lightning Arrow; improve a directly observable selection gap | Low; no URL change needed | Immediate prerequisite |
| 3 | `/skills/lightning-arrow` | Deliver a distinct, accurate reference answer already connected to all three comparison pages | Medium; verify support/skill claims | First detail test |
| 4 | `/bosses/count-geonor` | Replace common boss advice with an identifiable encounter plan | Medium; gameplay evidence required | Second detail test |
| 5 | `/builds/lightning-ranger` | Complete the natural ranged-build extension from Poison Assassin and Lightning Arrow | Higher; actual build choices required | Third detail test |
| 6 | `/guides/skills/poison-arrow` | Resolve contradictory poison/concoction guidance linked from an apparently indexed build | Medium; exact skill/support review needed | Accuracy follow-up; move earlier if review establishes harmful instructions |
| 7 | `/guides/skills/lightning-arrow` | Differentiate guide intent, remove site-strategy filler, and replace generic description with a truthful specific summary | Medium; avoid unsupported canonical/route consolidation | Follow-up after reference-purpose decision |
| 8 | `/builds` | Make build selection useful after the featured build details are credible; address inert filtering | Low to medium; small frontend behavior change | Later hub improvement |

The expected SEO benefit is better eligible, useful content and clearer task relationships, not a quantified increase in rankings or guaranteed crawl volume. **Strengthen one connected ranged skill/build plus campaign-boss cluster first.** Strengthen only the two hubs with demonstrated problems now; do not expand all four hubs to an arbitrary length.

Keep Executioner and Poison Assassin as gateways through their existing links. Their link coverage is already strong. No additional homepage section or batch of repeated gateway links is needed. Review gateway wording only where it misrepresents an improved destination; do not turn the observed signal pages into link directories.

### Likely Files in a Future Sprint

These are recommendations only; none was edited in this audit.

| File | Possible scoped work |
| --- | --- |
| `src/app/guides/page.tsx` | Reader-facing introduction, card metadata presentation, deliberate editorial selection and descriptive links |
| `src/app/skills/page.tsx` | Correct curated group membership to include Lightning Arrow; inspect duplicate entries |
| `src/data/skills.ts` | Evidence-based Lightning Arrow mechanics/support reference content only |
| `src/data/bosses.ts` | Count Geonor-specific prose, overriding generic expansion for that entry without rewriting every boss |
| `src/data/builds.ts` | Lightning Ranger-specific skills, supports, progression, defenses and FAQs |
| `src/app/guides/[type]/[slug]/page.tsx` | Optional small shared presentation cleanup of internal SEO scores; preserve metadata and truthful freshness handling |
| `src/content/guides/skills/poison-arrow.md` | Queued factual correction of skill identity, poison scaling/support claims and linked concoction assumptions |
| `src/content/guides/skills/lightning-arrow.md` | Queued intent differentiation and removal of site-strategy prose |
| `src/app/builds/page.tsx`, `src/components/home/{BuildCard,BossCard,SkillCard}.tsx` | Later real comparison behavior or destination-specific anchor labels; shared cards also affect home and require a regression check |

Low-cost changes are specific hub membership, accurate labels/anchors and internal-score presentation. High-effort changes are gameplay research and a reproducible build. Do not silently expand the sprint into all-page rewrites. Missing OG media and the unsupported SearchAction can be addressed in a separately reviewed technical cleanup; neither requires new public content routes.

### Prerequisite: Establish Reasons and Publication Readiness

Retain the supplied Discovered - currently not indexed baseline and capture the GSC export/inspection evidence for the 29 URLs. For the three proposed candidates and the three comparison URLs, record inspection date, exact reason, last crawl, fetch result, crawl allowed, indexing allowed, declared canonical and Google-selected canonical. Check manual actions/security issues and Crawl Stats for host failures rather than assume they are clear. Review verified Googlebot requests in hosting logs when available.

Repair the `/guides` public listing and make explicit editorial decisions on its unfinished destinations. Preserve CMS metadata. Correct poison guidance contradictions at the linked destination before using that cluster as proof of expertise. This is the highest-priority quality work, although it does not guarantee an indexing change.

### Test: Three Existing Pages, One Small Cohort

| Order | Target | Acceptance evidence | Effort / uncertainty |
| --- | --- | --- | --- |
| 1 | `/skills/lightning-arrow` | Verify weapon/skill behavior, name compatible supports with tradeoffs, show one tested clear-versus-boss example, clarify reference purpose | Medium / mechanics and duplicate-intent review needed |
| 2 | `/bosses/count-geonor` | Identify the exact encounter/location, explain distinct attack cues and phase responses, include an accurate annotated capture or sourced observation | Medium / current prose largely generic |
| 3 | `/builds/lightning-ranger` | Choose a coherent class/ascendancy and progression, show a legal skill/support arrangement, realistic gear priorities, defenses and an encounter example | Higher / current page only an outline |

Use the existing links from the three comparison pages. Add links only if an actual reader task is underserved. Do not claim fresh testing or invent numeric performance. Update visible dates only when an actual substantive review/change happens. Keep URLs, routing and the 32-URL sitemap stable during the experiment.

After deployment, verify the three production responses and GSC live-test eligibility. If each passes and has material improvements, request indexing once per candidate. Repeated requests for the same URL do not speed crawling, and requests do not guarantee inclusion. [Google recrawl guidance](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl)

No new public pages are needed. Do not attempt to make all 29 eligible pages into simultaneous projects, add backlinks of dubious origin, raise sitemap priorities, or bulk add FAQs solely to satisfy a metric. Keep `src/app/sitemap.ts`, robots, routing, slugs, SEO pipeline scripts and programmatic generation scripts unchanged during this proposed controlled content experiment. Do not remove useful qualifications just to conceal unreviewed mechanics, and do not claim that an internal draft flag or AI authorship by itself explains Google's decision.

## Root-Cause Hypotheses and Confidence

| Hypothesis | Supporting evidence | Confidence / limits |
| --- | --- | --- |
| Crawl prioritization has not expanded beyond the small observed set | Revised brief reports 29 Discovered - currently not indexed; all 32 have eligible responses, good canonicals and short body-link paths | Strong fit to the supplied status, but actual Googlebot requests, timing and host treatment are unverified. Not proof of a post-crawl quality rejection |
| The wider publication offers inconsistent, insufficiently differentiated value | Five short builds; about 92% mapper-added prose on five bosses; unfinished pages promoted publicly; conflicting poison guidance | High confidence in these local/live defects; medium confidence they contribute to Google prioritization. No penalty or algorithmic causal diagnosis is demonstrated |
| Intent and editorial signals are less coherent on the unindexed cluster | Fourteen identical descriptions and exposed SEO/freshness diagnostics; overlapping Lightning Arrow guides; missing natural skill-hub link | High confidence in the observable issues; medium/low confidence in their individual indexing impact. Guide variants may compete, but Google-selected canonicals are unknown |

Working conclusion: **content/publication readiness and focused crawl observation deserve attention before more expansion**. Technical eligibility is necessary but insufficient. A missing OG image, generic anchors, zero H2s on a hub, or lack of FAQ schema is not an established explanation for 29 excluded URLs. External reputation/backlinks and competing search results were not measured, so this report does not invent an authority score or link deficit.

## Feedback Rules

The following are project decision checkpoints, not Google's promised processing times. Use a deployment timestamp and comparable GSC date windows. Tentative dates below assume work were deployed September 26; shift them to the actual deployment date.

| Evidence | Action |
| --- | --- |
| Exclusion reasons still unknown | Collect them first; do not diagnose all URLs as a crawl or quality refusal |
| Discovered, no post-deployment crawl, eligible live test | Keep sitemap and links stable; inspect Crawl Stats/logs and allow an observation window |
| Crawled, not indexed, crawl predates the substantive revision | Request indexing once after verifying the deployed revision; wait for a later crawl before judging it |
| Crawled, not indexed, crawl is after revision | Reassess specific usefulness, factual proof and overlapping intent; adding more words is not a diagnosis |
| Duplicate / alternate canonical reason | Compare Google-selected canonical and actual content purpose; do not start a generic expansion sprint on that URL |
| Blocked, noindex, fetch/server error or soft 404 | Fix the confirmed technical/content-response cause before promotion; this audit's successful generic-client fetch does not override GSC evidence |
| At 7 days, roughly October 3 | Record per-candidate crawl/index/canonical state, query groups and impressions; observe if Google has not yet evaluated the new version |
| At 14 days, roughly October 10 | If at least one candidate gains confirmed indexing and stable relevant impressions, finish that small cluster before selecting another cohort |
| At 14 days, no gains but no post-change crawl | Investigate crawl evidence and keep observing; do not automatically declare a content failure |
| At 28 days, roughly October 24, all three recrawled but none indexed | Stop expansion; commission an independent game-accuracy/usefulness review and reassess overlapping pages |
| At 28 days, no crawl and no host blocker identified | Continue a low-maintenance observation phase rather than buying more content or repeatedly resubmitting the sitemap |

Missing pages may have legitimate exclusion reasons; URL Inspection is the appropriate tool for a specific URL's indexing and canonical state. [GSC page indexing documentation](https://support.google.com/webmasters/answer/7440203)

The initial measurable outcome is **at least one newly confirmed index entry among the three candidates after Google processes the improved version**, with relevant non-brand impressions as supporting evidence. Three current plus three candidates is a maximum six-page experiment, not a promise of six indexed pages. Do not infer causation from tiny click totals or a single ranking observation.

## Verification and Files Changed

Only this repository file was created:

`docs/reports/CORE_INDEX_EXPANSION_AUDIT_2026-09-26.md`

Public source files and SEO configuration remain unchanged. No commit was created. Two temporary read-only audit helpers were used outside the repository and removed before delivery. Raw diagnostic JSON and screenshots remain in the operating-system temporary directory; they are audit evidence, not production inputs. No SEO pipeline was executed or modified.

Additional verification:

- `npm run validate:guides`: PASS, exit code 0; 23 Markdown guides checked. Ten warnings remain: six missing related-link metadata warnings and four one-FAQ warnings, affecting Frost Monk, Trialmaster, Cold Snap AI, Earthshatter, the example guide, Frostbolt AI and Lightning Arrow AI. These are pre-existing content gaps, not build errors.
- Existing link/graph scripts were inspected. `scripts/ai-seo/build-internal-link-graph.ts` writes planned opportunities to `data/ai-seo`, rather than checking actual rendered links. Injector/generator scripts also write files. They were not appropriate for this audit; the temporary rendered-link check supplied the missing coverage.
- Local status, canonical, H2, OG and FAQ checks completed on all 32. All requested 29 + 3 URLs are present, with zero duplicates and zero unexpected sitemap members.
- Browser rendering/interaction review covered 11 representative routes at two viewport sizes; no horizontal overflow or page errors. Three filter UIs failed to change their card lists, as documented above.
- Report delivery does not include a deployment, GSC request or site-source change.

```text
> poe2-site@0.1.0 build
> next build
Next.js 16.2.6 (Turbopack)
Compiled successfully in 3.3s
Finished TypeScript in 2.4s
Generating static pages using 15 workers (121/121) in 3.6s
Finalizing page optimization ...
Exit code: 0
```

**Final recommendation:** first repair the guide publishing surface and the missing Lightning Arrow path in the skills hub; retain the supplied GSC status and collect per-URL crawl evidence. Then improve and test Lightning Arrow, Count Geonor and Lightning Ranger as a small existing-page cohort. Keep sitemap, routing and homepage structure stable. Do not expand page count or assume the former word-count upgrades established authority.

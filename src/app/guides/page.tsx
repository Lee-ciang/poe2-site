import type { Metadata } from "next";
import Link from "next/link";
import { createSeoMetadata } from "@/lib/seo";
import { getAllMarkdownGuides } from "@/lib/markdown";

export const metadata: Metadata = createSeoMetadata({
  title: "Path of Exile 2 Guides",
  description:
    "Find practical Path of Exile 2 skill guides, build planning advice, and boss strategies for campaign progression and mapping.",
  path: "/guides",
  keywords: ["POE2 guides", "Path of Exile 2 skill guides", "POE2 progression"],
});

const typeLabels: Record<string, string> = {
  builds: "Build",
  bosses: "Boss",
  skills: "Skill",
};

// Editorial hub selection is separate from CMS status and route availability.
const guideSelections = [
  { path: "/guides/skills/lightning-arrow", description: "Plan a lightning bow playstyle, compare clearing and bossing needs, and connect your skill choices to a Ranger build." },
  { path: "/guides/skills/flame-wall", description: "Explore fire placement, projectile interactions, and the trade-offs of fighting around a persistent damage zone." },
  { path: "/guides/skills/ice-nova", description: "Consider cold area coverage, close-range positioning, and ways to leave room for defensive movement." },
  { path: "/guides/skills/ice-spear", description: "Compare cold projectile planning, aiming, and the demands of moving targets before choosing your setup." },
  { path: "/guides/skills/poison-arrow", description: "Plan ranged poison application, damage while moving, and the different needs of packs and longer encounters." },
  { path: "/guides/skills/spark", description: "Explore a lightning spell alternative to bow attacks, including coverage, resource use, and progression priorities." },
  { path: "/guides/skills/arc", description: "Compare direct lightning spell targeting, support choices, and a simple attack-and-move rhythm." },
  { path: "/guides/skills/ball-lightning", description: "Think through projectile travel, sustained lightning coverage, and positioning around moving enemies." },
  { path: "/guides/skills/chain-lightning", description: "Compare lightning coverage and caster planning with other lightning playstyles." },
  { path: "/guides/skills/fireball", description: "Plan a fire projectile setup around aiming, area coverage, and practical support trade-offs." },
  { path: "/guides/skills/freezing-shards", description: "Explore cold projectile progression and the balance between damage, control, and resource use." },
  { path: "/guides/skills/frostbolt", description: "Consider cold projectile travel, spacing, and support choices for campaign encounters and mapping." },
  { path: "/guides/skills/meteor", description: "Compare delayed fire damage with faster attacks, and plan around the time needed to land a hit." },
  { path: "/guides/skills/whirlwind", description: "Consider mobile melee positioning, weapon priorities, and the defensive demands of staying close." },
  { path: "/guides/skills/earthshatter", description: "Explore slam timing, weapon scaling, and short damage windows for a physical melee character." },
  { path: "/guides/builds/lightning-ranger", description: "Read a short introduction to lightning bow progression and compare it with the full Lightning Ranger build." },
  { path: "/guides/bosses/count-geonor", description: "Review a short Count Geonor preparation checklist before using the full encounter guide." },
];

export default function GuidesPage() {
  const availableGuides = getAllMarkdownGuides();
  const guides = guideSelections.flatMap((selection) => {
    const guide = availableGuides.find((entry) => entry.path === selection.path);
    return guide ? [{ ...guide, description: selection.description }] : [];
  });

  return (
    <main className="flex-1 bg-black text-white">
      <section className="border-b border-zinc-800 bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-orange-500">
            Player Guides
          </p>
          <h1 className="max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">
            Path of Exile 2 Guides
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-400">
            Choose a skill, plan your next gear upgrade, or prepare for a difficult
            boss. Find practical POE2 advice for campaign progression, build
            decisions, and the move into mapping.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mb-10 border-b border-zinc-800 pb-8">
          <h2 className="text-2xl font-black">Build and Boss Planning</h2>
          <p className="mt-4 max-w-3xl leading-7 text-zinc-400">
            Start with the <Link href="/builds/lightning-ranger" className="text-orange-400 underline hover:text-orange-300">Lightning Ranger build</Link>{" "}
            for a bow progression plan, or compare the{" "}
            <Link href="/builds/poison-assassin" className="text-orange-400 underline hover:text-orange-300">Poison Assassin playstyle</Link>{" "}
            for damage while repositioning. Preparing for the end of Act One? Read
            the <Link href="/bosses/count-geonor" className="text-orange-400 underline hover:text-orange-300">Count Geonor encounter guide</Link>.
          </p>
        </div>
        <h2 className="mb-6 text-2xl font-black">Skill and Progression Guides</h2>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {guides.map((guide) => (
            <article
              key={guide.path}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-xl shadow-black/20 transition hover:-translate-y-1 hover:border-orange-500"
            >
              <div className="mb-4 flex flex-wrap gap-2">
                <span className="rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-xs font-bold text-orange-400">
                  {typeLabels[guide.metadata.type]}
                </span>
              </div>

              <h3 className="text-2xl font-black text-white">
                {guide.metadata.title}
              </h3>
              <p className="mt-4 leading-7 text-zinc-400">
                {guide.description}
              </p>

              <Link
                href={guide.path}
                className="mt-6 inline-flex font-bold text-orange-500 transition hover:text-orange-400"
              >
                Read Guide -&gt;
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

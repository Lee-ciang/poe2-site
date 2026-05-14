import Link from "next/link";
import { getAllMarkdownGuides } from "@/lib/markdown";

const topicKeywords = {
  lightning: ["lightning", "shock", "arc", "spark", "chain", "arrow"],
  cold: ["cold", "frost", "freeze", "ice", "chill"],
  fire: ["fire", "flame", "ignite", "burn", "meteor"],
  melee: ["melee", "slam", "earthshatter", "whirlwind", "monk"],
  bossing: ["boss", "phase", "mechanic", "trialmaster", "geonor"],
  ranger: ["ranger", "bow", "arrow", "projectile", "poison"],
} as const;

const expansionIdeas = {
  lightning: {
    builds: "Lightning Endgame Build Guide",
    bosses: "Lightning Bossing Strategy Guide",
    skills: "Best Lightning Skills Guide",
  },
  cold: {
    builds: "Cold Endgame Build Guide",
    bosses: "Cold Bossing Strategy Guide",
    skills: "Best Cold Skills Guide",
  },
  fire: {
    builds: "Fire Endgame Build Guide",
    bosses: "Fire Bossing Strategy Guide",
    skills: "Best Fire Skills Guide",
  },
  melee: {
    builds: "Melee Endgame Build Guide",
    bosses: "Melee Bossing Strategy Guide",
    skills: "Best Melee Skills Guide",
  },
  bossing: {
    builds: "Best Bossing Builds Guide",
    bosses: "POE2 Boss Progression Guide",
    skills: "Best Bossing Skills Guide",
  },
  ranger: {
    builds: "Ranger Endgame Build Guide",
    bosses: "Ranger Bossing Strategy Guide",
    skills: "Best Ranger Skills Guide",
  },
} as const;

function getGuideText(guide: ReturnType<typeof getAllMarkdownGuides>[number]) {
  return [
    guide.metadata.title,
    guide.metadata.seoTitle,
    guide.metadata.seoDescription,
    guide.metadata.type,
    guide.body,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function getClusterScore(
  guide: ReturnType<typeof getAllMarkdownGuides>[number],
  keywords: readonly string[],
) {
  const text = getGuideText(guide);

  return keywords.reduce((total, keyword) => {
    const matches = text.match(new RegExp(`\\b${keyword}\\b`, "g"));
    return total + (matches?.length ?? 0);
  }, 0);
}

export default function TopicClustersPage() {
  const guides = getAllMarkdownGuides();

  const clusters = Object.entries(topicKeywords).map(([topic, keywords]) => {
    const items = guides
      .map((guide) => ({
        guide,
        score: getClusterScore(guide, keywords),
      }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score);

    const staleCount = items.filter((item) => item.guide.metrics.isStale).length;

const outdatedPatchCount = items.filter(
  (item) => item.guide.metrics.isOutdatedPatch,
).length;

const lowQualityCount = items.filter(
  (item) => item.guide.metrics.qualityScore < 70,
).length;

const buildCount = items.filter(
  (item) => item.guide.metadata.type === "builds",
).length;

const bossCount = items.filter(
  (item) => item.guide.metadata.type === "bosses",
).length;

const skillCount = items.filter(
  (item) => item.guide.metadata.type === "skills",
).length;

const gapWarnings = [
  buildCount === 0 ? "Missing build coverage" : null,
  bossCount === 0 ? "Missing boss coverage" : null,
  skillCount === 0 ? "Missing skill coverage" : null,
].filter((warning): warning is string => Boolean(warning));

const expansionQueue = [
  buildCount === 0
    ? expansionIdeas[topic as keyof typeof expansionIdeas].builds
    : null,

  bossCount === 0
    ? expansionIdeas[topic as keyof typeof expansionIdeas].bosses
    : null,

  skillCount === 0
    ? expansionIdeas[topic as keyof typeof expansionIdeas].skills
    : null,
].filter(Boolean) as string[];

const averageQualityScore =
  items.length > 0
    ? Math.round(
        items.reduce(
          (total, item) => total + item.guide.metrics.qualityScore,
          0,
        ) / items.length,
      )
    : 0;

return {
  topic,
  items,
  staleCount,
  outdatedPatchCount,
  lowQualityCount,
  averageQualityScore,
  buildCount,
  bossCount,
  skillCount,
  gapWarnings,
  expansionQueue,
};
  });

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-4xl font-black">Topic Cluster Dashboard</h1>

        <p className="mt-4 max-w-3xl text-zinc-400">
          Semantic topic clusters for POE2 guide content. Use this dashboard to
          identify pillar opportunities, weak clusters, and internal linking
          targets.
        </p>

        <div className="mt-10 grid gap-6">
          {clusters.map((cluster) => (
            <section
              key={cluster.topic}
              className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6"
            >
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-500">
                    Cluster
                  </p>

                  <h2 className="mt-2 text-3xl font-black capitalize text-white">
                    {cluster.topic}
                  </h2>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                   <ClusterMetric label="Pages" value={cluster.items.length} />
                   <ClusterMetric label="Avg SEO" value={cluster.averageQualityScore} />
                   <ClusterMetric label="Stale" value={cluster.staleCount} />
                   <ClusterMetric label="Outdated" value={cluster.outdatedPatchCount} />
                   <ClusterMetric label="Low Quality" value={cluster.lowQualityCount} />
                   <ClusterMetric label="Builds" value={cluster.buildCount} />
                   <ClusterMetric label="Bosses" value={cluster.bossCount} />
                   <ClusterMetric label="Skills" value={cluster.skillCount} />
                </div>
              </div>

              {cluster.gapWarnings.length > 0 ? (
             <div className="mt-6 flex flex-wrap gap-3">
             {cluster.gapWarnings.map((warning) => (
             <span
             key={warning}
             className="rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-bold text-red-300"
      >
             {warning}
            </span>
             ))}
            </div>
             ) : null}

             {cluster.expansionQueue.length > 0 ? (
  <div className="mt-4 rounded-2xl border border-orange-500/20 bg-orange-500/5 p-5">
    <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-400">
      AI Expansion Recommendations
    </p>

    <div className="mt-4 flex flex-wrap gap-3">
      {cluster.expansionQueue.map((idea) => (
        <span
          key={idea}
          className="rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-2 text-sm font-bold text-orange-300"
        >
          {idea}
        </span>
      ))}
    </div>
  </div>
) : null}

              <div className="mt-6 grid gap-4">
                {cluster.items.slice(0, 10).map(({ guide, score }) => (
                  <Link
                    key={`${cluster.topic}-${guide.path}`}
                    href={guide.path}
                    className="rounded-xl border border-zinc-800 bg-black p-5 transition hover:border-orange-500"
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-xs font-bold text-orange-400">
                        {guide.metadata.type}
                      </span>

                      <span className="rounded-full border border-zinc-700 bg-zinc-950 px-3 py-1 text-xs font-bold text-zinc-300">
                        Cluster Score {score}
                      </span>

                      <span className="rounded-full border border-zinc-700 bg-zinc-950 px-3 py-1 text-xs font-bold text-zinc-300">
                        SEO {guide.metrics.qualityScore}/100
                      </span>

                      {guide.metrics.isOutdatedPatch ? (
                        <span className="rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-bold text-red-300">
                          Outdated Patch
                        </span>
                      ) : null}

                      {guide.metrics.isStale ? (
                        <span className="rounded-full border border-yellow-500/30 bg-yellow-500/10 px-3 py-1 text-xs font-bold text-yellow-300">
                          Stale
                        </span>
                      ) : null}
                    </div>

                    <h3 className="mt-4 text-xl font-black text-white">
                      {guide.metadata.title}
                    </h3>

                    <p className="mt-2 text-sm text-zinc-400">{guide.path}</p>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
function ClusterMetric({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-black px-4 py-3 text-right">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
        {label}
      </p>
      <p className="mt-1 text-2xl font-black">{value}</p>
    </div>
  );
}
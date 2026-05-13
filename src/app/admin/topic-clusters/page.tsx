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

    return {
      topic,
      items,
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

                <div className="rounded-xl border border-zinc-800 bg-black px-4 py-3 text-right">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
                    Pages
                  </p>
                  <p className="mt-1 text-2xl font-black">
                    {cluster.items.length}
                  </p>
                </div>
              </div>

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
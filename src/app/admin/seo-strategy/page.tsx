import Link from "next/link";
import { getAllMarkdownGuides } from "@/lib/markdown";

function getRefreshPriority(
  guide: ReturnType<typeof getAllMarkdownGuides>[number],
) {
  let priority = 0;

  if (guide.metrics.isOutdatedPatch) {
    priority += 50;
  }

  if (guide.metrics.isStale) {
    priority += 30;
  }

  if (guide.metrics.qualityScore < 70) {
    priority += 20;
  }

  if (guide.faqItems.length < 2) {
    priority += 10;
  }

  return priority;
}

export default function SeoStrategyPage() {
  const guides = getAllMarkdownGuides();

  const outdatedGuides = guides.filter(
    (guide) => guide.metrics.isOutdatedPatch,
  );

  const lowQualityGuides = guides.filter(
    (guide) => guide.metrics.qualityScore < 70,
  );

  const weakFaqGuides = guides.filter((guide) => guide.faqItems.length < 2);

  const refreshCandidates = guides
    .map((guide) => ({
      guide,
      priority: getRefreshPriority(guide),
    }))
    .filter((item) => item.priority > 0)
    .sort((a, b) => b.priority - a.priority);

  const highPriorityOpportunities = refreshCandidates.filter(
    (item) => item.priority >= 50,
  );

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-orange-500">
          AI SEO Command Center
        </p>

        <h1 className="mt-4 text-4xl font-black">
          SEO Strategy Dashboard
        </h1>

        <p className="mt-4 max-w-3xl text-zinc-400">
          Unified SEO operations dashboard for refresh planning, content quality,
          FAQ coverage, patch drift, and AI growth opportunities.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
          <MetricCard title="Total Guides" value={guides.length} />
          <MetricCard title="Patch Drift" value={outdatedGuides.length} />
          <MetricCard title="Low Quality" value={lowQualityGuides.length} />
          <MetricCard title="Weak FAQ" value={weakFaqGuides.length} />
          <MetricCard
            title="High Priority"
            value={highPriorityOpportunities.length}
          />
        </div>

        <section className="mt-12 rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
          <h2 className="text-2xl font-black">Strategic Actions</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <StrategyLink
              href="/admin/content-health"
              title="Content Health"
              description="Review stale, weak, and low-quality content."
            />

            <StrategyLink
              href="/admin/topic-clusters"
              title="Topic Clusters"
              description="Analyze topical authority and cluster coverage."
            />

            <StrategyLink
              href="/admin/refresh-queue"
              title="Refresh Queue"
              description="Review patch refresh candidates and drafts."
            />

            <StrategyLink
              href="/admin/publish-queue"
              title="Publish Queue"
              description="Review AI drafts and publish readiness."
            />
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-black">
            High Priority SEO Opportunities
          </h2>

          <div className="mt-5 grid gap-4">
            {highPriorityOpportunities.length === 0 ? (
              <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5 text-zinc-400">
                No high priority opportunities detected.
              </div>
            ) : (
              highPriorityOpportunities.slice(0, 10).map(({ guide, priority }) => (
                <Link
                  key={guide.path}
                  href={guide.path}
                  className="rounded-xl border border-zinc-800 bg-zinc-950 p-5 transition hover:border-orange-500"
                >
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-bold text-red-300">
                      Priority {priority}
                    </span>

                    <span className="rounded-full border border-zinc-700 bg-black px-3 py-1 text-xs font-bold text-zinc-300">
                      SEO {guide.metrics.qualityScore}/100
                    </span>

                    {guide.metrics.isOutdatedPatch ? (
                      <span className="rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-bold text-red-300">
                        Patch Drift
                      </span>
                    ) : null}

                    {guide.metrics.isStale ? (
                      <span className="rounded-full border border-yellow-500/30 bg-yellow-500/10 px-3 py-1 text-xs font-bold text-yellow-300">
                        Stale
                      </span>
                    ) : null}
                  </div>

                  <h3 className="mt-4 text-xl font-black">
                    {guide.metadata.title}
                  </h3>

                  <p className="mt-2 text-sm text-zinc-400">
                    {guide.path}
                  </p>
                </Link>
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

function MetricCard({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-500">
        {title}
      </p>

      <p className="mt-4 text-5xl font-black">{value}</p>
    </div>
  );
}

function StrategyLink({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-xl border border-zinc-800 bg-black p-5 transition hover:border-orange-500"
    >
      <h3 className="text-lg font-black text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-zinc-400">{description}</p>
    </Link>
  );
}
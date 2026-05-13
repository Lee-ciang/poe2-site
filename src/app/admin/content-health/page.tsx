import Link from "next/link";
import { getAllMarkdownGuides } from "@/lib/markdown";

function getRefreshPriority(guide: ReturnType<typeof getAllMarkdownGuides>[number]) {
  let priority = 0;

  if (guide.metrics.isStale) {
    priority += 40;
  }

  if (guide.metrics.qualityScore < 70) {
    priority += 30;
  }

  if (guide.faqItems.length < 2) {
    priority += 15;
  }

  const relatedCount =
    guide.metadata.relatedBuilds.length +
    guide.metadata.relatedBosses.length +
    guide.metadata.relatedSkills.length;

  if (relatedCount === 0) {
    priority += 15;
  }

  return priority;
}

export default function ContentHealthDashboardPage() {
  const guides = getAllMarkdownGuides();

  const staleGuides = guides.filter((guide) => guide.metrics.isStale);

  const lowQualityGuides = guides.filter(
    (guide) => guide.metrics.qualityScore < 70,
  );

  const weakFaqGuides = guides.filter(
    (guide) => guide.faqItems.length < 2,
  );

  const missingRelatedGuides = guides.filter((guide) => {
    const relatedCount =
      guide.metadata.relatedBuilds.length +
      guide.metadata.relatedBosses.length +
      guide.metadata.relatedSkills.length;

    return relatedCount === 0;
  });

const refreshQueue = guides
  .map((guide) => ({
    guide,
    priority: getRefreshPriority(guide),
  }))
  .filter((item) => item.priority > 0)
  .sort((a, b) => b.priority - a.priority);

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-4xl font-black">
          Content Health Dashboard
        </h1>

        <p className="mt-4 text-zinc-400">
          SEO content monitoring for markdown guides.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            title="Total Guides"
            value={guides.length}
          />

          <MetricCard
            title="Stale Content"
            value={staleGuides.length}
          />

          <MetricCard
            title="Low Quality"
            value={lowQualityGuides.length}
          />

          <MetricCard
            title="Weak FAQ"
            value={weakFaqGuides.length}
          />

          <MetricCard
            title="Refresh Queue"
            value={refreshQueue.length}
          />
        </div>

        <DashboardSection
          title="Stale Content"
          guides={staleGuides}
        />

        <DashboardSection
          title="Low Quality Content"
          guides={lowQualityGuides}
        />

        <DashboardSection
          title="Missing Related Links"
          guides={missingRelatedGuides}
        />

        <section className="mt-12">
        <h2 className="text-2xl font-black text-white">
        Refresh Priority Queue
        </h2>

        <div className="mt-5 grid gap-4">
        {refreshQueue.map(({ guide, priority }) => (
        <Link
        key={`refresh-${guide.path}`}
        href={guide.path}
        className="rounded-xl border border-zinc-800 bg-zinc-950 p-5 transition hover:border-orange-500"
        >
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs font-bold text-red-400">
            Priority {priority}
          </span>

          <span className="text-sm font-bold text-zinc-500">
            SEO Score {guide.metrics.qualityScore}/100
          </span>

          {guide.metrics.isStale ? (
            <span className="rounded-full border border-yellow-500/30 bg-yellow-500/10 px-3 py-1 text-xs font-bold text-yellow-300">
              Stale
            </span>
          ) : null}
        </div>

        <h3 className="mt-4 text-xl font-black text-white">
          {guide.metadata.title}
        </h3>

        <p className="mt-2 text-sm text-zinc-400">
          {guide.path}
        </p>
         </Link>
        ))}
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

      <p className="mt-4 text-5xl font-black text-white">
        {value}
      </p>
    </div>
  );
}

function DashboardSection({
  title,
  guides,
}: {
  title: string;
  guides: ReturnType<typeof getAllMarkdownGuides>;
}) {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-black text-white">
        {title}
      </h2>

      <div className="mt-5 grid gap-4">
        {guides.length === 0 ? (
          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5 text-zinc-400">
            No issues detected.
          </div>
        ) : (
          guides.map((guide) => (
            <Link
              key={guide.path}
              href={guide.path}
              className="rounded-xl border border-zinc-800 bg-zinc-950 p-5 transition hover:border-orange-500"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-xs font-bold text-orange-400">
                  {guide.metadata.type}
                </span>

                <span className="text-sm font-bold text-zinc-500">
                  SEO Score {guide.metrics.qualityScore}/100
                </span>

                {guide.metrics.isStale ? (
                  <span className="rounded-full border border-yellow-500/30 bg-yellow-500/10 px-3 py-1 text-xs font-bold text-yellow-300">
                    Stale
                  </span>
                ) : null}
              </div>

              <h3 className="mt-4 text-xl font-black text-white">
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
  );
}
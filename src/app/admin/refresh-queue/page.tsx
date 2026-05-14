import fs from "node:fs";
import path from "node:path";
import { getAllMarkdownGuides } from "@/lib/markdown";

const patchRefreshDirectory = path.join(
  process.cwd(),
  "src",
  "content",
  "drafts",
  "patch-refresh",
);

function getPatchRefreshDrafts() {
  if (!fs.existsSync(patchRefreshDirectory)) {
    return [];
  }

  return fs
    .readdirSync(patchRefreshDirectory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => ({
      file,
      path: path.join(patchRefreshDirectory, file),
    }));
}

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

export default function RefreshQueuePage() {
  const guides = getAllMarkdownGuides();
  const drafts = getPatchRefreshDrafts();

  const outdatedGuides = guides.filter(
    (guide) => guide.metrics.isOutdatedPatch,
  );

  const refreshCandidates = guides
    .map((guide) => ({
      guide,
      priority: getRefreshPriority(guide),
    }))
    .filter((item) => item.priority > 0)
    .sort((a, b) => b.priority - a.priority);

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-4xl font-black">AI Refresh Queue</h1>

        <p className="mt-4 max-w-3xl text-zinc-400">
          Patch-aware SEO maintenance dashboard for stale, outdated, and
          refresh-ready guides.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <MetricCard title="Outdated Guides" value={outdatedGuides.length} />
          <MetricCard title="Refresh Drafts" value={drafts.length} />
          <MetricCard
            title="Refresh Candidates"
            value={refreshCandidates.length}
          />
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-black">Patch Refresh Drafts</h2>

          <div className="mt-5 grid gap-4">
            {drafts.length === 0 ? (
              <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5 text-zinc-400">
                No patch refresh drafts found.
              </div>
            ) : (
              drafts.map((draft) => (
                <article
                  key={draft.path}
                  className="rounded-xl border border-zinc-800 bg-zinc-950 p-5"
                >
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-500">
                    Patch Refresh Draft
                  </p>

                  <h3 className="mt-3 text-xl font-black">{draft.file}</h3>

                  <p className="mt-2 text-sm text-zinc-400">{draft.path}</p>
                </article>
              ))
            )}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-black">Refresh Candidates</h2>

          <div className="mt-5 grid gap-4">
            {refreshCandidates.map(({ guide, priority }) => (
              <article
                key={guide.path}
                className="rounded-xl border border-zinc-800 bg-zinc-950 p-5"
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
                      Outdated Patch
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

                <p className="mt-2 text-sm text-zinc-400">{guide.path}</p>
              </article>
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

      <p className="mt-4 text-5xl font-black">{value}</p>
    </div>
  );
}
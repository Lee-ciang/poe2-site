import fs from "node:fs";
import path from "node:path";

const draftsDirectory = path.join(process.cwd(), "src", "content", "drafts");

function parseDraftFrontmatter(source: string) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);

  if (!match) {
    return null;
  }

  const fields = new Map<string, string>();

  for (const line of match[1].split(/\r?\n/)) {
    const separatorIndex = line.indexOf(":");

    if (separatorIndex === -1) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    const value = line
      .slice(separatorIndex + 1)
      .trim()
      .replace(/^["']|["']$/g, "");

    fields.set(key, value);
  }

  return fields;
}

function getDraftStatus(source: string) {
  const frontmatter = parseDraftFrontmatter(source);

  if (!frontmatter) {
    return {
      status: "blocked",
      computedStatus: "Blocked",
      warnings: ["Missing frontmatter"],
      publishScore: 0,
    };
  }

  const contentStatus = frontmatter.get("contentStatus") ?? "draft";
  const hasFaq = /## FAQ/i.test(source);
  const faqCount = (source.match(/^### /gm) ?? []).length;
  const body = source.replace(/^---\r?\n[\s\S]*?\r?\n---/, "").trim();
  const wordCount = body.split(/\s+/).filter(Boolean).length;

  let publishScore = 0;

  if (frontmatter.get("seoDescription")) {
    publishScore += 20;
  }

  if (frontmatter.get("patchVersion")) {
    publishScore += 15;
  }

  if (frontmatter.get("lastUpdated")) {
    publishScore += 15;
  }

  if (hasFaq && faqCount >= 2) {
    publishScore += 25;
  }

  if (wordCount >= 300) {
    publishScore += 25;
  }

  const warnings = [
    !frontmatter.get("seoDescription") ? "Missing seoDescription" : null,
    !frontmatter.get("patchVersion") ? "Missing patchVersion" : null,
    !frontmatter.get("lastUpdated") ? "Missing lastUpdated" : null,
    !hasFaq ? "Missing FAQ section" : null,
    faqCount < 2 ? "Needs at least 2 FAQ items" : null,
  ].filter((warning): warning is string => Boolean(warning));

  const computedStatus = warnings.length ? "Needs Review" : "Publish Ready";

  return {
    status: contentStatus,
    computedStatus,
    warnings,
    publishScore,
  };
}

function getDraftFiles() {
  if (!fs.existsSync(draftsDirectory)) {
    return [];
  }

  return fs
    .readdirSync(draftsDirectory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const draftPath = path.join(draftsDirectory, file);
      const source = fs.readFileSync(draftPath, "utf8");
      const draftStatus = getDraftStatus(source);

      return {
        file,
        path: draftPath,
        status: draftStatus.status,
        computedStatus: draftStatus.computedStatus,
        warnings: draftStatus.warnings,
        publishScore: draftStatus.publishScore,
      };
    });
}

export default function PublishQueuePage() {
  const drafts = getDraftFiles();

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-4xl font-black">AI Publish Queue</h1>

        <p className="mt-4 max-w-3xl text-zinc-400">
          Draft markdown guides waiting for review, validation, and publishing.
        </p>

        <div className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-500">
            Drafts
          </p>

          <p className="mt-4 text-5xl font-black">{drafts.length}</p>
        </div>

        <section className="mt-12 grid gap-4">
          {drafts.length === 0 ? (
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5 text-zinc-400">
              No drafts found.
            </div>
          ) : (
            drafts.map((draft) => (
              <article
                key={draft.file}
                className="rounded-xl border border-zinc-800 bg-zinc-950 p-5"
              >
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-500">
                  Draft
                </p>

                <h2 className="mt-3 text-xl font-black text-white">
                  {draft.file}
                </h2>

                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-xs font-bold text-orange-400">
                    Status: {draft.status}
                  </span>

                  <span className="rounded-full border border-zinc-700 bg-zinc-950 px-3 py-1 text-xs font-bold text-zinc-300">
                    Computed: {draft.computedStatus}
                  </span>

                  <span className="rounded-full border border-zinc-700 bg-zinc-950 px-3 py-1 text-xs font-bold text-zinc-300">
                    Publish Score {draft.publishScore}/100
                  </span>

                  {draft.warnings.map((warning) => (
                    <span
                      key={warning}
                      className="rounded-full border border-yellow-500/30 bg-yellow-500/10 px-3 py-1 text-xs font-bold text-yellow-300"
                    >
                      {warning}
                    </span>
                  ))}
                </div>

                <p className="mt-2 text-sm text-zinc-400">{draft.path}</p>
              </article>
            ))
          )}
        </section>
      </div>
    </main>
  );
}
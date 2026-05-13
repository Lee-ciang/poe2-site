import fs from "node:fs";
import path from "node:path";

const draftsDirectory = path.join(process.cwd(), "src", "content", "drafts");

function getDraftFiles() {
  if (!fs.existsSync(draftsDirectory)) {
    return [];
  }

  return fs
    .readdirSync(draftsDirectory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => ({
      file,
      path: path.join(draftsDirectory, file),
    }));
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

                <p className="mt-2 text-sm text-zinc-400">{draft.path}</p>
              </article>
            ))
          )}
        </section>
      </div>
    </main>
  );
}
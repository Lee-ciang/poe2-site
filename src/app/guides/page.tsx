import type { Metadata } from "next";
import Link from "next/link";
import { createSeoMetadata } from "@/lib/seo";
import { getAllMarkdownGuides } from "@/lib/markdown";

export const metadata: Metadata = createSeoMetadata({
  title: "Path of Exile 2 SEO Guides",
  description:
    "Browse Markdown-powered Path of Exile 2 guides for builds, bosses, and skills with patch notes, related links, and FAQs.",
  path: "/guides",
  keywords: ["POE2 guides", "Path of Exile 2 Markdown guides", "POE2 SEO content"],
});

const typeLabels: Record<string, string> = {
  builds: "Build",
  bosses: "Boss",
  skills: "Skill",
};

export default function GuidesPage() {
  const guides = getAllMarkdownGuides();

  return (
    <main className="flex-1 bg-black text-white">
      <section className="border-b border-zinc-800 bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-orange-500">
            Markdown Guides
          </p>
          <h1 className="max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">
            Path of Exile 2 Guides
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-400">
            Browse Markdown-authored POE2 guides for builds, bosses, and skills.
            These pages are designed for scalable SEO content workflows while
            keeping the structured databases intact.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
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
                {guide.metadata.patchVersion ? (
                  <span className="rounded-full border border-zinc-700 bg-zinc-950 px-3 py-1 text-xs font-bold text-zinc-300">
                    {guide.metadata.patchVersion}
                  </span>
                ) : null}
              </div>

              <h2 className="text-2xl font-black text-white">
                {guide.metadata.title}
              </h2>
              <p className="mt-4 leading-7 text-zinc-400">
                {guide.metadata.seoDescription}
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

import type { Metadata } from "next";
import { BuildCard } from "@/components/home/BuildCard";
import { builds } from "@/data/builds";
import { createSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = createSeoMetadata({
  title: "Path of Exile 2 Builds",
  description:
    "Browse Path of Exile 2 builds by class, tier, difficulty, and playstyle with leveling and endgame notes.",
  path: "/builds",
  keywords: ["POE2 build database", "Path of Exile 2 classes"],
});

const filters = [
  {
    label: "Class",
    options: ["All Classes", "Ranger", "Witch", "Shadow", "Warrior", "Monk"],
  },
  { label: "Tier", options: ["All Tiers", "S Tier", "A Tier", "B Tier"] },
  {
    label: "Difficulty",
    options: ["Any Difficulty", "Beginner", "Intermediate", "Advanced"],
  },
];

export default function BuildsPage() {
  return (
    <main className="flex-1 bg-black text-white">
      <section className="border-b border-zinc-800 bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-orange-500">
            Builds Database
          </p>
          <h1 className="max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">
            Path of Exile 2 Builds
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-400">
            Compare POE2 builds by class, tier, difficulty, and playstyle.
            Each guide includes core skills, gear priorities, leveling advice,
            and endgame notes.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-4 rounded-2xl border border-zinc-800 bg-zinc-950/80 p-4 md:grid-cols-3">
          {filters.map((filter) => (
            <label key={filter.label} className="grid gap-2">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
                {filter.label}
              </span>
              <select className="rounded-xl border border-zinc-800 bg-black px-4 py-3 text-sm font-semibold text-zinc-300 outline-none transition hover:border-orange-500 focus:border-orange-500">
                {filter.options.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {builds.map((build) => (
            <BuildCard
              key={build.slug}
              title={build.title}
              tier={build.tier}
              description={build.summary}
              href={`/builds/${build.slug}`}
              className={build.className}
              playstyle={build.playstyle}
              difficulty={build.difficulty}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

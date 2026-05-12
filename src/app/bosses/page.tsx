import type { Metadata } from "next";
import { BossCard } from "@/components/home/BossCard";
import { bosses } from "@/data/bosses";
import { createSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = createSeoMetadata({
  title: "Path of Exile 2 Boss Guides",
  description:
    "Browse Path of Exile 2 boss guides with phases, mechanics, weaknesses, rewards, and combat tips.",
  path: "/bosses",
  keywords: ["POE2 bosses", "POE2 boss mechanics", "Path of Exile 2 boss guide"],
});

const filters = [
  {
    label: "Difficulty",
    options: ["Any Difficulty", "Normal", "Hard", "Endgame", "Pinnacle"],
  },
  {
    label: "Damage Type",
    options: ["Any Damage", "Physical", "Fire", "Cold", "Lightning", "Chaos"],
  },
  {
    label: "Location",
    options: ["All Locations", "Campaign", "Atlas", "Pinnacle", "Vaal"],
  },
];

export default function BossesPage() {
  return (
    <main className="flex-1 bg-black text-white">
      <section className="border-b border-zinc-800 bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-orange-500">
            Boss Guide Database
          </p>
          <h1 className="max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">
            Path of Exile 2 Boss Guides
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-400">
            Study POE2 bosses by difficulty, location, damage type, and core
            mechanics. Each guide includes phases, weaknesses, rewards, and
            practical fight tips.
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
          {bosses.map((boss) => (
            <BossCard
              key={boss.slug}
              title={boss.name}
              description={boss.summary}
              href={`/bosses/${boss.slug}`}
              location={boss.location}
              difficulty={boss.difficulty}
              damageTypes={boss.damageTypes}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

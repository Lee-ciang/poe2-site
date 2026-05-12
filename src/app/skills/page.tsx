import type { Metadata } from "next";
import { SkillCard } from "@/components/home/SkillCard";
import { skills } from "@/data/skills";
import { createSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = createSeoMetadata({
  title: "Path of Exile 2 Skills Database",
  description:
    "Browse Path of Exile 2 skills by category, damage type, weapon requirement, supports, scaling stats, and recommended builds.",
  path: "/skills",
  keywords: ["POE2 skills", "POE2 support gems", "Path of Exile 2 skill database"],
});

const filters = [
  {
    label: "Category",
    options: ["All Categories", "Attack", "Spell", "Grenade", "Combo"],
  },
  {
    label: "Damage Type",
    options: ["Any Damage", "Physical", "Fire", "Cold", "Lightning", "Chaos"],
  },
  {
    label: "Weapon Requirement",
    options: ["Any Weapon", "Bow", "Crossbow", "Quarterstaff", "Caster", "Mace"],
  },
];

const skillGroups = {
  Lightning: [
    "arc",
    "spark",
    "chain-lightning",
    "ball-lightning",
  ],
  Cold: [
    "frostbolt",
    "ice-nova",
    "ice-spear",
    "freezing-shards",
  ],
  Fire: [
    "fireball",
    "flame-wall",
    "meteor",
  ],
  Melee: [
    "earthshatter",
    "whirlwind",
  ],
  Chaos: [
    "poison-arrow",
  ],
};

export default function SkillsPage() {
  return (
    <main className="flex-1 bg-black text-white">
      <section className="border-b border-zinc-800 bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-orange-500">
            Skills Database
          </p>
          <h1 className="max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">
            Path of Exile 2 Skills
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-400">
            Compare POE2 skills by category, damage type, weapon requirement,
            scaling stats, best supports, and endgame use cases.
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

      <section className="mx-auto grid max-w-7xl gap-12 px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
  {Object.entries(skillGroups).map(([groupName, slugs]) => {
    const groupSkills = skills.filter((skill) => slugs.includes(skill.slug));

    if (!groupSkills.length) {
      return null;
    }

    return (
      <div key={groupName}>
        <div className="mb-6">
          <h2 className="text-3xl font-black text-white">
            {groupName} Skills
          </h2>
          <p className="mt-2 text-zinc-400">
            Explore {groupName.toLowerCase()} skills, scaling options, support gems, and endgame use cases.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {groupSkills.map((skill) => (
            <SkillCard
              key={skill.slug}
              name={skill.name}
              category={skill.category}
              damageType={skill.damageType}
              weaponRequirement={skill.weaponRequirement}
              summary={skill.summary}
              href={`/skills/${skill.slug}`}
            />
          ))}
        </div>
      </div>
    );
  })}
</section>
    </main>
  );
}

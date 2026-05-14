import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SkillCard } from "@/components/home/SkillCard";
import { skills } from "@/data/skills";
import { createSeoMetadata } from "@/lib/seo";

const skillTypeGroups = {
  lightning: {
    title: "Lightning Skills",
    description:
      "Explore POE2 lightning skills focused on shock, chaining, fast mapping, and spell damage scaling.",
    slugs: ["arc", "spark", "chain-lightning", "ball-lightning"],
  },
  cold: {
    title: "Cold Skills",
    description:
      "Explore POE2 cold skills focused on freeze, chill, projectile control, and critical caster scaling.",
    slugs: ["frostbolt", "ice-nova", "ice-spear", "freezing-shards"],
  },
  fire: {
    title: "Fire Skills",
    description:
      "Explore POE2 fire skills focused on ignite, burning damage, burst spells, and area control.",
    slugs: ["fireball", "flame-wall", "meteor"],
  },
  melee: {
    title: "Melee Skills",
    description:
      "Explore POE2 melee skills focused on physical damage, slam attacks, movement, and close-range combat.",
    slugs: ["earthshatter", "whirlwind"],
  },
  chaos: {
    title: "Chaos Skills",
    description:
      "Explore POE2 chaos skills focused on poison, damage over time, kiting, and sustained boss damage.",
    slugs: ["poison-arrow"],
  },
} as const;

type SkillType = keyof typeof skillTypeGroups;

type SkillTypePageProps = {
  params: Promise<{ type: string }>;
};

function isSkillType(type: string): type is SkillType {
  return type in skillTypeGroups;
}

export function generateStaticParams() {
  return Object.keys(skillTypeGroups).map((type) => ({ type }));
}

export async function generateMetadata({
  params,
}: SkillTypePageProps): Promise<Metadata> {
  const { type } = await params;

  if (!isSkillType(type)) {
    return {
      title: "Skill Category Not Found",
    };
  }

  const group = skillTypeGroups[type];

  return createSeoMetadata({
    title: `${group.title} - Path of Exile 2 Skill Guides`,
    description: group.description,
    path: `/skills/${type}`,
    type: "article",
    keywords: [
      `POE2 ${group.title}`,
      "Path of Exile 2 skills",
      "POE2 skill guides",
    ],
  });
}

export default async function SkillTypePage({ params }: SkillTypePageProps) {
  const { type } = await params;

  if (!isSkillType(type)) {
    notFound();
  }

  const group = skillTypeGroups[type];
  const groupSkillSlugs = new Set<string>(group.slugs);

  const groupSkills = skills.filter((skill) => groupSkillSlugs.has(skill.slug));

  return (
    <main className="flex-1 bg-black text-white">
      <section className="border-b border-zinc-800 bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-orange-500">
            POE2 Skill Category
          </p>

          <h1 className="max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">
            {group.title}
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-400">
            {group.description}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
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
      </section>
    </main>
  );
}
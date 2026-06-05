import Link from "next/link";
import { BossCard } from "@/components/home/BossCard";
import { BuildCard } from "@/components/home/BuildCard";
import { HeroSection } from "@/components/home/HeroSection";
import { SectionHeading } from "@/components/home/SectionHeading";
import { bosses } from "@/data/bosses";
import { builds } from "@/data/builds";

const featuredBuilds = builds.slice(0, 3);
const featuredBosses = bosses.slice(0, 4);

const upcomingSections = [
  {
    id: "skills",
    title: "Skill Notes",
    href: "/skills",
    description:
      "Browse skill scaling, support gems, weapon requirements, and endgame use cases.",
  },
  {
  id: "tools",
  title: "Build Tools",
  href: "/builds",
  description:
    "Browse featured builds, archetypes, and reusable build planning notes.",
},
{
  id: "guides",
  title: "Leveling Guides",
  href: "/guides",
  description:
    "Browse leveling guides, skill explainers, and progression checklists.",
},
];

export default function HomePage() {
  return (
    <main className="flex-1 bg-black text-white">
      <HeroSection />

      <section
        id="builds"
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
      >
        <SectionHeading
          eyebrow="Builds"
          title="Featured Builds"
          description="Starter-friendly and endgame-ready setups for clear speed, survivability, and boss damage."
          meta="Updated for latest patch"
        />

        <div className="grid gap-6 md:grid-cols-3">
          {featuredBuilds.map((build) => (
            <BuildCard
              key={build.slug}
              title={build.title}
              tier={build.tier}
              description={build.summary}
              href={`/builds/${build.slug}`}
            />
          ))}
        </div>
      </section>

      <section id="bosses" className="border-y border-zinc-800 bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <SectionHeading
            eyebrow="Bosses"
            title="Popular Boss Guides"
            description="Phase breakdowns, positioning notes, and quick reads before your next attempt."
          />

          <div className="grid gap-6 md:grid-cols-2">
            {featuredBosses.map((boss) => (
              <BossCard
                key={boss.slug}
                title={boss.name}
                description={boss.summary}
                href={`/bosses/${boss.slug}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section
        id="guides"
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
      >
        <SectionHeading
          eyebrow="Guides"
          title="Leveling, Skills, and Tools"
          description="Expandable guide sections are ready for campaign walkthroughs, skill explainers, build planners, and DPS tools."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {upcomingSections.map((item) => (
            <Link
              id={item.id}
              key={item.title}
              href={item.href}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 transition hover:border-orange-500"
            >
              <h3 className="text-xl font-black text-white">{item.title}</h3>
              <p className="mt-3 leading-7 text-zinc-400">
                {item.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

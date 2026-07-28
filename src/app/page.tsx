import Link from "next/link";
import { BossCard } from "@/components/home/BossCard";
import { BuildCard } from "@/components/home/BuildCard";
import { HeroSection } from "@/components/home/HeroSection";
import { SectionHeading } from "@/components/home/SectionHeading";
import { bosses } from "@/data/bosses";
import { builds } from "@/data/builds";

const featuredBuilds = builds.slice(0, 3);
const featuredBosses = bosses.slice(0, 4);

const recommendedPaths = [
  {
    title: "Browse Builds",
    href: "/builds",
    description: "Compare practical archetypes for mapping, bossing, and progression.",
  },
  {
    title: "Study Bosses",
    href: "/bosses",
    description: "Review boss mechanics, damage types, weaknesses, and fight plans.",
  },
  {
    title: "Explore Skills",
    href: "/skills",
    description: "Find skill scaling notes, related builds, and boss-use cases.",
  },
  {
    title: "Read Guides",
    href: "/guides",
    description: "Use deeper guides for skills, builds, bossing, and leveling routes.",
  },
  {
    title: "Executioner Boss Guide",
    href: "/bosses/executioner",
    description: "Start with the indexed boss guide and learn a clean melee fight plan.",
  },
  {
    title: "Lightning Arrow",
    href: "/skills/lightning-arrow",
    description: "Open the strongest typed skill page for bow clear and boss setup notes.",
  },
  {
    title: "Ice Spear Guide",
    href: "/guides/skills/ice-spear",
    description: "Learn cold projectile scaling, support choices, and boss positioning.",
  },
  {
    title: "Flame Wall Guide",
    href: "/guides/skills/flame-wall",
    description: "Build around burning ground, safe casting windows, and fire supports.",
  },
  {
    title: "Ice Nova Guide",
    href: "/guides/skills/ice-nova",
    description: "Use area control, freeze pressure, and smart positioning for progression.",
  },
  {
    title: "Poison Arrow Guide",
    href: "/guides/skills/poison-arrow",
    description: "Scale chaos damage over time with safer uptime against tough enemies.",
  },
];

const guideClusters = [
  {
    title: "Skill Guides",
    href: "/guides",
    description:
      "Deep skill pages for mechanics, support gems, strengths, weaknesses, leveling, and endgame use.",
  },
  {
    title: "Boss Guides",
    href: "/bosses",
    description:
      "Encounter pages for phases, dangerous attacks, damage types, and quick strategy checklists.",
  },
  {
    title: "Build Guides",
    href: "/builds",
    description:
      "Build routes that connect core skills to campaign progression and boss readiness.",
  },
  {
    title: "Beginner / Leveling Guides",
    href: "/guides",
    description:
      "Progression resources for choosing skills, improving defenses, and avoiding common early mistakes.",
  },
];

const popularAuthorityGuides = [
  {
    title: "Lightning Arrow",
    href: "/guides/skills/lightning-arrow",
    cluster: "Skill Guide",
  },
  {
    title: "Ice Spear",
    href: "/guides/skills/ice-spear",
    cluster: "Skill Guide",
  },
  {
    title: "Flame Wall",
    href: "/guides/skills/flame-wall",
    cluster: "Skill Guide",
  },
  {
    title: "Ice Nova",
    href: "/guides/skills/ice-nova",
    cluster: "Skill Guide",
  },
  {
    title: "Poison Arrow",
    href: "/guides/skills/poison-arrow",
    cluster: "Skill Guide",
  },
  {
    title: "Executioner",
    href: "/bosses/executioner",
    cluster: "Boss Guide",
  },
  {
    title: "Count Geonor",
    href: "/bosses/count-geonor",
    cluster: "Boss Guide",
  },
  {
    title: "Fire Warden",
    href: "/bosses/fire-warden",
    cluster: "Boss Guide",
  },
];

const importantBuildLinks = [
  {
    title: "Lightning Ranger Build",
    href: "/builds/lightning-ranger",
  },
  {
    title: "Infernal Witch Build",
    href: "/builds/infernal-witch",
  },
  {
    title: "Poison Assassin Build",
    href: "/builds/poison-assassin",
  },
  {
    title: "Earthshatter Warrior Build",
    href: "/builds/earthshatter-warrior",
  },
];

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

      <section className="border-b border-zinc-800 bg-zinc-950/70">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
          <div className="max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-orange-500">
              Start With The Core
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
              Practical POE2 builds, boss guides, skill guides, and progression
              resources
            </h2>
            <p className="mt-4 text-base leading-8 text-zinc-400">
              POE2 Forge is built to help players move from a question to a
              playable plan: choose a build, understand the skills that power it,
              prepare for key bosses, and use guide pages when a mechanic needs
              more detail. The homepage now connects the strongest skill and boss
              resources first so new visitors and crawlers can reach the main
              clusters quickly.
            </p>
          </div>
        </div>
      </section>

      <section
        id="start-here"
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
      >
        <SectionHeading
          eyebrow="Recommended Paths"
          title="Start Here"
          description="Use these routes to move between the main POE2 Forge clusters without guessing where the best starting point is."
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {recommendedPaths.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-xl border border-zinc-800 bg-zinc-950 p-5 transition hover:border-orange-500 hover:bg-zinc-900"
            >
              <h3 className="text-base font-black text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-400">
                {item.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-zinc-800 bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <SectionHeading
            eyebrow="Guide Clusters"
            title="Core POE2 Guide Clusters"
            description="The site is organized around four practical paths: skills, bosses, builds, and progression support."
          />

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {guideClusters.map((cluster) => (
              <Link
                key={cluster.title}
                href={cluster.href}
                className="rounded-xl border border-zinc-800 bg-black p-5 transition hover:border-orange-500"
              >
                <h3 className="text-lg font-black text-white">
                  {cluster.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-zinc-400">
                  {cluster.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section
        id="authority-guides"
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
      >
        <SectionHeading
          eyebrow="Authority Guides"
          title="Popular Authority Guides"
          description="Jump into upgraded skill and boss pages that anchor the strongest current POE2 Forge content clusters."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {popularAuthorityGuides.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="rounded-xl border border-zinc-800 bg-zinc-950 p-5 transition hover:border-orange-500 hover:bg-zinc-900"
            >
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500">
                {guide.cluster}
              </span>
              <h3 className="mt-3 text-lg font-black text-white">
                {guide.title}
              </h3>
            </Link>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {importantBuildLinks.map((build) => (
            <Link
              key={build.href}
              href={build.href}
              className="rounded-xl border border-zinc-800 px-4 py-3 text-sm font-bold text-zinc-200 transition hover:border-orange-500 hover:text-orange-400"
            >
              {build.title}
            </Link>
          ))}
        </div>
      </section>

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

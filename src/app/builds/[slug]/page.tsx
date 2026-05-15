import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { bosses, getBossBySlug } from "@/data/bosses";
import { builds, getBuildBySlug } from "@/data/builds";
import { getSkillBySlug, skills } from "@/data/skills";
import {
  createBreadcrumbJsonLd,
  createGuideJsonLd,
  createSeoMetadata,
  stringifyJsonLd,
} from "@/lib/seo";

type BuildPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return builds.map((build) => ({
    slug: build.slug,
  }));
}

export async function generateMetadata({
  params,
}: BuildPageProps): Promise<Metadata> {
  const { slug } = await params;
  const build = getBuildBySlug(slug);

  if (!build) {
    return {
      title: "Build Not Found",
    };
  }

  const path = `/builds/${build.slug}`;
  const title = build.seoTitle ?? `${build.title} Guide`;
  const description =
    build.seoDescription ??
    `${build.summary} Learn core skills, recommended gear, leveling tips, strengths, weaknesses, and endgame notes for this ${build.className} build.`;

  return {
    ...createSeoMetadata({
      title,
      description,
      path,
      type: "article",
      keywords: [
        build.title,
        build.className,
        build.tier,
        build.playstyle,
        "POE2 build guide",
      ],
    }),
  };
}

function DetailSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-6">
      <h2 className="text-2xl font-black text-white">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3 text-zinc-400">
      {items.map((item) => (
        <li key={item} className="flex gap-3 leading-7">
          <span className="mt-3 size-1.5 shrink-0 rounded-full bg-orange-500" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function RelatedLinks({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  if (!links.length) {
    return null;
  }

  return (
    <DetailSection title={title}>
      <div className="grid gap-3 sm:grid-cols-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-xl border border-zinc-800 bg-black p-4 font-bold text-zinc-200 transition hover:border-orange-500 hover:text-orange-400"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </DetailSection>
  );
}

export default async function BuildDetailPage({ params }: BuildPageProps) {
  const { slug } = await params;
  const build = getBuildBySlug(slug);

  if (!build) {
    notFound();
  }

  const path = `/builds/${build.slug}`;
  const breadcrumbJsonLd = createBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Builds", path: "/builds" },
    { name: build.title, path },
  ]);
  const guideJsonLd = createGuideJsonLd({
    title: build.seoTitle ?? `${build.title} Guide`,
    description: build.seoDescription ?? build.summary,
    path,
    section: "Path of Exile 2 Build Guide",
    keywords: [
      build.title,
      build.className,
      build.tier,
      build.playstyle,
      ...build.coreSkills,
    ],
  });
  const relatedSkillLinks = (build.relatedSkills ?? [])
    .map((slug) => getSkillBySlug(slug))
    .filter((skill): skill is (typeof skills)[number] => Boolean(skill))
    .map((skill) => ({
      label: skill.name,
      href: `/skills/${skill.slug}`,
    }));
  const relatedBossLinks = (build.relatedBosses ?? [])
    .map((slug) => getBossBySlug(slug))
    .filter((boss): boss is (typeof bosses)[number] => Boolean(boss))
    .map((boss) => ({
      label: boss.name,
      href: `/bosses/${boss.slug}`,
    }));

  return (
    <main className="flex-1 bg-black text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: stringifyJsonLd(breadcrumbJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: stringifyJsonLd(guideJsonLd),
        }}
      />
      <section className="border-b border-zinc-800 bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <Link
            href="/builds"
            className="text-sm font-bold text-orange-500 transition hover:text-orange-400"
          >
            &lt;- Back to builds
          </Link>

          <div className="mt-8 flex flex-wrap gap-2">
            {[build.tier, build.className, build.playstyle, build.difficulty].map(
              (item) => (
                <span
                  key={item}
                  className="rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-xs font-bold text-orange-400"
                >
                  {item}
                </span>
              ),
            )}
          </div>

          <h1 className="mt-5 max-w-5xl text-4xl font-black tracking-tight sm:text-6xl">
            {build.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-400">
            {build.summary}
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <DetailSection title="Overview">
          <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Class", build.className],
              ["Tier", build.tier],
              ["Playstyle", build.playstyle],
              ["Difficulty", build.difficulty],
              ["Patch", build.patchVersion ?? "Not specified"],
              ["Last Updated", build.lastUpdated ?? "Not specified"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-xl border border-zinc-800 bg-black p-4"
              >
                <dt className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
                  {label}
                </dt>
                <dd className="mt-2 font-bold text-zinc-200">{value}</dd>
              </div>
            ))}
          </dl>
        </DetailSection>

        <div className="grid gap-6 lg:grid-cols-2">
          <DetailSection title="Strengths">
            <BulletList items={build.strengths} />
          </DetailSection>

          <DetailSection title="Weaknesses">
            <BulletList items={build.weaknesses} />
          </DetailSection>
        </div>

        <DetailSection title="Core Skills">
          <BulletList items={build.coreSkills} />
        </DetailSection>

        <DetailSection title="Recommended Gear">
          <BulletList items={build.recommendedGear} />
        </DetailSection>

        <DetailSection title="Leveling Tips">
          <BulletList items={build.levelingTips} />
        </DetailSection>

        <DetailSection title="Endgame Notes">
          <BulletList items={build.endgameNotes} />
        </DetailSection>

        <RelatedLinks title="Related Skills" links={relatedSkillLinks} />

        <RelatedLinks title="Related Boss Guides" links={relatedBossLinks} />

        <RelatedLinks
  title="Related Skill Guides"
  links={relatedSkillLinks}
/>

        <DetailSection title="FAQ">
          <div className="grid gap-4">
            {(build.faq ?? []).map((item) => (
              <div
                key={item.question}
                className="rounded-xl border border-zinc-800 bg-black p-4"
              >
                <h3 className="font-bold text-white">{item.question}</h3>
                <p className="mt-2 leading-7 text-zinc-400">{item.answer}</p>
              </div>
            ))}
          </div>
        </DetailSection>

        {build.contentNotes ? (
          <DetailSection title="Content Notes">
            <p className="leading-7 text-zinc-400">{build.contentNotes}</p>
          </DetailSection>
        ) : null}
      </div>
    </main>
  );
}

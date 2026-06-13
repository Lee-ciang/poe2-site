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

type BossPageProps = {
  params: Promise<{ slug: string }>;
};

const frontendTrustSignalPattern =
  /\b(AI Draft|AI-assisted|AI assisted|AI-generated|AI generated|Verification Notes|Content Notes|Must be verified|Verify against patch|Verify against current patch|Outdated Patch|Early Access|Patch verification required)\b/i;

export function generateStaticParams() {
  return bosses.map((boss) => ({
    slug: boss.slug,
  }));
}

export async function generateMetadata({
  params,
}: BossPageProps): Promise<Metadata> {
  const { slug } = await params;
  const boss = getBossBySlug(slug);

  if (!boss) {
    return {
      title: "Boss Guide Not Found",
    };
  }

  const path = `/bosses/${boss.slug}`;
  const title = boss.seoTitle ?? `${boss.name} Boss Guide`;
  const description =
    boss.seoDescription ??
    `${boss.summary} Learn phases, damage types, weaknesses, recommended builds, rewards, tips, and key mechanics for this Path of Exile 2 boss.`;

  return {
    ...createSeoMetadata({
      title,
      description,
      path,
      type: "article",
      keywords: [
        boss.name,
        boss.location,
        boss.difficulty,
        ...boss.damageTypes,
        "POE2 boss guide",
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

export default async function BossDetailPage({ params }: BossPageProps) {
  const { slug } = await params;
  const boss = getBossBySlug(slug);

  if (!boss) {
    notFound();
  }

  const path = `/bosses/${boss.slug}`;
  const breadcrumbJsonLd = createBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Bosses", path: "/bosses" },
    { name: boss.name, path },
  ]);
  const guideJsonLd = createGuideJsonLd({
    title: boss.seoTitle ?? `${boss.name} Boss Guide`,
    description: boss.seoDescription ?? boss.summary,
    path,
    section: "Path of Exile 2 Boss Guide",
    keywords: [
      boss.name,
      boss.location,
      boss.difficulty,
      ...boss.damageTypes,
      ...boss.weaknesses,
    ],
  });
  const relatedBuildLinks = (boss.relatedBuilds ?? [])
    .map((slug) => getBuildBySlug(slug))
    .filter((build): build is (typeof builds)[number] => Boolean(build))
    .map((build) => ({
      label: build.title,
      href: `/builds/${build.slug}`,
    }));
  const relatedSkillLinks = (boss.relatedSkills ?? [])
    .map((slug) => getSkillBySlug(slug))
    .filter((skill): skill is (typeof skills)[number] => Boolean(skill))
    .map((skill) => ({
      label: skill.name,
      href: `/skills/${skill.slug}`,
    }));
  const overviewRows = [
    ["Location", boss.location],
    ["Difficulty", boss.difficulty],
    ["Damage Types", boss.damageTypes.join(", ")],
    ["Weaknesses", boss.weaknesses.join(", ")],
    ["Patch", boss.patchVersion ?? "Not specified"],
    ["Last Updated", boss.lastUpdated ?? "Not specified"],
  ].filter(([, value]) => !frontendTrustSignalPattern.test(value));

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
            href="/bosses"
            className="text-sm font-bold text-orange-500 transition hover:text-orange-400"
          >
            &lt;- Back to bosses
          </Link>

          <div className="mt-8 flex flex-wrap gap-2">
            {[boss.difficulty, boss.location, ...boss.damageTypes].map((item) => (
              <span
                key={item}
                className="rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-xs font-bold text-orange-400"
              >
                {item}
              </span>
            ))}
          </div>

          <h1 className="mt-5 max-w-5xl text-4xl font-black tracking-tight sm:text-6xl">
            {boss.name} Boss Guide
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-400">
            {boss.summary}
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <DetailSection title="Overview">
          <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {overviewRows.map(([label, value]) => (
              <div
                key={label}
                className="rounded-xl border border-zinc-800 bg-black p-4"
              >
                <dt className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
                  {label}
                </dt>
                <dd className="mt-2 font-bold leading-6 text-zinc-200">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </DetailSection>

        <div className="grid gap-6 lg:grid-cols-2">
          <DetailSection title="Location">
            <p className="leading-7 text-zinc-400">{boss.location}</p>
          </DetailSection>

          <DetailSection title="Difficulty">
            <p className="leading-7 text-zinc-400">{boss.difficulty}</p>
          </DetailSection>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <DetailSection title="Damage Types">
            <BulletList items={boss.damageTypes} />
          </DetailSection>

          <DetailSection title="Weaknesses">
            <BulletList items={boss.weaknesses} />
          </DetailSection>
        </div>

        <DetailSection title="Phases">
          <BulletList items={boss.phases} />
        </DetailSection>

        <DetailSection title="Key Mechanics">
          <BulletList items={boss.keyMechanics} />
        </DetailSection>

        <DetailSection title="Recommended Builds">
          <BulletList items={boss.recommendedBuilds} />
        </DetailSection>

        <DetailSection title="Rewards">
          <BulletList items={boss.rewards} />
        </DetailSection>

        <DetailSection title="Tips">
          <BulletList items={boss.tips} />
        </DetailSection>

        <RelatedLinks title="Related Builds" links={relatedBuildLinks} />

        <RelatedLinks title="Related Skills" links={relatedSkillLinks} />

        <DetailSection title="FAQ">
          <div className="grid gap-4">
            {(boss.faq ?? []).map((item) => (
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
      </div>
    </main>
  );
}

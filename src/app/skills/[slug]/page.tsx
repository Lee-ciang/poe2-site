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

type SkillPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return skills.map((skill) => ({
    slug: skill.slug,
  }));
}

export async function generateMetadata({
  params,
}: SkillPageProps): Promise<Metadata> {
  const { slug } = await params;
  const skill = getSkillBySlug(slug);

  if (!skill) {
    return {
      title: "Skill Not Found",
    };
  }

  const path = `/skills/${skill.slug}`;
  const title = skill.seoTitle ?? `${skill.name} Skill Guide`;
  const description =
    skill.seoDescription ??
    `${skill.summary} Learn scaling stats, best supports, recommended builds, strengths, weaknesses, leveling notes, and endgame use.`;

  return {
    ...createSeoMetadata({
      title,
      description,
      path,
      type: "article",
      keywords: [
        skill.name,
        skill.category,
        skill.damageType,
        skill.weaponRequirement,
        "POE2 skill guide",
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

export default async function SkillDetailPage({ params }: SkillPageProps) {
  const { slug } = await params;
  const skill = getSkillBySlug(slug);

  if (!skill) {
    notFound();
  }

  const path = `/skills/${skill.slug}`;
  const breadcrumbJsonLd = createBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Skills", path: "/skills" },
    { name: skill.name, path },
  ]);
  const guideJsonLd = createGuideJsonLd({
    title: skill.seoTitle ?? `${skill.name} Skill Guide`,
    description: skill.seoDescription ?? skill.summary,
    path,
    section: "Path of Exile 2 Skill Guide",
    keywords: [
      skill.name,
      skill.category,
      skill.damageType,
      skill.weaponRequirement,
      ...skill.bestSupports,
    ],
  });
  const relatedBuildLinks = (skill.relatedBuilds ?? [])
    .map((slug) => getBuildBySlug(slug))
    .filter((build): build is (typeof builds)[number] => Boolean(build))
    .map((build) => ({
      label: build.title,
      href: `/builds/${build.slug}`,
    }));
  const relatedBossLinks = (skill.relatedBosses ?? [])
    .map((slug) => getBossBySlug(slug))
    .filter((boss): boss is (typeof bosses)[number] => Boolean(boss))
    .map((boss) => ({
      label: boss.name,
      href: `/bosses/${boss.slug}`,
    }));
    const relatedSkillLinks = (skill.relatedSkills ?? [])
  .map((slug) => getSkillBySlug(slug))
  .filter((relatedSkill): relatedSkill is (typeof skills)[number] =>
    Boolean(relatedSkill),
  )
  .map((relatedSkill) => ({
    label: `${relatedSkill.name} Skill Guide`,
    href: `/guides/skills/${relatedSkill.slug}`,
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
            href="/skills"
            className="text-sm font-bold text-orange-500 transition hover:text-orange-400"
          >
            &lt;- Back to skills
          </Link>

          <div className="mt-8 flex flex-wrap gap-2">
            {[skill.category, skill.damageType, skill.weaponRequirement].map(
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
            {skill.name} Skill Guide
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-400">
            {skill.summary}
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <DetailSection title="Overview">
          <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Category", skill.category],
              ["Damage Type", skill.damageType],
              ["Weapon Requirement", skill.weaponRequirement],
              ["Patch", skill.patchVersion ?? "Not specified"],
              ["Last Updated", skill.lastUpdated ?? "Not specified"],
            ].map(([label, value]) => (
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

        <div className="grid gap-6 lg:grid-cols-3">
          <DetailSection title="Category">
            <p className="leading-7 text-zinc-400">{skill.category}</p>
          </DetailSection>

          <DetailSection title="Damage Type">
            <p className="leading-7 text-zinc-400">{skill.damageType}</p>
          </DetailSection>

          <DetailSection title="Weapon Requirement">
            <p className="leading-7 text-zinc-400">
              {skill.weaponRequirement}
            </p>
          </DetailSection>
        </div>

        <DetailSection title="Scaling Stats">
          <BulletList items={skill.scalingStats} />
        </DetailSection>

        <DetailSection title="Best Supports">
          <BulletList items={skill.bestSupports} />
        </DetailSection>

        <DetailSection title="Recommended Builds">
          <BulletList items={skill.recommendedBuilds} />
        </DetailSection>

        <div className="grid gap-6 lg:grid-cols-2">
          <DetailSection title="Strengths">
            <BulletList items={skill.strengths} />
          </DetailSection>

          <DetailSection title="Weaknesses">
            <BulletList items={skill.weaknesses} />
          </DetailSection>
        </div>

        <DetailSection title="Leveling Notes">
          <BulletList items={skill.levelingNotes} />
        </DetailSection>

        <DetailSection title="Endgame Use">
          <BulletList items={skill.endgameUse} />
        </DetailSection>

        <RelatedLinks title="Related Builds" links={relatedBuildLinks} />

        <RelatedLinks title="Related Boss Guides" links={relatedBossLinks} />

        <RelatedLinks
  title="Related Skill Guides"
  links={relatedSkillLinks}
/>

        <RelatedLinks title="Related Skill Guides" links={relatedSkillLinks} />

        <DetailSection title="FAQ">
          <div className="grid gap-4">
            {(skill.faq ?? []).map((item) => (
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

        {skill.contentNotes ? (
          <DetailSection title="Content Notes">
            <p className="leading-7 text-zinc-400">{skill.contentNotes}</p>
          </DetailSection>
        ) : null}
      </div>
    </main>
  );
}

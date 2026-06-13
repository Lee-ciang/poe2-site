import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  type GuideType,
  getAllMarkdownGuides,
  getMarkdownGuide,
  getMarkdownGuideParams,
} from "@/lib/markdown";
import { createFaqJsonLd, createSeoMetadata, stringifyJsonLd } from "@/lib/seo";
import {
  getAllProgrammaticGuides,
  getProgrammaticGuideBySlug,
} from "@/lib/programmatic-markdown";

type GuidePageProps = {
  params: Promise<{
    type: string;
    slug: string;
  }>;
};

const relatedRoutes = {
  relatedBuilds: "/builds",
  relatedBosses: "/bosses",
  relatedSkills: "/skills",
} as const;

const relatedLabels = {
  relatedBuilds: "Related Builds",
  relatedBosses: "Related Boss Guides",
  relatedSkills: "Related Skills",
} as const;

const frontendTrustSignalPattern =
  /\b(AI Draft|AI-assisted|AI assisted|AI-generated|AI generated|Verification Notes|Content Notes|Must be verified|Verify against patch|Verify against current patch|Outdated Patch|Early Access|Patch verification required)\b/i;

function isGuideType(type: string): type is GuideType {
  return type === "builds" || type === "bosses" || type === "skills";
}

function formatTitle(slug: string) {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function renderInline(text: string) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);

  return parts.map((part, index) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);

    if (!match) {
      return part;
    }

    return (
      <Link
        key={`${part}-${index}`}
        href={match[2]}
        className="font-bold text-orange-400 hover:text-orange-300"
      >
        {match[1]}
      </Link>
    );
  });
}

function isLegacyRelatedHeading(line: string) {
  return /^##\s+(Related Guides|Related .* Guides|Related Skill Guides|Internal Link Suggestions)\s*$/i.test(
    line,
  );
}

function isFrontendTrustHeading(line: string) {
  return /^##\s+(Verification Notes|Content Notes)\s*$/i.test(line);
}

function isFrontendTrustSignal(value: string | undefined) {
  return Boolean(value && frontendTrustSignalPattern.test(value));
}

function cleanFrontendText(value: string | undefined) {
  if (!value) {
    return value;
  }

  return value
    .replace(/,?\s*and content verification notes/gi, "")
    .replace(frontendTrustSignalPattern, "")
    .replace(/,\s*\./g, ".")
    .replace(/\s+\./g, ".")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function extractLegacyRelatedGuidePaths(body: string) {
  const paths = new Set<string>();
  const lines = body.replace(/\r\n/g, "\n").split("\n");

  for (let index = 0; index < lines.length; index += 1) {
    if (!isLegacyRelatedHeading(lines[index].trim())) {
      continue;
    }

    for (
      let sectionIndex = index + 1;
      sectionIndex < lines.length &&
      !/^##\s+/.test(lines[sectionIndex].trim());
      sectionIndex += 1
    ) {
      const matches = lines[sectionIndex].matchAll(/\/guides\/[a-z0-9_./-]+/gi);

      for (const match of matches) {
        paths.add(match[0].replace(/[).,]+$/, ""));
      }
    }
  }

  return [...paths];
}

function getRenderableLines(body: string) {
  const sourceLines = body.replace(/\r\n/g, "\n").split("\n");
  const lines: string[] = [];

  for (let index = 0; index < sourceLines.length; index += 1) {
    const trimmed = sourceLines[index].trim();

    if (isLegacyRelatedHeading(trimmed) || isFrontendTrustHeading(trimmed)) {
      while (
        index + 1 < sourceLines.length &&
        !/^##\s+/.test(sourceLines[index + 1].trim())
      ) {
        index += 1;
      }

      continue;
    }

    lines.push(sourceLines[index]);
  }

  return lines;
}

function MarkdownContent({ body }: { body: string }) {
  const lines = getRenderableLines(body);
  const nodes: React.ReactNode[] = [];

  for (let index = 0; index < lines.length; index += 1) {
    const trimmed = lines[index].trim();

    if (!trimmed) {
      continue;
    }

    if (trimmed.startsWith("### ")) {
      nodes.push(
        <h3
          key={`${trimmed}-${index}`}
          className="text-xl font-black text-white"
        >
          {trimmed.replace(/^### /, "")}
        </h3>,
      );

      continue;
    }

    if (trimmed.startsWith("## ")) {
      nodes.push(
        <h2
          key={`${trimmed}-${index}`}
          className="pt-4 text-2xl font-black text-white sm:text-3xl"
        >
          {trimmed.replace(/^## /, "")}
        </h2>,
      );

      continue;
    }

    if (trimmed.startsWith("# ")) {
      nodes.push(
        <h2
          key={`${trimmed}-${index}`}
          className="pt-4 text-2xl font-black text-white sm:text-3xl"
        >
          {trimmed.replace(/^# /, "")}
        </h2>,
      );

      continue;
    }

    if (trimmed.startsWith("- ")) {
      const items: string[] = [];

      while (index < lines.length && lines[index].trim().startsWith("- ")) {
        items.push(lines[index].trim().replace(/^- /, ""));
        index += 1;
      }

      index -= 1;

      nodes.push(
        <ul key={`${trimmed}-${index}`} className="grid gap-3 text-zinc-400">
          {items.map((item) => (
            <li key={item} className="flex gap-3 leading-7">
              <span className="mt-3 size-1.5 shrink-0 rounded-full bg-orange-500" />
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ul>,
      );

      continue;
    }

    const paragraphLines = [trimmed];

    while (
      index + 1 < lines.length &&
      lines[index + 1].trim() &&
      !lines[index + 1].trim().startsWith("#") &&
      !lines[index + 1].trim().startsWith("- ") &&
      !isLegacyRelatedHeading(lines[index + 1].trim())
    ) {
      index += 1;
      paragraphLines.push(lines[index].trim());
    }

    nodes.push(
      <p key={`${trimmed}-${index}`} className="leading-8 text-zinc-400">
        {renderInline(paragraphLines.join(" ").replace(/\s{2,}/g, " "))}
      </p>,
    );
  }

  return (
    <div className="grid gap-6">
      {nodes}
    </div>
  );
}

export function generateStaticParams() {
  const markdownParams = getMarkdownGuideParams();

  const programmaticParams = getAllProgrammaticGuides().map((guide) => ({
    type: guide.type,
    slug: guide.slug,
  }));

  return [...markdownParams, ...programmaticParams];
}

export async function generateMetadata({
  params,
}: GuidePageProps): Promise<Metadata> {
  const { type, slug } = await params;

  if (!isGuideType(type)) {
    return {
      title: "Guide Not Found",
    };
  }

  const guide =
  getMarkdownGuide(type, slug) ??
  getProgrammaticGuideBySlug(type, slug);

  if (!guide) {
    return {
      title: "Guide Not Found",
    };
  }
  
  const metadataTitle =
    cleanFrontendText(guide.metadata.seoTitle ?? guide.metadata.title) ??
    guide.metadata.title;

  return createSeoMetadata({
    title: metadataTitle,
    description:
      cleanFrontendText(guide.metadata.seoDescription) ??
      `Read the ${guide.metadata.title} guide for Path of Exile 2.`,
    path: guide.path,
    type: "article",
    keywords: [metadataTitle, guide.metadata.type, "POE2 Markdown guide"],
  });
}

export default async function MarkdownGuidePage({ params }: GuidePageProps) {
  const { type, slug } = await params;

  if (!isGuideType(type)) {
    notFound();
  }

  const guide =
  getMarkdownGuide(type, slug) ??
  getProgrammaticGuideBySlug(type, slug);

  if (!guide) {
    notFound();
  }

  const faqJsonLd =
  guide.faqItems.length > 0 ? createFaqJsonLd(guide.faqItems) : null;

  const allGuideCandidates = [
    ...getAllMarkdownGuides(),
    ...getAllProgrammaticGuides(),
  ];
  const guideCandidateByPath = new Map(
    allGuideCandidates.map((candidate) => [candidate.path, candidate]),
  );
  const suggestedGuidePaths = [
    ...extractLegacyRelatedGuidePaths(guide.body),
    ...guide.suggestedGuidePaths,
  ].filter((path, index, paths) => {
    return (
      path !== guide.path &&
      paths.indexOf(path) === index &&
      guideCandidateByPath.has(path)
    );
  });
  const suggestedGuides = suggestedGuidePaths
    .map((path) => guideCandidateByPath.get(path))
    .filter((candidate): candidate is NonNullable<typeof candidate> =>
      Boolean(candidate),
    );
  const heroDescription = cleanFrontendText(guide.metadata.seoDescription);
  const displayTitle = cleanFrontendText(guide.metadata.title) ?? guide.metadata.title;
  const shouldShowPatchVersion = !isFrontendTrustSignal(
    guide.metadata.patchVersion,
  );

  return (
    <main className="flex-1 bg-black text-white">
      {faqJsonLd ? (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: stringifyJsonLd(faqJsonLd),
    }}
  />
) : null}
      <section className="border-b border-zinc-800 bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <Link
            href="/guides"
            className="text-sm font-bold text-orange-500 transition hover:text-orange-400"
          >
            &lt;- Back to guides
          </Link>

          <div className="mt-8 flex flex-wrap gap-2">
            <span className="rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-xs font-bold text-orange-400">
              {guide.metadata.type}
            </span>
            {shouldShowPatchVersion && guide.metadata.patchVersion ? (
              <span className="rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-xs font-bold text-orange-400">
                {guide.metadata.patchVersion}
              </span>
            ) : null}
            {guide.metadata.lastUpdated ? (
              <span className="rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-xs font-bold text-orange-400">
                Updated {guide.metadata.lastUpdated}
              </span>
            ) : null}
            <span className="rounded-full border border-zinc-700 bg-zinc-950 px-3 py-1 text-xs font-bold text-zinc-300">
           {guide.metrics.readingTimeMinutes} min read
              </span>
              <span className="rounded-full border border-zinc-700 bg-zinc-950 px-3 py-1 text-xs font-bold text-zinc-300">
              SEO Score {guide.metrics.qualityScore}/100
              </span>
              {guide.metrics.isStale ? (
             <span className="rounded-full border border-yellow-500/30 bg-yellow-500/10 px-3 py-1 text-xs font-bold text-yellow-300">
              Needs update
             </span>
            ) : null}
          </div>

          <h1 className="mt-5 max-w-5xl text-4xl font-black tracking-tight sm:text-6xl">
            {displayTitle}
          </h1>
          {heroDescription ? (
            <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-400">
              {heroDescription}
            </p>
          ) : null}
        </div>
      </section>

      <div className="mx-auto grid max-w-4xl gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <article className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-6 sm:p-8">
          <MarkdownContent body={guide.body} />
        </article>

        {(
  guide.metadata.relatedBuilds.length ||
  guide.metadata.relatedBosses.length ||
  guide.metadata.relatedSkills.length
) ? (
  <section className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-6">
    <h2 className="text-2xl font-black text-white">Related Links</h2>

    <div className="mt-5 grid gap-5">
      {(
        [
          "relatedBuilds",
          "relatedBosses",
          "relatedSkills",
        ] as const
      ).map((field) => {
        const values = guide.metadata[field];

        if (!values.length) {
          return null;
        }

        return (
          <div key={field}>
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-500">
              {relatedLabels[field]}
            </h3>

            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {values.map((relatedSlug) => (
                <Link
                  key={`${field}-${relatedSlug}`}
                  href={`${relatedRoutes[field]}/${relatedSlug}`}
                  className="rounded-xl border border-zinc-800 bg-black p-4 font-bold text-zinc-200 transition hover:border-orange-500 hover:text-orange-400"
                >
                  {formatTitle(relatedSlug)}
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  </section>
) : null}
      </div>

<section className="border-t border-zinc-800 bg-zinc-950/50">
  <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
    <h2 className="text-2xl font-black text-white">
      Recommended Related Guides
    </h2>

    <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {suggestedGuides.map((suggestedGuide) => (
        <Link
          key={suggestedGuide.path}
          href={suggestedGuide.path}
          className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5 transition hover:border-orange-500"
        >
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-xs font-bold text-orange-400">
              {suggestedGuide.metadata.type}
            </span>

            <span className="rounded-full border border-zinc-700 bg-zinc-950 px-3 py-1 text-xs font-bold text-zinc-300">
              SEO {suggestedGuide.metrics.qualityScore}
            </span>
          </div>

          <h3 className="mt-4 text-xl font-black text-white">
            {cleanFrontendText(suggestedGuide.metadata.title) ??
              suggestedGuide.metadata.title}
          </h3>

          {cleanFrontendText(suggestedGuide.metadata.seoDescription) ? (
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              {cleanFrontendText(suggestedGuide.metadata.seoDescription)}
            </p>
          ) : null}
        </Link>
      ))}
    </div>
  </div>
</section>

    </main>
  );
}

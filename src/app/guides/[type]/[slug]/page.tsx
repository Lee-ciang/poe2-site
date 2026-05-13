import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  type GuideType,
  getMarkdownGuide,
  getMarkdownGuideParams,
} from "@/lib/markdown";
import { createFaqJsonLd, createSeoMetadata, stringifyJsonLd } from "@/lib/seo";

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

function MarkdownContent({ body }: { body: string }) {
  const blocks = body.split(/\n{2,}/);

  return (
    <div className="grid gap-6">
      {blocks.map((block, index) => {
        const trimmed = block.trim();

        if (trimmed.startsWith("## ")) {
          return (
            <h2
              key={`${trimmed}-${index}`}
              className="pt-4 text-3xl font-black text-white"
            >
              {trimmed.replace(/^## /, "")}
            </h2>
          );
        }

        if (trimmed.startsWith("### ")) {
          return (
            <h3
              key={`${trimmed}-${index}`}
              className="text-xl font-black text-white"
            >
              {trimmed.replace(/^### /, "")}
            </h3>
          );
        }

        if (trimmed.includes("\n- ")) {
          const items = trimmed
            .split(/\r?\n/)
            .filter((line) => line.startsWith("- "))
            .map((line) => line.replace(/^- /, ""));

          return (
            <ul key={`${trimmed}-${index}`} className="grid gap-3 text-zinc-400">
              {items.map((item) => (
                <li key={item} className="flex gap-3 leading-7">
                  <span className="mt-3 size-1.5 shrink-0 rounded-full bg-orange-500" />
                  <span>{renderInline(item)}</span>
                </li>
              ))}
            </ul>
          );
        }

        return (
          <p key={`${trimmed}-${index}`} className="leading-8 text-zinc-400">
            {renderInline(trimmed)}
          </p>
        );
      })}
    </div>
  );
}

export function generateStaticParams() {
  return getMarkdownGuideParams();
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

  const guide = getMarkdownGuide(type, slug);

  if (!guide) {
    return {
      title: "Guide Not Found",
    };
  }
  
  return createSeoMetadata({
    title: guide.metadata.seoTitle ?? guide.metadata.title,
    description:
      guide.metadata.seoDescription ??
      `Read the ${guide.metadata.title} guide for Path of Exile 2.`,
    path: guide.path,
    type: "article",
    keywords: [guide.metadata.title, guide.metadata.type, "POE2 Markdown guide"],
  });
}

export default async function MarkdownGuidePage({ params }: GuidePageProps) {
  const { type, slug } = await params;

  if (!isGuideType(type)) {
    notFound();
  }

  const guide = getMarkdownGuide(type, slug);

  if (!guide) {
    notFound();
  }

  const faqJsonLd =
  guide.faqItems.length > 0 ? createFaqJsonLd(guide.faqItems) : null;

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
            {guide.metadata.patchVersion ? (
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
          </div>

          <h1 className="mt-5 max-w-5xl text-4xl font-black tracking-tight sm:text-6xl">
            {guide.metadata.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-400">
            {guide.metadata.seoDescription}
          </p>
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
    </main>
  );
}

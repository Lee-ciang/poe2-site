import fs from "fs";
import path from "path";

type ContentPage = {
  slug: string;
  title: string;
  keywords: string[];
  authority?: number;
};

type ClusterExpansion = {
  cluster: string;
  currentPages: string[];
  supportingKeywords: string[];
  authorityScore: number;
  suggestedPages: {
    slug: string;
    title: string;
    reason: string;
  }[];
};

const contentIndexPath = path.join(
  process.cwd(),
  "data",
  "ai-seo",
  "content-index.json"
);

const outputPath = path.join(
  process.cwd(),
  "data",
  "ai-seo",
  "topic-cluster-expansion.json"
);

const expansionMap: Record<string, string[]> = {
  poison: [
    "poe2 poison leveling guide",
    "poe2 best poison skills",
    "poe2 chaos poison build",
  ],
  chaos: [
    "poe2 chaos damage guide",
    "poe2 chaos resistance guide",
    "poe2 chaos skill gems",
  ],
  projectile: [
    "poe2 projectile skills guide",
    "poe2 projectile support gems",
    "poe2 projectile build guide",
  ],
  slam: [
    "poe2 slam skills guide",
    "poe2 warrior slam build",
    "poe2 best slam support gems",
  ],
  melee: [
    "poe2 melee leveling guide",
    "poe2 melee skill guide",
    "poe2 best melee support gems",
  ],
  fire: [
    "poe2 fire damage guide",
    "poe2 fire skill gems",
    "poe2 ignite build guide",
  ],
};

function slugify(value: string): string {
  return (
    "/guides/" +
    value
      .toLowerCase()
      .replace(/poe2\s+/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
  );
}

function titleFromKeyword(value: string): string {
  return value
    .replace(/^poe2\s+/i, "")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function main() {
  if (!fs.existsSync(contentIndexPath)) {
    console.log("Topic Cluster Expansion Generator");
    console.log("Missing content index.");
    console.log(`Expected input: ${contentIndexPath}`);
    return;
  }

  const pages: ContentPage[] = JSON.parse(
    fs.readFileSync(contentIndexPath, "utf8")
  );

  const clusters = new Map<string, ContentPage[]>();

  for (const page of pages) {
    for (const keyword of page.keywords) {
      const normalized = keyword.toLowerCase().trim();

      if (!clusters.has(normalized)) {
        clusters.set(normalized, []);
      }

      clusters.get(normalized)!.push(page);
    }
  }

  const expansions: ClusterExpansion[] = Array.from(clusters.entries())
    .map(([cluster, clusterPages]) => {
      const supportingKeywords = expansionMap[cluster] || [
        `poe2 ${cluster} guide`,
        `poe2 best ${cluster} build`,
        `poe2 ${cluster} support gems`,
      ];

      const existingSlugs = new Set(pages.map((page) => page.slug));

      const suggestedPages = supportingKeywords
        .map((keyword) => ({
          slug: slugify(keyword),
          title: titleFromKeyword(keyword),
          reason: `Expand topical authority for the ${cluster} cluster.`,
        }))
        .filter((item) => !existingSlugs.has(item.slug));

      const authorityScore = clusterPages.reduce(
        (total, page) => total + (page.authority || 0),
        0
      );

      return {
        cluster,
        currentPages: clusterPages.map((page) => page.slug),
        supportingKeywords,
        authorityScore,
        suggestedPages,
      };
    })
    .sort((a, b) => b.authorityScore - a.authorityScore);

  const report = {
    generatedAt: new Date().toISOString(),
    clustersFound: expansions.length,
    expansions,
  };

  fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));

  console.log("Topic Cluster Expansion Generator");
  console.log(`Clusters found: ${expansions.length}`);
  console.log(`Output: ${outputPath}`);
}

main();
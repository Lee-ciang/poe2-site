import fs from "fs";
import path from "path";

type Page = {
  slug: string;
  title: string;
  keywords: string[];
  authority?: number;
};

type LinkOpportunity = {
  source: string;
  target: string;
  sharedKeywords: string[];
  relevanceScore: number;
  recommendedAnchor: string;
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
  "internal-link-opportunities.json"
);

function normalize(value: string): string {
  return value.toLowerCase().trim();
}

function calculateRelevance(
  source: Page,
  target: Page
): LinkOpportunity | null {
  if (source.slug === target.slug) return null;

  const sourceKeywords = source.keywords.map(normalize);
  const targetKeywords = target.keywords.map(normalize);

  const sharedKeywords = sourceKeywords.filter((keyword) =>
    targetKeywords.includes(keyword)
  );

  if (sharedKeywords.length === 0) {
    return null;
  }

  let score = sharedKeywords.length * 20;

  score += Math.min(target.authority || 0, 50);

  return {
    source: source.slug,
    target: target.slug,
    sharedKeywords,
    relevanceScore: score,
    recommendedAnchor: sharedKeywords[0],
  };
}

function main() {
  if (!fs.existsSync(contentIndexPath)) {
    console.log("Internal Link Opportunity Generator");
    console.log("No content index found.");
    console.log(`Expected input: ${contentIndexPath}`);
    console.log("");
    console.log("Create a content-index.json file first.");
    console.log("");
    console.log("Expected format:");
    console.log(
      JSON.stringify(
        [
          {
            slug: "/guides/skills/cobra-lash",
            title: "Cobra Lash Guide",
            keywords: ["poison", "chaos", "projectile"],
            authority: 18,
          },
        ],
        null,
        2
      )
    );
    return;
  }

  const pages: Page[] = JSON.parse(
    fs.readFileSync(contentIndexPath, "utf8")
  );

  const opportunities: LinkOpportunity[] = [];

  for (const source of pages) {
    for (const target of pages) {
      const result = calculateRelevance(source, target);

      if (result) {
        opportunities.push(result);
      }
    }
  }

  const deduplicated = opportunities
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, 200);

  const report = {
    generatedAt: new Date().toISOString(),
    pagesAnalyzed: pages.length,
    opportunitiesFound: deduplicated.length,
    opportunities: deduplicated,
  };

  fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));

  console.log("Internal Link Opportunity Generator");
  console.log(`Pages analyzed: ${pages.length}`);
  console.log(`Link opportunities: ${deduplicated.length}`);
  console.log(`Output: ${outputPath}`);
}

main();
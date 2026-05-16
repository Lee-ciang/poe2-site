import fs from "fs";
import path from "path";

type ScoreItem = {
  page: string;
  type: string;
  score: number;
  reasons: string[];
  source: string;
};

const outputPath = path.join(
  process.cwd(),
  "data",
  "ai-seo",
  "seo-priority-scoreboard.json"
);

function loadJson(relativePath: string): any | null {
  const fullPath = path.join(process.cwd(), relativePath);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  try {
    return JSON.parse(fs.readFileSync(fullPath, "utf8"));
  } catch {
    return null;
  }
}

function main() {
  const searchActions = loadJson(
    "data/ai-seo/search-feedback-actions.json"
  );

  const refreshQueue = loadJson(
    "data/ai-seo/refresh-priority-queue.json"
  );

  const internalLinks = loadJson(
    "data/ai-seo/internal-link-opportunities.json"
  );

  const topicExpansion = loadJson(
    "data/ai-seo/topic-cluster-expansion.json"
  );

  const scoreboard: ScoreItem[] = [];

  for (const item of searchActions?.actions || []) {
    scoreboard.push({
      page: item.page,
      type: "search-feedback",
      score: item.priorityScore || 0,
      reasons: item.opportunityFlags || [],
      source: "search-feedback-actions.json",
    });
  }

  for (const item of refreshQueue?.queue || []) {
    scoreboard.push({
      page: item.page,
      type: "refresh",
      score: item.refreshPriority || 0,
      reasons: item.reasons || [],
      source: "refresh-priority-queue.json",
    });
  }

  for (const item of internalLinks?.opportunities || []) {
    scoreboard.push({
      page: item.source,
      type: "internal-link",
      score: item.relevanceScore || 0,
      reasons: [
        `Link to ${item.target}`,
        `Anchor: ${item.recommendedAnchor}`,
      ],
      source: "internal-link-opportunities.json",
    });
  }

  for (const cluster of topicExpansion?.expansions || []) {
    for (const page of cluster.suggestedPages || []) {
      scoreboard.push({
        page: page.slug,
        type: "topic-expansion",
        score: cluster.authorityScore || 0,
        reasons: [page.reason],
        source: "topic-cluster-expansion.json",
      });
    }
  }

  const ranked = scoreboard
    .sort((a, b) => b.score - a.score)
    .slice(0, 100);

  const report = {
    generatedAt: new Date().toISOString(),
    totalItems: scoreboard.length,
    rankedItems: ranked.length,
    scoreboard: ranked,
  };

  fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));

  console.log("SEO Priority Scoreboard Generator");
  console.log(`Total items: ${scoreboard.length}`);
  console.log(`Ranked items: ${ranked.length}`);
  console.log(`Output: ${outputPath}`);
}

main();
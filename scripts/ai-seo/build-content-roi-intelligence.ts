import fs from "node:fs";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "data", "ai-seo");

const refreshQueue = JSON.parse(
  fs.readFileSync(path.join(DATA_DIR, "refresh-queue.json"), "utf8")
);

const keywordIntents = JSON.parse(
  fs.readFileSync(path.join(DATA_DIR, "search-intent-classification.json"), "utf8")
);

const roiItems = refreshQueue.map((item: any) => {
  const relatedKeywords = keywordIntents.filter(
    (keyword: any) => keyword.sourceSlug === item.slug
  );

  const highPriorityKeywordCount = relatedKeywords.filter(
    (keyword: any) => keyword.priority === "high"
  ).length;

  const roiScore =
    item.decayScore +
    highPriorityKeywordCount * 15 +
    relatedKeywords.length * 3;

  return {
    slug: item.slug,
    title: item.title,
    decayScore: item.decayScore,
    keywordOpportunityCount: relatedKeywords.length,
    highPriorityKeywordCount,
    roiScore,
    roiTier:
      roiScore >= 160
        ? "very_high"
        : roiScore >= 120
          ? "high"
          : roiScore >= 80
            ? "medium"
            : "low",
    recommendedInvestment:
      roiScore >= 160
        ? "Create full refresh, add new sections, expand FAQ, and strengthen internal links"
        : roiScore >= 120
          ? "Refresh core content and add high-intent sections"
          : roiScore >= 80
            ? "Improve weak sections and monitor performance"
            : "Low priority maintenance only",
    status: "scored",
    createdAt: new Date().toISOString(),
  };
});

const outputFile = path.join(DATA_DIR, "content-roi-intelligence.json");

fs.writeFileSync(outputFile, JSON.stringify(roiItems, null, 2));

console.log("AI SEO Content ROI Intelligence Engine");
console.log(`Content items scored: ${roiItems.length}`);
console.log(
  `Very high ROI: ${roiItems.filter((item: any) => item.roiTier === "very_high").length}`
);
console.log(
  `High ROI: ${roiItems.filter((item: any) => item.roiTier === "high").length}`
);
console.log(`Output: ${outputFile}`);
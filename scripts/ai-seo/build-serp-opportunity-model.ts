import fs from "node:fs";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "data", "ai-seo");

const keywordIntents = JSON.parse(
  fs.readFileSync(path.join(DATA_DIR, "search-intent-classification.json"), "utf8")
);

const contentRoi = JSON.parse(
  fs.readFileSync(path.join(DATA_DIR, "content-roi-intelligence.json"), "utf8")
);

const serpOpportunities = keywordIntents.map((keyword: any) => {
  const roiItem = contentRoi.find((item: any) => item.slug === keyword.sourceSlug);

  const intentBoost =
    keyword.priority === "high"
      ? 30
      : keyword.priority === "medium"
        ? 15
        : 5;

  const difficultyPenalty =
    keyword.keyword.split(" ").length >= 4
      ? 10
      : 20;

  const roiBoost =
    roiItem?.roiTier === "high"
      ? 25
      : roiItem?.roiTier === "very_high"
        ? 35
        : roiItem?.roiTier === "medium"
          ? 15
          : 5;

  const opportunityScore = intentBoost + roiBoost + difficultyPenalty;

  return {
    keyword: keyword.keyword,
    sourceSlug: keyword.sourceSlug,
    topicSeed: keyword.topicSeed,
    intent: keyword.intent,
    recommendedContentType: keyword.recommendedContentType,
    estimatedDifficulty:
      keyword.keyword.split(" ").length >= 4 ? "low_to_medium" : "medium",
    opportunityScore,
    opportunityTier:
      opportunityScore >= 65
        ? "quick_win"
        : opportunityScore >= 45
          ? "good_opportunity"
          : "standard_opportunity",
    recommendedAction:
      opportunityScore >= 65
        ? "Prioritize this keyword for refresh or supporting content creation"
        : opportunityScore >= 45
          ? "Add this keyword into an existing guide section"
          : "Keep this keyword as long-tail semantic coverage",
    status: "modeled",
    createdAt: new Date().toISOString(),
  };
});

const outputFile = path.join(DATA_DIR, "serp-opportunity-model.json");

fs.writeFileSync(outputFile, JSON.stringify(serpOpportunities, null, 2));

console.log("AI SEO SERP Opportunity Modeling Engine");
console.log(`Keywords modeled: ${serpOpportunities.length}`);
console.log(
  `Quick wins: ${
    serpOpportunities.filter((item: any) => item.opportunityTier === "quick_win").length
  }`
);
console.log(
  `Good opportunities: ${
    serpOpportunities.filter((item: any) => item.opportunityTier === "good_opportunity").length
  }`
);
console.log(`Output: ${outputFile}`);
import fs from "node:fs";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "data", "ai-seo");

const topicClusters = JSON.parse(
  fs.readFileSync(path.join(DATA_DIR, "topic-clusters.json"), "utf8")
);

const keywordOpportunities = JSON.parse(
  fs.readFileSync(path.join(DATA_DIR, "keyword-opportunities.json"), "utf8")
);

const saturationReport = topicClusters.map((cluster: any) => {
  const relatedKeywords = keywordOpportunities.filter((item: any) =>
    item.sourceSlug.includes(`/guides/${cluster.cluster}/`)
  );

  const keywordDensity =
    cluster.guideCount === 0
      ? 0
      : Math.round(relatedKeywords.length / cluster.guideCount);

  const saturationScore =
    cluster.guideCount * 15 +
    relatedKeywords.length +
    cluster.internalLinkOpportunities.length;

  return {
    cluster: cluster.cluster,
    guideCount: cluster.guideCount,
    keywordCoverage: relatedKeywords.length,
    keywordDensity,
    internalLinks: cluster.internalLinkOpportunities.length,
    saturationScore,
    saturationTier:
      saturationScore >= 180
        ? "highly_saturated"
        : saturationScore >= 100
          ? "developing"
          : "underdeveloped",
    expansionRecommendation:
      saturationScore >= 180
        ? "Focus on refreshing, consolidating, and improving conversion paths"
        : saturationScore >= 100
          ? "Expand semantic coverage with supporting pages and FAQs"
          : "Aggressively expand topical coverage and build pillar authority",
    riskAssessment:
      saturationScore >= 180
        ? "Potential over-optimization or content overlap risk"
        : saturationScore >= 100
          ? "Healthy growth opportunity"
          : "Weak topical authority and semantic coverage",
    status: "analyzed",
    createdAt: new Date().toISOString(),
  };
});

const outputFile = path.join(DATA_DIR, "topical-saturation-report.json");

fs.writeFileSync(outputFile, JSON.stringify(saturationReport, null, 2));

console.log("AI SEO Topical Saturation Intelligence Engine");
console.log(`Clusters analyzed: ${saturationReport.length}`);
console.log(
  `Highly saturated: ${
    saturationReport.filter((item: any) => item.saturationTier === "highly_saturated").length
  }`
);
console.log(
  `Underdeveloped: ${
    saturationReport.filter((item: any) => item.saturationTier === "underdeveloped").length
  }`
);
console.log(`Output: ${outputFile}`);
import fs from "node:fs";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "data", "ai-seo");

const topicClusters = JSON.parse(
  fs.readFileSync(path.join(DATA_DIR, "topic-clusters.json"), "utf8")
);

const keywordIntents = JSON.parse(
  fs.readFileSync(path.join(DATA_DIR, "search-intent-classification.json"), "utf8")
);

const authorityGapReport = topicClusters.map((cluster: any) => {
  const clusterKeywords = keywordIntents.filter((item: any) =>
    item.sourceSlug.includes(`/guides/${cluster.cluster}/`)
  );

  const beginnerIntentCount = clusterKeywords.filter(
    (item: any) => item.intent === "beginner_intent"
  ).length;

  const progressionIntentCount = clusterKeywords.filter(
    (item: any) => item.intent === "progression_intent"
  ).length;

  const optimizationIntentCount = clusterKeywords.filter(
    (item: any) => item.intent === "optimization_intent"
  ).length;

  const authorityScore =
    cluster.guideCount * 10 +
    cluster.internalLinkOpportunities.length +
    beginnerIntentCount * 3 +
    progressionIntentCount * 3 +
    optimizationIntentCount * 2;

  return {
    cluster: cluster.cluster,
    pillarPageCandidate: cluster.pillarPageCandidate,
    guideCount: cluster.guideCount,
    keywordCoverage: clusterKeywords.length,
    intentCoverage: {
      beginnerIntentCount,
      progressionIntentCount,
      optimizationIntentCount,
    },
    internalLinkOpportunities: cluster.internalLinkOpportunities.length,
    authorityScore,
    authorityTier:
      authorityScore >= 120
        ? "strong"
        : authorityScore >= 70
          ? "developing"
          : "weak",
    recommendedExpansion:
      authorityScore >= 120
        ? "Strengthen existing content and improve conversion paths"
        : authorityScore >= 70
          ? "Create supporting pages and improve internal linking"
          : "Build pillar page, add supporting guides, and expand semantic coverage",
    status: "analyzed",
    createdAt: new Date().toISOString(),
  };
});

const outputFile = path.join(DATA_DIR, "authority-gap-report.json");

fs.writeFileSync(outputFile, JSON.stringify(authorityGapReport, null, 2));

console.log("AI SEO Authority Gap Intelligence Engine");
console.log(`Clusters analyzed: ${authorityGapReport.length}`);
console.log(
  `Weak clusters: ${
    authorityGapReport.filter((item: any) => item.authorityTier === "weak").length
  }`
);
console.log(
  `Developing clusters: ${
    authorityGapReport.filter((item: any) => item.authorityTier === "developing").length
  }`
);
console.log(
  `Strong clusters: ${
    authorityGapReport.filter((item: any) => item.authorityTier === "strong").length
  }`
);
console.log(`Output: ${outputFile}`);
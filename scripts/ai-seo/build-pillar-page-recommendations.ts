import fs from "node:fs";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "data", "ai-seo");

const authorityGapReport = JSON.parse(
  fs.readFileSync(path.join(DATA_DIR, "authority-gap-report.json"), "utf8")
);

const topicClusters = JSON.parse(
  fs.readFileSync(path.join(DATA_DIR, "topic-clusters.json"), "utf8")
);

const recommendations = authorityGapReport.map((authority: any) => {
  const cluster = topicClusters.find(
    (item: any) => item.cluster === authority.cluster
  );

  return {
    cluster: authority.cluster,
    recommendedPillarPage: authority.pillarPageCandidate,
    authorityTier: authority.authorityTier,
    authorityScore: authority.authorityScore,
    guideCount: authority.guideCount,
    keywordCoverage: authority.keywordCoverage,
    recommendedPageTitle: `${authority.cluster.charAt(0).toUpperCase()}${authority.cluster.slice(1)} Guides Hub`,
    recommendedSlug: authority.pillarPageCandidate,
    recommendedSections: [
      "Cluster overview",
      "Best beginner guides",
      "Progression path",
      "Recommended builds or skills",
      "Bossing and endgame resources",
      "Related guides",
      "FAQ",
    ],
    supportingGuides: cluster?.guides?.map((guide: any) => ({
      slug: guide.slug,
      title: guide.title,
      role: "supporting_page",
    })) ?? [],
    priority:
      authority.authorityTier === "weak"
        ? "high"
        : authority.authorityTier === "developing"
          ? "medium"
          : "normal",
    status: "recommended",
    createdAt: new Date().toISOString(),
  };
});

const outputFile = path.join(DATA_DIR, "pillar-page-recommendations.json");

fs.writeFileSync(outputFile, JSON.stringify(recommendations, null, 2));

console.log("AI SEO Pillar Page Recommendation Engine");
console.log(`Clusters processed: ${recommendations.length}`);
console.log(
  `High priority pillar pages: ${
    recommendations.filter((item: any) => item.priority === "high").length
  }`
);
console.log(`Output: ${outputFile}`);
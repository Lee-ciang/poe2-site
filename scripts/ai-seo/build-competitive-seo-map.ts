import fs from "node:fs";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "data", "ai-seo");

const keywordOpportunities = JSON.parse(
  fs.readFileSync(path.join(DATA_DIR, "keyword-opportunities.json"), "utf8")
);

const authorityGapReport = JSON.parse(
  fs.readFileSync(path.join(DATA_DIR, "authority-gap-report.json"), "utf8")
);

const competitiveMap = authorityGapReport.map((cluster: any) => {
  const clusterKeywords = keywordOpportunities.filter((item: any) =>
    item.sourceSlug.includes(`/guides/${cluster.cluster}/`)
  );

  const estimatedCompetition =
    cluster.authorityTier === "weak"
      ? "high_risk"
      : cluster.authorityTier === "developing"
        ? "medium_risk"
        : "defensible";

  return {
    cluster: cluster.cluster,
    authorityTier: cluster.authorityTier,
    authorityScore: cluster.authorityScore,
    keywordTerritorySize: clusterKeywords.length,
    estimatedCompetition,
    competitiveRisk:
      estimatedCompetition === "high_risk"
        ? "Competitors can outrank this cluster unless pillar and supporting pages are expanded."
        : estimatedCompetition === "medium_risk"
          ? "Cluster has some coverage but needs stronger internal linking and semantic depth."
          : "Cluster is currently relatively defensible but should keep expanding.",
    recommendedCompetitiveMove:
      estimatedCompetition === "high_risk"
        ? "Create pillar page, add supporting guides, refresh weak pages, and improve internal links."
        : estimatedCompetition === "medium_risk"
          ? "Strengthen existing pages and target long-tail keyword gaps."
          : "Defend rankings with freshness updates and deeper FAQs.",
    status: "mapped",
    createdAt: new Date().toISOString(),
  };
});

const outputFile = path.join(DATA_DIR, "competitive-seo-map.json");

fs.writeFileSync(outputFile, JSON.stringify(competitiveMap, null, 2));

console.log("AI SEO Competitive SEO Map");
console.log(`Clusters mapped: ${competitiveMap.length}`);
console.log(
  `High risk clusters: ${
    competitiveMap.filter((item: any) => item.estimatedCompetition === "high_risk").length
  }`
);
console.log(
  `Defensible clusters: ${
    competitiveMap.filter((item: any) => item.estimatedCompetition === "defensible").length
  }`
);
console.log(`Output: ${outputFile}`);
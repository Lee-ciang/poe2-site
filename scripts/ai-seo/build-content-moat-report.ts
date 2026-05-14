import fs from "node:fs";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "data", "ai-seo");

const competitiveMap = JSON.parse(
  fs.readFileSync(path.join(DATA_DIR, "competitive-seo-map.json"), "utf8")
);

const topicalSaturation = JSON.parse(
  fs.readFileSync(path.join(DATA_DIR, "topical-saturation-report.json"), "utf8")
);

const authorityGap = JSON.parse(
  fs.readFileSync(path.join(DATA_DIR, "authority-gap-report.json"), "utf8")
);

const moatReport = competitiveMap.map((cluster: any) => {
  const saturation = topicalSaturation.find(
    (item: any) => item.cluster === cluster.cluster
  );

  const authority = authorityGap.find(
    (item: any) => item.cluster === cluster.cluster
  );

  const moatScore =
    cluster.authorityScore +
    (saturation?.saturationScore ?? 0) +
    (authority?.internalLinkOpportunities ?? 0);

  return {
    cluster: cluster.cluster,
    authorityTier: cluster.authorityTier,
    estimatedCompetition: cluster.estimatedCompetition,
    saturationTier: saturation?.saturationTier ?? "unknown",
    moatScore,
    moatTier:
      moatScore >= 300
        ? "strong_moat"
        : moatScore >= 180
          ? "developing_moat"
          : "weak_moat",
    defensibility:
      moatScore >= 300
        ? "This cluster has strong defensibility through authority, coverage, and internal links."
        : moatScore >= 180
          ? "This cluster is developing defensibility but still needs deeper supporting content."
          : "This cluster is vulnerable and needs pillar pages, supporting guides, and stronger internal links.",
    recommendedMoatStrategy:
      moatScore >= 300
        ? "Maintain freshness, strengthen FAQs, and defend long-tail rankings."
        : moatScore >= 180
          ? "Expand supporting pages, improve semantic depth, and reinforce internal links."
          : "Build pillar page, add supporting guides, refresh weak content, and increase topical coverage.",
    status: "analyzed",
    createdAt: new Date().toISOString(),
  };
});

const outputFile = path.join(DATA_DIR, "content-moat-report.json");

fs.writeFileSync(outputFile, JSON.stringify(moatReport, null, 2));

console.log("AI SEO Content Moat Intelligence Engine");
console.log(`Clusters analyzed: ${moatReport.length}`);
console.log(
  `Strong moats: ${moatReport.filter((item: any) => item.moatTier === "strong_moat").length}`
);
console.log(
  `Weak moats: ${moatReport.filter((item: any) => item.moatTier === "weak_moat").length}`
);
console.log(`Output: ${outputFile}`);
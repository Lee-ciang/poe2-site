import fs from "node:fs";
import path from "node:path";
import { getAllMarkdownGuides } from "../../src/lib/markdown";

const OUTPUT_FILE = path.join(
  process.cwd(),
  "data",
  "ai-seo",
  "topic-clusters.json"
);

const guides = getAllMarkdownGuides();

const clusters = guides.reduce<Record<string, any>>((acc, guide) => {
  const pathParts = guide.path.split("/").filter(Boolean);
  const clusterKey = pathParts[1] || "uncategorized";

  if (!acc[clusterKey]) {
    acc[clusterKey] = {
      cluster: clusterKey,
      pillarPageCandidate: `/guides/${clusterKey}`,
      guideCount: 0,
      guides: [],
      internalLinkOpportunities: [],
      status: "planned",
      createdAt: new Date().toISOString(),
    };
  }

  acc[clusterKey].guideCount += 1;

  acc[clusterKey].guides.push({
    slug: guide.path,
    title: guide.metadata.title,
    seoScore: guide.metrics.qualityScore,
    wordCount: guide.metrics.wordCount,
    faqCount: guide.faqItems.length,
  });

  return acc;
}, {});

for (const cluster of Object.values(clusters)) {
  cluster.internalLinkOpportunities = cluster.guides.flatMap((source: any) =>
    cluster.guides
      .filter((target: any) => target.slug !== source.slug)
      .slice(0, 3)
      .map((target: any) => ({
        from: source.slug,
        to: target.slug,
        anchorText: target.title.replace(" Guide", ""),
        reason: "Same topical cluster",
      }))
  );
}

fs.writeFileSync(
  OUTPUT_FILE,
  JSON.stringify(Object.values(clusters), null, 2)
);

console.log("AI SEO Topic Cluster Graph");
console.log(`Guides checked: ${guides.length}`);
console.log(`Clusters generated: ${Object.keys(clusters).length}`);
console.log(`Output: ${OUTPUT_FILE}`);
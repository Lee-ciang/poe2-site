import fs from "node:fs";
import path from "node:path";

const CLUSTERS_FILE = path.join(
  process.cwd(),
  "data",
  "ai-seo",
  "topic-clusters.json"
);

const OUTPUT_FILE = path.join(
  process.cwd(),
  "data",
  "ai-seo",
  "internal-link-graph.json"
);

const clusters = JSON.parse(fs.readFileSync(CLUSTERS_FILE, "utf8"));

const links = clusters.flatMap((cluster: any) =>
  cluster.internalLinkOpportunities.map((link: any) => ({
    cluster: cluster.cluster,
    from: link.from,
    to: link.to,
    anchorText: link.anchorText,
    reason: link.reason,
    status: "planned",
    createdAt: new Date().toISOString(),
  }))
);

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(links, null, 2));

console.log("AI SEO Internal Link Graph Engine");
console.log(`Clusters checked: ${clusters.length}`);
console.log(`Internal links planned: ${links.length}`);
console.log(`Output: ${OUTPUT_FILE}`);
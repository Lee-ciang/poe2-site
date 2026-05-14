import fs from "node:fs";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "data", "ai-seo");

const upgradeTasks = JSON.parse(
  fs.readFileSync(path.join(DATA_DIR, "upgrade-tasks.json"), "utf8")
);

const topicClusters = JSON.parse(
  fs.readFileSync(path.join(DATA_DIR, "topic-clusters.json"), "utf8")
);

const internalLinks = JSON.parse(
  fs.readFileSync(path.join(DATA_DIR, "internal-link-graph.json"), "utf8")
);

const report = {
  generatedAt: new Date().toISOString(),
  summary: {
    upgradeTasks: upgradeTasks.length,
    topicClusters: topicClusters.length,
    plannedInternalLinks: internalLinks.length,
    highPriorityTasks: upgradeTasks.filter((task: any) => task.priority >= 60).length,
    blockedPublishItems: upgradeTasks.filter((task: any) => task.status !== "published").length,
  },
  clusterHealth: topicClusters.map((cluster: any) => ({
    cluster: cluster.cluster,
    guideCount: cluster.guideCount,
    internalLinkOpportunities: cluster.internalLinkOpportunities.length,
    averageSeoScore:
      cluster.guides.reduce((sum: number, guide: any) => sum + guide.seoScore, 0) /
      cluster.guides.length,
    averageWordCount:
      cluster.guides.reduce((sum: number, guide: any) => sum + guide.wordCount, 0) /
      cluster.guides.length,
  })),
  recommendedNextActions: [
    "Prioritize high priority content upgrades",
    "Expand low word count guides",
    "Review and approve safe AI drafts",
    "Convert planned internal links into markdown patches",
    "Create pillar pages for major topic clusters",
  ],
};

fs.writeFileSync(
  path.join(DATA_DIR, "seo-intelligence-report.json"),
  JSON.stringify(report, null, 2)
);

console.log("AI SEO Intelligence Report");
console.log(`Upgrade tasks: ${report.summary.upgradeTasks}`);
console.log(`Topic clusters: ${report.summary.topicClusters}`);
console.log(`Planned internal links: ${report.summary.plannedInternalLinks}`);
console.log(`High priority tasks: ${report.summary.highPriorityTasks}`);
console.log(`Output: ${path.join(DATA_DIR, "seo-intelligence-report.json")}`);
import fs from "node:fs";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "data", "ai-seo");

const seoReport = JSON.parse(
  fs.readFileSync(path.join(DATA_DIR, "seo-intelligence-report.json"), "utf8")
);

const roiReport = JSON.parse(
  fs.readFileSync(path.join(DATA_DIR, "content-roi-intelligence.json"), "utf8")
);

const authorityReport = JSON.parse(
  fs.readFileSync(path.join(DATA_DIR, "authority-gap-report.json"), "utf8")
);

const serpReport = JSON.parse(
  fs.readFileSync(path.join(DATA_DIR, "serp-opportunity-model.json"), "utf8")
);

const moatReport = JSON.parse(
  fs.readFileSync(path.join(DATA_DIR, "content-moat-report.json"), "utf8")
);

const executiveReport = {
  generatedAt: new Date().toISOString(),
  platformStatus: "active",
  summary: {
    upgradeTasks: seoReport.summary.upgradeTasks,
    topicClusters: seoReport.summary.topicClusters,
    plannedInternalLinks: seoReport.summary.plannedInternalLinks,
    highPriorityTasks: seoReport.summary.highPriorityTasks,
    highRoiContentItems: roiReport.filter((item: any) => item.roiTier === "high").length,
    quickWinKeywords: serpReport.filter((item: any) => item.opportunityTier === "quick_win").length,
    weakAuthorityClusters: authorityReport.filter((item: any) => item.authorityTier === "weak").length,
    weakMoats: moatReport.filter((item: any) => item.moatTier === "weak_moat").length,
  },
  executivePriorities: [
    "Build pillar pages for weak authority clusters",
    "Prioritize high-ROI content refreshes",
    "Target quick-win SERP opportunities",
    "Strengthen weak content moats",
    "Convert planned internal links into publishable patches",
  ],
  strategicRoadmap: [
    {
      phase: "Short term",
      focus: "Refresh high-ROI content and capture quick-win keywords",
    },
    {
      phase: "Mid term",
      focus: "Build pillar pages and strengthen weak clusters",
    },
    {
      phase: "Long term",
      focus: "Defend strong moats and expand semantic territory",
    },
  ],
  riskSummary: {
    mainRisk: "Weak authority clusters may be outranked by competitors",
    mitigation:
      "Increase topical depth, publish pillar pages, improve internal links, and refresh outdated content",
  },
};

const outputFile = path.join(DATA_DIR, "executive-seo-report.json");

fs.writeFileSync(outputFile, JSON.stringify(executiveReport, null, 2));

console.log("AI SEO Executive Intelligence Report");
console.log(`Platform status: ${executiveReport.platformStatus}`);
console.log(`High ROI content items: ${executiveReport.summary.highRoiContentItems}`);
console.log(`Quick-win keywords: ${executiveReport.summary.quickWinKeywords}`);
console.log(`Weak authority clusters: ${executiveReport.summary.weakAuthorityClusters}`);
console.log(`Weak content moats: ${executiveReport.summary.weakMoats}`);
console.log(`Output: ${outputFile}`);
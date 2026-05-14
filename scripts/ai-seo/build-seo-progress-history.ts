import fs from "node:fs";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "data", "ai-seo");

const executiveReport = JSON.parse(
  fs.readFileSync(path.join(DATA_DIR, "executive-seo-report.json"), "utf8")
);

const trendEvolution = JSON.parse(
  fs.readFileSync(path.join(DATA_DIR, "seo-trend-evolution.json"), "utf8")
);

const seoMemory = JSON.parse(
  fs.readFileSync(path.join(DATA_DIR, "seo-memory-system.json"), "utf8")
);

const historyFile = path.join(DATA_DIR, "seo-progress-history.json");

let history: any[] = [];

if (fs.existsSync(historyFile)) {
  history = JSON.parse(fs.readFileSync(historyFile, "utf8"));
}

const snapshot = {
  recordedAt: new Date().toISOString(),
  platformStatus: executiveReport.platformStatus,
  strategicMaturity:
    trendEvolution.evolutionAssessment.strategicMaturity,
  semanticCoverage:
    trendEvolution.evolutionAssessment.semanticCoverage,
  authorityTrajectory:
    trendEvolution.evolutionAssessment.authorityTrajectory,
  moatTrajectory:
    trendEvolution.evolutionAssessment.moatTrajectory,
  highRoiContentItems:
    executiveReport.summary.highRoiContentItems,
  quickWinKeywords:
    executiveReport.summary.quickWinKeywords,
  weakAuthorityClusters:
    executiveReport.summary.weakAuthorityClusters,
  weakContentMoats:
    executiveReport.summary.weakMoats,
  roadmapStatus:
    seoMemory.systemState.roadmapStatus,
  learningStatus:
    seoMemory.systemState.learningStatus,
};

history.push(snapshot);

fs.writeFileSync(historyFile, JSON.stringify(history, null, 2));

console.log("AI SEO Progress Persistence Engine");
console.log(`Snapshots stored: ${history.length}`);
console.log(`Current strategic maturity: ${snapshot.strategicMaturity}`);
console.log(`Current semantic coverage: ${snapshot.semanticCoverage}`);
console.log(`Current authority trajectory: ${snapshot.authorityTrajectory}`);
console.log(`History file: ${historyFile}`);
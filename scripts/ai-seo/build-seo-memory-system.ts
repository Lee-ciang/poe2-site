import fs from "node:fs";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "data", "ai-seo");

const executiveReport = JSON.parse(
  fs.readFileSync(path.join(DATA_DIR, "executive-seo-report.json"), "utf8")
);

const roadmap = JSON.parse(
  fs.readFileSync(path.join(DATA_DIR, "autonomous-seo-roadmap.json"), "utf8")
);

const selfImprovement = JSON.parse(
  fs.readFileSync(path.join(DATA_DIR, "self-improvement-report.json"), "utf8")
);

const seoMemory = {
  generatedAt: new Date().toISOString(),
  memoryVersion: 1,
  systemState: {
    platformStatus: executiveReport.platformStatus,
    roadmapStatus: roadmap.status,
    learningStatus: selfImprovement.systemStatus,
  },
  historicalSignals: {
    highRoiContentItems:
      executiveReport.summary.highRoiContentItems,
    quickWinKeywords:
      executiveReport.summary.quickWinKeywords,
    weakAuthorityClusters:
      executiveReport.summary.weakAuthorityClusters,
    weakContentMoats:
      executiveReport.summary.weakMoats,
  },
  strategicMemory: {
    activePriorities: executiveReport.executivePriorities,
    roadmapPhases: roadmap.executionBacklog.map(
      (phase: any) => ({
        phase: phase.phase,
        focus: phase.focus,
        priority: phase.priority,
      })
    ),
  },
  learningMemory: {
    improvementOpportunities:
      selfImprovement.improvementOpportunities.map(
        (item: any) => ({
          area: item.area,
          recommendation: item.recommendation,
        })
      ),
    nextLearningGoal:
      selfImprovement.nextLearningCycle.goal,
  },
  persistentRecommendations: [
    "Continue strengthening weak authority clusters",
    "Prioritize quick-win keyword expansion",
    "Expand semantic coverage around high-ROI topics",
    "Regenerate executive reports after each SEO cycle",
    "Track historical SEO improvements over time",
  ],
};

const outputFile = path.join(DATA_DIR, "seo-memory-system.json");

fs.writeFileSync(outputFile, JSON.stringify(seoMemory, null, 2));

console.log("AI SEO Historical Memory Engine");
console.log(`Memory version: ${seoMemory.memoryVersion}`);
console.log(`Platform status: ${seoMemory.systemState.platformStatus}`);
console.log(`Roadmap status: ${seoMemory.systemState.roadmapStatus}`);
console.log(`Learning status: ${seoMemory.systemState.learningStatus}`);
console.log(`Output: ${outputFile}`);
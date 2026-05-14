import fs from "node:fs";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "data", "ai-seo");

const roadmap = JSON.parse(
  fs.readFileSync(path.join(DATA_DIR, "autonomous-seo-roadmap.json"), "utf8")
);

const executiveReport = JSON.parse(
  fs.readFileSync(path.join(DATA_DIR, "executive-seo-report.json"), "utf8")
);

const decayReport = JSON.parse(
  fs.readFileSync(path.join(DATA_DIR, "content-decay-report.json"), "utf8")
);

const serpOpportunities = JSON.parse(
  fs.readFileSync(path.join(DATA_DIR, "serp-opportunity-model.json"), "utf8")
);

const selfImprovementReport = {
  generatedAt: new Date().toISOString(),
  systemStatus: "learning_cycle_ready",
  currentSignals: {
    roadmapPhases: roadmap.executionBacklog.length,
    executivePriorities: executiveReport.executivePriorities.length,
    decayingContentItems: decayReport.filter(
      (item: any) => item.status === "refresh_required"
    ).length,
    quickWinKeywords: serpOpportunities.filter(
      (item: any) => item.opportunityTier === "quick_win"
    ).length,
  },
  improvementOpportunities: [
    {
      area: "Refresh prioritization",
      signal: "Many pages still require refresh",
      recommendation:
        "Increase weight of decay score and high-intent keywords in future refresh queue generation.",
    },
    {
      area: "SERP opportunity selection",
      signal: "Quick-win keywords are available",
      recommendation:
        "Prioritize quick-win keywords in refresh drafts and pillar page planning.",
    },
    {
      area: "Roadmap refinement",
      signal: "Multiple roadmap phases exist",
      recommendation:
        "Convert roadmap phases into executable backlog items with status tracking.",
    },
    {
      area: "Executive feedback loop",
      signal: "Executive report already summarizes system health",
      recommendation:
        "Regenerate executive report after each major pipeline run to compare progress over time.",
    },
  ],
  nextLearningCycle: {
    goal: "Use current SEO intelligence outputs to improve future scoring, prioritization, and roadmap generation.",
    recommendedNextEngine: "SEO Progress Memory Engine",
    status: "planned",
  },
};

const outputFile = path.join(DATA_DIR, "self-improvement-report.json");

fs.writeFileSync(outputFile, JSON.stringify(selfImprovementReport, null, 2));

console.log("AI SEO Self-Improvement Intelligence Engine");
console.log(`System status: ${selfImprovementReport.systemStatus}`);
console.log(`Roadmap phases: ${selfImprovementReport.currentSignals.roadmapPhases}`);
console.log(`Decaying content items: ${selfImprovementReport.currentSignals.decayingContentItems}`);
console.log(`Quick-win keywords: ${selfImprovementReport.currentSignals.quickWinKeywords}`);
console.log(`Output: ${outputFile}`);
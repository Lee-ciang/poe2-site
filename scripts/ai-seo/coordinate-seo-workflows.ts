import fs from "node:fs";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "data", "ai-seo");

const executionProgress = JSON.parse(
  fs.readFileSync(path.join(DATA_DIR, "execution-progress-report.json"), "utf8")
);

const roadmap = JSON.parse(
  fs.readFileSync(path.join(DATA_DIR, "autonomous-seo-roadmap.json"), "utf8")
);

const seoStateComparison = JSON.parse(
  fs.readFileSync(path.join(DATA_DIR, "seo-state-comparison.json"), "utf8")
);

const workflowPlan = {
  generatedAt: new Date().toISOString(),
  status: "coordinated",
  sourceReports: [
    "data/ai-seo/execution-progress-report.json",
    "data/ai-seo/autonomous-seo-roadmap.json",
    "data/ai-seo/seo-state-comparison.json",
  ],
  workflowOrder: [
    {
      workflow: "refresh_content",
      priority: "highest",
      dependency: "execution_tasks_available",
      nextScript: "scripts/ai-seo/generate-refresh-drafts.ts",
      reason: "Execution progress is still early stage and refresh tasks are available.",
    },
    {
      workflow: "capture_quick_wins",
      priority: "high",
      dependency: "serp_opportunities_available",
      nextScript: "scripts/ai-seo/build-serp-opportunity-model.ts",
      reason: "Quick-win keyword opportunities should be targeted early.",
    },
    {
      workflow: "strengthen_authority",
      priority: "high",
      dependency: "pillar_recommendations_available",
      nextScript: "scripts/ai-seo/build-pillar-page-recommendations.ts",
      reason: "Weak authority clusters need pillar and supporting pages.",
    },
    {
      workflow: "monitor_progress",
      priority: "ongoing",
      dependency: "progress_history_available",
      nextScript: "scripts/ai-seo/build-seo-progress-history.ts",
      reason: "Progress history should be updated after each execution cycle.",
    },
  ],
  coordinationSignals: {
    executionHealth: executionProgress.executionHealth,
    roadmapStatus: roadmap.status,
    snapshotsCompared: seoStateComparison.snapshotsCompared,
  },
  recommendedNextAction:
    executionProgress.executionHealth === "early_stage"
      ? "Start execution with high-priority refresh and quick-win tasks."
      : "Continue monitoring and compare future SEO state snapshots.",
};

const outputFile = path.join(DATA_DIR, "workflow-coordination-plan.json");

fs.writeFileSync(outputFile, JSON.stringify(workflowPlan, null, 2));

console.log("AI SEO Workflow Coordination Engine");
console.log(`Workflow status: ${workflowPlan.status}`);
console.log(`Execution health: ${workflowPlan.coordinationSignals.executionHealth}`);
console.log(`Workflow steps: ${workflowPlan.workflowOrder.length}`);
console.log(`Output: ${outputFile}`);
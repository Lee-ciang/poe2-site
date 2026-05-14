import fs from "node:fs";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "data", "ai-seo");

const workflowPlan = JSON.parse(
  fs.readFileSync(path.join(DATA_DIR, "workflow-coordination-plan.json"), "utf8")
);

const executionProgress = JSON.parse(
  fs.readFileSync(path.join(DATA_DIR, "execution-progress-report.json"), "utf8")
);

const executiveReport = JSON.parse(
  fs.readFileSync(path.join(DATA_DIR, "executive-seo-report.json"), "utf8")
);

const decision = {
  generatedAt: new Date().toISOString(),
  decisionStatus: "ready",
  selectedAction:
    executionProgress.executionHealth === "early_stage"
      ? "start_high_priority_execution"
      : executionProgress.executionHealth === "blocked"
        ? "resolve_blocked_tasks"
        : executiveReport.summary.weakAuthorityClusters > 0
          ? "strengthen_weak_authority_clusters"
          : "continue_monitoring",
  reasoning:
    executionProgress.executionHealth === "early_stage"
      ? "Execution progress is still at 0%, so the system should start high-priority refresh and quick-win tasks."
      : executionProgress.executionHealth === "blocked"
        ? "Blocked tasks exist and must be resolved before continuing execution."
        : executiveReport.summary.weakAuthorityClusters > 0
          ? "Weak authority clusters remain and should be strengthened through pillar pages and internal links."
          : "System is stable, so the next best action is monitoring and scheduled re-analysis.",
  nextWorkflow:
    workflowPlan.workflowOrder?.[0] ?? null,
  operationalPriority:
    executionProgress.executionHealth === "early_stage" ? "highest" : "normal",
  recommendedNextScript:
    workflowPlan.workflowOrder?.[0]?.nextScript ?? null,
  status: "decided",
};

const outputFile = path.join(DATA_DIR, "seo-operational-decision.json");

fs.writeFileSync(outputFile, JSON.stringify(decision, null, 2));

console.log("AI SEO Autonomous Decision Engine");
console.log(`Decision status: ${decision.decisionStatus}`);
console.log(`Selected action: ${decision.selectedAction}`);
console.log(`Operational priority: ${decision.operationalPriority}`);
console.log(`Recommended next script: ${decision.recommendedNextScript}`);
console.log(`Output: ${outputFile}`);
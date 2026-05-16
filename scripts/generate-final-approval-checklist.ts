import fs from "node:fs";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "data", "ai-seo");

const simulationReport = JSON.parse(
  fs.readFileSync(
    path.join(DATA_DIR, "publish-simulation-report.json"),
    "utf8",
  ),
);

const checklistItems = simulationReport.simulations.map((item: any) => ({
  slug: item.slug,
  canPublish: item.canPublish,
  blockers: item.blockers,
  finalApprovalChecklist: [
    {
      item: "Verification notes fully completed",
      completed: false,
    },
    {
      item: "No unchecked checklist items remain",
      completed: false,
    },
    {
      item: "No AI hallucination risks detected",
      completed: false,
    },
    {
      item: "SEO metadata manually reviewed",
      completed: false,
    },
    {
      item: "Internal links manually reviewed",
      completed: false,
    },
    {
      item: "Publish decision approved by human review",
      completed: false,
    },
  ],
  finalDecision: "pending",
}));

const report = {
  generatedAt: new Date().toISOString(),
  totalItems: checklistItems.length,
  readyForFinalApproval: checklistItems.filter(
    (item: any) => item.canPublish,
  ).length,
  blockedItems: checklistItems.filter(
    (item: any) => !item.canPublish,
  ).length,
  checklistItems,
};

const outputFile = path.join(
  DATA_DIR,
  "final-approval-checklist.json",
);

fs.writeFileSync(outputFile, JSON.stringify(report, null, 2));

console.log("Final Approval Checklist Generator");
console.log(`Checklist items: ${report.totalItems}`);
console.log(`Ready for approval: ${report.readyForFinalApproval}`);
console.log(`Blocked items: ${report.blockedItems}`);
console.log(`Output: ${outputFile}`);
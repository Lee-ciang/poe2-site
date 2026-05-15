import fs from "node:fs";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "data", "ai-seo");

const expansionPlan = JSON.parse(
  fs.readFileSync(
    path.join(DATA_DIR, "content-expansion-plan.json"),
    "utf8",
  ),
);

const draftQueue = expansionPlan.nextBatch.map((item: any, index: number) => ({
  id: `draft-${index + 1}`,
  targetSlug: item.targetSlug,
  type: item.type,
  priority: item.priority,
  source: item.source,
  status: "queued",
  createdAt: new Date().toISOString(),
  verificationRequired: true,
  verificationSources: [
    "Official patch notes",
    "Reddit discussion",
    "Gameplay examples",
  ],
  draftInstructions:
    item.type === "missing_skill_page"
      ? [
          "Create SEO-friendly skill overview.",
          "Add leveling notes.",
          "Add endgame usage.",
          "Add FAQ section.",
          "Add related builds and related skills.",
          "Avoid unverified numerical claims.",
        ]
      : item.type === "missing_build_page"
        ? [
            "Create beginner-friendly build guide.",
            "Add core skills and gear.",
            "Add leveling section.",
            "Add endgame notes.",
            "Add related boss links.",
            "Mark uncertain meta information for verification.",
          ]
        : [
            "Create boss mechanics overview.",
            "Add recommended counter builds.",
            "Add encounter preparation tips.",
            "Add related skill links.",
            "Avoid claiming unverified rewards or drop rates.",
          ],
}));

const report = {
  generatedAt: new Date().toISOString(),
  totalDrafts: draftQueue.length,
  queuedDrafts: draftQueue.filter(
    (draft: any) => draft.status === "queued",
  ).length,
  verificationRequiredDrafts: draftQueue.filter(
    (draft: any) => draft.verificationRequired,
  ).length,
  drafts: draftQueue,
};

const outputFile = path.join(DATA_DIR, "content-draft-queue.json");

fs.writeFileSync(outputFile, JSON.stringify(report, null, 2));

console.log("Content Draft Queue Generator");
console.log(`Drafts queued: ${report.totalDrafts}`);
console.log(
  `Verification required: ${report.verificationRequiredDrafts}`,
);
console.log(`Output: ${outputFile}`);
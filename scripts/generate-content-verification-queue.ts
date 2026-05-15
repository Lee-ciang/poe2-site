import fs from "node:fs";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "data", "ai-seo");

const draftQueue = JSON.parse(
  fs.readFileSync(
    path.join(DATA_DIR, "content-draft-queue.json"),
    "utf8",
  ),
);

const verificationQueue = draftQueue.drafts.map((draft: any) => ({
  draftId: draft.id,
  targetSlug: draft.targetSlug,
  type: draft.type,
  priority: draft.priority,
  verificationStatus: "pending",
  requiredChecks: [
    {
      type: "official_patch_verification",
      description: "Check official patch notes for outdated mechanics or balance changes.",
    },
    {
      type: "community_validation",
      description: "Review Reddit or community discussions for practical viability.",
    },
    {
      type: "build_meta_validation",
      description: "Verify whether the build or skill is still commonly used.",
    },
  ],
  recommendedSources: [
    "Official Path of Exile website",
    "Path of Exile Reddit",
    "Gameplay videos",
    "Community build discussions",
  ],
  riskLevel:
    draft.priority === "high"
      ? "high_visibility_risk"
      : "moderate_visibility_risk",
}));

const report = {
  generatedAt: new Date().toISOString(),
  totalVerificationItems: verificationQueue.length,
  pendingVerification: verificationQueue.filter(
    (item: any) => item.verificationStatus === "pending",
  ).length,
  highRiskItems: verificationQueue.filter(
    (item: any) => item.riskLevel === "high_visibility_risk",
  ).length,
  verificationQueue,
};

const outputFile = path.join(
  DATA_DIR,
  "content-verification-queue.json",
);

fs.writeFileSync(outputFile, JSON.stringify(report, null, 2));

console.log("Content Verification Queue Generator");
console.log(
  `Verification items: ${report.totalVerificationItems}`,
);
console.log(
  `Pending verification: ${report.pendingVerification}`,
);
console.log(`High risk items: ${report.highRiskItems}`);
console.log(`Output: ${outputFile}`);
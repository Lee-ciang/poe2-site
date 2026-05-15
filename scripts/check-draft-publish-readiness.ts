import fs from "node:fs";
import path from "node:path";

const DRAFT_DIR = path.join(process.cwd(), "content", "drafts", "skills");
const outputFile = path.join(
  process.cwd(),
  "data",
  "ai-seo",
  "draft-publish-readiness-report.json",
);

const draftFiles = fs.existsSync(DRAFT_DIR)
  ? fs.readdirSync(DRAFT_DIR).filter((file) => file.endsWith(".md"))
  : [];

const checks = draftFiles.map((file) => {
  const filePath = path.join(DRAFT_DIR, file);
  const content = fs.readFileSync(filePath, "utf8");

  const hasDraftStatus = content.includes('status: "draft"');
  const requiresVerification = content.includes("verificationRequired: true");
  const isReadyForPublishing = content.includes("readyForPublishing: true");
  const hasUncheckedItems = content.includes("- [ ]");

  const blockers: string[] = [];

  if (hasDraftStatus) {
    blockers.push("Draft status is still active.");
  }

  if (requiresVerification) {
    blockers.push("Verification is still required.");
  }

  if (!isReadyForPublishing) {
    blockers.push("readyForPublishing is not true.");
  }

  if (hasUncheckedItems) {
    blockers.push("Verification checklist still has unchecked items.");
  }

  return {
    file,
    publishReady: blockers.length === 0,
    blockers,
  };
});

const report = {
  generatedAt: new Date().toISOString(),
  draftsChecked: checks.length,
  publishReadyDrafts: checks.filter((check) => check.publishReady).length,
  blockedDrafts: checks.filter((check) => !check.publishReady).length,
  checks,
};

fs.writeFileSync(outputFile, JSON.stringify(report, null, 2));

console.log("Draft Publish Readiness Checker");
console.log(`Drafts checked: ${report.draftsChecked}`);
console.log(`Publish ready drafts: ${report.publishReadyDrafts}`);
console.log(`Blocked drafts: ${report.blockedDrafts}`);
console.log(`Output: ${outputFile}`);
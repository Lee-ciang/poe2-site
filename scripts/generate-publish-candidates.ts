import fs from "node:fs";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "data", "ai-seo");
const readinessReport = JSON.parse(
  fs.readFileSync(
    path.join(DATA_DIR, "draft-publish-readiness-report.json"),
    "utf8",
  ),
);

const candidates = readinessReport.checks
  .filter((check: any) => check.publishReady)
  .map((check: any) => ({
    file: check.file,
    sourcePath: `content/drafts/skills/${check.file}`,
    targetPath: `content/guides/skills/${check.file}`,
    status: "candidate",
    publishAllowed: true,
    requiredFinalChecks: [
      "Confirm factual verification is complete",
      "Confirm internal links are appropriate",
      "Confirm metadata is unique",
      "Confirm no placeholder text remains",
    ],
  }));

const report = {
  generatedAt: new Date().toISOString(),
  publishCandidateCount: candidates.length,
  blockedDraftCount: readinessReport.blockedDrafts,
  candidates,
};

const outputFile = path.join(DATA_DIR, "publish-candidates.json");

fs.writeFileSync(outputFile, JSON.stringify(report, null, 2));

console.log("Publish Candidate Generator");
console.log(`Publish candidates: ${report.publishCandidateCount}`);
console.log(`Blocked drafts: ${report.blockedDraftCount}`);
console.log(`Output: ${outputFile}`);
import fs from "node:fs";
import path from "node:path";

const NOTES_DIR = path.join(
  process.cwd(),
  "content",
  "verification-notes",
);

const outputFile = path.join(
  process.cwd(),
  "data",
  "ai-seo",
  "verification-progress-report.json",
);

const noteFiles = fs.existsSync(NOTES_DIR)
  ? fs.readdirSync(NOTES_DIR).filter((file) => file.endsWith(".md"))
  : [];

const items = noteFiles.map((file) => {
  const content = fs.readFileSync(path.join(NOTES_DIR, file), "utf8");

  const checkedCount =
    (content.match(/- \[x\]/gi) || []).length;

  const uncheckedCount =
    (content.match(/- \[ \]/g) || []).length;

  const readyForPublish =
    content.includes("- [x] Ready for publish candidate");

  const rejected =
    content.includes("- [x] Reject / do not publish");

  const needsRewrite =
    content.includes("- [x] Needs rewrite");

  let status = "pending_verification";

  if (readyForPublish) {
    status = "verified_publish_candidate";
  } else if (rejected) {
    status = "rejected";
  } else if (needsRewrite) {
    status = "rewrite_required";
  }

  return {
    slug: file.replace(".md", ""),
    checkedItems: checkedCount,
    uncheckedItems: uncheckedCount,
    verificationStatus: status,
    verificationProgress:
      checkedCount + uncheckedCount > 0
        ? Math.round(
            (checkedCount / (checkedCount + uncheckedCount)) * 100,
          )
        : 0,
  };
});

const report = {
  generatedAt: new Date().toISOString(),
  totalItems: items.length,
  verifiedCandidates: items.filter(
    (item) => item.verificationStatus === "verified_publish_candidate",
  ).length,
  rewriteRequired: items.filter(
    (item) => item.verificationStatus === "rewrite_required",
  ).length,
  rejected: items.filter(
    (item) => item.verificationStatus === "rejected",
  ).length,
  pendingVerification: items.filter(
    (item) => item.verificationStatus === "pending_verification",
  ).length,
  items,
};

fs.writeFileSync(outputFile, JSON.stringify(report, null, 2));

console.log("Verification Progress Report Generator");
console.log(`Total items: ${report.totalItems}`);
console.log(`Verified candidates: ${report.verifiedCandidates}`);
console.log(`Pending verification: ${report.pendingVerification}`);
console.log(`Rewrite required: ${report.rewriteRequired}`);
console.log(`Rejected: ${report.rejected}`);
console.log(`Output: ${outputFile}`);
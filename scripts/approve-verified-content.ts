import fs from "node:fs";
import path from "node:path";

const NOTES_DIR = path.join(
  process.cwd(),
  "content",
  "verification-notes",
);

const OUTPUT_FILE = path.join(
  process.cwd(),
  "data",
  "ai-seo",
  "approved-publish-candidates.json",
);

const noteFiles = fs
  .readdirSync(NOTES_DIR)
  .filter((file) => file.endsWith(".md"));

const approved = [];

for (const file of noteFiles) {
  const content = fs.readFileSync(
    path.join(NOTES_DIR, file),
    "utf8",
  );

  const approvedForPublish =
    content.includes("- [x] Ready for publish candidate");

  if (!approvedForPublish) {
    continue;
  }

  approved.push({
    slug: file.replace(".md", ""),
    approvedAt: new Date().toISOString(),
    source: `content/verification-notes/${file}`,
    publishStatus: "approved_candidate",
    nextStep: "final_manual_review",
  });
}

const report = {
  generatedAt: new Date().toISOString(),
  approvedCount: approved.length,
  approved,
};

fs.writeFileSync(
  OUTPUT_FILE,
  JSON.stringify(report, null, 2),
);

console.log("Verified Content Approval System");
console.log(`Approved candidates: ${approved.length}`);
console.log(`Output: ${OUTPUT_FILE}`);
import fs from "node:fs";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "data", "ai-seo");

const initialQueue = JSON.parse(
  fs.readFileSync(path.join(DATA_DIR, "initial-publish-queue.json"), "utf8"),
);

const finalReviewItems = initialQueue.queue.map((item: any) => ({
  slug: item.slug,
  sourceDraft: `content/drafts/skills/${item.slug}.md`,
  verificationNote: `content/verification-notes/${item.slug}.md`,
  priorityScore: item.priorityScore,
  finalReviewStatus: "pending",
  requiredFinalChecks: [
    "Confirm verification notes are completed",
    "Confirm no unchecked verification checklist remains",
    "Confirm no placeholder text remains",
    "Confirm SEO title and description are unique",
    "Confirm internal links are relevant",
    "Confirm no unverified numerical or meta claims",
  ],
  publishDecision: "not_decided",
}));

const report = {
  generatedAt: new Date().toISOString(),
  totalFinalReviewItems: finalReviewItems.length,
  pendingFinalReview: finalReviewItems.filter(
    (item: any) => item.finalReviewStatus === "pending",
  ).length,
  items: finalReviewItems,
};

const outputFile = path.join(DATA_DIR, "final-review-queue.json");

fs.writeFileSync(outputFile, JSON.stringify(report, null, 2));

console.log("Final Review Queue Generator");
console.log(`Final review items: ${report.totalFinalReviewItems}`);
console.log(`Pending final review: ${report.pendingFinalReview}`);
console.log(`Output: ${outputFile}`);
import fs from "node:fs";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "data", "ai-seo");
const FINAL_REVIEW_FILE = path.join(DATA_DIR, "final-review-queue.json");
const OUTPUT_FILE = path.join(DATA_DIR, "publish-simulation-report.json");

const finalReviewQueue = JSON.parse(
  fs.readFileSync(FINAL_REVIEW_FILE, "utf8"),
);

const simulations = finalReviewQueue.items.map((item: any) => {
  const sourceExists = fs.existsSync(item.sourceDraft);
  const verificationExists = fs.existsSync(item.verificationNote);

  const targetPath = path.join(
    process.cwd(),
    "content",
    "guides",
    "skills",
    `${item.slug}.md`,
  );

  const targetAlreadyExists = fs.existsSync(targetPath);

  const blockers: string[] = [];

  if (!sourceExists) {
    blockers.push("Source draft does not exist.");
  }

  if (!verificationExists) {
    blockers.push("Verification note does not exist.");
  }

  if (targetAlreadyExists) {
    blockers.push("Target publish path already exists.");
  }

  if (item.finalReviewStatus !== "approved") {
    blockers.push("Final review status is not approved.");
  }

  if (item.publishDecision !== "approve_publish") {
    blockers.push("Publish decision is not approve_publish.");
  }

  return {
    slug: item.slug,
    sourceDraft: item.sourceDraft,
    verificationNote: item.verificationNote,
    targetPath: `content/guides/skills/${item.slug}.md`,
    canPublish: blockers.length === 0,
    blockers,
  };
});

const report = {
  generatedAt: new Date().toISOString(),
  simulatedItems: simulations.length,
  publishableItems: simulations.filter((item: any) => item.canPublish).length,
  blockedItems: simulations.filter((item: any) => !item.canPublish).length,
  simulations,
};

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(report, null, 2));

console.log("Publish Process Simulator");
console.log(`Simulated items: ${report.simulatedItems}`);
console.log(`Publishable items: ${report.publishableItems}`);
console.log(`Blocked items: ${report.blockedItems}`);
console.log(`Output: ${OUTPUT_FILE}`);
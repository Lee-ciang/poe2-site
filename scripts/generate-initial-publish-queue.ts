import fs from "node:fs";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "data", "ai-seo");

const priorities = JSON.parse(
  fs.readFileSync(
    path.join(DATA_DIR, "publishing-priorities.json"),
    "utf8",
  ),
);

const MAX_INITIAL_QUEUE = 3;

const queue = priorities.priorities
  .filter(
    (item: any) =>
      item.verificationStatus !== "rejected",
  )
  .slice(0, MAX_INITIAL_QUEUE)
  .map((item: any, index: number) => ({
    position: index + 1,
    slug: item.slug,
    priorityScore: item.priorityScore,
    editorialStage: item.editorialStage,
    verificationStatus: item.verificationStatus,
    recommendedNextStep:
      "Perform manual verification before publish approval.",
  }));

const report = {
  generatedAt: new Date().toISOString(),
  queueSize: queue.length,
  strategy:
    "Small-batch verified publishing to prioritize quality and indexing stability.",
  queue,
};

const outputFile = path.join(
  DATA_DIR,
  "initial-publish-queue.json",
);

fs.writeFileSync(
  outputFile,
  JSON.stringify(report, null, 2),
);

console.log("Initial Publish Queue Generator");
console.log(`Queue size: ${queue.length}`);
console.log(`Output: ${outputFile}`);
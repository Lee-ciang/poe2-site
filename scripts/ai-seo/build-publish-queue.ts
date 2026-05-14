import fs from "node:fs";
import path from "node:path";

const REVIEWS_DIR = path.join(process.cwd(), "data", "ai-seo", "reviews");
const OUTPUT_FILE = path.join(process.cwd(), "data", "ai-seo", "publish-queue.json");

const reviewFiles = fs
  .readdirSync(REVIEWS_DIR)
  .filter((file) => file.endsWith(".json"));

const queue = reviewFiles.map((file) => {
  const reviewPath = path.join(REVIEWS_DIR, file);
  const review = JSON.parse(fs.readFileSync(reviewPath, "utf8"));

  const readyToPublish = Boolean(review.reviewChecklist?.readyToPublish);

  return {
    slug: review.slug,
    title: review.title,
    status: readyToPublish ? "ready_to_publish" : "blocked_review_required",
    readyToPublish,
    sourceReviewFile: path.join("data", "ai-seo", "reviews", file),
    sourceDraftFile: review.sourceDraftFile,
    createdAt: new Date().toISOString(),
  };
});

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(queue, null, 2));

console.log("AI SEO Publish Queue");
console.log(`Reviews checked: ${reviewFiles.length}`);
console.log(`Queue items: ${queue.length}`);
console.log(`Ready to publish: ${queue.filter((item) => item.readyToPublish).length}`);
console.log(`Blocked: ${queue.filter((item) => !item.readyToPublish).length}`);
console.log(`Output: ${OUTPUT_FILE}`);
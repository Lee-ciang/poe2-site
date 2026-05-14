import fs from "node:fs";
import path from "node:path";

const QUEUE_FILE = path.join(
  process.cwd(),
  "data",
  "ai-seo",
  "publish-queue.json"
);

const PATCH_DIR = path.join(
  process.cwd(),
  "data",
  "ai-seo",
  "publish-patches"
);

fs.mkdirSync(PATCH_DIR, { recursive: true });

const queue = JSON.parse(
  fs.readFileSync(QUEUE_FILE, "utf8")
);

const blockedItems = queue.filter(
  (item: any) => !item.readyToPublish
);

for (const item of blockedItems) {
  const safeSlug = item.slug
    .replace(/^\/+/, "")
    .replace(/\//g, "__");

  const patch = {
    slug: item.slug,
    title: item.title,
    publishStatus: "blocked_pending_review",
    reason: "Human review checklist incomplete",
    recommendedNextStep:
      "Complete factual verification and patch validation before publishing.",
    generatedPatchPreview: {
      faqSection: "Pending approval",
      contentExpansion: "Pending approval",
      internalLinks: "Pending approval",
    },
    createdAt: new Date().toISOString(),
  };

  const outputFile = path.join(
    PATCH_DIR,
    `${safeSlug}.json`
  );

  fs.writeFileSync(
    outputFile,
    JSON.stringify(patch, null, 2)
  );
}

console.log("AI SEO Publish Patch Generator");
console.log(`Queue items checked: ${queue.length}`);
console.log(`Blocked patches generated: ${blockedItems.length}`);
console.log(`Output directory: ${PATCH_DIR}`);
import fs from "node:fs";
import path from "node:path";
import { getAllMarkdownGuides } from "../src/lib/markdown";

type UpgradeAction =
  | "add_faq"
  | "improve_seo_quality"
  | "expand_content_depth"
  | "update_patch_info"
  | "add_internal_links";

const OUTPUT_DIR = path.join(process.cwd(), "data", "ai-seo");
const OUTPUT_FILE = path.join(OUTPUT_DIR, "upgrade-tasks.json");

const guides = getAllMarkdownGuides();

const upgradeCandidates = guides
  .map((guide) => {
    const actions: UpgradeAction[] = [];

    if (guide.faqItems.length < 2) {
      actions.push("add_faq");
    }

    if (guide.metrics.qualityScore < 80) {
      actions.push("improve_seo_quality");
    }

    if (guide.metrics.wordCount < 600) {
      actions.push("expand_content_depth");
    }

    if (guide.metrics.isOutdatedPatch) {
      actions.push("update_patch_info");
    }

    if (guide.suggestedGuidePaths.length < 3) {
      actions.push("add_internal_links");
    }

    const priority =
      actions.length * 10 +
      (guide.metrics.isOutdatedPatch ? 30 : 0) +
      (guide.metrics.qualityScore < 80 ? 20 : 0) +
      (guide.metrics.wordCount < 600 ? 10 : 0);

    return {
      slug: guide.path,
      title: guide.metadata.title,
      ccategory: guide.path.split("/").filter(Boolean)[1] || "uncategorized",
      priority,
      status: "planned",
      actions,
      metrics: {
        seoScore: guide.metrics.qualityScore,
        wordCount: guide.metrics.wordCount,
        faqCount: guide.faqItems.length,
        internalLinkCount: guide.suggestedGuidePaths.length,
        isOutdatedPatch: guide.metrics.isOutdatedPatch,
      },
      createdAt: new Date().toISOString(),
    };
  })
  .filter((item) => item.actions.length > 0)
  .sort((a, b) => b.priority - a.priority);

fs.mkdirSync(OUTPUT_DIR, { recursive: true });
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(upgradeCandidates, null, 2));

console.log("AI SEO Content Upgrade Engine");
console.log(`Guides checked: ${guides.length}`);
console.log(`Upgrade tasks created: ${upgradeCandidates.length}`);
console.log(`Output: ${OUTPUT_FILE}`);

for (const item of upgradeCandidates) {
  console.log(`\n${item.slug}`);
  console.log(`Title: ${item.title}`);
  console.log(`Priority: ${item.priority}`);
  console.log(`Status: ${item.status}`);
  console.log(`Actions: ${item.actions.join(", ")}`);
}
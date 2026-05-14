import fs from "node:fs";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "data", "ai-seo");
const REFRESH_QUEUE_FILE = path.join(DATA_DIR, "refresh-queue.json");
const OUTPUT_DIR = path.join(DATA_DIR, "refresh-drafts");

const refreshQueue = JSON.parse(
  fs.readFileSync(REFRESH_QUEUE_FILE, "utf8")
);

fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const selectedItems = refreshQueue.slice(0, 5);

for (const item of selectedItems) {
  const safeSlug = item.slug
    .replace(/^\/+/, "")
    .replace(/\//g, "__");

  const draft = {
    slug: item.slug,
    title: item.title,
    refreshPriority: item.refreshPriority,
    decayScore: item.decayScore,
    decaySignals: item.decaySignals,
    status: "refresh_draft_created",
    refreshDraft: {
      recommendedSections: [
        "Updated overview",
        "Beginner explanation",
        "Recommended support setup",
        "Gear progression",
        "Common mistakes",
        "Patch review note",
      ],
      faqSuggestions: [
        {
          question: `Is ${item.title.replace(" Guide", "")} still worth using in Path of Exile 2?`,
          answer:
            "This guide should be reviewed against the latest patch before publishing. If the core mechanics remain strong, it can still be useful with updated support gems, gear priorities, and defensive recommendations.",
        },
        {
          question: `What should be refreshed first in this ${item.title.replace(" Guide", "")}?`,
          answer:
            "Start by refreshing patch-sensitive information, then expand thin sections such as leveling, support gem reasoning, gear progression, and common mistakes.",
        },
      ],
      internalLinkPlan:
        "Add contextual links to related skill, build, boss, and cluster pages where they naturally help the reader.",
      safetyNote:
        "This is a draft only. Do not publish until factual accuracy and patch relevance are manually reviewed.",
    },
    createdAt: new Date().toISOString(),
  };

  fs.writeFileSync(
    path.join(OUTPUT_DIR, `${safeSlug}.json`),
    JSON.stringify(draft, null, 2)
  );
}

console.log("AI SEO Refresh Draft Generator");
console.log(`Refresh queue items loaded: ${refreshQueue.length}`);
console.log(`Refresh drafts generated: ${selectedItems.length}`);
console.log(`Output directory: ${OUTPUT_DIR}`);
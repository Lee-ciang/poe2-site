import fs from "node:fs";
import path from "node:path";
import { getAllMarkdownGuides } from "../../src/lib/markdown";

const OUTPUT_DIR = path.join(process.cwd(), "data", "ai-seo");
const OUTPUT_FILE = path.join(OUTPUT_DIR, "semantic-topic-expansion.json");

const guides = getAllMarkdownGuides();

const expansions = guides.map((guide) => {
  const baseTitle = guide.metadata.title.replace(" Guide", "");

  return {
    slug: guide.path,
    title: guide.metadata.title,
    category: guide.path.split("/").filter(Boolean)[1] || "uncategorized",
    topicSeed: baseTitle,
    semanticExpansionIdeas: [
      `${baseTitle} leveling guide`,
      `${baseTitle} best support gems`,
      `${baseTitle} beginner build`,
      `${baseTitle} endgame setup`,
      `${baseTitle} passive tree`,
      `${baseTitle} gear progression`,
      `${baseTitle} bossing setup`,
      `${baseTitle} mapping setup`,
    ],
    contentGapIdeas: [
      "Add beginner-specific explanation",
      "Add leveling progression section",
      "Add support gem reasoning",
      "Add gear priority section",
      "Add common mistakes section",
      "Add bossing vs mapping comparison",
    ],
    status: "planned",
    createdAt: new Date().toISOString(),
  };
});

fs.mkdirSync(OUTPUT_DIR, { recursive: true });
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(expansions, null, 2));

console.log("AI SEO Semantic Topic Expansion Engine");
console.log(`Guides checked: ${guides.length}`);
console.log(`Topic expansions generated: ${expansions.length}`);
console.log(`Output: ${OUTPUT_FILE}`);
import fs from "node:fs";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "data", "ai-seo");

const semanticExpansion = JSON.parse(
  fs.readFileSync(
    path.join(DATA_DIR, "semantic-topic-expansion.json"),
    "utf8"
  )
);

const opportunities = semanticExpansion.flatMap((item: any) =>
  item.semanticExpansionIdeas.map((keyword: string) => ({
    keyword,
    sourceSlug: item.slug,
    topicSeed: item.topicSeed,
    opportunityType:
      keyword.includes("beginner")
        ? "beginner_intent"
        : keyword.includes("leveling")
          ? "leveling_intent"
          : keyword.includes("boss")
            ? "bossing_intent"
            : "general_expansion",
    estimatedDifficulty:
      keyword.split(" ").length >= 4 ? "medium" : "low",
    suggestedContentType:
      keyword.includes("guide")
        ? "supporting_page"
        : "section_expansion",
    status: "discovered",
    createdAt: new Date().toISOString(),
  }))
);

const outputFile = path.join(
  DATA_DIR,
  "keyword-opportunities.json"
);

fs.writeFileSync(
  outputFile,
  JSON.stringify(opportunities, null, 2)
);

console.log("AI SEO Keyword Opportunity Engine");
console.log(`Topic seeds processed: ${semanticExpansion.length}`);
console.log(`Keyword opportunities discovered: ${opportunities.length}`);
console.log(`Output: ${outputFile}`);
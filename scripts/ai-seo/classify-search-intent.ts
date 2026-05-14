import fs from "node:fs";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "data", "ai-seo");

const keywordOpportunities = JSON.parse(
  fs.readFileSync(
    path.join(DATA_DIR, "keyword-opportunities.json"),
    "utf8"
  )
);

function classifyIntent(keyword: string) {
  const lower = keyword.toLowerCase();

  if (lower.includes("beginner")) return "beginner_intent";
  if (lower.includes("leveling")) return "progression_intent";
  if (lower.includes("boss") || lower.includes("bossing")) return "bossing_intent";
  if (lower.includes("best")) return "commercial_investigation";
  if (lower.includes("vs") || lower.includes("compare")) return "comparison_intent";
  if (lower.includes("gear") || lower.includes("setup")) return "optimization_intent";
  if (lower.includes("passive tree")) return "build_planning_intent";

  return "informational_intent";
}

function recommendContentType(intent: string) {
  switch (intent) {
    case "beginner_intent":
      return "beginner_guide";
    case "progression_intent":
      return "leveling_guide";
    case "bossing_intent":
      return "bossing_section";
    case "commercial_investigation":
      return "best_options_roundup";
    case "comparison_intent":
      return "comparison_page";
    case "optimization_intent":
      return "optimization_section";
    case "build_planning_intent":
      return "build_planning_section";
    default:
      return "informational_section";
  }
}

const classified = keywordOpportunities.map((item: any) => {
  const intent = classifyIntent(item.keyword);

  return {
    keyword: item.keyword,
    sourceSlug: item.sourceSlug,
    topicSeed: item.topicSeed,
    intent,
    recommendedContentType: recommendContentType(intent),
    priority:
      intent === "beginner_intent" || intent === "progression_intent"
        ? "high"
        : intent === "optimization_intent" || intent === "build_planning_intent"
          ? "medium"
          : "normal",
    status: "classified",
    createdAt: new Date().toISOString(),
  };
});

const outputFile = path.join(DATA_DIR, "search-intent-classification.json");

fs.writeFileSync(outputFile, JSON.stringify(classified, null, 2));

console.log("AI SEO Search Intent Intelligence Engine");
console.log(`Keywords classified: ${classified.length}`);
console.log(
  `High priority intents: ${
    classified.filter((item: any) => item.priority === "high").length
  }`
);
console.log(`Output: ${outputFile}`);
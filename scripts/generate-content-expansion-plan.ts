import fs from "node:fs";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "data", "ai-seo");

const contentGapReport = JSON.parse(
  fs.readFileSync(path.join(DATA_DIR, "content-gap-report.json"), "utf8"),
);

const skillRelatedSuggestions = JSON.parse(
  fs.readFileSync(
    path.join(DATA_DIR, "skill-related-link-suggestions.json"),
    "utf8",
  ),
);

const expansionItems = [
  ...contentGapReport.gaps.map((gap: any) => ({
    type: gap.type,
    targetSlug: gap.missingSlug,
    source: gap.source,
    priority: gap.priority,
    reason: gap.reason,
    recommendedAction:
      gap.type === "missing_skill_page"
        ? "Create a new skill page with verified mechanics, related builds, FAQ, and internal links."
        : gap.type === "missing_build_page"
          ? "Create a new build page with core skills, leveling notes, gear guidance, and related boss links."
          : "Create a new boss page with mechanics, counter builds, rewards, and related skills.",
  })),

  ...skillRelatedSuggestions
    .filter((item: any) => item.suggestedRelatedSkills.length >= 3)
    .slice(0, 5)
    .map((item: any) => ({
      type: "semantic_cluster_expansion",
      targetSlug: item.slug,
      source: item.slug,
      priority: "medium",
      reason: "Skill has multiple semantic relationships and can support deeper cluster content.",
      recommendedAction:
        "Expand this skill page with comparison sections, related skill notes, and cluster FAQ.",
    })),
];

const expansionPlan = {
  generatedAt: new Date().toISOString(),
  sourceReports: [
    "data/ai-seo/content-gap-report.json",
    "data/ai-seo/skill-related-link-suggestions.json",
  ],
  summary: {
    totalExpansionItems: expansionItems.length,
    highPriorityItems: expansionItems.filter(
      (item: any) => item.priority === "high",
    ).length,
    mediumPriorityItems: expansionItems.filter(
      (item: any) => item.priority === "medium",
    ).length,
  },
  nextBatch: expansionItems.slice(0, 10),
  expansionItems,
};

const outputFile = path.join(DATA_DIR, "content-expansion-plan.json");

fs.writeFileSync(outputFile, JSON.stringify(expansionPlan, null, 2));

console.log("Content Expansion Plan Generator");
console.log(`Total expansion items: ${expansionPlan.summary.totalExpansionItems}`);
console.log(`High priority items: ${expansionPlan.summary.highPriorityItems}`);
console.log(`Medium priority items: ${expansionPlan.summary.mediumPriorityItems}`);
console.log(`Output: ${outputFile}`);
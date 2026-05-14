import fs from "node:fs";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "data", "ai-seo");

const upgradeTasks = JSON.parse(
  fs.readFileSync(path.join(DATA_DIR, "upgrade-tasks.json"), "utf8")
);

const semanticExpansion = JSON.parse(
  fs.readFileSync(path.join(DATA_DIR, "semantic-topic-expansion.json"), "utf8")
);

const decayItems = upgradeTasks.map((task: any) => {
  const semanticItem = semanticExpansion.find(
    (item: any) => item.slug === task.slug
  );

  const decaySignals = [];

  if (task.metrics.wordCount < 600) {
    decaySignals.push("low_content_depth");
  }

  if (task.metrics.faqCount < 2) {
    decaySignals.push("thin_faq_coverage");
  }

  if (task.metrics.isOutdatedPatch) {
    decaySignals.push("outdated_patch_information");
  }

  if (semanticItem?.contentGapIdeas?.length >= 5) {
    decaySignals.push("semantic_coverage_gap");
  }

  const decayScore =
    decaySignals.length * 20 +
    (task.priority >= 60 ? 20 : 0);

  return {
    slug: task.slug,
    title: task.title,
    decayScore,
    decaySignals,
    status:
      decayScore >= 60
        ? "refresh_required"
        : decayScore >= 40
          ? "monitor"
          : "healthy",
    recommendedAction:
      decayScore >= 60
        ? "Queue this guide for content refresh"
        : decayScore >= 40
          ? "Monitor this guide in the next SEO cycle"
          : "No immediate refresh required",
    checkedAt: new Date().toISOString(),
  };
});

const outputFile = path.join(DATA_DIR, "content-decay-report.json");

fs.writeFileSync(outputFile, JSON.stringify(decayItems, null, 2));

console.log("AI SEO Content Decay Detection Engine");
console.log(`Guides checked: ${decayItems.length}`);
console.log(
  `Refresh required: ${
    decayItems.filter((item: any) => item.status === "refresh_required").length
  }`
);
console.log(
  `Monitor: ${
    decayItems.filter((item: any) => item.status === "monitor").length
  }`
);
console.log(`Output: ${outputFile}`);
import { getAllMarkdownGuides } from "../src/lib/markdown";

const guides = getAllMarkdownGuides();

const upgradeCandidates = guides
  .map((guide) => {
    const upgradeActions: string[] = [];

    if (guide.faqItems.length < 2) {
      upgradeActions.push("Add more FAQ items");
    }

    if (guide.metrics.qualityScore < 80) {
      upgradeActions.push("Improve SEO quality score");
    }

    if (guide.metrics.wordCount < 600) {
      upgradeActions.push("Expand content depth");
    }

    if (guide.metrics.isOutdatedPatch) {
      upgradeActions.push("Update patch-specific information");
    }

    if (guide.suggestedGuidePaths.length < 3) {
      upgradeActions.push("Add more internal links");
    }

    return {
      guide,
      upgradeActions,
      priority:
        upgradeActions.length * 10 +
        (guide.metrics.isOutdatedPatch ? 30 : 0) +
        (guide.metrics.qualityScore < 80 ? 20 : 0),
    };
  })
  .filter((item) => item.upgradeActions.length > 0)
  .sort((a, b) => b.priority - a.priority);

console.log("AI content upgrade plan");
console.log(`Guides checked: ${guides.length}`);
console.log(`Upgrade candidates: ${upgradeCandidates.length}`);

for (const item of upgradeCandidates) {
  console.log(`\n${item.guide.path}`);
  console.log(`Title: ${item.guide.metadata.title}`);
  console.log(`Priority: ${item.priority}`);
  console.log(`SEO Score: ${item.guide.metrics.qualityScore}`);
  console.log(`Word Count: ${item.guide.metrics.wordCount}`);
  console.log(`FAQ Count: ${item.guide.faqItems.length}`);
  console.log("Actions:");

  for (const action of item.upgradeActions) {
    console.log(`- ${action}`);
  }
}
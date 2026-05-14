import { getAllMarkdownGuides } from "../src/lib/markdown";

const targetPatchVersion = process.argv[2] ?? "0.2.1";

const guides = getAllMarkdownGuides();

const affectedGuides = guides
  .filter((guide) => guide.metadata.patchVersion !== targetPatchVersion)
  .map((guide) => {
    let priority = 0;

    if (guide.metrics.isOutdatedPatch) {
      priority += 50;
    }

    if (guide.metrics.isStale) {
      priority += 30;
    }

    if (guide.metrics.qualityScore < 70) {
      priority += 20;
    }

    if (guide.faqItems.length < 2) {
      priority += 10;
    }

    return {
      guide,
      priority,
    };
  })
  .sort((a, b) => b.priority - a.priority);

console.log(`Patch refresh plan for ${targetPatchVersion}`);
console.log(`Affected guides: ${affectedGuides.length}`);

for (const item of affectedGuides) {
  console.log(
    `- ${item.guide.path} | priority: ${item.priority} | current patch: ${
      item.guide.metadata.patchVersion ?? "missing"
    } | ${item.guide.metadata.title}`,
  );
}
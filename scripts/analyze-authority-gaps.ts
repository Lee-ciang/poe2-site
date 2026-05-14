import { getAllMarkdownGuides } from "../src/lib/markdown";

const guides = getAllMarkdownGuides();

const incomingLinks = new Map<string, number>();
const outgoingLinks = new Map<string, number>();

for (const guide of guides) {
  incomingLinks.set(guide.path, 0);

  const outgoingCount =
    guide.metadata.relatedBuilds.length +
    guide.metadata.relatedBosses.length +
    guide.metadata.relatedSkills.length +
    guide.suggestedGuidePaths.length;

  outgoingLinks.set(guide.path, outgoingCount);
}

for (const guide of guides) {
  for (const suggestedPath of guide.suggestedGuidePaths) {
    incomingLinks.set(
      suggestedPath,
      (incomingLinks.get(suggestedPath) ?? 0) + 1,
    );
  }
}

const authorityGaps = guides
  .map((guide) => {
    const incoming = incomingLinks.get(guide.path) ?? 0;
    const outgoing = outgoingLinks.get(guide.path) ?? 0;

    let gapScore = 0;

    if (incoming === 0) {
      gapScore += 50;
    }

    if (outgoing === 0) {
      gapScore += 30;
    }

    if (guide.metrics.qualityScore < 70) {
      gapScore += 20;
    }

    if (guide.faqItems.length < 2) {
      gapScore += 10;
    }

    return {
      guide,
      incoming,
      outgoing,
      gapScore,
    };
  })
  .filter((item) => item.gapScore > 0)
  .sort((a, b) => b.gapScore - a.gapScore);

console.log("Authority gap analysis");
console.log(`Guides checked: ${guides.length}`);
console.log(`Gaps found: ${authorityGaps.length}`);

for (const item of authorityGaps) {
  console.log(
    `- ${item.guide.path} | gap: ${item.gapScore} | incoming: ${item.incoming} | outgoing: ${item.outgoing} | SEO: ${item.guide.metrics.qualityScore}`,
  );
}
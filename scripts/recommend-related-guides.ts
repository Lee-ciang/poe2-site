import { getAllMarkdownGuides } from "../src/lib/markdown";

function tokenize(text: string) {
  return new Set(
    text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, " ")
      .split(/\s+/)
      .filter((word) => word.length >= 4),
  );
}

function getGuideText(guide: ReturnType<typeof getAllMarkdownGuides>[number]) {
  return [
    guide.metadata.title,
    guide.metadata.seoTitle,
    guide.metadata.seoDescription,
    guide.metadata.type,
    guide.body,
  ]
    .filter(Boolean)
    .join(" ");
}

function getSimilarityScore(a: Set<string>, b: Set<string>) {
  const overlap = [...a].filter((word) => b.has(word)).length;
  const denominator = Math.sqrt(a.size * b.size);

  if (denominator === 0) {
    return 0;
  }

  return overlap / denominator;
}

const guides = getAllMarkdownGuides();

const guideTokens = new Map(
  guides.map((guide) => [guide.path, tokenize(getGuideText(guide))]),
);

for (const guide of guides) {
  const currentTokens = guideTokens.get(guide.path);

  if (!currentTokens) {
    continue;
  }

  const recommendations = guides
    .filter((candidate) => candidate.path !== guide.path)
    .map((candidate) => {
      const candidateTokens = guideTokens.get(candidate.path);

      return {
        guide: candidate,
        score: candidateTokens
          ? getSimilarityScore(currentTokens, candidateTokens)
          : 0,
      };
    })
    .filter((item) => item.score > 0.08)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  console.log(`\n${guide.path}`);
  console.log(`Title: ${guide.metadata.title}`);

  if (!recommendations.length) {
    console.log("No recommendations found.");
    continue;
  }

  for (const recommendation of recommendations) {
    console.log(
      `- ${recommendation.guide.path} (${recommendation.score.toFixed(2)})`,
    );
  }
}
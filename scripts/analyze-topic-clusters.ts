import { getAllMarkdownGuides } from "../src/lib/markdown";

const topicKeywords = {
  lightning: ["lightning", "shock", "arc", "spark", "chain", "arrow"],
  cold: ["cold", "frost", "freeze", "ice", "chill"],
  fire: ["fire", "flame", "ignite", "burn", "meteor"],
  melee: ["melee", "slam", "earthshatter", "whirlwind", "monk"],
  bossing: ["boss", "phase", "mechanic", "trialmaster", "geonor"],
  ranger: ["ranger", "bow", "arrow", "projectile", "poison"],
} as const;

function getGuideText(guide: ReturnType<typeof getAllMarkdownGuides>[number]) {
  return [
    guide.metadata.title,
    guide.metadata.seoTitle,
    guide.metadata.seoDescription,
    guide.metadata.type,
    guide.body,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

const guides = getAllMarkdownGuides();

for (const [topic, keywords] of Object.entries(topicKeywords)) {
  const matchingGuides = guides
    .map((guide) => {
      const text = getGuideText(guide);
      const score = keywords.reduce((total, keyword) => {
        const matches = text.match(new RegExp(`\\b${keyword}\\b`, "g"));
        return total + (matches?.length ?? 0);
      }, 0);

      return {
        guide,
        score,
      };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  console.log(`\n# ${topic.toUpperCase()} CLUSTER`);

  if (!matchingGuides.length) {
    console.log("No matching guides found.");
    continue;
  }

  for (const item of matchingGuides.slice(0, 10)) {
    console.log(
      `- ${item.guide.path} | score: ${item.score} | ${item.guide.metadata.title}`,
    );
  }
}
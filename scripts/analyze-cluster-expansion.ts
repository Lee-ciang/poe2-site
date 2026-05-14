import { getAllMarkdownGuides } from "../src/lib/markdown";

const clusterBlueprints = {
  lightning: {
    requiredTopics: [
      "lightning leveling guide",
      "lightning endgame build",
      "lightning bossing setup",
      "shock mechanics guide",
      "best lightning support skills",
    ],
  },
  cold: {
    requiredTopics: [
      "cold leveling guide",
      "cold endgame build",
      "freeze mechanics guide",
      "cold bossing setup",
      "best cold support skills",
    ],
  },
  fire: {
    requiredTopics: [
      "fire leveling guide",
      "fire endgame build",
      "ignite mechanics guide",
      "fire bossing setup",
      "best fire support skills",
    ],
  },
  melee: {
    requiredTopics: [
      "melee leveling guide",
      "melee endgame build",
      "slam mechanics guide",
      "melee bossing setup",
      "best melee support skills",
    ],
  },
  ranger: {
    requiredTopics: [
      "ranger leveling guide",
      "ranger endgame build",
      "bow mechanics guide",
      "projectile scaling guide",
      "ranger bossing setup",
    ],
  },
} as const;

function normalize(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9\s-]/g, " ");
}

function guideText(guide: ReturnType<typeof getAllMarkdownGuides>[number]) {
  return normalize(
    [
      guide.metadata.title,
      guide.metadata.seoTitle,
      guide.metadata.seoDescription,
      guide.body,
    ]
      .filter(Boolean)
      .join(" "),
  );
}

const guides = getAllMarkdownGuides();

console.log("Semantic cluster expansion analysis");

for (const [cluster, blueprint] of Object.entries(clusterBlueprints)) {
  const missingTopics = blueprint.requiredTopics.filter((topic) => {
    const topicWords = normalize(topic)
      .split(/\s+/)
      .filter((word) => word.length >= 4);

    return !guides.some((guide) => {
      const text = guideText(guide);

      return topicWords.every((word) => text.includes(word));
    });
  });

  console.log(`\n# ${cluster.toUpperCase()} CLUSTER`);
  console.log(`Required topics: ${blueprint.requiredTopics.length}`);
  console.log(`Missing topics: ${missingTopics.length}`);

  if (!missingTopics.length) {
    console.log("Cluster coverage looks complete.");
    continue;
  }

  for (const topic of missingTopics) {
    console.log(`- ${topic}`);
  }
}
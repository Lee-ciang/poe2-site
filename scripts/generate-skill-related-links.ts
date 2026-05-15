import fs from "node:fs";
import path from "node:path";
import { skills } from "../src/data/skills";

const outputFile = path.join(
  process.cwd(),
  "data",
  "ai-seo",
  "skill-related-link-suggestions.json"
);

const suggestions = skills.map((skill) => {
  const related = skills
    .filter((candidate) => candidate.slug !== skill.slug)
    .filter(
      (candidate) =>
        candidate.damageType === skill.damageType ||
        candidate.category === skill.category,
    )
    .slice(0, 4)
    .map((candidate) => ({
      slug: candidate.slug,
      name: candidate.name,
      reason:
        candidate.damageType === skill.damageType
          ? `Same damage type: ${skill.damageType}`
          : `Same category: ${skill.category}`,
    }));

  return {
    slug: skill.slug,
    name: skill.name,
    damageType: skill.damageType,
    category: skill.category,
    suggestedRelatedSkills: related,
  };
});

fs.writeFileSync(outputFile, JSON.stringify(suggestions, null, 2));

console.log("Skill Related Link Suggestion Generator");
console.log(`Skills checked: ${skills.length}`);
console.log(`Output: ${outputFile}`);
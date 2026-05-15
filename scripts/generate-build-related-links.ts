import fs from "node:fs";
import path from "node:path";
import { builds } from "../src/data/builds";
import { skills } from "../src/data/skills";
import { bosses } from "../src/data/bosses";

const outputFile = path.join(
  process.cwd(),
  "data",
  "ai-seo",
  "build-related-link-suggestions.json",
);

const suggestions = builds.map((build) => {
  const relatedSkills = skills
    .filter((skill) =>
      build.coreSkills.some((coreSkill) =>
        skill.name.toLowerCase().includes(coreSkill.toLowerCase()) ||
        coreSkill.toLowerCase().includes(skill.name.toLowerCase()),
      ),
    )
    .slice(0, 4)
    .map((skill) => ({
      slug: skill.slug,
      name: skill.name,
      reason: "Matches core build skill",
    }));

  const relatedBosses = bosses
    .filter((boss) =>
      build.endgameNotes.join(" ").toLowerCase().includes(boss.name.toLowerCase()),
    )
    .slice(0, 3)
    .map((boss) => ({
      slug: boss.slug,
      name: boss.name,
      reason: "Mentioned in endgame context",
    }));

  return {
    slug: build.slug,
    title: build.title,
    className: build.className,
    playstyle: build.playstyle,
    suggestedRelatedSkills: relatedSkills,
    suggestedRelatedBosses: relatedBosses,
  };
});

fs.writeFileSync(outputFile, JSON.stringify(suggestions, null, 2));

console.log("Build Related Link Suggestion Generator");
console.log(`Builds checked: ${builds.length}`);
console.log(`Output: ${outputFile}`);
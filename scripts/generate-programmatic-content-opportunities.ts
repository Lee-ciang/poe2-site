import fs from "fs";
import path from "path";

type Skill = {
  slug: string;
  name: string;
  archetype?: string;
  tags?: string[];
};

type Opportunity = {
  slug: string;
  title: string;
  sourceSkill: string;
  opportunityType: string;
  searchIntent: string;
  priorityScore: number;
  reason: string;
};

const skillsPath = path.join(process.cwd(), "src", "data", "skills.ts");

const outputPath = path.join(
  process.cwd(),
  "data",
  "ai-seo",
  "programmatic-content-opportunities.json"
);

const opportunityTypes = [
  {
    suffix: "build",
    titleSuffix: "Build Guide",
    intent: "build",
    baseScore: 90,
  },
  {
    suffix: "leveling",
    titleSuffix: "Leveling Guide",
    intent: "leveling",
    baseScore: 85,
  },
  {
    suffix: "support-gems",
    titleSuffix: "Best Support Gems",
    intent: "support gems",
    baseScore: 80,
  },
  {
    suffix: "endgame",
    titleSuffix: "Endgame Guide",
    intent: "endgame",
    baseScore: 75,
  },
  {
    suffix: "faq",
    titleSuffix: "FAQ",
    intent: "questions",
    baseScore: 60,
  },
];

function titleCase(value: string) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function extractSkillsFromSource(source: string): Skill[] {
  const matches = [...source.matchAll(/slug:\s*"([^"]+)"[\s\S]*?name:\s*"([^"]+)"/g)];

  return matches.map((match) => ({
    slug: match[1],
    name: match[2],
  }));
}

function main() {
  if (!fs.existsSync(skillsPath)) {
    console.log("Programmatic Content Opportunity Generator");
    console.log(`Missing input: ${skillsPath}`);
    return;
  }

  const source = fs.readFileSync(skillsPath, "utf8");
  const skills = extractSkillsFromSource(source);

  const opportunities: Opportunity[] = [];

  for (const skill of skills) {
    for (const type of opportunityTypes) {
      opportunities.push({
        slug: `/guides/skills/${skill.slug}-${type.suffix}`,
        title: `${skill.name} ${type.titleSuffix}`,
        sourceSkill: skill.slug,
        opportunityType: type.suffix,
        searchIntent: type.intent,
        priorityScore: type.baseScore,
        reason: `Programmatic long-tail expansion for ${skill.name}.`,
      });
    }
  }

  const ranked = opportunities.sort(
    (a, b) => b.priorityScore - a.priorityScore
  );

  const report = {
    generatedAt: new Date().toISOString(),
    source: skillsPath,
    skillsFound: skills.length,
    opportunitiesFound: ranked.length,
    opportunities: ranked,
  };

  fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));

  console.log("Programmatic Content Opportunity Generator");
  console.log(`Skills found: ${skills.length}`);
  console.log(`Opportunities found: ${ranked.length}`);
  console.log(`Output: ${outputPath}`);
}

main();
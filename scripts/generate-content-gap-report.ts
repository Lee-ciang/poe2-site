import fs from "node:fs";
import path from "node:path";
import { builds } from "../src/data/builds";
import { bosses } from "../src/data/bosses";
import { skills } from "../src/data/skills";

const outputFile = path.join(
  process.cwd(),
  "data",
  "ai-seo",
  "content-gap-report.json",
);

const existingSkillSlugs = new Set(skills.map((skill) => skill.slug));
const existingBuildSlugs = new Set(builds.map((build) => build.slug));
const existingBossSlugs = new Set(bosses.map((boss) => boss.slug));

const skillGaps = skills.flatMap((skill) =>
  (skill.relatedSkills ?? [])
    .filter((slug) => !existingSkillSlugs.has(slug))
    .map((slug) => ({
      type: "missing_skill_page",
      source: skill.slug,
      missingSlug: slug,
      reason: "Referenced as related skill but no skill page exists",
      priority: "high",
    })),
);

const buildSkillGaps = builds.flatMap((build) =>
  (build.relatedSkills ?? [])
    .filter((slug) => !existingSkillSlugs.has(slug))
    .map((slug) => ({
      type: "missing_skill_page",
      source: build.slug,
      missingSlug: slug,
      reason: "Referenced by build but no skill page exists",
      priority: "high",
    })),
);

const buildBossGaps = builds.flatMap((build) =>
  (build.relatedBosses ?? [])
    .filter((slug) => !existingBossSlugs.has(slug))
    .map((slug) => ({
      type: "missing_boss_page",
      source: build.slug,
      missingSlug: slug,
      reason: "Referenced by build but no boss page exists",
      priority: "medium",
    })),
);

const skillBuildGaps = skills.flatMap((skill) =>
  (skill.relatedBuilds ?? [])
    .filter((slug) => !existingBuildSlugs.has(slug))
    .map((slug) => ({
      type: "missing_build_page",
      source: skill.slug,
      missingSlug: slug,
      reason: "Referenced by skill but no build page exists",
      priority: "medium",
    })),
);

const gaps = [
  ...skillGaps,
  ...buildSkillGaps,
  ...buildBossGaps,
  ...skillBuildGaps,
];

const report = {
  generatedAt: new Date().toISOString(),
  existingContent: {
    skills: skills.length,
    builds: builds.length,
    bosses: bosses.length,
  },
  gapCount: gaps.length,
  highPriorityGaps: gaps.filter((gap) => gap.priority === "high").length,
  gaps,
};

fs.writeFileSync(outputFile, JSON.stringify(report, null, 2));

console.log("Content Gap Report Generator");
console.log(`Existing skills: ${skills.length}`);
console.log(`Existing builds: ${builds.length}`);
console.log(`Existing bosses: ${bosses.length}`);
console.log(`Content gaps found: ${report.gapCount}`);
console.log(`High priority gaps: ${report.highPriorityGaps}`);
console.log(`Output: ${outputFile}`);
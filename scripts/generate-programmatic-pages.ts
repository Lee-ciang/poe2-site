import fs from "fs";
import path from "path";

type Opportunity = {
  slug: string;
  title: string;
  sourceSkill: string;
  opportunityType: string;
  searchIntent: string;
  priorityScore: number;
  reason: string;
};

const inputPath = path.join(
  process.cwd(),
  "data",
  "ai-seo",
  "programmatic-content-opportunities.json"
);

const outputDir = path.join(
  process.cwd(),
  "content",
  "programmatic",
  "skills"
);

const MAX_PAGES_PER_RUN = 20;

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function fileNameFromSlug(slug: string) {
  return slug.replace(/^\/guides\/skills\//, "") + ".md";
}

function buildMetaDescription(item: Opportunity) {
  return `Learn how to use ${item.title.replace(
    " Guide",
    ""
  )} in Path of Exile 2 with practical tips, setup advice, FAQs, and related skill guidance.`;
}

function buildMarkdown(item: Opportunity) {
  const skillName = item.title
    .replace(" Build Guide", "")
    .replace(" Leveling Guide", "")
    .replace(" Best Support Gems", "")
    .replace(" Endgame Guide", "")
    .replace(" FAQ", "");

  return `---
title: "${item.title}"
description: "${buildMetaDescription(item)}"
slug: "${item.slug}"
sourceSkill: "${item.sourceSkill}"
opportunityType: "${item.opportunityType}"
searchIntent: "${item.searchIntent}"
priorityScore: ${item.priorityScore}
status: "draft"
---

# ${item.title}

This page is a programmatic SEO draft for **${skillName}** in Path of Exile 2.

## Quick Summary

${skillName} is a skill page candidate identified from the programmatic SEO expansion pipeline. This draft should be reviewed before publishing.

## Search Intent

Players searching for this page usually want:

- Practical setup advice
- Build direction
- Support gem or gearing guidance
- Leveling or endgame recommendations
- Clear answers before investing time into the skill

## Recommended Structure

### Best Use Cases

Explain when ${skillName} is worth using and what type of player it fits.

### Core Scaling Factors

Cover the most important scaling mechanics, including damage type, speed, defenses, and support interactions.

### Suggested Support Gems

List support gems that naturally fit the skill and explain why they matter.

### Leveling Notes

Explain whether this skill is comfortable during campaign progression or better saved for later.

### Endgame Notes

Explain what changes when moving into maps, bosses, or harder encounters.

## FAQ

### Is ${skillName} good for leveling?

Give a practical answer based on early campaign usability, gear dependency, and support availability.

### Is ${skillName} good for endgame?

Explain whether the skill scales well into harder content and what investment it needs.

### What support gems work best with ${skillName}?

List the most likely support categories and explain the intent behind each one.

### What build archetype uses ${skillName} best?

Explain whether it fits melee, projectile, elemental, poison, spell, minion, or hybrid builds.

## Internal Link Suggestions

- /guides/skills/${item.sourceSkill}
- /skills/${item.sourceSkill}
- /guides

## Review Notes

Reason generated: ${item.reason}

Before publishing, verify:

- Skill mechanics are accurate
- Patch-specific claims are current
- Support gem recommendations are valid
- The page is not duplicating another guide
- Internal links point to live pages
`;
}

function main() {
  if (!fs.existsSync(inputPath)) {
    console.log("Programmatic Page Generator");
    console.log(`Missing input: ${inputPath}`);
    return;
  }

  ensureDir(outputDir);

  const report = JSON.parse(fs.readFileSync(inputPath, "utf8"));
  const opportunities: Opportunity[] = report.opportunities || [];

  const selected = opportunities
    .filter((item) => item.priorityScore >= 80)
    .slice(0, MAX_PAGES_PER_RUN);

  let created = 0;
  let skipped = 0;

  for (const item of selected) {
    const filePath = path.join(outputDir, fileNameFromSlug(item.slug));

    if (fs.existsSync(filePath)) {
      skipped += 1;
      continue;
    }

    fs.writeFileSync(filePath, buildMarkdown(item));
    created += 1;
  }

  console.log("Programmatic Page Generator");
  console.log(`Candidates selected: ${selected.length}`);
  console.log(`Pages created: ${created}`);
  console.log(`Pages skipped: ${skipped}`);
  console.log(`Output directory: ${outputDir}`);
}

main();
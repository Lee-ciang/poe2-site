import fs from "node:fs";
import path from "node:path";

const INPUT_DIR = path.join(
  process.cwd(),
  "data",
  "ai-seo",
  "enhanced-skill-drafts",
);

const OUTPUT_DIR = path.join(
  process.cwd(),
  "content",
  "drafts",
  "skills",
);

fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const draftFiles = fs
  .readdirSync(INPUT_DIR)
  .filter((file) => file.endsWith(".json"));

for (const file of draftFiles) {
  const draft = JSON.parse(fs.readFileSync(path.join(INPUT_DIR, file), "utf8"));

  const markdown = `---
title: "${draft.seo.title}"
description: "${draft.seo.description}"
slug: "${draft.slug}"
status: "draft"
verificationRequired: true
readyForPublishing: false
---

# ${draft.name} Skill Guide

> Editorial status: Draft. Verification required before publishing.

## Introduction

${draft.enhancedSections.introduction}

## How It Works

${draft.enhancedSections.howItWorks}

## Best Use Cases

${draft.enhancedSections.bestUseCases}

## Recommended Supports

${draft.enhancedSections.recommendedSupports}

## Leveling Advice

${draft.enhancedSections.levelingAdvice}

## Endgame Considerations

${draft.enhancedSections.endgameConsiderations}

## Related Content Plan

${draft.enhancedSections.relatedContentPlan
  .map((item: string) => `- ${item}`)
  .join("\n")}

## Verification Checklist

${draft.verificationChecklist.map((item: string) => `- [ ] ${item}`).join("\n")}

## FAQ

${draft.enhancedSections.faq
  .map(
    (item: any) => `### ${item.question}

${item.answer}`,
  )
  .join("\n\n")}
`;

  const outputFile = path.join(OUTPUT_DIR, `${draft.slug}.md`);
  fs.writeFileSync(outputFile, markdown);
}

console.log("Skill Draft Markdown Exporter");
console.log(`Markdown drafts exported: ${draftFiles.length}`);
console.log(`Output directory: ${OUTPUT_DIR}`);
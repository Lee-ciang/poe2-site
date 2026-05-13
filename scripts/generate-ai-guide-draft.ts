import fs from "node:fs";
import path from "node:path";

const outputDirectory = path.join(process.cwd(), "src", "content", "drafts");

const guideType = "skills";
const slug = "example-ai-generated-guide";
const title = "Example AI Generated Guide";

const draft = `---
title: "${title}"
slug: "${slug}"
type: "${guideType}"
seoTitle: "${title} for Path of Exile 2"
seoDescription: "Read this POE2 guide draft with structured sections, FAQ coverage, related links, and validation-ready metadata."
patchVersion: "0.2.0"
lastUpdated: "2026-05-13"
relatedBuilds: []
relatedBosses: []
relatedSkills: []
contentStatus: "draft"
---

## Overview

Write a clear overview of the topic here. Explain who this guide is for, when players should use it, and what problem it solves.

## Strengths

- Add the first practical strength.
- Add the second practical strength.
- Add the third practical strength.

## Weaknesses

- Add the first important limitation.
- Add the second important limitation.

## Recommended Setup

Explain the recommended setup, including important skills, support choices, gear priorities, or strategy notes.

## Gameplay Tips

Explain practical gameplay advice, positioning, rotation, bossing notes, and common mistakes.

## FAQ

### Is this guide beginner friendly?

Answer with a direct recommendation and explain when beginners should or should not follow this guide.

### What should players verify before using this guide?

Players should verify the current patch, skill balance, passive tree interactions, and any item changes before relying on this guide.
`;

fs.mkdirSync(outputDirectory, { recursive: true });

const outputPath = path.join(outputDirectory, `${slug}.md`);

fs.writeFileSync(outputPath, draft, "utf8");

console.log(`Created draft: ${outputPath}`);
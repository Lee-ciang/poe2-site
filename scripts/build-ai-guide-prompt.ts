type GuideType = "builds" | "bosses" | "skills";

const topic = "fire";
const guideType: GuideType = "builds";
const title = "Fire Endgame Build Guide";

const prompt = `
You are creating a Path of Exile 2 SEO guide for POE2 Forge.

Create a markdown guide with YAML frontmatter.

Topic cluster:
${topic}

Guide type:
${guideType}

Target title:
${title}

Requirements:
- Use clear, practical POE2 player-focused language.
- Do not invent exact numbers, drop rates, patch notes, or balance changes unless verified.
- Mark uncertain gameplay claims as needing verification.
- Include SEO-friendly headings.
- Include at least 2 FAQ questions.
- Include related link fields in frontmatter.
- Keep the content validation-ready.

Required frontmatter:
---
title: "${title}"
slug: "fire-endgame-build-guide"
type: "${guideType}"
seoTitle: "${title} for Path of Exile 2"
seoDescription: "Learn how to approach a fire endgame build in POE2 with practical setup notes, strengths, weaknesses, FAQ coverage, and verification reminders."
patchVersion: "0.2.0"
lastUpdated: "2026-05-13"
relatedBuilds: []
relatedBosses: []
relatedSkills: ["fireball", "flame-wall", "meteor"]
contentStatus: "draft"
---

Required sections:
## Overview
## Strengths
## Weaknesses
## Recommended Setup
## Gameplay Tips
## Bossing Notes
## FAQ

FAQ format must be:

### Question?
Answer text.

Return only the markdown content.
`.trim();

console.log(prompt);
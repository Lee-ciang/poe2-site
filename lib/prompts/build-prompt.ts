export function createBuildPrompt({
  title,
  slug,
}: {
  title: string;
  slug: string;
}) {
  return `Generate Markdown body content for a Path of Exile 2 build guide.

Guide title: ${title}
Slug: ${slug}

Return markdown only. Do not include frontmatter. Do not use code fences.

Required sections:
## Overview
## Best For
## Core Skills
## Recommended Gear Priorities
## Leveling Strategy
## Endgame Strategy
## Strengths
## Weaknesses
## FAQ
## Related Guides
## Content Notes

Writing rules:
- Write like a professional POE guide writer.
- Focus on practical gameplay advice.
- Do not hallucinate patch claims, exact DPS numbers, drop rates, or hidden mechanics.
- If something depends on current patch testing, say it needs verification.
- Include useful placeholder internal linking suggestions in Related Guides.
- In Content Notes, include: This is an AI-assisted draft and must be verified against current POE2 patch data before publication.
- Keep advice specific, but avoid fake exact statistics.`;
}

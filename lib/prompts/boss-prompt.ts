export function createBossPrompt({
  title,
  slug,
}: {
  title: string;
  slug: string;
}) {
  return `Generate Markdown body content for a Path of Exile 2 boss guide.

Guide title: ${title}
Slug: ${slug}

Return markdown only. Do not include frontmatter. Do not use code fences.

Required sections:
## Overview
## Location
## Damage Types
## Weaknesses
## Phase Breakdown
## Key Mechanics
## Recommended Builds
## Rewards
## Tips
## FAQ
## Content Notes

Writing rules:
- Write like a professional POE guide writer.
- Focus on practical fight preparation and player decision-making.
- Do not hallucinate patch claims, exact rewards, drop rates, phase names, or hidden mechanics.
- If boss data is uncertain, clearly say it needs verification.
- Include recommended build archetypes only with reasons tied to mechanics.
- In Content Notes, include: This is an AI-assisted draft and must be verified against current POE2 patch data before publication.
- Keep advice specific, but avoid fake exact statistics.`;
}

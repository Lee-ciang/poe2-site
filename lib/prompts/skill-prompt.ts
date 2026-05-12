export type StructuredSkillPromptData = {
  name: string;
  category: string;
  damageType: string;
  weaponRequirement: string;
  scalingStats: string[];
  bestSupports: string[];
  recommendedBuilds: string[];
  strengths: string[];
  weaknesses: string[];
  levelingNotes: string[];
  endgameUse: string[];
};

export function createSkillPrompt({
  title,
  slug,
  skill,
}: {
  title: string;
  slug: string;
  skill?: StructuredSkillPromptData;
}) {
  const structuredSkillData = skill
    ? `Structured skill data source of truth:
- Name: ${skill.name}
- Category: ${skill.category}
- Damage Type: ${skill.damageType}
- Weapon Requirement: ${skill.weaponRequirement}
- Scaling Stats: ${skill.scalingStats.join(", ")}
- Best Supports: ${skill.bestSupports.join(", ")}
- Recommended Builds: ${skill.recommendedBuilds.join(", ")}
- Strengths: ${skill.strengths.join(" | ")}
- Weaknesses: ${skill.weaknesses.join(" | ")}
- Leveling Notes: ${skill.levelingNotes.join(" | ")}
- Endgame Use: ${skill.endgameUse.join(" | ")}
`
    : `No structured skill data was found for this slug.
Use a cautious draft style. For support gems, mechanics, weapon requirements, scaling claims, recommended builds, leveling notes, and endgame use, write "needs verification" instead of inventing details.
`;

  return `Generate Markdown body content for a Path of Exile 2 skill guide.

Guide title: ${title}
Slug: ${slug}

${structuredSkillData}

Return markdown only. Do not include frontmatter. Do not use code fences.

Required sections:
## Overview
## Skill Category
## Damage Type
## Weapon Requirement
## Scaling Stats
## Best Supports
## Recommended Builds
## Leveling Use
## Endgame Use
## FAQ
## Content Notes

Format every section as proper markdown headings using ##.
Leave a blank line after each heading.

Writing rules:
- Write like a professional POE guide writer.
- Focus on practical gameplay advice and build planning.
- Treat the structured skill data above as the source of truth when it is provided.
- Do not add support gems, mechanics, weapon requirements, scaling claims, recommended builds, strengths, or weaknesses that are not present in the structured skill data.
- If required data is missing or uncertain, write "needs verification" instead of inventing details.
- Do not hallucinate patch claims, exact formulas, fake support interactions, or hidden mechanics.
- If scaling or support behavior needs testing, clearly say it needs verification.
- Include recommended supports with reasons, not just names.
- In Content Notes, include: This is an AI-assisted draft and must be verified against current POE2 patch data before publication.
- Keep advice specific, but avoid fake exact statistics.

CRITICAL WRITING RULES:

- Do not invent mechanics or unsupported interactions.
- If uncertain about a mechanic, explicitly mention that verification is needed.
- Avoid generic filler phrases.
- Write like an experienced ARPG player explaining practical gameplay.
- Include realistic strengths and weaknesses.
- Mention common player mistakes when relevant.
- Prefer actionable gameplay advice over broad descriptions.
- Keep paragraphs concise and readable.
- Avoid repeating the skill/build name excessively.
- Focus on practical usefulness for real POE2 players.
- Do not explain obvious ARPG concepts.
- Avoid encyclopedia-style explanations.
- Prioritize real gameplay situations.
- Focus on how players actually use the skill.
- Mention gearing priorities when relevant.
- Mention common progression problems.
- Avoid sounding like a wiki article.
- Write with the tone of an experienced ARPG player, not a generic game wiki.
- Mention practical gameplay feel and common player frustrations.
- Explain when a skill starts feeling weaker or stronger during progression.
- Include realistic build tradeoffs.
- Avoid sounding overly neutral or academic.
- Prefer direct gameplay observations over generalized summaries.
- Mention what experienced players usually do to solve weaknesses.
- Avoid repetitive sentence structure.
- Avoid starting every paragraph by restating the skill name.
- Write in a way that sounds useful to someone actively playing POE2.
- Include subtle opinions and practical recommendations when appropriate.
- Mention when players commonly feel damage spikes or drop-offs during progression.
- Mention common leveling mistakes newer players make.
- Explain what upgrades usually solve progression problems.
- Mention realistic endgame limitations.
- Explain what experienced players usually swap or adjust for bosses.
- Mention map modifiers or encounters that commonly feel bad for the skill.
- Occasionally use short, direct sentences for emphasis.
- Avoid sounding perfectly neutral at all times.
- Mention tradeoffs instead of only strengths.
- Explain what feels awkward or frustrating about the skill when relevant.
- Include subtle practical opinions experienced players would recognize.
- Avoid excessive formatting repetition across sections.
- Write with slightly varied sentence lengths to sound more natural.
- Avoid sounding like autogenerated SEO filler.
- When describing support gems, avoid claiming exact drawbacks or hidden mechanics unless provided in structured data.
- If a support gem has a tradeoff, describe it cautiously and say the exact interaction should be verified.
- Do not state that a support has no downside unless the structured data explicitly says so.`;
}

export type GuideInputType = "build" | "boss" | "skill";
export type GuideFrontmatterType = "builds" | "bosses" | "skills";
export type ContentStatus = "draft" | "needs-review" | "verified" | "outdated";

export type MarkdownGuideTemplateInput = {
  type: GuideInputType;
  slug: string;
  title: string;
  date: string;
  body?: string;
};

export const guideTypeConfig: Record<
  GuideInputType,
  {
    folder: GuideFrontmatterType;
    label: string;
    seoNoun: string;
  }
> = {
  build: {
    folder: "builds",
    label: "Build",
    seoNoun: "build guide",
  },
  boss: {
    folder: "bosses",
    label: "Boss",
    seoNoun: "boss guide",
  },
  skill: {
    folder: "skills",
    label: "Skill",
    seoNoun: "skill guide",
  },
};

function frontmatterString(value: string) {
  return JSON.stringify(value);
}

const aiVerificationWarning =
  "This is an AI-assisted draft and must be verified against current POE2 patch data before publication.";

function buildGuideSections(title: string) {
  return `## Overview

Write a concise overview for ${title}. Explain the build identity, class fantasy, main damage plan, and what player problem this guide solves.

## Best For

- Add the best player type for this build.
- Add the best content type, such as leveling, mapping, bossing, or farming.
- Add the gear budget or experience level this build is most appropriate for.

## Core Skills

- Main skill: explain the primary damage or clear skill.
- Mobility skill: explain how the build avoids danger.
- Utility skill: explain any curse, aura, guard, or setup tool.

## Recommended Gear Priorities

- Weapon or main damage upgrade priority.
- Defensive priority such as life, resistances, armor, evasion, or energy shield.
- Sustain or quality-of-life priority such as mana, recovery, movement speed, or cooldowns.

## Leveling Strategy

Explain how the build should progress through early, mid, and late campaign. Mention when to upgrade gear, when to add defenses, and what to avoid while leveling.

## Endgame Strategy

Explain how the build approaches mapping, bosses, dangerous modifiers, and support swaps. Add uncertainty notes for any unverified endgame claims.

## Strengths

- Add one specific strength with a player-facing reason.
- Add one practical advantage for leveling, mapping, bossing, or gearing.
- Add one strength that can be verified or tested in-game.

## Weaknesses

- Add one real limitation or tradeoff.
- Add one gearing, mechanical, or matchup concern.
- Add one patch-sensitive point that should be checked before publishing.

## FAQ

### Is ${title} beginner friendly?

Answer with a direct recommendation, then explain the conditions or caveats.

### What should I upgrade first for ${title}?

Name the first upgrade priority and explain how the answer changes if the player lacks damage or survivability.

### Can ${title} handle endgame?

Give a careful answer that separates likely strengths from unverified patch-sensitive claims.

## Related Guides

- Add internal links to relevant skills, bosses, and similar builds after updating the related frontmatter arrays.

## Content Notes

${aiVerificationWarning}
Replace placeholder sections with tested POE2 advice before publishing as final SEO content.`;
}

function bossGuideSections(title: string) {
  return `## Overview

Write a concise overview for ${title}. Explain why the boss is dangerous, what the player should prepare for, and the main strategy goal.

## Location

Add where the boss is found, how players reach the encounter, and whether access is campaign, endgame, or event-based. Mark uncertain access details clearly.

## Damage Types

- Add confirmed damage type one.
- Add confirmed damage type two if applicable.
- Add any uncertain or mixed damage notes that need verification.

## Weaknesses

- Add a defensive preparation weakness, such as resistance or mitigation.
- Add a gameplay weakness, such as mobility, range, burst windows, or damage uptime.
- Add a build archetype that performs well and explain why.

## Phase Breakdown

- Phase 1: describe the main attacks and safe punish windows.
- Phase 2: describe what changes and what players should stop doing.
- Final phase: describe the highest-risk overlap or failure point.

## Key Mechanics

- Add one mechanic with dodge advice.
- Add one mechanic with positioning advice.
- Add one mechanic with damage timing or recovery advice.

## Recommended Builds

- Add one recommended build and why it fits the mechanics.
- Add one safer alternative and why it helps progression.
- Add one build type to avoid if relevant.

## Rewards

- Add verified rewards only.
- If rewards are not verified, state that reward data needs confirmation.
- Avoid exact drop rates unless sourced and current.

## Tips

- Add one preparation tip.
- Add one in-fight positioning tip.
- Add one common mistake to avoid.

## FAQ

### Where do you find ${title}?

Answer with verified location details or clearly mark what still needs confirmation.

### What damage types should I prepare for?

List confirmed damage types and defensive priorities.

### Which builds are best for ${title}?

Recommend build archetypes based on mechanics, not generic tier claims.

## Content Notes

${aiVerificationWarning}
Verify location, rewards, phase behavior, and patch-specific mechanics before publishing as final SEO content.`;
}

function skillGuideSections(title: string) {
  return `## Overview

Write a concise overview for ${title}. Explain what the skill does, what role it fills, and which players or builds should consider it.

## Skill Category

Add the skill category and explain what that means for gameplay, supports, and build planning.

## Damage Type

Add the damage type, ailment or status implications, and any uncertainty around conversion or scaling.

## Weapon Requirement

Add the required weapon or setup. Explain how the requirement affects leveling, gearing, and build flexibility.

## Scaling Stats

- Add the primary scaling stat.
- Add the secondary scaling stat.
- Add a defensive or quality-of-life stat that helps the skill feel better.

## Best Supports

- Add one support for clear and why it helps.
- Add one support for bossing and why it helps.
- Add one support that is conditional or patch-sensitive.

## Recommended Builds

- Add one build that uses this skill as a core skill.
- Add one build that uses this skill as utility or supplemental damage.
- Add one build type that should avoid this skill if relevant.

## Leveling Use

Explain when the skill becomes useful during progression, what gear it needs, and what support setup makes it feel reliable.

## Endgame Use

Explain whether the skill is better for mapping, bossing, utility, or hybrid use. Flag unverified scaling claims.

## FAQ

### Is ${title} good for leveling?

Answer directly and explain the gear or support conditions.

### What stats scale ${title}?

List practical scaling stats and avoid unverified formulas.

### Which builds should use ${title}?

Name matching archetypes and link related builds after frontmatter is updated.

## Content Notes

${aiVerificationWarning}
Verify support interactions, scaling behavior, weapon requirements, and patch-specific mechanics before publishing as final SEO content.`;
}

function createGuideBody(type: GuideInputType, title: string) {
  if (type === "build") {
    return buildGuideSections(title);
  }

  if (type === "boss") {
    return bossGuideSections(title);
  }

  return skillGuideSections(title);
}

export function createMarkdownGuideDraft({
  type,
  slug,
  title,
  date,
  body,
}: MarkdownGuideTemplateInput) {
  const config = guideTypeConfig[type];

  return `---
title: ${frontmatterString(title)}
slug: ${frontmatterString(slug)}
type: ${config.folder}
seoTitle: ${frontmatterString(`${title} - POE2 ${config.label} Guide`)}
seoDescription: ${frontmatterString(
    `Read this POE2 ${config.seoNoun} for practical strategy, strengths, weaknesses, FAQs, related guides, and content verification notes.`,
  )}
patchVersion: "Early Access"
lastUpdated: ${frontmatterString(date)}
relatedBuilds: []
relatedBosses: []
relatedSkills: []
contentStatus: draft
---

${body ?? createGuideBody(type, title)}
`;
}

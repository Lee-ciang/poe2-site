import fs from "fs";
import path from "path";
import matter from "gray-matter";

type ProgrammaticPage = {
  filePath: string;
  slug: string;
  title: string;
  sourceSkill: string;
  opportunityType: string;
  data: Record<string, unknown>;
  content: string;
};

const programmaticDir = path.join(
  process.cwd(),
  "content",
  "programmatic",
  "skills"
);

function titleCase(value: string) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function loadPages(): ProgrammaticPage[] {
  if (!fs.existsSync(programmaticDir)) {
    return [];
  }

  return fs
    .readdirSync(programmaticDir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const filePath = path.join(programmaticDir, file);
      const raw = fs.readFileSync(filePath, "utf8");
      const parsed = matter(raw);

      return {
        filePath,
        slug: String(parsed.data.slug || ""),
        title: String(parsed.data.title || titleCase(file.replace(/\.md$/, ""))),
        sourceSkill: String(parsed.data.sourceSkill || ""),
        opportunityType: String(parsed.data.opportunityType || ""),
        data: parsed.data,
        content: parsed.content,
      };
    });
}

function buildUpgradeSection(page: ProgrammaticPage) {
  const skillName = titleCase(page.sourceSkill);
  const intent = page.opportunityType || "guide";

  if (intent === "build") {
    return `## Build Direction

A ${skillName} build should focus on making the skill feel reliable before trying to maximize raw damage. Prioritize smooth clear, enough recovery, and support gems that improve consistency.

## Practical Build Priorities

- Keep the main skill active as often as possible
- Use support gems that improve uptime, area coverage, or repeat damage
- Add defensive layers before pushing into harder encounters
- Upgrade weapons or spell scaling when damage starts to fall behind
- Avoid over-investing into a single damage source too early
`;
  }

  if (intent === "leveling") {
    return `## Leveling Strategy

When leveling with ${skillName}, focus on comfort first. A leveling setup should clear packs reliably, avoid awkward downtime, and work with gear that is easy to find during the campaign.

## Campaign Priorities

- Use simple support gems that improve clear speed
- Keep mana costs manageable
- Upgrade weapons or skill levels regularly
- Avoid relying on late-game uniques while leveling
- Swap supports when bosses feel too slow
`;
  }

  if (intent === "support-gems") {
    return `## Support Gem Priorities

The best support gems for ${skillName} should improve the way the skill naturally plays. Do not only chase tooltip damage. Prioritize supports that improve real combat performance.

## What To Look For

- More reliable hit coverage
- Better single-target performance
- Faster clear speed
- Lower friction during mapping
- Synergy with the build's main damage type
`;
  }

  if (intent === "endgame") {
    return `## Endgame Scaling

For endgame, ${skillName} needs stronger scaling, better defenses, and a cleaner rotation than it needs during campaign progression. The goal is not only damage, but repeatable performance in harder encounters.

## Endgame Priorities

- Improve single-target damage
- Add defensive recovery and mitigation
- Reduce setup time before damage starts
- Use internal links to related build and skill pages
- Refresh this page after major balance patches
`;
  }

  return `## Practical Notes

This ${skillName} page should be reviewed and expanded with real gameplay observations, current patch information, and stronger examples before being treated as a final guide.

## Upgrade Priorities

- Add current patch notes
- Add real support gem examples
- Add build archetype recommendations
- Add internal links to related skills and guides
- Improve FAQ depth
`;
}

function stripExistingUpgradeSection(content: string) {
  return content.replace(
    /\n## (Build Direction|Leveling Strategy|Support Gem Priorities|Endgame Scaling|Practical Notes)[\s\S]*?(?=\n## Related |\n## Review Notes|$)/,
    "\n"
  );
}

function main() {
  const pages = loadPages();

  let updated = 0;

  for (const page of pages) {
    const cleanContent = stripExistingUpgradeSection(page.content).trimEnd();
    const upgradeSection = buildUpgradeSection(page);

    const nextContent = `${cleanContent}

${upgradeSection}
`;

    const serialized = matter.stringify(nextContent, page.data);

    if (serialized !== fs.readFileSync(page.filePath, "utf8")) {
      fs.writeFileSync(page.filePath, serialized);
      updated += 1;
    }
  }

  console.log("Programmatic Content Quality Upgrader");
  console.log(`Pages scanned: ${pages.length}`);
  console.log(`Pages upgraded: ${updated}`);
}

main();
import fs from "fs";
import path from "path";
import matter from "gray-matter";

type ProgrammaticPage = {
  filePath: string;
  slug: string;
  title: string;
  sourceSkill: string;
  opportunityType: string;
  content: string;
  data: Record<string, unknown>;
};

const programmaticDir = path.join(
  process.cwd(),
  "content",
  "programmatic",
  "skills"
);

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
        title: String(parsed.data.title || ""),
        sourceSkill: String(parsed.data.sourceSkill || ""),
        opportunityType: String(parsed.data.opportunityType || ""),
        content: parsed.content,
        data: parsed.data,
      };
    })
    .filter((page) => page.slug && page.sourceSkill);
}

function buildLinksForPage(page: ProgrammaticPage, allPages: ProgrammaticPage[]) {
  const sameSkillPages = allPages
    .filter(
      (candidate) =>
        candidate.sourceSkill === page.sourceSkill &&
        candidate.slug !== page.slug
    )
    .slice(0, 4);

  const links = [
    {
      label: `${page.sourceSkill} skill overview`,
      url: `/guides/skills/${page.sourceSkill}`,
    },
    {
      label: `${page.sourceSkill} skill page`,
      url: `/skills/${page.sourceSkill}`,
    },
    ...sameSkillPages.map((candidate) => ({
      label: candidate.title,
      url: candidate.slug,
    })),
  ];

  return links;
}

function buildInternalLinksSection(page: ProgrammaticPage, allPages: ProgrammaticPage[]) {
  const links = buildLinksForPage(page, allPages);

  const lines = links.map((link) => `- [${link.label}](${link.url})`);

  return `## Related ${page.title} Guides

${lines.join("\n")}
`;
}

function stripExistingInjectedSection(content: string) {
  return content.replace(
    /\n## Related [\s\S]*? Guides\n\n(?:- \[[^\]]+\]\([^)]+\)\n?)+/g,
    "\n"
  );
}

function main() {
  const pages = loadPages();

  let updated = 0;

  for (const page of pages) {
    const cleanContent = stripExistingInjectedSection(page.content).trimEnd();
    const linksSection = buildInternalLinksSection(page, pages);

    const nextContent = `${cleanContent}

${linksSection}
`;

    const serialized = matter.stringify(nextContent, page.data);

    if (serialized !== fs.readFileSync(page.filePath, "utf8")) {
      fs.writeFileSync(page.filePath, serialized);
      updated += 1;
    }
  }

  console.log("Programmatic Internal Link Injector");
  console.log(`Pages scanned: ${pages.length}`);
  console.log(`Pages updated: ${updated}`);
}

main();
import fs from "node:fs";
import path from "node:path";
import { getAllMarkdownGuides } from "../src/lib/markdown";

const guides = getAllMarkdownGuides();

function buildRelatedLinksSection(targets: string[]) {
  if (!targets.length) {
    return "";
  }

  const lines = [
    "## Related Guides",
    "",
    ...targets.map((target) => `- ${target}`),
    "",
  ];

  return lines.join("\n");
}

for (const guide of guides) {
  const relativePath = guide.path.replace(/^\/guides\//, "guides/");
  const sourcePath = path.join(
    process.cwd(),
    "src",
    "content",
    `${relativePath}.md`,
  );

  if (!fs.existsSync(sourcePath)) {
    console.warn(`Skipping missing source: ${sourcePath}`);
    continue;
  }

  const source = fs.readFileSync(sourcePath, "utf8");

  if (/## Related Guides/i.test(source)) {
    console.log(`Skipping existing related section: ${guide.path}`);
    continue;
  }

  const suggestedTargets = guide.suggestedGuidePaths.slice(0, 5);

  if (!suggestedTargets.length) {
    console.log(`No suggested links for: ${guide.path}`);
    continue;
  }

  const relatedSection = buildRelatedLinksSection(suggestedTargets);

  const updatedSource = `${source.trim()}\n\n${relatedSection}`;

  fs.writeFileSync(sourcePath, updatedSource, "utf8");

  console.log(
    `Injected related links into: ${guide.path} (${suggestedTargets.length} links)`,
  );
}
import fs from "node:fs";
import path from "node:path";

type GuideType = "builds" | "bosses" | "skills";

const draftFile = process.argv[2];

if (!draftFile) {
  console.error("Usage: npx tsx scripts/publish-draft.ts <draft-file.md>");
  process.exit(1);
}

const draftsDirectory = path.join(process.cwd(), "src", "content", "drafts");
const guidesDirectory = path.join(process.cwd(), "src", "content", "guides");

const draftPath = path.join(draftsDirectory, draftFile);

if (!fs.existsSync(draftPath)) {
  console.error(`Draft not found: ${draftPath}`);
  process.exit(1);
}

const source = fs.readFileSync(draftPath, "utf8");

const typeMatch = source.match(/^type:\s*["']?(builds|bosses|skills)["']?/m);
const slugMatch = source.match(/^slug:\s*["']?([a-z0-9-]+)["']?/m);

if (!typeMatch || !slugMatch) {
  console.error("Draft must include valid type and slug frontmatter.");
  process.exit(1);
}

const guideType = typeMatch[1] as GuideType;
const slug = slugMatch[1];

const targetDirectory = path.join(guidesDirectory, guideType);
const targetPath = path.join(targetDirectory, `${slug}.md`);

if (fs.existsSync(targetPath)) {
  console.error(`Target guide already exists: ${targetPath}`);
  process.exit(1);
}

const publishedSource = source.replace(
  /^contentStatus:\s*["']?[^"'\r\n]+["']?/m,
  'contentStatus: "verified"',
);

fs.mkdirSync(targetDirectory, { recursive: true });
fs.writeFileSync(targetPath, publishedSource, "utf8");
fs.unlinkSync(draftPath);

console.log(`Published draft: ${draftPath}`);
console.log(`Created guide: ${targetPath}`);
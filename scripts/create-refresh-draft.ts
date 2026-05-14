import fs from "node:fs";
import path from "node:path";

const guidePathArg = process.argv[2];

if (!guidePathArg) {
  console.error("Usage: npx tsx scripts/create-refresh-draft.ts <guide-path>");
  console.error("Example: npx tsx scripts/create-refresh-draft.ts guides/skills/fireball.md");
  process.exit(1);
}

const contentDirectory = path.join(process.cwd(), "src", "content");
const draftsDirectory = path.join(contentDirectory, "drafts", "refresh");

const sourcePath = path.join(contentDirectory, guidePathArg);

if (!fs.existsSync(sourcePath)) {
  console.error(`Guide not found: ${sourcePath}`);
  process.exit(1);
}

const source = fs.readFileSync(sourcePath, "utf8");
const fileName = path.basename(guidePathArg);
const refreshDraftPath = path.join(draftsDirectory, fileName);

if (fs.existsSync(refreshDraftPath)) {
  console.error(`Refresh draft already exists: ${refreshDraftPath}`);
  process.exit(1);
}

const refreshSource = source.replace(
  /^contentStatus:\s*["']?[^"'\r\n]+["']?/m,
  'contentStatus: "needs-review"',
);

fs.mkdirSync(draftsDirectory, { recursive: true });
fs.writeFileSync(refreshDraftPath, refreshSource, "utf8");

console.log(`Created refresh draft: ${refreshDraftPath}`);
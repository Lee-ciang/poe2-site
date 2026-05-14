import fs from "node:fs";
import path from "node:path";
import { getAllMarkdownGuides } from "../src/lib/markdown";

const targetPatchVersion = process.argv[2] ?? "0.2.1";
const maxDrafts = Number(process.argv[3] ?? 5);

const contentDirectory = path.join(process.cwd(), "src", "content");
const draftsDirectory = path.join(contentDirectory, "drafts", "patch-refresh");

const affectedGuides = getAllMarkdownGuides()
  .filter((guide) => guide.metadata.patchVersion !== targetPatchVersion)
  .map((guide) => {
    let priority = 0;

    if (guide.metrics.isOutdatedPatch) {
      priority += 50;
    }

    if (guide.metrics.isStale) {
      priority += 30;
    }

    if (guide.metrics.qualityScore < 70) {
      priority += 20;
    }

    if (guide.faqItems.length < 2) {
      priority += 10;
    }

    return {
      guide,
      priority,
    };
  })
  .sort((a, b) => b.priority - a.priority)
  .slice(0, maxDrafts);

fs.mkdirSync(draftsDirectory, { recursive: true });

for (const item of affectedGuides) {
  const relativeGuidePath = item.guide.path.replace(/^\/guides\//, "guides/");
  const sourcePath = path.join(contentDirectory, `${relativeGuidePath}.md`);

  if (!fs.existsSync(sourcePath)) {
    console.warn(`Skipping missing source: ${sourcePath}`);
    continue;
  }

  const draftFileName = `${item.guide.metadata.slug}-${targetPatchVersion}.md`;
  const draftPath = path.join(draftsDirectory, draftFileName);

  if (fs.existsSync(draftPath)) {
    console.warn(`Skipping existing draft: ${draftPath}`);
    continue;
  }

  const source = fs.readFileSync(sourcePath, "utf8");

  const refreshedSource = source
    .replace(
      /^patchVersion:\s*["']?[^"'\r\n]+["']?/m,
      `patchVersion: "${targetPatchVersion}"`,
    )
    .replace(
      /^contentStatus:\s*["']?[^"'\r\n]+["']?/m,
      'contentStatus: "needs-review"',
    );

  fs.writeFileSync(draftPath, refreshedSource, "utf8");

  console.log(
    `Queued patch refresh: ${draftPath} | priority: ${item.priority}`,
  );
}
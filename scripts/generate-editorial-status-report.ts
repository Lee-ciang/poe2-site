import fs from "node:fs";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "data", "ai-seo");
const DRAFT_DIR = path.join(DATA_DIR, "skill-drafts");
const ENHANCED_DIR = path.join(DATA_DIR, "enhanced-skill-drafts");
const MARKDOWN_DIR = path.join(process.cwd(), "content", "drafts", "skills");

function listFiles(dir: string, ext: string) {
  return fs.existsSync(dir)
    ? fs.readdirSync(dir).filter((file) => file.endsWith(ext))
    : [];
}

const seedDrafts = listFiles(DRAFT_DIR, ".json");
const enhancedDrafts = listFiles(ENHANCED_DIR, ".json");
const markdownDrafts = listFiles(MARKDOWN_DIR, ".md");

const publishReadiness = JSON.parse(
  fs.readFileSync(
    path.join(DATA_DIR, "draft-publish-readiness-report.json"),
    "utf8",
  ),
);

const allSlugs = Array.from(
  new Set([
    ...seedDrafts.map((file) => file.replace(".json", "")),
    ...enhancedDrafts.map((file) => file.replace(".json", "")),
    ...markdownDrafts.map((file) => file.replace(".md", "")),
  ]),
);

const items = allSlugs.map((slug) => {
  const readiness = publishReadiness.checks.find((check: any) =>
    check.file.startsWith(slug),
  );

  return {
    slug,
    hasSeedDraft: seedDrafts.includes(`${slug}.json`),
    hasEnhancedDraft: enhancedDrafts.includes(`${slug}.json`),
    hasMarkdownDraft: markdownDrafts.includes(`${slug}.md`),
    publishReady: readiness?.publishReady ?? false,
    blockers: readiness?.blockers ?? [],
    editorialStage:
      readiness?.publishReady
        ? "publish_ready"
        : markdownDrafts.includes(`${slug}.md`)
          ? "markdown_draft_blocked"
          : enhancedDrafts.includes(`${slug}.json`)
            ? "enhanced_draft"
            : seedDrafts.includes(`${slug}.json`)
              ? "seed_draft"
              : "unknown",
  };
});

const report = {
  generatedAt: new Date().toISOString(),
  summary: {
    totalItems: items.length,
    seedDrafts: items.filter((item) => item.hasSeedDraft).length,
    enhancedDrafts: items.filter((item) => item.hasEnhancedDraft).length,
    markdownDrafts: items.filter((item) => item.hasMarkdownDraft).length,
    publishReady: items.filter((item) => item.publishReady).length,
    blocked: items.filter((item) => !item.publishReady).length,
  },
  items,
};

const outputFile = path.join(DATA_DIR, "editorial-status-report.json");

fs.writeFileSync(outputFile, JSON.stringify(report, null, 2));

console.log("Editorial Status Report Generator");
console.log(`Total items: ${report.summary.totalItems}`);
console.log(`Seed drafts: ${report.summary.seedDrafts}`);
console.log(`Enhanced drafts: ${report.summary.enhancedDrafts}`);
console.log(`Markdown drafts: ${report.summary.markdownDrafts}`);
console.log(`Publish ready: ${report.summary.publishReady}`);
console.log(`Blocked: ${report.summary.blocked}`);
console.log(`Output: ${outputFile}`);
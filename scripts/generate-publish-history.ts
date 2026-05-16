import fs from "node:fs";
import path from "node:path";

const APPROVED_FILE = path.join(
  process.cwd(),
  "data",
  "ai-seo",
  "approved-publish-candidates.json",
);

const OUTPUT_FILE = path.join(
  process.cwd(),
  "data",
  "ai-seo",
  "publish-history.json",
);

const approvedData = JSON.parse(
  fs.readFileSync(APPROVED_FILE, "utf8"),
);

const history = approvedData.approved.map((item: any) => ({
  slug: item.slug,
  published: false,
  publishedAt: null,
  lastUpdatedAt: null,
  refreshRecommended: false,
  refreshReason: null,
  indexingStatus: "not_submitted",
  searchConsoleData: {
    impressions: 0,
    clicks: 0,
    ctr: 0,
    averagePosition: null,
  },
}));

const report = {
  generatedAt: new Date().toISOString(),
  totalTrackedPages: history.length,
  history,
};

fs.writeFileSync(
  OUTPUT_FILE,
  JSON.stringify(report, null, 2),
);

console.log("Publish History Generator");
console.log(`Tracked pages: ${history.length}`);
console.log(`Output: ${OUTPUT_FILE}`);
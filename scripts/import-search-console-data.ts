import fs from "fs";
import path from "path";

type SearchConsoleRow = {
  page: string;
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
};

const inputPath = path.join(
  process.cwd(),
  "data",
  "ai-seo",
  "search-console-export.json"
);

const outputPath = path.join(
  process.cwd(),
  "data",
  "ai-seo",
  "search-console-intelligence.json"
);

function ensureNumber(value: unknown): number {
  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? numberValue : 0;
}

function classifyOpportunity(row: SearchConsoleRow): string[] {
  const flags: string[] = [];

  if (row.impressions >= 100 && row.ctr < 0.02) {
    flags.push("high-impression-low-ctr");
  }

  if (row.position > 10 && row.position <= 20) {
    flags.push("near-page-one-opportunity");
  }

  if (row.position <= 10 && row.clicks === 0 && row.impressions > 30) {
    flags.push("snippet-or-title-problem");
  }

  if (row.position > 20 && row.impressions >= 50) {
    flags.push("content-depth-or-authority-gap");
  }

  return flags;
}

function main() {
  if (!fs.existsSync(inputPath)) {
    console.log("Search Console Importer");
    console.log("No Search Console export found.");
    console.log(`Expected input: ${inputPath}`);
    console.log("");
    console.log("Create this file first:");
    console.log("data/ai-seo/search-console-export.json");
    console.log("");
    console.log("Expected format:");
    console.log(
      JSON.stringify(
        [
          {
            page: "/guides/skills/example",
            query: "poe2 example skill build",
            clicks: 0,
            impressions: 120,
            ctr: 0.01,
            position: 12.4,
          },
        ],
        null,
        2
      )
    );
    return;
  }

  const raw = fs.readFileSync(inputPath, "utf8");
  const parsed = JSON.parse(raw);

  if (!Array.isArray(parsed)) {
    throw new Error("Search Console export must be an array.");
  }

  const rows: SearchConsoleRow[] = parsed.map((item) => ({
    page: String(item.page || ""),
    query: String(item.query || ""),
    clicks: ensureNumber(item.clicks),
    impressions: ensureNumber(item.impressions),
    ctr: ensureNumber(item.ctr),
    position: ensureNumber(item.position),
  }));

  const opportunities = rows
    .map((row) => ({
      ...row,
      opportunityFlags: classifyOpportunity(row),
    }))
    .filter((row) => row.opportunityFlags.length > 0)
    .sort((a, b) => {
      const impressionDiff = b.impressions - a.impressions;
      if (impressionDiff !== 0) return impressionDiff;
      return a.position - b.position;
    });

  const report = {
    generatedAt: new Date().toISOString(),
    source: inputPath,
    rowsImported: rows.length,
    opportunitiesFound: opportunities.length,
    opportunities,
  };

  fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));

  console.log("Search Console Intelligence Importer");
  console.log(`Rows imported: ${rows.length}`);
  console.log(`Opportunities found: ${opportunities.length}`);
  console.log(`Output: ${outputPath}`);
}

main();
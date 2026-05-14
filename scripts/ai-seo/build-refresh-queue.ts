import fs from "node:fs";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "data", "ai-seo");

const decayReport = JSON.parse(
  fs.readFileSync(path.join(DATA_DIR, "content-decay-report.json"), "utf8")
);

const refreshQueue = decayReport
  .filter((item: any) => item.status === "refresh_required")
  .sort((a: any, b: any) => b.decayScore - a.decayScore)
  .map((item: any, index: number) => ({
    slug: item.slug,
    title: item.title,
    refreshPriority: index + 1,
    decayScore: item.decayScore,
    decaySignals: item.decaySignals,
    status: "queued_for_refresh",
    recommendedAction: item.recommendedAction,
    createdAt: new Date().toISOString(),
  }));

const outputFile = path.join(DATA_DIR, "refresh-queue.json");

fs.writeFileSync(outputFile, JSON.stringify(refreshQueue, null, 2));

console.log("AI SEO Refresh Queue Automation");
console.log(`Decay items checked: ${decayReport.length}`);
console.log(`Queued for refresh: ${refreshQueue.length}`);
console.log(`Highest decay score: ${refreshQueue[0]?.decayScore ?? 0}`);
console.log(`Output: ${outputFile}`);
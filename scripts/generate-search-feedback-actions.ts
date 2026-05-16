import fs from "fs";
import path from "path";

type SearchOpportunity = {
  page: string;
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
  opportunityFlags: string[];
};

const inputPath = path.join(
  process.cwd(),
  "data",
  "ai-seo",
  "search-console-intelligence.json"
);

const outputPath = path.join(
  process.cwd(),
  "data",
  "ai-seo",
  "search-feedback-actions.json"
);

function actionForFlag(flag: string): string {
  switch (flag) {
    case "high-impression-low-ctr":
      return "Rewrite title/meta description and improve search intent match.";
    case "near-page-one-opportunity":
      return "Refresh content depth, add FAQs, and strengthen internal links.";
    case "snippet-or-title-problem":
      return "Improve snippet answer, intro clarity, and heading alignment.";
    case "content-depth-or-authority-gap":
      return "Expand guide sections and add supporting internal links.";
    default:
      return "Review manually.";
  }
}

function priorityScore(item: SearchOpportunity): number {
  let score = 0;

  score += Math.min(item.impressions / 10, 50);

  if (item.position > 10 && item.position <= 20) score += 30;
  if (item.ctr < 0.02 && item.impressions >= 100) score += 25;
  if (item.clicks === 0 && item.impressions > 30) score += 15;
  if (item.position > 20 && item.impressions >= 50) score += 10;

  return Math.round(score);
}

function main() {
  if (!fs.existsSync(inputPath)) {
    console.log("Search Feedback Action Generator");
    console.log("No Search Console intelligence file found.");
    console.log(`Expected input: ${inputPath}`);
    return;
  }

  const report = JSON.parse(fs.readFileSync(inputPath, "utf8"));

  const opportunities: SearchOpportunity[] = Array.isArray(report.opportunities)
    ? report.opportunities
    : [];

  const actions = opportunities
    .map((item) => ({
      page: item.page,
      query: item.query,
      clicks: item.clicks,
      impressions: item.impressions,
      ctr: item.ctr,
      position: item.position,
      opportunityFlags: item.opportunityFlags,
      recommendedActions: item.opportunityFlags.map(actionForFlag),
      priorityScore: priorityScore(item),
    }))
    .sort((a, b) => b.priorityScore - a.priorityScore);

  const output = {
    generatedAt: new Date().toISOString(),
    source: inputPath,
    actionItems: actions.length,
    actions,
  };

  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));

  console.log("Search Feedback Action Generator");
  console.log(`Action items: ${actions.length}`);
  console.log(`Output: ${outputPath}`);
}

main();
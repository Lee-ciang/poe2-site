import fs from "fs";
import path from "path";

type SearchAction = {
  page: string;
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
  opportunityFlags: string[];
  priorityScore: number;
};

type RefreshCandidate = {
  page: string;
  query: string;
  refreshPriority: number;
  reasons: string[];
  suggestedActions: string[];
};

const searchFeedbackPath = path.join(
  process.cwd(),
  "data",
  "ai-seo",
  "search-feedback-actions.json"
);

const outputPath = path.join(
  process.cwd(),
  "data",
  "ai-seo",
  "refresh-priority-queue.json"
);

function buildRefreshReasons(item: SearchAction): string[] {
  const reasons: string[] = [];

  if (item.position > 10 && item.position <= 20) {
    reasons.push("Near page 1 ranking opportunity");
  }

  if (item.impressions >= 100 && item.ctr < 0.02) {
    reasons.push("High impressions with weak CTR");
  }

  if (item.clicks === 0 && item.impressions > 30) {
    reasons.push("Receiving impressions but no clicks");
  }

  if (item.position > 20) {
    reasons.push("Content authority may be insufficient");
  }

  return reasons;
}

function buildSuggestedActions(item: SearchAction): string[] {
  const actions: string[] = [];

  if (item.opportunityFlags.includes("high-impression-low-ctr")) {
    actions.push("Rewrite SEO title and meta description");
  }

  if (item.opportunityFlags.includes("near-page-one-opportunity")) {
    actions.push("Expand guide depth and FAQ coverage");
    actions.push("Add supporting internal links");
  }

  if (item.opportunityFlags.includes("snippet-or-title-problem")) {
    actions.push("Improve introduction and featured snippet targeting");
  }

  if (item.opportunityFlags.includes("content-depth-or-authority-gap")) {
    actions.push("Increase topical depth and semantic coverage");
  }

  return actions;
}

function calculateRefreshPriority(item: SearchAction): number {
  let score = item.priorityScore;

  if (item.position > 10 && item.position <= 20) {
    score += 20;
  }

  if (item.impressions > 200) {
    score += 15;
  }

  if (item.clicks === 0) {
    score += 10;
  }

  return Math.round(score);
}

function main() {
  if (!fs.existsSync(searchFeedbackPath)) {
    console.log("Refresh Priority Queue Generator");
    console.log("Missing search feedback actions file.");
    console.log(`Expected input: ${searchFeedbackPath}`);
    return;
  }

  const raw = fs.readFileSync(searchFeedbackPath, "utf8");
  const parsed = JSON.parse(raw);

  const actions: SearchAction[] = Array.isArray(parsed.actions)
    ? parsed.actions
    : [];

  const refreshQueue: RefreshCandidate[] = actions
    .map((item) => ({
      page: item.page,
      query: item.query,
      refreshPriority: calculateRefreshPriority(item),
      reasons: buildRefreshReasons(item),
      suggestedActions: buildSuggestedActions(item),
    }))
    .sort((a, b) => b.refreshPriority - a.refreshPriority);

  const report = {
    generatedAt: new Date().toISOString(),
    refreshCandidates: refreshQueue.length,
    queue: refreshQueue,
  };

  fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));

  console.log("Refresh Priority Queue Generator");
  console.log(`Refresh candidates: ${refreshQueue.length}`);
  console.log(`Output: ${outputPath}`);
}

main();
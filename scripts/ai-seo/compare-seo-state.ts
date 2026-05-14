import fs from "node:fs";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "data", "ai-seo");

const history = JSON.parse(
  fs.readFileSync(path.join(DATA_DIR, "seo-progress-history.json"), "utf8")
);

if (history.length < 1) {
  throw new Error("No SEO history snapshots found.");
}

const latest = history[history.length - 1];
const previous =
  history.length >= 2
    ? history[history.length - 2]
    : latest;

const comparisonReport = {
  generatedAt: new Date().toISOString(),
  snapshotsCompared: history.length >= 2 ? 2 : 1,
  currentSnapshot: latest.recordedAt,
  previousSnapshot: previous.recordedAt,
  comparison: {
    strategicMaturity: {
      previous: previous.strategicMaturity,
      current: latest.strategicMaturity,
      changed:
        previous.strategicMaturity !== latest.strategicMaturity,
    },
    semanticCoverage: {
      previous: previous.semanticCoverage,
      current: latest.semanticCoverage,
      changed:
        previous.semanticCoverage !== latest.semanticCoverage,
    },
    authorityTrajectory: {
      previous: previous.authorityTrajectory,
      current: latest.authorityTrajectory,
      changed:
        previous.authorityTrajectory !== latest.authorityTrajectory,
    },
    moatTrajectory: {
      previous: previous.moatTrajectory,
      current: latest.moatTrajectory,
      changed:
        previous.moatTrajectory !== latest.moatTrajectory,
    },
    highRoiContentItems: {
      previous: previous.highRoiContentItems,
      current: latest.highRoiContentItems,
      delta:
        latest.highRoiContentItems -
        previous.highRoiContentItems,
    },
    quickWinKeywords: {
      previous: previous.quickWinKeywords,
      current: latest.quickWinKeywords,
      delta:
        latest.quickWinKeywords -
        previous.quickWinKeywords,
    },
    weakAuthorityClusters: {
      previous: previous.weakAuthorityClusters,
      current: latest.weakAuthorityClusters,
      delta:
        latest.weakAuthorityClusters -
        previous.weakAuthorityClusters,
    },
    weakContentMoats: {
      previous: previous.weakContentMoats,
      current: latest.weakContentMoats,
      delta:
        latest.weakContentMoats -
        previous.weakContentMoats,
    },
  },
  evolutionAssessment:
    history.length >= 2
      ? "Historical comparison available"
      : "Baseline established for future comparisons",
};

const outputFile = path.join(DATA_DIR, "seo-state-comparison.json");

fs.writeFileSync(outputFile, JSON.stringify(comparisonReport, null, 2));

console.log("AI SEO State Comparison Engine");
console.log(`Snapshots compared: ${comparisonReport.snapshotsCompared}`);
console.log(`Evolution assessment: ${comparisonReport.evolutionAssessment}`);
console.log(`Output: ${outputFile}`);
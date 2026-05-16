import fs from "node:fs";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "data", "ai-seo");

const editorialReport = JSON.parse(
  fs.readFileSync(path.join(DATA_DIR, "editorial-status-report.json"), "utf8"),
);

const verificationProgress = JSON.parse(
  fs.readFileSync(path.join(DATA_DIR, "verification-progress-report.json"), "utf8"),
);

const priorities = editorialReport.items.map((item: any) => {
  const verification = verificationProgress.items.find(
    (progress: any) => progress.slug === item.slug,
  );

  const blockerCount = item.blockers?.length ?? 0;
  const verificationProgressScore = verification?.verificationProgress ?? 0;

  const priorityScore =
    100 -
    blockerCount * 10 +
    verificationProgressScore;

  return {
    slug: item.slug,
    editorialStage: item.editorialStage,
    publishReady: item.publishReady,
    verificationStatus: verification?.verificationStatus ?? "unknown",
    verificationProgress: verificationProgressScore,
    blockerCount,
    priorityScore: Math.max(0, Math.min(100, priorityScore)),
    recommendedAction:
      item.publishReady
        ? "Move to final publish review."
        : verificationProgressScore > 0
          ? "Continue verification and resolve remaining blockers."
          : "Start verification with official/community source checks.",
  };
});

const sortedPriorities = priorities.sort(
  (a: any, b: any) => b.priorityScore - a.priorityScore,
);

const report = {
  generatedAt: new Date().toISOString(),
  totalItems: sortedPriorities.length,
  topPriority: sortedPriorities[0] ?? null,
  priorities: sortedPriorities,
};

const outputFile = path.join(DATA_DIR, "publishing-priorities.json");

fs.writeFileSync(outputFile, JSON.stringify(report, null, 2));

console.log("Publishing Priority Generator");
console.log(`Total items: ${report.totalItems}`);
console.log(`Top priority: ${report.topPriority?.slug ?? "none"}`);
console.log(`Output: ${outputFile}`);
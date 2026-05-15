import fs from "node:fs";
import path from "node:path";

const DRAFT_DIR = path.join(
  process.cwd(),
  "data",
  "ai-seo",
  "skill-drafts",
);

const outputFile = path.join(
  process.cwd(),
  "data",
  "ai-seo",
  "skill-draft-review-report.json",
);

const draftFiles = fs
  .readdirSync(DRAFT_DIR)
  .filter((file) => file.endsWith(".json"));

const reviews = draftFiles.map((file) => {
  const draft = JSON.parse(
    fs.readFileSync(path.join(DRAFT_DIR, file), "utf8"),
  );

  const issues: string[] = [];
  const strengths: string[] = [];

  if (!draft.sections?.faq?.length) {
    issues.push("Missing FAQ section");
  } else {
    strengths.push("Has FAQ section");
  }

  if (!draft.sections?.endgameUse?.length) {
    issues.push("Missing endgame usage notes");
  } else {
    strengths.push("Has endgame usage section");
  }

  if (!draft.verificationChecklist?.length) {
    issues.push("Missing verification checklist");
  } else {
    strengths.push("Includes verification checklist");
  }

  if (
    draft.sections?.summary?.includes("To be verified") ||
    draft.sections?.summary?.includes("requires verification")
  ) {
    strengths.push("Avoids unverified factual claims");
  }

 const rawScore =
  100 -
  issues.length * 15 +
  strengths.length * 5;

const qualityScore = Math.max(0, Math.min(100, rawScore));

  return {
    slug: draft.slug,
    qualityScore,
    publishReady: qualityScore >= 80,
    issues,
    strengths,
    recommendation:
      qualityScore >= 80
        ? "Ready for human enhancement and publishing review."
        : "Needs additional verification and content expansion.",
  };
});

const report = {
  generatedAt: new Date().toISOString(),
  totalDraftsReviewed: reviews.length,
  publishReadyDrafts: reviews.filter(
    (review) => review.publishReady,
  ).length,
  averageQualityScore:
    reviews.reduce((sum, review) => sum + review.qualityScore, 0) /
    reviews.length,
  reviews,
};

fs.writeFileSync(outputFile, JSON.stringify(report, null, 2));

console.log("Skill Draft Review Generator");
console.log(`Drafts reviewed: ${reviews.length}`);
console.log(`Publish ready drafts: ${report.publishReadyDrafts}`);
console.log(
  `Average quality score: ${report.averageQualityScore.toFixed(2)}`,
);
console.log(`Output: ${outputFile}`);
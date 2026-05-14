import fs from "node:fs";
import path from "node:path";

const DRAFTS_DIR = path.join(process.cwd(), "data", "ai-seo", "drafts");
const REVIEW_DIR = path.join(process.cwd(), "data", "ai-seo", "reviews");

fs.mkdirSync(REVIEW_DIR, { recursive: true });

const draftFiles = fs
  .readdirSync(DRAFTS_DIR)
  .filter((file) => file.endsWith(".json"));

for (const file of draftFiles) {
  const draftPath = path.join(DRAFTS_DIR, file);
  const draft = JSON.parse(fs.readFileSync(draftPath, "utf8"));

  const review = {
    slug: draft.slug,
    title: draft.title,
    status: "needs_human_review",
    reviewChecklist: {
      factualAccuracyChecked: false,
      patchInfoVerified: false,
      seoIntentMatched: false,
      noUnsupportedClaims: false,
      readyToPublish: false,
    },
    draftSummary: {
      faqCount: draft.generatedDraft.faqSuggestions.length,
      hasContentExpansion: Boolean(draft.generatedDraft.contentExpansionSuggestion),
      hasPatchUpdateNote: Boolean(draft.generatedDraft.patchUpdateNote),
      hasInternalLinkSuggestion: Boolean(draft.generatedDraft.internalLinkSuggestion),
    },
    sourceDraftFile: path.join("data", "ai-seo", "drafts", file),
    reviewedAt: null,
    createdAt: new Date().toISOString(),
  };

  const outputFile = path.join(REVIEW_DIR, file);
  fs.writeFileSync(outputFile, JSON.stringify(review, null, 2));
}

console.log("AI SEO Draft Reviewer");
console.log(`Drafts reviewed: ${draftFiles.length}`);
console.log(`Output directory: ${REVIEW_DIR}`);
import fs from "node:fs";
import path from "node:path";

const DRAFT_DIR = path.join(process.cwd(), "data", "ai-seo", "skill-drafts");
const OUTPUT_DIR = path.join(
  process.cwd(),
  "data",
  "ai-seo",
  "enhanced-skill-drafts",
);

fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const draftFiles = fs
  .readdirSync(DRAFT_DIR)
  .filter((file) => file.endsWith(".json"));

for (const file of draftFiles) {
  const draft = JSON.parse(fs.readFileSync(path.join(DRAFT_DIR, file), "utf8"));

  const enhancedDraft = {
    ...draft,
    status: "enhanced_draft",
    contentQuality: "publishable_structure_pending_verification",
    seo: {
      title: `${draft.name} Skill Guide for Path of Exile 2`,
      description: `Learn how ${draft.name} may fit into Path of Exile 2 builds, leveling setups, support choices, and endgame planning. This draft requires verification before publishing.`,
      targetKeywords: [
        `${draft.name} POE2`,
        `${draft.name} skill guide`,
        `Path of Exile 2 ${draft.name}`,
        `${draft.name} build`,
      ],
    },
    enhancedSections: {
      introduction: `${draft.name} is a planned Path of Exile 2 skill guide prepared for SEO expansion. Before publishing, its mechanics, support choices, and current viability should be verified against official and community sources.`,
      howItWorks:
        "Explain the skill mechanics here after checking official wording, gameplay examples, or reliable community notes. Avoid exact numerical values unless they are verified.",
      bestUseCases:
        "Describe where this skill appears useful, such as leveling, mapping, bossing, or support roles, only after validation.",
      recommendedSupports:
        "Add support gems or support setups only after verification. Avoid presenting speculative support combinations as facts.",
      levelingAdvice:
        "Add beginner-friendly leveling advice that avoids claiming current meta strength without evidence.",
      endgameConsiderations:
        "Add endgame usage notes after checking current patch discussions, build showcases, or gameplay examples.",
      relatedContentPlan: [
        "Link to related skill pages",
        "Link to relevant build pages",
        "Link to boss guides where this skill may be useful",
      ],
      faq: draft.sections.faq,
    },
    editorialStatus: {
      verificationRequired: true,
      humanReviewRequired: true,
      readyForPublishing: false,
      blocker:
        "Needs factual verification before being converted into a live page.",
    },
    enhancedAt: new Date().toISOString(),
  };

  const outputFile = path.join(OUTPUT_DIR, file);
  fs.writeFileSync(outputFile, JSON.stringify(enhancedDraft, null, 2));
}

console.log("Skill Draft Enhancer");
console.log(`Drafts enhanced: ${draftFiles.length}`);
console.log(`Output directory: ${OUTPUT_DIR}`);
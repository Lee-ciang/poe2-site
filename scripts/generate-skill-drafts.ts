import fs from "node:fs";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "data", "ai-seo");
const OUTPUT_DIR = path.join(DATA_DIR, "skill-drafts");

const draftQueue = JSON.parse(
  fs.readFileSync(
    path.join(DATA_DIR, "content-draft-queue.json"),
    "utf8",
  ),
);

fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const skillDrafts = draftQueue.drafts.filter(
  (draft: any) => draft.type === "missing_skill_page",
);

for (const draft of skillDrafts) {
  const title = draft.targetSlug
    .split("-")
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const skillDraft = {
    slug: draft.targetSlug,
    name: title,
    status: "draft",
    verificationRequired: true,
    verificationStatus: "pending",
    contentQuality: "seed_draft",
    sourceDraftId: draft.id,
    sections: {
      summary: `${title} is a Path of Exile 2 skill draft prepared for verification before publishing.`,
      scalingStats: [
        "To be verified",
        "Avoid unverified numerical scaling claims",
      ],
      bestSupports: [
        "To be verified",
        "Use official/community sources before publishing",
      ],
      levelingNotes: [
        "Add beginner-friendly leveling notes after verification.",
      ],
      endgameUse: [
        "Add endgame use cases after checking current meta discussions.",
      ],
      faq: [
        {
          question: `Is ${title} good in Path of Exile 2?`,
          answer:
            "This answer requires verification from current patch notes and community gameplay examples before publishing.",
        },
      ],
    },
    verificationChecklist: [
      "Check official Path of Exile patch notes",
      "Check community discussion for current viability",
      "Check gameplay examples or build videos",
      "Avoid exact numerical claims unless verified",
      "Add related skills and builds before publishing",
    ],
    createdAt: new Date().toISOString(),
  };

  const outputFile = path.join(OUTPUT_DIR, `${draft.targetSlug}.json`);
  fs.writeFileSync(outputFile, JSON.stringify(skillDraft, null, 2));
}

console.log("Skill Draft Generator");
console.log(`Skill drafts generated: ${skillDrafts.length}`);
console.log(`Output directory: ${OUTPUT_DIR}`);
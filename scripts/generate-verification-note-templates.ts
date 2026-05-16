import fs from "node:fs";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "data", "ai-seo");
const OUTPUT_DIR = path.join(process.cwd(), "content", "verification-notes");

const editorialReport = JSON.parse(
  fs.readFileSync(path.join(DATA_DIR, "editorial-status-report.json"), "utf8"),
);

fs.mkdirSync(OUTPUT_DIR, { recursive: true });

for (const item of editorialReport.items) {
  const note = `# Verification Notes: ${item.slug}

## Editorial Status

- Slug: ${item.slug}
- Current Stage: ${item.editorialStage}
- Publish Ready: ${item.publishReady ? "Yes" : "No"}

## Official Source Check

- [ ] Checked official Path of Exile / Path of Exile 2 patch notes
- Notes:
  - 

## Community Validation

- [ ] Checked Reddit / community discussion
- Notes:
  - 

## Gameplay / Build Evidence

- [ ] Checked gameplay examples, build videos, or reliable build discussions
- Notes:
  - 

## Claims to Avoid Unless Verified

- [ ] Exact damage numbers
- [ ] Exact drop rates
- [ ] Current meta claims
- [ ] Patch-specific balance claims
- [ ] Best-in-slot claims

## Final Editorial Decision

- [ ] Keep as draft
- [ ] Needs rewrite
- [ ] Ready for publish candidate
- [ ] Reject / do not publish

## Final Notes

- 
`;

  fs.writeFileSync(path.join(OUTPUT_DIR, `${item.slug}.md`), note);
}

console.log("Verification Note Template Generator");
console.log(`Templates generated: ${editorialReport.items.length}`);
console.log(`Output directory: ${OUTPUT_DIR}`);
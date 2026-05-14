import { getAllMarkdownGuides } from "../src/lib/markdown";

const guides = getAllMarkdownGuides();

const incomingLinks = new Map<string, number>();

for (const guide of guides) {
  incomingLinks.set(guide.path, 0);
}

for (const guide of guides) {
  for (const suggestedPath of guide.suggestedGuidePaths) {
    incomingLinks.set(
      suggestedPath,
      (incomingLinks.get(suggestedPath) ?? 0) + 1,
    );
  }
}

const orphanCandidates = guides.filter(
  (guide) => (incomingLinks.get(guide.path) ?? 0) === 0,
);

console.log("Internal link suggestions");
console.log(`Orphan candidates: ${orphanCandidates.length}`);

for (const orphan of orphanCandidates) {
  const linkingCandidates = guides
    .filter((guide) => guide.path !== orphan.path)
    .filter((guide) => guide.suggestedGuidePaths.includes(orphan.path))
    .slice(0, 5);

  console.log(`\nTarget: ${orphan.path}`);
  console.log(`Title: ${orphan.metadata.title}`);

  if (!linkingCandidates.length) {
    console.log("No existing semantic candidates found.");
    continue;
  }

  console.log("Suggested source pages:");

  for (const candidate of linkingCandidates) {
    console.log(`- ${candidate.path} | ${candidate.metadata.title}`);
  }
}
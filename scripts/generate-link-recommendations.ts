import fs from "node:fs";
import path from "node:path";
import { getAllMarkdownGuides } from "../src/lib/markdown";

const outputPath = path.join(
  process.cwd(),
  "reports",
  "link-recommendations.json",
);

const guides = getAllMarkdownGuides();

const recommendations = guides.map((guide) => {
  const suggestedTargets = guide.suggestedGuidePaths.slice(0, 5);

  return {
    source: guide.path,
    title: guide.metadata.title,
    suggestedTargets,
  };
});

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(recommendations, null, 2), "utf8");

console.log(`Generated link recommendations: ${outputPath}`);
console.log(`Sources analyzed: ${recommendations.length}`);
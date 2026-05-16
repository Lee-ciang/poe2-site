import fs from "fs";
import path from "path";

import { SEO_CONFIG } from "./seo-config";

const outputDir = path.join(
  process.cwd(),
  "public"
);

const outputPath = path.join(
  outputDir,
  "robots.txt"
);

function main() {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const robots = `User-agent: *
Allow: /

Sitemap: ${SEO_CONFIG.siteUrl}/sitemap.xml
`;

  fs.writeFileSync(outputPath, robots);

  console.log("Robots.txt Generator");
  console.log(`Output: ${outputPath}`);
}

main();
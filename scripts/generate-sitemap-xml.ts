import fs from "fs";
import path from "path";

type SitemapUrl = {
  url: string;
  title: string;
  priority: number;
  changefreq: string;
  sitemapStatus: string;
};

const DOMAIN = "https://poe2site.com";

const sitemapReportPath = path.join(
  process.cwd(),
  "data",
  "ai-seo",
  "seo-sitemap-report.json"
);

const outputDir = path.join(
  process.cwd(),
  "public"
);

const outputPath = path.join(
  outputDir,
  "sitemap.xml"
);

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function main() {
  if (!fs.existsSync(sitemapReportPath)) {
    console.log("Sitemap XML Generator");
    console.log(`Missing input: ${sitemapReportPath}`);
    return;
  }

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const report = JSON.parse(
    fs.readFileSync(sitemapReportPath, "utf8")
  );

  const urls: SitemapUrl[] = report.urls || [];

  const xmlEntries = urls
    .filter((item) => item.sitemapStatus === "included")
    .map((item) => {
      return `
  <url>
    <loc>${escapeXml(DOMAIN + item.url)}</loc>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority.toFixed(1)}</priority>
  </url>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlEntries}
</urlset>
`;

  fs.writeFileSync(outputPath, xml);

  console.log("Sitemap XML Generator");
  console.log(`URLs written: ${urls.length}`);
  console.log(`Output: ${outputPath}`);
}

main();
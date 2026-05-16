import fs from "fs";
import path from "path";

type ContentPage = {
  slug: string;
  title: string;
  keywords?: string[];
  authority?: number;
};

const contentIndexPath = path.join(
  process.cwd(),
  "data",
  "ai-seo",
  "content-index.json"
);

const outputPath = path.join(
  process.cwd(),
  "data",
  "ai-seo",
  "seo-sitemap-report.json"
);

function main() {
  if (!fs.existsSync(contentIndexPath)) {
    console.log("SEO Sitemap Report Generator");
    console.log(`Missing input: ${contentIndexPath}`);
    return;
  }

  const pages: ContentPage[] = JSON.parse(
    fs.readFileSync(contentIndexPath, "utf8")
  );

  const urls = pages
    .map((page) => ({
      url: page.slug,
      title: page.title,
      priority:
        page.authority && page.authority >= 20
          ? 0.8
          : page.authority && page.authority >= 10
            ? 0.6
            : 0.4,
      changefreq: "weekly",
      sitemapStatus: "included",
    }))
    .sort((a, b) => b.priority - a.priority);

  const report = {
    generatedAt: new Date().toISOString(),
    totalUrls: urls.length,
    urls,
  };

  fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));

  console.log("SEO Sitemap Report Generator");
  console.log(`URLs analyzed: ${urls.length}`);
  console.log(`Output: ${outputPath}`);
}

main();
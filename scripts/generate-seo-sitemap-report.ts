import fs from "fs";
import path from "path";
import matter from "gray-matter";

type ContentPage = {
  slug: string;
  title: string;
  keywords?: string[];
  authority?: number;
};

type SitemapEntry = {
  url: string;
  title: string;
  priority: number;
  changefreq: string;
  sitemapStatus: string;
  source: string;
};

const contentIndexPath = path.join(
  process.cwd(),
  "data",
  "ai-seo",
  "content-index.json"
);

const programmaticDir = path.join(
  process.cwd(),
  "content",
  "programmatic",
  "skills"
);

const outputPath = path.join(
  process.cwd(),
  "data",
  "ai-seo",
  "seo-sitemap-report.json"
);

function loadContentIndexPages(): SitemapEntry[] {
  if (!fs.existsSync(contentIndexPath)) {
    return [];
  }

  const pages: ContentPage[] = JSON.parse(
    fs.readFileSync(contentIndexPath, "utf8")
  );

  return pages.map((page) => ({
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
    source: "content-index",
  }));
}

function loadProgrammaticPages(): SitemapEntry[] {
  if (!fs.existsSync(programmaticDir)) {
    return [];
  }

  return fs
    .readdirSync(programmaticDir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(programmaticDir, file), "utf8");
      const parsed = matter(raw);

      return {
        url: String(parsed.data.slug || ""),
        title: String(parsed.data.title || file.replace(/\.md$/, "")),
        priority: 0.5,
        changefreq: "weekly",
        sitemapStatus: String(parsed.data.status || "draft") === "rejected"
          ? "excluded"
          : "included",
        source: "programmatic",
      };
    })
    .filter((entry) => entry.url);
}

function dedupeByUrl(entries: SitemapEntry[]): SitemapEntry[] {
  const seen = new Map<string, SitemapEntry>();

  for (const entry of entries) {
    if (!seen.has(entry.url)) {
      seen.set(entry.url, entry);
    }
  }

  return Array.from(seen.values());
}

function main() {
  const urls = dedupeByUrl([
    ...loadContentIndexPages(),
    ...loadProgrammaticPages(),
  ]).sort((a, b) => b.priority - a.priority);

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
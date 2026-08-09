import type { MetadataRoute } from "next";
import { bosses } from "@/data/bosses";
import { builds } from "@/data/builds";
import { getAllMarkdownGuides } from "@/lib/markdown";
import { absoluteUrl } from "@/lib/seo";

const lastModified = new Date();
const coreSkillGuidePaths = [
  "/guides/skills/ice-spear",
  "/guides/skills/ball-lightning",
  "/guides/skills/flame-wall",
  "/guides/skills/ice-nova",
  "/guides/skills/frostbolt",
  "/guides/skills/lightning-arrow",
  "/guides/skills/spark",
  "/guides/skills/arc",
  "/guides/skills/freezing-shards",
  "/guides/skills/fireball",
  "/guides/skills/chain-lightning",
  "/guides/skills/whirlwind",
  "/guides/skills/poison-arrow",
  "/guides/skills/meteor",
];

function sitemapEntry(
  path: string,
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "weekly",
) {
  return {
    url: absoluteUrl(path),
    lastModified,
    changeFrequency,
    priority,
  };
}

function dedupeEntries(entries: MetadataRoute.Sitemap) {
  const seenUrls = new Set<string>();

  return entries.filter((entry) => {
    if (seenUrls.has(entry.url)) {
      return false;
    }

    seenUrls.add(entry.url);
    return true;
  });
}

export default function sitemap(): MetadataRoute.Sitemap {
  const guidePaths = new Set(getAllMarkdownGuides().map((guide) => guide.path));

  return dedupeEntries([
    sitemapEntry("/", 1, "daily"),
    sitemapEntry("/builds", 0.9),
    sitemapEntry("/bosses", 0.9),
    sitemapEntry("/skills", 0.9),
    sitemapEntry("/guides", 0.9),
    ...builds.map((build) => sitemapEntry(`/builds/${build.slug}`, 0.8)),
    ...bosses.map((boss) => sitemapEntry(`/bosses/${boss.slug}`, 0.8)),
    sitemapEntry("/skills/lightning-arrow", 0.8),
    ...coreSkillGuidePaths
      .filter((path) => guidePaths.has(path))
      .map((path) => sitemapEntry(path, 0.85)),
  ]);
}
